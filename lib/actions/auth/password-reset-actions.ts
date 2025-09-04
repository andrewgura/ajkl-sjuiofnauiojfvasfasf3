"use server";

import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import db from "@/lib/db";
import {
    validatePasswordResetRequest,
    validatePasswordReset,
} from "@/lib/validation/password-reset-validate";

interface ActionResult {
    success: boolean;
    message?: string;
    error?: string;
}

interface TokenValidationResult extends ActionResult {
    userEmail?: string;
    userId?: string;
}

// Tokens
function generateSecureToken(): string {
    return crypto.randomBytes(32).toString('hex');
}

async function hashToken(token: string): Promise<string> {
    return bcrypt.hash(token, 12);
}

async function verifyToken(token: string, hash: string): Promise<boolean> {
    return bcrypt.compare(token, hash);
}

// Reset Password, Send email
export async function initiatePasswordReset(formData: FormData): Promise<ActionResult> {
    try {
        // Extract and validate data
        const data = {
            email: formData.get('email') as string,
        };

        const validation = validatePasswordResetRequest(data);
        if (!validation.success) {
            return {
                success: false,
                error: "Please enter a valid email address",
            };
        }

        const { email } = validation.data;
        const normalizedEmail = email.toLowerCase().trim();

        // Check if user exists
        const user = await db
            .select(['USER_ID', 'PRIMARY_EMAIL', 'FIRST_NAME'])
            .from('ACCOUNTS')
            .where('PRIMARY_EMAIL', normalizedEmail)
            .first();

        const successMessage = "If an account with that email exists, you will receive password reset instructions.";

        if (!user) {
            return {
                success: true,
                message: successMessage,
            };
        }

        // Create token
        const token = generateSecureToken();
        const tokenHash = await hashToken(token);
        const tokenId = uuidv4();
        const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes

        // Clean up old tokens for this user
        await db('PASSWORD_RESET_TOKENS')
            .where('USER_ID', user.USER_ID)
            .where('USED', 0)
            .del();

        // Store new token
        await db('PASSWORD_RESET_TOKENS').insert({
            TOKEN_ID: tokenId,
            USER_ID: user.USER_ID,
            TOKEN_HASH: tokenHash,
            EXPIRES_AT: expiresAt,
            USED: 0,
            CREATED_DATE: new Date(),
        });

        // Reset Link
        const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
        const resetLink = `${baseUrl}/reset-password/${token}`;

        // TODO: Replace with actual email sending
        console.log(`Email: ${normalizedEmail}`);
        console.log(`Name: ${user.FIRST_NAME}`);
        console.log(`Reset Link: ${resetLink}`);
        console.log(`Expires: ${expiresAt.toLocaleString()}`);

        return {
            success: true,
            message: successMessage,
        };

    } catch (error) {
        console.error("Error initiating password reset:", error);
        return {
            success: false,
            error: "An error occurred. Please try again later.",
        };
    }
}

/**
 * Validate reset token
 */
export async function validateResetToken(token: string): Promise<TokenValidationResult> {
    try {
        if (!token) {
            return {
                success: false,
                error: "Invalid reset token",
            };
        }

        // Find all non-used, non-expired tokens
        const tokenRecords = await db
            .select([
                'TOKEN_ID', 'USER_ID', 'TOKEN_HASH', 'EXPIRES_AT', 'USED'
            ])
            .from('PASSWORD_RESET_TOKENS')
            .where('USED', 0)
            .where('EXPIRES_AT', '>', new Date());

        // Check each token hash to find a match
        for (const record of tokenRecords) {
            const tokenHash = String(record.TOKEN_HASH || '');
            const isValidToken = await verifyToken(token, tokenHash);

            if (isValidToken) {
                // Get user details
                const user = await db
                    .select(['PRIMARY_EMAIL', 'FIRST_NAME'])
                    .from('ACCOUNTS')
                    .where('USER_ID', record.USER_ID)
                    .first();

                if (!user) {
                    return {
                        success: false,
                        error: "User does not exist",
                    };
                }

                return {
                    success: true,
                    userEmail: user.PRIMARY_EMAIL,
                    userId: record.USER_ID,
                };
            }
        }

        return {
            success: false,
            error: "Invalid or expired reset token",
        };

    } catch (error) {
        console.error("Error validating reset token:", error);
        return {
            success: false,
            error: "An error occurred validating the reset token",
        };
    }
}

/**
 * Reset password with token
 */
export async function resetPassword(formData: FormData): Promise<ActionResult> {
    try {
        // Extract and validate data
        const data = {
            token: formData.get('token') as string,
            password: formData.get('password') as string,
            confirmPassword: formData.get('confirmPassword') as string,
        };

        const validation = validatePasswordReset(data);
        if (!validation.success) {
            const errors = validation.error.errors.map(err => err.message).join(', ');
            return {
                success: false,
                error: errors,
            };
        }

        const { token, password } = validation.data;

        // Validate token first
        const tokenValidation = await validateResetToken(token);
        if (!tokenValidation.success) {
            return {
                success: false,
                error: tokenValidation.error || "Invalid reset token",
            };
        }

        const userId = tokenValidation.userId!;

        // Password history check
        const currentUser = await db
            .select(['PASSWORD_HASH', 'PRIMARY_EMAIL'])
            .from('ACCOUNTS')
            .where('USER_ID', userId)
            .first();

        if (!currentUser) {
            return {
                success: false,
                error: "User not found",
            };
        }

        // Check if new password is same as current password
        const passwordHash = String(currentUser.PASSWORD_HASH || '');
        const isSamePassword = await bcrypt.compare(password, passwordHash);
        if (isSamePassword) {
            return {
                success: false,
                error: "New password must be different from your current password",
            };
        }

        // Hash new password
        const saltRounds = 12;
        const newPasswordHash = await bcrypt.hash(password, saltRounds);

        const passwordExpireDate = new Date();
        passwordExpireDate.setDate(passwordExpireDate.getDate() + 90); // 90 days

        await db.transaction(async (trx) => {
            // Update password
            await trx('ACCOUNTS')
                .where('USER_ID', userId)
                .update({
                    PASSWORD_HASH: newPasswordHash,
                    PASSWORD_EXPIRE: passwordExpireDate,
                    LAST_LOGIN: new Date(), // Update last login to current time
                });

            // Invalidate tokens
            await trx('PASSWORD_RESET_TOKENS')
                .where('USER_ID', userId)
                .where('USED', 0)
                .update({
                    USED: 1,
                });

            const tokenRecords = await trx
                .select(['TOKEN_ID', 'TOKEN_HASH'])
                .from('PASSWORD_RESET_TOKENS')
                .where('USER_ID', userId);

            for (const record of tokenRecords) {
                const tokenHash = String(record.TOKEN_HASH || '');
                const isThisToken = await verifyToken(token, tokenHash);
                if (isThisToken) {
                    await trx('PASSWORD_RESET_TOKENS')
                        .where('TOKEN_ID', record.TOKEN_ID)
                        .update({ USED: 1 });
                    break;
                }
            }
        });

        return {
            success: true,
            message: "Password reset successfully. You can now log in with your new password.",
        };

    } catch (error) {
        console.error("Error resetting password:", error);
        return {
            success: false,
            error: "An error occurred while resetting your password. Please try again.",
        };
    }
}