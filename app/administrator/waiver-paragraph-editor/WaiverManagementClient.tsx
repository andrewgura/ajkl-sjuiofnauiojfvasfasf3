"use client"

import React from 'react';
import { WaiverParagraphEditor } from './components/WaiverParagraphEditor';
import { FilterCategory } from '@/lib/actions/waiver-paragraphs/waiver-types';


interface OptimizedWaiverData {
    filterCategories: FilterCategory[];
    isLoading?: boolean;
}

interface WaiverManagementClientProps {
    allWaiverData: OptimizedWaiverData;
}

export const WaiverManagementClient = ({
    allWaiverData
}: WaiverManagementClientProps) => {

    return (
        <div className="bg-slate-50">
            <div className="px-4 py-3">
                <WaiverParagraphEditor
                    allWaiverData={allWaiverData}
                />
            </div>
        </div>
    );
};

export default WaiverManagementClient;