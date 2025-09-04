"use client";

import { useState } from "react";
import { Search, Edit, Trash2, Loader2, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ActionButton from "../../../../components/shared/ActionButton";

interface USStatesLookupListProps {
    onEdit: (item: any) => void;
    onDelete: (id: number) => void;
    usStates?: any[]
}

type SortField = 'id' | 'state' | 'abbreviation' | 'isActive';
type SortOrder = 'asc' | 'desc';

export default function USStatesLookupList({ onEdit, onDelete, usStates = [] }: USStatesLookupListProps) {
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showOnlyActive, setShowOnlyActive] = useState(false);
    const [sortField, setSortField] = useState<SortField>('id');
    const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

    // Handle column sort
    const handleSort = (field: SortField) => {
        if (field === sortField) {
            // Toggle sort order if clicking the same field
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            // Set new field and default to descending
            setSortField(field);
            setSortOrder('desc');
        }
    };

    // Sort icon to display
    const getSortIcon = (field: SortField) => {
        if (field !== sortField) return <ArrowUpDown className="ml-2 h-4 w-4" />;
        return sortOrder === 'asc'
            ? <ArrowUp className="ml-2 h-4 w-4" />
            : <ArrowDown className="ml-2 h-4 w-4" />;
    };

    // Filter states based on search term and active status
    const filteredStates = usStates.filter(state =>
        (showOnlyActive ? state.isActive : true) &&
        (state.state.toLowerCase().includes(search.toLowerCase()) ||
            state.abbreviation.toLowerCase().includes(search.toLowerCase()))
    );

    // Sort filtered states based on current sort
    const sortedStates = [...filteredStates].sort((a, b) => {
        let comparison = 0;

        if (sortField === 'id') {
            comparison = a.id - b.id;
        } else if (sortField === 'isActive') {
            comparison = Number(a.isActive) - Number(b.isActive);
        } else {
            const aVal = a[sortField].toLowerCase();
            const bVal = b[sortField].toLowerCase();
            comparison = aVal.localeCompare(bVal);
        }

        return sortOrder === 'asc' ? comparison : -comparison;
    });

    const toggleActiveFilter = () => {
        setShowOnlyActive(!showOnlyActive);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between mb-4">
                <div className="relative w-64">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search states..."
                        className="pl-10"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                    />
                </div>

                <Button
                    variant="outline"
                    onClick={toggleActiveFilter}
                    className="text-sm"
                >
                    {showOnlyActive ? "Show All" : "Show Active Only"}
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead
                            className="cursor-pointer"
                            onClick={() => handleSort('id')}
                        >
                            <div className="flex items-center">
                                ID
                                {getSortIcon('id')}
                            </div>
                        </TableHead>
                        <TableHead
                            className="cursor-pointer"
                            onClick={() => handleSort('state')}
                        >
                            <div className="flex items-center">
                                State
                                {getSortIcon('state')}
                            </div>
                        </TableHead>
                        <TableHead
                            className="cursor-pointer"
                            onClick={() => handleSort('abbreviation')}
                        >
                            <div className="flex items-center">
                                Abbreviation
                                {getSortIcon('abbreviation')}
                            </div>
                        </TableHead>
                        <TableHead
                            className="cursor-pointer"
                            onClick={() => handleSort('isActive')}
                        >
                            <div className="flex items-center">
                                Status
                                {getSortIcon('isActive')}
                            </div>
                        </TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-10">
                                <div className="flex flex-col items-center justify-center text-gray-500">
                                    <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-2" />
                                    <p>Loading states...</p>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : sortedStates.length > 0 ? (
                        sortedStates.map((state) => (
                            <TableRow key={state.id}>
                                <TableCell className="font-medium">{state.id}</TableCell>
                                <TableCell>{state.state}</TableCell>
                                <TableCell>{state.abbreviation}</TableCell>
                                <TableCell>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${state.isActive
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-gray-100 text-gray-800'
                                        }`}>
                                        <span className={`mr-1.5 h-2 w-2 rounded-full ${state.isActive ? 'bg-green-400' : 'bg-gray-400'
                                            }`}></span>
                                        {state.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <ActionButton
                                            icon={Edit}
                                            onClick={() => onEdit(state)}
                                        />
                                        <ActionButton
                                            icon={Trash2}
                                            onClick={() => onDelete(state.id)}
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-10">
                                <div className="flex flex-col items-center justify-center text-gray-500">
                                    <p>No states found</p>
                                    {search && (
                                        <p className="text-sm mt-1">
                                            Try adjusting your search criteria
                                        </p>
                                    )}
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}