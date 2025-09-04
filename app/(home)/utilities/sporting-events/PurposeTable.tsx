import { useState } from "react";
import { PenSquare, Trash2, Plus, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import { Purpose } from "@/lib/actions/sporting-events/sporting-events-types";

interface PurposeTableProps {
    purposes: Purpose[];
    onEdit: (purpose: Purpose) => void;
    onDelete?: (purpose: Purpose) => void;
}

const PurposeTable = ({ purposes, onEdit, onDelete }: PurposeTableProps) => {
    const [purposeToDelete, setPurposeToDelete] = useState<Purpose | null>(null);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

    const handleDeleteClick = (purpose: Purpose) => {
        setPurposeToDelete(purpose);
        setIsConfirmDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        if (purposeToDelete && onDelete) {
            onDelete(purposeToDelete);
        }
        setIsConfirmDialogOpen(false);
        setPurposeToDelete(null);
    };

    const handleCancelDelete = () => {
        setIsConfirmDialogOpen(false);
        setPurposeToDelete(null);
    };

    // Empty state component
    const EmptyState = () => (
        <div className="py-12 flex flex-col items-center justify-center text-center px-6">
            <div className="bg-slate-50 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Info className="h-6 w-6 text-slate-400" />
            </div>
            <h3 className="text-base font-medium text-slate-900 mb-1">No purposes found</h3>
            <p className="text-sm text-slate-500 max-w-md mb-6">
                There are no sport event purposes available. Add a new purpose to get started.
            </p>
            <Button
                className="bg-blue-600 hover:bg-blue-700 text-sm font-medium h-9 text-white"
                onClick={() => document.getElementById('add-purpose-button')?.click()}
            >
                <Plus className="w-4 h-4 mr-2" />
                Add Purpose
            </Button>
        </div>
    );

    return (
        <div className="overflow-hidden">
            {purposes.length === 0 ? (
                <EmptyState />
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50">
                            <TableHead className="py-3 px-6 font-semibold text-xs text-slate-700">
                                ID
                            </TableHead>
                            <TableHead className="py-3 px-6 font-semibold text-xs text-slate-700">
                                Title
                            </TableHead>
                            <TableHead className="py-3 px-6 font-semibold text-xs text-slate-700">
                                Sport
                            </TableHead>
                            <TableHead className="py-3 px-6 font-semibold text-xs text-slate-700 text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {purposes.map((purpose) => (
                            <TableRow
                                key={purpose.id}
                                className="group transition-colors hover:bg-slate-50"
                            >
                                <TableCell className="py-4 px-6">
                                    <span className="text-sm text-slate-600">
                                        {purpose.id}
                                    </span>
                                </TableCell>
                                <TableCell className="py-4 px-6">
                                    <span className="text-sm font-medium text-slate-900">
                                        {purpose.purpose}
                                    </span>
                                </TableCell>
                                <TableCell className="py-4 px-6">
                                    <span className="text-sm text-slate-600">
                                        {purpose.sport}
                                    </span>
                                </TableCell>
                                <TableCell className="py-4 px-6">
                                    <div className="flex items-center justify-end gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0 text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                                            onClick={() => onEdit(purpose)}
                                        >
                                            <PenSquare className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0 text-slate-600 hover:text-red-600 hover:bg-red-50"
                                            onClick={() => handleDeleteClick(purpose)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}

            {/* Confirm Delete Dialog */}
            <ConfirmDialog
                isOpen={isConfirmDialogOpen}
                title="Delete Purpose"
                description={
                    <span>
                        Are you sure you want to delete <strong>{purposeToDelete?.purpose}</strong>?
                        This action cannot be undone.
                    </span>
                }
                confirmLabel="Delete"
                cancelLabel="Cancel"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                isDestructive={true}
            />
        </div>
    );
};

export default PurposeTable;