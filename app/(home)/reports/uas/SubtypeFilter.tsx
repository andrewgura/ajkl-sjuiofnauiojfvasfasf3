"use client"

import { useRef, useEffect } from "react";
import { CheckCircle2, ChevronDown } from "lucide-react";
import ActionButton from "@/components/shared/ActionButton";
import { SubtypeFilterProps, WAIVER_SUBTYPES, WaiverSubtype } from "./types";

export default function SubtypeFilter({
    selectedSubtype,
    onSubtypeChange,
    dropdownOpen,
    setDropdownOpen,
}: SubtypeFilterProps) {
    const dropdownRef = useRef<HTMLDivElement>(null);

    const getSubtypeStyles = (subtype: WaiverSubtype): string => {
        switch (subtype) {
            case "UAS":
                return "bg-blue-50 text-blue-700";
            case "UFR":
                return "bg-green-50 text-green-700";
            case "UAS7":
                return "bg-purple-50 text-purple-700";
            case "UAS-SPT":
                return "bg-yellow-50 text-yellow-700";
            case "UAS-SVY":
                return "bg-rose-50 text-rose-700";
            case "UAS-SVY7":
                return "bg-orange-50 text-orange-700";
            default:
                return "bg-gray-50 text-gray-700";
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        if (dropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownOpen, setDropdownOpen]);

    return (
        <div className="relative" ref={dropdownRef}>
            <ActionButton
                onClick={() => setDropdownOpen(!dropdownOpen)}
                text={selectedSubtype || "Filter by subtype..."}
                icon={ChevronDown}
                variant="outline"
                className={`w-full flex items-center justify-between px-3 py-2 text-xs border border-gray-200 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${dropdownOpen ? '[&_svg]:rotate-180' : ''}`}
            />

            {dropdownOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                    <div className="py-1">
                        <ActionButton
                            onClick={() => {
                                onSubtypeChange(null);
                                setDropdownOpen(false);
                            }}
                            text="Clear filter"
                            variant="ghost"
                            className="w-full px-3 py-2 text-xs text-left hover:bg-gray-50 flex items-center text-gray-600 justify-start"
                        />
                        {WAIVER_SUBTYPES.map((subtype) => (
                            <ActionButton
                                key={subtype}
                                onClick={() => {
                                    onSubtypeChange(subtype === selectedSubtype ? null : subtype);
                                    setDropdownOpen(false);
                                }}
                                variant="ghost"
                                className="w-full px-3 py-2 text-xs text-left hover:bg-gray-50 flex items-center gap-2 justify-start"
                            >
                                <span
                                    className={`px-2 py-0.5 rounded-full ${getSubtypeStyles(subtype)}`}
                                >
                                    {subtype}
                                </span>
                                {selectedSubtype === subtype && (
                                    <CheckCircle2 className="h-3 w-3 text-green-600 ml-auto" />
                                )}
                            </ActionButton>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}