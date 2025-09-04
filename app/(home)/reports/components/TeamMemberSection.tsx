"use client"

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { MemberWaiverTable } from "./MemberWaiverTable";
import { TeamMember, Waiver } from "@/types/report-types";

interface TeamMemberSectionProps {
    member: TeamMember;
    waivers: Waiver[];
    showRejections: boolean;
    isExpanded: boolean;
    onToggle: () => void;
}

export const TeamMemberSection: React.FC<TeamMemberSectionProps> = ({
    member,
    waivers,
    showRejections,
    isExpanded,
    onToggle
}) => {
    const [contentHeight, setContentHeight] = useState<number>(0);

    // Reference for measuring content height
    const contentRef = useRef<HTMLDivElement>(null);

    // Update height on content change
    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(contentRef.current.scrollHeight);
        }
    }, [isExpanded, waivers]);

    return (
        <div className={`border border-gray-200 rounded-sm bg-white transition-all duration-300 ${isExpanded ? "shadow-md" : "shadow-sm"
            }`}>
            <div
                className={`flex items-center justify-between py-2.5 px-4 cursor-pointer select-none hover:bg-gray-50/50 transition-colors ${isExpanded ? "bg-gray-50" : ""
                    }`}
                onClick={onToggle}
            >
                <div className="flex items-center gap-2.5">
                    <div className="transition-transform duration-200">
                        {isExpanded ? (
                            <ChevronDown className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                        ) : (
                            <ChevronRight className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                        )}
                    </div>
                    <div>
                        <h2 className="text-sm font-medium text-gray-900 leading-5">
                            {member.name}
                        </h2>
                        <p className="text-xs text-gray-500 mt-0.5">{member.role}</p>
                    </div>
                </div>
                <div>
                    <span className={`text-sm font-medium transition-colors ${isExpanded ? "text-blue-700" : "text-blue-600"
                        }`}>
                        {member.waiverCount} waivers
                    </span>
                </div>
            </div>

            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? "border-t border-gray-200" : ""
                    }`}
                style={{
                    height: isExpanded ? contentHeight : 0
                }}
            >
                <div ref={contentRef} className="p-2">
                    <MemberWaiverTable
                        waivers={waivers}
                        showRejections={showRejections}
                    />
                </div>
            </div>
        </div>
    );
};