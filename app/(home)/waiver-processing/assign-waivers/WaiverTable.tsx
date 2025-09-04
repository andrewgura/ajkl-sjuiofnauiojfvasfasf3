"use client";

import React, { useState, useMemo } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Waiver, User, isStaleWaiver } from "../types";
import AssignAnalystModal from "@/components/shared/AssignAnalystModal";
import EmptyTableState from "@/components/shared/EmptyTableState";
import ActionButton from "@/components/shared/ActionButton";
import { AlertTriangle } from "lucide-react";

interface WaiverTableProps {
    waivers: Waiver[];
    currentPage: number;
    itemsPerPage: number;
    onAssign: (waiverId: number, userName: string) => void;
    assigneeFilters?: string[];
    searchText?: string;
    users: User[];
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

// Get status styling similar to WaiverDataTable
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

const WaiverTable: React.FC<WaiverTableProps> = ({
    waivers,
    currentPage,
    itemsPerPage,
    onAssign,
    assigneeFilters = [],
    searchText = "",
    users,
}) => {
    const [selectedWaiver, setSelectedWaiver] = useState<Waiver | null>(null);

    const filteredWaivers = useMemo(() => {
        return waivers.filter((waiver) => {
            const matchesAssignee =
                assigneeFilters.length === 0 ||
                assigneeFilters.includes(waiver.currentAssignee);
            const matchesSearch =
                !searchText ||
                Object.values(waiver).some((value) =>
                    value?.toString().toLowerCase().includes(searchText.toLowerCase())
                );
            return matchesAssignee && matchesSearch;
        });
    }, [waivers, assigneeFilters, searchText]);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentWaivers = filteredWaivers.slice(startIndex, endIndex);

    const analysts = users.map(user => ({
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        assignedCount: user.assignedWaivers
    }));

    if (currentWaivers.length === 0) {
        return (
            <EmptyTableState
                title="No waivers found"
                message="No waivers match your current filter criteria. Try adjusting your filters or search terms."
            />
        );
    }

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow className="bg-slate-50/80">
                        <TableHead className="py-2 px-1 font-medium text-[11px] w-8"></TableHead>
                        <TableHead className="py-2 px-2 font-medium text-[11px] w-14"></TableHead>
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
                                    <ActionButton
                                        text="Assign"
                                        variant="outline"
                                        className="text-[10px] h-6 px-2 bg-white hover:bg-blue-50 hover:text-blue-600"
                                        onClick={() => setSelectedWaiver(row)}
                                    />
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
            {selectedWaiver && (
                <AssignAnalystModal
                    isOpen={!!selectedWaiver}
                    onClose={() => setSelectedWaiver(null)}
                    waiver={selectedWaiver}
                    analysts={analysts}
                    onAssign={(waiverId, analystName) => onAssign(waiverId, analystName)}
                />
            )}
        </>
    );
};

export default WaiverTable;