"use client";

import React, { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import DataFilterPanel from "@/components/shared/filters/DataFilterPanel";
import ActionButton from "@/components/shared/ActionButton";
import SportingEventForm from "./SportingEventForm";
import SportingEventsTable from "./SportingEventsTable";
import { SportingEvent, SportingEventsClientProps } from "./types";

const ITEMS_PER_PAGE = 20;

const SportingEventsClient: React.FC<SportingEventsClientProps> = ({ initialData }) => {
    const [sportingEvents, setSportingEvents] = useState<SportingEvent[]>(initialData);
    const [searchText, setSearchText] = useState("");
    const [selectedEvent, setSelectedEvent] = useState<SportingEvent | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const filteredEvents = sportingEvents.filter((event) => {
        const matchesSearch = Object.values(event).some((value) =>
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
        // TODO
    };

    const handleSaveEvent = (event: SportingEvent) => {
        if (selectedEvent) {
            // Edit existing event
            setSportingEvents(prev => prev.map(e => e.id === event.id ? event : e));
        } else {
            const newEvent = {
                ...event,
                createdOn: new Date().toLocaleDateString(),
                createdBy: "Admin",
                updatedOn: new Date().toLocaleDateString(),
                updatedBy: "Admin",
            };
            setSportingEvents(prev => [...prev, newEvent]);
        }
    };

    const handleDeleteEvent = (id: number) => {
        setSportingEvents(prev => prev.filter(event => event.id !== id));
    };

    const handleEditEvent = (event: SportingEvent) => {
        setSelectedEvent(event);
        setIsDialogOpen(true);
    };

    const handleAddEvent = () => {
        setSelectedEvent(null);
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
                        infoTitle="Purpose Management"
                        infoText="Add and manage purposes for sporting events. Active purposes will be available for selection when creating new events."
                    />
                </div>

                {/* Main content */}
                <div className="flex-1">
                    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-slate-900">
                                Sport Event Purposes
                            </h3>
                            <ActionButton
                                icon={Plus}
                                text="Add Purpose"
                                onClick={handleAddEvent}
                                variant="default"
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                            />
                        </div>

                        <SportingEventsTable
                            data={filteredEvents}
                            currentPage={currentPage}
                            itemsPerPage={ITEMS_PER_PAGE}
                            onEditEvent={handleEditEvent}
                            onDeleteEvent={handleDeleteEvent}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </div>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <SportingEventForm
                    sportingEvent={selectedEvent}
                    onClose={() => setIsDialogOpen(false)}
                    onSave={handleSaveEvent}
                    isEditing={!!selectedEvent}
                />
            </Dialog>
        </div>
    );
};

export default SportingEventsClient;