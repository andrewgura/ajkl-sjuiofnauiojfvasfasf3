import { z } from "zod";

const emailSchema = z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(500, "Email must be less than 500 characters");

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

// Admin Create User Schema
export const createUserByAdminSchema = z
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
        roles: z
            .array(z.string())
            .min(1, "At least one role must be assigned"),
    })
    .refine(
        (data) => !data.secondaryEmail || data.primaryEmail !== data.secondaryEmail,
        {
            message: "Secondary email must be different from primary email",
            path: ["secondaryEmail"],
        }
    );

export type CreateUserByAdminFormData = z.infer<typeof createUserByAdminSchema>;

// Admin Update User Schema
export const updateUserByAdminSchema = z
    .object({
        userId: z.string().min(1, "User ID is required"),
        firstName: nameSchema.optional(),
        middleName: z
            .string()
            .max(100, "Middle name must be less than 100 characters")
            .regex(/^[a-zA-Z\s'-]*$/, "Middle name can only contain letters, spaces, hyphens, and apostrophes")
            .optional()
            .or(z.literal("")),
        lastName: nameSchema.optional(),
        primaryEmail: emailSchema.optional(),
        secondaryEmail: z
            .string()
            .email("Please enter a valid email address")
            .max(500, "Email must be less than 500 characters")
            .optional()
            .or(z.literal("")),
        mobilePhone: phoneSchema,
        workPhone: phoneSchema,
        roles: z
            .array(z.string())
            .min(1, "At least one role must be assigned")
            .optional(),
        accountActive: z.boolean().optional(),
        accountLocked: z.boolean().optional(),
    })
    .refine(
        (data) => !data.secondaryEmail || !data.primaryEmail || data.primaryEmail !== data.secondaryEmail,
        {
            message: "Secondary email must be different from primary email",
            path: ["secondaryEmail"],
        }
    );

export type UpdateUserByAdminFormData = z.infer<typeof updateUserByAdminSchema>;

// User Filters Schema for search/filtering
export const userFiltersSchema = z.object({
    searchText: z.string().optional(),
    role: z.string().optional(),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    page: z.number().min(1).optional(),
    limit: z.number().min(1).max(100).optional(),
});

export type UserFiltersFormData = z.infer<typeof userFiltersSchema>;