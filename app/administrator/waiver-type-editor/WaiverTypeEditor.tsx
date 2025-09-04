"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import WaiverTypeTable from "./WaiverTypeTable";
import EditWaiverDialog from "./EditWaiverDialog";
import { AdminWaiverItem } from "./types";

export default function WaiverTypeEditor() {
    const [waiverItems, setWaiverItems] = useState<AdminWaiverItem[]>([]);
    const [editItem, setEditItem] = useState<AdminWaiverItem | null>(null);
    const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
    const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
    const [isDirty, setIsDirty] = useState<boolean>(false);

    // Move item up in order
    const moveItemUp = (id: number) => {
        const index = waiverItems.findIndex(item => item.id === id);
        if (index <= 0) return; // Already at the top

        const newItems = [...waiverItems];
        [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];

        const updatedItems = newItems.map((item, idx) => ({
            ...item,
            order: idx
        }));

        setWaiverItems(updatedItems);
        setIsDirty(true);
    };

    // Move item down in order
    const moveItemDown = (id: number) => {
        const index = waiverItems.findIndex(item => item.id === id);
        if (index === -1 || index >= waiverItems.length - 1) return; // Already at the bottom

        const newItems = [...waiverItems];
        [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];

        const updatedItems = newItems.map((item, idx) => ({
            ...item,
            order: idx
        }));

        setWaiverItems(updatedItems);
        setIsDirty(true);
    };

    // Toggle item visibility
    const toggleVisibility = (id: number) => {
        setWaiverItems(
            waiverItems.map(item =>
                item.id === id ? { ...item, visible: !item.visible } : item
            )
        );
        setIsDirty(true);
    };

    // Open edit dialog
    const handleEdit = (item: AdminWaiverItem) => {
        setEditItem({ ...item });
        setShowEditDialog(true);
    };

    //Update Order
    const saveAllChanges = async () => {
        //TODO: Update changes, re-order items
    };

    return (
        <div className="max-w-6xl mx-auto">
            {/* Success message */}
            {saveSuccess && (
                <Alert className="mb-4 bg-green-50 border-green-200">
                    <AlertDescription className="text-green-600 flex items-center gap-2">
                        <div className="bg-green-100 p-1 rounded-full">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 6L9 17L4 12" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        Changes saved successfully!
                    </AlertDescription>
                </Alert>
            )}

            {/* Save Button - Bottom Right */}
            <div className="fixed bottom-8 right-8 z-10">
                <Button
                    onClick={saveAllChanges}
                    variant="default"
                    disabled={!isDirty}
                    className="px-5 py-3 rounded-lg shadow-lg bg-blue-500 hover:bg-blue-600 text-white"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                        <path d="M19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H16.1716C16.702 3 17.2107 3.21071 17.5858 3.58579L20.4142 6.41421C20.7893 6.78929 21 7.29799 21 7.82843V19C21 20.1046 20.1046 21 19 21Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M17 21V13H7V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M7 3V7H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Save Changes
                </Button>
            </div>


            <WaiverTypeTable
                waiverItems={waiverItems}
                onMoveUp={moveItemUp}
                onMoveDown={moveItemDown}
                onToggleVisibility={toggleVisibility}
                onEdit={handleEdit}
            />


            {/* Edit Dialog */}
            <EditWaiverDialog
                open={showEditDialog}
                onOpenChange={setShowEditDialog}
                waiverItem={editItem}
            />
        </div>
    );
}