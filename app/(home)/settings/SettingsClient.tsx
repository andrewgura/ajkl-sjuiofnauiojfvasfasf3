"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { AlertCircle, User, Mail, Shield } from "lucide-react";
import { RHFInput } from "@/components/shared/RHFInput";
import { PasswordChangeModal } from "./PasswordChangeModal";
import { updateUserSettings } from "@/lib/actions/settings/settings-actions";
import {
    updateSettingsSchema,
    type UpdateSettingsFormData,
    type UserSettingsData
} from "@/lib/validation/settings-validate";
import toast from "react-hot-toast";

interface SettingsContainerProps {
    initialData?: UserSettingsData;
    initialError?: string;
}

export function SettingsContainer({ initialData, initialError }: SettingsContainerProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { update: updateSession } = useSession();

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
        reset,
    } = useForm<UpdateSettingsFormData>({
        resolver: zodResolver(updateSettingsSchema),
        mode: "onBlur",
        defaultValues: initialData ? {
            firstName: initialData.firstName,
            middleName: initialData.middleName || "",
            lastName: initialData.lastName,
            workPhone: initialData.workPhone || "",
            mobilePhone: initialData.mobilePhone || "",
        } : undefined,
    });

    const onSubmit = async (data: UpdateSettingsFormData) => {
        setIsSubmitting(true);

        try {
            const result = await updateUserSettings(data);

            if (result.success) {
                toast.success(result.message || "Settings updated successfully");
                reset(data);

                // Update the NextAuth session with new name data
                await updateSession({
                    firstName: data.firstName,
                    lastName: data.lastName
                });
            } else {
                toast.error(result.error || "Failed to update settings");
            }
        } catch (error) {
            console.error("Settings update error:", error);
            toast.error("An unexpected error occurred");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (initialError) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <div className="bg-red-800 border border-red-600 rounded-lg p-4 flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-200 mt-0.5" />
                    <div>
                        <h3 className="text-sm font-medium text-red-100">Error Loading Settings</h3>
                        <p className="text-sm text-red-200 mt-1">{initialError}</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!initialData) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto"></div>
                    <p className="mt-2 text-slate-300">Loading settings...</p>
                </div>
            </div>
        );
    }

    const getDaysUntilExpiry = () => {
        if (!initialData.passwordExpire) return null;
        try {
            const expireDate = new Date(initialData.passwordExpire);
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

    return (
        <div className="h-full max-h-[calc(100vh-120px)] overflow-hidden">
            <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
                <div className="flex-1 grid grid-cols-1 xl:grid-cols-3 gap-4 p-4">

                    {/* Left Column */}
                    <div className="xl:col-span-1 space-y-4">
                        {/* Account Information */}
                        <div className="border border-slate-600 rounded-lg">
                            <div className="px-4 py-3 border-b border-slate-600">
                                <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    Account Information
                                </h2>
                            </div>
                            <div className="p-4 space-y-3">
                                <div>
                                    <label className="text-xs font-medium text-slate-400">User ID</label>
                                    <div className="mt-1 px-2 py-1.5 bg-slate-700 border border-slate-600 rounded text-xs text-slate-200 font-mono">
                                        {initialData.userId}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-medium text-slate-400 flex items-center gap-1">
                                        <Mail className="w-3 h-3" />
                                        Primary Email
                                    </label>
                                    <div className="mt-1 px-2 py-1.5 bg-slate-700 border border-slate-600 rounded text-xs text-slate-200">
                                        {initialData.primaryEmail}
                                    </div>
                                </div>

                                {initialData.secondaryEmail && (
                                    <div>
                                        <label className="text-xs font-medium text-slate-400">Secondary Email</label>
                                        <div className="mt-1 px-2 py-1.5 bg-slate-700 border border-slate-600 rounded text-xs text-slate-200">
                                            {initialData.secondaryEmail}
                                        </div>
                                    </div>
                                )}

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-xs font-medium text-slate-400">Created</label>
                                        <div className="mt-1 px-2 py-1.5 bg-slate-700 border border-slate-600 rounded text-xs text-slate-200">
                                            {initialData.creationDate || "N/A"}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-xs font-medium text-slate-400">Last Login</label>
                                        <div className="mt-1 px-2 py-1.5 bg-slate-700 border border-slate-600 rounded text-xs text-slate-200">
                                            {initialData.lastLogin || "Never"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Security Section*/}
                        <div className="pt-3">
                            <label className="text-xs font-medium text-slate-400 mb-2 block">Account Security</label>
                            <PasswordChangeModal passwordExpire={initialData.passwordExpire} />
                            {isPasswordExpiringSoon && <p className="text-red-300 text-xs mt-2">Password expiring in {daysUntilExpiry} days.</p>}
                        </div>

                        {/* User Roles (Show only for internal users) */}
                        {initialData.isInternal && (
                            <div className="bg-blue-800 border border-blue-600 rounded-lg">
                                <div className="px-4 py-3 border-b border-blue-600">
                                    <h2 className="text-sm font-semibold text-blue-100 flex items-center gap-2">
                                        <Shield className="w-4 h-4" />
                                        Permissions
                                        <span className="font-light text-blue-200 ml-auto text-[8px]">Internal View only</span>
                                    </h2>
                                </div>
                                <div className="p-4">
                                    <div className="flex flex-wrap gap-1.5">
                                        {initialData.roles.map((role) => (
                                            <span
                                                key={role}
                                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-700 text-blue-100"
                                            >
                                                {role}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Columns */}
                    <div className="xl:col-span-2 space-y-4">
                        {/* Personal Information */}
                        <div className="border border-slate-600 rounded-lg">
                            <div className="px-4 py-3 border-b border-slate-600">
                                <h2 className="text-sm font-semibold text-white">Personal Information</h2>
                            </div>
                            <div className="p-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <RHFInput
                                        label="First Name"
                                        register={register("firstName")}
                                        error={errors.firstName}
                                        required
                                        placeholder="Enter first name"
                                        autoComplete="given-name"
                                    />

                                    <RHFInput
                                        label="Middle Name"
                                        register={register("middleName")}
                                        error={errors.middleName}
                                        placeholder="Enter middle name (optional)"
                                        autoComplete="additional-name"
                                    />

                                    <RHFInput
                                        label="Last Name"
                                        register={register("lastName")}
                                        error={errors.lastName}
                                        required
                                        placeholder="Enter last name"
                                        autoComplete="family-name"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="border border-slate-600 rounded-lg">
                            <div className="px-4 py-3 border-b border-slate-600">
                                <h2 className="text-sm font-semibold text-white">Contact Information</h2>
                            </div>
                            <div className="p-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <RHFInput
                                        label="Work Phone"
                                        register={register("workPhone")}
                                        error={errors.workPhone}
                                        type="tel"
                                        placeholder="Enter work phone (optional)"
                                        autoComplete="work tel"
                                    />

                                    <RHFInput
                                        label="Mobile Phone"
                                        register={register("mobilePhone")}
                                        error={errors.mobilePhone}
                                        type="tel"
                                        placeholder="Enter mobile phone (optional)"
                                        autoComplete="mobile tel"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex-shrink-0 border-t border-slate-600 py-3">
                    <div className="flex justify-end space-x-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => reset()}
                            disabled={isSubmitting || !isDirty}
                            className="h-10 px-4 text-sm bg-slate-700 border-slate-600 text-white hover:bg-slate-600 hover:border-slate-500"
                        >
                            Reset Changes
                        </Button>

                        <Button
                            type="submit"
                            disabled={isSubmitting || !isDirty}
                            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white h-10 px-4 text-sm"
                        >
                            {isSubmitting ? "Saving Changes..." : "Save Changes"}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}