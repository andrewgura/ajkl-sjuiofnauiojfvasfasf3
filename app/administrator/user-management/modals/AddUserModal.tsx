"use client";

import React, { useState } from "react";
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
import { RHFInput } from "@/components/shared/RHFInput";
import RoleSelector from "@/components/shared/RoleSelector";
import { UserPlus } from "lucide-react";
import { USER_ROLES } from "@/utils/user-roles";
import { createUserByAdmin } from "@/lib/actions/user-management/user-management-actions";
import {
    createUserByAdminSchema,
    type CreateUserByAdminFormData,
} from "@/lib/validation/admin-user-validation";
import toast from "react-hot-toast";

interface AddUserModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onUserCreated?: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({
    open,
    onOpenChange,
    onUserCreated,
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        reset,
    } = useForm<CreateUserByAdminFormData>({
        resolver: zodResolver(createUserByAdminSchema),
        defaultValues: {
            firstName: "",
            middleName: "",
            lastName: "",
            primaryEmail: "",
            secondaryEmail: "",
            mobilePhone: "",
            workPhone: "",
            roles: ["AAP User"],
        },
        mode: "onBlur",
    });

    const roles = watch("roles");

    const handleRoleToggle = (role: string) => {
        const currentRoles = roles || [];
        const newRoles = currentRoles.includes(role)
            ? currentRoles.filter(r => r !== role)
            : [...currentRoles, role];
        setValue("roles", newRoles, { shouldValidate: true });
    };

    const handleFormSubmit = async (data: CreateUserByAdminFormData) => {
        setIsSubmitting(true);

        try {
            const result = await createUserByAdmin(data);

            if (result.success) {
                toast.success("User created successfully! They will receive a password and verify emails.");
                reset();
                onOpenChange(false);
                onUserCreated?.();
            } else {
                toast.error(result.error || "Failed to create user");
            }
        } catch (error) {
            console.error("User creation error:", error);
            toast.error("An error occurred while creating the user, check the console for message.",);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        if (isSubmitting) return;
        reset();
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
                <DialogHeader className="flex-shrink-0 px-6 py-4 border-b bg-white">
                    <DialogTitle className="flex items-center text-lg font-semibold text-gray-900">
                        <UserPlus className="w-5 h-5 mr-2 text-blue-600" />
                        Add New User
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col flex-1 min-h-0">
                    <div className="flex-1 overflow-y-auto px-6 py-4 bg-white">
                        <div className="space-y-6 pb-4">

                            {/* Roles */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium text-gray-900 border-b border-gray-200 pb-2">
                                    Role Assignment
                                </h3>
                                <RoleSelector
                                    selectedRoles={roles}
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
                                        className="text-black"
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
                                        placeholder="alternate@example.com (optional)"
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
                            {isSubmitting ? "Creating User..." : "Create User"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddUserModal;