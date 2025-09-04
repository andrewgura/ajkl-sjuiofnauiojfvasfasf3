/**
 * For use with react-hook-form
 */
"use client";

import { Label } from "@/components/ui/label";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";

interface RHFInputProps {
    label: string;
    labelStyle?: string;
    register: UseFormRegisterReturn;
    error?: FieldError | string;
    required?: boolean;
    type?: "text" | "email" | "password" | "tel" | "number" | "url" | "search";
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    description?: string;
    autoComplete?: string;
}

export function RHFInput({
    label,
    labelStyle,
    register,
    error,
    required = false,
    type = "text",
    placeholder,
    className,
    disabled = false,
    description,
    autoComplete,
}: RHFInputProps) {
    const errorMessage = typeof error === "string" ? error : error?.message;

    return (
        <div className={className}>
            <Label className={`text-sm text-black flex items-center gap-1.5 ${labelStyle}`}>
                {label} {required && <span className="text-red-500 text-sm">*</span>}
            </Label>

            {description && (
                <p className="text-xs text-gray-500 mt-0.5 mb-1">{description}</p>
            )}

            <input
                {...register}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                autoComplete={autoComplete}
                className={`w-full h-9 px-3 text-sm border rounded-md transition-colors focus:outline-none focus:ring ring-offset-4 mt-1 ${errorMessage
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    } ${disabled ? "bg-gray-50 cursor-not-allowed opacity-50" : "bg-white"}`}
            />

            {errorMessage && (
                <p className="text-red-500 text-xs mt-0.5">{errorMessage}</p>
            )}
        </div>
    );
}