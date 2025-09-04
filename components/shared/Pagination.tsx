"use client"

import React from "react";

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (pageNumber: number) => void;
    className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
    totalItems,
    itemsPerPage,
    currentPage,
    onPageChange,
    className = '',
}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
        <div className={`flex items-center justify-between px-2 py-3 border-t ${className}`}>
            <div className="flex items-center gap-2">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-2 py-1 text-sm border rounded hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white"
                >
                    Previous
                </button>
                <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-2 py-1 text-sm border rounded hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white"
                >
                    Next
                </button>
            </div>
            <div className="text-sm text-gray-600">
                Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} to{" "}
                {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} items
            </div>
        </div>
    );
};

export default Pagination;