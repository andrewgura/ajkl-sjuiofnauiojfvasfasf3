import React, { useState, useMemo } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Archive, ArrowUp, ArrowDown, ChevronsUpDown } from "lucide-react";
import Pagination from "@/components/shared/Pagination";
import { WaiverRequest, WaiverStatus } from "./types";
import EmptyTableState from "@/components/shared/EmptyTableState";
import Link from "next/link";

interface WaiverTableProps {
    requests: WaiverRequest[];
    emptyTitle?: string;
    emptyMessage?: string;
    isArchive?: boolean
}

// Function to get styles based on waiver status
const getStatusStyles = (status: WaiverStatus) => {
    const baseStyles = "transition-colors duration-200";

    switch (status?.toUpperCase()) {
        case "APPROVED":
            return {
                row: `${baseStyles} bg-green-50/50 hover:bg-green-100/50`,
                text: "text-green-700",
            };
        case "CANCELLED":
        case "VOIDED":
        case "WITHDRAWN":
            return {
                row: `${baseStyles} bg-gray-50/50 hover:bg-gray-100/50`,
                text: "text-gray-600",
            };
        case "DENIED":
        case "TERMINATED":
            return {
                row: `${baseStyles} bg-red-50/50 hover:bg-red-100/50`,
                text: "text-red-700",
            };
        case "DRAFT":
            return {
                row: `${baseStyles} bg-gray-50/50 hover:bg-gray-100/50`,
                text: "text-gray-700",
            };
        case "INCOMPLETE, PLEASE REVISE":
            return {
                row: `${baseStyles} bg-orange-50/50 hover:bg-orange-100/50`,
                text: "text-orange-700",
            };
        case "MODIFICATION":
            return {
                row: `${baseStyles} bg-purple-50/50 hover:bg-purple-100/50`,
                text: "text-purple-700",
            };
        case "NEW/UNSAVED":
            return {
                row: `${baseStyles} bg-blue-50/50 hover:bg-blue-100/50`,
                text: "text-blue-600",
            };
        case "PROCESSING":
            return {
                row: `${baseStyles} bg-yellow-50/50 hover:bg-yellow-100/50`,
                text: "text-yellow-700",
            };
        case "SUBMITTED":
            return {
                row: `${baseStyles} bg-indigo-50/50 hover:bg-indigo-100/50`,
                text: "text-indigo-700",
            };
        case "COMPLETED":
            return {
                row: `${baseStyles} bg-blue-50/50 hover:bg-blue-100/50`,
                text: "text-blue-700",
            };
        default:
            return {
                row: `${baseStyles} hover:bg-gray-50/50`,
                text: "text-gray-700",
            };
    }
};

