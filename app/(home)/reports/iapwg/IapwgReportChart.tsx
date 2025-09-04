"use client"

import { useState } from "react";

interface ReportItem {
    type: string;
    description: string;
    count: number;
}

interface IapwgReportChartProps {
    data: ReportItem[];
}

const IapwgReportChart = ({ data }: IapwgReportChartProps) => {
    // Sort and prepare data for the chart - only show top 5
    const chartData = [...data]
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

    // Find maximum value to calculate bar widths
    const maxValue = Math.max(...chartData.map(item => item.count));

    // Add tooltip functionality for descriptions
    const [tooltipVisible, setTooltipVisible] = useState<number | null>(null);

    return (
        <div className="bg-white rounded-md shadow-sm border border-gray-200 p-4">
            <h2 className="text-sm font-medium text-gray-900 mb-4">
                Top 5 Waiver Types
            </h2>
            <div className="h-[300px] flex flex-col justify-center">
                {chartData.map((item, index) => (
                    <div key={item.type} className="mb-6 last:mb-0">
                        <div className="flex items-center mb-1 relative"
                            onMouseEnter={() => setTooltipVisible(index)}
                            onMouseLeave={() => setTooltipVisible(null)}>
                            <div className="w-24 text-sm font-medium text-gray-700">{item.type}</div>
                            <div className="flex-1 relative h-10">
                                <div
                                    className="absolute left-0 top-0 h-full bg-blue-600 rounded-md flex items-center pl-3"
                                    style={{ width: `${(item.count / maxValue) * 100}%` }}
                                >
                                    <span className="text-sm font-medium text-white">{item.count}</span>
                                </div>
                            </div>

                            {tooltipVisible === index && (
                                <div className="absolute left-24 -top-10 bg-gray-800 text-white text-xs rounded py-1 px-2 z-10">
                                    {item.description}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IapwgReportChart;