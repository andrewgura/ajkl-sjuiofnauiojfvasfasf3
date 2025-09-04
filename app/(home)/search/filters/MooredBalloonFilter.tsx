"use client";

import React from "react";
import FilterField from "../FilterField";

interface MooredBalloonFilterProps {
    filterValues: Record<string, any>;
    handleInputChange: (field: string, value: any) => void;
}

const MooredBalloonFilter: React.FC<MooredBalloonFilterProps> = ({
    filterValues,
    handleInputChange,
}) => {
    return (
        <>
            <FilterField label="Radial Distance from DCA">
                <input
                    type="text"
                    placeholder="Enter distance"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.balloonRadialDistance || ""}
                    onChange={(e) => handleInputChange("balloonRadialDistance", e.target.value)}
                />
            </FilterField>

            <FilterField label="FRZ Airport Destinations">
                <input
                    type="text"
                    placeholder="Enter ICAO code(s)"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.balloonFrzAirportDestinations || ""}
                    onChange={(e) => handleInputChange("balloonFrzAirportDestinations", e.target.value)}
                />
            </FilterField>

            <FilterField label="FRZ Overflights">
                <input
                    type="text"
                    placeholder="Enter FRZ overflights"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.balloonFrzOverflights || ""}
                    onChange={(e) => handleInputChange("balloonFrzOverflights", e.target.value)}
                />
            </FilterField>
        </>
    );
};

export default MooredBalloonFilter;