'use client'

import { useRouter, usePathname } from 'next/navigation'
import {
    HelpCircle,
    ClipboardCheck,
    FileText,
    BarChart3,
    Hammer as Tool,
    ShieldPlus,
} from "lucide-react"
import { NavSection } from "./nav-section"
import { NavItem } from "./nav-item"
import { PermissionGuard } from '../PermissionGuard'
import { useAuth } from '@/hooks/useAuth'

interface NavItemData {
    label: string;
    href: string;
}

interface ExpandedSections {
    waivers: boolean;
    tsaProcessing: boolean;
    reports: boolean;
    utilities: boolean;
}

interface SidebarProps {
    expandedSections: ExpandedSections;
    onSectionToggle: (section: keyof ExpandedSections) => void;
}

export const Sidebar = ({ expandedSections, onSectionToggle }: SidebarProps) => {
    const router = useRouter()
    const pathname = usePathname()
    const { hasPagePermission } = useAuth()

    const allWaiverItems: NavItemData[] = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "New Waiver", href: "/new-waiver" },
        { label: "Waiver Search", href: "/search" },
        { label: "My Waivers", href: "/my-waivers" },
    ]

    const allProcessingItems: NavItemData[] = [
        { label: "Assign Waivers", href: "/waiver-processing/assign-waivers" },
        { label: "TSA Attention", href: "/waiver-processing/tsa-attention" },
        { label: "FAA Attention", href: "/waiver-processing/faa-attention" },
        { label: "Submitted Waivers", href: "/waiver-processing/submitted-waivers" },
        { label: "Finished Waivers", href: "/waiver-processing/finished-waivers" },
    ]

    const allReportItems: NavItemData[] = [
        { label: "AAP Report", href: "/reports/aap-report" },
        { label: "Analyst Report", href: "/reports/analyst" },
        { label: "Annual Report", href: "/reports/annual-report" },
        { label: "ASO Report", href: "/reports/aso" },
        { label: "DASSP Report", href: "/reports/dassp" },
        { label: "FAA Daily Report", href: "/reports/faa-daily-report" },
        { label: "Monthly Financial Report", href: "/reports/monthly-financial" },
        { label: "IAPWG Report", href: "/reports/iapwg" },
        { label: "UAS Active Report", href: "/reports/uas" },
        { label: "Waiver Master List", href: "/reports/waiver-master-list" }
    ]

    const allUtilityItems: NavItemData[] = [
        {
            label: "Group Notifications",
            href: "/utilities/group-notifications",
        },
        {
            label: "Sporting Event Purposes",
            href: "/utilities/sporting-events",
        },
        {
            label: "Stale Waivers",
            href: "/utilities/stale-waivers",
        },
    ]

    // Filter items based on page permissions
    const accessibleWaiverItems = allWaiverItems.filter(item =>
        hasPagePermission(item.href)
    )

    const accessibleProcessingItems = allProcessingItems.filter(item =>
        hasPagePermission(item.href)
    )

    const accessibleReportItems = allReportItems.filter(item =>
        hasPagePermission(item.href)
    )

    const accessibleUtilityItems = allUtilityItems.filter(item =>
        hasPagePermission(item.href)
    )

    // Only show sections if user has access to at least one page in that section
    const showWaiversSection = accessibleWaiverItems.length > 0
    const showProcessingSection = accessibleProcessingItems.length > 0
    const showReportsSection = accessibleReportItems.length > 0
    const showUtilitiesSection = accessibleUtilityItems.length > 0

    return (
        <div className="h-full flex flex-col">
            {/* Navigation */}
            <div className="flex-1 overflow-y-auto py-4 space-y-2">

                {/* Waivers Section */}
                {showWaiversSection && (
                    <>
                        <NavSection
                            title="Waivers"
                            icon={FileText}
                            isExpanded={expandedSections.waivers}
                            onClick={() => onSectionToggle("waivers")}
                        />
                        {expandedSections.waivers && (
                            <div className="ml-4 mb-2 space-y-1">
                                {accessibleWaiverItems.map((item) => (
                                    <NavItem
                                        key={item.href}
                                        label={item.label}
                                        href={item.href}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}

                {/* Waiver Processing Section */}
                {showProcessingSection && (
                    <>
                        <NavSection
                            title="Waiver Processing"
                            icon={ClipboardCheck}
                            isExpanded={expandedSections.tsaProcessing}
                            onClick={() => onSectionToggle("tsaProcessing")}
                        />
                        {expandedSections.tsaProcessing && (
                            <div className="ml-4 mb-2 space-y-1">
                                {accessibleProcessingItems.map((item) => (
                                    <NavItem
                                        key={item.href}
                                        label={item.label}
                                        href={item.href}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}

                {/* Reports Section */}
                {showReportsSection && (
                    <>
                        <NavSection
                            title="Reports"
                            icon={BarChart3}
                            isExpanded={expandedSections.reports}
                            onClick={() => onSectionToggle("reports")}
                        />
                        {expandedSections.reports && (
                            <div className="ml-4 mb-2 space-y-1">
                                {accessibleReportItems.map((item) => (
                                    <NavItem
                                        key={item.href}
                                        label={item.label}
                                        href={item.href}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}

                {/* Utilities Section */}
                {showUtilitiesSection && (
                    <>
                        <NavSection
                            title="Utilities"
                            icon={Tool}
                            isExpanded={expandedSections.utilities}
                            onClick={() => onSectionToggle("utilities")}
                        />
                        {expandedSections.utilities && (
                            <div className="ml-4 mb-2 space-y-1">
                                {accessibleUtilityItems.map((item) => (
                                    <NavItem
                                        key={item.href}
                                        label={item.label}
                                        href={item.href}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-600/30 space-y-2">
                {/* Admin Button */}
                <PermissionGuard page="/administrator">
                    <div
                        className={`flex items-center space-x-2 cursor-pointer p-2 rounded-md transition-colors ${pathname === "/admin"
                            ? "bg-blue-500/20 text-blue-200"
                            : "text-blue-300 hover:bg-slate-700/50"
                            }`}
                        onClick={() => window.open("/administrator", "_blank")}
                    >
                        <ShieldPlus className="w-4 h-4" />
                        <span className="text-xs font-medium">Administrator</span>
                    </div>
                </PermissionGuard>

                {/* Support */}
                <PermissionGuard page="/support">
                    <div
                        className={`flex items-center space-x-2 cursor-pointer p-2 rounded-md transition-colors ${pathname === "/support"
                            ? "bg-green-500/20 text-green-200"
                            : "text-green-300 hover:bg-slate-700/50"
                            }`}
                        onClick={() => router.push('/support')}
                    >
                        <HelpCircle className="w-4 h-4" />
                        <span className="text-xs font-medium">Support</span>
                    </div>
                </PermissionGuard>
            </div>
        </div>
    )
}