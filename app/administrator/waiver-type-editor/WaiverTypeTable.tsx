// src/components/admin/WaiverTypeTable.tsx
"use client"

import { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { AdminWaiverItem } from './types';

interface WaiverTypeTableProps {
    waiverItems: AdminWaiverItem[];
    onMoveUp: (id: number) => void;
    onMoveDown: (id: number) => void;
    onToggleVisibility: (id: number) => void;
    onEdit: (item: AdminWaiverItem) => void;
}

export default function WaiverTypeTable({
    waiverItems,
    onMoveUp,
    onMoveDown,
    onToggleVisibility,
    onEdit
}: WaiverTypeTableProps) {
    const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});

    const toggleExpanded = (id: number) => {
        setExpandedItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const sortedItems = [...waiverItems].sort((a, b) => a.order - b.order);

    return (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className="bg-slate-50">
                        <TableHead className="w-12 text-center font-medium text-slate-500">#</TableHead>
                        <TableHead className="font-medium text-slate-500">Title</TableHead>
                        <TableHead className="hidden md:table-cell font-medium text-slate-500">Description</TableHead>
                        <TableHead className="w-20 text-center font-medium text-slate-500">Visible</TableHead>
                        <TableHead className="w-36 text-center font-medium text-slate-500">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sortedItems.map((item, index) => (
                        <TableRow
                            key={item.id}
                            className={`${!item.visible ? 'bg-slate-50 text-slate-400' : 'hover:bg-slate-50'}`}
                        >
                            <TableCell className="text-center text-slate-500">
                                {index + 1}
                            </TableCell>
                            <TableCell className="font-medium">
                                {item.title}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                <div
                                    className={`cursor-pointer`}
                                    onClick={() => toggleExpanded(item.id)}
                                >
                                    <div className={expandedItems[item.id] ? '' : 'line-clamp-2'}>
                                        {item.content}
                                    </div>
                                    {item.footerText && (
                                        <div className={`text-sm text-slate-400 mt-1 ${expandedItems[item.id] ? '' : 'line-clamp-1'}`}>
                                            {item.footerText}
                                        </div>
                                    )}
                                </div>
                            </TableCell>
                            <TableCell className="text-center">
                                <div className="flex justify-center">
                                    <button
                                        onClick={() => onToggleVisibility(item.id)}
                                        className={`p-1 rounded ${item.visible ? 'text-green-600 hover:bg-green-50' : 'text-red-600 hover:bg-red-50'}`}
                                    >
                                        {item.visible ? (
                                            <div className="w-6 h-6 flex items-center justify-center border border-green-500 rounded bg-green-50">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M20 6L9 17L4 12" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        ) : (
                                            <div className="w-6 h-6 flex items-center justify-center border border-red-500 rounded bg-red-50">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M18 6L6 18M6 6L18 18" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        )}
                                    </button>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex justify-center space-x-1">
                                    <button
                                        onClick={() => onMoveUp(item.id)}
                                        disabled={index === 0}
                                        className={`p-1 rounded ${index === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-500 hover:bg-slate-100'}`}
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => onMoveDown(item.id)}
                                        disabled={index === sortedItems.length - 1}
                                        className={`p-1 rounded ${index === sortedItems.length - 1 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-500 hover:bg-slate-100'}`}
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => onEdit(item)}
                                        className="p-1 rounded text-slate-500 hover:bg-slate-100"
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M18.5 2.49998C18.8978 2.10216 19.4374 1.87866 20 1.87866C20.5626 1.87866 21.1022 2.10216 21.5 2.49998C21.8978 2.89781 22.1213 3.43737 22.1213 3.99998C22.1213 4.56259 21.8978 5.10216 21.5 5.49998L12 15L8 16L9 12L18.5 2.49998Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}