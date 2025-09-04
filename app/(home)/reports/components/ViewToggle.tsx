"use client"

import React from "react";

interface ViewToggleProps {
    showRejections: boolean;
    onChange: (showRejections: boolean) => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ showRejections, onChange }) => {
    return (
        <div className="inline-flex rounded overflow-hidden border border-gray-200">
            <button
                type="button"
                className={`px-4 py-1.5 text-xs font-medium transition-colors ${!showRejections
                    ? "bg-green-50 text-gray-900"
                    : "bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-50/50"
                    }`}
                onClick={() => onChange(false)}
            >
                Certifications
            </button>
            <button
                type="button"
                className={`px-4 py-1.5 text-xs font-medium border-l border-gray-200 transition-colors ${showRejections
                    ? "bg-green-50 text-gray-900"
                    : "bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-50/50"
                    }`}
                onClick={() => onChange(true)}
            >
                Rejections
            </button>
        </div>
    );
};