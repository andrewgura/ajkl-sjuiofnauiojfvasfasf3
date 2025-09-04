"use client"

import { useState } from "react";
import Pagination from "@/components/shared/Pagination";
import StaleWaiversTable from "./StaleWaiversTable";
import DataFilterPanel from "@/components/shared/filters/DataFilterPanel";
import { MultiSelectInput } from "@/components/shared/MultiSelectInput";
import { ProcessStepType } from "@/types/waivers";

const ITEMS_PER_PAGE = 20;

interface StaleWaiversClientProps {
    initialData: any[];
}

export default function StaleWaiversClient({ initialData }: StaleWaiversClientProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [reportData] = useState(initialData);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [selectedProcessSteps, setSelectedProcessSteps] = useState<string[]>([]);

    // Process step options
    const processStepOptions: ProcessStepType[] = [
        "TSA Assigned",
        "IAPWG Review",
        "Ready For FAA",
        "Ready for QA"
    ];

    // Filter data based on all criteria
    const filteredData = reportData.filter((item) => {
        const matchesSearch =
            searchText === "" ||
            Object.values(item).some((value: any) =>
                value.toString().toLowerCase().includes(searchText.toLowerCase())
            );

        // Updated date filtering with null handling
        const withinDateRange =
            (!startDate || item.gatewayDepartureDate >= startDate) &&
            (!endDate || item.gatewayDepartureDate <= endDate);

        // Process step filtering
        const matchesProcessStep =
            selectedProcessSteps.length === 0 ||
            selectedProcessSteps.includes(item.processStep);

        return matchesSearch && withinDateRange && matchesProcessStep;
    });

    const handleResetFilters = () => {
        setSearchText("");
        setStartDate(null);
        setEndDate(null);
        setSelectedProcessSteps([]);
    };

    const handleDownloadCSV = () => {
        // Implement CSV download functionality
        console.log("Downloading CSV...");
    };

    // Process Step filter component
    const processStepFilter = (
        <div className="space-y-2 mb-4">
            <label className="text-sm font-medium text-slate-700 block">Process Step</label>
            <MultiSelectInput
                values={selectedProcessSteps}
                onChange={setSelectedProcessSteps}
                options={processStepOptions}
                placeholder="Select process steps..."
                searchPlaceholder="Search process steps..."
                emptyText="No process steps found"
            />
        </div>
    );

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
                        customFilters={processStepFilter}
                    />
                </div>

                {/* Main content - table */}
                <div className="flex-1">
                    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <StaleWaiversTable
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