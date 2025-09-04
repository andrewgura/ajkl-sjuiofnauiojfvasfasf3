import { z } from "zod";
import { emailSchema, passwordSchema } from "./auth-validate";

// Password Reset Request Schema
export const passwordResetRequestSchema = z.object({
    email: emailSchema,
});

export type PasswordResetRequestData = z.infer<typeof passwordResetRequestSchema>;

// Password Reset Schema
export const passwordResetSchema = z
    .object({
        token: z.string().min(1, "Reset token is required"),
        password: passwordSchema,
        confirmPassword: z.string().min(1, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export type PasswordResetData = z.infer<typeof passwordResetSchema>;

// Server-side validation helpers
export const validatePasswordResetRequest = (data: unknown) => {
    return passwordResetRequestSchema.safeParse(data);
};

export const validatePasswordReset = (data: unknown) => {
    return passwordResetSchema.safeParse(data);
};