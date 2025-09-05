'use client'

import { Settings, LogOut } from "lucide-react"
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import ActionButton from "./shared/ActionButton"

interface AppBannerProps {
    isLoginPage?: boolean
}

export function AppBanner({ isLoginPage = false }: AppBannerProps) {
    const { data: session } = useSession()
    const router = useRouter()

    const handleUserSettings = () => {
        router.push('/settings')
    }

    const handleLogout = async () => {
        await signOut({
            callbackUrl: '/login',
            redirect: true
        })
    }

    return (
        <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 border-b border-slate-700 w-full h-16 grid grid-cols-3 items-center px-6 relative z-10">
            {/* Left Column */}
            <div className="flex items-center gap-4 mt-1">
                {/* FAA */}
                <div className="flex items-center">
                    <div className="h-14 w-14">
                        <Image
                            src="/files/faa-logo.svg"
                            alt="Federal Aviation Administration"
                            width={70}
                            height={70}
                        />
                    </div>
                    <div className="ml-2 text-sm font-medium text-white leading-tight">
                        <span>Federal Aviation Administration</span>
                    </div>
                </div>
                {/* TSA */}
                <div className="flex items-center">
                    <div className="h-14 w-14 relative flex-shrink-0">
                        <Image
                            src="/files/tsa-logo.svg"
                            alt="Transportation Security Administration"
                            width={50}
                            height={50}
                        />
                    </div>
                    <div className="ml-2 text-sm font-medium text-white leading-tight">
                        <span>Transport Security Administration</span>
                    </div>
                </div>
            </div>

            {/* Center column  */}
            <div className="flex justify-center items-center">
                <h1 className="text-xl font-bold text-white tracking-wide">
                    Airspace Access Program
                </h1>
            </div>

            {/* Right column */}
            <div className="flex items-center justify-end">
                {!isLoginPage && session && (
                    <div className="flex items-center space-x-2">
                        {/* User Info */}
                        <div className="text-white text-sm mr-4">
                            <div className="font-medium">{session.user.firstName} {session.user.lastName}</div>
                            <div className="text-slate-300 text-xs">{session.user.email}</div>
                        </div>

                        {/* User Settings */}
                        <ActionButton
                            icon={Settings}
                            onClick={handleUserSettings}
                            text='Settings'
                            variant="ghost"
                            className="text-white hover:bg-slate-700 hover:text-white"
                        />

                        {/* Logout */}
                        <ActionButton
                            icon={LogOut}
                            text="Logout"
                            onClick={handleLogout}
                            variant="destructive"
                            className="bg-red-600 hover:bg-red-700 text-white"
                        />
                    </div>
                )}
            </div>
        </div>
    )
}