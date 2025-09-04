"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import EntityFormDialog from "./EntityFormDialog";

import CountriesLookupList from "./lists/CountriesLookupList";
import FBOsLookupList from "./lists/FBOsLookupList";
import SportingEventsLookupList from "./lists/SportingEventsLookupList";
import SportingVenuesLookupList from "./lists/SportingVenuesLookupList";
import USStatesLookupList from "./lists/USStatesLookupList";

export default function LookupListsClient() {
    const [activeTab, setActiveTab] = useState("countries");
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);
    const [formDialogOpen, setFormDialogOpen] = useState(false);
    const [editItem, setEditItem] = useState<any>(null);

    const handleTabChange = (value: string) => {
        setActiveTab(value);
    };

    const handleAddNew = () => {
        setEditItem(null);
        setFormDialogOpen(true);
    };

    const handleEdit = (item: any) => {
        setEditItem(item);
        setFormDialogOpen(true);
    };

    const handleSaveEntity = (data: any) => {
        if (editItem) {
            console.log(`Updating ${getSingularEntityName().toLowerCase()}:`, data);
            // TODO: Update existing item in the database
        } else {
            console.log(`Adding new ${getSingularEntityName().toLowerCase()}:`, data);
            // TODO: Add new item to the database
        }
    };

    const handleDeleteClick = (id: number) => {
        setItemToDelete(id);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        // Handle delete logic here
        console.log(`Deleting ${getSingularEntityName().toLowerCase()} with ID: ${itemToDelete}`);
        setDeleteDialogOpen(false);
        setItemToDelete(null);
    };

    const getEntityType = (): "country" | "fbo" | "sportingEvent" | "sportingVenue" | "usState" => {
        switch (activeTab) {
            case "countries":
                return "country";
            case "fbos":
                return "fbo";
            case "sportingEvents":
                return "sportingEvent";
            case "sportingVenues":
                return "sportingVenue";
            case "usStates":
                return "usState";
            default:
                console.error("Unknown active tab:", activeTab);
                return "country"; // Fallback
        }
    };

    //Display for Add New button depending on tab
    const getSingularEntityName = () => {
        switch (activeTab) {
            case "countries":
                return "Country";
            case "fbos":
                return "FBO";
            case "sportingEvents":
                return "Sporting Event";
            case "sportingVenues":
                return "Sporting Venue";
            case "usStates":
                return "US State";
            default:
                return activeTab.slice(0, -1).charAt(0).toUpperCase() + activeTab.slice(0, -1).slice(1);
        }
    };

    // Get Items list to replace the 0s
    return (
        <>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <Tabs defaultValue="countries" value={activeTab} onValueChange={handleTabChange}>
                    <div className="flex items-center justify-between mb-6">
                        <TabsList className="grid grid-cols-5 w-auto">
                            <TabsTrigger value="countries">
                                Countries
                                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700">
                                    0
                                </span>
                            </TabsTrigger>
                            <TabsTrigger value="fbos">
                                FBOs
                                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700">
                                    0
                                </span>
                            </TabsTrigger>
                            <TabsTrigger value="sportingEvents">
                                Sporting Events
                                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700">
                                    0
                                </span>
                            </TabsTrigger>
                            <TabsTrigger value="sportingVenues">
                                Sporting Venues
                                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700">
                                    0
                                </span>
                            </TabsTrigger>
                            <TabsTrigger value="usStates">
                                US States
                                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700">
                                    0
                                </span>
                            </TabsTrigger>
                        </TabsList>

                        <Button
                            className="flex items-center gap-2"
                            onClick={handleAddNew}
                        >
                            <PlusCircle size={16} />
                            <span>Add New {getSingularEntityName()}</span>
                        </Button>
                    </div>

                    <TabsContent value="countries">
                        <CountriesLookupList
                            onEdit={handleEdit}
                            onDelete={handleDeleteClick}
                        />
                    </TabsContent>

                    <TabsContent value="fbos">
                        <FBOsLookupList
                            onEdit={handleEdit}
                            onDelete={handleDeleteClick}
                        />
                    </TabsContent>

                    <TabsContent value="sportingEvents">
                        <SportingEventsLookupList
                            onEdit={handleEdit}
                            onDelete={handleDeleteClick}
                        />
                    </TabsContent>

                    <TabsContent value="sportingVenues">
                        <SportingVenuesLookupList
                            onEdit={handleEdit}
                            onDelete={handleDeleteClick}
                        />
                    </TabsContent>

                    <TabsContent value="usStates">
                        <USStatesLookupList
                            onEdit={handleEdit}
                            onDelete={handleDeleteClick}
                        />
                    </TabsContent>
                </Tabs>
            </div>

            <ConfirmDialog
                isOpen={deleteDialogOpen}
                title={`Delete ${getSingularEntityName()}`}
                description={`Are you sure you want to delete this ${getSingularEntityName().toLowerCase()}? This action cannot be undone.`}
                confirmLabel="Delete"
                cancelLabel="Cancel"
                onConfirm={handleDeleteConfirm}
                onCancel={() => setDeleteDialogOpen(false)}
                isDestructive={true}
            />

            <EntityFormDialog
                open={formDialogOpen}
                onOpenChange={setFormDialogOpen}
                onSave={handleSaveEntity}
                entityType={getEntityType()}
                editData={editItem}
            />
        </>
    );
}