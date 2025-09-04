"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/utils/classes";
import { Label } from "@radix-ui/react-label";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

interface SimpleCheckboxProps {
  label: string;
  checked?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  className?: string;
}

const SimpleCheckbox: React.FC<SimpleCheckboxProps> = ({
  label,
  checked,
  onChange,
  id,
  className,
}) => {
  return (
    <div>
      <label className={cn("inline-flex items-center", className)}>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          id={id}
          className="mr-2"
        />
        {label}
      </label>
    </div>
  );
};

export interface SimpleCheckbox2Props
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const SimpleCheckbox2 = React.forwardRef<HTMLInputElement, SimpleCheckbox2Props>(
  ({ className, label, ...props }, ref) => {
    return (
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          className={cn(
            "h-4 w-4 rounded-full border-gray-300 text-indigo-600 focus:ring-indigo-600",
            className
          )}
          ref={ref}
          {...props}
        />
        <Label htmlFor={props.id} className="text-sm">
          {label}
        </Label>
      </div>
    );
  }
);

SimpleCheckbox2.displayName = "SimpleCheckbox2";

export { Checkbox, SimpleCheckbox, SimpleCheckbox2 };
