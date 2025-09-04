"use client"

import EmptyTableState from "@/components/shared/EmptyTableState";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Info } from "lucide-react";

interface AsoItem {
    id: number;
    confirmation: string;
    asoName: string;
    asoCredential: string;
    startDate: Date;
    endDate: Date;
    organization: string;
}

interface AsoTableProps {
    data: AsoItem[];
    currentPage: number;
    itemsPerPage: number;
}

const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
    }).format(date);
};

export default function AsoTable({ data, currentPage, itemsPerPage }: AsoTableProps) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = data.slice(startIndex, endIndex);

    // Empty state check
    if (data.length === 0) {
        return <EmptyTableState />;
    }

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow className="bg-slate-50/80">
                        <TableHead className="py-2 px-3 font-medium text-xs text-slate-700 w-16">
                            Conf.
                        </TableHead>
                        <TableHead className="py-2 px-3 font-medium text-xs text-slate-700">
                            ASO Name
                        </TableHead>
                        <TableHead className="py-2 px-3 font-medium text-xs text-slate-700">
                            ASO Credential #
                        </TableHead>
                        <TableHead className="py-2 px-3 font-medium text-xs text-slate-700">
                            Start Date
                        </TableHead>
                        <TableHead className="py-2 px-3 font-medium text-xs text-slate-700">
                            End Date
                        </TableHead>
                        <TableHead className="py-2 px-3 font-medium text-xs text-slate-700">
                            Organization
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentData.map((row) => (
                        <TableRow
                            key={row.id}
                            className="transition-colors border-b hover:bg-slate-50/70"
                        >
                            <TableCell className="py-2 px-3">
                                <span className="text-xs font-medium text-blue-600 hover:text-blue-700 cursor-pointer">
                                    {row.confirmation}
                                </span>
                            </TableCell>
                            <TableCell className="py-2 px-3">
                                <span className="text-xs text-slate-600">
                                    {row.asoName}
                                </span>
                            </TableCell>
                            <TableCell className="py-2 px-3">
                                <span className="text-xs text-slate-600">
                                    {row.asoCredential}
                                </span>
                            </TableCell>
                            <TableCell className="py-2 px-3">
                                <span className="text-xs text-slate-600">
                                    {formatDate(row.startDate)}
                                </span>
                            </TableCell>
                            <TableCell className="py-2 px-3">
                                <span className="text-xs text-slate-600">
                                    {formatDate(row.endDate)}
                                </span>
                            </TableCell>
                            <TableCell className="py-2 px-3">
                                <span className="text-xs text-slate-600">
                                    {row.organization}
                                </span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}