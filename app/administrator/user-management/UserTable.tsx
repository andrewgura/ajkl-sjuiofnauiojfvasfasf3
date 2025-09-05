import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import EmptyTableState from "@/components/shared/EmptyTableState";
import EditUserModal from "./modals/EditUserModal";
import { User } from "@/types/user";

interface UserTableProps {
    data: User[];
    currentPage: number;
    itemsPerPage: number;
    onUserUpdated: () => void;
}

export default function UserTable({ data, currentPage, itemsPerPage, onUserUpdated }: UserTableProps) {
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = data.slice(startIndex, endIndex);

    const formatDate = (dateString: string | null): string => {
        if (!dateString) return '—';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getStatusBadgeVariant = (user: User): "default" | "secondary" | "destructive" | "outline" => {
        if (user.accountLocked) return "destructive";
        if (!user.accountActive) return "secondary";
        return "default";
    };

    const getStatusText = (user: User): string => {
        if (user.accountLocked) return "Locked";
        if (!user.accountActive) return "Inactive";
        return "Active";
    };

    const handleEditUser = (user: User) => {
        setSelectedUser(user);
        setEditModalOpen(true);
    };

    const handleEditModalClose = () => {
        setEditModalOpen(false);
        setSelectedUser(null);
    };

    const handleUserUpdated = () => {
        onUserUpdated();
        handleEditModalClose();
    };

    if (data.length === 0) {
        return (
            <EmptyTableState
                title="No users found"
                message="Try adjusting your filters or search terms."
            />
        );
    }

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow className="bg-slate-700/50 border-b border-slate-600">
                        <TableHead className="py-2 px-3 font-medium text-xs text-slate-200 w-32">
                            Name
                        </TableHead>
                        <TableHead className="py-2 px-3 font-medium text-xs text-slate-200">
                            Email
                        </TableHead>
                        <TableHead className="py-2 px-3 font-medium text-xs text-slate-200">
                            User ID
                        </TableHead>
                        <TableHead className="py-2 px-3 font-medium text-xs text-slate-200">
                            Roles
                        </TableHead>
                        <TableHead className="py-2 px-3 font-medium text-xs text-slate-200">
                            Status
                        </TableHead>
                        <TableHead className="py-2 px-3 font-medium text-xs text-slate-200 w-24">
                            Last Sign In
                        </TableHead>
                        <TableHead className="py-2 px-3 font-medium text-xs text-slate-200" />
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {(
                        currentData.map((user) => (
                            <TableRow
                                key={user.id}
                                className="transition-colors border-b border-slate-600 hover:bg-slate-700/30"
                            >
                                <TableCell className="py-2 px-3">
                                    <div className="flex flex-col">
                                        <span className="text-xs font-medium text-slate-200">
                                            {`${user.firstName} ${user.lastName}`}
                                        </span>
                                        {user.middleName && (
                                            <span className="text-xs text-slate-400">
                                                {user.middleName}
                                            </span>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="py-2 px-3">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-slate-300">
                                            {user.primaryEmail}
                                        </span>
                                        {user.secondaryEmail && (
                                            <span className="text-xs text-slate-400">
                                                {user.secondaryEmail}
                                            </span>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="py-2 px-3">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-slate-300 font-mono">
                                            {user.id}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell className="py-2 px-3">
                                    <div className="flex flex-wrap gap-1">
                                        {user.roles?.map((role) => (
                                            <Badge
                                                key={role}
                                                variant="outline"
                                                className="text-xs px-2 py-0 h-5 border-slate-500 text-slate-300"
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
                                    <span className="text-xs text-slate-300">
                                        {user.lastLogin ? formatDate(user.lastLogin) : 'Never'}
                                    </span>
                                </TableCell>
                                <TableCell className="py-2 px-3">
                                    <button
                                        onClick={() => handleEditUser(user)}
                                        className="text-xs text-blue-400 hover:text-blue-300 font-normal hover:underline"
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