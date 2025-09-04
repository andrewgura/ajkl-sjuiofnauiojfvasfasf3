'use client';

import { Mail, Building2, Users, ArrowLeft, MessageSquare, FilePen, List } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminHeader = () => {
    return (
        <header className="h-14 border-b border-gray-200 flex items-center justify-between px-4 bg-white">
            <div className="flex items-center space-x-2">
                <Link
                    href="/"
                    className="text-gray-600 hover:text-gray-900 flex items-center space-x-2"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm">Back to Waivers</span>
                </Link>
                <span className="text-gray-300 mx-2">/</span>
                <span className="text-sm text-gray-600">Admin Portal</span>
            </div>
        </header>
    );
};

const AdminNav = () => {
    const pathname = usePathname();

    const sections = [
        {
            id: "user-management",
            label: "User Management",
            icon: Users,
            description: "Manage user accounts, roles and permissions",
        },
        {
            id: "email-management",
            label: "Email Management",
            icon: Mail,
            description: "Configure system email templates and settings",
        },
        {
            id: "waiver-type-editor",
            label: "Waiver Type Editor",
            icon: FilePen,
            description: "Tool for editing existing waiver types and descriptions",
        },
        {
            id: "waiver-paragraph-editor",
            label: "Waiver Paragraph Editor",
            icon: FilePen,
            description: "Tool for editing existing waiver types and descriptions",
        },
        {
            id: "sporting-events",
            label: "Sporting Events",
            icon: Building2,
            description: "Manage sporting event configurations",
        },
        {
            id: "fbo-management",
            label: "FBO Management",
            icon: Building2,
            description: "Fixed Base Operator settings",
        },
        {
            id: "lookup-lists",
            label: "Lookup Lists",
            icon: List,
            description: "Manage all Lookup Lists",
        },
        {
            id: "banner-management",
            label: "Banner Management",
            icon: MessageSquare,
            description: "Configure login page banner settings",
        },
    ];

    return (
        <div className="py-2">
            {sections.map(({ id, label, icon: Icon, description }) => (
                <Link
                    key={id}
                    href={`/administrator/${id}`}
                    className={`w-full flex items-center px-4 py-2 text-sm ${pathname === `/administrator/${id}`
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50"
                        }`}
                >
                    <Icon className="w-4 h-4 mr-3" />
                    <div className="text-left flex-1">
                        <div
                            className={
                                pathname === `/administrator/${id}` ? "text-blue-600" : "text-gray-900"
                            }
                        >
                            {label}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">{description}</div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default function AdministratorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-screen flex flex-col bg-gray-50">
            <AdminHeader />
            <div className="flex-1 flex overflow-hidden">
                {/* Left sidebar */}
                <div className="w-64 bg-white border-r border-gray-200">
                    <AdminNav />
                </div>

                {/* Main content area */}
                <div className="flex-1 overflow-y-auto">{children}</div>
            </div>
        </div>
    );
}