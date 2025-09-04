import { Group } from "@/lib/actions/group-notifications/group-types";

interface GroupItemProps {
    group: Group;
    isSelected: boolean;
    onClick: () => void;
}

const GroupItem = ({ group, isSelected, onClick }: GroupItemProps) => (
    <button
        className={`w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors ${isSelected ? "bg-blue-50 hover:bg-blue-50 ring-2 ring-blue-100" : ""
            }`}
        onClick={onClick}
    >
        <div className="flex justify-between items-start">
            <div>
                <h3 className="text-sm font-medium text-gray-900">{group.name}</h3>
                <p className="text-sm text-gray-500 mt-0.5">{group.description}</p>
            </div>
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {group.members.length} members
            </span>
        </div>
    </button>
);

export default GroupItem;