"use client";

import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface FilterContainerProps {
    title?: string;
    onReset: () => void;
    onDownloadCSV?: () => void;
    infoComponent?: ReactNode;
    children: ReactNode;
}

const FilterContainer = ({
    title = "Filters",
    onReset,
    onDownloadCSV,
    infoComponent,
    children,
}: FilterContainerProps) => {
    return (
        <div className="w-72 flex-shrink-0 space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-5 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <h2 className="text-base font-semibold text-slate-900">{title}</h2>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs h-7 px-3 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                        onClick={onReset}
                    >
                        Reset all
                    </Button>
                </div>

                <div className="space-y-4">
                    {children}

                    {onDownloadCSV && (
                        <div className="flex items-center">
                            <button
                                className="flex items-center w-full justify-center space-x-2 px-4 py-2.5 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors duration-200"
                                onClick={onDownloadCSV}
                            >
                                <Download className="w-4 h-4" />
                                <span>Download CSV</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {infoComponent}
        </div>
    );
};

export default FilterContainer;