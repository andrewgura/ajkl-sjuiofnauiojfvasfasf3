'use client';

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import Pagination from "@/components/shared/Pagination";
import UserTable from "./UserTable";
import UserFilterPanel from "./UserFilterPanel";
import AddUserModal from "./modals/AddUserModal";
import { User } from "@/types/user";
import { getUsersWithFilters } from "@/lib/actions/user-management/user-management-actions";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 20;

interface UserManagementProps {
    initialUsers?: User[];
    initialTotal?: number;
}

export function UserManagementClient({ initialUsers = [], initialTotal = 0 }: UserManagementProps) {
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [searchText, setSearchText] = useState("");
    const [selectedRole, setSelectedRole] = useState<string | null>(null);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [addModalOpen, setAddModalOpen] = useState(false);

    const refreshUsers = useCallback(async () => {
        try {
            const filters = {
                searchText: searchText || undefined,
                role: selectedRole || undefined,
                startDate: startDate || undefined,
                endDate: endDate || undefined,
            };

            const result = await getUsersWithFilters(filters);

            if (result.success) {
                setUsers(result.users);
                setCurrentPage(1);
            } else {
                console.error("Error refreshing users:", result);
                toast.error("Failed to refresh users. Check console for message");
            }
        } catch (error) {
            console.error("Error refreshing users:", error);
            toast.error("Failed to refresh users. Check console for message");
        }
    }, [searchText, selectedRole, startDate, endDate]);

    const applyFilters = useCallback(async () => {
        await refreshUsers();
    }, [refreshUsers]);

    const handleRoleSelect = useCallback((role: string) => {
        setSelectedRole(prev => prev === role ? null : role);
        setCurrentPage(1);
    }, []);

    const handleResetFilters = useCallback(async () => {
        setSearchText("");
        setSelectedRole(null);
        setStartDate(null);
        setEndDate(null);
        setCurrentPage(1);

        try {
            const result = await getUsersWithFilters({});

            if (result.success) {
                setUsers(result.users);
            } else {
                toast.error("Failed to reset filters: " + (result.error || "Unknown error"));
            }
        } catch (error) {
            console.error("Error resetting filters:", error);
            toast.error("Failed to reset filters. Check console for message.");
        }
    }, []);

    //TODO: CSV download
    const handleDownloadCSV = useCallback(() => {
        console.log("Downloading user data as CSV...");
    }, []);

    const handleUserCreated = useCallback(() => {
        refreshUsers();
    }, [refreshUsers]);

    const handleUserUpdated = useCallback(() => {
        refreshUsers();
    }, [refreshUsers]);

    const filteredUsers = users.filter((user: User) => {
        const matchesSearch = searchText === "" || Object.values(user).some((value) =>
            value?.toString().toLowerCase().includes(searchText.toLowerCase())
        );

        const matchesRole = !selectedRole || user.roles?.includes(selectedRole);

        const matchesDateRange =
            (!startDate || !user.createdAt || new Date(user.createdAt) >= startDate) &&
            (!endDate || !user.createdAt || new Date(user.createdAt) <= endDate);

        return matchesSearch && matchesRole && matchesDateRange;
    });

    // Apply search/filter when dependencies change
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (selectedRole !== null || startDate !== null || endDate !== null) {
                applyFilters();
            }
        }, 500); // Debounce search

        return () => clearTimeout(timeoutId);
    }, [searchText, selectedRole, startDate, endDate, applyFilters]);

    return (
        <div className="w-full">
            <div className="flex gap-6">
                {/* Filters sidebar */}
                <div className="w-64 flex-shrink-0">
                    <UserFilterPanel
                        startDate={startDate}
                        endDate={endDate}
                        searchText={searchText}
                        selectedRole={selectedRole}
                        onSearchChange={setSearchText}
                        onRoleChange={handleRoleSelect}
                        onReset={handleResetFilters}
                        onDownloadCSV={handleDownloadCSV}
                    />
                </div>

                {/* Main content */}
                <div className="flex-1">
                    <div className="rounded-lg border border-slate-600 overflow-hidden">
                        <div className="p-4 border-b border-slate-600 flex justify-between">
                            <div className="flex space-x-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={refreshUsers}
                                    className="text-xs bg-slate-700 border-slate-600 text-white hover:bg-slate-600 hover:border-slate-500"
                                >
                                    Refresh
                                </Button>
                                <Button
                                    className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-xs"
                                    onClick={() => setAddModalOpen(true)}
                                >
                                    <UserPlus className="w-4 h-4 mr-2" />
                                    Add User
                                </Button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <UserTable
                                data={filteredUsers}
                                currentPage={currentPage}
                                itemsPerPage={ITEMS_PER_PAGE}
                                onUserUpdated={handleUserUpdated}
                            />
                        </div>

                        {filteredUsers.length > 0 && (
                            <div className="border-t border-slate-600">
                                <Pagination
                                    currentPage={currentPage}
                                    totalItems={filteredUsers.length}
                                    itemsPerPage={ITEMS_PER_PAGE}
                                    onPageChange={setCurrentPage}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <AddUserModal
                open={addModalOpen}
                onOpenChange={setAddModalOpen}
                onUserCreated={handleUserCreated}
            />
        </div>
    );
}