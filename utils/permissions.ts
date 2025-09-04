// Client-side permission utilities

import { hasPagePermission, PAGE_PERMISSIONS } from './permissions-mapping'

// Get all accessible pages for a user
export function getAccessiblePages(userRoles: string[], sectionPrefix?: string): string[] {
    return Object.keys(PAGE_PERMISSIONS).filter(page => {
        if (sectionPrefix && !page.startsWith(sectionPrefix)) {
            return false
        }
        return hasPagePermission(userRoles, page)
    })
}

// Check if user can see at least 1 page in a section
export function canViewSection(userRoles: string[], sectionPrefix: string): boolean {
    return getAccessiblePages(userRoles, sectionPrefix).length > 0
}
