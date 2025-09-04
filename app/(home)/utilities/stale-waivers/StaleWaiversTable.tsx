"use client"

import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/utils/date-utils";
import EmptyTableState from "@/components/shared/EmptyTableState";
import ActionButton from "@/components/shared/ActionButton";
import { UserCheck, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import AssignAnalystModal from "@/components/shared/AssignAnalystModal";

interface StaleWaiversTableProps {
    data: any[];
    currentPage: number;
    itemsPerPage: number;
}

const mockAnalysts = [
    { id: 1, name: "Jane Doe", assignedCount: 5 },
    { id: 2, name: "John Smith", assignedCount: 3 },
    { id: 3, name: "Alice Johnson", assignedCount: 7 },
    { id: 4, name: "Bob Wilson", assignedCount: 2 },
    { id: 5, name: "Carol Martin", assignedCount: 4 },
];

// Define color schemes for each process step
const processStepColors = {
    "TSA Assigned": {
        bg: "bg-blue-50",
        text: "text-blue-700",
        border: "border-blue-200"
    },
    "IAPWG Review": {
        bg: "bg-purple-50",
        text: "text-purple-700",
        border: "border-purple-200"
    },
    "Ready For FAA": {
        bg: "bg-amber-50",
        text: "text-amber-700",
        border: "border-amber-200"
    },
    "Ready for QA": {
        bg: "bg-green-50",
        text: "text-green-700",
        border: "border-green-200"
    }
};

export default function StaleWaiversTable({ data, currentPage, itemsPerPage }: StaleWaiversTableProps) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [selectedWaiver, setSelectedWaiver] = useState<any>(null);

    // Sorting states
    const [sortField, setSortField] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    // Sort handler function
    const handleSort = (field: string) => {
        if (sortField === field) {
            // Toggle direction if already sorting by this field
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            // Set new field and default to ascending
            setSortField(field);
            setSortDirection('asc');
        }
    };

    // Helper function to get process step colors
    const getProcessStepColors = (step: string) => {
        return processStepColors[step as keyof typeof processStepColors] || {
            bg: "bg-gray-50",
            text: "text-gray-700",
            border: "border-gray-200"
        };
    };

    // Sort the data
    const sortedData = [...data].sort((a, b) => {
        if (!sortField) return 0;

        const aValue = a[sortField];
        const bValue = b[sortField];

        // Handle different data types
        if (aValue instanceof Date && bValue instanceof Date) {
            return sortDirection === 'asc'
                ? aValue.getTime() - bValue.getTime()
                : bValue.getTime() - aValue.getTime();
        }

        if (typeof aValue === 'string' && typeof bValue === 'string') {
            return sortDirection === 'asc'
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
        }

        // Fallback for numbers or other types
        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    // Get sorted and paginated data
    const currentData = sortedData.slice(startIndex, endIndex);

    const handleOpenAssignModal = (waiver: any) => {
        setSelectedWaiver(waiver);
        setIsAssignModalOpen(true);
    };

    const handleAssignAnalyst = (waiverId: number, analystName: string) => {
        //TODO
        console.log(`Assigned waiver ${waiverId} to ${analystName}`);
        setIsAssignModalOpen(false);
    };

    // Sort icon component for visual indicator
    const SortIcon = ({ field }: { field: string }) => {
        if (sortField !== field) return <ArrowUpDown className="ml-1 h-3 w-3 inline opacity-50" />;
        return sortDirection === 'asc'
            ? <ArrowUp className="ml-1 h-3 w-3 inline text-blue-600" />
            : <ArrowDown className="ml-1 h-3 w-3 inline text-blue-600" />;
    };

    // Empty state check
    if (data.length === 0) {
        return <EmptyTableState />
    }

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow className="bg-slate-50/80">
                        <TableHead
                            className="py-2 px-3 font-medium text-xs text-slate-700 w-32 cursor-pointer"
                            onClick={() => handleSort('confirmation')}
                        >
                            <div className="flex items-center">
                                Conf. Number
                                <SortIcon field="confirmation" />
                            </div>
                        </TableHead>
                        <TableHead
                            className="py-2 px-3 font-medium text-xs text-slate-700 cursor-pointer"
                            onClick={() => handleSort('status')}
                        >
                            <div className="flex items-center">
                                Status
                                <SortIcon field="status" />
                            </div>
                        </TableHead>
                        <TableHead
                            className="py-2 px-3 font-medium text-xs text-slate-700 cursor-pointer"
                            onClick={() => handleSort('processStep')}
                        >
                            <div className="flex items-center">
                                Process Step
                                <SortIcon field="processStep" />
                            </div>
                        </TableHead>
                        <TableHead
                            className="py-2 px-3 font-medium text-xs text-slate-700 cursor-pointer"
                            onClick={() => handleSort('lastUpdate')}
                        >
                            <div className="flex items-center">
                                Last Updated
                                <SortIcon field="lastUpdate" />
                            </div>
                        </TableHead>
                        <TableHead
                            className="py-2 px-3 font-medium text-xs text-slate-700 cursor-pointer"
                            onClick={() => handleSort('startDate')}
                        >
                            <div className="flex items-center">
                                Date Created
                                <SortIcon field="startDate" />
                            </div>
                        </TableHead>
                        <TableHead
                            className="py-2 px-3 font-medium text-xs text-slate-700 cursor-pointer"
                            onClick={() => handleSort('assignedTo')}
                        >
                            <div className="flex items-center">
                                Analyst
                                <SortIcon field="assignedTo" />
                            </div>
                        </TableHead>
                        <TableHead className="py-2 px-3 font-medium text-xs text-slate-700 w-20">
                            Actions
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
                                {row.status}
                            </TableCell>
                            <TableCell className="py-2 px-3">
                                {row.processStep && (
                                    <span className={`
                                        text-xs font-medium py-1 px-2 rounded-full inline-block
                                        ${getProcessStepColors(row.processStep).bg}
                                        ${getProcessStepColors(row.processStep).text}
                                        border ${getProcessStepColors(row.processStep).border}
                                    `}>
                                        {row.processStep}
                                    </span>
                                )}
                            </TableCell>
                            <TableCell className="py-2 px-3 text-xs text-slate-600">
                                {formatDate(row.lastUpdate)}
                            </TableCell>
                            <TableCell className="py-2 px-3 text-xs text-slate-600">
                                {formatDate(row.startDate)}
                            </TableCell>
                            <TableCell className="py-2 px-3 text-xs text-slate-600">
                                {row.assignedTo}
                            </TableCell>
                            <TableCell className="py-2 px-3 text-xs text-slate-600">
                                <ActionButton
                                    icon={UserCheck}
                                    onClick={() => handleOpenAssignModal(row)}
                                    title="Reassign Analyst"
                                    variant="ghost"
                                    className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Assign Analyst Modal */}
            {isAssignModalOpen && selectedWaiver && (
                <AssignAnalystModal
                    analysts={mockAnalysts}
                    isOpen={isAssignModalOpen}
                    onClose={() => setIsAssignModalOpen(false)}
                    waiver={selectedWaiver}
                    onAssign={handleAssignAnalyst}
                />
            )}
        </>
    );
}