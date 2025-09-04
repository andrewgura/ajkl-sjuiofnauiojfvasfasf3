"use client";

import React from "react";
import FilterField from "../FilterField";
import { MultiSelectInput } from "@/components/shared/MultiSelectInput";
import { STATE_NAMES } from "@/utils/states";

interface UnmannedAircraftFilterProps {
    filterValues: Record<string, any>;
    handleInputChange: (field: string, value: any) => void;
}

//TODO: Get from DB
const UNMANNED_WAIVER_SUBTYPES = [
    "Commercial UAS Operation",
    "Drone Photography",
    "Drone Survey",
    "Drone Inspection",
    "First Responder UAS",
    "Search & Rescue UAS",
    "Agricultural UAS"
];

const UnmannedAircraftFilter: React.FC<UnmannedAircraftFilterProps> = ({
    filterValues,
    handleInputChange,
}) => {
    return (
        <>
            <FilterField label="Waiver Subtype">
                <MultiSelectInput
                    values={filterValues.unmannedWaiverSubtypes || []}
                    onChange={(values) => handleInputChange("unmannedWaiverSubtypes", values)}
                    options={UNMANNED_WAIVER_SUBTYPES}
                    placeholder="Select waiver subtypes"
                    searchPlaceholder="Search waiver subtypes..."
                    emptyText="No subtypes found."
                />
            </FilterField>

            <FilterField label="Street">
                <input
                    type="text"
                    placeholder="Enter street"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.unmannedStreet || ""}
                    onChange={(e) => handleInputChange("unmannedStreet", e.target.value)}
                />
            </FilterField>

            <FilterField label="City">
                <input
                    type="text"
                    placeholder="Enter city"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.unmannedCity || ""}
                    onChange={(e) => handleInputChange("unmannedCity", e.target.value)}
                />
            </FilterField>

            <FilterField label="State">
                <MultiSelectInput
                    values={filterValues.unmannedStates || []}
                    onChange={(values) => handleInputChange("unmannedStates", values)}
                    options={STATE_NAMES}
                    placeholder="Select states"
                    searchPlaceholder="Search states..."
                    emptyText="No states found."
                />
            </FilterField>

            <FilterField label="Zip">
                <input
                    type="text"
                    placeholder="Enter zip code"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.unmannedZip || ""}
                    onChange={(e) => handleInputChange("unmannedZip", e.target.value)}
                />
            </FilterField>

            <FilterField label="Radial Distance from DCA">
                <input
                    type="text"
                    placeholder="Enter distance"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.unmannedRadialDistance || ""}
                    onChange={(e) => handleInputChange("unmannedRadialDistance", e.target.value)}
                />
            </FilterField>

            <FilterField label="Flight Altitude">
                <input
                    type="text"
                    placeholder="Enter altitude"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.unmannedFlightAltitude || ""}
                    onChange={(e) => handleInputChange("unmannedFlightAltitude", e.target.value)}
                />
            </FilterField>

            <FilterField label="Latitude & Longitude">
                <input
                    type="text"
                    placeholder="Enter coordinates"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.unmannedCoordinates || ""}
                    onChange={(e) => handleInputChange("unmannedCoordinates", e.target.value)}
                />
            </FilterField>
        </>
    );
};

export default UnmannedAircraftFilter;