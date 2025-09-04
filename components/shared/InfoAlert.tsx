import React from "react";
import { Info } from "lucide-react";

interface InfoAlertProps {
    title: React.ReactNode | string;
    description?: string | React.ReactNode;
    icon?: React.ReactNode;
    variant?: "blue" | "amber";
}

const InfoAlert = ({
    title,
    description,
    icon,
    variant = "blue",
}: InfoAlertProps) => {
    const variantStyles = {
        blue: {
            bg: "bg-blue-500/10",
            border: "border-blue-400/20",
            iconColor: "text-white",
            titleColor: "text-white",
            textColor: "text-white",
        },
        amber: {
            bg: "bg-amber-50",
            border: "border-amber-200",
            iconColor: "text-amber-600",
            titleColor: "text-amber-800",
            textColor: "text-amber-700",
        },
    };

    const styles = variantStyles[variant];

    return (
        <div className={`${styles.bg} rounded-xl border ${styles.border} p-5 shadow-sm`}>
            <div className="flex gap-3">
                {icon ? (
                    <div className={`${styles.iconColor} flex-shrink-0 mt-0.5`}>{icon}</div>
                ) : (
                    <Info className={`w-5 h-5 ${styles.iconColor} flex-shrink-0 mt-0.5`} />
                )}
                <div className="space-y-2">
                    <p className={`text-sm font-semibold ${styles.titleColor}`}>{title}</p>
                    <p className={`text-xs leading-relaxed ${styles.textColor} text-white`}>
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default InfoAlert;