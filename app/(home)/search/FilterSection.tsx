"use client";

import React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface FilterSectionProps {
    title: string;
    isExpanded: boolean;
    onToggle: () => void;
    children?: React.ReactNode;
}

const FilterSection: React.FC<FilterSectionProps> = ({
    title,
    isExpanded,
    onToggle,
    children,
}) => {
    const Icon = isExpanded ? ChevronDown : ChevronRight;

    return (
        <Card>
            <CardContent className="p-4">
                <div
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={onToggle}
                >
                    <Icon className="w-4 h-4 text-gray-600" />
                    <span className="font-medium text-gray-900">{title}</span>
                </div>
                {isExpanded && <div className="mt-4 space-y-3">{children}</div>}
            </CardContent>
        </Card>
    );
};

export default FilterSection;