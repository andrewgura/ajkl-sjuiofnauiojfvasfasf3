"use client"

import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/utils/date-utils";
import { Waiver } from "@/types/report-types";

interface MemberWaiverTableProps {
    waivers: Waiver[];
    showRejections: boolean;
}

export const MemberWaiverTable: React.FC<MemberWaiverTableProps> = ({ waivers, showRejections }) => {
    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="py-2 font-medium text-xs w-[12%]">
                            Confirmation
                        </TableHead>
                        <TableHead className="py-2 font-medium text-xs w-[22%]">
                            Company
                        </TableHead>
                        <TableHead className="py-2 font-medium text-xs w-[12%]">
                            Start Date
                        </TableHead>
                        <TableHead className="py-2 font-medium text-xs w-[12%]">
                            End Date
                        </TableHead>
                        <TableHead className="py-2 font-medium text-xs w-[12%]">
                            {showRejections ? "Rejection Date" : "Certified Date"}
                        </TableHead>
                        <TableHead className="py-2 font-medium text-xs w-[15%]">
                            Waiver ID
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {waivers.map((waiver) => (
                        <TableRow
                            key={waiver.id}
                            className="hover:bg-gray-50/50 transition-colors"
                        >
                            <TableCell className="py-2">
                                <span className="text-xs font-medium text-blue-600 cursor-pointer hover:text-blue-700">
                                    {waiver.confirmation}
                                </span>
                            </TableCell>
                            <TableCell className="py-2">
                                <span className="text-xs text-gray-900">{waiver.company}</span>
                            </TableCell>
                            <TableCell className="py-2">
                                <span className="text-xs text-gray-600">
                                    {formatDate(waiver.startDate)}
                                </span>
                            </TableCell>
                            <TableCell className="py-2">
                                <span className="text-xs text-gray-600">
                                    {formatDate(waiver.endDate)}
                                </span>
                            </TableCell>
                            <TableCell className="py-2">
                                <span className="text-xs text-gray-600">
                                    {formatDate(waiver.certifiedDate)}
                                </span>
                            </TableCell>
                            <TableCell className="py-2">
                                <span className="text-xs text-gray-600">
                                    {waiver.waiverId}
                                </span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};