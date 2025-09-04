"use client";

import React from "react";
import FilterField from "../FilterField";
import { MultiSelectInput } from "@/components/shared/MultiSelectInput";
import { STATE_NAMES } from "@/utils/states";

interface SportingFilterProps {
    filterValues: Record<string, any>;
    handleInputChange: (field: string, value: any) => void;
}

// TODO: Get from DB
const SPORTING_WAIVER_SUBTYPES = [
    "NFL Game",
    "MLB Game",
    "NBA Game",
    "NHL Game",
    "NCAA Football",
    "NASCAR Race",
    "Golf Tournament",
    "Tennis Tournament",
    "Olympic Event"
];

// TODO: Get from DB
const SPORT_TYPES = [
    "Football",
    "Baseball",
    "Basketball",
    "Hockey",
    "Soccer",
    "Tennis",
    "Golf",
    "Auto Racing",
    "Track and Field",
    "Swimming",
    "Gymnastics",
    "Other"
];

// TODO: Get from DB
const VENUES = [
    "FedEx Field",
    "Nationals Park",
    "Capital One Arena",
    "Audi Field",
    "Camden Yards",
    "M&T Bank Stadium",
    "MetLife Stadium",
    "Yankee Stadium",
    "Madison Square Garden",
    "Barclays Center",
    "Citi Field",
    "Lincoln Financial Field",
    "Wells Fargo Center",
    "Citizens Bank Park"
];

const SportingFilter: React.FC<SportingFilterProps> = ({
    filterValues,
    handleInputChange,
}) => {
    return (
        <>
            <FilterField label="Waiver Subtype">
                <MultiSelectInput
                    values={filterValues.sportingWaiverSubtypes || []}
                    onChange={(values) => handleInputChange("sportingWaiverSubtypes", values)}
                    options={SPORTING_WAIVER_SUBTYPES}
                    placeholder="Select waiver subtypes"
                    searchPlaceholder="Search waiver subtypes..."
                    emptyText="No subtypes found."
                />
            </FilterField>

            <FilterField label="Venue State">
                <MultiSelectInput
                    values={filterValues.sportingVenueStates || []}
                    onChange={(values) => handleInputChange("sportingVenueStates", values)}
                    options={STATE_NAMES}
                    placeholder="Select venue states"
                    searchPlaceholder="Search states..."
                    emptyText="No states found."
                />
            </FilterField>

            <FilterField label="City">
                <input
                    type="text"
                    placeholder="Enter city"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.sportingCity || ""}
                    onChange={(e) => handleInputChange("sportingCity", e.target.value)}
                />
            </FilterField>

            <FilterField label="Sport">
                <MultiSelectInput
                    values={filterValues.sportingTypes || []}
                    onChange={(values) => handleInputChange("sportingTypes", values)}
                    options={SPORT_TYPES}
                    placeholder="Select sports"
                    searchPlaceholder="Search sports..."
                    emptyText="No sports found."
                />
            </FilterField>

            <FilterField label="Venue/Stadium">
                <MultiSelectInput
                    values={filterValues.sportingVenues || []}
                    onChange={(values) => handleInputChange("sportingVenues", values)}
                    options={VENUES}
                    placeholder="Select venues/stadiums"
                    searchPlaceholder="Search venues..."
                    emptyText="No venues found."
                />
            </FilterField>

            <FilterField label="Other Venue">
                <input
                    type="text"
                    placeholder="Enter other venue"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.sportingOtherVenue || ""}
                    onChange={(e) => handleInputChange("sportingOtherVenue", e.target.value)}
                />
            </FilterField>

            <FilterField label="Flight Altitude">
                <input
                    type="text"
                    placeholder="Enter altitude"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.sportingFlightAltitude || ""}
                    onChange={(e) => handleInputChange("sportingFlightAltitude", e.target.value)}
                />
            </FilterField>
        </>
    );
};

export default SportingFilter;