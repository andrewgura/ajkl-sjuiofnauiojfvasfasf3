"use client";

import { Waiver, User, FAA_ATTENTION_STATUSES } from "../types";
import WaiverDataTable from "../WaiverDataTable";
import { useState } from "react";

interface FaaAttentionProps {
    initialData: Waiver[];
    users: User[];
}

export default function FaaAttentionClient({ initialData, users }: FaaAttentionProps) {
    const [filteredData, setFilteredData] = useState(initialData);

    // Handle filter changes from WaiverDataTable
    const handleFilterChange = (filters: {
        searchText: string;
        startDate: Date | null;
        endDate: Date | null;
        assignees: string[];
        statuses: string[];
    }) => {
        console.log("FAA Attention Filters Changed:", filters);
    };

    // Handle CSV download
    const handleDownloadCSV = (filters: {
        searchText: string;
        startDate: Date | null;
        endDate: Date | null;
        assignees: string[];
        statuses: string[];
    }) => {
        console.log("Downloading FAA Attention CSV with filters:", filters);
    };

    return (
        <WaiverDataTable
            initialData={initialData}
            users={users}
            statusOptions={FAA_ATTENTION_STATUSES}
            infoTitle="FAA Process"
            infoText="View and manage waivers requiring FAA attention. Track progress through the FAA certification process."
            onFilterChange={handleFilterChange}
            onDownloadCSV={handleDownloadCSV}
        />
    );
}