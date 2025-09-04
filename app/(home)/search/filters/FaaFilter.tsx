"use client";

import React from "react";
import FilterField from "../FilterField";
import { MultiSelectInput } from "@/components/shared/MultiSelectInput";

interface FaaFilterProps {
    filterValues: Record<string, any>;
    handleInputChange: (field: string, value: any) => void;
}

// TODO: Get FAA Waiver Subtype from DB
const FAA_WAIVER_SUBTYPES = [
    "91.141",
    "99.7",
    "91.137 (A) (1/2/3)",
    "Other"
];

const FaaFilter: React.FC<FaaFilterProps> = ({
    filterValues,
    handleInputChange,
}) => {
    return (
        <>
            <FilterField label="Waiver Subtype">
                <MultiSelectInput
                    values={filterValues.faaWaiverSubtypes || []}
                    onChange={(values) => handleInputChange("faaWaiverSubtypes", values)}
                    options={FAA_WAIVER_SUBTYPES}
                    placeholder="Select waiver subtypes"
                    searchPlaceholder="Search waiver subtypes..."
                    emptyText="No subtypes found."
                />
            </FilterField>

            <FilterField label="Airport of Departure">
                <input
                    type="text"
                    placeholder="Enter ICAO Code(s)"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.faaAirportDeparture || ""}
                    onChange={(e) => handleInputChange("faaAirportDeparture", e.target.value)}
                />
            </FilterField>

            <FilterField label="Intermediate Stop(s)">
                <input
                    type="text"
                    placeholder="Enter ICAO Code(s)"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.faaIntermediateStops || ""}
                    onChange={(e) => handleInputChange("faaIntermediateStops", e.target.value)}
                />
            </FilterField>

            <FilterField label="Airport of Arrival">
                <input
                    type="text"
                    placeholder="Enter ICAO Code(s)"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.faaAirportArrival || ""}
                    onChange={(e) => handleInputChange("faaAirportArrival", e.target.value)}
                />
            </FilterField>
        </>
    );
};

export default FaaFilter;