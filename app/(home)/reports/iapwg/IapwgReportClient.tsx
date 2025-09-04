"use client"

import { useState } from "react";
import CalendarSelect from "@/components/shared/DateInput";
import { Button } from "@/components/ui/button";
import { Download, Calendar, FileType } from "lucide-react";
import IapwgReportTable from "./IapwgReportTable";
import IapwgReportChart from "./IapwgReportChart";

interface ReportItem {
    type: string;
    description: string;
    count: number;
}

interface IapwgReportClientProps {
    initialData: ReportItem[];
}

const IapwgReportClient = ({ initialData }: IapwgReportClientProps) => {
    const [startDate, setStartDate] = useState<Date>(new Date(2024, 0, 1));
    const [endDate, setEndDate] = useState<Date>(new Date(2025, 10, 30));
    const [reportData] = useState<ReportItem[]>(initialData);

    // Calculate summary statistics
    const totalWaivers = reportData.reduce((acc, curr) => acc + curr.count, 0);
    const totalTypes = reportData.length;

    // Get top 3 waiver types for stats section
    const top3WaiverTypes = [...reportData]
        .sort((a, b) => b.count - a.count)
        .slice(0, 3);

    const handleDownloadCSV = () => {
        // TODO: Implement CSV download functionality
        console.log("Downloading CSV...");
    };

    return (
        <div className="max-w-7xl mx-auto">
            {/* Date Range */}
            <div className="bg-white rounded-md shadow-sm border border-gray-200 py-3 px-4 mb-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-end gap-6">
                        <div className="w-44">
                            <label className="text-xs text-gray-600 mb-1.5 block">
                                Start Date
                            </label>
                            <CalendarSelect
                                value={startDate}
                                onChange={(date) => date && setStartDate(date)}
                                // className="w-full"
                            />
                        </div>
                        <div className="w-44">
                            <label className="text-xs text-gray-600 mb-1.5 block">
                                End Date
                            </label>
                            <CalendarSelect
                                value={endDate}
                                onChange={(date) => date && setEndDate(date)}
                                // className="w-full"
                            />
                        </div>
                        <Button
                            variant="outline"
                            onClick={handleDownloadCSV}
                            className="h-8 px-3 text-xs font-normal flex items-center gap-2"
                        >
                            <Download className="h-3 w-3" />
                            <span>Download CSV</span>
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
                {/* Chart */}
                <IapwgReportChart data={reportData} />

                {/* Summary Stats */}
                <div className="bg-white rounded-md shadow-sm border border-gray-200 p-4">
                    <h2 className="text-sm font-medium text-gray-900 mb-4">
                        Summary Statistics
                    </h2>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 flex flex-col justify-center shadow-sm">
                            <div className="flex items-center justify-between mb-1">
                                <div className="text-sm text-blue-700">Total Waivers</div>
                                <div className="bg-blue-600 p-1.5 rounded-md">
                                    <FileType className="h-4 w-4 text-white" />
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-blue-700">
                                {totalWaivers}
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 flex flex-col justify-center shadow-sm">
                            <div className="flex items-center justify-between mb-1">
                                <div className="text-sm text-green-700">Waiver Types</div>
                                <div className="bg-green-600 p-1.5 rounded-md">
                                    <Calendar className="h-4 w-4 text-white" />
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-green-700">
                                {totalTypes}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-xs uppercase text-gray-500 font-medium mb-3">Top Waiver Categories</h3>
                        {top3WaiverTypes.map((item, index) => (
                            <div key={item.type} className="mb-3 last:mb-0">
                                <div className="flex items-center justify-between text-sm">
                                    <div className="font-medium text-gray-700">{item.type}</div>
                                    <div className="font-bold text-blue-700">{item.count}</div>
                                </div>
                                <div className="mt-1 relative h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
                                        style={{ width: `${item.count / totalWaivers * 100}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Table */}
            <IapwgReportTable data={reportData} />
        </div>
    );
};

export default IapwgReportClient;