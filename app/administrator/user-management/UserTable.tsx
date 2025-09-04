"use client";

import { useState, useCallback } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/date-utils";
import EmptyTableState from "@/components/shared/EmptyTableState";
import EditUserModal from "./modals/EditUserModal";
import { User } from "@/types/user";

interface UserTableProps {
    data: User[];
    currentPage: number;
    itemsPerPage: number;
    onUserUpdated?: () => void;
    isLoading?: boolean;
}

export default function UserTable({
    data,
    currentPage,
    itemsPerPage,
    onUserUpdated,
    isLoading = false
}: UserTableProps) {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [editModalOpen, setEditModalOpen] = useState(false);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = data.slice(startIndex, endIndex);

    const handleEditUser = useCallback((user: User) => {
        setSelectedUser(user);
        setEditModalOpen(true);
    }, []);

    const handleEditModalClose = useCallback((open: boolean) => {
        setEditModalOpen(open);
        if (!open) {
            setSelectedUser(null);
        }
    }, []);

    const handleUserUpdated = useCallback(() => {
        onUserUpdated?.();
    }, [onUserUpdated]);

    const getStatusBadgeVariant = (user: User) => {
        if (user.accountLocked) return "destructive";
        if (!user.accountActive) return "secondary";
        return "default";
    };

    const getStatusText = (user: User) => {
        if (user.accountLocked) return "Locked";
        if (!user.accountActive) return "Inactive";
        return "Active";
    };

    // Empty state
    if (data.length === 0 && !isLoading) {
        return (
            <EmptyTableState
                title="No users found"
                message="No users match your current filter criteria. Try adjusting your filters or search terms."
            />
        );
    }

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow className="bg-slate-50/80">
                        <TableHead className="py-2 px-3 font-medium text-xs text-slate-700 w-32">
                            Name
                        </TableHead>
                        <TableHead className="py-2 px-3 font-medium text-xs text-slate-700">
                            Email
                        </TableHead>
                        <TableHead className="py-2 px-3 font-medium text-xs text-slate-700">
                            Phone
                        </TableHead>
                        <TableHead className="py-2 px-3 font-medium text-xs text-slate-700">
                            Roles
                        </TableHead>
                        <TableHead className="py-2 px-3 font-medium text-xs text-slate-700">
                            Status
                        </TableHead>
                        <TableHead className="py-2 px-3 font-medium text-xs text-slate-700 w-24">
                            Last Sign In
                        </TableHead>
                        <TableHead className="py-2 px-3 font-medium text-xs text-slate-700" />
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {(
                        currentData.map((user) => (
                            <TableRow
                                key={user.id}
                                className="transition-colors border-b hover:bg-slate-50/70"
                            >
                                <TableCell className="py-2 px-3">
                                    <div className="flex flex-col">
                                        <span className="text-xs font-medium text-slate-700">
                                            {`${user.firstName} ${user.lastName}`}
                                        </span>
                                        {user.middleName && (
                                            <span className="text-xs text-slate-500">
                                                {user.middleName}
                                            </span>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="py-2 px-3">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-slate-600">
                                            {user.primaryEmail}
                                        </span>
                                        {user.secondaryEmail && (
                                            <span className="text-xs text-slate-500">
                                                {user.secondaryEmail}
                                            </span>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="py-2 px-3">
                                    <div className="flex flex-col">
                                        {user.mobilePhone && (
                                            <span className="text-xs text-slate-600">
                                                Mobile: {user.mobilePhone}
                                            </span>
                                        )}
                                        {user.workPhone && (
                                            <span className="text-xs text-slate-500">
                                                Work: {user.workPhone}
                                            </span>
                                        )}
                                        {!user.mobilePhone && !user.workPhone && (
                                            <span className="text-xs text-slate-400">—</span>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="py-2 px-3">
                                    <div className="flex flex-wrap gap-1">
                                        {user.roles?.map((role) => (
                                            <Badge
                                                key={role}
                                                variant="outline"
                                                className="text-xs px-2 py-0 h-5"
                                            >
                                                {role}
                                            </Badge>
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell className="py-2 px-3">
                                    <Badge
                                        variant={getStatusBadgeVariant(user)}
                                        className="text-xs px-2 py-0 h-5"
                                    >
                                        {getStatusText(user)}
                                    </Badge>
                                </TableCell>
                                <TableCell className="py-2 px-3">
                                    <span className="text-xs text-slate-600">
                                        {user.lastLogin ? formatDate(user.lastLogin) : 'Never'}
                                    </span>
                                </TableCell>
                                <TableCell className="py-2 px-3">
                                    <button
                                        onClick={() => handleEditUser(user)}
                                        className="text-xs text-blue-600 hover:text-blue-700 font-normal hover:underline"
                                        disabled={isLoading}
                                    >
                                        Edit
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            {selectedUser && (
                <EditUserModal
                    open={editModalOpen}
                    onOpenChange={handleEditModalClose}
                    user={selectedUser}
                    onUserUpdated={handleUserUpdated}
                />
            )}
        </div>
    );
}