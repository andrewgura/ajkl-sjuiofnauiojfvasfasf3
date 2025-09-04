"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import toast from 'react-hot-toast';

import ConfirmDialog from "@/components/shared/ConfirmDialog";

import GroupItem from "./GroupItem";
import NewGroupForm from "./NewGroupForm";
import MembersTable from "./MembersTable";
import GroupDetails from "./GroupDetails";
import {
    createNotificationGroup,
    updateNotificationGroup,
    deleteNotificationGroup,
    addGroupMember,
    deleteGroupMemberAction,
    fetchAllGroups
} from '@/lib/actions/group-notifications/group-actions';
import { Group, GroupMember } from "@/lib/actions/group-notifications/group-types";

interface GroupNotificationsClientProps {
    initialGroups?: Group[];
}

export default function GroupNotificationsClient({ initialGroups = [] }: GroupNotificationsClientProps) {
    const [groups, setGroups] = useState<Group[]>(initialGroups);
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [newGroup, setNewGroup] = useState({ name: "", description: "" });
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [memberToDelete, setMemberToDelete] = useState<GroupMember | null>(null);
    const [isPending, startTransition] = useTransition();

    const filteredGroups = groups.filter(
        (group) =>
            group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            group.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelectGroup = (group: Group) => {
        setSelectedGroup(group);
        setEditMode(false);
    };

    const refreshGroups = async () => {
        try {
            const result = await fetchAllGroups();
            if (result.error) {
                toast.error("Failed to refresh groups: " + result.error.message);
            } else {
                setGroups(result.groups);
                // Update selected group if it still exists
                if (selectedGroup) {
                    const updatedSelectedGroup = result.groups.find(g =>
                        g.id === selectedGroup.id || g.name === selectedGroup.name
                    );
                    setSelectedGroup(updatedSelectedGroup || null);
                }
            }
        } catch (error) {
            toast.error("Failed to refresh groups");
            console.error('Error refreshing groups:', error);
        }
    };

    const handleCreateGroup = () => {
        if (!newGroup.name.trim() || !newGroup.description.trim()) {
            toast.error("Please fill in both name and description");
            return;
        }

        startTransition(async () => {
            try {
                const result = await createNotificationGroup({
                    name: newGroup.name.trim(),
                    description: newGroup.description.trim(),
                    createdBy: 'current-user' // TODO: Get from auth context
                });

                if (result.success) {
                    toast.success("Group created successfully");
                    setNewGroup({ name: "", description: "" });
                    setEditMode(false);
                    await refreshGroups();
                } else {
                    toast.error(result.error?.message || 'Failed to create group');
                }
            } catch (error) {
                toast.error("Failed to create group");
                console.error('Error creating group:', error);
            }
        });
    };

    const handleAddMember = (member: GroupMember) => {
        if (!selectedGroup) {
            toast.error("No group selected");
            return;
        }

        if (!member.name.trim() || !member.email.trim()) {
            toast.error("Please provide both name and email");
            return;
        }

        // Basic email validation
        // TODO: Centralize validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(member.email.trim())) {
            toast.error("Please enter a valid email address");
            return;
        }

        // Check for duplicate email in current group
        const isDuplicate = selectedGroup.members.some(
            existingMember => existingMember.email.toLowerCase() === member.email.toLowerCase().trim()
        );

        if (isDuplicate) {
            toast.error("This email address is already in the group");
            return;
        }

        startTransition(async () => {
            try {
                const groupId = selectedGroup.id || selectedGroup.name;
                const result = await addGroupMember({
                    groupId: groupId,
                    name: member.name.trim(),
                    email: member.email.toLowerCase().trim(),
                    createdBy: 'current-user' // TODO: Get from auth context
                });

                if (result.success) {
                    toast.success("Member added successfully");
                    await refreshGroups();
                } else {
                    toast.error(result.error?.message || 'Failed to add member');
                }
            } catch (error) {
                toast.error("Failed to add member");
                console.error('Error adding member:', error);
            }
        });
    };

    const handleDeleteGroup = () => {
        if (!selectedGroup) {
            toast.error("No group selected");
            return;
        }

        startTransition(async () => {
            try {
                const groupId = selectedGroup.id || selectedGroup.name;
                const result = await deleteNotificationGroup({
                    id: groupId,
                    updatedBy: 'current-user' // TODO: Get from auth context
                });

                if (result.success) {
                    toast.success("Group deleted successfully");
                    setSelectedGroup(null);
                    setDeleteConfirmOpen(false);
                    await refreshGroups();
                } else {
                    toast.error(result.error?.message || 'Failed to delete group');
                }
            } catch (error) {
                toast.error("Failed to delete group");
                console.error('Error deleting group:', error);
            }
        });
    };

    const handleDeleteMember = () => {
        if (!memberToDelete) {
            toast.error("No member selected for deletion");
            return;
        }

        startTransition(async () => {
            try {
                const memberId = memberToDelete.id;
                if (!memberId) {
                    toast.error("Cannot delete member: missing ID");
                    return;
                }

                const result = await deleteGroupMemberAction({
                    id: memberId,
                    updatedBy: 'current-user' // TODO: Get from auth context
                });

                if (result.success) {
                    toast.success("Member removed successfully");
                    setMemberToDelete(null);
                    await refreshGroups();
                } else {
                    toast.error(result.error?.message || 'Failed to remove member');
                }
            } catch (error) {
                toast.error("Failed to remove member");
                console.error('Error removing member:', error);
            }
        });
    };

    const handleSaveGroupEdit = (editedGroup: { name: string; description: string }) => {
        if (!selectedGroup) {
            toast.error("No group selected");
            return;
        }

        if (!editedGroup.name.trim() || !editedGroup.description.trim()) {
            toast.error("Please provide both name and description");
            return;
        }

        startTransition(async () => {
            try {
                const groupId = selectedGroup.id || selectedGroup.name;
                const result = await updateNotificationGroup({
                    id: groupId,
                    name: editedGroup.name.trim(),
                    description: editedGroup.description.trim(),
                    updatedBy: 'current-user' // TODO: Get from auth context
                });

                if (result.success) {
                    toast.success("Group updated successfully");
                    await refreshGroups();
                } else {
                    toast.error(result.error?.message || 'Failed to update group');
                }
            } catch (error) {
                toast.error("Failed to update group");
                console.error('Error updating group:', error);
            }
        });
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
                {/* Left Panel: Group List */}
                <div className="bg-white rounded-lg border shadow-sm p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search groups..."
                                className="w-full pl-9 pr-4 py-2.5 text-sm border rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-colors"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button
                            size="sm"
                            variant="outline"
                            className="flex items-center gap-2 px-4 py-2.5 h-auto"
                            onClick={() => setEditMode(!editMode)}
                            disabled={isPending}
                        >
                            <Plus className="h-4 w-4" />
                            New Group
                        </Button>
                    </div>

                    {editMode && (
                        <NewGroupForm
                            newGroup={newGroup}
                            setNewGroup={setNewGroup}
                            onCreateGroup={handleCreateGroup}
                            onCancel={() => setEditMode(false)}
                        />
                    )}

                    <div className="space-y-1">
                        {filteredGroups.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                {searchTerm ? "No groups match your search" : "No groups found"}
                            </div>
                        ) : (
                            filteredGroups.map((group, index) => (
                                <GroupItem
                                    key={group.id || group.name || index}
                                    group={group}
                                    isSelected={selectedGroup?.id === group.id || selectedGroup?.name === group.name}
                                    onClick={() => handleSelectGroup(group)}
                                />
                            ))
                        )}
                    </div>
                </div>

                {/* Right Panel: Group Details */}
                <div className="bg-white rounded-lg border shadow-sm p-6">
                    {selectedGroup ? (
                        <div>
                            <GroupDetails
                                group={selectedGroup}
                                onSaveEdit={handleSaveGroupEdit}
                                onDelete={() => setDeleteConfirmOpen(true)}
                                onAddMember={handleAddMember}
                            />

                            <div className="mt-8">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">
                                    Members ({selectedGroup.members.length})
                                </h3>
                                <MembersTable
                                    members={selectedGroup.members}
                                    onDelete={setMemberToDelete}
                                    showEmptyState={false}
                                />
                            </div>
                        </div>
                    ) : (
                        <MembersTable showEmptyState={true} />
                    )}
                </div>
            </div>

            {/* Delete Group Confirmation */}
            <ConfirmDialog
                isOpen={deleteConfirmOpen}
                title="Delete Group"
                description={`Are you sure you want to delete the group "${selectedGroup?.name}"? This action cannot be undone and will remove all members from the group.`}
                confirmLabel="Delete Group"
                cancelLabel="Cancel"
                onConfirm={handleDeleteGroup}
                onCancel={() => setDeleteConfirmOpen(false)}
                isDestructive={true}
                isLoading={isPending}
            />

            {/* Delete Member Confirmation */}
            <ConfirmDialog
                isOpen={!!memberToDelete}
                title="Remove Member"
                description={`Are you sure you want to remove "${memberToDelete?.name}" from the group?`}
                confirmLabel="Remove Member"
                cancelLabel="Cancel"
                onConfirm={handleDeleteMember}
                onCancel={() => setMemberToDelete(null)}
                isDestructive={true}
                isLoading={isPending}
            />
        </>
    );
}