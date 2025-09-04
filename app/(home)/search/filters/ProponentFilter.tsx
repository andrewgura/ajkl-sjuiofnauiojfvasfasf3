"use client";

import React from "react";
import FilterField from "../FilterField";
import { MultiSelectInput } from "@/components/shared/MultiSelectInput";
import { COUNTRY_NAMES } from "@/utils/countries";
import { STATE_NAMES } from "@/utils/states";

interface ProponentFilterProps {
    filterValues: Record<string, any>;
    handleInputChange: (field: string, value: any) => void;
}

const TITLES = [
    "Mr.",
    "Mrs.",
    "Ms.",
    "Dr.",
    "Prof.",
    "Capt.",
    "Lt.",
    "Sgt.",
    "Col."
];

const ProponentFilter: React.FC<ProponentFilterProps> = ({
    filterValues,
    handleInputChange,
}) => {
    return (
        <>
            <FilterField label="Title">
                <MultiSelectInput
                    values={filterValues.proponentTitles || []}
                    onChange={(values) => handleInputChange("proponentTitles", values)}
                    options={TITLES}
                    placeholder="Select titles"
                    searchPlaceholder="Search titles..."
                    emptyText="No titles found."
                />
            </FilterField>

            <FilterField label="First Name">
                <input
                    type="text"
                    placeholder="Enter first name"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.proponentFirstName || ""}
                    onChange={(e) => handleInputChange("proponentFirstName", e.target.value)}
                />
            </FilterField>

            <FilterField label="Middle Name">
                <input
                    type="text"
                    placeholder="Enter middle name"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.proponentMiddleName || ""}
                    onChange={(e) => handleInputChange("proponentMiddleName", e.target.value)}
                />
            </FilterField>

            <FilterField label="Last Name">
                <input
                    type="text"
                    placeholder="Enter last name"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.proponentLastName || ""}
                    onChange={(e) => handleInputChange("proponentLastName", e.target.value)}
                />
            </FilterField>

            <FilterField label="Company">
                <input
                    type="text"
                    placeholder="Enter company"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.proponentCompany || ""}
                    onChange={(e) => handleInputChange("proponentCompany", e.target.value)}
                />
            </FilterField>

            <FilterField label="Street">
                <input
                    type="text"
                    placeholder="Enter street"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.proponentStreet || ""}
                    onChange={(e) => handleInputChange("proponentStreet", e.target.value)}
                />
            </FilterField>

            <FilterField label="City">
                <input
                    type="text"
                    placeholder="Enter city"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.proponentCity || ""}
                    onChange={(e) => handleInputChange("proponentCity", e.target.value)}
                />
            </FilterField>

            <FilterField label="State">
                <MultiSelectInput
                    values={filterValues.proponentStates || []}
                    onChange={(values) => handleInputChange("proponentStates", values)}
                    options={STATE_NAMES}
                    placeholder="Select states"
                    searchPlaceholder="Search states..."
                    emptyText="No states found."
                />
            </FilterField>

            <FilterField label="Zip Code">
                <input
                    type="text"
                    placeholder="Enter zip code"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.proponentZipCode || ""}
                    onChange={(e) => handleInputChange("proponentZipCode", e.target.value)}
                />
            </FilterField>

            <FilterField label="Country">
                <MultiSelectInput
                    values={filterValues.proponentCountries || []}
                    onChange={(values) => handleInputChange("proponentCountries", values)}
                    options={COUNTRY_NAMES}
                    placeholder="Select countries"
                    searchPlaceholder="Search countries..."
                    emptyText="No countries found."
                />
            </FilterField>

            <FilterField label="Phone">
                <input
                    type="text"
                    placeholder="Enter phone"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.proponentPhone || ""}
                    onChange={(e) => handleInputChange("proponentPhone", e.target.value)}
                />
            </FilterField>

            <FilterField label="Email">
                <input
                    type="text"
                    placeholder="Enter email"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.proponentEmail || ""}
                    onChange={(e) => handleInputChange("proponentEmail", e.target.value)}
                />
            </FilterField>
        </>
    );
};

export default ProponentFilter;