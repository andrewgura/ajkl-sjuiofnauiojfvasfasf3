import NextAuth from "next-auth"

declare module "next-auth" {
    interface Session {
        user: {
            id: string
            name?: string | null
            email?: string | null
            firstName?: string
            lastName?: string
            roles: string[]
        }
    }

    interface User {
        id: string
        name?: string | null
        email?: string | null
        firstName?: string
        lastName?: string
        roles: string[]
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        userId: string
        firstName?: string
        lastName?: string
        roles: string[]
    }
}