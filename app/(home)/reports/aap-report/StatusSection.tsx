"use client"

import React from "react";
import { AapReportItem } from "./types";

interface StatusSectionProps {
    title: string;
    total: number;
    items: AapReportItem[];
}

const StatusSection: React.FC<StatusSectionProps> = ({ title, total, items }) => {
    // Color scheme for different status types
    const getStatusColor = (title: string) => {
        const colors = {
            "Certified": "bg-emerald-500",
            "Determined": "bg-blue-500",
            "Rejected": "bg-red-500",
            "Terminated": "bg-orange-500",
            "Vetted": "bg-purple-500",
            "Cancelled": "bg-gray-500",
            "IAPWG Review": "bg-amber-500"
        };
        return colors[title as keyof typeof colors] || "bg-blue-500";
    };

    const getStatusBadgeColor = (title: string) => {
        const colors = {
            "Certified": "bg-emerald-50 text-emerald-700 border-emerald-200",
            "Determined": "bg-blue-50 text-blue-700 border-blue-200",
            "Rejected": "bg-red-50 text-red-700 border-red-200",
            "Terminated": "bg-orange-50 text-orange-700 border-orange-200",
            "Vetted": "bg-purple-50 text-purple-700 border-purple-200",
            "Cancelled": "bg-gray-50 text-gray-700 border-gray-200",
            "IAPWG Review": "bg-amber-50 text-amber-700 border-amber-200"
        };
        return colors[title as keyof typeof colors] || "bg-blue-50 text-blue-700 border-blue-200";
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 p-4 group">
            <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                    <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
                    <div className={`px-2 py-0.5 rounded-full text-sm font-medium border ${getStatusBadgeColor(title)}`}>
                        {total} total
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                {items.map(({ label, value }) => {
                    const percentage = (value / (total || 1)) * 100;
                    return (
                        <div key={label} className="group/item">
                            <div className="flex justify-between items-center mb-1.5">
                                <span className="text-xs font-medium text-gray-700">{label}</span>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-xs font-semibold text-gray-900">{value}</span>
                                    <span className="text-xs text-gray-500">({percentage.toFixed(1)}%)</span>
                                </div>
                            </div>
                            <div className="relative h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-500 ease-out ${getStatusColor(title)} group-hover/item:opacity-90`}
                                    style={{
                                        width: `${percentage}%`,
                                        boxShadow: percentage > 0 ? '0 0 0 1px rgba(255,255,255,0.1)' : 'none'
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StatusSection;