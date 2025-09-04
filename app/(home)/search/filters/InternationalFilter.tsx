"use client";

import React from "react";
import FilterField from "../FilterField";
import { MultiSelectInput } from "@/components/shared/MultiSelectInput";
import { STATE_NAMES } from "@/utils/states";
import { COUNTRY_NAMES } from "@/utils/countries";

interface InternationalFilterProps {
    filterValues: Record<string, any>;
    handleInputChange: (field: string, value: any) => void;
}

// TODO: Get from DB
const INTL_WAIVER_SUBTYPES = [
    "DCA Gateway - Inbound to DCA from Foreign",
    "US Based, Outbound to Foreign",
    "Foreign Based, Inbound to US",
    "Foreign Based, Outbound from US"
];

const InternationalFilter: React.FC<InternationalFilterProps> = ({
    filterValues,
    handleInputChange,
}) => {
    return (
        <>
            <FilterField label="Waiver Subtype">
                <MultiSelectInput
                    values={filterValues.intlWaiverSubtypes || []}
                    onChange={(values) => handleInputChange("intlWaiverSubtypes", values)}
                    options={INTL_WAIVER_SUBTYPES}
                    placeholder="Select waiver subtypes"
                    searchPlaceholder="Search waiver subtypes..."
                    emptyText="No subtypes found."
                />
            </FilterField>

            <FilterField label="Departure Point">
                <input
                    type="text"
                    placeholder="Enter ICAO Code(s)"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.intlDeparturePoint || ""}
                    onChange={(e) => handleInputChange("intlDeparturePoint", e.target.value)}
                />
            </FilterField>

            <FilterField label="Destination Point">
                <input
                    type="text"
                    placeholder="Enter destination point"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.intlDestinationPoint || ""}
                    onChange={(e) => handleInputChange("intlDestinationPoint", e.target.value)}
                />
            </FilterField>

            <FilterField label="Intermediate Stops">
                <input
                    type="text"
                    placeholder="Enter intermediate stops"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.intlIntermediateStops || ""}
                    onChange={(e) => handleInputChange("intlIntermediateStops", e.target.value)}
                />
            </FilterField>

            <FilterField label="Final Destination">
                <input
                    type="text"
                    placeholder="Enter ICAO Code(s)"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.intlFinalDestination || ""}
                    onChange={(e) => handleInputChange("intlFinalDestination", e.target.value)}
                />
            </FilterField>

            <FilterField label="Destination Name">
                <input
                    type="text"
                    placeholder="Enter destination name"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.intlDestinationName || ""}
                    onChange={(e) => handleInputChange("intlDestinationName", e.target.value)}
                />
            </FilterField>

            <FilterField label="Destination State">
                <MultiSelectInput
                    values={filterValues.intlDestinationStates || []}
                    onChange={(values) => handleInputChange("intlDestinationStates", values)}
                    options={STATE_NAMES}
                    placeholder="Select destination states..."
                    searchPlaceholder="Search states..."
                    emptyText="No states found."
                />
            </FilterField>

            <FilterField label="Destination Country">
                <MultiSelectInput
                    values={filterValues.intlDestinationCountries || []}
                    onChange={(values) => handleInputChange("intlDestinationCountries", values)}
                    options={COUNTRY_NAMES}
                    placeholder="Select destination countries..."
                    searchPlaceholder="Search countries..."
                    emptyText="No countries found."
                />
            </FilterField>
        </>
    );
};

export default InternationalFilter;