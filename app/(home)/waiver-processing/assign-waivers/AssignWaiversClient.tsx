"use client";

import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import Pagination from "@/components/shared/Pagination";
import { Waiver, TSA_ATTENTION_STATUSES } from "../types";
import { users } from "../sample-data";
import WaiverTable from "./WaiverTable";
import DataFilterPanel from "@/components/shared/filters/DataFilterPanel";
import DropdownFilter from "@/components/shared/filters/DropdownFilter";
import { MultiSelectInput } from "@/components/shared/MultiSelectInput";

const ITEMS_PER_PAGE = 15;

interface AssignWaiversClientProps {
    initialData: Waiver[];
}

export default function AssignWaiversClient({ initialData }: AssignWaiversClientProps) {
    // Pagination 
    const [unassignedPage, setUnassignedPage] = useState(1);
    const [assignedPage, setAssignedPage] = useState(1);

    // Waivers data
    const [waiverData, setWaiverData] = useState<Waiver[]>(initialData);

    // Filters
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [searchText, setSearchText] = useState("");
    const [assigneeFilter, setAssigneeFilter] = useState<string[]>([]);
    const [statusFilter, setStatusFilter] = useState<string[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string>("");

    // Create analyst options from users
    const analystOptions = users.map(user => `${user.firstName} ${user.lastName}`);

    // Handler
    const handleAssign = (waiverId: number, userName: string) => {
        setWaiverData((prevData) =>
            prevData.map((waiver) =>
                waiver.confirmation === waiverId
                    ? { ...waiver, currentAssignee: userName }
                    : waiver
            )
        );
    };

    const resetFilters = () => {
        setStartDate(null);
        setEndDate(null);
        setSearchText("");
        setAssigneeFilter([]);
        setStatusFilter([]);
        setSelectedStatus("");
    };

    // CSV download
    const handleDownloadCSV = () => {
        console.log("Downloading CSV with filters:", {
            searchText,
            startDate,
            endDate,
            assignees: assigneeFilter,
            statuses: statusFilter
        });
    };

    const handleStatusChange = (status: string) => {
        setSelectedStatus(status);
        if (status && !statusFilter.includes(status)) {
            setStatusFilter([...statusFilter, status]);
        }
    };

    // Handle filter changes
    const handleFilterChange = (filters: {
        searchText: string;
        startDate: Date | null;
        endDate: Date | null;
        assignees: string[];
        statuses: string[];
    }) => {
        setSearchText(filters.searchText);
        setStartDate(filters.startDate);
        setEndDate(filters.endDate);
        setAssigneeFilter(filters.assignees);
        setStatusFilter(filters.statuses);
        console.log("Assignment Filters Changed:", filters);
    };

    // Filtering logic
    const unassignedWaivers = waiverData.filter(
        (waiver) => waiver.currentAssignee === "-"
    );

    const assignedWaivers = waiverData.filter(
        (waiver) => waiver.currentAssignee !== "-"
    );

    const filteredAssignedWaivers = assignedWaivers.filter((waiver) => {
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

            const waiverDate = new Date(waiver.startDate);
            const fromMatch = !startDate || waiverDate >= startDate;
            const toMatch = !endDate || waiverDate <= endDate;

            return fromMatch && toMatch;
        };

        return matchesAssignee && matchesStatus && matchesSearch && matchesDateRange();
    });


    const customFilters = [
        // Assignee Filter
        <div key="assignee-filter" className="space-y-1.5">
            <label className="text-xs font-medium text-slate-900 mb-1 block">
                Filter by Assignee
            </label>
            <MultiSelectInput
                values={assigneeFilter}
                onChange={(newValues) => {
                    setAssigneeFilter(newValues);
                    if (handleFilterChange) {
                        handleFilterChange({
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
        <div key="status-filter" className="space-y-1.5">
            <label className="text-xs font-medium text-slate-900 mb-1 block">
                Filter by Status
            </label>
            <DropdownFilter
                label="Select status..."
                value={selectedStatus}
                onChange={handleStatusChange}
                options={TSA_ATTENTION_STATUSES.map(status => ({ value: status, label: status }))}
            />
            {statusFilter.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1.5">
                    {statusFilter.map((status) => (
                        <div
                            key={status}
                            className="inline-flex items-center bg-blue-50 text-blue-700 text-[10px] rounded-full px-1.5 py-0.5"
                        >
                            {status}
                            <button
                                className="ml-1 text-blue-500 hover:text-blue-700"
                                onClick={() => {
                                    const newStatusFilter = statusFilter.filter(s => s !== status);
                                    setStatusFilter(newStatusFilter);
                                    if (selectedStatus === status) {
                                        setSelectedStatus("");
                                    }

                                    if (handleFilterChange) {
                                        handleFilterChange({
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
                            className="text-[10px] text-blue-600 hover:text-blue-800"
                            onClick={() => {
                                setStatusFilter([]);
                                setSelectedStatus("");

                                if (handleFilterChange) {
                                    handleFilterChange({
                                        searchText,
                                        startDate,
                                        endDate,
                                        assignees: assigneeFilter,
                                        statuses: []
                                    });
                                }
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
        <div className="mx-auto mt-2">
            <div className="flex gap-4">
                {/* Filters panel */}
                <div className="w-56 flex-shrink-0">
                    <DataFilterPanel
                        startDate={startDate}
                        endDate={endDate}
                        searchText={searchText}
                        onStartDateChange={(date) => {
                            setStartDate(date);
                            if (handleFilterChange) {
                                handleFilterChange({
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
                            if (handleFilterChange) {
                                handleFilterChange({
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
                            if (handleFilterChange) {
                                handleFilterChange({
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
                        infoTitle="Assignment Tips"
                        infoText="Use the filters to find specific waivers and assign them to team members. You can track assignments and manage workload distribution."
                        customFilters={customFilters}
                    />
                </div>

                {/* Main content */}
                <div className="flex-1 space-y-6">
                    {/* Unassigned Waivers Section */}
                    <div>
                        <h2 className="text-sm font-medium text-slate-900 mb-3">
                            Unassigned Waivers
                        </h2>
                        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                            <div className="overflow-hidden">
                                <WaiverTable
                                    waivers={unassignedWaivers}
                                    currentPage={unassignedPage}
                                    itemsPerPage={ITEMS_PER_PAGE}
                                    onAssign={handleAssign}
                                    users={users}
                                />
                            </div>
                            {unassignedWaivers.length > ITEMS_PER_PAGE && (
                                <Pagination
                                    currentPage={unassignedPage}
                                    totalItems={unassignedWaivers.length}
                                    itemsPerPage={ITEMS_PER_PAGE}
                                    onPageChange={setUnassignedPage}
                                />
                            )}
                        </div>
                    </div>

                    <Separator className="bg-slate-200" />

                    {/* Assigned Waivers Section */}
                    <div>
                        <h2 className="text-sm font-medium text-slate-900 mb-3">
                            Assigned Waivers
                        </h2>
                        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                            <div className="overflow-hidden">
                                <WaiverTable
                                    waivers={filteredAssignedWaivers}
                                    currentPage={assignedPage}
                                    itemsPerPage={ITEMS_PER_PAGE}
                                    onAssign={handleAssign}
                                    assigneeFilters={assigneeFilter}
                                    searchText={searchText}
                                    users={users}
                                />
                            </div>
                            {filteredAssignedWaivers.length > 0 && (
                                <Pagination
                                    currentPage={assignedPage}
                                    totalItems={filteredAssignedWaivers.length}
                                    itemsPerPage={ITEMS_PER_PAGE}
                                    onPageChange={setAssignedPage}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}