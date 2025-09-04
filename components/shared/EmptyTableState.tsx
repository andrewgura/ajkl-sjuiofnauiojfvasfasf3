import { Info } from "lucide-react";

interface EmptyStateProps {
    title?: string;
    message?: string;
    containerClassName?: string;
    iconContainerClassName?: string;
    iconClassName?: string;
    titleClassName?: string;
    messageClassName?: string;
}

export default function EmptyTableState({
    title = "No data found",
    message = "No records match your current filter criteria. Try adjusting your filters or search terms.",
    containerClassName = "py-12 text-center",
    iconContainerClassName = "inline-flex justify-center items-center w-16 h-16 rounded-full bg-blue-50 mb-4",
    iconClassName = "w-8 h-8 text-blue-500",
    titleClassName = "text-lg font-medium text-slate-900 mb-2",
    messageClassName = "text-sm text-slate-500 max-w-md mx-auto"
}: EmptyStateProps) {
    return (
        <div className={containerClassName}>
            <div className={iconContainerClassName}>
                <Info className={iconClassName} />
            </div>
            <h3 className={titleClassName}>{title}</h3>
            <p className={messageClassName}>
                {message}
            </p>
        </div>
    );
}