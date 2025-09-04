'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import db from '@/lib/db';
import { getServerSession } from 'next-auth';

export interface DeleteUserResult {
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
        // Check if user exists
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
            // CASCADE delete for PROFILE_ROLES
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