'use client'

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useSession } from 'next-auth/react'
import { Sidebar } from "@/components/nav/sidebar"
import { AppBanner } from "@/components/AppBanner"

interface ExpandedSections {
    waivers: boolean
    tsaProcessing: boolean
    reports: boolean
    utilities: boolean
}

export function RootLayoutClient({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const pathname = usePathname()
    const router = useRouter()
    const { data: session, status } = useSession()

    const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
        waivers: false,
        tsaProcessing: false,
        reports: false,
        utilities: false,
    })

    // Authentication check
    useEffect(() => {
        if (status === 'loading') return // Still loading

        if (!session) {
            router.push('/login')
            return
        }
    }, [session, status, router])

    // Set initial expanded sections based on the current path
    useEffect(() => {
        if (pathname) {
            const newExpandedSections = { ...expandedSections }

            // Expand the waivers section for these paths
            if (pathname.startsWith('/dashboard') ||
                pathname.startsWith('/new-waiver') ||
                pathname.startsWith('/search') ||
                pathname.startsWith('/my-waivers')) {
                newExpandedSections.waivers = true
            }

            // Expand the TSA processing section for these paths
            if (pathname.startsWith('/waiver-processing')) {
                newExpandedSections.tsaProcessing = true
            }

            // Expand the reports section for these paths
            if (pathname.startsWith('/reports')) {
                newExpandedSections.reports = true
            }

            // Expand the utilities section for these paths
            if (pathname.startsWith('/utilities')) {
                newExpandedSections.utilities = true
            }

            setExpandedSections(newExpandedSections)
        }
    }, [pathname])

    const handleSectionToggle = (section: keyof ExpandedSections) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }))
    }

    // Show loading while checking authentication
    if (status === 'loading') {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto"></div>
                    <p className="mt-2 text-blue-200">Loading...</p>
                </div>
            </div>
        )
    }

    // Don't render anything if not authenticated (will redirect)
    if (!session) {
        return null
    }

    return (
        <div className="flex flex-col h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800">
            <AppBanner />

            <div className="flex flex-1 overflow-hidden">
                {/* Navigation/Sidebar container */}
                <div className="w-52 flex-shrink-0">
                    <div className="fixed top-16 bottom-0 left-0 w-52 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 shadow-2xl overflow-y-auto border-r border-slate-700/50">
                        <Sidebar
                            expandedSections={expandedSections}
                            onSectionToggle={handleSectionToggle}
                        />
                    </div>
                </div>

                {/* Main content area */}
                <main className="flex-1 overflow-y-auto">
                    <div className="min-h-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}