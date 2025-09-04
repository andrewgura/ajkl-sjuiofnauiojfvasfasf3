import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PenLine, Trash, X, Check } from "lucide-react";
import { Group, GroupMember } from "@/lib/actions/group-notifications/group-types";


interface GroupDetailsProps {
    group: Group;
    onSaveEdit: (editedGroup: { name: string; description: string }) => void;
    onDelete: () => void;
    onAddMember: (member: GroupMember) => void;
}

const GroupDetails = ({
    group,
    onSaveEdit,
    onDelete,
    onAddMember
}: GroupDetailsProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedGroup, setEditedGroup] = useState({ name: group.name, description: group.description });
    const [newMember, setNewMember] = useState<GroupMember>({ name: "", email: "" });

    const handleEditGroup = () => {
        setEditedGroup({
            name: group.name,
            description: group.description
        });
        setIsEditing(true);
    };

    const handleSaveEdit = () => {
        if (!editedGroup.name || !editedGroup.description) return;
        onSaveEdit(editedGroup);
        setIsEditing(false);
    };

    const handleAddMember = () => {
        if (newMember.name && newMember.email) {
            onAddMember(newMember);
            setNewMember({ name: "", email: "" });
        }
    };

    return (
        <>
            <div className="flex justify-between items-start mb-8">
                {isEditing ? (
                    <div className="flex-1 mr-4">
                        <input
                            type="text"
                            className="w-full p-2.5 mb-3 text-xl font-semibold border rounded-lg focus:ring-2 focus:ring-blue-100"
                            value={editedGroup.name}
                            onChange={(e) => setEditedGroup({ ...editedGroup, name: e.target.value })}
                        />
                        <input
                            type="text"
                            className="w-full p-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-100"
                            value={editedGroup.description}
                            onChange={(e) => setEditedGroup({ ...editedGroup, description: e.target.value })}
                        />
                    </div>
                ) : (
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                            {group.name}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            {group.description}
                        </p>
                    </div>
                )}
                <div className="flex gap-3">
                    {isEditing ? (
                        <>
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-gray-600 hover:text-gray-900 h-9"
                                onClick={() => setIsEditing(false)}
                            >
                                <X className="h-4 w-4" />
                                <span className="ml-2">Cancel</span>
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-green-600 hover:text-green-700 hover:bg-green-50 h-9"
                                onClick={handleSaveEdit}
                            >
                                <Check className="h-4 w-4" />
                                <span className="ml-2">Save</span>
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-600 hover:text-gray-900 h-9"
                                onClick={handleEditGroup}
                            >
                                <PenLine className="h-4 w-4" />
                                <span className="ml-2">Edit</span>
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50 h-9"
                                onClick={onDelete}
                            >
                                <Trash className="h-4 w-4" />
                                <span className="ml-2">Delete</span>
                            </Button>
                        </>
                    )}
                </div>
            </div>

            <div className="flex gap-3 mb-8">
                <input
                    type="text"
                    placeholder="Member name"
                    className="flex-1 p-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-100"
                    value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Member email"
                    className="flex-1 p-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-100"
                    value={newMember.email}
                    onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                />
                <Button
                    size="sm"
                    variant="outline"
                    onClick={handleAddMember}
                    className="px-6 h-10"
                >
                    Add Member
                </Button>
            </div>
        </>
    );
};

export default GroupDetails;