const WaiverTable: React.FC<WaiverTableProps> = ({
    requests,
    isArchive,
    emptyTitle = "No waivers found",
    emptyMessage = "No waiver requests match your current filter criteria."
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState<
        { key: keyof WaiverRequest; direction: 'ascending' | 'descending' }[]
    >([]);
    const itemsPerPage = 15;

    const sortedRequests = useMemo(() => {
        const sortableItems = [...requests];
        if (sortConfig.length > 0) {
            sortableItems.sort((a, b) => {
                for (let i = 0; i < sortConfig.length; i++) {
                    const { key, direction } = sortConfig[i];
                    const aValue = String(a[key]);
                    const bValue = String(b[key]);

                    // LocaleCompare with numeric: true handles both strings and numbers naturally
                    const comparison = aValue.localeCompare(bValue, undefined, { numeric: true });
                    const sortResult = direction === 'ascending' ? comparison : -comparison;

                    if (sortResult !== 0) {
                        return sortResult;
                    }
                }
                return 0;
            });
        }
        return sortableItems;
    }, [requests, sortConfig]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedRequests.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const requestSort = (key: keyof WaiverRequest, event: React.MouseEvent<HTMLDivElement>) => {
        setSortConfig(prevSortConfig => {
            const existingSortIndex = prevSortConfig.findIndex(s => s.key === key);
            let newSortConfig = [...prevSortConfig];

            if (event.ctrlKey) {
                // Ctrl+click for multi-column sort
                if (existingSortIndex > -1) {
                    const existingSort = newSortConfig[existingSortIndex];
                    if (existingSort.direction === 'ascending') {
                        newSortConfig[existingSortIndex] = { key, direction: 'descending' };
                    } else {
                        // Remove from sort if already sorted descending
                        newSortConfig.splice(existingSortIndex, 1);
                    }
                } else {
                    // Add new column to the end of the sort list, default ascending
                    newSortConfig.push({ key, direction: 'ascending' });
                }
            } else {
                // Regular click for single-column sort
                if (existingSortIndex > -1) {
                    const existingSort = newSortConfig[existingSortIndex];
                    if (existingSort.direction === 'ascending') {
                        newSortConfig = [{ key, direction: 'descending' }];
                    } else {
                        newSortConfig = [];
                    }
                } else {
                    newSortConfig = [{ key, direction: 'ascending' }];
                }
            }
            return newSortConfig;
        });
    };

    const getSortIndicator = (key: keyof WaiverRequest) => {
        const sortStatus = sortConfig.find(s => s.key === key);
        const sortIndex = sortConfig.findIndex(s => s.key === key);
        const iconSpanClassName = "w-6 flex justify-center items-center ml-1";

        if (sortStatus) {
            return (
                <span className={iconSpanClassName}>
                    {sortStatus.direction === 'ascending' ? (
                        <ArrowUp className="w-3 h-3" />
                    ) : (
                        <ArrowDown className="w-3 h-3" />
                    )}
                    {sortConfig.length > 1 && <span className="text-xs font-semibold mr-1">{sortIndex + 1}</span>}
                </span>
            );
        }
        return (
            <span className={iconSpanClassName}>
                <ChevronsUpDown className="w-3 h-3 text-gray-400" />
            </span>
        );
    };

    if (requests.length === 0) {
        return (
            <div className="border rounded-md mb-6">
                <EmptyTableState
                    title={emptyTitle}
                    message={emptyMessage}
                    containerClassName="py-8 text-center"
                />
            </div>
        );
    }

    return (
        <div className="mb-6 rounded-lg shadow-md overflow-hidden">
            <div className="border rounded-md overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="py-2 px-4 w-12">
                                #
                            </TableHead>
                            <TableHead
                                className="py-2 px-4 cursor-pointer hover:bg-gray-100 transition-colors"
                                onClick={(e) => requestSort('confirmation', e)}
                            >
                                <span className="flex items-center">
                                    Confirmation {getSortIndicator('confirmation')}
                                </span>
                            </TableHead>
                            <TableHead
                                className="py-2 px-4 cursor-pointer hover:bg-gray-100 transition-colors"
                                onClick={(e) => requestSort('type', e)}
                            >
                                <span className="flex items-center">
                                    Waiver Type {getSortIndicator('type')}
                                </span>
                            </TableHead>
                            <TableHead
                                className="py-2 px-4 cursor-pointer hover:bg-gray-100 transition-colors"
                                onClick={(e) => requestSort('status', e)}
                            >
                                <span className="flex items-center">
                                    Waiver Status {getSortIndicator('status')}
                                </span>
                            </TableHead>
                            <TableHead
                                className="py-2 px-4 cursor-pointer hover:bg-gray-100 transition-colors"
                                onClick={(e) => requestSort('waiverId', e)}
                            >
                                <span className="flex items-center">
                                    Waiver ID {getSortIndicator('waiverId')}
                                </span>
                            </TableHead>
                            <TableHead
                                className="py-2 px-4 cursor-pointer hover:bg-gray-100 transition-colors"
                                onClick={(e) => requestSort('applicationDate', e)}
                            >
                                <span className="flex items-center">
                                    Submission Date {getSortIndicator('applicationDate')}
                                </span>
                            </TableHead>
                            <TableHead className="py-2 px-4 w-16 text-center">
                                {isArchive ? "Restore" : "Archive"}
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentItems.map((request, index) => {
                            const statusStyles = getStatusStyles(request.status);
                            return (
                                <TableRow key={index} className={statusStyles.row}>
                                    <TableCell className="py-2 px-4">
                                        {indexOfFirstItem + index + 1}
                                    </TableCell>
                                    <TableCell className="py-2 px-4">
                                        <Link href={`/waiver/${request.confirmation}`} className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                                            {request.confirmation}
                                        </Link>
                                    </TableCell>
                                    <TableCell className="py-2 px-4">{request.type}</TableCell>
                                    <TableCell
                                        className={`font-medium py-2 px-4 ${statusStyles.text}`}
                                    >
                                        {request.status}
                                    </TableCell>
                                    <TableCell className="py-2 px-4">{request.waiverId}</TableCell>
                                    <TableCell className="py-2 px-4">
                                        {request.applicationDate || "-"}
                                    </TableCell>
                                    <TableCell className="py-2 px-4 text-center">
                                        <button className="hover:bg-white/50 p-1 rounded-md transition-colors duration-200">
                                            <Archive className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                                        </button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
            <div className="mt-2">
                <Pagination
                    totalItems={requests.length}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                    className="text-sm"
                />
            </div>
        </div>
    );
};

export default WaiverTable;
