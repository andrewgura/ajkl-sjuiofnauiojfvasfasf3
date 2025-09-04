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
import { PenSquare, Trash2 } from "lucide-react";
import ActionButton from "@/components/shared/ActionButton";
import EmptyTableState from "@/components/shared/EmptyTableState";
import Pagination from "@/components/shared/Pagination";
import { SportingEvent, SportingEventsTableProps } from "./types";

const SportingEventsTable: React.FC<SportingEventsTableProps> = ({
    data,
    currentPage,
    itemsPerPage,
    onEditEvent,
    onDeleteEvent,
    onPageChange,
}) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = data.slice(startIndex, endIndex);

    if (data.length === 0) {
        return (
            <EmptyTableState
                title="No sporting events found"
                message="No sporting event purposes match your current filter criteria. Try adjusting your search terms or add a new purpose."
            />
        );
    }

    return (
        <>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50/80">
                            <TableHead className="py-3 px-4 font-semibold text-xs text-slate-700">
                                ID
                            </TableHead>
                            <TableHead className="py-3 px-4 font-semibold text-xs text-slate-700">
                                Title
                            </TableHead>
                            <TableHead className="py-3 px-4 font-semibold text-xs text-slate-700">
                                Sport
                            </TableHead>
                            <TableHead className="py-3 px-4 font-semibold text-xs text-slate-700">
                                Created On
                            </TableHead>
                            <TableHead className="py-3 px-4 font-semibold text-xs text-slate-700">
                                Created By
                            </TableHead>
                            <TableHead className="py-3 px-4 font-semibold text-xs text-slate-700">
                                Status
                            </TableHead>
                            <TableHead className="py-3 px-4 font-semibold text-xs text-slate-700 text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentData.map((event) => (
                            <TableRow
                                key={event.id}
                                className="group transition-colors hover:bg-slate-50/70"
                            >
                                <TableCell className="py-3 px-4">
                                    <span className="text-sm text-slate-600">
                                        {event.id}
                                    </span>
                                </TableCell>
                                <TableCell className="py-3 px-4">
                                    <span className="text-sm font-medium text-slate-900">
                                        {event.purpose}
                                    </span>
                                </TableCell>
                                <TableCell className="py-3 px-4">
                                    <span className="text-sm text-slate-600">
                                        {event.sport}
                                    </span>
                                </TableCell>
                                <TableCell className="py-3 px-4">
                                    <span className="text-sm text-slate-600">
                                        {event.createdOn}
                                    </span>
                                </TableCell>
                                <TableCell className="py-3 px-4">
                                    <span className="text-sm text-slate-600">
                                        {event.createdBy}
                                    </span>
                                </TableCell>
                                <TableCell className="py-3 px-4">
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${!event.active
                                            ? 'bg-red-100 text-red-800'
                                            : 'bg-green-100 text-green-800'
                                        }`}>
                                        {event.active ? 'Active' : 'Inactive'}
                                    </span>
                                </TableCell>
                                <TableCell className="py-3 px-4">
                                    <div className="flex items-center justify-end gap-2">
                                        <ActionButton
                                            icon={PenSquare}
                                            onClick={() => onEditEvent(event)}
                                            title="Edit Event Purpose"
                                            className="h-8 w-8 p-0 text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                                        />
                                        <ActionButton
                                            icon={Trash2}
                                            onClick={() => onDeleteEvent(event.id)}
                                            title="Delete Event Purpose"
                                            className="h-8 w-8 p-0 text-slate-600 hover:text-red-600 hover:bg-red-50"
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {data.length > itemsPerPage && (
                <div className="border-t border-slate-100">
                    <Pagination
                        currentPage={currentPage}
                        totalItems={data.length}
                        itemsPerPage={itemsPerPage}
                        onPageChange={onPageChange}
                    />
                </div>
            )}
        </>
    );
};

export default SportingEventsTable;