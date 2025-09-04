"use client"

import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Save, XCircle, Edit3 } from 'lucide-react';
import type { ParagraphEditState } from '@/lib/actions/waiver-paragraphs/waiver-types';

interface ParagraphFormProps {
    editingParagraph: ParagraphEditState;
    onParagraphChange: (field: string, value: string) => void;
    onSaveChanges: () => void;
    onResetChanges: () => void;
}

const ParagraphForm: React.FC<ParagraphFormProps> = ({
    editingParagraph,
    onParagraphChange,
    onSaveChanges,
    onResetChanges
}) => {
    return (
        <Card className="shadow-md border border-slate-200 overflow-hidden bg-slate-50 h-full flex flex-col">
            {/* Header */}
            <div className="p-2 bg-blue-600 rounded-t-lg border-b border-blue-700 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center">
                    <Edit3 className="w-4 h-4 text-white mr-2" />
                    <h2 className="text-sm font-medium text-white">Edit Paragraph</h2>
                </div>

                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="text-xs px-2 h-6 bg-white/10 border-white/20 text-white hover:bg-white/20"
                        onClick={onResetChanges}
                    >
                        <XCircle className="w-3 h-3 mr-1" />
                        <span>Reset</span>
                    </Button>
                    <Button
                        size="sm"
                        className="bg-white text-blue-600 hover:bg-white/90 text-xs px-2 h-6"
                        onClick={onSaveChanges}
                    >
                        <Save className="w-3 h-3 mr-1" />
                        <span>Save</span>
                    </Button>
                </div>
            </div>

            {/* Content */}
            <div className="p-3 flex-1 overflow-hidden">
                <div className="h-full bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    {/* Top Row: Read-only Info + Editable Tags */}
                    <div className="border-b border-slate-200 p-3 flex-shrink-0">
                        <div className="grid grid-cols-12 gap-3 items-end">
                            {/* Read-only Info */}
                            <div className="col-span-6 grid grid-cols-3 gap-2">
                                <div>
                                    <Label className="text-xs font-medium mb-1 block text-slate-700">ID:</Label>
                                    <div className="h-7 px-2 py-1 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-700 flex items-center">
                                        {editingParagraph.id}
                                    </div>
                                </div>
                                <div>
                                    <Label className="text-xs font-medium mb-1 block text-slate-700">Type:</Label>
                                    <div className="h-7 px-2 py-1 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-700 flex items-center">
                                        {editingParagraph.type || 'Not specified'}
                                    </div>
                                </div>
                                <div>
                                    <Label className="text-xs font-medium mb-1 block text-slate-700">Subtype:</Label>
                                    <div className="h-7 px-2 py-1 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-700 flex items-center">
                                        {editingParagraph.subtype || 'Not specified'}
                                    </div>
                                </div>
                            </div>

                            {/* Editable Tags */}
                            <div className="col-span-6 grid grid-cols-2 gap-3">
                                <div>
                                    <Label htmlFor="startTag" className="text-xs font-medium mb-1 block text-slate-700">
                                        Start Tag:
                                    </Label>
                                    <Input
                                        id="startTag"
                                        value={editingParagraph.startTag}
                                        onChange={(e) => onParagraphChange('startTag', e.target.value)}
                                        className="h-7 text-sm border-slate-200 focus:border-blue-300 focus:ring-blue-300"
                                        placeholder="HTML/XML start tag..."
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="endTag" className="text-xs font-medium mb-1 block text-slate-700">
                                        End Tag:
                                    </Label>
                                    <Input
                                        id="endTag"
                                        value={editingParagraph.endTag}
                                        onChange={(e) => onParagraphChange('endTag', e.target.value)}
                                        className="h-7 text-sm border-slate-200 focus:border-blue-300 focus:ring-blue-300"
                                        placeholder="HTML/XML end tag..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Additional Read-only Info Row */}
                        <div className="grid grid-cols-4 gap-2 mt-2">
                            <div>
                                <Label className="text-xs font-medium mb-1 block text-slate-700">Distance:</Label>
                                <div className="h-6 px-2 py-1 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-700 flex items-center">
                                    {editingParagraph.distance === '---' ? 'Not specified' : editingParagraph.distance}
                                </div>
                            </div>
                            <div>
                                <Label className="text-xs font-medium mb-1 block text-slate-700">Notice:</Label>
                                <div className="h-6 px-2 py-1 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-700 flex items-center">
                                    {editingParagraph.notice === '---' ? 'Not specified' : editingParagraph.notice}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom: Paragraph Text */}
                    <div className="flex-1 p-3 flex flex-col overflow-hidden">
                        <Label htmlFor="paragraphText" className="text-sm font-medium mb-1 block text-slate-700">
                            Paragraph Text:
                        </Label>
                        <div className="border border-slate-200 rounded-md bg-white hover:border-slate-300 focus-within:border-blue-300 focus-within:ring-1 focus-within:ring-blue-300 transition-colors flex-1 overflow-hidden">
                            <textarea
                                id="paragraphText"
                                value={editingParagraph.text}
                                onChange={(e) => onParagraphChange('text', e.target.value)}
                                className="w-full h-full p-3 text-sm focus:outline-none rounded-md resize-none bg-transparent leading-relaxed"
                                placeholder="Enter paragraph text here..."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default ParagraphForm;