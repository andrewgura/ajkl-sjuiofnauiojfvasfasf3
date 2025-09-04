"use client";

import React from "react";
import FilterField from "../FilterField";

interface AircraftUasFilterProps {
    filterValues: Record<string, any>;
    handleInputChange: (field: string, value: any) => void;
}

const AircraftUasFilter: React.FC<AircraftUasFilterProps> = ({
    filterValues,
    handleInputChange,
}) => {
    return (
        <>
            <FilterField label="FAA Reg. #">
                <input
                    type="text"
                    placeholder="Enter registration number"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.uasRegistration || ""}
                    onChange={(e) => handleInputChange("uasRegistration", e.target.value)}
                />
            </FilterField>

            <FilterField label="Call Sign">
                <input
                    type="text"
                    placeholder="Enter call sign"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.uasCallSign || ""}
                    onChange={(e) => handleInputChange("uasCallSign", e.target.value)}
                />
            </FilterField>

            <FilterField label="UAS Type">
                <input
                    type="text"
                    placeholder="Enter UAS type"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.uasType || ""}
                    onChange={(e) => handleInputChange("uasType", e.target.value)}
                />
            </FilterField>

            <FilterField label="Make and Model">
                <input
                    type="text"
                    placeholder="Enter make and model"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.uasMakeModel || ""}
                    onChange={(e) => handleInputChange("uasMakeModel", e.target.value)}
                />
            </FilterField>

            <FilterField label="UAS Craft ID">
                <input
                    type="text"
                    placeholder="Enter craft ID"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.uasCraftId || ""}
                    onChange={(e) => handleInputChange("uasCraftId", e.target.value)}
                />
            </FilterField>

            <FilterField label="Transmitter ID">
                <input
                    type="text"
                    placeholder="Enter transmitter ID"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.uasTransmitterId || ""}
                    onChange={(e) => handleInputChange("uasTransmitterId", e.target.value)}
                />
            </FilterField>

            <FilterField label="Gross Weight (lbs)">
                <input
                    type="text"
                    placeholder="Enter weight"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.uasGrossWeight || ""}
                    onChange={(e) => handleInputChange("uasGrossWeight", e.target.value)}
                />
            </FilterField>

            <FilterField label="Remote ID">
                <input
                    type="text"
                    placeholder="Enter remote ID"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.uasRemoteId || ""}
                    onChange={(e) => handleInputChange("uasRemoteId", e.target.value)}
                />
            </FilterField>
        </>
    );
};

export default AircraftUasFilter;