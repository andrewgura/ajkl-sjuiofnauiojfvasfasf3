"use client"

import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { FileText } from 'lucide-react';
import type {
    Paragraph,
    ParagraphSet
} from '@/lib/actions/waiver-paragraphs/waiver-types';

interface ParagraphListPanelProps {
    paragraphSet: ParagraphSet;
    selectedParagraph: Paragraph | null;
    onParagraphSelect: (paragraph: Paragraph) => void;
}

const ParagraphListPanel: React.FC<ParagraphListPanelProps> = ({
    paragraphSet,
    selectedParagraph,
    onParagraphSelect
}) => {
    return (
        <Card className="shadow-md border border-slate-200 h-full overflow-hidden">
            {/* Header */}
            <div className="p-2 bg-gradient-to-r from-slate-700 to-slate-800 border-b border-slate-600 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center">
                    <FileText className="w-4 h-4 text-slate-100 mr-2" />
                    <h2 className="text-sm font-medium text-slate-100">{paragraphSet.title}</h2>
                </div>
            </div>

            <div className="flex h-full">
                <div className="w-full bg-white flex flex-col">
                    <div className="p-1.5 border-b border-slate-200 bg-slate-50 flex-shrink-0">
                        <h3 className="text-xs font-medium text-slate-700">Select Paragraph</h3>
                    </div>

                    <div className="flex-1 overflow-y-auto p-2">
                        {paragraphSet.paragraphs.length > 0 && (
                            <div className="grid grid-cols-8 gap-1.5">
                                {paragraphSet.paragraphs.map((paragraph) => (
                                    <Badge
                                        key={paragraph.id}
                                        className={`cursor-pointer transition-all duration-200 text-xs h-8 w-full flex items-center justify-center font-medium ${selectedParagraph?.id === paragraph.id
                                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md'
                                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 hover:shadow-sm'
                                            }`}
                                        onClick={() => onParagraphSelect(paragraph)}
                                    >
                                        <div className="text-center">
                                            <div className="font-semibold">#{paragraph.number}</div>
                                        </div>
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default ParagraphListPanel;