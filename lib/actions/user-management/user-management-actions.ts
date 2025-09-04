"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import bcrypt from "bcryptjs";
import db from "@/lib/db";
import { v4 as uuidv4 } from 'uuid';

function generateRandomPassword(length: number = 12): string {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";

    // Ensure at least one of each required character type
    password += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)];
    password += "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)];
    password += "0123456789"[Math.floor(Math.random() * 10)];
    password += "!@#$%^&*"[Math.floor(Math.random() * 8)];

    // Fill remaining length with random characters
    for (let i = 4; i < length; i++) {
        password += charset[Math.floor(Math.random() * charset.length)];
    }

    return password.split('').sort(() => Math.random() - 0.5).join('');
}

export interface GetUsersFilters {
    searchText?: string;
    role?: string;
    startDate?: Date;
    endDate?: Date;
    page?: number;
    limit?: number;
}

export interface CreateUserByAdminData {
    firstName: string;
    middleName?: string;
    lastName: string;
    primaryEmail: string;
    secondaryEmail?: string;
    mobilePhone?: string;
    workPhone?: string;
    roles: string[];
}

export interface UpdateUserByAdminData {
    userId: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    primaryEmail?: string;
    secondaryEmail?: string;
    mobilePhone?: string;
    workPhone?: string;
    roles?: string[];
    accountActive?: boolean;
    accountLocked?: boolean;
}

export async function getUsersWithFilters(filters: GetUsersFilters = {}) {
    const session = await getServerSession(authOptions);

    //Role check
    if (!session?.user?.roles?.includes('Admin')) {
        throw new Error("Not authorized");
    }

    try {
        let query = db
            .select([
                "a.USER_ID as id",
                "a.PRIMARY_EMAIL as primaryEmail",
                "a.SECONDARY_EMAIL as secondaryEmail",
                "a.FIRST_NAME as firstName",
                "a.MIDDLE_NAME as middleName",
                "a.LAST_NAME as lastName",
                "a.WORK_PHONE as workPhone",
                "a.MOBILE_PHONE as mobilePhone",
                "a.CREATION_DATE as createdAt",
                "a.LAST_LOGIN as lastLogin",
                "a.ACCOUNT_ACTIVE as accountActive",
                "a.ACCOUNT_LOCKED as accountLocked",
                "a.LOCKED_AT as lockedAt",
                "a.LOCKED_BY as lockedBy",
                "a.LOCK_REASON as lockReason"
            ])
            .from("ACCOUNTS as a");

        // Search filter
        if (filters.searchText) {
            const searchTerm = `%${filters.searchText.toLowerCase()}%`;
            query = query.where(function () {
                this.whereRaw('LOWER("a"."FIRST_NAME") LIKE ?', [searchTerm])
                    .orWhereRaw('LOWER("a"."LAST_NAME") LIKE ?', [searchTerm])
                    .orWhereRaw('LOWER("a"."PRIMARY_EMAIL") LIKE ?', [searchTerm])
                    .orWhereRaw('LOWER("a"."MIDDLE_NAME") LIKE ?', [searchTerm]);
            });
        }

        const users = await query.orderBy('a.CREATION_DATE', 'desc');

        // Get users with their roles and format data for display
        const usersWithRoles = await Promise.all(
            users.map(async (user) => {
                const userRoles = await db
                    .select(['ROLE_NAME'])
                    .from('PROFILE_ROLES')
                    .where('USER_ID', user.id)
                    .where('IS_ACTIVE', 1);

                const roles = userRoles.map(role => role.ROLE_NAME);

                // Locked User
                let lockedByName = user.lockedBy;
                if (user.lockedBy && user.lockedBy !== 'SYSTEM') {
                    try {
                        const lockedByUser = await db
                            .select(['FIRST_NAME', 'LAST_NAME'])
                            .from('ACCOUNTS')
                            .where('USER_ID', user.lockedBy)
                            .first();

                        if (lockedByUser) {
                            lockedByName = `${lockedByUser.FIRST_NAME} ${lockedByUser.LAST_NAME}`;
                        }
                    } catch (error) {
                        console.log('Could not resolve locked by user:', error);
                    }
                }

                return {
                    ...user,
                    roles,
                    accountActive: user.accountActive === 1,
                    accountLocked: user.accountLocked === 1,
                    createdAt: user.createdAt?.toISOString() || null,
                    lastLogin: user.lastLogin?.toISOString() || null,
                    lockedAt: user.lockedAt?.toISOString() || null,
                    lockedBy: lockedByName,
                    title: ''
                };
            })
        );

        // Role Filter
        let filteredUsers = usersWithRoles;
        if (filters.role) {
            filteredUsers = usersWithRoles.filter(user =>
                user.roles.includes(filters.role!)
            );
        }

        return {
            success: true,
            users: filteredUsers,
            total: filteredUsers.length
        };

    } catch (error: unknown) {
        console.error("Error fetching users:", error);
        return {
            success: false,
            error: "Failed to fetch users",
            users: [],
            total: 0
        };
    }
}

