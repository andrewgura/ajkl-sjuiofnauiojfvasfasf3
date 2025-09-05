"use client"

import { ReactNode } from "react";
import { Download, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import DateInput from "../DateInput";

interface DataFilterPanelProps {
    startDate: Date | null;
    endDate: Date | null;
    searchText: string;
    onStartDateChange?: (date: Date | null) => void;
    onEndDateChange?: (date: Date | null) => void;
    onSearchChange: (value: string) => void;
    onReset: () => void;
    onDownloadCSV: () => void;
    infoTitle?: string;
    infoText?: string;
    // Accept either a single ReactNode or an array of ReactNodes
    customFilters?: ReactNode | ReactNode[];
}

export default function DataFilterPanel({
    startDate,
    endDate,
    searchText,
    onStartDateChange,
    onEndDateChange,
    onSearchChange,
    onReset,
    onDownloadCSV,
    infoTitle,
    infoText,
    customFilters
}: DataFilterPanelProps) {
    return (
        <div className="space-y-3">
            {/* Filter Card */}
            <div className="bg-slate-800 rounded-lg border border-slate-600 p-3">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-600 pb-2 mb-3">
                    <h2 className="text-sm font-medium text-white">Filters</h2>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs h-6 px-2 text-slate-300 hover:text-white hover:bg-slate-700"
                        onClick={onReset}
                    >
                        Reset all
                    </Button>
                </div>

                {/* Date Range */}
                <div className="space-y-2 mb-3">
                    {onStartDateChange &&
                        <DateInput
                            value={startDate}
                            onChange={onStartDateChange}
                            placeholder="Select start date"
                        />}

                    {onEndDateChange && <DateInput
                        value={endDate}
                        onChange={onEndDateChange}
                        placeholder="Select end date"
                    />}
                </div>

                {/* Custom Filters - can be single or multiple */}
                {Array.isArray(customFilters)
                    ? customFilters.map((filter, index) => (
                        <div key={index} className="mb-3">
                            {filter}
                        </div>
                    ))
                    : customFilters && <div className="mb-3">{customFilters}</div>
                }

                {/* Search Field */}
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder="Search in all fields..."
                        value={searchText}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full h-8 px-2 py-1 rounded-md border border-slate-600 bg-slate-700 text-white placeholder:text-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                    />
                </div>

                {/* Download CSV Button */}
                <button
                    onClick={onDownloadCSV}
                    className="flex items-center w-full justify-center space-x-1 px-3 py-1.5 bg-slate-700 border border-slate-600 rounded-md text-xs font-medium text-slate-200 hover:bg-slate-600 hover:border-slate-500 transition-colors duration-200"
                >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download CSV</span>
                </button>
            </div>

            {/* Info Box */}
            {(infoTitle || infoText) && <div className="bg-blue-800 rounded-lg border border-blue-600 p-2.5">
                <div className="flex gap-2">
                    <Info className="w-3.5 h-3.5 text-blue-200 flex-shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                        <p className="text-xs font-medium text-blue-100">
                            {infoTitle}
                        </p>
                        <p className="text-xs text-blue-200">
                            {infoText}
                        </p>
                    </div>
                </div>
            </div>}
        </div>
    );
}