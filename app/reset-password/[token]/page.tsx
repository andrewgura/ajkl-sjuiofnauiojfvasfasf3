"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AppBanner } from "@/components/AppBanner";
import { KeyRound, AlertTriangle, CheckCircle } from "lucide-react";
import { validateResetToken, resetPassword } from "@/lib/actions/auth/password-reset-actions";
import { passwordResetSchema, type PasswordResetData } from "@/lib/validation/password-reset-validate";

interface ResetPasswordPageProps {
    params: Promise<{
        token: string;
    }>;
}

interface TokenValidationState {
    isValid: boolean | null; // null = loading, true = valid, false = invalid
    userEmail?: string;
    error?: string;
}

export default function ResetPasswordPage({ params }: ResetPasswordPageProps) {
    const router = useRouter();
    const resolvedParams = use(params);
    const [tokenState, setTokenState] = useState<TokenValidationState>({ isValid: null });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [resetComplete, setResetComplete] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<PasswordResetData>({
        resolver: zodResolver(passwordResetSchema),
        mode: "onChange",
        defaultValues: {
            token: resolvedParams.token,
        },
    });

    // Validate token on page load
    useEffect(() => {
        const validateToken = async () => {
            try {
                const result = await validateResetToken(resolvedParams.token);

                if (result.success) {
                    setTokenState({
                        isValid: true,
                        userEmail: result.userEmail,
                    });
                } else {
                    setTokenState({
                        isValid: false,
                        error: result.error || "Invalid or expired reset token",
                    });
                }
            } catch (error) {
                console.error("Token validation error:", error);
                setTokenState({
                    isValid: false,
                    error: "An error occurred validating your reset token",
                });
            }
        };

        validateToken();
    }, [resolvedParams.token]);

    const onSubmit = async (data: PasswordResetData) => {
        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append('token', data.token);
            formData.append('password', data.password);
            formData.append('confirmPassword', data.confirmPassword);

            const result = await resetPassword(formData);

            if (result.success) {
                setResetComplete(true);
                // Redirect to login after a few seconds
                setTimeout(() => {
                    router.push('/login');
                }, 3000);
            } else {
                setError("root", {
                    type: "manual",
                    message: result.error || "Failed to reset password",
                });
            }
        } catch (error) {
            console.error("Reset password error:", error);
            setError("root", {
                type: "manual",
                message: "An unexpected error occurred. Please try again.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Loading state
    if (tokenState.isValid === null) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
                <AppBanner />
                <div className="flex-1 flex items-center justify-center p-4">
                    <div className="w-full max-w-md">
                        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                            <p className="text-gray-600">Validating</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Invalid token state
    if (!tokenState.isValid) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
                <AppBanner />
                <div className="flex-1 flex items-center justify-center p-4">
                    <div className="w-full max-w-md">
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <AlertTriangle className="w-8 h-8 text-red-600" />
                                </div>
                                <h1 className="text-2xl font-bold text-gray-900">Invalid Reset Link</h1>
                                <p className="text-gray-600 mt-2">
                                    {tokenState.error || "This password reset link is invalid or has expired."}
                                </p>
                            </div>
                            <div className="space-y-4">
                                <Button
                                    onClick={() => router.push('/login')}
                                    className="w-full"
                                >
                                    Back to Login
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Success state
    if (resetComplete) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
                <AppBanner />
                <div className="flex-1 flex items-center justify-center p-4">
                    <div className="w-full max-w-md">
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="w-8 h-8 text-green-600" />
                                </div>
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">Password Reset Complete</h1>
                                <p className="text-gray-600 mb-6">
                                    Your password has been successfully updated. You can now log in with your new password.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Reset password form
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
            <AppBanner />
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <KeyRound className="w-8 h-8 text-blue-600" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900">Reset Your Password</h1>
                            <p className="text-gray-600 mt-2">
                                Create a new password for {tokenState.userEmail}
                            </p>
                        </div>

                        {errors.root && (
                            <Alert className="mb-4 border-red-200 bg-red-50">
                                <AlertTriangle className="h-4 w-4 text-red-600 color-red" color="red" />
                                <AlertDescription className="text-red-600">
                                    {errors.root.message}
                                </AlertDescription>
                            </Alert>
                        )}

                        <Alert className="mb-6 border-blue-200 bg-blue-50">
                            <AlertDescription className="text-blue-800">
                                <strong>Password Requirements:</strong>
                                <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                                    <li>12-24 characters long</li>
                                    <li>At least 3 of: uppercase, lowercase, numbers, symbols</li>
                                    <li>No more than 2 repeated characters in a row</li>
                                    <li>Different from your current password</li>
                                </ul>
                            </AlertDescription>
                        </Alert>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="password">New Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    {...register("password")}
                                    className={errors.password ? "border-red-500" : ""}
                                    placeholder="Enter your new password"
                                />
                                {errors.password && (
                                    <p className="text-sm text-red-600">{errors.password.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    {...register("confirmPassword")}
                                    className={errors.confirmPassword ? "border-red-500" : ""}
                                    placeholder="Confirm your new password"
                                />
                                {errors.confirmPassword && (
                                    <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Resetting Password..." : "Reset Password"}
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <button
                                onClick={() => router.push('/login')}
                                className="text-sm text-blue-600 hover:underline"
                            >
                                Back to Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}