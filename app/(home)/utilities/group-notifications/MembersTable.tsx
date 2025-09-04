import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { GroupMember } from "@/lib/actions/group-notifications/group-types";
import { UserMinus, Search } from "lucide-react";

interface MembersTableProps {
    members?: GroupMember[];
    onDelete?: (member: GroupMember) => void;
    showEmptyState?: boolean;
}

const EmptyState = () => (
    <div className="text-center text-gray-500 py-12">
        <Search className="h-12 w-12 mx-auto mb-4 text-gray-400" />
        <p className="text-lg">
            Select a group to view and manage its members
        </p>
    </div>
);

const MembersTable = ({
    members = [],
    onDelete = () => { },
    showEmptyState = false
}: MembersTableProps) => {

    if (showEmptyState) {
        return <EmptyState />;
    }

    return (
        <div className="border rounded-lg overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className="bg-gray-50">
                        <TableHead className="font-medium">Name</TableHead>
                        <TableHead className="font-medium">Email</TableHead>
                        <TableHead className="w-[80px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {members.map((member, index) => (
                        <TableRow key={index} className="hover:bg-gray-50">
                            <TableCell className="font-medium">{member.name}</TableCell>
                            <TableCell className="text-gray-600">{member.email}</TableCell>
                            <TableCell>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                    onClick={() => onDelete(member)}
                                >
                                    <UserMinus className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default MembersTable;