export async function createUserByAdmin(userData: CreateUserByAdminData) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.roles?.includes('Admin')) {
        throw new Error("Not authorized");
    }

    const {
        firstName,
        middleName,
        lastName,
        primaryEmail,
        secondaryEmail,
        mobilePhone,
        workPhone,
        roles
    } = userData;

    try {
        // Check if email already exists
        const existingUser = await db
            .select("USER_ID")
            .from("ACCOUNTS")
            .where("PRIMARY_EMAIL", primaryEmail)
            .first();

        if (existingUser) {
            return {
                success: false,
                error: "An account with this email address already exists."
            };
        }

        const userId = uuidv4();

        // Password
        const autoPassword = generateRandomPassword();
        console.log(`Generated password for ${primaryEmail}: ${autoPassword}`);

        // TODO: Send email with auto-generated password
        // await sendWelcomeEmail(primaryEmail, autoPassword);

        const saltRounds = 12;
        const passwordHash = await bcrypt.hash(autoPassword, saltRounds);
        const passwordExpireDate = new Date();
        passwordExpireDate.setDate(passwordExpireDate.getDate() + 90);

        await db.transaction(async (trx) => {
            // Create account
            await trx("ACCOUNTS").insert({
                USER_ID: userId,
                FIRST_NAME: firstName,
                MIDDLE_NAME: middleName || null,
                LAST_NAME: lastName,
                PRIMARY_EMAIL: primaryEmail,
                SECONDARY_EMAIL: secondaryEmail || null,
                MOBILE_PHONE: mobilePhone || null,
                WORK_PHONE: workPhone || null,
                PASSWORD_HASH: passwordHash,
                PASSWORD_EXPIRE: passwordExpireDate,
                CREATION_DATE: new Date(),
                LAST_LOGIN: null,
                ACCOUNT_ACTIVE: 1,
                ACCOUNT_LOCKED: 0,
            });

            // Assign roles
            const assignedBy = session.user.id || 'SYSTEM';

            for (const role of roles) {
                await trx("PROFILE_ROLES").insert({
                    ROLE_ID: uuidv4(),
                    USER_ID: userId,
                    ROLE_NAME: role,
                    ASSIGNED_BY: assignedBy,
                    ASSIGNED_DATE: new Date(),
                    IS_ACTIVE: 1,
                    CREATED_DATE: new Date(),
                });
            }
        });

        // TODO: Send verification email (auto-verify for now)

        return {
            success: true,
            userId: userId,
            message: "User created successfully.",
        };

    } catch (error: unknown) {
        console.error("Error creating user:", error);

        const errorMessage = error instanceof Error ? error.message : String(error);

        if (errorMessage.includes("ORA-")) {
            return {
                success: false,
                error: "Database error occurred. Check console for message.",
            };
        }

        return {
            success: false,
            error: "Failed to create user. Check console for message.",
        };
    }
}

