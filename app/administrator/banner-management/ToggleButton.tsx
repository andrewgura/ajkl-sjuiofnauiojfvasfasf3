import React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Power } from "lucide-react";
import { ToggleButtonProps } from "./types";

const ToggleButton: React.FC<ToggleButtonProps> = ({ label, description, isActive, onToggle }) => (
    <div className="flex items-center justify-between p-3 border rounded-lg bg-white hover:bg-slate-50 transition-colors">
        <div className="flex-1">
            <Label className="text-sm font-medium text-gray-700">{label}</Label>
            {description && (
                <p className="text-xs text-gray-500 mt-0.5">{description}</p>
            )}
        </div>
        <Button
            variant={isActive ? "default" : "outline"}
            className={`min-w-[100px] ${isActive
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "border-slate-200 text-slate-700"
                }`}
            onClick={onToggle}
        >
            <Power
                className={`h-4 w-4 mr-2 ${isActive ? "text-white" : "text-slate-500"}`}
            />
            {isActive ? "Enabled" : "Disabled"}
        </Button>
    </div>
);

export default ToggleButton;