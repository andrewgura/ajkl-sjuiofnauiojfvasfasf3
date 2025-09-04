"use client";

import React from "react";
import FilterField from "../FilterField";
import { MultiSelectInput } from "@/components/shared/MultiSelectInput";

interface DasspFilterProps {
    filterValues: Record<string, any>;
    handleInputChange: (field: string, value: any) => void;
}

// TODO: Get Airports from Database
const AIRPORTS = [
    "ATL - Hartsfield-Jackson Atlanta International",
    "LAX - Los Angeles International",
    "ORD - O'Hare International",
    "DFW - Dallas/Fort Worth International",
    "DEN - Denver International",
    "JFK - John F. Kennedy International",
    "SFO - San Francisco International",
    "SEA - Seattle-Tacoma International",
    "LAS - Harry Reid International",
    "MCO - Orlando International",
    "EWR - Newark Liberty International",
    "MIA - Miami International",
    "PHX - Phoenix Sky Harbor International",
    "IAH - George Bush Intercontinental",
    "BOS - Boston Logan International",
    "MSP - Minneapolis-Saint Paul International",
    "DTW - Detroit Metropolitan Wayne County",
    "FLL - Fort Lauderdale-Hollywood International",
    "PHL - Philadelphia International",
    "CLT - Charlotte Douglas International"
];

// TODO: Get From DB?
const WAIVER_SUBTYPES = [
    "DASSP",
    "DAS90"
];

// TODO get FBO from DB
const FBO_OPTIONS = [
    "3M Company",
    "Act Two Inc.",
    "AirFlite Inc."
];

const DasspFilter: React.FC<DasspFilterProps> = ({
    filterValues,
    handleInputChange,
}) => {
    return (
        <>
            <FilterField label="Waiver Subtype">
                <MultiSelectInput
                    values={filterValues.dsspWaiverSubtypes || []}
                    onChange={(values) => handleInputChange("dsspWaiverSubtypes", values)}
                    options={WAIVER_SUBTYPES}
                    placeholder="Select Waiver Subtypes..."
                    searchPlaceholder="Search Waiver Subtypes..."
                    emptyText="No Waiver Subtypes found."
                />
            </FilterField>

            <FilterField label="Airport">
                <MultiSelectInput
                    values={filterValues.dsspAirports || []}
                    onChange={(values) => handleInputChange("dsspAirports", values)}
                    options={AIRPORTS}
                    placeholder="Select airports..."
                    searchPlaceholder="Search airports..."
                    emptyText="No airports found."
                />
            </FilterField>

            <FilterField label="DASSP Company Name">
                <input
                    type="text"
                    placeholder="Enter company name"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.dsspCompanyName || ""}
                    onChange={(e) => handleInputChange("dsspCompanyName", e.target.value)}
                />
            </FilterField>

            <FilterField label="DASSP Operator Number">
                <input
                    type="text"
                    placeholder="Enter operator number"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.dsspOperatorNumber || ""}
                    onChange={(e) => handleInputChange("dsspOperatorNumber", e.target.value)}
                />
            </FilterField>

            <FilterField label="DASSP Security Coordinator">
                <input
                    type="text"
                    placeholder="Enter security coordinator"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.dsspSecurityCoordinator || ""}
                    onChange={(e) => handleInputChange("dsspSecurityCoordinator", e.target.value)}
                />
            </FilterField>

            <FilterField label="DASSP FBO">
                <MultiSelectInput
                    values={filterValues.dsspFbos || []}
                    onChange={(values) => handleInputChange("dsspFbos", values)}
                    options={FBO_OPTIONS}
                    placeholder="Select FBOs..."
                    searchPlaceholder="Search FBOs..."
                    emptyText="No FBOs found."
                />
            </FilterField>
        </>
    );
};

export default DasspFilter;