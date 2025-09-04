import { Button } from "@/components/ui/button";

interface NewGroupFormProps {
    newGroup: { name: string; description: string };
    setNewGroup: (group: { name: string; description: string }) => void;
    onCreateGroup: () => void;
    onCancel: () => void;
}

const NewGroupForm = ({
    newGroup,
    setNewGroup,
    onCreateGroup,
    onCancel
}: NewGroupFormProps) => (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
        <input
            type="text"
            placeholder="Group name"
            className="w-full p-2.5 mb-3 text-sm border rounded-lg focus:ring-2 focus:ring-blue-100"
            value={newGroup.name}
            onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
        />
        <input
            type="text"
            placeholder="Description"
            className="w-full p-2.5 mb-4 text-sm border rounded-lg focus:ring-2 focus:ring-blue-100"
            value={newGroup.description}
            onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
        />
        <div className="flex justify-end gap-3">
            <Button size="sm" variant="outline" onClick={onCancel} className="px-4">
                Cancel
            </Button>
            <Button size="sm" onClick={onCreateGroup} className="px-4">
                Create Group
            </Button>
        </div>
    </div>
);

export default NewGroupForm;