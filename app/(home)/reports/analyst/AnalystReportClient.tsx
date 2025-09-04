"use client"

import React, { useState } from "react";
import { Download } from "lucide-react";
import StatusSection from "./StatusSection";
import AnalystSelect from "./AnalystSelect";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import ActionButton from "@/components/shared/ActionButton";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { AnalystReportData } from "./types";
import { format } from "date-fns";

interface AnalystReportClientProps {
    initialData: AnalystReportData;
}

const AnalystReportClient: React.FC<AnalystReportClientProps> = ({ initialData }) => {
    // Set default start date to one month ago from current date
    const getDefaultStartDate = (): Date => {
        const date = new Date();
        date.setMonth(date.getMonth() - 1);
        return date;
    };

    const [startDate, setStartDate] = useState<Date>(getDefaultStartDate());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [selectedAnalyst, setSelectedAnalyst] = useState(initialData.analysts[0] || "All");

    // We're using the sections from props instead of generating them here
    const { sections } = initialData;

    const handleDownloadCSV = () => {
        console.log("Downloading CSV...");
    };

    // Format date for display
    const formatDateForDisplay = (date: Date): string => {
        return format(date, "MM/dd/yyyy");
    };

    return (
        <div className="w-full">
            <div className="mx-auto max-w-7xl">
                <div className="flex items-center gap-6 mb-6">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Current Analyst</span>
                        <AnalystSelect
                            selectedAnalyst={selectedAnalyst}
                            setSelectedAnalyst={setSelectedAnalyst}
                            analysts={initialData.analysts}
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Start Date</span>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="h-8 px-3 py-1 justify-between bg-white text-left font-normal w-32"
                                >
                                    {formatDateForDisplay(startDate)}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={startDate}
                                    onSelect={(date) => date && setStartDate(date)}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">End Date</span>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="h-8 px-3 py-1 justify-between bg-white text-left font-normal w-32"
                                >
                                    {formatDateForDisplay(endDate)}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={endDate}
                                    onSelect={(date) => date && setEndDate(date)}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="flex items-center ml-2">
                        <ActionButton
                            icon={Download}
                            text="Download CSV"
                            onClick={handleDownloadCSV}
                            variant="outline"
                            className="text-xs font-medium text-gray-700 hover:bg-gray-50 border-gray-200 hover:border-gray-300"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
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

export default AnalystReportClient;