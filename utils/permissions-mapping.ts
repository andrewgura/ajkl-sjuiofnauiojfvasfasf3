// Core permission logic - shared between client and server
// permissions.ts - client
// middleware.ts - server

export const PAGE_PERMISSIONS = {
    // Waivers section
    '/dashboard': ['*'],
    '/new-waiver': ['*'],
    '/search': ['*'],
    '/my-waivers': ['*'],

    // Waiver Processing section
    '/waiver-processing/assign-waivers': ['Admin'],
    '/waiver-processing/tsa-attention': ['Admin'],
    '/waiver-processing/faa-attention': ['Admin'],
    '/waiver-processing/submitted-waivers': ['Admin'],
    '/waiver-processing/finished-waivers': ['Admin'],

    // Reports section
    '/reports/aap-report': ['Admin'],
    '/reports/analyst': ['Admin'],
    '/reports/annual-report': ['Admin'],
    '/reports/aso': ['Admin'],
    '/reports/dassp': ['Admin'],
    '/reports/faa-daily-report': ['Admin'],
    '/reports/monthly-financial': ['Admin'],
    '/reports/iapwg': ['Admin'],
    '/reports/uas': ['Admin'],
    '/reports/waiver-master-list': ['Admin'],

    // Utilities section
    '/utilities/group-notifications': ['Admin'],
    '/utilities/sporting-events': ['Admin'],
    '/utilities/stale-waivers': ['Admin'],

    // Support
    '/support': ['*'],

    // Settings
    '/settings': ['*'],

    // Admin section
    '/administrator': ['Admin'],
    '/administrator/user-management': ['Admin'],
    '/administrator/email-management': ['Admin'],
    '/administrator/waiver-type-editor': ['Admin'],
    '/administrator/waiver-paragraph-editor': ['Admin'],
    '/administrator/sporting-events': ['Admin'],
    '/administrator/fbo-management': ['Admin'],
    '/administrator/lookup-lists': ['Admin'],
    '/administrator/banner-management': ['Admin'],
    '/administrator/database-actions': ['Admin'],
} as const

export const ROLES = {
    'Admin': ['Admin'],
    'AAP User': ['AAP User'],
} as const

export function roleMatches(userRole: string, requiredRole: string): boolean {
    // Exact match
    if (userRole === requiredRole) {
        return true
    }

    // Wildcard match - allows any authenticated user
    if (requiredRole === '*') {
        return true
    }

    return false
}

export function getEffectiveRoles(userRoles: string[]): string[] {
    const effectiveRoles = new Set<string>()

    for (const role of userRoles) {
        const hierarchyRoles = ROLES[role as keyof typeof ROLES] || [role]
        hierarchyRoles.forEach(r => effectiveRoles.add(r))
    }

    return Array.from(effectiveRoles)
}

export function hasPagePermission(userRoles: string[], pagePath: string): boolean {
    const effectiveRoles = getEffectiveRoles(userRoles)
    const requiredRoles = PAGE_PERMISSIONS[pagePath as keyof typeof PAGE_PERMISSIONS]

    if (!requiredRoles) {
        return false
    }

    return requiredRoles.some(requiredRole =>
        effectiveRoles.some(userRole => roleMatches(userRole, requiredRole))
    )
}