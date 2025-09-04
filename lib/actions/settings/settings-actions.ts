"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import bcrypt from "bcryptjs";
import db from "@/lib/db";
import {
    validateUpdateSettings,
    validateChangePassword,
    type UpdateSettingsFormData,
    type ChangePasswordFormData,
    type UserSettingsData
} from "@/lib/validation/settings-validate";

// Get
export async function getUserSettings(): Promise<{
    success: boolean;
    data?: UserSettingsData;
    error?: string;
}> {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return {
                success: false,
                error: "Not authenticated"
            };
        }

        // Get user account data
        const user = await db
            .select([
                "USER_ID as userId",
                "PRIMARY_EMAIL as primaryEmail",
                "SECONDARY_EMAIL as secondaryEmail",
                "FIRST_NAME as firstName",
                "MIDDLE_NAME as middleName",
                "LAST_NAME as lastName",
                "WORK_PHONE as workPhone",
                "MOBILE_PHONE as mobilePhone",
                "CREATION_DATE as creationDate",
                "LAST_LOGIN as lastLogin",
                "PASSWORD_EXPIRE as passwordExpire"
            ])
            .from("ACCOUNTS")
            .where("USER_ID", session.user.id)
            .first();

        if (!user) {
            return {
                success: false,
                error: "User not found"
            };
        }

        // Get user roles
        const userRoles = await db
            .select(["ROLE_NAME"])
            .from("PROFILE_ROLES")
            .where("USER_ID", session.user.id)
            .where("IS_ACTIVE", 1);

        const roles = userRoles.map(role => role.ROLE_NAME);

        // Determine if user is internal (has roles other than just "AAP User")
        const isInternal = roles.length > 1 || !roles.includes("AAP User");

        const formatDate = (date: any): string | undefined => {
            if (!date) return undefined;
            try {
                return new Date(date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
            } catch {
                return undefined;
            }
        };

        const userData: UserSettingsData = {
            userId: user.userId,
            primaryEmail: user.primaryEmail,
            secondaryEmail: user.secondaryEmail || undefined,
            firstName: user.firstName,
            middleName: user.middleName || undefined,
            lastName: user.lastName,
            workPhone: user.workPhone || undefined,
            mobilePhone: user.mobilePhone || undefined,
            creationDate: formatDate(user.creationDate),
            lastLogin: formatDate(user.lastLogin),
            passwordExpire: formatDate(user.passwordExpire),
            roles,
            isInternal
        };

        return {
            success: true,
            data: userData
        };

    } catch (error: unknown) {
        console.error("Error fetching user settings:", error);
        return {
            success: false,
            error: "Failed to fetch user settings"
        };
    }
}

// Edit
export async function updateUserSettings(formData: UpdateSettingsFormData): Promise<{
    success: boolean;
    message?: string;
    error?: string;
}> {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return {
                success: false,
                error: "Not authenticated"
            };
        }

        // Validate input data
        const validation = validateUpdateSettings(formData);
        if (!validation.success) {
            return {
                success: false,
                error: "Invalid input data"
            };
        }

        const validatedData = validation.data;

        // Update user account
        await db("ACCOUNTS")
            .where("USER_ID", session.user.id)
            .update({
                FIRST_NAME: validatedData.firstName,
                MIDDLE_NAME: validatedData.middleName || null,
                LAST_NAME: validatedData.lastName,
                WORK_PHONE: validatedData.workPhone || null,
                MOBILE_PHONE: validatedData.mobilePhone || null,
            });

        return {
            success: true,
            message: "Settings updated successfully"
        };

    } catch (error: unknown) {
        console.error("Error updating user settings:", error);

        const errorMessage = error instanceof Error ? error.message : String(error);

        // Oracle specific error
        if (errorMessage.includes("ORA-")) {
            return {
                success: false,
                error: "Database error occurred. Please contact support if this persists."
            };
        }

        return {
            success: false,
            error: "Failed to update settings. Please try again later."
        };
    }
}


export async function changePassword(formData: ChangePasswordFormData): Promise<{
    success: boolean;
    message?: string;
    error?: string;
}> {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return {
                success: false,
                error: "Not authenticated"
            };
        }

        // Validate input data
        const validation = validateChangePassword(formData);
        if (!validation.success) {
            return {
                success: false,
                error: "Invalid password data"
            };
        }

        const { currentPassword, newPassword } = validation.data;

        // Get current user's password hash
        const user = await db
            .select(["PASSWORD_HASH"])
            .from("ACCOUNTS")
            .where("USER_ID", session.user.id)
            .first();

        if (!user) {
            return {
                success: false,
                error: "User not found"
            };
        }

        // Verify current password
        const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.PASSWORD_HASH);
        if (!isCurrentPasswordValid) {
            return {
                success: false,
                error: "Current password is incorrect"
            };
        }

        // Hash new password
        const saltRounds = 12;
        const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

        // Set new password expiration (90 days from now)
        const passwordExpireDate = new Date();
        passwordExpireDate.setDate(passwordExpireDate.getDate() + 90);

        // Update password
        await db("ACCOUNTS")
            .where("USER_ID", session.user.id)
            .update({
                PASSWORD_HASH: newPasswordHash,
                PASSWORD_EXPIRE: passwordExpireDate,
            });

        return {
            success: true,
            message: "Password changed successfully"
        };

    } catch (error: unknown) {
        console.error("Error changing password:", error);

        const errorMessage = error instanceof Error ? error.message : String(error);

        // Handle Oracle-specific errors
        if (errorMessage.includes("ORA-")) {
            return {
                success: false,
                error: "Database error occurred. Please contact support if this persists."
            };
        }

        return {
            success: false,
            error: "Failed to change password. Please try again later."
        };
    }
}