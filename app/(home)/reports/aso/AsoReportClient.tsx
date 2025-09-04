"use client"

import { useState } from "react";
import Pagination from "@/components/shared/Pagination";
import AsoTable from "./AsoTable";
import DataFilterPanel from "@/components/shared/filters/DataFilterPanel";

const ITEMS_PER_PAGE = 20;

interface AsoItem {
    id: number;
    confirmation: string;
    asoName: string;
    asoCredential: string;
    startDate: Date;
    endDate: Date;
    organization: string;
}

interface AsoReportClientProps {
    initialData: AsoItem[];
}

export default function AsoReportClient({ initialData }: AsoReportClientProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [asoData] = useState(initialData);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const filteredData = asoData.filter((record) => {
        const matchesSearch = Object.values(record).some((value) =>
            value.toString().toLowerCase().includes(searchText.toLowerCase())
        );

        // Updated date filtering with null handling
        const matchesDateRange =
            (!startDate || record.startDate >= startDate) &&
            (!endDate || record.endDate <= endDate);

        return matchesSearch && matchesDateRange;
    });

    const handleResetFilters = () => {
        setSearchText("");
        setStartDate(null);
        setEndDate(null);
    }

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
                        infoTitle="ASO Report Info"
                        infoText="Generate reports of ASO flight schedules from approved waivers"
                    />
                </div>

                {/* Main content - table */}
                <div className="flex-1">
                    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <AsoTable
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