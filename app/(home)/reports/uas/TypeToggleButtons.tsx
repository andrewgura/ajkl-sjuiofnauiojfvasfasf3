"use client"

import { CheckCircle2, XCircle } from "lucide-react";
import ActionButton from "@/components/shared/ActionButton";
import { TypeToggleButtonsProps, WAIVER_TYPES } from "./types";

export default function TypeToggleButtons({
    selectedTypes,
    onToggleType,
}: TypeToggleButtonsProps) {
    return (
        <div className="space-y-2">
            <label className="text-xs font-medium text-gray-700">Waiver Types</label>
            <div className="space-y-1">
                {WAIVER_TYPES.map((type) => (
                    <ActionButton
                        key={type}
                        variant="outline"
                        onClick={() => onToggleType(type)}
                        text={type}
                        icon={selectedTypes.includes(type) ? CheckCircle2 : XCircle}
                        className={`w-full flex items-center justify-between text-xs h-8 ${selectedTypes.includes(type)
                            ? "text-green-700 bg-green-50 hover:bg-green-100/80"
                            : "text-red-700 bg-red-50 hover:bg-red-100/80"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}