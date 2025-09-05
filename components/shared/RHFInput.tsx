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
            <Label className={`text-white text-sm font-medium mb-2 block ${labelStyle}`}>
                {label} {required && <span className="text-red-400">*</span>}
            </Label>

            {description && (
                <p className="text-xs text-slate-400 mt-0.5 mb-1">{description}</p>
            )}

            <input
                {...register}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                autoComplete={autoComplete}
                className={`w-full h-9 px-3 text-sm border rounded-md transition-colors focus:outline-none focus:ring focus:ring-blue-400/30 mt-1 bg-white/5 border-white/20 text-white placeholder:text-blue-200 focus:border-blue-400 ${errorMessage
                        ? "border-red-400 focus:border-red-400 focus:ring-red-400/30"
                        : ""
                    } ${disabled
                        ? "bg-white/5 cursor-not-allowed opacity-50"
                        : ""
                    }`}
            />

            {errorMessage && (
                <p className="text-red-300 text-xs mt-1">{errorMessage}</p>
            )}
        </div>
    );
}