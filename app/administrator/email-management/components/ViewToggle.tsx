'use client';

import { Mail, Users } from "lucide-react";

type ViewType = "templates" | "lists";

interface ViewToggleProps {
    activeView: ViewType;
    setActiveView: (view: ViewType) => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({
    activeView,
    setActiveView,
}) => {
    return (
        <div className="flex space-x-1 mb-5 p-0.5 bg-slate-100 rounded-lg w-fit">
            <button
                onClick={() => setActiveView("templates")}
                className={`px-3 py-2 text-xs font-medium rounded-md flex items-center gap-2 transition-all duration-200 ${activeView === "templates"
                    ? "bg-white text-blue-600 shadow-sm border border-blue-200/50"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
            >
                <Mail className="h-3 w-3" />
                <span>Email Templates</span>
                {activeView === "templates" && (
                    <span className="bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full text-xs font-medium">
                        7
                    </span>
                )}
            </button>
            <button
                onClick={() => setActiveView("lists")}
                className={`px-3 py-2 text-xs font-medium rounded-md flex items-center gap-2 transition-all duration-200 ${activeView === "lists"
                    ? "bg-white text-blue-600 shadow-sm border border-blue-200/50"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
            >
                <Users className="h-3 w-3" />
                <span>Distribution Lists</span>
                {activeView === "lists" && (
                    <span className="bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full text-xs font-medium">
                        6
                    </span>
                )}
            </button>
        </div>
    );
};

export default ViewToggle;