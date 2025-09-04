"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import FilterSection from "./FilterSection";
import SearchFilter from "@/components/shared/filters/SearchFilter";


import {
    GeneralFilter,
    DasspFilter,
    DisneyFilter,
    DomesticFilter,
    FaaFilter,
    InternationalFilter,
    MooredBalloonFilter,
    ProhibitedAreaFilter,
    SpecialEventFilter,
    SportingFilter,
    UnmannedAircraftFilter,
    AircraftInfoFilter,
    AircraftUasFilter,
    ManifestFilter,
    ProponentFilter
} from "./filters";

interface FiltersSidebarProps {
    expandedSections: Record<string, boolean>;
    filterValues: Record<string, any>;
    toggleSection: (section: string) => void;
    handleInputChange: (field: string, value: any) => void;
}

const FILTER_SECTIONS = [
    { id: 'general', title: 'General', component: GeneralFilter },
    { id: 'dassp', title: 'DASSP Criteria', component: DasspFilter },
    { id: 'disney', title: 'Disney Criteria', component: DisneyFilter },
    { id: 'domestic', title: 'Domestic Criteria', component: DomesticFilter },
    { id: 'faa', title: 'FAA Criteria', component: FaaFilter },
    { id: 'international', title: 'International Criteria', component: InternationalFilter },
    { id: 'mooredBalloon', title: 'Moored Balloon Criteria', component: MooredBalloonFilter },
    { id: 'prohibitedArea', title: 'Prohibited Area Criteria', component: ProhibitedAreaFilter },
    { id: 'specialEvent', title: 'Special Event Criteria', component: SpecialEventFilter },
    { id: 'sporting', title: 'Sporting Criteria', component: SportingFilter },
    { id: 'unmannedAircraft', title: 'Unmanned Aircraft Criteria', component: UnmannedAircraftFilter },
    { id: 'aircraftInfo', title: 'Aircraft Information', component: AircraftInfoFilter },
    { id: 'aircraftUAS', title: 'Aircraft (UAS) Information', component: AircraftUasFilter },
    { id: 'manifest', title: 'Manifest Information', component: ManifestFilter },
    { id: 'proponent', title: 'Proponent Information', component: ProponentFilter }
];

const FiltersSidebar: React.FC<FiltersSidebarProps> = ({
    expandedSections,
    filterValues,
    toggleSection,
    handleInputChange,
}) => {
    return (
        <div className="w-64 space-y-3 max-h-[calc(100vh-9rem)] overflow-y-auto pr-1">
            {/* Keyword search */}
            <Card>
                <CardContent className="p-4">
                    <SearchFilter
                        value={filterValues.keyword}
                        onChange={(e) => handleInputChange("keyword", e.target.value)}
                        placeHolder="Search by keyword..."
                    />
                </CardContent>
            </Card>

            {/* Filter sections rendered dynamically */}
            {FILTER_SECTIONS.map(section => (
                <FilterSection
                    key={section.id}
                    title={section.title}
                    isExpanded={expandedSections[section.id]}
                    onToggle={() => toggleSection(section.id)}
                >
                    <section.component
                        filterValues={filterValues}
                        handleInputChange={handleInputChange}
                    />
                </FilterSection>
            ))}
        </div>
    );
};

export default FiltersSidebar;