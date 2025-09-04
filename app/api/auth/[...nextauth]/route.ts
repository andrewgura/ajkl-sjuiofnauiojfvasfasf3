import NextAuth from 'next-auth'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import db from '@/lib/db'

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                try {
                    // Get user account info
                    const user = await db
                        .select('*')
                        .from('ACCOUNTS')
                        .where('PRIMARY_EMAIL', credentials.email)
                        .where('ACCOUNT_ACTIVE', 1)
                        .where('ACCOUNT_LOCKED', 0)
                        .first()

                    if (!user) {
                        return null
                    }

                    // Verify password
                    const isValidPassword = await bcrypt.compare(
                        credentials.password,
                        user.PASSWORD_HASH
                    )

                    if (!isValidPassword) {
                        console.log('Invalid password')
                        return null
                    }

                    const userRoles = await db
                        .select(['ROLE_NAME'])
                        .from('PROFILE_ROLES')
                        .where('USER_ID', user.USER_ID)
                        .where('IS_ACTIVE', 1)

                    const roles = userRoles.map(role => role.ROLE_NAME)

                    // Update last login
                    await db('ACCOUNTS')
                        .where('USER_ID', user.USER_ID)
                        .update({ LAST_LOGIN: new Date() })

                    return {
                        id: user.USER_ID,
                        email: user.PRIMARY_EMAIL,
                        name: `${user.FIRST_NAME} ${user.LAST_NAME}`.trim(),
                        firstName: user.FIRST_NAME,
                        lastName: user.LAST_NAME,
                        roles: roles,
                    }
                } catch (error) {
                    console.error('Authentication error:', error)
                    return null
                }
            }
        })
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user, trigger, session }) {

            if (user) {
                token.userId = user.id
                token.firstName = (user as any).firstName
                token.lastName = (user as any).lastName
                token.roles = (user as any).roles || ['AAP User']
            }

            // Settings change
            if (trigger === 'update' && session) {
                if (session.firstName) {
                    token.firstName = session.firstName
                }
                if (session.lastName) {
                    token.lastName = session.lastName
                }
                // You can add other updateable fields here if needed
            }

            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.userId as string
                session.user.firstName = token.firstName as string
                session.user.lastName = token.lastName as string
                session.user.roles = token.roles as string[]
            }
            return session
        }
    },
    pages: {
        signIn: '/login',
    },
    debug: process.env.NODE_ENV === 'development',
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }