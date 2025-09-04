"use client";

import { Waiver, User, ProcessStepType } from "../types";
import WaiverDataTable from "../WaiverDataTable";
import { useState } from "react";

interface SubmittedWaiversProps {
    initialData: Waiver[];
    users: User[];
}

const ALL_STATUSES: ProcessStepType[] = [
    "TSA ASSIGNED",
    "IAPWG REVIEW",
    "DETERMINED",
    "VETTED",
    "READY FOR FAA CERTIFICATION",
    "DASSP READY FOR CERTIFICATION",
    "VET REJECTED",
    "QA REJECTED",
    "FAA REJECTED",
    "TSA REJECTED",
    "FAA PENDING",
    "APPROVED"
];

export default function SubmittedWaiversClient({ initialData, users }: SubmittedWaiversProps) {
    const [filteredData, setFilteredData] = useState(initialData);

    // Filters
    const handleFilterChange = (filters: {
        searchText: string;
        startDate: Date | null;
        endDate: Date | null;
        assignees: string[];
        statuses: string[];
    }) => {
        console.log("Submitted Waivers Filters Changed:", filters);
    };

    // Handle CSV download
    const handleDownloadCSV = (filters: {
        searchText: string;
        startDate: Date | null;
        endDate: Date | null;
        assignees: string[];
        statuses: string[];
    }) => {
        console.log("Downloading Submitted Waivers CSV with filters:", filters);
    };

    return (
        <WaiverDataTable
            initialData={initialData}
            users={users}
            statusOptions={ALL_STATUSES}
            infoTitle="All Waivers"
            infoText="View and track all waivers in the system, regardless of status. Use filters to find specific types of waivers."
            onFilterChange={handleFilterChange}
            onDownloadCSV={handleDownloadCSV}
        />
    );
}