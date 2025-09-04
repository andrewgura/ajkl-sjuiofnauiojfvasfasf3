"use client";

import { Waiver, User, FINISHED_WAIVERS_STATUSES } from "../types";
import WaiverDataTable from "../WaiverDataTable";
import { useState } from "react";

interface FinishedWaiversProps {
    initialData: Waiver[];
    users: User[];
}

export default function FinishedWaiversClient({ initialData, users }: FinishedWaiversProps) {
    const [filteredData, setFilteredData] = useState(initialData);

    // Filters
    const handleFilterChange = (filters: {
        searchText: string;
        startDate: Date | null;
        endDate: Date | null;
        assignees: string[];
        statuses: string[];
    }) => {
        console.log("Finished Waivers Filters Changed:", filters);
    };

    // CSV download
    const handleDownloadCSV = (filters: {
        searchText: string;
        startDate: Date | null;
        endDate: Date | null;
        assignees: string[];
        statuses: string[];
    }) => {
        console.log("Downloading Finished Waivers CSV with filters:", filters);
    };

    return (
        <WaiverDataTable
            initialData={initialData}
            users={users}
            statusOptions={FINISHED_WAIVERS_STATUSES}
            infoTitle="Completed Waivers"
            infoText="View all completed waivers including approved and rejected. Use filters to find specific waivers by status or date range."
            onFilterChange={handleFilterChange}
            onDownloadCSV={handleDownloadCSV}
        />
    );
}