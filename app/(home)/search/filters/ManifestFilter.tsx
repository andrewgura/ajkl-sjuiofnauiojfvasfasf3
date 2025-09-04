"use client";

import React from "react";
import FilterField from "../FilterField";
import { MultiSelectInput } from "@/components/shared/MultiSelectInput";

interface ManifestFilterProps {
    filterValues: Record<string, any>;
    handleInputChange: (field: string, value: any) => void;
}

// TODO: Get from DB?
const PERSON_TYPES = [
    "Passenger",
    "Crew Member",
    "Pilot",
    "Co-Pilot",
    "Flight Engineer",
    "Flight Attendant",
    "Air Marshal",
    "Security Personnel"
];

const GENDER_OPTIONS = [
    "Male",
    "Female"
];

const ManifestFilter: React.FC<ManifestFilterProps> = ({
    filterValues,
    handleInputChange,
}) => {
    return (
        <>
            <FilterField label="Person Type">
                <MultiSelectInput
                    values={filterValues.manifestPersonTypes || []}
                    onChange={(values) => handleInputChange("manifestPersonTypes", values)}
                    options={PERSON_TYPES}
                    placeholder="Select person types"
                    searchPlaceholder="Search person types..."
                    emptyText="No person types found."
                />
            </FilterField>

            <FilterField label="First Name">
                <input
                    type="text"
                    placeholder="Enter first name"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.manifestFirstName || ""}
                    onChange={(e) => handleInputChange("manifestFirstName", e.target.value)}
                />
            </FilterField>

            <FilterField label="Middle Name">
                <input
                    type="text"
                    placeholder="Enter middle name"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.manifestMiddleName || ""}
                    onChange={(e) => handleInputChange("manifestMiddleName", e.target.value)}
                />
            </FilterField>

            <FilterField label="Last Name">
                <input
                    type="text"
                    placeholder="Enter last name"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.manifestLastName || ""}
                    onChange={(e) => handleInputChange("manifestLastName", e.target.value)}
                />
            </FilterField>

            <FilterField label="Gender">
                <MultiSelectInput
                    values={filterValues.manifestGenders || []}
                    onChange={(values) => handleInputChange("manifestGenders", values)}
                    options={GENDER_OPTIONS}
                    placeholder="Select genders"
                    searchPlaceholder="Search genders..."
                    emptyText="No options found."
                />
            </FilterField>
        </>
    );
};

export default ManifestFilter;