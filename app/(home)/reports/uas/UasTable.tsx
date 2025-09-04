"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import EmptyTableState from "@/components/shared/EmptyTableState";
import { UasWaiver, WaiverSubtype } from "./types";

interface UasTableProps {
    data: UasWaiver[];
    currentPage: number;
    itemsPerPage: number;
}

export default function UasTable({ data, currentPage, itemsPerPage }: UasTableProps) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = data.slice(startIndex, endIndex);

    if (data.length === 0) {
        return <EmptyTableState />;
    }

    const getSubtypeStyles = (subtype: WaiverSubtype): string => {
        switch (subtype) {
            case "UAS":
                return "bg-blue-50 text-blue-700";
            case "UFR":
                return "bg-green-50 text-green-700";
            case "UAS7":
                return "bg-purple-50 text-purple-700";
            case "UAS-SPT":
                return "bg-yellow-50 text-yellow-700";
            case "UAS-SVY":
                return "bg-rose-50 text-rose-700";
            case "UAS-SVY7":
                return "bg-orange-50 text-orange-700";
            default:
                return "bg-gray-50 text-gray-700";
        }
    };

    /**
     * Format date for display
     */
    const formatDate = (date: Date): string => {
        return new Intl.DateTimeFormat("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
        }).format(date);
    };

    /**
     * Parse contact string to separate name and phone
     */
    const parseContact = (contact: string): { name: string; phone: string } => {
        const parts = contact.split(" - ");
        if (parts.length >= 2) {
            const name = parts[0];
            const phone = parts[1];
            return { name, phone };
        }
        return { name: contact, phone: "" };
    };

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow className="bg-slate-50/80">
                        <TableHead className="py-2 px-2 font-medium text-[11px] text-slate-700 w-16">
                            Conf.
                        </TableHead>
                        <TableHead className="py-2 px-2 font-medium text-[11px] text-slate-700 w-24">
                            Type
                        </TableHead>
                        <TableHead className="py-2 px-2 font-medium text-[11px] text-slate-700 w-24">
                            Start
                        </TableHead>
                        <TableHead className="py-2 px-2 font-medium text-[11px] text-slate-700 w-24">
                            End
                        </TableHead>
                        <TableHead className="py-2 px-2 font-medium text-[11px] text-slate-700 w-24">
                            Subtype
                        </TableHead>
                        <TableHead className="py-2 px-2 font-medium text-[11px] text-slate-700 w-48">
                            UAS Operator
                        </TableHead>
                        <TableHead className="py-2 px-2 font-medium text-[11px] text-slate-700 w-48">
                            Contact
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentData.map((row) => {
                        const contact = parseContact(row.contact);
                        return (
                            <TableRow
                                key={row.id}
                                className="transition-colors border-b last:border-b-0 hover:bg-slate-50/70"
                            >
                                <TableCell className="py-1.5 px-2">
                                    <span className="text-[11px] font-medium text-blue-600 hover:text-blue-700 cursor-pointer">
                                        {row.confirmation}
                                    </span>
                                </TableCell>
                                <TableCell className="py-1.5 px-2">
                                    <span
                                        className={`text-[11px] inline-flex items-center rounded-full px-1.5 py-0.5 font-medium ${getSubtypeStyles(
                                            row.waiverSubtype
                                        )}`}
                                    >
                                        {row.waiverSubtype}
                                    </span>
                                </TableCell>
                                <TableCell className="py-1.5 px-2">
                                    <span className="text-[11px] text-slate-600">
                                        {formatDate(row.startDate)}
                                    </span>
                                </TableCell>
                                <TableCell className="py-1.5 px-2">
                                    <span className="text-[11px] text-slate-600">
                                        {formatDate(row.endDate)}
                                    </span>
                                </TableCell>
                                <TableCell className="py-1.5 px-2">
                                    <span className="text-[11px] text-slate-600">
                                        {row.waiverType}
                                    </span>
                                </TableCell>
                                <TableCell className="py-1.5 px-2">
                                    <span className="text-[11px] text-slate-600">
                                        {row.uasOperator}
                                    </span>
                                </TableCell>
                                <TableCell className="py-1.5 px-2">
                                    <div className="text-[11px] text-slate-600">
                                        <div className="font-medium">{contact.name}</div>
                                        {contact.phone && (
                                            <div className="text-slate-500 mt-0.5">{contact.phone}</div>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}