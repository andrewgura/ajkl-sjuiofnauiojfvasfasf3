"use client"

import React, { useState } from "react";
import { Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DailyOverview } from "../components/DailyOverview";
import { TeamMemberSection } from "../components/TeamMemberSection";
import { TeamMember, WaiverData } from "@/types/report-types";
import { ViewToggle } from "../components/ViewToggle";
import EmptyTableState from "@/components/shared/EmptyTableState";

interface AnnualReportClientProps {
    initialData: {
        teamMembers: TeamMember[];
        waiverData: WaiverData;
    };
}

const AnnualReportClient: React.FC<AnnualReportClientProps> = ({ initialData }) => {
    const [startDate, setStartDate] = useState<Date>(new Date(2024, 0, 1));
    const [endDate, setEndDate] = useState<Date>(new Date(2024, 0, 31));
    const [waiverData] = useState<WaiverData>(initialData.waiverData || {});
    const [teamMembers] = useState<TeamMember[]>(initialData.teamMembers || []);
    const [showRejections, setShowRejections] = useState<boolean>(false);
    const [expandedMemberId, setExpandedMemberId] = useState<number | null>(null);

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            setStartDate(new Date(e.target.value));
        }
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            setEndDate(new Date(e.target.value));
        }
    };

    const formatDateForInput = (date: Date): string => {
        return date.toISOString().split('T')[0];
    };

    const handleMemberToggle = (memberId: number) => {
        setExpandedMemberId(currentId => currentId === memberId ? null : memberId);
    };

    return (
        <div className="max-w-[100rem] mx-auto">
            <div>
                {/* Filters row */}
                <div className="flex items-end gap-8 pb-6 border-b border-gray-200">
                    <div className="w-44">
                        <label className="text-sm font-medium text-gray-900 mb-1.5 block">
                            Start Date
                        </label>
                        <Input
                            value={formatDateForInput(startDate)}
                            onChange={handleStartDateChange}
                            className="w-full"
                            type="date"
                        />
                    </div>
                    <div className="w-44">
                        <label className="text-sm font-medium text-gray-900 mb-1.5 block">
                            End Date
                        </label>
                        <Input
                            value={formatDateForInput(endDate)}
                            onChange={handleEndDateChange}
                            className="w-full"
                            type="date"
                        />
                    </div>
                    <div className="flex items-end ml-2">
                        <ViewToggle
                            showRejections={showRejections}
                            onChange={setShowRejections}
                        />
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => { }}
                            className="flex items-center justify-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-xs font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors duration-200"
                        >
                            <Download className="w-3 h-3" />
                            <span>Download CSV</span>
                        </button>
                    </div>
                </div>
            </div>

            {teamMembers.length > 0 ? (
                <>
                    <DailyOverview
                        waiverData={waiverData}
                        startDate={startDate}
                        endDate={endDate}
                        teamMembers={teamMembers}
                    />

                    {/* Content */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {teamMembers.map((member) => {
                            // Determine if this member should be full width
                            const isExpanded = expandedMemberId === member.id;
                            const gridClass = isExpanded ? "col-span-1 md:col-span-2 lg:col-span-3" : "";

                            return (
                                <div key={member.id} className={gridClass}>
                                    <TeamMemberSection
                                        member={member}
                                        waivers={waiverData[member.id] || []}
                                        showRejections={showRejections}
                                        isExpanded={isExpanded}
                                        onToggle={() => handleMemberToggle(member.id)}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </>
            ) : (
                <div className="mt-8 bg-white border border-slate-200 rounded-lg">
                    <EmptyTableState
                        title="No data available"
                        message="There are no waivers or team members to display for the selected date range. Try adjusting the date filters or check back later when data is available."
                    />
                </div>
            )}
        </div>
    );
};

export default AnnualReportClient;