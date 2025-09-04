"use client"

import { useState } from "react";
import Pagination from "@/components/shared/Pagination";
import DataFilterPanel from "@/components/shared/filters/DataFilterPanel";
import UasTable from "./UasTable";
import SubtypeFilter from "./SubtypeFilter";
import TypeToggleButtons from "./TypeToggleButtons";
import {
    UASReportClientProps,
    WaiverType,
    WaiverSubtype
} from "./types";

const ITEMS_PER_PAGE = 15;

export default function UASReportClient({ initialData }: UASReportClientProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [selectedTypes, setSelectedTypes] = useState<WaiverType[]>(["UAS"]);
    const [selectedSubtype, setSelectedSubtype] = useState<WaiverSubtype | null>(null);
    const [subtypeDropdownOpen, setSubtypeDropdownOpen] = useState(false);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [waivers] = useState(initialData.waivers);

    const toggleType = (type: WaiverType) => {
        setSelectedTypes((prev) => {
            const isSelected = prev.includes(type);
            if (isSelected) {
                return prev.filter((t) => t !== type);
            } else {
                return [...prev, type];
            }
        });
    };

    const filteredData = waivers.filter((item) => {
        const matchesType = selectedTypes.includes(item.waiverType);
        const matchesSubtype = !selectedSubtype || item.waiverSubtype === selectedSubtype;
        const matchesSearch = Object.values(item).some((value) =>
            value.toString().toLowerCase().includes(searchText.toLowerCase())
        );
        const matchesDateRange =
            (!startDate || item.startDate >= startDate) &&
            (!endDate || item.endDate <= endDate);

        return matchesType && matchesSubtype && matchesSearch && matchesDateRange;
    });

    const handleResetFilters = () => {
        setSearchText("");
        setSelectedTypes(["UAS"]);
        setSelectedSubtype(null);
        setStartDate(null);
        setEndDate(null);
        setCurrentPage(1);
    };

    const handleDownloadCSV = () => {
        console.log("Downloading CSV...");
    };

    // Custom filters for the DataFilterPanel
    const customFilters = [
        <TypeToggleButtons
            key="type-toggle"
            selectedTypes={selectedTypes}
            onToggleType={toggleType}
        />,
        <div key="subtype-filter" className="space-y-2">
            <label className="text-xs font-medium text-gray-700">Subtype Filter</label>
            <SubtypeFilter
                selectedSubtype={selectedSubtype}
                onSubtypeChange={setSelectedSubtype}
                dropdownOpen={subtypeDropdownOpen}
                setDropdownOpen={setSubtypeDropdownOpen}
            />
        </div>
    ];

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
                        infoTitle="UAS Report Info"
                        infoText="View active UAS and UAS Sporting waivers within their effective date range"
                        customFilters={customFilters}
                    />
                </div>

                <div className="flex-1">
                    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <UasTable
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