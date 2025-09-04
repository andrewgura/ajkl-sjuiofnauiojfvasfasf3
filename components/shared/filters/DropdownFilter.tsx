"use client";

import { SelectInput } from "@/components/shared/SelectInput";

interface DropdownFilterProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options?: Array<{ value: string; label: string }>;
}

export const DropdownFilter = ({
    label,
    value,
    onChange,
    options = []
}: DropdownFilterProps) => {
    // Convert options format if they exist
    const stringOptions = options.length > 0
        ? options.map(option => option.label)
        : ["Option 1", "Option 2", "Option 3"]; // Default options for demo

    return (
        <div className="relative">
            <SelectInput
                value={value}
                onChange={onChange}
                options={stringOptions}
                placeholder={label}
                searchPlaceholder="Search..."
                emptyText="No options found"
            />
        </div>
    );
};

export default DropdownFilter;