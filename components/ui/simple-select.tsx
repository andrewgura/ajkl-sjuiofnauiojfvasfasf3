"use client";

import React from "react";
import { cn } from "@/utils/classes";

interface SelectOption {
  value: string;
  label: string;
}

// Inherit all standard HTML select element props
interface SimpleSelectProps extends React.ComponentPropsWithoutRef<'select'> {
  options: SelectOption[];
  className?: string;
  placeholder?: string;
}

/**
 * A custom select component designed to work directly with react-hook-form's register.
 * It uses React.forwardRef to correctly pass the ref to the native HTML element.
 * @param {SimpleSelectProps} props The props for the select component.
 * @param {React.Ref<HTMLSelectElement>} ref The ref from react-hook-form's register method.
 * @returns {JSX.Element} The select input element.
 */
const SimpleSelect = React.forwardRef<HTMLSelectElement, SimpleSelectProps>(
  ({ options, className, placeholder, ...props }, ref) => {
    // The component is now controlled by the parent, so we do not use internal state.
    // The value and onChange are provided through the `props` object.

    return (
      <select
        // Pass the ref to the native select element so React Hook Form can access it
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-2 focus-visible:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        // Spread all remaining props from the `register` call onto the select element.
        // This includes `name`, `value`, `onChange`, and `onBlur`.
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
);

SimpleSelect.displayName = "SimpleSelect"; // Add a display name for easier debugging

export { SimpleSelect };
