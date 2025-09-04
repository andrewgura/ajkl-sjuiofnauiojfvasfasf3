"use server";

import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import db from "@/lib/db";

interface ActionResult {
    success: boolean;
    message?: string;
    error?: string;
}

interface TokenValidationResult extends ActionResult {
    userEmail?: string;
    userId?: string;
    userName?: string;
}

function generateSecureToken(): string {
    return crypto.randomBytes(32).toString('hex');
}

async function hashToken(token: string): Promise<string> {
    return bcrypt.hash(token, 12);
}

async function verifyToken(token: string, hash: string): Promise<boolean> {
    return bcrypt.compare(token, hash);
}

/**
 * Generate verification token for a user
 */
export async function generateVerificationToken(userId: string): Promise<{ success: boolean; token?: string; error?: string }> {
    try {
        // Clean up old tokens for this user
        await db('EMAIL_VERIFICATION_TOKENS')
            .where('USER_ID', userId)
            .where('USED', 0)
            .del();

        // Create new token
        const token = generateSecureToken();
        const tokenHash = await hashToken(token);
        const tokenId = uuidv4();
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

        // Store new token
        await db('EMAIL_VERIFICATION_TOKENS').insert({
            TOKEN_ID: tokenId,
            USER_ID: userId,
            TOKEN_HASH: tokenHash,
            EXPIRES_AT: expiresAt,
            USED: 0,
            CREATED_DATE: new Date(),
        });

        return {
            success: true,
            token: token,
        };

    } catch (error) {
        console.error("Error generating verification token:", error);
        return {
            success: false,
            error: "Failed to generate verification token",
        };
    }
}

/**
 * Validate verification token
 */
export async function validateVerificationToken(token: string): Promise<TokenValidationResult> {
    try {
        if (!token) {
            return {
                success: false,
                error: "Invalid verification token",
            };
        }

        // Find all non-used, non-expired tokens
        const tokenRecords = await db
            .select([
                'TOKEN_ID', 'USER_ID', 'TOKEN_HASH', 'EXPIRES_AT', 'USED'
            ])
            .from('EMAIL_VERIFICATION_TOKENS')
            .where('USED', 0)
            .where('EXPIRES_AT', '>', new Date());

        // Check each token hash to find a match
        for (const record of tokenRecords) {
            const tokenHash = String(record.TOKEN_HASH || '');
            const isValidToken = await verifyToken(token, tokenHash);

            if (isValidToken) {
                // Get user details
                const user = await db
                    .select(['PRIMARY_EMAIL', 'FIRST_NAME', 'LAST_NAME', 'ACCOUNT_ACTIVE'])
                    .from('ACCOUNTS')
                    .where('USER_ID', record.USER_ID)
                    .first();

                if (!user) {
                    return {
                        success: false,
                        error: "User does not exist",
                    };
                }

                // Check if already verified
                if (user.ACCOUNT_ACTIVE === 1) {
                    return {
                        success: false,
                        error: "Email address is already verified",
                    };
                }

                return {
                    success: true,
                    userEmail: user.PRIMARY_EMAIL,
                    userId: record.USER_ID,
                    userName: `${user.FIRST_NAME} ${user.LAST_NAME}`.trim(),
                };
            }
        }

        return {
            success: false,
            error: "Invalid or expired verification token",
        };

    } catch (error) {
        console.error("Error validating verification token:", error);
        return {
            success: false,
            error: "An error occurred validating the verification token",
        };
    }
}

/**
 * Verify user account with token
 */
export async function verifyUserAccount(token: string): Promise<ActionResult> {
    try {
        if (!token) {
            return {
                success: false,
                error: "Invalid verification token",
            };
        }

        // Validate token first
        const tokenValidation = await validateVerificationToken(token);
        if (!tokenValidation.success) {
            return {
                success: false,
                error: tokenValidation.error || "Invalid verification token",
            };
        }

        const userId = tokenValidation.userId!;

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
            message: "Email address verified successfully! You can now log in to your account.",
        };

    } catch (error) {
        console.error("Error verifying user account:", error);
        return {
            success: false,
            error: "An error occurred while verifying your account. Please try again.",
        };
    }
}

/**
 * Resend verification email for a user
 */
export async function resendVerificationEmail(email: string): Promise<ActionResult> {
    try {
        const normalizedEmail = email.toLowerCase().trim();

        // Check if user exists and is not already verified
        const user = await db
            .select(['USER_ID', 'PRIMARY_EMAIL', 'FIRST_NAME', 'ACCOUNT_ACTIVE'])
            .from('ACCOUNTS')
            .where('PRIMARY_EMAIL', normalizedEmail)
            .first();

        if (!user) {
            // Don't reveal if user exists or not
            return {
                success: true,
                message: "If an unverified account with that email exists, a verification email has been sent.",
            };
        }

        if (user.ACCOUNT_ACTIVE === 1) {
            return {
                success: false,
                error: "This email address is already verified.",
            };
        }

        // Generate new token
        const tokenResult = await generateVerificationToken(user.USER_ID);
        if (!tokenResult.success) {
            return {
                success: false,
                error: "Failed to generate verification token. Please try again.",
            };
        }

        // Send verification email
        const { sendVerificationEmail } = await import('@/lib/email/email-service');
        const emailResult = await sendVerificationEmail(
            user.PRIMARY_EMAIL,
            tokenResult.token!,
            user.FIRST_NAME
        );

        if (!emailResult.success) {
            console.error('Failed to send verification email:', emailResult.error);
            return {
                success: false,
                error: "Failed to send verification email. Please try again.",
            };
        }

        return {
            success: true,
            message: "A verification email has been sent to your email address.",
        };

    } catch (error) {
        console.error("Error resending verification email:", error);
        return {
            success: false,
            error: "An error occurred. Please try again later.",
        };
    }
}

/**
 * Check account verification status
 */
export async function checkAccountStatus(email: string): Promise<{
    success: boolean;
    exists: boolean;
    verified: boolean;
    locked: boolean;
    firstName?: string;
}> {
    try {
        if (!email || typeof email !== 'string') {
            return {
                success: false,
                exists: false,
                verified: false,
                locked: false,
            };
        }

        const normalizedEmail = email.toLowerCase().trim();

        // Check if account exists
        const account = await db
            .select(['USER_ID', 'ACCOUNT_ACTIVE', 'ACCOUNT_LOCKED', 'FIRST_NAME'])
            .from('ACCOUNTS')
            .where('PRIMARY_EMAIL', normalizedEmail)
            .first();

        if (!account) {
            return {
                success: true,
                exists: false,
                verified: false,
                locked: false,
            };
        }

        return {
            success: true,
            exists: true,
            verified: account.ACCOUNT_ACTIVE === 1,
            locked: account.ACCOUNT_LOCKED === 1,
            firstName: account.FIRST_NAME,
        };

    } catch (error) {
        console.error('Check account status error:', error);
        return {
            success: false,
            exists: false,
            verified: false,
            locked: false,
        };
    }
}