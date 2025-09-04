"use client";

import React from "react";
import FilterField from "../FilterField";
import { MultiSelectInput } from "@/components/shared/MultiSelectInput";

interface DisneyFilterProps {
    filterValues: Record<string, any>;
    handleInputChange: (field: string, value: any) => void;
}

//TODO: Get from DB?
const DISNEY_PARKS = [
    "Disney World, Florida",
    "Disneyland, California"
]

const DisneyFilter: React.FC<DisneyFilterProps> = ({
    filterValues,
    handleInputChange,
}) => {
    return (
        <>
            <FilterField label="Disney Theme Park">
                <MultiSelectInput
                    values={filterValues.disneyThemeParks || []}
                    onChange={(values) => handleInputChange("disneyThemeParks", values)}
                    options={DISNEY_PARKS}
                    placeholder="Select Disney Theme Parks"
                    searchPlaceholder="Search Disney Theme Parks..."
                    emptyText="No Disney Theme Parks found."
                />
            </FilterField>

            <FilterField label="Departure Point">
                <input
                    type="text"
                    placeholder="Enter ICAO Code(s)"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.disneyDeparturePoint || ""}
                    onChange={(e) => handleInputChange("disneyDeparturePoint", e.target.value)}
                />
            </FilterField>

            <FilterField label="Final Destination">
                <input
                    type="text"
                    placeholder="Enter ICAO Code(s)"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.disneyFinalDestination || ""}
                    onChange={(e) => handleInputChange("disneyFinalDestination", e.target.value)}
                />
            </FilterField>
        </>
    );
};

export default DisneyFilter;