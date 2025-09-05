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
    isValid: boolean | null;
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
            <div className="h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 relative overflow-hidden flex flex-col">
                <AppBanner isLoginPage={true} />
                <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-4">
                    <div className="w-full max-w-md">
                        <div className="bg-white/10 rounded-2xl border border-white/20 shadow-2xl p-8">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <KeyRound className="w-8 h-8 text-white animate-pulse" />
                                </div>
                                <h1 className="text-xl font-bold text-white mb-2">Validating Reset Token</h1>
                                <p className="text-blue-200">Please wait while we verify your request...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Invalid token state
    if (tokenState.isValid === false) {
        return (
            <div className="h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 relative overflow-hidden flex flex-col">
                <AppBanner isLoginPage={true} />
                <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-4">
                    <div className="w-full max-w-md">
                        <div className="bg-white/10 rounded-2xl border border-white/20 shadow-2xl p-8">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <AlertTriangle className="w-8 h-8 text-white" />
                                </div>
                                <h1 className="text-xl font-bold text-white mb-2">Invalid Reset Token</h1>
                                <p className="text-red-200 mb-6">
                                    {tokenState.error || "This reset link is invalid or has expired."}
                                </p>
                                <Button
                                    onClick={() => router.push('/login')}
                                    className="w-full h-10 bg-blue-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
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
            <div className="h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 relative overflow-hidden flex flex-col">
                <AppBanner isLoginPage={true} />
                <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-4">
                    <div className="w-full max-w-md">
                        <div className="bg-white/10 rounded-2xl border border-white/20 shadow-2xl p-8">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="w-8 h-8 text-white" />
                                </div>
                                <h1 className="text-xl font-bold text-white mb-2">Password Reset Complete</h1>
                                <p className="text-green-200 mb-6">
                                    Your password has been successfully updated. You can now log in with your new password.
                                </p>
                                <p className="text-blue-200 text-sm">
                                    Redirecting to login page in a few seconds...
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
        <div className="h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 relative overflow-hidden flex flex-col">
            <AppBanner isLoginPage={true} />

            <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-4">
                <div className="w-full max-w-md">
                    <div className="bg-white/10 rounded-2xl border border-white/20 shadow-2xl p-8">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <KeyRound className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-xl font-bold text-white mb-1">Reset Your Password</h1>
                            <p className="text-slate-300">
                                Create a new password for {tokenState.userEmail}
                            </p>
                        </div>

                        {errors.root && (
                            <div className="flex items-center p-3 bg-red-500/10 border border-red-400/20 rounded-lg text-red-200 text-sm mb-4">
                                <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0" />
                                <span>{errors.root.message}</span>
                            </div>
                        )}

                        <div className="flex items-start p-3 bg-blue-500/10 border border-blue-400/20 rounded-lg text-blue-200 text-sm mb-6">
                            <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                            <div>
                                <div className="font-medium mb-1">Password Requirements:</div>
                                <ul className="list-disc list-inside space-y-1 text-xs">
                                    <li>12-24 characters long</li>
                                    <li>At least 3 of: uppercase, lowercase, numbers, symbols</li>
                                    <li>No more than 2 repeated characters in a row</li>
                                    <li>Different from your current password</li>
                                </ul>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <Label className="text-white text-sm font-medium mb-2 block">
                                    New Password <span className="text-red-400">*</span>
                                </Label>
                                <Input
                                    {...register("password")}
                                    type="password"
                                    placeholder="Enter your new password"
                                    className={`bg-white/5 border-white/20 text-white placeholder:text-blue-200 focus:border-blue-400 focus:ring-blue-400/30 h-10 ${errors.password ? 'border-red-400 focus:border-red-400 focus:ring-red-400/30' : ''
                                        }`}
                                />
                                {errors.password && (
                                    <p className="text-xs text-red-300 mt-1">{errors.password.message}</p>
                                )}
                            </div>

                            <div>
                                <Label className="text-white text-sm font-medium mb-2 block">
                                    Confirm New Password <span className="text-red-400">*</span>
                                </Label>
                                <Input
                                    {...register("confirmPassword")}
                                    type="password"
                                    placeholder="Confirm your new password"
                                    className={`bg-white/5 border-white/20 text-white placeholder:text-blue-200 focus:border-blue-400 focus:ring-blue-400/30 h-10 ${errors.confirmPassword ? 'border-red-400 focus:border-red-400 focus:ring-red-400/30' : ''
                                        }`}
                                />
                                {errors.confirmPassword && (
                                    <p className="text-xs text-red-300 mt-1">{errors.confirmPassword.message}</p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full h-10 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Resetting Password...
                                    </div>
                                ) : (
                                    'Reset Password'
                                )}
                            </Button>

                            <div className="pt-3 border-t border-slate-700">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.push('/login')}
                                    className="w-full h-9 bg-slate-700 border-slate-600 text-white hover:bg-slate-600 hover:border-slate-500"
                                >
                                    Back to Login
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}