"use client";

import { Waiver, User, TSA_ATTENTION_STATUSES } from "../types";
import WaiverDataTable from "../WaiverDataTable";
import { useState } from "react";

interface TsaAttentionProps {
    initialData: Waiver[];
    users: User[];
}

export default function TsaAttentionClient({ initialData, users }: TsaAttentionProps) {
    const [filteredData, setFilteredData] = useState(initialData);

    // Handle filter changes
    const handleFilterChange = (filters: {
        searchText: string;
        startDate: Date | null;
        endDate: Date | null;
        assignees: string[];
        statuses: string[];
    }) => {
        console.log("TSA Attention Filters Changed:", filters);
    };

    // Handle CSV download
    const handleDownloadCSV = (filters: {
        searchText: string;
        startDate: Date | null;
        endDate: Date | null;
        assignees: string[];
        statuses: string[];
    }) => {
        console.log("Downloading TSA Attention CSV with filters:", filters);
    };

    return (
        <WaiverDataTable
            initialData={initialData}
            users={users}
            statusOptions={TSA_ATTENTION_STATUSES}
            infoTitle="TSA Process"
            infoText="View and manage waivers requiring TSA attention. Track progress through the TSA approval process."
            onFilterChange={handleFilterChange}
            onDownloadCSV={handleDownloadCSV}
        />
    );
}