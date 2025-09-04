"use client";

import React from "react";
import FilterField from "../FilterField";
import { MultiSelectInput } from "@/components/shared/MultiSelectInput";
import { COUNTRY_NAMES } from "@/utils/countries";

interface AircraftInfoFilterProps {
    filterValues: Record<string, any>;
    handleInputChange: (field: string, value: any) => void;
}

const AircraftInfoFilter: React.FC<AircraftInfoFilterProps> = ({
    filterValues,
    handleInputChange,
}) => {
    return (
        <>
            <FilterField label="Tail Number">
                <input
                    type="text"
                    placeholder="Enter tail number"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.aircraftTailNumber || ""}
                    onChange={(e) => handleInputChange("aircraftTailNumber", e.target.value)}
                />
            </FilterField>

            <FilterField label="Call Sign">
                <input
                    type="text"
                    placeholder="Enter call sign"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.aircraftCallSign || ""}
                    onChange={(e) => handleInputChange("aircraftCallSign", e.target.value)}
                />
            </FilterField>

            <FilterField label="Aircraft Type">
                <input
                    type="text"
                    placeholder="Enter aircraft type"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.aircraftType || ""}
                    onChange={(e) => handleInputChange("aircraftType", e.target.value)}
                />
            </FilterField>

            <FilterField label="Country of Registration">
                <MultiSelectInput
                    values={filterValues.aircraftRegistrationCountries || []}
                    onChange={(values) => handleInputChange("aircraftRegistrationCountries", values)}
                    options={COUNTRY_NAMES}
                    placeholder="Select countries"
                    searchPlaceholder="Search countries..."
                    emptyText="No countries found."
                />
            </FilterField>

            <FilterField label="Gross Weight (lbs)">
                <input
                    type="text"
                    placeholder="Enter weight"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.aircraftGrossWeight || ""}
                    onChange={(e) => handleInputChange("aircraftGrossWeight", e.target.value)}
                />
            </FilterField>
        </>
    );
};

export default AircraftInfoFilter;