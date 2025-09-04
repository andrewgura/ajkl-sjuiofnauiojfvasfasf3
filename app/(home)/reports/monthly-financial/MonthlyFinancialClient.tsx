"use client"

import { useState } from "react";
import Pagination from "@/components/shared/Pagination";
import MonthlyFinancialTable from "./MonthlyFinancialTable";
import { MonthlyFinancialItem } from "./types";
import DataFilterPanel from "@/components/shared/filters/DataFilterPanel";

const ITEMS_PER_PAGE = 20;

interface MonthlyFinancialClientProps {
    initialData: MonthlyFinancialItem[];
}

export default function MonthlyFinancialClient({ initialData }: MonthlyFinancialClientProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [reportData] = useState(initialData);


    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [searchText, setSearchText] = useState("");

    // Filter data based on date range and search
    const filteredData = reportData.filter((item) => {
        // Date range filter
        const itemDate = new Date(item.startDate);
        const matchesDateRange =
            (!startDate || itemDate >= startDate) &&
            (!endDate || itemDate <= endDate);

        // Search filter
        const matchesSearch = !searchText ||
            Object.values(item).some((value) =>
                value?.toString().toLowerCase().includes(searchText.toLowerCase())
            );

        return matchesDateRange && matchesSearch;
    });

    const handleReset = () => {
        setStartDate(null);
        setEndDate(null);
        setSearchText("");
        setCurrentPage(1);
    };

    const handleDownloadCSV = () => {
        console.log("Downloading Monthly Financial CSV...");
        // TODO: Implement CSV export functionality
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
                        onReset={handleReset}
                        onDownloadCSV={handleDownloadCSV}
                        infoTitle="DASSP Waiver Overview"
                        infoText="View waivers by manifest counts, aircraft numbers, and company submissions."
                    />
                </div>

                {/* Main content - table */}
                <div className="flex-1">
                    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">

                        <div className="overflow-x-auto">
                            <MonthlyFinancialTable
                                data={filteredData}
                                currentPage={currentPage}
                                itemsPerPage={ITEMS_PER_PAGE}
                            />
                        </div>

                        {filteredData.length > ITEMS_PER_PAGE && (
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