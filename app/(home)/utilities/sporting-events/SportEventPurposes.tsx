"use client";

import { useState, useTransition } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from 'react-hot-toast';

import FilterContainer from "@/components/shared/FilterContainer";
import InfoAlert from "@/components/shared/InfoAlert";
import PurposeTable from "./PurposeTable";
import PurposeForm from "./PurposeForm";
import SearchFilter from "@/components/shared/filters/SearchFilter";

import {
    createSportingEventPurpose,
    updateSportingEventPurpose,
    deleteSportingEventPurpose,
    fetchAllPurposes
} from '@/lib/actions/sporting-events/sporting-events-actions';
import { Purpose } from "@/lib/actions/sporting-events/sporting-events-types";

interface SportEventPurposesProps {
    initialPurposes?: Purpose[];
}

const SportEventPurposes = ({ initialPurposes = [] }: SportEventPurposesProps) => {
    const [purposes, setPurposes] = useState<Purpose[]>(initialPurposes);
    const [searchText, setSearchText] = useState("");
    const [selectedPurpose, setSelectedPurpose] = useState<Purpose | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const filteredPurposes = purposes.filter((purpose) =>
        purpose.purpose.toLowerCase().includes(searchText.toLowerCase()) ||
        purpose.sport.toLowerCase().includes(searchText.toLowerCase())
    );

    const refreshPurposes = async () => {
        try {
            const result = await fetchAllPurposes();
            if (result.error) {
                toast.error("Failed to refresh purposes: " + result.error.message);
            } else {
                setPurposes(result.purposes);
            }
        } catch (error) {
            toast.error("Failed to refresh purposes");
            console.error('Error refreshing purposes:', error);
        }
    };

    const handleEditPurpose = (purpose: Purpose) => {
        setSelectedPurpose(purpose);
        setIsDialogOpen(true);
    };

    const handleDeletePurpose = (purpose: Purpose) => {
        startTransition(async () => {
            try {
                const result = await deleteSportingEventPurpose({
                    id: purpose.id,
                    updatedBy: 'current-user' // TODO: Get from auth context
                });

                if (result.success) {
                    toast.success("Purpose deleted successfully");
                    await refreshPurposes();
                } else {
                    toast.error(result.error?.message || 'Failed to delete purpose');
                }
            } catch (error) {
                toast.error("Failed to delete purpose");
                console.error('Error deleting purpose:', error);
            }
        });
    };

    const handleAddPurpose = () => {
        setSelectedPurpose(null);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setSelectedPurpose(null);
    };

    const handleSavePurpose = (formData: { purpose: string; sport: string; active: boolean }) => {
        if (!formData.purpose.trim() || !formData.sport.trim()) {
            toast.error("Please provide both purpose and sport");
            return;
        }

        startTransition(async () => {
            try {
                if (selectedPurpose) {
                    // Update existing purpose
                    const result = await updateSportingEventPurpose({
                        id: selectedPurpose.id,
                        purpose: formData.purpose.trim(),
                        sport: formData.sport.trim(),
                        active: formData.active,
                        updatedBy: 'current-user' // TODO: Get from auth context
                    });

                    if (result.success) {
                        toast.success("Purpose updated successfully");
                        setIsDialogOpen(false);
                        await refreshPurposes();
                    } else {
                        toast.error(result.error?.message || 'Failed to update purpose');
                    }
                } else {
                    // Create new purpose
                    const result = await createSportingEventPurpose({
                        purpose: formData.purpose.trim(),
                        sport: formData.sport.trim(),
                        createdBy: 'current-user' // TODO: Get from auth context
                    });

                    if (result.success) {
                        toast.success("Purpose created successfully");
                        setIsDialogOpen(false);
                        await refreshPurposes();
                    } else {
                        toast.error(result.error?.message || 'Failed to create purpose');
                    }
                }
            } catch (error) {
                toast.error(selectedPurpose ? "Failed to update purpose" : "Failed to create purpose");
                console.error('Error saving purpose:', error);
            }
        });
    };

    const handleResetFilters = () => {
        setSearchText("");
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const purposeInfoAlert = (
        <InfoAlert
            title="Purpose Management"
            description="Add and manage purposes for sporting events. Active purposes will be available for selection when creating new events."
            variant="blue"
        />
    );

    return (
        <div className="min-h-screen bg-slate-100">
            <div className="p-8 mx-auto max-w-screen-2xl">
                <div className="flex gap-8">
                    {/* Filters panel */}
                    <FilterContainer
                        onReset={handleResetFilters}
                        onDownloadCSV={() => {
                            // TODO: HAndle CSV download
                            toast.error("CSV download not implemented");
                        }}
                        infoComponent={purposeInfoAlert}
                    >
                        <SearchFilter
                            value={searchText}
                            onChange={handleSearchChange}
                        />
                    </FilterContainer>

                    {/* Main content */}
                    <div className="flex-1">
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                            <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-slate-900">
                                    Sport Event Purposes
                                </h3>
                                <Button
                                    id="add-purpose-button"
                                    className="bg-blue-600 hover:bg-blue-700 text-sm font-medium h-9 text-white"
                                    onClick={handleAddPurpose}
                                    disabled={isPending}
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Purpose
                                </Button>
                            </div>

                            <PurposeTable
                                purposes={filteredPurposes}
                                onEdit={handleEditPurpose}
                                onDelete={handleDeletePurpose}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <PurposeForm
                purpose={selectedPurpose}
                isOpen={isDialogOpen}
                onClose={handleCloseDialog}
                onSave={handleSavePurpose}
                isEditing={!!selectedPurpose}
            />
        </div>
    );
};

export default SportEventPurposes;