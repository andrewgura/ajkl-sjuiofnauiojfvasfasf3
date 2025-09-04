'use client'

import { ChevronRight, ChevronDown } from "lucide-react"

interface NavSectionProps {
    title: string
    icon?: React.ElementType
    isExpanded: boolean
    onClick: () => void
    children?: React.ReactNode
}

export const NavSection = ({
    title,
    icon: Icon,
    isExpanded,
    onClick
}: NavSectionProps) => (
    <div className="mb-0.5 px-2">
        <div
            className={`flex items-center space-x-2 cursor-pointer p-2 rounded-md transition-colors ${isExpanded
                ? "bg-blue-500/20 text-blue-200 border border-blue-500/30"
                : "hover:bg-slate-700/50 text-slate-200 hover:text-white"
                }`}
            onClick={onClick}
        >
            {Icon && <Icon className={`w-4 h-4 ${isExpanded ? "text-blue-300" : "text-slate-400"}`} />}
            <span className="text-sm font-medium flex-1">{title}</span>
            {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-blue-300" />
            ) : (
                <ChevronRight className="w-4 h-4 text-slate-400" />
            )}
        </div>
    </div>
)