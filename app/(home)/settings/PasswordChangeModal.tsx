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
                        ? "text-orange-600 hover:text-orange-700 hover:bg-orange-50 border-orange-200"
                        : "text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200"
                        }`}
                >
                    <KeyRound className="mr-2 h-3 w-3" />
                    Change Password
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <KeyRound className="w-4 h-4" />
                        Change Password
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                    {/* Password expiring */}
                    {isPasswordExpiringSoon && (
                        <Alert className="border-orange-200 bg-orange-50">
                            <AlertTriangle className="h-4 w-4 text-orange-600" />
                            <AlertDescription className="text-orange-700">
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
                            className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
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
                            className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
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
                            className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
                        >
                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>

                    {/* Password Requirements */}
                    <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs font-medium text-gray-700 mb-2">Password Requirements:</p>
                        <ul className="text-xs text-gray-600 space-y-1">
                            <li className="flex items-center gap-1">
                                <div className={`w-1.5 h-1.5 rounded-full ${newPassword && newPassword.length >= 8 ? 'bg-green-500' : 'bg-gray-300'}`} />
                                At least 8 characters long
                            </li>
                            <li className="flex items-center gap-1">
                                <div className={`w-1.5 h-1.5 rounded-full ${newPassword && /[A-Z]/.test(newPassword) ? 'bg-green-500' : 'bg-gray-300'}`} />
                                One uppercase letter
                            </li>
                            <li className="flex items-center gap-1">
                                <div className={`w-1.5 h-1.5 rounded-full ${newPassword && /[a-z]/.test(newPassword) ? 'bg-green-500' : 'bg-gray-300'}`} />
                                One lowercase letter
                            </li>
                            <li className="flex items-center gap-1">
                                <div className={`w-1.5 h-1.5 rounded-full ${newPassword && /[0-9]/.test(newPassword) ? 'bg-green-500' : 'bg-gray-300'}`} />
                                One number
                            </li>
                            <li className="flex items-center gap-1">
                                <div className={`w-1.5 h-1.5 rounded-full ${newPassword && /[^A-Za-z0-9]/.test(newPassword) ? 'bg-green-500' : 'bg-gray-300'}`} />
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
                            className="h-8 px-4 text-sm"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={!canSubmit}
                            className={`h-8 px-4 text-sm ${canSubmit
                                ? "bg-blue-600 hover:bg-blue-700 text-white"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
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