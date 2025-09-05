"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { KeyRound, Eye, EyeOff, AlertTriangle } from "lucide-react";
import { RHFInput } from "@/components/shared/RHFInput";
import { changePassword } from "@/lib/actions/settings/settings-actions";
import {
    changePasswordSchema,
    type ChangePasswordFormData
} from "@/lib/validation/settings-validate";
import toast from "react-hot-toast";

interface PasswordChangeModalProps {
    passwordExpire?: string;
}

export function PasswordChangeModal({ passwordExpire }: PasswordChangeModalProps) {
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [shouldClose, setShouldClose] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset,
        watch
    } = useForm<ChangePasswordFormData>({
        resolver: zodResolver(changePasswordSchema),
        mode: "onChange",
    });

    // Calculate days until password expires
    const getDaysUntilExpiry = () => {
        if (!passwordExpire) return null;
        try {
            const expireDate = new Date(passwordExpire);
            const today = new Date();
            const timeDiff = expireDate.getTime() - today.getTime();
            const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
            return daysDiff;
        } catch {
            return null;
        }
    };

    const daysUntilExpiry = getDaysUntilExpiry();
    const isPasswordExpiringSoon = daysUntilExpiry !== null && daysUntilExpiry <= 30;

    // Handle closing the modal only when we explicitly want to
    // Issues with the modal closing properly; could use more fixing if spare time
    useEffect(() => {
        if (shouldClose && !isSubmitting) {
            setOpen(false);
            setShouldClose(false);
        }
    }, [shouldClose, isSubmitting]);

    const onSubmit = async (data: ChangePasswordFormData) => {
        setIsSubmitting(true);

        try {
            const result = await changePassword(data);

            if (result.success) {
                toast.success(result.message || "Password changed successfully");
                reset();
                setShouldClose(true);
            } else {
                toast.error(result.error || "Failed to change password");
            }
        } catch (error) {
            console.error("Password change error:", error);
            toast.error("An unexpected error occurred");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent bubbling to parent form
        handleSubmit(onSubmit)(e);
    };

    const handleOpenChange = (newOpen: boolean) => {
        if (!newOpen && isSubmitting) {
            return;
        }

        if (!newOpen && !shouldClose) {
            if (isSubmitting) return;
        }

        setOpen(newOpen);
        if (!newOpen) {
            reset();
            setShouldClose(false);
        }
    };


    const currentPassword = watch("currentPassword");
    const newPassword = watch("newPassword");
    const confirmPassword = watch("confirmPassword");

    // Check if form can be submitted
    const canSubmit = isValid &&
        currentPassword &&
        newPassword &&
        confirmPassword &&
        !isSubmitting;

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className={`h-8 px-3 ${isPasswordExpiringSoon
                        ? "text-orange-300 hover:text-orange-200 hover:bg-orange-800 border-orange-600"
                        : "text-blue-300 hover:text-blue-200 hover:bg-blue-800 border-blue-600"
                        }`}
                >
                    <KeyRound className="mr-2 h-3 w-3" />
                    Change Password
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md bg-slate-900 border border-slate-600">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-white">
                        <KeyRound className="w-4 h-4" />
                        Change Password
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                    {/* Password expiring */}
                    {isPasswordExpiringSoon && (
                        <Alert className="border-orange-600 bg-orange-800">
                            <AlertTriangle className="h-4 w-4 text-orange-200" />
                            <AlertDescription className="text-orange-100">
                                {daysUntilExpiry! > 0
                                    ? `Your password will expire in ${daysUntilExpiry} day${daysUntilExpiry === 1 ? '' : 's'}.`
                                    : "Your password has expired."
                                }
                            </AlertDescription>
                        </Alert>
                    )}

                    {/* Current Password */}
                    <div className="relative">
                        <RHFInput
                            label="Current Password"
                            register={register("currentPassword")}
                            error={errors.currentPassword}
                            type={showCurrentPassword ? "text" : "password"}
                            required
                            placeholder="Enter your current password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute right-3 top-8 text-slate-400 hover:text-slate-200"
                        >
                            {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>

                    {/* New Password */}
                    <div className="relative">
                        <RHFInput
                            label="New Password"
                            register={register("newPassword")}
                            error={errors.newPassword}
                            type={showNewPassword ? "text" : "password"}
                            required
                            placeholder="Enter your new password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-8 text-slate-400 hover:text-slate-200"
                        >
                            {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                        <RHFInput
                            label="Confirm New Password"
                            register={register("confirmPassword")}
                            error={errors.confirmPassword}
                            type={showConfirmPassword ? "text" : "password"}
                            required
                            placeholder="Confirm your new password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-8 text-slate-400 hover:text-slate-200"
                        >
                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>

                    {/* Password Requirements */}
                    <div className="p-3 bg-slate-800 border border-slate-600 rounded-lg">
                        <p className="text-xs font-medium text-slate-200 mb-2">Password Requirements:</p>
                        <ul className="text-xs text-slate-300 space-y-1">
                            <li className="flex items-center gap-1">
                                <div className={`w-1.5 h-1.5 rounded-full ${newPassword && newPassword.length >= 8 ? 'bg-green-400' : 'bg-red-500'}`} />
                                At least 8 characters long
                            </li>
                            <li className="flex items-center gap-1">
                                <div className={`w-1.5 h-1.5 rounded-full ${newPassword && /[A-Z]/.test(newPassword) ? 'bg-green-400' : 'bg-red-500'}`} />
                                One uppercase letter
                            </li>
                            <li className="flex items-center gap-1">
                                <div className={`w-1.5 h-1.5 rounded-full ${newPassword && /[a-z]/.test(newPassword) ? 'bg-green-400' : 'bg-red-500'}`} />
                                One lowercase letter
                            </li>
                            <li className="flex items-center gap-1">
                                <div className={`w-1.5 h-1.5 rounded-full ${newPassword && /[0-9]/.test(newPassword) ? 'bg-green-400' : 'bg-red-500'}`} />
                                One number
                            </li>
                            <li className="flex items-center gap-1">
                                <div className={`w-1.5 h-1.5 rounded-full ${newPassword && /[^A-Za-z0-9]/.test(newPassword) ? 'bg-green-400' : 'bg-red-500'}`} />
                                One special character
                            </li>
                        </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShouldClose(true)}
                            disabled={isSubmitting}
                            className="h-8 px-4 text-sm bg-slate-700 border-slate-600 text-white hover:bg-slate-600 hover:border-slate-500"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={!canSubmit}
                            className={`h-8 px-4 text-sm ${canSubmit
                                ? "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
                                : "bg-slate-600 text-slate-400 cursor-not-allowed"
                                }`}
                        >
                            Change Password
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}