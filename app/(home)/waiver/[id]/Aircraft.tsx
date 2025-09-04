"use client";

import React, { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { useFormContext } from "react-hook-form";
import { WaiverFormData } from "./waiver-validation";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon, PencilIcon, Trash2Icon, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fromAircraftFormData } from "@/lib/utils/waiver-utils";
import { useWaiverStore } from "@/lib/stores/useWaiverStore";
import {
  upsertAircraftAction,
  deleteAircraftAction,
} from "@/lib/actions/waiver/waiver-actions";
import Pagination from "@/components/shared/Pagination";
import { AircraftData } from "@/lib/actions/waiver/waiver-types";

export default function Aircraft() {
  // Hooks for form management from react-hook-form
  const {
    register,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<WaiverFormData>();

  // Zustand store for managing waiver data
  const { currentStoreWaiver, setCurrentStoreWaiver } = useWaiverStore();

  // Local state for managing editing mode and pagination
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Define how many aircraft per page

  // Watch form values to enable/disable the 'Add Aircraft' button
  const aircraftValues = watch([
    "tailNumber",
    "callSign",
    "aircraftType",
    "registration",
    "grossWeight",
  ]);

  // Check if all required form fields are filled
  const isSectionValid = aircraftValues.every((value) => !!value);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedAircraft = useMemo(() => {
    // Use a memoized value to avoid re-slicing on every render
    const aircraftList = (currentStoreWaiver?.aircraft || []) as AircraftData[];
    return aircraftList.slice(indexOfFirstItem, indexOfLastItem);
  }, [currentStoreWaiver?.aircraft, indexOfFirstItem, indexOfLastItem]);

  // Handler for page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  /**
   * Adds a new aircraft and persists it to the server.
   * Resets the form after successful addition.
   */
  const handleAddAircraft = async () => {
    const allFormValues = getValues();
    const aircraftData = fromAircraftFormData(allFormValues);
    aircraftData.confirmation = currentStoreWaiver?.confirmation ?? "";

    // Call the server action to save the new aircraft
    const result = await upsertAircraftAction(aircraftData);

    if (currentStoreWaiver) {
      // Update the store with the new aircraft list from the server's response
      const updatedAircraft = [
        ...(currentStoreWaiver.aircraft || []),
        ...(result.aircraft ? [result.aircraft] : []),
      ];

      setCurrentStoreWaiver({
        ...currentStoreWaiver,
        aircraft: updatedAircraft as AircraftData[],
      });

      handleCancelEdit();
    }
  };

  /**
   * Populates the form fields for editing an existing aircraft.
   * @param aircraftId The ID of the aircraft to edit.
   */
  const handleEditAircraft = (aircraftId: string) => {
    const aircraftToEdit = currentStoreWaiver?.aircraft?.find(
      (a) => a.id === aircraftId
    ) as AircraftData;
    if (aircraftToEdit) {
      // Populate the form fields with the selected aircraft's data
      setValue("tailNumber", aircraftToEdit.tailNumber);
      setValue("callSign", aircraftToEdit.callSign);
      setValue("aircraftType", aircraftToEdit.aircraftType);
      setValue("registration", aircraftToEdit.registration);
      setValue("grossWeight", aircraftToEdit.grossWeight);
      setEditingId(aircraftId); // Enter edit mode
    }
  };

  /**
   * Saves the edits to an existing aircraft by calling the server action.
   */
  const handleSaveEdit = async () => {
    if (editingId && currentStoreWaiver) {
      const allFormValues = getValues();
      const aircraftData = fromAircraftFormData(allFormValues);
      aircraftData.id = editingId; // Pass the ID of the aircraft to be updated
      aircraftData.confirmation = currentStoreWaiver?.confirmation ?? "";
      aircraftData.waiverId = currentStoreWaiver?.waiverId ?? "";

      // Call the server action to update the existing aircraft
      const result = await upsertAircraftAction(aircraftData);

      if (currentStoreWaiver) {
        // Update the store with the server's response
        const updatedAircraft = currentStoreWaiver.aircraft?.map((aircraft) =>
          aircraft.id === editingId
            ? result.aircraft ?? aircraft // Replace the old object with the new one from the server
            : aircraft
        );
        setCurrentStoreWaiver({
          ...currentStoreWaiver,
          aircraft: updatedAircraft as AircraftData[],
        });

        handleCancelEdit(); // Reset form after saving
      }
    }
  };

  /**
   * Resets the form fields and exits edit mode.
   */
  const handleCancelEdit = () => {
    // Clear the form fields and exit edit mode
    setValue("tailNumber", "");
    setValue("callSign", "");
    setValue("aircraftType", "");
    setValue("registration", "");
    setValue("grossWeight", 0);
    setEditingId(null);
  };

  /**
   * Deletes an aircraft from both the server and the local state.
   * @param aircraftId The ID of the aircraft to delete.
   */
  const handleDeleteAircraft = async (aircraftId: string) => {
    // Call the server action to delete the aircraft
    const result = await deleteAircraftAction(aircraftId);

    if (result.success && currentStoreWaiver) {
      // If the deletion was successful on the server, update the local state
      const updatedAircraft = currentStoreWaiver.aircraft?.filter(
        (aircraft) => aircraft.id !== aircraftId
      );
      setCurrentStoreWaiver({
        ...currentStoreWaiver,
        aircraft: updatedAircraft as AircraftData[],
      });
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="flex flex-col md:flex-row md:space-x-4">
        <Card className="bg-white shadow-sm">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Aircraft Information</h2>
          </div>
          <div className="grid grid-cols-4 items-center gap-y-2 p-4">
            <Label className="text-sm font-medium text-gray-700">
              Tail Number <span className="text-red-500">*</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon className="h-3 w-3 ml-2 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm">
                      Enter the tail number of the aircraft. Must be ten (10) or
                      fewer alpha-numeric characters.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Input className="col-span-3 h-8" {...register("tailNumber")} />
            <Label className="text-sm font-medium text-gray-700">
              Call Sign <span className="text-red-500">*</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon className="h-3 w-3 ml-2 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm">
                      Enter the call sign of the aircraft. Must be seven (7) or
                      fewer alpha-numeric characters.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Input className="col-span-3 h-8" {...register("callSign")} />
            <Label className="text-sm font-medium text-gray-700">
              Aircraft Type <span className="text-red-500">*</span>
            </Label>
            <Input className="col-span-3 h-8" {...register("aircraftType")} />
            <Label className="text-sm font-medium text-gray-700">
              Country of Registration <span className="text-red-500">*</span>
            </Label>
            <Input className="col-span-3 h-8" {...register("registration")} />
            <Label className="text-sm font-medium text-gray-700">
              Gross Weight (lbs) <span className="text-red-500">*</span>
            </Label>
            <Input className="col-span-3 h-8" {...register("grossWeight")} />
            <div className="col-span-4 flex justify-center space-x-2">
              {editingId ? (
                <>
                  <Button
                    className="bg-green-600 hover:bg-green-700 text-white w-48 h-8"
                    onClick={handleSaveEdit}
                    disabled={!isSectionValid}
                  >
                    Edit Aircraft
                  </Button>
                  <Button
                    className="bg-slate-300 hover:bg-slate-400 text-gray-800 w-48 h-8"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white w-48 h-8"
                  onClick={handleAddAircraft}
                  disabled={!isSectionValid}
                >
                  Add Aircraft
                </Button>
              )}
            </div>
          </div>
        </Card>

        <Card className="bg-white shadow-sm">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">
              Import Aircraft Information
            </h2>
          </div>
          <div className="justify-items-center p-4">
            <p>Select an Aircraft Spreadsheet to Import</p>
            <p>The aircraft spreadsheet template can be downloaded here.</p>
            <div className="col-span-4 flex justify-center space-x-2">
              <Button className="h-8">
                <Upload />
                Import Aircraft
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* TODO:
        - add checkboxes to select items to delete
        - add Delete Selected/Delete All buttons
        - add sort features
      */}

      <Card className="bg-white shadow-sm">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Registered Aircraft</h2>
        </div>
        <div className="p-4">
          <Table className="bg-white rounded-lg border border-slate-200 shadow-sm">
            <TableHeader>
              <TableRow className="bg-slate-50/80">
                <TableHead className="py-2 px-4 text-slate-700">#</TableHead>
                <TableHead className="py-2 px-4 text-slate-700">
                  Tail Number
                </TableHead>
                <TableHead className="py-2 px-4 text-slate-700">
                  Call Sign
                </TableHead>
                <TableHead className="py-2 px-4 text-slate-700">
                  Aircraft Type
                </TableHead>
                <TableHead className="py-2 px-4 text-slate-700">
                  Country
                </TableHead>
                <TableHead className="py-2 px-4 text-slate-700">
                  Gross Weight (lb)
                </TableHead>
                <TableHead className="py-2 px-4 text-slate-700">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedAircraft.length > 0 ? (
                paginatedAircraft.map((aircraft, index) => (
                  <TableRow key={aircraft.id}>
                    <TableCell colSpan={1} className="h-20 text-slate-500">
                      <span className="text-sm">{indexOfFirstItem + index + 1}</span>
                    </TableCell>
                    <TableCell colSpan={1} className="h-20 text-slate-500">
                      <span className="text-sm">{aircraft.tailNumber}</span>
                    </TableCell>
                    <TableCell colSpan={1} className="h-20 text-slate-500">
                      <span className="text-sm">{aircraft.callSign}</span>
                    </TableCell>
                    <TableCell colSpan={1} className="h-20 text-slate-500">
                      <span className="text-sm">{aircraft.aircraftType}</span>
                    </TableCell>
                    <TableCell colSpan={1} className="h-20 text-slate-500">
                      <span className="text-sm">{aircraft.registration}</span>
                    </TableCell>
                    <TableCell colSpan={1} className="h-20 text-slate-500">
                      <span className="text-sm">{aircraft.grossWeight}</span>
                    </TableCell>
                    <TableCell colSpan={1} className="h-20 text-slate-500">
                      <div className="flex space-x-2 items-center">
                        <PencilIcon
                          className="h-5 w-5 cursor-pointer text-slate-500 hover:text-slate-700"
                          onClick={() => handleEditAircraft(aircraft.id)}
                        />
                        <Trash2Icon
                          className="h-5 w-5 cursor-pointer text-red-500 hover:text-red-600"
                          onClick={() => handleDeleteAircraft(aircraft.id)}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-20 text-center text-slate-500"
                  >
                    <span className="text-sm">No Registered Aircraft Found</span>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {currentStoreWaiver?.aircraft &&
            currentStoreWaiver.aircraft.length > itemsPerPage && (
              <div className="mt-4">
                <Pagination
                  totalItems={currentStoreWaiver.aircraft.length}
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                  className="text-sm"
                />
              </div>
            )}
        </div>
      </Card>
    </div>
  );
}
