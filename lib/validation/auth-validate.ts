import { z } from "zod";

// Field validations
export const emailSchema = z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(500, "Email must be less than 500 characters");

export const passwordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be less than 128 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character");

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

// Account Creation Schema
export const createAccountSchema = z
    .object({
        firstName: nameSchema,
        middleName: z
            .string()
            .max(100, "Middle name must be less than 100 characters")
            .regex(/^[a-zA-Z\s'-]*$/, "Middle name can only contain letters, spaces, hyphens, and apostrophes")
            .optional()
            .or(z.literal("")),
        lastName: nameSchema,
        primaryEmail: emailSchema,
        secondaryEmail: z
            .string()
            .email("Please enter a valid email address")
            .max(500, "Email must be less than 500 characters")
            .optional()
            .or(z.literal("")),
        mobilePhone: phoneSchema,
        workPhone: phoneSchema,
        password: passwordSchema,
        confirmPassword: z.string().min(1, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    })
    .refine(
        (data) => !data.secondaryEmail || data.primaryEmail !== data.secondaryEmail,
        {
            message: "Secondary email must be different from primary email",
            path: ["secondaryEmail"],
        }
    );

export type CreateAccountFormData = z.infer<typeof createAccountSchema>;

// Login Schema
export const loginSchema = z.object({
    email: emailSchema,
    password: z.string().min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Utility functions for validation
export const validateEmail = (email: string): boolean => {
    try {
        emailSchema.parse(email);
        return true;
    } catch {
        return false;
    }
};

export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
    try {
        passwordSchema.parse(password);
        return { isValid: true, errors: [] };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return {
                isValid: false,
                errors: error.errors.map((err) => err.message),
            };
        }
        return { isValid: false, errors: ["Invalid password"] };
    }
};

// Server-side validation helpers
export const validateCreateAccount = (data: unknown) => {
    return createAccountSchema.safeParse(data);
};

export const validateLogin = (data: unknown) => {
    return loginSchema.safeParse(data);
};