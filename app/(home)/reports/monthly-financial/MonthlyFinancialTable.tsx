"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/utils/date-utils";
import { MonthlyFinancialItem } from "./types";
import EmptyTableState from "@/components/shared/EmptyTableState";

interface MonthlyFinancialTableProps {
    data: MonthlyFinancialItem[];
    currentPage: number;
    itemsPerPage: number;
}

const getStatusStyles = (status: string) => {
    switch (status?.toUpperCase()) {
        case "PROCESSING":
            return "bg-yellow-50 text-yellow-700";
        case "APPROVED":
            return "bg-green-50 text-green-700";
        case "TERMINATED":
            return "bg-red-50 text-red-700";
        case "CANCELLED":
            return "bg-gray-50 text-gray-700";
        case "PENDING":
            return "bg-blue-50 text-blue-700";
        default:
            return "bg-gray-50 text-gray-700";
    }
};

export default function MonthlyFinancialTable({
    data,
    currentPage,
    itemsPerPage
}: MonthlyFinancialTableProps) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = data.slice(startIndex, endIndex);

    // Empty state check
    if (data.length === 0) {
        return (
            <EmptyTableState
                title="No financial data found"
                message="No financial records match your current filter criteria. Try adjusting your date range or search terms."
            />
        );
    }

    return (
        <Table>
            <TableHeader>
                <TableRow className="bg-slate-50/80">
                    <TableHead className="py-2 px-3 font-medium text-[11px] text-slate-700">
                        Confirmation
                    </TableHead>
                    <TableHead className="py-2 px-3 font-medium text-[11px] text-slate-700">
                        Status
                    </TableHead>
                    <TableHead className="py-2 px-3 font-medium text-[11px] text-slate-700">
                        Start Date
                    </TableHead>
                    <TableHead className="py-2 px-3 font-medium text-[11px] text-slate-700">
                        People in Manifest
                    </TableHead>
                    <TableHead className="py-2 px-3 font-medium text-[11px] text-slate-700">
                        Aircraft
                    </TableHead>
                    <TableHead className="py-2 px-3 font-medium text-[11px] text-slate-700">
                        Dept. Gateway
                    </TableHead>
                    <TableHead className="py-2 px-3 font-medium text-[11px] text-slate-700">
                        Company
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {currentData.map((row) => (
                    <TableRow
                        key={row.confirmation}
                        className="transition-colors border-b hover:bg-slate-50/70"
                    >
                        <TableCell className="py-2 px-3">
                            <span className="text-xs font-medium text-blue-600 hover:text-blue-700 cursor-pointer">
                                {row.confirmation}
                            </span>
                        </TableCell>
                        <TableCell className="py-2 px-3">
                            <span className={`text-xs inline-flex items-center rounded-full px-2 py-0.5 font-medium ${getStatusStyles(row.status)}`}>
                                {row.status}
                            </span>
                        </TableCell>
                        <TableCell className="py-2 px-3">
                            <span className="text-xs text-slate-600">
                                {formatDate(row.startDate)}
                            </span>
                        </TableCell>
                        <TableCell className="py-2 px-3 text-center">
                            <span className="text-xs text-slate-600">
                                {row.peopleInManifest}
                            </span>
                        </TableCell>
                        <TableCell className="py-2 px-3 text-center">
                            <span className="text-xs text-slate-600">
                                {row.aircraft}
                            </span>
                        </TableCell>
                        <TableCell className="py-2 px-3">
                            <span className="text-xs text-slate-600">
                                {row.deptGateway}
                            </span>
                        </TableCell>
                        <TableCell className="py-2 px-3">
                            <span className="text-xs text-slate-600">
                                {row.company}
                            </span>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}