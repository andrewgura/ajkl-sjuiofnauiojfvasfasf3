"use client"

import React from "react";
import { Card } from "@/components/ui/card";
import { AnalystReportItem } from "./types";

interface StatusSectionProps {
    title: string;
    total: number;
    items: AnalystReportItem[];
}

const StatusSection: React.FC<StatusSectionProps> = ({ title, total, items }) => {
    return (
        <Card className="p-6 hover:shadow-sm transition-shadow">
            <div className="mb-6">
                <h2 className="text-base font-medium text-gray-900">{title}</h2>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{total}</p>
            </div>
            <div className="space-y-4">
                {items.map(({ label, value }) => (
                    <div key={label}>
                        <div className="flex justify-between mb-1.5">
                            <span className="text-sm text-gray-600">{label}</span>
                            <span className="text-sm text-gray-900">{value}</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-blue-400 rounded-full transition-all duration-300"
                                style={{
                                    width: `${(value / (total || 1)) * 100}%`,
                                    opacity: 0.8,
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default StatusSection;