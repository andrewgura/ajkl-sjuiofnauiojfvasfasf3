"use client";

import React from "react";
import FilterField from "../FilterField";
import { MultiSelectInput } from "@/components/shared/MultiSelectInput";

interface DomesticFilterProps {
    filterValues: Record<string, any>;
    handleInputChange: (field: string, value: any) => void;
}

//TODO: Get Subtypes from Database
const WAIVER_SUBTYPES = [
    "CRP - Aerial Pesticide, Crop Dusting/Spraying",
    "LFG - Lifeguard",
    "SVY - Survery Operation"
];

const DomesticFilter: React.FC<DomesticFilterProps> = ({
    filterValues,
    handleInputChange,
}) => {
    return (
        <>
            <FilterField label="Waiver Subtype">
                <MultiSelectInput
                    values={filterValues.domesticWaiverSubtypes || []}
                    onChange={(values) => handleInputChange("domesticWaiverSubtypes", values)}
                    options={WAIVER_SUBTYPES}
                    placeholder="Select Waiver subtypes"
                    searchPlaceholder="Search Waiver Subtypes"
                    emptyText="No Subtypes found."
                />
            </FilterField>

            <FilterField label="Radial Distance from DCA">
                <input
                    type="text"
                    placeholder="Ex: DCA 270 @ 8.5NM"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.domesticRadialDistance || ""}
                    onChange={(e) => handleInputChange("domesticRadialDistance", e.target.value)}
                />
            </FilterField>

            <FilterField label="FRZ Airport Destinations">
                <input
                    type="text"
                    placeholder="Enter ICAO Code(s)"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.domesticFrzAirportDestinations || ""}
                    onChange={(e) => handleInputChange("domesticFrzAirportDestinations", e.target.value)}
                />
            </FilterField>

            <FilterField label="FRZ Overflights">
                <input
                    type="text"
                    placeholder="Enter Street Address of overflight"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.domesticFrzOverflights || ""}
                    onChange={(e) => handleInputChange("domesticFrzOverflights", e.target.value)}
                />
            </FilterField>
        </>
    );
};

export default DomesticFilter;