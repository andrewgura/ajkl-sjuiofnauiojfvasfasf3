"use client";

import { WaiverMasterListEntry } from "./types";
import WaiverMasterListDataTable from "./WaiverMasterListDataTable";

interface WaiverMasterListClientProps {
    initialData: WaiverMasterListEntry[];
}

export default function WaiverMasterListClient({ initialData }: WaiverMasterListClientProps) {

    // Handle filter changes
    const handleFilterChange = (filters: {
        searchText: string;
        startDate: Date | null;
        endDate: Date | null;
        companies: string[];
        aircraftTypes: string[];
        statuses: string[];
    }) => {
        console.log("Waiver Master List Filters Changed:", filters);
        // TODO: Implement filtering functionality
    };

    // Handle CSV download
    const handleDownloadCSV = (filters: {
        searchText: string;
        startDate: Date | null;
        endDate: Date | null;
        companies: string[];
        aircraftTypes: string[];
        statuses: string[];
    }) => {
        console.log("Downloading Waiver Master List CSV with filters:", filters);
    };

    return (
        <WaiverMasterListDataTable
            initialData={initialData}
            onFilterChange={handleFilterChange}
            onDownloadCSV={handleDownloadCSV}
        />
    );
}