'use client';

import React from "react";
import { Search, Info } from "lucide-react";
import AssignedWaiversTable from "./AssignedWaiversTable";
import RecentActivityTable from "./RecentActivityTable";
import { DashboardClientProps } from "./types";
import { useRouter } from "next/navigation";

export default function DashboardClient({
    recentActivity,
    assignedWaivers,
    isInternal
}: DashboardClientProps) {
    const router = useRouter();
    return (
        <>
            {/* Browser Support Notice */}
            <div className="flex items-center p-2 bg-blue-50 border border-blue-100 text-blue-700 rounded-lg shadow-sm mb-2">
                <Info className="w-4 h-4 mr-2 flex-shrink-0" />
                <p className="text-sm">
                    For optimal experience, please use Mozilla Firefox or Google Chrome.
                    Other browsers may have limited functionality.
                </p>
            </div>

            {/* Assigned Waivers Section */}
            {isInternal && <AssignedWaiversTable assignedWaivers={assignedWaivers} />}

            {/* Quick Actions and Recent Activity Grid */}
            <div className="grid lg:grid-cols-2 gap-2 mb-2">
                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2">
                    <h2 className="text-base font-semibold text-gray-900 mb-1">
                        Quick Actions
                    </h2>
                    <div className="space-y-1">
                        <button className="w-full flex items-center p-2 hover:bg-gray-50 border border-gray-200 rounded-lg transition-colors group">
                            <div className="mr-2 p-1 bg-purple-50 rounded-lg group-hover:bg-purple-100">
                                <div className="w-4 h-4 text-purple-600 flex items-center justify-center font-medium">
                                    +
                                </div>
                            </div>
                            <div className="text-left">
                                <div className="font-medium text-sm text-gray-900"
                                    onClick={() => router.push('/new-waiver')}
                                >
                                    New Request
                                </div>
                                <div className="text-xs text-gray-500">
                                    Create a new waiver request
                                </div>
                            </div>
                        </button>

                        <button className="w-full flex items-center p-2 hover:bg-gray-50 border border-gray-200 rounded-lg transition-colors group">
                            <div className="mr-2 p-1 bg-blue-50 rounded-lg group-hover:bg-blue-100">
                                <Search className="w-4 h-4 text-blue-600" />
                            </div>
                            <div className="text-left">
                                <div className="font-medium text-sm text-gray-900"
                                    onClick={() => router.push('/my-waivers')}
                                >
                                    My Requests
                                </div>
                                <div className="text-xs text-gray-500">
                                    View your waiver requests
                                </div>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Recent Activity */}
                <RecentActivityTable recentActivity={recentActivity} />
            </div>

            {/* About Waiver Processing Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-3 py-2 border-b border-gray-100">
                    <h2 className="flex items-center text-base font-semibold text-gray-900">
                        <Info className="w-4 h-4 mr-2 text-blue-600" />
                        About Waiver Processing
                    </h2>
                </div>

                <div className="grid grid-cols-2 gap-2 p-2">
                    {/* Left Column */}
                    <div className="space-y-2">
                        {/* You Can Section */}
                        <div className="bg-blue-50/50 rounded-lg p-2">
                            <h3 className="text-sm font-medium text-gray-900 mb-1">
                                You can...
                            </h3>
                            <ul className="space-y-1">
                                <li className="flex items-start">
                                    <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 mr-1"></div>
                                    <span className="text-sm text-gray-600">
                                        Create a new waiver via New Request
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 mr-1"></div>
                                    <span className="text-sm text-gray-600">
                                        View waivers in &quot;My Requests&quot; queue
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 mr-1"></div>
                                    <span className="text-sm text-gray-600">
                                        Search with Keyword in navigation tree
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 mr-1"></div>
                                    <span className="text-sm text-gray-600">
                                        Access User Guide via info icons
                                    </span>
                                </li>
                            </ul>
                        </div>

                        {/* Process Description */}
                        <div>
                            <p className="text-sm text-gray-600 leading-tight">
                                If eligible for a waiver, you&apos;ll receive a unique authorization.
                                Criminal history checks take time, but results return promptly when received.
                                Process typically takes up to 5 business days.
                            </p>
                            {/* Contact Information */}
                            <div className="text-sm text-gray-600 mt-1">
                                For questions: <a href="tel:571-227-2071" className="text-blue-600 hover:text-blue-700 font-medium">571-227-2071</a> or{" "}
                                <a href="https://www.tsa.gov/for-industry/general-aviation" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-medium">TSA website</a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="bg-amber-50 border border-amber-100 rounded-lg p-2">
                        <h3 className="font-medium text-sm text-amber-800 mb-1">
                            Important Notes:
                        </h3>
                        <ul className="space-y-1 text-amber-700 text-sm">
                            <li className="flex items-start">
                                <span className="mr-1">•</span>
                                <span>
                                    All previous waivers pertaining to this type of flight operation are void.
                                </span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-1">•</span>
                                <span>
                                    Complete each block of requested information and describe your planned flight operations.
                                </span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-1">•</span>
                                <span>
                                    Submit information only once to avoid processing delays.
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}