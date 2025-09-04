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
import { DasspItem } from "./types";
import EmptyTableState from "@/components/shared/EmptyTableState";

interface DasspTableProps {
    data: DasspItem[];
    currentPage: number;
    itemsPerPage: number;
}

export default function DasspTable({ data, currentPage, itemsPerPage }: DasspTableProps) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = data.slice(startIndex, endIndex);

    // Empty state check
    if (data.length === 0) {
        return <EmptyTableState />
    }

    return (
        <Table>
            <TableHeader>
                <TableRow className="bg-slate-50/80">
                    <TableHead className="py-2 px-3 font-medium text-xs text-slate-700 w-16">
                        Conf.
                    </TableHead>
                    <TableHead className="py-2 px-3 font-medium text-xs text-slate-700">
                        Gateway
                    </TableHead>
                    <TableHead className="py-2 px-3 font-medium text-xs text-slate-700">
                        Gateway FBO
                    </TableHead>
                    <TableHead className="py-2 px-3 font-medium text-xs text-slate-700">
                        Gateway Departure
                    </TableHead>
                    <TableHead className="py-2 px-3 font-medium text-xs text-slate-700">
                        Aircraft Info
                    </TableHead>
                    <TableHead className="py-2 px-3 font-medium text-xs text-slate-700">
                        KDCA Times
                    </TableHead>
                    <TableHead className="py-2 px-3 font-medium text-xs text-slate-700">
                        Destination
                    </TableHead>
                    <TableHead className="py-2 px-3 font-medium text-xs text-slate-700">
                        Contact Info
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
                        <TableCell className="py-2 px-3 text-xs text-slate-600">
                            {row.gatewayAirport}
                        </TableCell>
                        <TableCell className="py-2 px-3 text-xs text-slate-600">
                            {row.gatewayFBO}
                        </TableCell>
                        <TableCell className="py-2 px-3 text-xs text-slate-600">
                            <div>{formatDate(row.gatewayDepartureDate)}</div>
                            <div>{row.gatewayDepartureTime}</div>
                        </TableCell>
                        <TableCell className="py-2 px-3 text-xs text-slate-600">
                            <div>{row.aircraftType} - {row.tailNumber}</div>
                            <div>{row.callSign}</div>
                        </TableCell>
                        <TableCell className="py-2 px-3 text-xs text-slate-600">
                            <div>Arr: {formatDate(row.kdcaArrivalDate)} {row.kdcaArrivalTime}</div>
                            <div>Dep: {formatDate(row.kdcaDepartureDate)} {row.kdcaDepartureTime}</div>
                        </TableCell>
                        <TableCell className="py-2 px-3 text-xs text-slate-600">
                            {row.destinationAirport}
                        </TableCell>
                        <TableCell className="py-2 px-3 text-xs text-slate-600">
                            <div>{row.contactPerson}</div>
                            <div>{row.contactPhone}</div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}