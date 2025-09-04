'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function NotFound() {
    const router = useRouter()

    useEffect(() => {
        // Get the last valid path or default to dashboard
        const lastValidPath = sessionStorage.getItem('lastValidPath') || '/dashboard'
        router.push(lastValidPath)
    }, [router])

    // Return null since we're redirecting anyway
    return null
}