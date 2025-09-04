"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RHFInput } from "@/components/shared/RHFInput";
import RoleSelector from "@/components/shared/RoleSelector";
import { Lock, Unlock, User, Edit3 } from "lucide-react";
import { USER_ROLES } from "@/utils/user-roles";
import { updateUserByAdmin } from "@/lib/actions/user-management/user-management-actions";
import {
    updateUserByAdminSchema,
    type UpdateUserByAdminFormData,
} from "@/lib/validation/admin-user-validation";
import { User as UserType } from "@/types/user";
import toast from "react-hot-toast";

interface EditUserModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user: UserType;
    onUserUpdated?: () => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
    open,
    onOpenChange,
    user,
    onUserUpdated,
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        reset,
    } = useForm<UpdateUserByAdminFormData>({
        resolver: zodResolver(updateUserByAdminSchema),
        mode: "onBlur",
    });

    const roles = watch("roles");
    const accountLocked = watch("accountLocked");

    useEffect(() => {
        if (open && user) {
            reset({
                userId: user.id,
                firstName: user.firstName || "",
                middleName: user.middleName || "",
                lastName: user.lastName || "",
                primaryEmail: user.primaryEmail || "",
                secondaryEmail: user.secondaryEmail || "",
                mobilePhone: user.mobilePhone || "",
                workPhone: user.workPhone || "",
                roles: user.roles || ["AAP User"],
                accountActive: user.accountActive ?? true,
                accountLocked: user.accountLocked ?? false,
            });
        }
    }, [open, user, reset]);

    const handleRoleToggle = (role: string) => {
        const currentRoles = roles || [];
        const newRoles = currentRoles.includes(role)
            ? currentRoles.filter(r => r !== role)
            : [...currentRoles, role];
        setValue("roles", newRoles, { shouldValidate: true });
    };

    const handleToggleAccountLock = () => {
        setValue("accountLocked", !accountLocked, { shouldValidate: true });
    };

    const handleFormSubmit = async (data: UpdateUserByAdminFormData) => {
        setIsSubmitting(true);

        try {
            const result = await updateUserByAdmin(data);

            if (result.success) {
                toast.success("User updated successfully!");
                onOpenChange(false);
                onUserUpdated?.();
            } else {
                toast.error(result.error || "Failed to update user");
            }
        } catch (error) {
            console.error("User update error:", error);
            toast.error("An error occurred while updating the user. Check the console for message.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        if (isSubmitting) return;
        reset();
        onOpenChange(false);
    };

    if (!user) {
        return null;
    }

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
                <DialogHeader className="flex-shrink-0 px-6 py-4 border-b bg-white">
                    <DialogTitle className="flex items-center text-lg font-semibold text-gray-900">
                        <Edit3 className="w-5 h-5 mr-2 text-blue-600" />
                        Edit User Account
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col flex-1 min-h-0">
                    <div className="flex-1 overflow-y-auto px-6 py-4 bg-white">
                        <div className="space-y-6 pb-4">
                            {/* Account Status */}
                            <div className="bg-gray-50 rounded-lg p-4 border">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <User className="h-5 w-5 text-gray-600" />
                                        <div>
                                            <h4 className="font-medium text-gray-900">Account Status</h4>
                                            <div className="flex items-center space-x-2 mt-1">
                                                <Badge variant={user.accountLocked ? "destructive" : "default"}>
                                                    {user.accountLocked ? 'Locked' : 'Unlocked'}
                                                </Badge>
                                            </div>

                                            {/*  Lock info */}
                                            {user.accountLocked && (user.lockedAt || user.lockedBy) && (
                                                <div className="mt-2 text-xs text-gray-600 bg-red-50 border border-red-200 rounded px-2 py-1">
                                                    {user.lockedAt && (
                                                        <div>Locked: {new Date(user.lockedAt).toLocaleString()}</div>
                                                    )}
                                                    {user.lockedBy && (
                                                        <div>By: {user.lockedBy}</div>
                                                    )}
                                                    {user.lockReason && (
                                                        <div>Reason: {user.lockReason}</div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <Button
                                        type="button"
                                        size="sm"
                                        variant="outline"
                                        onClick={handleToggleAccountLock}
                                        className={`
                                            ${accountLocked
                                                ? "border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
                                                : "border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                                            }
                                        `}
                                    >
                                        {accountLocked ? (
                                            <>
                                                <Unlock className="h-4 w-4 mr-2" />
                                                Unlock
                                            </>
                                        ) : (
                                            <>
                                                <Lock className="h-4 w-4 mr-2" />
                                                Lock
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>

                            {/* Role Assignment */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium text-gray-900 border-b border-gray-200 pb-2">
                                    Role Assignment
                                </h3>
                                <RoleSelector
                                    selectedRoles={roles || []}
                                    availableRoles={USER_ROLES}
                                    onRoleToggle={handleRoleToggle}
                                    defaultRole="AAP User"
                                />
                                {errors.roles && (
                                    <p className="text-red-600 text-sm mt-1">{errors.roles.message}</p>
                                )}
                            </div>

                            {/* Personal Information */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium text-gray-900 border-b border-gray-200 pb-2">
                                    Personal Information
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <RHFInput
                                        label="First Name"
                                        register={register("firstName")}
                                        error={errors.firstName}
                                        required
                                        placeholder="First name"
                                        autoComplete="given-name"
                                    />
                                    <RHFInput
                                        label="Last Name"
                                        register={register("lastName")}
                                        error={errors.lastName}
                                        required
                                        placeholder="Last name"
                                        autoComplete="family-name"
                                    />
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium text-gray-900 border-b border-gray-200 pb-2">
                                    Contact Information
                                </h3>
                                <div className="grid grid-cols-1 gap-4">
                                    <RHFInput
                                        label="Primary Email"
                                        register={register("primaryEmail")}
                                        error={errors.primaryEmail}
                                        required
                                        placeholder="user@example.com"
                                        type="email"
                                        autoComplete="email"
                                    />
                                    <RHFInput
                                        label="Secondary Email"
                                        register={register("secondaryEmail")}
                                        error={errors.secondaryEmail}
                                        placeholder="user@example.com"
                                        type="email"
                                        autoComplete="email"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <RHFInput
                                        label="Mobile Phone"
                                        register={register("mobilePhone")}
                                        error={errors.mobilePhone}
                                        placeholder="(555) 123-4567"
                                        type="tel"
                                        autoComplete="tel"
                                    />
                                    <RHFInput
                                        label="Work Phone"
                                        register={register("workPhone")}
                                        error={errors.workPhone}
                                        placeholder="(555) 123-4567"
                                        type="tel"
                                        autoComplete="tel"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="flex-shrink-0 px-6 py-4 border-t bg-white">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            {isSubmitting ? "Updating..." : "Update User"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditUserModal;