"use client"

import { useState } from "react";
import Pagination from "@/components/shared/Pagination";
import DasspTable from "./DasspTable";
import { DasspItem } from "./types";
import DataFilterPanel from "@/components/shared/filters/DataFilterPanel";

const ITEMS_PER_PAGE = 20;

interface DasspReportClientProps {
    initialData: DasspItem[];
}

export default function DasspReportClient({ initialData }: DasspReportClientProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [reportData] = useState(initialData);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    // Filter data based on all criteria
    const filteredData = reportData.filter((item) => {
        const matchesSearch =
            searchText === "" ||
            Object.values(item).some((value) =>
                value.toString().toLowerCase().includes(searchText.toLowerCase())
            );

        // Updated date filtering with null handling
        const withinDateRange =
            (!startDate || item.gatewayDepartureDate >= startDate) &&
            (!endDate || item.gatewayDepartureDate <= endDate);

        return matchesSearch && withinDateRange;
    });

    const handleResetFilters = () => {
        setSearchText("");
        setStartDate(null);
        setEndDate(null);
    };

    const handleDownloadCSV = () => {
        // Implement CSV download functionality
        console.log("Downloading CSV...");
    };

    return (
        <div className="w-full">
            <div className="flex gap-6">
                {/* Filters sidebar */}
                <div className="w-64 flex-shrink-0">
                    <DataFilterPanel
                        startDate={startDate}
                        endDate={endDate}
                        searchText={searchText}
                        onStartDateChange={setStartDate}
                        onEndDateChange={setEndDate}
                        onSearchChange={setSearchText}
                        onReset={handleResetFilters}
                        onDownloadCSV={handleDownloadCSV}
                        infoTitle="DASSP Flight Info"
                        infoText="View all scheduled DASSP flights including gateway departures, aircraft details, and DCA arrival/departure times."
                    />
                </div>

                {/* Main content - table */}
                <div className="flex-1">
                    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <DasspTable
                                data={filteredData}
                                currentPage={currentPage}
                                itemsPerPage={ITEMS_PER_PAGE}
                            />
                        </div>
                        {filteredData.length > 0 && (
                            <div className="border-t border-slate-100">
                                <Pagination
                                    currentPage={currentPage}
                                    totalItems={filteredData.length}
                                    itemsPerPage={ITEMS_PER_PAGE}
                                    onPageChange={setCurrentPage}
                                />
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}