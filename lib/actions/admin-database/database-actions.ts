'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import db from '@/lib/db';
import { getServerSession } from 'next-auth';

export interface DeleteUserResult {
    success: boolean;
    error?: string;
    message?: string;
}

export interface VerifyAccountResult {
    success: boolean;
    error?: string;
    message?: string;
}

export async function deleteUserCompletely(userId: string): Promise<DeleteUserResult> {
    const session = await getServerSession(authOptions);

    if (!session?.user?.roles?.includes('Admin')) {
        return {
            success: false,
            error: "Not authorized"
        };
    }

    if (!userId || userId.trim() === '') {
        return {
            success: false,
            error: "User ID is required"
        };
    }

    try {
        const existingUser = await db
            .select('USER_ID', 'FIRST_NAME', 'LAST_NAME', 'PRIMARY_EMAIL')
            .from('ACCOUNTS')
            .where('USER_ID', userId)
            .first();

        if (!existingUser) {
            return {
                success: false,
                error: "User not found"
            };
        }

        await db.transaction(async (trx) => {
            // Delete from tables that reference USER_ID
            // Add more as needed

            // Password reset tokens
            await trx('PASSWORD_RESET_TOKENS')
                .where('USER_ID', userId)
                .del();

            //  Email Verification Tokens
            await trx('EMAIL_VERIFICATION_TOKENS')
                .where('USER_ID', userId)
                .del();

            // Accounts + Profile_Roles
            await trx('ACCOUNTS')
                .where('USER_ID', userId)
                .del();
        });

        return {
            success: true,
            message: `User ${existingUser.FIRST_NAME} ${existingUser.LAST_NAME} (${existingUser.PRIMARY_EMAIL}) deleted successfully`
        };

    } catch (error: unknown) {
        console.error("Error deleting user:", error);

        const errorMessage = error instanceof Error ? error.message : String(error);

        if (errorMessage.includes("ORA-")) {
            return {
                success: false,
                error: "Database error occurred. Check console for details."
            };
        }

        return {
            success: false,
            error: "Failed to delete user. Check console for details."
        };
    }
}

export async function autoVerifyAccount(userId: string): Promise<VerifyAccountResult> {
    const session = await getServerSession(authOptions);

    if (!session?.user?.roles?.includes('Admin')) {
        return {
            success: false,
            error: "Not authorized"
        };
    }

    if (!userId || userId.trim() === '') {
        return {
            success: false,
            error: "User ID is required"
        };
    }

    try {
        const existingUser = await db
            .select('USER_ID', 'FIRST_NAME', 'LAST_NAME', 'PRIMARY_EMAIL', 'ACCOUNT_ACTIVE')
            .from('ACCOUNTS')
            .where('USER_ID', userId)
            .first();

        if (!existingUser) {
            return {
                success: false,
                error: "User not found"
            };
        }

        // Check if already verified
        if (existingUser.ACCOUNT_ACTIVE === 1) {
            return {
                success: false,
                error: "Account is already verified"
            };
        }

        await db.transaction(async (trx) => {
            // Activate the account
            await trx('ACCOUNTS')
                .where('USER_ID', userId)
                .update({
                    ACCOUNT_ACTIVE: 1,
                });

            // Mark all verification tokens as used
            await trx('EMAIL_VERIFICATION_TOKENS')
                .where('USER_ID', userId)
                .where('USED', 0)
                .update({
                    USED: 1,
                });
        });

        return {
            success: true,
            message: `Account for ${existingUser.FIRST_NAME} ${existingUser.LAST_NAME} (${existingUser.PRIMARY_EMAIL}) has been verified successfully`
        };

    } catch (error: unknown) {
        console.error("Error verifying account:", error);

        const errorMessage = error instanceof Error ? error.message : String(error);

        if (errorMessage.includes("ORA-")) {
            return {
                success: false,
                error: "Database error occurred. Check console for details."
            };
        }

        return {
            success: false,
            error: "Failed to verify account. Check console for details."
        };
    }
}