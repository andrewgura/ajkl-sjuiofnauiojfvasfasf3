"use client";

import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";

export interface DateInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder?: string;
}

const DateInput2 = forwardRef<HTMLInputElement, DateInputProps>(
    ({ className, placeholder = "Select date", value, ...props }, ref) => {
        const [isPickerOpen, setIsPickerOpen] = useState(false);

        const handleInputClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
            e.currentTarget.showPicker();
            setIsPickerOpen(true);
        };

        return (
            <div
                className="relative flex items-center cursor-pointer w-40"
            >
                <div className="absolute left-2 text-gray-400 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar"><path d="M8 2V4"/><path d="M16 2V4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10H21"/></svg>
                </div>
                <Input
                    ref={ref}
                    type="date"
                    {...props}
                    className="h-8 text-xs pl-7 cursor-pointer border border-gray-300 rounded-md"
                    style={{
                        appearance: "none",
                        WebkitAppearance: "none",
                        MozAppearance: "none",
                        ...((!value && !isPickerOpen) && {
                            color: "transparent"
                        })
                    }}
                    onFocus={() => setIsPickerOpen(true)}
                    onBlur={() => setIsPickerOpen(false)}
                    onClick={handleInputClick}
                />
                {!value && !isPickerOpen && (
                    <div className="absolute left-7 text-gray-400 pointer-events-none text-xs">
                        {placeholder}
                    </div>
                )}
            </div>
        );
    }
);

DateInput2.displayName = "DateInput2";

export default DateInput2;