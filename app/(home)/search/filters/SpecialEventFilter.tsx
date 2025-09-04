"use client";

import React from "react";
import FilterField from "../FilterField";
import { MultiSelectInput } from "@/components/shared/MultiSelectInput";

interface SpecialEventFilterProps {
    filterValues: Record<string, any>;
    handleInputChange: (field: string, value: any) => void;
}

// TODO: Get from DB
const OPERATION_TYPES = [
    "Flyover",
    "Air Show",
    "Presidential Movement",
    "VIP Movement",
    "State Dinner",
    "Sporting Event"
];

// TODO: Get From DB
const GATEWAY_AIRPORTS = [
    "DCA - Ronald Reagan Washington National",
    "IAD - Washington Dulles International",
    "BWI - Baltimore/Washington International",
    "ADW - Joint Base Andrews",
    "JFK - John F. Kennedy International",
    "LGA - LaGuardia Airport"
];

const SpecialEventFilter: React.FC<SpecialEventFilterProps> = ({
    filterValues,
    handleInputChange,
}) => {
    return (
        <>
            <FilterField label="Operation Type">
                <MultiSelectInput
                    values={filterValues.eventOperationTypes || []}
                    onChange={(values) => handleInputChange("eventOperationTypes", values)}
                    options={OPERATION_TYPES}
                    placeholder="Select operation types"
                    searchPlaceholder="Search operation types..."
                    emptyText="No operation types found."
                />
            </FilterField>

            <FilterField label="Departure Gateway Airport">
                <MultiSelectInput
                    values={filterValues.eventDepartureGateways || []}
                    onChange={(values) => handleInputChange("eventDepartureGateways", values)}
                    options={GATEWAY_AIRPORTS}
                    placeholder="Select gateway airports"
                    searchPlaceholder="Search gateway airports..."
                    emptyText="No gateway airports found."
                />
            </FilterField>

            <FilterField label="Departure Slot Number">
                <input
                    type="text"
                    placeholder="Enter slot number"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.eventDepartureSlot || ""}
                    onChange={(e) => handleInputChange("eventDepartureSlot", e.target.value)}
                />
            </FilterField>

            <FilterField label="Departure Airport Code">
                <input
                    type="text"
                    placeholder="Enter airport code"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.eventDepartureCode || ""}
                    onChange={(e) => handleInputChange("eventDepartureCode", e.target.value)}
                />
            </FilterField>

            <FilterField label="Arrival Slot Number">
                <input
                    type="text"
                    placeholder="Enter slot number"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.eventArrivalSlot || ""}
                    onChange={(e) => handleInputChange("eventArrivalSlot", e.target.value)}
                />
            </FilterField>

            <FilterField label="Arrival Airport Code">
                <input
                    type="text"
                    placeholder="Enter airport code"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.eventArrivalCode || ""}
                    onChange={(e) => handleInputChange("eventArrivalCode", e.target.value)}
                />
            </FilterField>

            <FilterField label="Aerial Description">
                <input
                    type="text"
                    placeholder="Enter aerial description"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.eventAerialDescription || ""}
                    onChange={(e) => handleInputChange("eventAerialDescription", e.target.value)}
                />
            </FilterField>
        </>
    );
};

export default SpecialEventFilter;