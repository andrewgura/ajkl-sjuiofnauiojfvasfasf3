"use client";

import { useState } from "react";
import { Search, Edit, Trash2, Loader2, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ActionButton from "../../../../components/shared/ActionButton";

interface SportingVenuesLookupListProps {
    onEdit: (item: any) => void;
    onDelete: (id: number) => void;
    sportingVenues?: any[]
}

type SortField = 'id' | 'venue' | 'city' | 'state' | 'sport' | 'team' | 'isActive';
type SortOrder = 'asc' | 'desc';

export default function SportingVenuesLookupList({ onEdit, onDelete, sportingVenues = [] }: SportingVenuesLookupListProps) {
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

    // Filter venues based on search term and active status
    const filteredVenues = sportingVenues.filter(venue =>
        (showOnlyActive ? venue.isActive : true) &&
        (venue.venue.toLowerCase().includes(search.toLowerCase()) ||
            venue.city.toLowerCase().includes(search.toLowerCase()) ||
            venue.state.toLowerCase().includes(search.toLowerCase()) ||
            venue.sport.toLowerCase().includes(search.toLowerCase()) ||
            venue.team.toLowerCase().includes(search.toLowerCase()))
    );

    // Sort filtered venues based on current sort
    const sortedVenues = [...filteredVenues].sort((a, b) => {
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
                        placeholder="Search sporting venues..."
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
                            onClick={() => handleSort('venue')}
                        >
                            <div className="flex items-center">
                                Venue
                                {getSortIcon('venue')}
                            </div>
                        </TableHead>
                        <TableHead
                            className="cursor-pointer"
                            onClick={() => handleSort('city')}
                        >
                            <div className="flex items-center">
                                City
                                {getSortIcon('city')}
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
                            onClick={() => handleSort('sport')}
                        >
                            <div className="flex items-center">
                                Sport
                                {getSortIcon('sport')}
                            </div>
                        </TableHead>
                        <TableHead
                            className="cursor-pointer"
                            onClick={() => handleSort('team')}
                        >
                            <div className="flex items-center">
                                Team
                                {getSortIcon('team')}
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
                            <TableCell colSpan={8} className="text-center py-10">
                                <div className="flex flex-col items-center justify-center text-gray-500">
                                    <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-2" />
                                    <p>Loading sporting venues...</p>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : sortedVenues.length > 0 ? (
                        sortedVenues.map((venue) => (
                            <TableRow key={venue.id}>
                                <TableCell className="font-medium">{venue.id}</TableCell>
                                <TableCell>{venue.venue}</TableCell>
                                <TableCell>{venue.city}</TableCell>
                                <TableCell>{venue.state}</TableCell>
                                <TableCell>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${venue.sport === 'NBA' ? 'bg-orange-100 text-orange-800' :
                                        venue.sport === 'NFL' ? 'bg-emerald-100 text-emerald-800' :
                                            venue.sport === 'MLB' ? 'bg-blue-100 text-blue-800' :
                                                'bg-purple-100 text-purple-800'
                                        }`}>
                                        {venue.sport}
                                    </span>
                                </TableCell>
                                <TableCell>{venue.team}</TableCell>
                                <TableCell>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${venue.isActive
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-gray-100 text-gray-800'
                                        }`}>
                                        <span className={`mr-1.5 h-2 w-2 rounded-full ${venue.isActive ? 'bg-green-400' : 'bg-gray-400'
                                            }`}></span>
                                        {venue.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <ActionButton
                                            icon={Edit}
                                            onClick={() => onEdit(venue)}
                                        />
                                        <ActionButton
                                            icon={Trash2}
                                            onClick={() => onDelete(venue.id)}
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={8} className="text-center py-10">
                                <div className="flex flex-col items-center justify-center text-gray-500">
                                    <p>No sporting venues found</p>
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