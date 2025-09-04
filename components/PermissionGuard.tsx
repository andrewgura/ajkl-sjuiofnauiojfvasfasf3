import React from 'react'
import { useAuth } from '@/hooks/useAuth'

interface PermissionGuardProps {
    children: React.ReactNode
    roles?: string[]
    requireAll?: boolean
    fallback?: React.ReactNode
    page?: string
}

export function PermissionGuard({
    children,
    roles,
    requireAll = false,
    fallback = null,
    page
}: PermissionGuardProps) {
    const { hasAllRoles, hasAnyRole, hasPagePermission } = useAuth()

    let hasAccess = false

    if (page) {
        // Check page-specific permission
        hasAccess = hasPagePermission(page)
    } else if (roles && roles.length > 0) {
        // Use role-based check
        hasAccess = requireAll
            ? hasAllRoles(roles)
            : hasAnyRole(roles)
    }

    return hasAccess ? <>{children}</> : <>{fallback}</>
}