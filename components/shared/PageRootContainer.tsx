import { ReactNode } from 'react';

interface PageRootContainerProps {
    /** Main title of the page */
    title?: string;
    /** Optional subtitle or description */
    subTitle?: string;
    /** Optional className for additional styling */
    className?: string;
    /** Optional children content */
    children?: ReactNode;
}

export default function PageRootContainer({
    title,
    subTitle,
    className = '',
    children
}: PageRootContainerProps) {
    return (
        <div className={`${className}`}>
            <div className="px-6 pt-4 pb-2">
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <h1 className="text-xl font-medium text-gray-900 mb-1">
                            {title}
                        </h1>
                        {subTitle && (
                            <p className="text-sm text-gray-600">
                                {subTitle}
                            </p>
                        )}
                    </div>
                </div>
            </div>
            {children && (
                <div className="px-6 pb-1">
                    {children}
                </div>
            )}
        </div>
    );
}