// Server Side permissions

import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import type { NextRequestWithAuth } from 'next-auth/middleware'
import { hasPagePermission } from './utils/permissions-mapping'

function getDefaultRedirectForUser(userRoles: string[]): string {
    if (userRoles.length > 0) {
        return '/dashboard'
    } else {
        return '/login'
    }
}

export default withAuth(
    function middleware(req: NextRequestWithAuth) {
        const token = req.nextauth.token
        const pathname = req.nextUrl.pathname

        // Ensure user has valid session with roles
        if (!token?.roles || !Array.isArray(token.roles) || token.roles.length === 0) {
            return NextResponse.redirect(new URL('/login', req.url))
        }

        const userRoles = token.roles as string[]

        // Check page-specific permissions
        const hasAccess = hasPagePermission(userRoles, pathname)

        if (!hasAccess) {
            const redirectUrl = getDefaultRedirectForUser(userRoles)
            return NextResponse.redirect(new URL(redirectUrl, req.url))
        }

        return NextResponse.next()
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        },
    }
)

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/new-waiver/:path*',
        '/search/:path*',
        '/my-waivers/:path*',
        '/waiver-processing/:path*',
        '/reports/:path*',
        '/utilities/:path*',
        '/support/:path*',
        '/settings/:path*',
        '/administrator/:path*',
    ]
}