"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AppBanner } from "@/components/AppBanner";
import {
    CheckCircle,
    AlertTriangle,
    Loader2,
    Mail,
    ArrowRight
} from "lucide-react";
import {
    validateVerificationToken,
    verifyUserAccount,
    resendVerificationEmail
} from "@/lib/actions/auth/email-verification-actions";

interface VerifyEmailPageProps {
    params: Promise<{
        token: string;
    }>;
}

interface VerificationState {
    status: 'loading' | 'success' | 'error' | 'already_verified';
    message?: string;
    userEmail?: string;
    userName?: string;
}

export default function VerifyEmailPage({ params }: VerifyEmailPageProps) {
    const router = useRouter();
    const resolvedParams = use(params);
    const [verificationState, setVerificationState] = useState<VerificationState>({
        status: 'loading'
    });
    const [isResending, setIsResending] = useState(false);

    // Verify token on page load
    useEffect(() => {
        const verifyEmail = async () => {
            try {
                // First validate the token
                const tokenValidation = await validateVerificationToken(resolvedParams.token);

                if (!tokenValidation.success) {
                    setVerificationState({
                        status: 'error',
                        message: tokenValidation.error || "Invalid or expired verification token",
                    });
                    return;
                }

                // Verify Token
                const verificationResult = await verifyUserAccount(resolvedParams.token);

                if (verificationResult.success) {
                    setVerificationState({
                        status: 'success',
                        message: verificationResult.message,
                        userEmail: tokenValidation.userEmail,
                        userName: tokenValidation.userName,
                    });

                    // Redirect to login after 5 seconds
                    setTimeout(() => {
                        router.push('/login?verified=true');
                    }, 5000);
                } else {
                    if (verificationResult.error?.includes('already verified')) {
                        setVerificationState({
                            status: 'already_verified',
                            message: verificationResult.error,
                            userEmail: tokenValidation.userEmail,
                            userName: tokenValidation.userName,
                        });
                    } else {
                        setVerificationState({
                            status: 'error',
                            message: verificationResult.error || "Failed to verify email address",
                        });
                    }
                }
            } catch (error) {
                console.error("Email verification error:", error);
                setVerificationState({
                    status: 'error',
                    message: "An unexpected error occurred during verification",
                });
            }
        };

        verifyEmail();
    }, [resolvedParams.token, router]);

    const handleResendVerification = async () => {
        if (!verificationState.userEmail) return;

        setIsResending(true);
        try {
            const result = await resendVerificationEmail(verificationState.userEmail);

            if (result.success) {
                setVerificationState(prev => ({
                    ...prev,
                    message: result.message || "Verification email sent successfully",
                }));
            } else {
                setVerificationState(prev => ({
                    ...prev,
                    message: result.error || "Failed to resend verification email",
                }));
            }
        } catch (error) {
            console.error("Resend verification error:", error);
            setVerificationState(prev => ({
                ...prev,
                message: "An error occurred while resending the verification email",
            }));
        } finally {
            setIsResending(false);
        }
    };

    const handleLoginRedirect = () => {
        router.push('/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800">
            <AppBanner isLoginPage={true} />

            <div className="flex items-center justify-center min-h-screen px-4">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-xl shadow-2xl p-8">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${verificationState.status === 'success' ? 'bg-green-100' :
                                verificationState.status === 'already_verified' ? 'bg-blue-100' :
                                    verificationState.status === 'error' ? 'bg-red-100' : 'bg-gray-100'
                                }`}>
                                {verificationState.status === 'loading' && (
                                    <Loader2 className="h-8 w-8 text-gray-600 animate-spin" />
                                )}
                                {verificationState.status === 'success' && (
                                    <CheckCircle className="h-8 w-8 text-green-600" />
                                )}
                                {verificationState.status === 'already_verified' && (
                                    <Mail className="h-8 w-8 text-blue-600" />
                                )}
                                {verificationState.status === 'error' && (
                                    <AlertTriangle className="h-8 w-8 text-red-600" />
                                )}
                            </div>

                            <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                {verificationState.status === 'loading' && "Verifying Your Email..."}
                                {verificationState.status === 'success' && "🎉 Email Verified!"}
                                {verificationState.status === 'already_verified' && "Already Verified"}
                                {verificationState.status === 'error' && "Verification Failed"}
                            </h1>

                            {verificationState.userName && (
                                <p className="text-gray-600 mb-4">
                                    Hello, <strong>{verificationState.userName}</strong>
                                </p>
                            )}
                        </div>

                        {/* Content based on status */}
                        {verificationState.status === 'loading' && (
                            <div className="text-center">
                                <p className="text-gray-600 mb-4">
                                    Please wait while we verify your email address...
                                </p>
                            </div>
                        )}

                        {verificationState.status === 'success' && (
                            <div>
                                <Alert className="mb-6 border-green-200 bg-green-50">
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                    <AlertDescription className="text-green-800">
                                        {verificationState.message}
                                    </AlertDescription>
                                </Alert>

                                <div className="space-y-4">
                                    <p className="text-center text-gray-600">
                                        Your account is now active and able to login.
                                    </p>

                                    <Button
                                        onClick={handleLoginRedirect}
                                        className="w-full bg-blue-600 hover:bg-blue-700"
                                    >
                                        Continue to Login
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>

                                    <p className="text-xs text-center text-gray-500">
                                        You will be automatically redirected in 5 seconds...
                                    </p>
                                </div>
                            </div>
                        )}

                        {verificationState.status === 'already_verified' && (
                            <div>
                                <Alert className="mb-6 border-blue-200 bg-blue-50">
                                    <Mail className="h-4 w-4 text-blue-600" />
                                    <AlertDescription className="text-blue-800">
                                        {verificationState.message}
                                    </AlertDescription>
                                </Alert>

                                <div className="space-y-4">
                                    <p className="text-center text-gray-600">
                                        You can now log in to your account.
                                    </p>

                                    <Button
                                        onClick={handleLoginRedirect}
                                        className="w-full bg-blue-600 hover:bg-blue-700"
                                    >
                                        Go to Login
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        )}

                        {verificationState.status === 'error' && (
                            <div>
                                <Alert className="mb-6 border-red-200 bg-red-50 w-full max-w-md">
                                    <div className="flex items-center justify-center gap-2 text-center">
                                        <AlertTriangle className="h-4 w-4 text-red-600 flex-shrink-0" color="red" />
                                        <AlertDescription className="text-red-800">
                                            {verificationState.message}
                                        </AlertDescription>
                                    </div>
                                </Alert>


                                <div className="space-y-4">
                                    {verificationState.userEmail && (
                                        <Button
                                            onClick={handleResendVerification}
                                            disabled={isResending}
                                            variant="outline"
                                            className="w-full"
                                        >
                                            {isResending ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <Mail className="mr-2 h-4 w-4" />
                                                    Resend Verification Email
                                                </>
                                            )}
                                        </Button>
                                    )}

                                    <Button
                                        onClick={handleLoginRedirect}
                                        variant="ghost"
                                        className="w-full"
                                    >
                                        Back to Login
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}