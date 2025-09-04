"use client";

import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import DataFilterPanel from "@/components/shared/filters/DataFilterPanel";
import DropdownFilter from "@/components/shared/filters/DropdownFilter";
import Pagination from "@/components/shared/Pagination";
import EmptyTableState from "@/components/shared/EmptyTableState";
import ActionButton from "@/components/shared/ActionButton";
import { WaiverMasterListEntry, isActiveWaiver } from "./types";

const ITEMS_PER_PAGE = 15;

interface WaiverMasterListDataTableProps {
    initialData: WaiverMasterListEntry[];
    onFilterChange?: (filters: {
        searchText: string;
        startDate: Date | null;
        endDate: Date | null;
        companies: string[];
        aircraftTypes: string[];
        statuses: string[];
    }) => void;
    onDownloadCSV?: (filters: {
        searchText: string;
        startDate: Date | null;
        endDate: Date | null;
        companies: string[];
        aircraftTypes: string[];
        statuses: string[];
    }) => void;
}

const formatDate = (dateString: string): string => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

export default function WaiverMasterListDataTable({
    initialData,
    onFilterChange,
    onDownloadCSV
}: WaiverMasterListDataTableProps) {
    const [currentPage, setCurrentPage] = useState(1);

    // Filters
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [searchText, setSearchText] = useState("");
    const [companyFilter, setCompanyFilter] = useState<string[]>([]);
    const [aircraftTypeFilter, setAircraftTypeFilter] = useState<string[]>([]);
    const [statusFilter, setStatusFilter] = useState<string[]>([]);
    const [selectedCompany, setSelectedCompany] = useState<string>("");
    const [selectedAircraftType, setSelectedAircraftType] = useState<string>("");
    const [selectedStatus, setSelectedStatus] = useState<string>("");

    // Get unique options for filters
    const companyOptions = Array.from(new Set(initialData.map(entry => entry.companyName))).sort()
        .map(company => ({ value: company, label: company }));
    const aircraftTypeOptions = Array.from(new Set(initialData.map(entry => entry.aircraftType))).sort()
        .map(type => ({ value: type, label: type }));
    const statusOptions = [
        { value: "ACTIVE", label: "Active" },
        { value: "EXPIRED", label: "Expired" }
    ];

    // Reset filters function
    const resetFilters = () => {
        setStartDate(null);
        setEndDate(null);
        setSearchText("");
        setCompanyFilter([]);
        setAircraftTypeFilter([]);
        setStatusFilter([]);
        setSelectedCompany("");
        setSelectedAircraftType("");
        setSelectedStatus("");

        if (onFilterChange) {
            onFilterChange({
                searchText: "",
                startDate: null,
                endDate: null,
                companies: [],
                aircraftTypes: [],
                statuses: []
            });
        }
    };

    // Handle CSV download
    const handleDownloadCSV = () => {
        if (onDownloadCSV) {
            onDownloadCSV({
                searchText,
                startDate,
                endDate,
                companies: companyFilter,
                aircraftTypes: aircraftTypeFilter,
                statuses: statusFilter
            });
        }
    };

    // Filter data
    const filteredEntries = initialData.filter((entry) => {
        // Filter by company
        const matchesCompany =
            companyFilter.length === 0 ||
            companyFilter.includes(entry.companyName);

        // Filter by aircraft type
        const matchesAircraftType =
            aircraftTypeFilter.length === 0 ||
            aircraftTypeFilter.includes(entry.aircraftType);

        // Filter by status (active/expired)
        const matchesStatus = () => {
            if (statusFilter.length === 0) return true;
            const isActive = isActiveWaiver(entry);
            return statusFilter.includes(isActive ? "ACTIVE" : "EXPIRED");
        };

        // Filter by search text
        const matchesSearch =
            !searchText ||
            Object.values(entry).some((value) =>
                value?.toString().toLowerCase().includes(searchText.toLowerCase())
            );

        // Filter by date range (based on waiver start date)
        const matchesDateRange = () => {
            if (!startDate && !endDate) return true;

            const waiverStartDate = new Date(entry.startDate);
            const fromMatch = !startDate || waiverStartDate >= startDate;
            const toMatch = !endDate || waiverStartDate <= endDate;

            return fromMatch && toMatch;
        };

        return matchesCompany && matchesAircraftType && matchesStatus() && matchesSearch && matchesDateRange();
    });

    // Pagination
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentEntries = filteredEntries.slice(startIndex, endIndex);

    // Custom filters for the sidebar
    const customFilters = [
        // Company filter
        <div key="company-filter" className="space-y-2">
            <label className="text-xs font-medium text-slate-700">Company</label>
            <DropdownFilter
                label="Select company"
                options={companyOptions}
                value={selectedCompany}
                onChange={(value: string) => {
                    setSelectedCompany(value);
                    if (value && !companyFilter.includes(value)) {
                        const newCompanyFilter = [...companyFilter, value];
                        setCompanyFilter(newCompanyFilter);
                        if (onFilterChange) {
                            onFilterChange({
                                searchText,
                                startDate,
                                endDate,
                                companies: newCompanyFilter,
                                aircraftTypes: aircraftTypeFilter,
                                statuses: statusFilter
                            });
                        }
                    }
                }}
            />

            {/* Selected company tags */}
            {companyFilter.length > 0 && (
                <div className="flex flex-wrap gap-1">
                    {companyFilter.map((company) => (
                        <div
                            key={company}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded"
                        >
                            <span className="truncate max-w-24">{company}</span>
                            <ActionButton
                                // variant="tag"
                                title="Remove filter"
                                onClick={() => {
                                    const newCompanyFilter = companyFilter.filter(c => c !== company);
                                    setCompanyFilter(newCompanyFilter);
                                    if (onFilterChange) {
                                        onFilterChange({
                                            searchText,
                                            startDate,
                                            endDate,
                                            companies: newCompanyFilter,
                                            aircraftTypes: aircraftTypeFilter,
                                            statuses: statusFilter
                                        });
                                    }
                                }}
                            >
                                ×
                            </ActionButton>
                        </div>
                    ))}
                    {companyFilter.length > 1 && (
                        <ActionButton
                            variant="link"
                            text="Clear all"
                            title="Clear all company filters"
                            onClick={() => {
                                setCompanyFilter([]);
                                setSelectedCompany("");
                            }}
                        />
                    )}
                </div>
            )}
        </div>,

        // Aircraft Type filter
        <div key="aircraft-type-filter" className="space-y-2">
            <label className="text-xs font-medium text-slate-700">Aircraft Type</label>
            <DropdownFilter
                label="Select aircraft type"
                options={aircraftTypeOptions}
                value={selectedAircraftType}
                onChange={(value: string) => {
                    setSelectedAircraftType(value);
                    if (value && !aircraftTypeFilter.includes(value)) {
                        const newAircraftTypeFilter = [...aircraftTypeFilter, value];
                        setAircraftTypeFilter(newAircraftTypeFilter);
                        if (onFilterChange) {
                            onFilterChange({
                                searchText,
                                startDate,
                                endDate,
                                companies: companyFilter,
                                aircraftTypes: newAircraftTypeFilter,
                                statuses: statusFilter
                            });
                        }
                    }
                }}
            />

            {/* Selected aircraft type tags */}
            {aircraftTypeFilter.length > 0 && (
                <div className="flex flex-wrap gap-1">
                    {aircraftTypeFilter.map((type) => (
                        <div
                            key={type}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded"
                        >
                            <span className="truncate max-w-24">{type}</span>
                            <ActionButton
                                // variant="tag"
                                title="Remove filter"
                                onClick={() => {
                                    const newAircraftTypeFilter = aircraftTypeFilter.filter(t => t !== type);
                                    setAircraftTypeFilter(newAircraftTypeFilter);
                                    if (onFilterChange) {
                                        onFilterChange({
                                            searchText,
                                            startDate,
                                            endDate,
                                            companies: companyFilter,
                                            aircraftTypes: newAircraftTypeFilter,
                                            statuses: statusFilter
                                        });
                                    }
                                }}
                            >
                                ×
                            </ActionButton>
                        </div>
                    ))}
                    {aircraftTypeFilter.length > 1 && (
                        <ActionButton
                            variant="link"
                            text="Clear all"
                            title="Clear all aircraft type filters"
                            onClick={() => {
                                setAircraftTypeFilter([]);
                                setSelectedAircraftType("");
                            }}
                        />
                    )}
                </div>
            )}
        </div>,

        // Status filter
        <div key="status-filter" className="space-y-2">
            <label className="text-xs font-medium text-slate-700">Status</label>
            <DropdownFilter
                label="Select status"
                options={statusOptions}
                value={selectedStatus}
                onChange={(value: string) => {
                    setSelectedStatus(value);
                    if (value && !statusFilter.includes(value)) {
                        const newStatusFilter = [...statusFilter, value];
                        setStatusFilter(newStatusFilter);
                        if (onFilterChange) {
                            onFilterChange({
                                searchText,
                                startDate,
                                endDate,
                                companies: companyFilter,
                                aircraftTypes: aircraftTypeFilter,
                                statuses: newStatusFilter
                            });
                        }
                    }
                }}
            />

            {/* Selected status tags */}
            {statusFilter.length > 0 && (
                <div className="flex flex-wrap gap-1">
                    {statusFilter.map((status) => (
                        <div
                            key={status}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded"
                        >
                            <span>{status}</span>
                            <ActionButton
                                // variant="tag"
                                title="Remove filter"
                                onClick={() => {
                                    const newStatusFilter = statusFilter.filter(s => s !== status);
                                    setStatusFilter(newStatusFilter);
                                    if (onFilterChange) {
                                        onFilterChange({
                                            searchText,
                                            startDate,
                                            endDate,
                                            companies: companyFilter,
                                            aircraftTypes: aircraftTypeFilter,
                                            statuses: newStatusFilter
                                        });
                                    }
                                }}
                            >
                                ×
                            </ActionButton>
                        </div>
                    ))}
                    {statusFilter.length > 1 && (
                        <ActionButton
                            variant="link"
                            text="Clear all"
                            title="Clear all status filters"
                            onClick={() => {
                                setStatusFilter([]);
                                setSelectedStatus("");
                            }}
                        />
                    )}
                </div>
            )}
        </div>
    ];

    return (
        <div className="mx-auto">
            <div className="flex gap-4">
                {/* Filters panel */}
                <div className="w-56 flex-shrink-0">
                    <DataFilterPanel
                        startDate={startDate}
                        endDate={endDate}
                        searchText={searchText}
                        onStartDateChange={(date) => {
                            setStartDate(date);
                            if (onFilterChange) {
                                onFilterChange({
                                    searchText,
                                    startDate: date,
                                    endDate,
                                    companies: companyFilter,
                                    aircraftTypes: aircraftTypeFilter,
                                    statuses: statusFilter
                                });
                            }
                        }}
                        onEndDateChange={(date) => {
                            setEndDate(date);
                            if (onFilterChange) {
                                onFilterChange({
                                    searchText,
                                    startDate,
                                    endDate: date,
                                    companies: companyFilter,
                                    aircraftTypes: aircraftTypeFilter,
                                    statuses: statusFilter
                                });
                            }
                        }}
                        onSearchChange={(text) => {
                            setSearchText(text);
                            if (onFilterChange) {
                                onFilterChange({
                                    searchText: text,
                                    startDate,
                                    endDate,
                                    companies: companyFilter,
                                    aircraftTypes: aircraftTypeFilter,
                                    statuses: statusFilter
                                });
                            }
                        }}
                        onReset={resetFilters}
                        onDownloadCSV={handleDownloadCSV}
                        infoTitle={"Waiver Master List"}
                        infoText={"This table shows each aircraft listed on an approved, active waiver. Since there can be multiple aircraft listed for a given waiver authorization number, a specific waiver authorization number may appear in the table multiple times. This table shows the general purpose/route of flight/venue of each of the aircraft listed"}
                        customFilters={customFilters}
                    />
                </div>

                {/* Main content */}
                <div className="flex-1 space-y-4">
                    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                        <div className="overflow-hidden">
                            {filteredEntries.length === 0 ? (
                                <EmptyTableState
                                    title="No waiver entries found"
                                    message="No waiver entries match your current filter criteria. Try adjusting your filters or search terms."
                                />
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-slate-50/80">
                                            <TableHead className="py-2 px-2 font-medium text-[11px] text-slate-700 w-20">
                                                Start Date
                                            </TableHead>
                                            <TableHead className="py-2 px-2 font-medium text-[11px] text-slate-700 w-20">
                                                End Date
                                            </TableHead>
                                            <TableHead className="py-2 px-2 font-medium text-[11px] text-slate-700 w-32">
                                                Waiver Authorization
                                            </TableHead>
                                            <TableHead className="py-2 px-2 font-medium text-[11px] text-slate-700 w-20">
                                                Tail Number
                                            </TableHead>
                                            <TableHead className="py-2 px-2 font-medium text-[11px] text-slate-700 w-20">
                                                Call Sign
                                            </TableHead>
                                            <TableHead className="py-2 px-2 font-medium text-[11px] text-slate-700 w-24">
                                                Aircraft Type
                                            </TableHead>
                                            <TableHead className="py-2 px-2 font-medium text-[11px] text-slate-700 w-40">
                                                Company Name
                                            </TableHead>
                                            <TableHead className="py-2 px-2 font-medium text-[11px] text-slate-700">
                                                Itinerary/Venue/Destination
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {currentEntries.map((entry) => {
                                            const isActive = isActiveWaiver(entry);
                                            const rowClass = isActive ? "" : "opacity-60";

                                            return (
                                                <TableRow key={entry.id} className={rowClass}>
                                                    <TableCell className="py-1.5 px-2 text-[11px]">
                                                        {formatDate(entry.startDate)}
                                                    </TableCell>
                                                    <TableCell className="py-1.5 px-2 text-[11px]">
                                                        {formatDate(entry.endDate)}
                                                    </TableCell>
                                                    <TableCell className="py-1.5 px-2 text-[11px]">
                                                        {entry.waiverAuthorization}
                                                    </TableCell>
                                                    <TableCell className="py-1.5 px-2 text-[11px] font-medium">
                                                        {entry.tailNumber}
                                                    </TableCell>
                                                    <TableCell className="py-1.5 px-2 text-[11px]">
                                                        {entry.callSign}
                                                    </TableCell>
                                                    <TableCell className="py-1.5 px-2 text-[11px]">
                                                        {entry.aircraftType}
                                                    </TableCell>
                                                    <TableCell className="py-1.5 px-2 text-[11px]">
                                                        {entry.companyName}
                                                    </TableCell>
                                                    <TableCell className="py-1.5 px-2 text-[11px]">
                                                        {entry.itineraryVenueDestination || "-"}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            )}
                        </div>
                    </div>

                    {/* Pagination */}
                    {filteredEntries.length > 0 && (
                        <Pagination
                            totalItems={filteredEntries.length}
                            itemsPerPage={ITEMS_PER_PAGE}
                            currentPage={currentPage}
                            onPageChange={setCurrentPage}
                            className="flex justify-center"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}