export async function updateUserByAdmin(userData: UpdateUserByAdminData) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.roles?.includes('Admin')) {
        throw new Error("Not authorized");
    }

    const { userId, roles, ...accountFields } = userData;

    try {

        const existingUser = await db
            .select("USER_ID")
            .from("ACCOUNTS")
            .where("USER_ID", userId)
            .first();

        if (!existingUser) {
            return {
                success: false,
                error: "User not found."
            };
        }

        // Check for duplicate email if email is being updated
        if (accountFields.primaryEmail) {
            const emailExists = await db
                .select("USER_ID")
                .from("ACCOUNTS")
                .where("PRIMARY_EMAIL", accountFields.primaryEmail)
                .whereNot("USER_ID", userId)
                .first();

            if (emailExists) {
                return {
                    success: false,
                    error: "An account with this email address already exists."
                };
            }
        }

        await db.transaction(async (trx) => {
            const updateData: any = {};

            if (accountFields.firstName !== undefined) updateData.FIRST_NAME = accountFields.firstName;
            if (accountFields.middleName !== undefined) updateData.MIDDLE_NAME = accountFields.middleName || null;
            if (accountFields.lastName !== undefined) updateData.LAST_NAME = accountFields.lastName;
            if (accountFields.primaryEmail !== undefined) updateData.PRIMARY_EMAIL = accountFields.primaryEmail;
            if (accountFields.secondaryEmail !== undefined) updateData.SECONDARY_EMAIL = accountFields.secondaryEmail || null;
            if (accountFields.mobilePhone !== undefined) updateData.MOBILE_PHONE = accountFields.mobilePhone || null;
            if (accountFields.workPhone !== undefined) updateData.WORK_PHONE = accountFields.workPhone || null;
            if (accountFields.accountActive !== undefined) updateData.ACCOUNT_ACTIVE = accountFields.accountActive ? 1 : 0;

            // Handle account locking with history tracking
            if (accountFields.accountLocked !== undefined) {
                updateData.ACCOUNT_LOCKED = accountFields.accountLocked ? 1 : 0;

                if (accountFields.accountLocked) {
                    // Account is being locked
                    updateData.LOCKED_AT = new Date();
                    updateData.LOCKED_BY = session.user.id;
                    updateData.LOCK_REASON = "Locked by administrator";
                } else {
                    // Account is being unlocked
                    updateData.LOCKED_AT = null;
                    updateData.LOCKED_BY = null;
                    updateData.LOCK_REASON = null;
                }
            }

            if (Object.keys(updateData).length > 0) {
                await trx("ACCOUNTS")
                    .where("USER_ID", userId)
                    .update(updateData);
            }

            // Update roles
            if (roles !== undefined) {
                const assignedBy = session.user.id || 'SYSTEM';

                // Deactivate existing roles
                await trx("PROFILE_ROLES")
                    .where("USER_ID", userId)
                    .update({ IS_ACTIVE: 0 });

                // Add new roles
                for (const role of roles) {
                    // Check if role already exists and reactivate it
                    const existingRole = await trx("PROFILE_ROLES")
                        .where("USER_ID", userId)
                        .where("ROLE_NAME", role)
                        .first();

                    if (existingRole) {
                        await trx("PROFILE_ROLES")
                            .where("ROLE_ID", existingRole.ROLE_ID)
                            .update({
                                IS_ACTIVE: 1,
                                ASSIGNED_BY: assignedBy,
                                ASSIGNED_DATE: new Date()
                            });
                    } else {
                        await trx("PROFILE_ROLES").insert({
                            ROLE_ID: uuidv4(),
                            USER_ID: userId,
                            ROLE_NAME: role,
                            ASSIGNED_BY: assignedBy,
                            ASSIGNED_DATE: new Date(),
                            IS_ACTIVE: 1,
                            CREATED_DATE: new Date(),
                        });
                    }
                }
            }
        });

        return {
            success: true,
            message: "User updated successfully.",
        };

    } catch (error: unknown) {
        console.error("Error updating user:", error);

        const errorMessage = error instanceof Error ? error.message : String(error);

        if (errorMessage.includes("ORA-")) {
            return {
                success: false,
                error: "Database error occurred. Check console for message..",
            };
        }

        return {
            success: false,
            error: "Failed to update user. Check console for message.",
        };
    }
}