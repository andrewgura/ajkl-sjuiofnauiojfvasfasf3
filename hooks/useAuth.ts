import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import {
    getAccessiblePages,
    canViewSection
} from '@/utils/permissions'
import { hasPagePermission } from '@/utils/permissions-mapping'

export function useAuth(redirectTo = '/login') {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === 'loading') return

        if (!session) {
            router.push(redirectTo)
        }
    }, [session, status, router, redirectTo])

    const roles = session?.user?.roles || []

    return {
        // Session data
        session,
        loading: status === 'loading',
        isAuthenticated: !!session,

        // User data
        userId: session?.user?.id,
        userEmail: session?.user?.email,
        firstName: session?.user?.firstName,
        lastName: session?.user?.lastName,
        roles,
        user: session?.user || null,

        // Basic role checks
        hasRole: (role: string) => roles.includes(role),
        hasAnyRole: (checkRoles: string[]) => checkRoles.some(role => roles.includes(role)),
        hasAllRoles: (checkRoles: string[]) => checkRoles.every(role => roles.includes(role)),

        // Page-specific permissions
        hasPagePermission: (pagePath: string) => hasPagePermission(roles, pagePath),

        // Convenience permissions
        isAdmin: roles.includes('Admin'),
        isInternalUser: roles.length === 1 && roles[0] === "AAP User",

        // Advanced functions
        getAccessiblePages: (sectionPrefix?: string) => getAccessiblePages(roles, sectionPrefix),
    }
}