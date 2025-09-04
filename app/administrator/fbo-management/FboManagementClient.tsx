"use client";

import React, { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import DataFilterPanel from "@/components/shared/filters/DataFilterPanel";
import ActionButton from "@/components/shared/ActionButton";

import { FBO, FboManagementClientProps } from "./types";
import FBOForm from "./FboForm";
import FBOTable from "./FboTable";

const ITEMS_PER_PAGE = 20;

const FboManagementClient: React.FC<FboManagementClientProps> = ({ initialData }) => {
    const [fbos, setFbos] = useState<FBO[]>(initialData);
    const [searchText, setSearchText] = useState("");
    const [selectedFBO, setSelectedFBO] = useState<FBO | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const filteredFBOs = fbos.filter((fbo) => {
        const matchesSearch = Object.values(fbo).some((value) =>
            value.toString().toLowerCase().includes(searchText.toLowerCase())
        );
        return matchesSearch;
    });

    const handleResetFilters = () => {
        setSearchText("");
        setStartDate(null);
        setEndDate(null);
        setCurrentPage(1);
    };

    const handleDownloadCSV = () => {
        console.log("Downloading CSV");
        // TODO: Implement CSV download
    };

    const handleSaveFBO = (fbo: FBO) => {
        if (selectedFBO) {
            // Edit existing FBO
            setFbos(prev => prev.map(f => f.id === fbo.id ? fbo : f));
        } else {
            // Add new FBO
            setFbos(prev => [...prev, { ...fbo, loadDate: new Date().toLocaleDateString(), loadBy: "Admin" }]);
        }
    };

    const handleDeleteFBO = (id: string) => {
        setFbos(prev => prev.filter(fbo => fbo.id !== id));
    };

    const handleEditFBO = (fbo: FBO) => {
        setSelectedFBO(fbo);
        setIsDialogOpen(true);
    };

    const handleAddFBO = () => {
        setSelectedFBO(null);
        setIsDialogOpen(true);
    };

    return (
        <div className="w-full">
            <div className="flex gap-6">
                {/* Filters sidebar */}
                <div className="w-64 flex-shrink-0">
                    <DataFilterPanel
                        startDate={startDate}
                        endDate={endDate}
                        searchText={searchText}
                        onStartDateChange={setStartDate}
                        onEndDateChange={setEndDate}
                        onSearchChange={setSearchText}
                        onReset={handleResetFilters}
                        onDownloadCSV={handleDownloadCSV}
                        infoTitle="FBO Management"
                        infoText="Add and manage Fixed Base Operators (FBOs). Active FBOs will be available for selection in the system."
                    />
                </div>

                {/* Main content */}
                <div className="flex-1">
                    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-slate-900">
                                Fixed Base Operators (FBO)
                            </h3>
                            <ActionButton
                                icon={Plus}
                                text="Add FBO"
                                onClick={handleAddFBO}
                                variant="default"
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                            />
                        </div>

                        <FBOTable
                            data={filteredFBOs}
                            currentPage={currentPage}
                            itemsPerPage={ITEMS_PER_PAGE}
                            onEditFBO={handleEditFBO}
                            onDeleteFBO={handleDeleteFBO}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </div>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <FBOForm
                    fbo={selectedFBO}
                    onClose={() => setIsDialogOpen(false)}
                    onSave={handleSaveFBO}
                    isEditing={!!selectedFBO}
                />
            </Dialog>
        </div>
    );
};

export default FboManagementClient;