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
import { useWaiverStore } from "@/lib/stores/useWaiverStore";
import {
  upsertAircraftAction,
  deleteAircraftAction,
} from "@/lib/actions/waiver/waiver-actions";
import Pagination from "@/components/shared/Pagination";
import { AircraftUnmannedData } from "@/lib/actions/waiver/waiver-types";
import { fromUnmannedAircraftFormData } from "@/lib/utils/waiver-utils";

export default function UnmannedAircraft() {
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
    "callSign",
    "uasType",
    "faaRegistration",
    "makeAndModel",
    "grossWeight",
    "uasCraftId",
    "transmitterId",
    "remoteId",
  ]);

  // Check if all required form fields are filled
  const isSectionValid = aircraftValues.every((value) => !!value);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedAircraft = useMemo(() => {
    // Use a memoized value to avoid re-slicing on every render
    const aircraftList = (currentStoreWaiver?.aircraft || []) as AircraftUnmannedData[];
    return aircraftList.slice(indexOfFirstItem, indexOfLastItem);
  }, [currentStoreWaiver?.aircraft, indexOfFirstItem, indexOfLastItem]);

  // Handler for page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  /**
   * Adds a new unmanned aircraft and persists it to the server.
   * Resets the form after successful addition.
   */
  const handleAddAircraft = async () => {
    const allFormValues = getValues();
    const aircraftData = fromUnmannedAircraftFormData(allFormValues);
    aircraftData.confirmation = currentStoreWaiver?.confirmation ?? "";

    // Call the server action to save the new aircraft, with the uas flag set to true
    const result = await upsertAircraftAction(aircraftData, true);

    if (currentStoreWaiver) {
      // Update the store with the new aircraft list from the server's response
      const updatedAircraft = [
        ...(currentStoreWaiver.aircraft || []),
        ...(result.aircraft ? [result.aircraft] : []),
      ];

      setCurrentStoreWaiver({
        ...currentStoreWaiver,
        aircraft: updatedAircraft as AircraftUnmannedData[],
      });

      handleCancelEdit();
    }
  };

  /**
   * Populates the form fields for editing an existing unmanned aircraft.
   * @param aircraftId The ID of the aircraft to edit.
   */
  const handleEditAircraft = (aircraftId: string) => {
    const aircraftToEdit = currentStoreWaiver?.aircraft?.find(
      (a) => a.id === aircraftId
    ) as AircraftUnmannedData;
    if (aircraftToEdit) {
      // Populate the form fields with the selected aircraft's data
      setValue("callSign", aircraftToEdit.callSign);
      setValue("uasType", aircraftToEdit.uasType);
      setValue("faaRegistration", aircraftToEdit.faaRegistration);
      setValue("makeAndModel", aircraftToEdit.makeAndModel);
      setValue("grossWeight", aircraftToEdit.grossWeight);
      setValue("uasCraftId", aircraftToEdit.uasCraftId);
      setValue("transmitterId", aircraftToEdit.transmitterId);
      setValue("remoteId", aircraftToEdit.remoteId);
      setEditingId(aircraftId); // Enter edit mode
    }
  };

  /**
   * Saves the edits to an existing unmanned aircraft by calling the server action.
   */
  const handleSaveEdit = async () => {
    if (editingId && currentStoreWaiver) {
      const allFormValues = getValues();
      const aircraftData = fromUnmannedAircraftFormData(allFormValues);
      aircraftData.id = editingId; // Pass the ID of the aircraft to be updated
      aircraftData.confirmation = currentStoreWaiver?.confirmation ?? "";
      aircraftData.waiverId = currentStoreWaiver?.waiverId ?? "";

      // Call the server action to update the existing unmanned aircraft, with the uas flag set to true
      const result = await upsertAircraftAction(aircraftData, true);

      if (currentStoreWaiver) {
        // Update the store with the server's response
        const updatedAircraft = currentStoreWaiver.aircraft?.map((aircraft) =>
          aircraft.id === editingId
            ? result.aircraft ?? aircraft // Replace the old object with the new one from the server
            : aircraft
        );
        setCurrentStoreWaiver({
          ...currentStoreWaiver,
          aircraft: updatedAircraft as AircraftUnmannedData[],
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
    setValue("callSign", "");
    setValue("uasType", "");
    setValue("faaRegistration", "");
    setValue("makeAndModel", "");
    setValue("grossWeight", 0);
    setValue("uasCraftId", "");
    setValue("transmitterId", "");
    setValue("remoteId", "");
    setEditingId(null);
  };

  /**
   * Deletes an unmanned aircraft from both the server and the local state.
   * @param aircraftId The ID of the unmanned aircraft to delete.
   */
  const handleDeleteAircraft = async (aircraftId: string) => {
    // Call the server action to delete the aircraft, with the uas flag set to true
    const result = await deleteAircraftAction(aircraftId, true);

    if (result.success && currentStoreWaiver) {
      // If the deletion was successful on the server, update the local state
      const updatedAircraft = currentStoreWaiver.aircraft?.filter(
        (aircraft) => aircraft.id !== aircraftId
      );
      setCurrentStoreWaiver({
        ...currentStoreWaiver,
        aircraft: updatedAircraft as AircraftUnmannedData[],
      });
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="flex flex-col md:flex-row md:space-x-4">
        <Card className="bg-white shadow-sm">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">
              Unmanned Aircraft Information
            </h2>
          </div>
          <div className="grid grid-cols-4 items-center gap-y-2 p-4">
            <Label className="text-sm font-medium text-gray-700">
              UAS Type <span className="text-red-500">*</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon className="h-3 w-3 ml-2 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm">
                      Enter the type of Unmanned Aircraft.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Input className="col-span-3 h-8" {...register("uasType")} />
            <Label className="text-sm font-medium text-gray-700">
              FAA Registration <span className="text-red-500">*</span>
            </Label>
            <Input className="col-span-3 h-8" {...register("faaRegistration")} />
            <Label className="text-sm font-medium text-gray-700">
              Call Sign <span className="text-red-500">*</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon className="h-3 w-3 ml-2 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm">
                      Enter the call sign of the unmanned aircraft. Must be seven
                      (7) or fewer alpha-numeric characters.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Input className="col-span-3 h-8" {...register("callSign")} />
            <Label className="text-sm font-medium text-gray-700">
              Make and Model <span className="text-red-500">*</span>
            </Label>
            <Input className="col-span-3 h-8" {...register("makeAndModel")} />
            <Label className="text-sm font-medium text-gray-700">
              Gross Weight (lbs) <span className="text-red-500">*</span>
            </Label>
            <Input className="col-span-3 h-8" {...register("grossWeight")} />
            <Label className="text-sm font-medium text-gray-700">
              UAS Craft ID <span className="text-red-500">*</span>
            </Label>
            <Input className="col-span-3 h-8" {...register("uasCraftId")} />
            <Label className="text-sm font-medium text-gray-700">
              Transmitter ID <span className="text-red-500">*</span>
            </Label>
            <Input className="col-span-3 h-8" {...register("transmitterId")} />
            <Label className="text-sm font-medium text-gray-700">
              Remote ID <span className="text-red-500">*</span>
            </Label>
            <Input className="col-span-3 h-8" {...register("remoteId")} />
            <div className="col-span-4 flex justify-center space-x-2">
              {editingId ? (
                <>
                  <Button
                    className="bg-green-600 hover:bg-green-700 text-white w-48 h-8"
                    onClick={handleSaveEdit}
                    disabled={!isSectionValid}
                  >
                    Edit Unmanned Aircraft
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
                  Add Unmanned Aircraft
                </Button>
              )}
            </div>
          </div>
        </Card>

        <Card className="bg-white shadow-sm">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">
              Import Unmanned Aircraft Information
            </h2>
          </div>
          <div className="justify-items-center p-4">
            <p>Select an Unmanned Aircraft Spreadsheet to Import</p>
            <p>
              The unmanned aircraft spreadsheet template can be downloaded here.
            </p>
            <div className="col-span-4 flex justify-center space-x-2">
              <Button className="h-8">
                <Upload />
                Import Unmanned Aircraft
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <Card className="bg-white shadow-sm">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Registered Unmanned Aircraft</h2>
        </div>
        <div className="p-4">
          <Table className="bg-white rounded-lg border border-slate-200 shadow-sm">
            <TableHeader>
              <TableRow className="bg-slate-50/80">
                <TableHead className="py-2 px-4 text-slate-700">#</TableHead>
                <TableHead className="py-2 px-4 text-slate-700">UAS Type</TableHead>
                <TableHead className="py-2 px-4 text-slate-700">
                  FAA Registration
                </TableHead>
                <TableHead className="py-2 px-4 text-slate-700">
                  Call Sign
                </TableHead>
                <TableHead className="py-2 px-4 text-slate-700">
                  Make and Model
                </TableHead>
                <TableHead className="py-2 px-4 text-slate-700">
                  Gross Weight (lbs)
                </TableHead>
                <TableHead className="py-2 px-4 text-slate-700">
                  UAS Craft ID
                </TableHead>
                <TableHead className="py-2 px-4 text-slate-700">
                  Transmitter ID
                </TableHead>
                <TableHead className="py-2 px-4 text-slate-700">
                  Remote ID
                </TableHead>
                <TableHead className="py-2 px-4 text-slate-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedAircraft.length > 0 ? (
                paginatedAircraft.map((aircraft, index) => (
                  <TableRow key={aircraft.id}>
                    <TableCell colSpan={1} className="h-20 text-slate-500">
                      <span className="text-sm">
                        {indexOfFirstItem + index + 1}
                      </span>
                    </TableCell>
                    <TableCell colSpan={1} className="h-20 text-slate-500">
                      <span className="text-sm">{aircraft.uasType}</span>
                    </TableCell>
                    <TableCell colSpan={1} className="h-20 text-slate-500">
                      <span className="text-sm">{aircraft.faaRegistration}</span>
                    </TableCell>
                    <TableCell colSpan={1} className="h-20 text-slate-500">
                      <span className="text-sm">{aircraft.callSign}</span>
                    </TableCell>
                    <TableCell colSpan={1} className="h-20 text-slate-500">
                      <span className="text-sm">{aircraft.makeAndModel}</span>
                    </TableCell>
                    <TableCell colSpan={1} className="h-20 text-slate-500">
                      <span className="text-sm">{aircraft.grossWeight}</span>
                    </TableCell>
                    <TableCell colSpan={1} className="h-20 text-slate-500">
                      <span className="text-sm">{aircraft.uasCraftId}</span>
                    </TableCell>
                    <TableCell colSpan={1} className="h-20 text-slate-500">
                      <span className="text-sm">{aircraft.transmitterId}</span>
                    </TableCell>
                    <TableCell colSpan={1} className="h-20 text-slate-500">
                      <span className="text-sm">{aircraft.remoteId}</span>
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
                    colSpan={10}
                    className="h-20 text-center text-slate-500"
                  >
                    <span className="text-sm">
                      No Registered Unmanned Aircraft Found
                    </span>
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
