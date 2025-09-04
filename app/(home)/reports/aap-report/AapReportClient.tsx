"use client"

import React, { useState } from "react";
import { Download, Calendar } from "lucide-react";
import StatusSection from "./StatusSection";
import { AapReportData } from "./types";
import ActionButton from "@/components/shared/ActionButton";
import DateInput from "@/components/shared/DateInput";

interface AapReportClientProps {
    initialData: AapReportData;
}

const AapReportClient: React.FC<AapReportClientProps> = ({ initialData }) => {
    const [startDate, setStartDate] = useState<Date>(new Date(2025, 0, 1));
    const [endDate, setEndDate] = useState<Date>(new Date(2025, 0, 31));
    const [selectedOption, setSelectedOption] = useState("All");

    const { sections } = initialData;

    const handleDownloadCSV = () => {
        console.log("Downloading CSV...");
    };

    return (
        <div className="w-full">
            <div className="px-1 pb-6">

                {/* Filters */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 mb-6">
                    <div className="flex items-center flex-wrap gap-x-6 gap-y-4">
                        {/* Date Range Section */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1.5 text-gray-700">
                                    <span className="text-sm font-medium">Start</span>
                                </div>
                                <div className="w-36">
                                    <DateInput
                                        value={startDate}
                                        onChange={(date) => date && setStartDate(date)}
                                        placeholder="MM/DD/YYYY"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-700">End</span>
                                <div className="w-36">
                                    <DateInput
                                        value={endDate}
                                        onChange={(date) => date && setEndDate(date)}
                                        placeholder="MM/DD/YYYY"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Segmented Control, results */}
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-700">Results</span>
                            <div className="inline-flex items-center bg-gradient-to-r from-gray-100 to-gray-50 rounded-md p-0.5 border border-gray-200">
                                {["All", "TSA-UCU Only"].map((option) => (
                                    <ActionButton
                                        key={option}
                                        text={option}
                                        onClick={() => setSelectedOption(option)}
                                        variant={selectedOption === option ? "default" : "ghost"}
                                        className={`text-xs px-3 py-1.5 h-auto min-w-0 transition-all duration-200 ${selectedOption === option
                                            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md hover:from-blue-600 hover:to-blue-700 border-0"
                                            : "bg-transparent text-gray-600 hover:text-gray-800 hover:bg-white/60"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* CSV Download */}
                        <div className="ml-auto">
                            <ActionButton
                                icon={Download}
                                text="Download CSV"
                                onClick={handleDownloadCSV}
                                variant="default"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm shadow-sm hover:shadow-md"
                            />
                        </div>
                    </div>
                </div>

                {/* Status Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {sections.map((section) => (
                        <StatusSection
                            key={section.title}
                            title={section.title}
                            total={section.total}
                            items={section.items}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AapReportClient;