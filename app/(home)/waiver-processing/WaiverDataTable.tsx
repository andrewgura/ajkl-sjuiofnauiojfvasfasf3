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
import { AlertTriangle } from "lucide-react";
import DataFilterPanel from "@/components/shared/filters/DataFilterPanel";
import DropdownFilter from "@/components/shared/filters/DropdownFilter";
import { MultiSelectInput } from "@/components/shared/MultiSelectInput";
import Pagination from "@/components/shared/Pagination";
import EmptyTableState from "@/components/shared/EmptyTableState";
import { Waiver, User, isStaleWaiver } from "./types";

const ITEMS_PER_PAGE = 15;

interface WaiverDataTableProps {
    initialData: Waiver[];
    users: User[];
    statusOptions: string[];
    infoTitle?: string;
    infoText?: string;
    onFilterChange?: (filters: {
        searchText: string;
        startDate: Date | null;
        endDate: Date | null;
        assignees: string[];
        statuses: string[];
    }) => void;
    onDownloadCSV?: (filters: {
        searchText: string;
        startDate: Date | null;
        endDate: Date | null;
        assignees: string[];
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

// Status styling is now directly in the component
const getStatusStyles = (status: string): string => {
    switch (status) {
        // TSA statuses
        case "TSA ASSIGNED":
            return "bg-blue-50 text-blue-700";
        case "IAPWG REVIEW":
            return "bg-purple-50 text-purple-700";
        case "DETERMINED":
        case "VETTED":
            return "bg-indigo-50 text-indigo-700";
        case "DASSP READY FOR CERTIFICATION":
            return "bg-teal-50 text-teal-700";
        case "VET REJECTED":
        case "QA REJECTED":
        case "TSA REJECTED":
            return "bg-red-50 text-red-700";

        // FAA statuses
        case "READY FOR FAA CERTIFICATION":
            return "bg-green-50 text-green-700";
        case "FAA PENDING":
            return "bg-yellow-50 text-yellow-700";
        case "FAA REJECTED":
            return "bg-red-50 text-red-700";

        // Finished statuses
        case "APPROVED":
            return "bg-green-50 text-green-700";

        default:
            return "bg-gray-50 text-gray-700";
    }
};

export default function WaiverDataTable({
    initialData,
    users,
    statusOptions,
    infoTitle = "Search Tips",
    infoText = "Use the search box to find waivers by any field. You can combine filters to narrow down results.",
    onFilterChange,
    onDownloadCSV
}: WaiverDataTableProps) {
    const [currentPage, setCurrentPage] = useState(1);

    // Filters
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [searchText, setSearchText] = useState("");
    const [assigneeFilter, setAssigneeFilter] = useState<string[]>([]);
    const [statusFilter, setStatusFilter] = useState<string[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string>("");

    const analystOptions = users.map(user => `${user.firstName} ${user.lastName}`);

    // Filters
    const filteredWaivers = initialData.filter((waiver) => {
        // Filter by assignee
        const matchesAssignee =
            assigneeFilter.length === 0 ||
            assigneeFilter.includes(waiver.currentAssignee);

        // Filter by status
        const matchesStatus =
            statusFilter.length === 0 ||
            (waiver.status && statusFilter.includes(waiver.status));

        // Filter by search text
        const matchesSearch =
            !searchText ||
            Object.values(waiver).some((value) =>
                value?.toString().toLowerCase().includes(searchText.toLowerCase())
            );

        // Filter by date range
        const matchesDateRange = () => {
            if (!startDate && !endDate) return true;

            const waiverDate = new Date(waiver.lastUpdated);
            const fromMatch = !startDate || waiverDate >= startDate;
            const toMatch = !endDate || waiverDate <= endDate;

            return fromMatch && toMatch;
        };

        return matchesAssignee && matchesStatus && matchesSearch && matchesDateRange();
    });

    // pagination
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentWaivers = filteredWaivers.slice(startIndex, endIndex);

    // Reset filters
    const resetFilters = () => {
        setStartDate(null);
        setEndDate(null);
        setSearchText("");
        setAssigneeFilter([]);
        setStatusFilter([]);
        setSelectedStatus("");

        if (onFilterChange) {
            onFilterChange({
                searchText: "",
                startDate: null,
                endDate: null,
                assignees: [],
                statuses: []
            });
        }
    };

    // CSV download
    const handleDownloadCSV = () => {
        if (onDownloadCSV) {
            onDownloadCSV({
                searchText,
                startDate,
                endDate,
                assignees: assigneeFilter,
                statuses: statusFilter
            });
        } else {
            console.log("Downloading CSV...");
        }
    };


    const handleStatusChange = (status: string) => {
        setSelectedStatus(status);
        if (status && !statusFilter.includes(status)) {
            const newStatusFilter = [...statusFilter, status];
            setStatusFilter(newStatusFilter);

            if (onFilterChange) {
                onFilterChange({
                    searchText,
                    startDate,
                    endDate,
                    assignees: assigneeFilter,
                    statuses: newStatusFilter
                });
            }
        }
    };

    const customFilters = [
        // Assignee Filter 
        <div key="assignee-filter" className="space-y-2">
            <label className="text-xs font-medium text-slate-900 mb-1.5 block">
                Filter by Assignee
            </label>
            <MultiSelectInput
                values={assigneeFilter}
                onChange={(newValues) => {
                    setAssigneeFilter(newValues);
                    if (onFilterChange) {
                        onFilterChange({
                            searchText,
                            startDate,
                            endDate,
                            assignees: newValues,
                            statuses: statusFilter
                        });
                    }
                }}
                options={analystOptions}
                placeholder="Select assignees..."
                searchPlaceholder="Search assignees..."
                emptyText="No assignees found"
            />
        </div>,

        // Status Filter
        <div key="status-filter" className="space-y-2">
            <label className="text-xs font-medium text-slate-900 mb-1.5 block">
                Filter by Status
            </label>
            <DropdownFilter
                label="Select status..."
                value={selectedStatus}
                onChange={handleStatusChange}
                options={statusOptions.map(status => ({ value: status, label: status }))}
            />
            {statusFilter.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                    {statusFilter.map((status) => (
                        <div
                            key={status}
                            className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-xs ${getStatusStyles(status)}`}
                        >
                            {status}
                            <button
                                className="ml-1 text-slate-400 hover:text-slate-600"
                                onClick={() => {
                                    const newStatusFilter = statusFilter.filter(s => s !== status);
                                    setStatusFilter(newStatusFilter);
                                    if (selectedStatus === status) {
                                        setSelectedStatus("");
                                    }

                                    if (onFilterChange) {
                                        onFilterChange({
                                            searchText,
                                            startDate,
                                            endDate,
                                            assignees: assigneeFilter,
                                            statuses: newStatusFilter
                                        });
                                    }
                                }}
                            >
                                ×
                            </button>
                        </div>
                    ))}
                    {statusFilter.length > 1 && (
                        <button
                            className="text-xs text-blue-600 hover:text-blue-800"
                            onClick={() => {
                                setStatusFilter([]);
                                setSelectedStatus("");
                            }}
                        >
                            Clear all
                        </button>
                    )}
                </div>
            )}
        </div>
    ];

    return (
        <div className="mx-auto">
            <div className="flex gap-4">
                {/* Filters panel  */}
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
                                    assignees: assigneeFilter,
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
                                    assignees: assigneeFilter,
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
                                    assignees: assigneeFilter,
                                    statuses: statusFilter
                                });
                            }
                        }}
                        onReset={resetFilters}
                        onDownloadCSV={handleDownloadCSV}
                        infoTitle={infoTitle}
                        infoText={infoText}
                        customFilters={customFilters}
                    />
                </div>

                {/* Main content */}
                <div className="flex-1 space-y-4">
                    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                        <div className="overflow-hidden">
                            {filteredWaivers.length === 0 ? (
                                <EmptyTableState
                                    title="No waivers found"
                                    message="No waivers match your current filter criteria. Try adjusting your filters or search terms."
                                />
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-slate-50/80">
                                            <TableHead className="py-2 px-1 font-medium text-[11px] w-8"></TableHead>
                                            <TableHead className="py-2 px-2 font-medium text-[11px] text-slate-700 w-16">
                                                Conf.
                                            </TableHead>
                                            <TableHead className="py-2 px-2 font-medium text-[11px] text-slate-700 w-32">
                                                Status
                                            </TableHead>
                                            <TableHead className="py-2 px-2 font-medium text-[11px] text-slate-700 w-24">
                                                Assigned
                                            </TableHead>
                                            <TableHead className="py-2 px-2 font-medium text-[11px] text-slate-700 w-24">
                                                Company
                                            </TableHead>
                                            <TableHead className="py-2 px-2 font-medium text-[11px] text-slate-700 w-24">
                                                Created
                                            </TableHead>
                                            <TableHead className="py-2 px-2 font-medium text-[11px] text-slate-700 w-24">
                                                Last Update
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {currentWaivers.map((row) => {
                                            const isStale = isStaleWaiver(row);

                                            return (
                                                <TableRow
                                                    key={row.id}
                                                    className={`transition-colors border-b last:border-b-0 hover:bg-slate-50/70 ${isStale ? "bg-amber-50" : ""}`}
                                                >
                                                    <TableCell className="py-1.5 px-1 w-8 text-center">
                                                        {isStale && (
                                                            <div className="flex justify-center">
                                                                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                                                            </div>
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="py-1.5 px-2">
                                                        <span className="text-[11px] font-medium text-blue-600 hover:text-blue-700 cursor-pointer">
                                                            {row.confirmation}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell className="py-1.5 px-2">
                                                        <span className={`text-[11px] inline-flex items-center rounded-full px-1.5 py-0.5 font-medium ${getStatusStyles(row.status)}`}>
                                                            {row.status}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell className="py-1.5 px-2">
                                                        <span className="text-[11px] text-slate-600">
                                                            {row.currentAssignee}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell className="py-1.5 px-2">
                                                        <span className="text-[11px] text-slate-600">
                                                            {row.company}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell className="py-1.5 px-2">
                                                        <span className="text-[11px] text-slate-600">
                                                            {formatDate(row.createdAt)}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell className="py-1.5 px-2">
                                                        <span className="text-[11px] text-slate-600">
                                                            {formatDate(row.lastUpdated)}
                                                        </span>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            )}
                        </div>
                        {filteredWaivers.length > ITEMS_PER_PAGE && (
                            <Pagination
                                currentPage={currentPage}
                                totalItems={filteredWaivers.length}
                                itemsPerPage={ITEMS_PER_PAGE}
                                onPageChange={setCurrentPage}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}