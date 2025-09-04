import { z } from "zod";

const nameSchema = z
    .string()
    .min(1, "This field is required")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes");

const phoneSchema = z
    .string()
    .optional()
    .refine(
        (val) => !val || /^[\+]?[1-9][\d]{0,15}$/.test(val.replace(/[\s\-\(\)]/g, "")),
        "Please enter a valid phone number"
    );

const passwordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be less than 128 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character");

// Settings change schema
export const updateSettingsSchema = z.object({
    firstName: nameSchema,
    middleName: z
        .string()
        .max(100, "Middle name must be less than 100 characters")
        .regex(/^[a-zA-Z\s'-]*$/, "Middle name can only contain letters, spaces, hyphens, and apostrophes")
        .optional()
        .or(z.literal("")),
    lastName: nameSchema,
    workPhone: phoneSchema,
    mobilePhone: phoneSchema,
});

// Password change schema
export const changePasswordSchema = z
    .object({
        currentPassword: z.string().min(1, "Current password is required"),
        newPassword: passwordSchema,
        confirmPassword: z.string().min(1, "Please confirm your new password"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    })
    .refine((data) => data.currentPassword !== data.newPassword, {
        message: "New password must be different from current password",
        path: ["newPassword"],
    });

export type UpdateSettingsFormData = z.infer<typeof updateSettingsSchema>;
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

export const validateUpdateSettings = (data: unknown) => {
    return updateSettingsSchema.safeParse(data);
};

export const validateChangePassword = (data: unknown) => {
    return changePasswordSchema.safeParse(data);
};


export interface UserSettingsData {
    userId: string;
    primaryEmail: string;
    secondaryEmail?: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    workPhone?: string;
    mobilePhone?: string;
    creationDate: string | undefined;
    lastLogin: string | undefined;
    roles: string[];
    isInternal: boolean;
    passwordExpire?: string | undefined;
}