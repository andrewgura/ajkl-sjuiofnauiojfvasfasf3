"use client"

import React, { useRef, useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    ChevronUp,
    AlertCircle,
} from "lucide-react";
import { WaiverData, TeamMember } from "@/types/report-types";

interface DailyOverviewProps {
    waiverData: WaiverData;
    startDate: Date;
    endDate: Date;
    teamMembers: TeamMember[];
}

interface UserCount {
    [userId: string]: number;
}

interface DailyCount {
    total: number;
    byUser: UserCount;
}

interface DailyCounts {
    [dateKey: string]: DailyCount;
}

export const DailyOverview: React.FC<DailyOverviewProps> = ({
    waiverData,
    startDate,
    endDate,
    teamMembers,
}) => {

    const [isExpanded, setIsExpanded] = useState(true);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Create lookup map for team members
    const teamMemberMap = useMemo(() => {
        if (!teamMembers || !Array.isArray(teamMembers)) {
            return {};
        }
        return teamMembers.reduce<Record<number, TeamMember>>((map, member) => {
            map[member.id] = member;
            return map;
        }, {});
    }, [teamMembers]);

    // Calculate date range between start and end
    const dateRange = useMemo(() => {
        const dates: Date[] = [];
        const current = new Date(startDate);
        const endTime = endDate.getTime();

        while (current.getTime() <= endTime) {
            dates.push(new Date(current));
            current.setDate(current.getDate() + 1);
        }

        return dates;
    }, [startDate, endDate]);

    // Calculate daily counts from waiver data
    const { dailyCounts, hasData } = useMemo(() => {

        if (!waiverData || Object.keys(waiverData).length === 0) {
            return { dailyCounts: {}, hasData: false };
        }

        // Initialize counts for each date
        const counts: DailyCounts = {};
        dateRange.forEach(date => {
            const dateKey = date.toISOString().split("T")[0];
            counts[dateKey] = { total: 0, byUser: {} };
        });

        // Calculate counts from waiver data
        Object.entries(waiverData).forEach(([userId, waivers]) => {
            if (!waivers) return;

            waivers.forEach(waiver => {
                const dateKey = waiver.certifiedDate.toISOString().split("T")[0];

                if (counts[dateKey]) {
                    counts[dateKey].byUser[userId] = (counts[dateKey].byUser[userId] || 0) + 1;
                    counts[dateKey].total += 1;
                }
            });
        });

        return { dailyCounts: counts, hasData: true };
    }, [waiverData, dateRange]);

    // Scroll handler for the horizontal scrolling
    const handleScroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const scrollAmount = direction === "left" ? -1000 : 1000;
            scrollContainerRef.current.scrollBy({
                left: scrollAmount,
                behavior: "smooth",
            });
        }
    };

    // Render daily overview cards
    return (
        <Card className="mb-6">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                    {isExpanded ? (
                        <>
                            <span>Hide Overview</span>
                            <ChevronUp className="h-4 w-4" />
                        </>
                    ) : (
                        <>
                            <span>Show Overview</span>
                            <ChevronDown className="h-4 w-4" />
                        </>
                    )}
                </button>
            </CardHeader>

            <div
                className={`transition-all duration-300 ease-in-out ${isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                    }`}
            >
                <CardContent className="relative">
                    {hasData ? (
                        <>
                            {/* Navigation Buttons */}
                            <button
                                onClick={() => handleScroll("left")}
                                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 shadow-lg rounded-r-lg p-2 hover:bg-gray-50 border border-gray-200"
                            >
                                <ChevronLeft className="h-6 w-6 text-gray-600" />
                            </button>
                            <button
                                onClick={() => handleScroll("right")}
                                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 shadow-lg rounded-l-lg p-2 hover:bg-gray-50 border border-gray-200"
                            >
                                <ChevronRight className="h-6 w-6 text-gray-600" />
                            </button>

                            {/* Scrollable Content */}
                            <div
                                ref={scrollContainerRef}
                                className="overflow-x-auto scrollbar-hide mx-8"
                            >
                                <div className="inline-flex gap-4 min-w-full pb-2">
                                    {dateRange.map((date, index) => (
                                        <DailyCard
                                            key={date.toISOString()}
                                            date={date}
                                            index={index}
                                            dailyCounts={dailyCounts}
                                            teamMemberMap={teamMemberMap}
                                        />
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                            <div className="bg-gray-50 rounded-full p-3 mb-4">
                                <AlertCircle className="h-6 w-6 text-gray-400" />
                            </div>
                            <h3 className="text-base font-medium text-gray-900 mb-1">No data available</h3>
                            <p className="text-sm text-gray-500 max-w-md">
                                There are no waivers to display for the selected date range.
                                Try adjusting the date filters or check back later.
                            </p>
                        </div>
                    )}
                </CardContent>
            </div>
        </Card>
    );
};

interface DailyCardProps {
    date: Date;
    index: number;
    dailyCounts: DailyCounts;
    teamMemberMap: Record<number, TeamMember>;
}

const DailyCard: React.FC<DailyCardProps> = ({ date, index, dailyCounts, teamMemberMap }) => {
    const dateKey = date.toISOString().split("T")[0];
    const dayData = dailyCounts[dateKey] || { total: 0, byUser: {} };

    // Get active users sorted by count
    const activeUsers = Object.entries(dayData.byUser)
        .filter(([_, count]) => count > 0)
        .sort((a, b) => b[1] - a[1]);

    // Format the date for display
    const weekNum = Math.floor(index / 7) + 1;
    const dayNum = date.getDate();

    return (
        <div className="flex-none w-48 bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:border-blue-200 transition-colors">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200">
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500">
                        {`${weekNum}/${dayNum}`}/2025
                    </span>
                </div>
                <span className="text-2xl font-semibold text-blue-600">
                    {dayData.total}
                </span>
            </div>
            <div className="space-y-2">
                {activeUsers.map(([userId, count]) => (
                    <div
                        key={userId}
                        className="flex justify-between items-center py-1 px-2 rounded-md hover:bg-gray-50"
                    >
                        <span className="text-sm text-gray-700 truncate max-w-[120px]">
                            {teamMemberMap[Number(userId)]?.name || "Unknown"}
                        </span>
                        <span className="text-sm font-medium text-gray-900 bg-blue-50 px-2 py-0.5 rounded-full">
                            {count}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};