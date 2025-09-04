"use client";

import { SelectInput } from "./SelectInput";
import { COUNTRY_NAMES } from "@/utils/countries";

interface CountrySelectProps {
    value: string;
    onChange: (value: string) => void;
}

export function CountrySelect({ value, onChange }: CountrySelectProps) {
    return (
        <SelectInput
            value={value}
            onChange={onChange}
            options={COUNTRY_NAMES}
            placeholder="Select country..."
            searchPlaceholder="Search countries..."
            emptyText="No country found."
        />
    );
}