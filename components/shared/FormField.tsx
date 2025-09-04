"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface FormFieldProps {
    label: string;
    name: string;
    type?: string;
    required?: boolean;
    placeholder?: string;
    className?: string;
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    error?: string;
}

export function FormField({
    label,
    name,
    type = "text",
    required,
    placeholder,
    className,
    value = "",
    onChange,
    disabled,
    error,
}: FormFieldProps) {
    return (
        <div className={className}>
            <Label className="text-sm text-gray-700 flex items-center gap-1.5">
                {label} {required && <span className="text-red-500 text-sm">*</span>}
            </Label>
            <Input
                name={name}
                type={type}
                required={required}
                placeholder={placeholder}
                className={`h-10 text-base mt-1.5 bg-white ${error ? 'border-red-500 focus:border-red-500' : ''}`}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
            {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
        </div>
    );
}