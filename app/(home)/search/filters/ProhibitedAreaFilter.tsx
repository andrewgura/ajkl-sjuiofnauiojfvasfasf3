"use client";

import React from "react";
import FilterField from "../FilterField";
import { MultiSelectInput } from "@/components/shared/MultiSelectInput";

interface ProhibitedAreaFilterProps {
    filterValues: Record<string, any>;
    handleInputChange: (field: string, value: any) => void;
}

// TODO: Get Prohibited Subtypes from DB
const PROHIBITED_WAIVER_SUBTYPES = [
    "P-56 - White House and Naval Observatory",
    "P-40 - Camp David",
    "P-49 - Crawford Texas",
    "P-51 - United Nations Headquarters"
];

const ProhibitedAreaFilter: React.FC<ProhibitedAreaFilterProps> = ({
    filterValues,
    handleInputChange,
}) => {
    return (
        <>
            <FilterField label="Waiver Subtype">
                <MultiSelectInput
                    values={filterValues.prohibitedWaiverSubtypes || []}
                    onChange={(values) => handleInputChange("prohibitedWaiverSubtypes", values)}
                    options={PROHIBITED_WAIVER_SUBTYPES}
                    placeholder="Select waiver subtypes"
                    searchPlaceholder="Search waiver subtypes..."
                    emptyText="No subtypes found."
                />
            </FilterField>

            <FilterField label="Airport of Departure">
                <input
                    type="text"
                    placeholder="Enter departure airport"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.prohibitedAirportDeparture || ""}
                    onChange={(e) => handleInputChange("prohibitedAirportDeparture", e.target.value)}
                />
            </FilterField>

            <FilterField label="Intermediate Stop(s)">
                <input
                    type="text"
                    placeholder="Enter intermediate stops"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.prohibitedIntermediateStops || ""}
                    onChange={(e) => handleInputChange("prohibitedIntermediateStops", e.target.value)}
                />
            </FilterField>

            <FilterField label="Airport of Arrival">
                <input
                    type="text"
                    placeholder="Enter arrival airport"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.prohibitedAirportArrival || ""}
                    onChange={(e) => handleInputChange("prohibitedAirportArrival", e.target.value)}
                />
            </FilterField>
        </>
    );
};

export default ProhibitedAreaFilter;