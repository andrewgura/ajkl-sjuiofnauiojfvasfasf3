"use client"

import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, CircleSlash } from "lucide-react";

type LetterType = "approval" | "denial";

interface LetterTypeSelectorProps {
    selectedType: LetterType;
    onSelect: (type: LetterType) => void;
    label?: string;
}

const LetterTypeSelector: React.FC<LetterTypeSelectorProps> = ({
    selectedType,
    onSelect,
    label = "Waiver Letter Type:"
}) => {
    return (
        <div className="flex items-center gap-4">
            <label className="text-xs font-medium text-slate-700 whitespace-nowrap">{label}</label>
            <div className="flex flex-1 gap-1">
                <Button
                    type="button"
                    onClick={() => onSelect("approval")}
                    className={`flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-md border ${selectedType === "approval"
                        ? "bg-green-50 border-green-200 text-green-700"
                        : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                        }`}
                    variant="ghost"
                >
                    <CheckCircle2
                        size={14}
                        className={selectedType === "approval" ? "text-green-500" : "text-slate-400"}
                    />
                    <span className="font-medium text-xs">Approval</span>
                </Button>

                <Button
                    type="button"
                    onClick={() => onSelect("denial")}
                    className={`flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-md border ${selectedType === "denial"
                        ? "bg-red-50 border-red-200 text-red-700"
                        : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                        }`}
                    variant="ghost"
                >
                    <CircleSlash
                        size={14}
                        className={selectedType === "denial" ? "text-red-500" : "text-slate-400"}
                    />
                    <span className="font-medium text-xs">Denial</span>
                </Button>
            </div>
        </div>
    );
};

export default LetterTypeSelector;