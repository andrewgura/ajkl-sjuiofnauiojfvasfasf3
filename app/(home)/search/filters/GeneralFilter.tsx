"use client";

import React from "react";
import FilterField from "../FilterField";
import CalendarSelect from "@/components/shared/DateInput";
import { SelectInput } from "@/components/shared/SelectInput";
import { MultiSelectInput } from "@/components/shared/MultiSelectInput";

interface GeneralFilterProps {
    filterValues: Record<string, any>;
    handleInputChange: (field: string, value: any) => void;
}

// Waiver types TODO: Get From DB
const WAIVER_TYPES = [
    "Standard Operating Waiver",
    "Emergency Operation Waiver",
    "Training Operation Waiver",
    "Public Aircraft Operation Waiver",
    "Special Event Waiver",
    "Prohibited Area Waiver",
    "DASSP Waiver",
    "Domestic Waiver",
    "International Waiver",
    "Moored Balloon Waiver",
    "Sporting Event Waiver",
    "Unmanned Aircraft Waiver"
];

// Waiver statuses
const WAIVER_STATUSES = [
    "DRAFT",
    "PENDING",
    "IN_REVIEW",
    "APPROVED",
    "REJECTED",
    "COMPLETED",
    "EXPIRED",
    "CANCELLED"
];

const GeneralFilter: React.FC<GeneralFilterProps> = ({
    filterValues,
    handleInputChange,
}) => {
    return (
        <>
            <FilterField label="Start Date">
                <CalendarSelect
                    placeholder="Select start date"
                    value={filterValues.startDate}
                    onChange={(date) => handleInputChange("startDate", date)}
                />
            </FilterField>

            <FilterField label="End Date">
                <CalendarSelect
                    placeholder="Select end date"
                    value={filterValues.endDate}
                    onChange={(date) => handleInputChange("endDate", date)}
                />
            </FilterField>

            <FilterField label="Waiver Type">
                <MultiSelectInput
                    values={filterValues.waiverTypes || []}
                    onChange={(values) => handleInputChange("waiverTypes", values)}
                    options={WAIVER_TYPES}
                    placeholder="Select waiver types..."
                    searchPlaceholder="Search waiver types..."
                    emptyText="No waiver type found."
                />
            </FilterField>

            <FilterField label="Status">
                <MultiSelectInput
                    values={filterValues.waiverStatuses || []}
                    onChange={(values) => handleInputChange("waiverStatuses", values)}
                    options={WAIVER_STATUSES}
                    placeholder="Select statuses..."
                    searchPlaceholder="Search statuses..."
                    emptyText="No status found."
                />
            </FilterField>

            <FilterField label="Waiver Authorization Number">
                <input
                    type="text"
                    placeholder="Enter authorization number"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.waiverAuthNumber}
                    onChange={(e) => handleInputChange("waiverAuthNumber", e.target.value)}
                />
            </FilterField>

            <FilterField label="Confirmation Number">
                <input
                    type="text"
                    placeholder="Enter confirmation number"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.confirmationNumber}
                    onChange={(e) => handleInputChange("confirmationNumber", e.target.value)}
                />
            </FilterField>

            <FilterField label="Comments">
                <input
                    type="text"
                    placeholder="Search in comments"
                    className="w-full p-2 border rounded-md text-xs h-8"
                    value={filterValues.comments}
                    onChange={(e) => handleInputChange("comments", e.target.value)}
                />
            </FilterField>
        </>
    );
};

export default GeneralFilter;