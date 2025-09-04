"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import bcrypt from "bcryptjs";
import db from "@/lib/db";
import { v4 as uuidv4 } from 'uuid'
import {
    validateCreateAccount,
    type CreateAccountFormData,
} from "@/lib/validation/auth-validate";
import { sendVerificationEmail } from "@/lib/email/email-service";


export async function getCurrentUser() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        throw new Error("Not authenticated");
    }

    try {
        const user = await db
            .select([
                "USER_ID",
                "PRIMARY_EMAIL",
                "SECONDARY_EMAIL",
                "FIRST_NAME",
                "MIDDLE_NAME",
                "LAST_NAME",
                "WORK_PHONE",
                "MOBILE_PHONE",
                "CREATION_DATE",
                "LAST_LOGIN",
                "ACCOUNT_ACTIVE",
                "ACCOUNT_LOCKED",
            ])
            .from("ACCOUNTS")
            .where("USER_ID", session.user.id)
            .first();

        if (!user) {
            throw new Error("User not found");
        }

        // Get user roles from PROFILE_ROLES table
        const userRoles = await db
            .select(["ROLE_NAME"])
            .from("PROFILE_ROLES")
            .where("USER_ID", session.user.id)
            .where("IS_ACTIVE", 1);

        const roles = userRoles.map(role => role.ROLE_NAME);

        return {
            ...user,
            roles,
        };
    } catch (error: unknown) {
        console.error("Error fetching current user:", error);
        throw new Error("Failed to fetch user information");
    }
}

export async function createUserAccount(accountData: CreateAccountFormData) {
    // Validate
    const validation = validateCreateAccount(accountData);
    if (!validation.success) {
        return {
            success: false,
            error: "Invalid input data",
            details: validation.error.errors,
        };
    }

    const validatedData = validation.data;

    const {
        firstName,
        middleName,
        lastName,
        primaryEmail,
        secondaryEmail,
        mobilePhone,
        workPhone,
        password
    } = validatedData;

    // Insert
    try {
        const existingUser = await db
            .select("USER_ID")
            .from("ACCOUNTS")
            .where("PRIMARY_EMAIL", primaryEmail)
            .first();

        if (existingUser) {
            return {
                success: false,
                error: "An account with this email address already exists.",
            };
        }

        const userId = uuidv4();

        // Hash password
        const saltRounds = 12;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        // Set password expiration (90 days from now)
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
                ACCOUNT_ACTIVE: 0, // Verification from email
                ACCOUNT_LOCKED: 0,
            });

            // Assign default "AAP User" role
            await trx("PROFILE_ROLES").insert({
                ROLE_ID: uuidv4(),
                USER_ID: userId,
                ROLE_NAME: "AAP User",
                ASSIGNED_BY: "System",
                ASSIGNED_DATE: new Date(),
                IS_ACTIVE: 1,
                CREATED_DATE: new Date(),
            });
        });

        // Send Verifification email
        try {
            const emailResult = await sendVerificationEmail(
                'andrewgura94@gmail.com',
                password,
                firstName
            );

            if (!emailResult.success) {
                console.error('Failed to send welcome email:', emailResult.error);
            }
        } catch (emailError) {
            console.error('Verf email error:', emailError);
        }

        return {
            success: true,
            userId: userId,
            message: "Account created successfully.",
        };
    } catch (error: unknown) {
        console.error("Error creating user account:", error);

        const errorMessage = error instanceof Error ? error.message : String(error);

        // Handle Oracle-specific errors
        if (errorMessage.includes("ORA-")) {
            return {
                success: false,
                error: "Database error occurred. Please contact support if this persists.",
            };
        }

        return {
            success: false,
            error: "Failed to create account. Please try again later.",
        };
    }
}