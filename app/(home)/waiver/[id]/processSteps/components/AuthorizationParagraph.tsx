"use client"

import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { ChevronUp, ChevronDown } from "lucide-react";

interface AuthorizationParagraphProps {
    number: number;
    value: string;
    onChange?: (value: string) => void;
    readOnly?: boolean;
    label?: string;
}

const AuthorizationParagraph: React.FC<AuthorizationParagraphProps> = ({
    number,
    value,
    onChange,
    readOnly = false,
    label = `Authorization Paragraph ${number}:`
}) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const handleChange = (newValue: string) => {
        if (onChange && !readOnly) {
            onChange(newValue);
        }
    };

    return (
        <div className="rounded-md border border-slate-200 bg-white mb-4">
            <div
                className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200 cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="text-sm font-medium text-slate-700">{label}</div>
                <button
                    type="button"
                    className="text-slate-500 hover:text-slate-700"
                    aria-label={isExpanded ? "Collapse" : "Expand"}
                >
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
            </div>

            {isExpanded && (
                <div className="p-4">
                    <Textarea
                        value={value}
                        onChange={(e) => handleChange(e.target.value)}
                        className={`min-h-[120px] resize-y text-sm ${readOnly ? 'bg-slate-50 cursor-not-allowed' : ''
                            }`}
                        disabled={readOnly}
                        readOnly={readOnly}
                    />
                </div>
            )}
        </div>
    );
};

export default AuthorizationParagraph;