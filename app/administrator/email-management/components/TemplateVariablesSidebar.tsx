'use client';

import { Info } from "lucide-react";

interface TemplateVariable {
    id: string;
    name: string;
    description: string;
    category: string;
}

interface TemplateVariablesSidebarProps {
    isVisible?: boolean;
}

export const TemplateVariablesSidebar: React.FC<TemplateVariablesSidebarProps> = ({
    isVisible = true
}) => {
    if (!isVisible) {
        return null;
    }

    const templateVariables: TemplateVariable[] = [
        { id: '1', name: '{userName}', description: "User's full name ex: Jane Doe", category: 'User Information' },
        { id: '2', name: '{waiverType}', description: "Type of waiver ex: DASSP", category: 'Waiver Information' },
        { id: '3', name: '{expiryDate}', description: "Waiver expiration date ex: January 1st 2025", category: 'Waiver Information' },
        { id: '4', name: '{waiverNumber}', description: "Waiver reference number ex: W2025001", category: 'Waiver Information' },
        { id: '5', name: '{applicationDate}', description: "Date waiver was submitted ex: December 1st 2024", category: 'Waiver Information' },
        { id: '6', name: '{analystName}', description: "Name of assigned analyst ex: John Smith", category: 'System Information' },
        { id: '7', name: '{systemDate}', description: "Current system date ex: Today's date", category: 'System Information' }
    ];

    // Group variables by category
    const groupedVariables = templateVariables.reduce((acc, variable) => {
        const category = variable.category;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(variable);
        return acc;
    }, {} as Record<string, TemplateVariable[]>);

    // Color schemes for different categories
    const getCategoryColors = (category: string) => {
        switch (category) {
            case 'User Information':
                return {
                    gradient: 'from-blue-50 to-blue-50/50',
                    border: 'border-blue-200/50',
                    badge: 'bg-blue-100 text-blue-800 border-blue-200',
                    text: 'text-blue-700',
                    hover: 'hover:from-blue-100 hover:to-blue-50'
                };
            case 'Waiver Information':
                return {
                    gradient: 'from-purple-50 to-purple-50/50',
                    border: 'border-purple-200/50',
                    badge: 'bg-purple-100 text-purple-800 border-purple-200',
                    text: 'text-purple-700',
                    hover: 'hover:from-purple-100 hover:to-purple-50'
                };
            case 'System Information':
                return {
                    gradient: 'from-green-50 to-green-50/50',
                    border: 'border-green-200/50',
                    badge: 'bg-green-100 text-green-800 border-green-200',
                    text: 'text-green-700',
                    hover: 'hover:from-green-100 hover:to-green-50'
                };
            default:
                return {
                    gradient: 'from-slate-50 to-slate-50/50',
                    border: 'border-slate-200/50',
                    badge: 'bg-slate-100 text-slate-800 border-slate-200',
                    text: 'text-slate-700',
                    hover: 'hover:from-slate-100 hover:to-slate-50'
                };
        }
    };

    return (
        <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-md bg-blue-100">
                    <Info className="h-3 w-3 text-blue-600" />
                </div>
                <h3 className="text-xs font-semibold text-slate-900">
                    Template Variables
                </h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Use{" "}
                <code className="px-1.5 py-0.5 rounded-md bg-slate-100 text-xs font-mono border">
                    {"{variable}"}
                </code>{" "}
                syntax to include dynamic content in your email templates.
            </p>

            <div className="pt-3 border-t border-slate-100">
                <p className="text-xs font-semibold text-slate-700 mb-3">
                    Available variables:
                </p>

                <div className="space-y-3">
                    {Object.entries(groupedVariables).map(([category, categoryVariables]) => (
                        <div key={category}>
                            {Object.keys(groupedVariables).length > 1 && (
                                <p className="text-xs font-medium text-slate-600 mb-2">{category}</p>
                            )}
                            <div className="space-y-2">
                                {categoryVariables.map((variable) => {
                                    const colors = getCategoryColors(category);

                                    return (
                                        <div
                                            key={variable.id}
                                            className={`group p-2 rounded-md bg-gradient-to-r ${colors.gradient} border ${colors.border} ${colors.hover} transition-all duration-200`}
                                        >
                                            <div className="flex items-center gap-1.5 mb-0.5">
                                                <span className={`px-1.5 py-0.5 ${colors.badge} text-xs font-mono rounded-sm border`}>
                                                    {variable.name}
                                                </span>
                                            </div>
                                            <p className={`text-xs ${colors.text} pl-0.5`}>
                                                {variable.description}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TemplateVariablesSidebar;