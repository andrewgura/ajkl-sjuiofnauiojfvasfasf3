"use client"

import React from 'react';
import { Card } from "@/components/ui/card";
import { ChevronDown, FilterIcon, Circle } from 'lucide-react';
import type {
    FilterCategory
} from '@/lib/actions/waiver-paragraphs/waiver-types';

interface FilterSidebarProps {
    filterCategories: FilterCategory[];
    expandedCategories: string[];
    activeCategoryFilters: string[];
    activeSubcategoryFilter: string | null;
    onCategoryToggle: (categoryId: string) => void;
    onFilterToggle: (categoryId: string, isSubcategory?: boolean, parentId?: string | null) => void;
    onSubcategorySelect: (subcategoryId: string, parentId: string) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
    filterCategories,
    expandedCategories,
    activeCategoryFilters,
    activeSubcategoryFilter,
    onCategoryToggle,
    onFilterToggle,
    onSubcategorySelect
}) => {
    return (
        <Card className="shadow-md border border-slate-200 h-full overflow-hidden bg-gradient-to-b from-slate-50 to-white flex flex-col">
            {/* Header */}
            <div className="p-2 bg-gradient-to-r from-slate-700 to-slate-800 border-b border-slate-600 flex items-center flex-shrink-0">
                <FilterIcon className="w-4 h-4 text-slate-100 mr-2" />
                <h2 className="text-sm font-medium text-slate-100">Filter Categories</h2>
            </div>

            {/* Filter Categories List */}
            <div className="flex-1 min-h-0 overflow-y-auto p-2 space-y-1.5">
                {filterCategories.map((category) => {
                    const isExpanded = expandedCategories.includes(category.id);
                    const isActive = activeCategoryFilters.includes(category.id);

                    return (
                        <div key={category.id} className="rounded-lg overflow-hidden border border-slate-200 bg-white shadow-sm">
                            <div
                                className={`flex items-center justify-between px-2.5 py-1.5 cursor-pointer 
                                  transition-all duration-200 ease-in-out
                                  ${isActive
                                        ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md'
                                        : 'bg-white text-slate-700 hover:bg-slate-50'
                                    }
                                `}
                                onClick={() => {
                                    onCategoryToggle(category.id);
                                    onFilterToggle(category.id);
                                }}
                            >
                                <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-slate-700'}`}>
                                    {category.label}
                                </span>
                                {category.items.length > 0 && (
                                    <ChevronDown
                                        className={`h-4 w-4 transition-all duration-200 ${isExpanded ? 'rotate-180' : 'rotate-0'
                                            } ${isActive ? 'text-white' : 'text-slate-400'
                                            }`}
                                    />
                                )}
                            </div>

                            {isExpanded && category.items.length > 0 && (
                                <div className="bg-slate-50 border-t border-slate-200 p-1.5 space-y-0.5 max-h-32 overflow-y-auto">
                                    {category.items.map((item) => {
                                        const isSubcategoryActive = activeSubcategoryFilter === item.id;

                                        return (
                                            <div
                                                key={item.id}
                                                className={`flex items-center px-2 py-1 rounded-md cursor-pointer
                                                  text-xs transition-all duration-200 ease-in-out
                                                  ${isSubcategoryActive ?
                                                        'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm' :
                                                        'text-slate-600 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200'
                                                    }`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onSubcategorySelect(item.id, category.id);
                                                }}
                                            >
                                                <Circle
                                                    className={`w-1.5 h-1.5 mr-2 ${isSubcategoryActive ? 'text-white fill-white' : 'text-slate-300 fill-slate-300'
                                                        }`}
                                                />
                                                <span className="flex-1">{item.label}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </Card>
    );
};

export default FilterSidebar;