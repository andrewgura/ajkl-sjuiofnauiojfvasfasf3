"use client";

import DataFilterPanel from "@/components/shared/filters/DataFilterPanel";
import { SelectInput } from "@/components/shared/SelectInput";
import { USER_ROLES } from "@/utils/user-roles";

// Extended DataFilterPanel to include role filter
interface UserFilterPanelProps {
    startDate: Date | null;
    endDate: Date | null;
    searchText: string;
    selectedRole: string | null;
    onSearchChange: (value: string) => void;
    onRoleChange: (role: string) => void;
    onReset: () => void;
    onDownloadCSV: () => void;
}

export default function UserFilterPanel({
    startDate,
    endDate,
    searchText,
    selectedRole,
    onSearchChange,
    onRoleChange,
    onReset,
    onDownloadCSV
}: UserFilterPanelProps) {

    const RoleFilter = () => (
        <div className="space-y-2 mb-4">
            <label className="text-sm font-medium text-slate-700 block mb-1.5">
                User Role
            </label>
            <SelectInput
                value={selectedRole || ""}
                onChange={onRoleChange}
                options={USER_ROLES}
                placeholder="Filter by role..."
                searchPlaceholder="Search roles..."
                emptyText="No role found."
            />
        </div>
    );

    return (
        <DataFilterPanel
            startDate={startDate}
            endDate={endDate}
            searchText={searchText}
            onSearchChange={onSearchChange}
            onReset={onReset}
            onDownloadCSV={onDownloadCSV}
            customFilters={<RoleFilter />}
        />
    );
}