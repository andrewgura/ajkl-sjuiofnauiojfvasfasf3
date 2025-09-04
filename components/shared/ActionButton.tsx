import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface ActionButtonProps {
    icon?: LucideIcon;
    onClick: () => void;
    text?: string;
    title?: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    className?: string;
    children?: ReactNode;
    disabled?: boolean;
}

export default function ActionButton({
    icon: Icon,
    text,
    title,
    onClick,
    variant = "ghost",
    className = "",
    children,
    disabled = false
}: ActionButtonProps) {
    const buttonContent = (
        <Button
            variant={variant}
            size="sm"
            onClick={onClick}
            className={`rounded-sm ${className}`}
            disabled={disabled}
        >
            {/* If children are provided, render them instead of icon/text */}
            {children ? (
                children
            ) : (
                <>
                    {Icon && <Icon size={16} />}
                    {text && <span className={Icon ? "ml-1" : ""}>{text}</span>}
                </>
            )}
        </Button>
    );

    // If a title is provided, wrap the button in a tooltip
    if (title) {
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        {buttonContent}
                    </TooltipTrigger>
                    <TooltipContent>
                        <p className="text-xs">{title}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    }

    return buttonContent;
}