'use client'

import { NavColor } from '@/types/nav'
import { usePathname, useRouter } from 'next/navigation'

interface NavItemProps {
    label: string
    href?: string
    active?: boolean
    color?: NavColor
    onClick?: () => void
}

export const NavItem = ({
    label,
    href = "/",
    active,
    onClick
}: NavItemProps) => {
    const router = useRouter()
    const pathname = usePathname()
    const isActive = pathname === href || active

    const handleClick = () => {
        if (onClick) {
            onClick()
        } else {
            router.push(href)
        }
    }

    return (
        <div
            className={`flex items-center space-x-2 cursor-pointer px-3 py-1.5 rounded-md transition-colors ${isActive
                    ? "bg-gradient-to-r from-blue-500/30 to-indigo-500/20 text-blue-200 border border-blue-500/30"
                    : "hover:bg-slate-700/30 text-slate-300 hover:text-white"
                }`}
            onClick={handleClick}
        >
            <span className={`text-xs truncate ${isActive && "font-semibold"}`}>{label}</span>
        </div>
    )
}