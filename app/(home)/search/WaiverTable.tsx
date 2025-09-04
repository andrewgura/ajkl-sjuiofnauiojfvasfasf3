"use client";

import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import EmptyTableState from "@/components/shared/EmptyTableState";

interface WaiverRequest {
    id: number;
    confirmation: string;
    type: string;
    status: string;
    waiverId: string;
    submissionDate: string;
    archived?: boolean;
}

interface WaiverTableProps {
    requests: WaiverRequest[];
}

// Helper function to determine status badge color
const getStatusColor = (status: string) => {
    switch (status) {
        case "COMPLETED":
            return "bg-green-100 text-green-800";
        case "APPROVED":
            return "bg-blue-100 text-blue-800";
        case "PENDING":
            return "bg-yellow-100 text-yellow-800";
        case "REJECTED":
            return "bg-red-100 text-red-800";
        case "IN_REVIEW":
            return "bg-purple-100 text-purple-800";
        case "DRAFT":
            return "bg-gray-100 text-gray-800";
        case "EXPIRED":
            return "bg-orange-100 text-orange-800";
        case "CANCELLED":
            return "bg-red-100 text-red-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
};

const WaiverTable: React.FC<WaiverTableProps> = ({ requests }) => {
    // Empty state when no requests are available
    if (!requests || requests.length === 0) {
        return (
            <div className="flex items-center justify-center h-full w-full py-16">
                <EmptyTableState
                    title="No results match your search criteria"
                    message="Try adjusting your filters or clear them to see all results"
                />
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow className="bg-slate-50/80">
                        <TableHead className="py-2 px-3 font-medium text-xs text-slate-700">
                            Confirmation
                        </TableHead>
                        <TableHead className="py-2 px-3 font-medium text-xs text-slate-700">
                            Type
                        </TableHead>
                        <TableHead className="py-2 px-3 font-medium text-xs text-slate-700">
                            Status
                        </TableHead>
                        <TableHead className="py-2 px-3 font-medium text-xs text-slate-700">
                            Waiver ID
                        </TableHead>
                        <TableHead className="py-2 px-3 font-medium text-xs text-slate-700">
                            Submission Date
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {requests.map((request) => (
                        <TableRow
                            key={request.id}
                            className="transition-colors border-b hover:bg-slate-50/70"
                        >
                            <TableCell className="py-2 px-3">
                                <span className="text-xs font-medium text-blue-600 hover:text-blue-700 cursor-pointer">
                                    {request.confirmation}
                                </span>
                            </TableCell>
                            <TableCell className="py-2 px-3">
                                <span className="text-xs text-slate-600">
                                    {request.type}
                                </span>
                            </TableCell>
                            <TableCell className="py-2 px-3">
                                <span
                                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                        request.status
                                    )}`}
                                >
                                    {request.status}
                                </span>
                            </TableCell>
                            <TableCell className="py-2 px-3">
                                <span className="text-xs text-slate-600">
                                    {request.waiverId}
                                </span>
                            </TableCell>
                            <TableCell className="py-2 px-3">
                                <span className="text-xs text-slate-600">
                                    {request.submissionDate}
                                </span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export { WaiverTable };