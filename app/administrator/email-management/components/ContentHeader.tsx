'use client';

import { Mail, Users } from "lucide-react";

type ViewType = "templates" | "lists";

interface ContentHeaderProps {
    activeView: ViewType;
}

export const ContentHeader: React.FC<ContentHeaderProps> = ({ activeView }) => {
    return (
        <div className="px-5 py-4 border-b border-slate-200 bg-gradient-to-r from-slate-50/80 to-blue-50/20">
            <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-white shadow-sm border border-slate-200">
                        {activeView === "templates" ? (
                            <Mail className="h-4 w-4 text-blue-600" />
                        ) : (
                            <Users className="h-4 w-4 text-blue-600" />
                        )}
                    </div>
                    <div className="space-y-1">
                        <h2 className="text-lg font-bold text-slate-900">
                            {activeView === "templates" ? "System Notifications" : "Distribution Lists"}
                        </h2>
                        <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                            {activeView === "templates"
                                ? "Create and manage email templates for automated system notifications. Use variables to personalize messages for different waiver types and statuses."
                                : "Configure and manage email distribution lists for notifications. Add or remove recipients to control who receives specific types of alerts."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContentHeader;