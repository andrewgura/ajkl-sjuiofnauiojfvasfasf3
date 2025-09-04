"use client";

import React, { useState, useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { WaiverFormData } from "./waiver-validation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PencilIcon, Trash2Icon, Upload, UserPlus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Section } from "@/components/shared/Section";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SimpleSelect } from "@/components/ui/simple-select";
import { useWaiverStore } from "@/lib/stores/useWaiverStore";
import {
  upsertManifestAction,
  deleteManifestAction,
} from "@/lib/actions/waiver/waiver-actions";
import Pagination from "@/components/shared/Pagination";
import { fromManifestFormData } from "@/lib/utils/waiver-utils";
import DateInput2 from "@/components/shared/DateInput2";

const personTypes = [
  { value: "Pilot", label: "Pilot" },
  { value: "Crew", label: "Crew" },
  {
    value: "ASO",
    label: "Armed Security Officer (AS0)",
  },
  { value: "Skydiver", label: "Skydiver" },
  { value: "Passenger", label: "Passenger" },
  {
    value: "LEO",
    label: "Law Enforcement Officer (LEO)",
  },
];

const sexes = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

const kdcaDirections = [
  { value: "arrive", label: "Arrival" },
  { value: "depart", label: "Departure" },
  { value: "both", label: "Both" },
];

export default function Manifest() {
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
  const itemsPerPage = 5; // Define how many manifests per page

  // Watch form values to enable/disable the 'Add Manifest' button
  const manifestValues = watch([
    "personType",
    "firstName",
    "lastName",
    "birthDate",
    "birthCity",
    "birthCntry",
  ]);

  // Check if all required form fields are filled
  const isSectionValid = manifestValues.every((value) => !!value);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedManifest = useMemo(() => {
    // Use a memoized value to avoid re-slicing on every render
    const manifestList = currentStoreWaiver?.manifest || [];
    return manifestList.slice(indexOfFirstItem, indexOfLastItem);
  }, [currentStoreWaiver?.manifest, indexOfFirstItem, indexOfLastItem]);

  // Handler for page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  /**
   * Adds a new manifest and persists it to the server.
   * Resets the form after successful addition.
   */
  const handleAddManifest = async () => {
    const allFormValues = getValues();
    const manifestData = fromManifestFormData(allFormValues);
    manifestData.confirmation = currentStoreWaiver?.confirmation ?? "";
    manifestData.waiverId = currentStoreWaiver?.waiverId ?? "";

    // Call the server action to save the new manifest
    const result = await upsertManifestAction(manifestData);

    if (currentStoreWaiver) {
      // Update the store with the new manifest list from the server's response
      const updatedManifest = [
        ...(currentStoreWaiver.manifest || []),
        ...(result.manifest ? [result.manifest] : []),
      ];

      setCurrentStoreWaiver({
        ...currentStoreWaiver,
        manifest: updatedManifest,
      });

      handleCancelEdit();
    }
  };

  /**
   * Populates the form fields for editing an existing manifest.
   * @param personId The ID of the manifest to edit.
   */
  const handleEditManifest = (personId: string) => {
    const manifestToEdit = currentStoreWaiver?.manifest?.find(
      (m) => m.personId === personId
    );
    if (manifestToEdit) {
      // Populate the form fields with the selected manifest's data
      setValue("personType", manifestToEdit.personType);
      setValue("firstName", manifestToEdit.firstName);
      setValue("middleName", manifestToEdit.middleName);
      setValue("lastName", manifestToEdit.lastName);
      setValue("birthDate", manifestToEdit.birthDate);
      setValue("birthCity", manifestToEdit.birthCity);
      setValue("birthState", manifestToEdit.birthState);
      setValue("birthCntry", manifestToEdit.birthCntry);
      setValue("sex", manifestToEdit.sex);
      setValue("ssn", manifestToEdit.ssn);
      setValue("passportNmbr", manifestToEdit.passportNmbr);
      setValue("passportCntry", manifestToEdit.passportCntry);
      setValue("pilotCertNmbr", manifestToEdit.pilotCertNmbr);
      setValue("pilotCertCntry", manifestToEdit.pilotCertCntry);
      setValue("asoCredential", manifestToEdit.asoCredential);
      setValue("passengerDca", manifestToEdit.passengerDca);
      setValue("aso", manifestToEdit.aso);
      setValue("leoBadgeNumber", manifestToEdit.leoBadgeNumber);
      setValue("leoJurisdiction", manifestToEdit.leoJurisdiction);
      setEditingId(personId); // Enter edit mode
    }
  };

  /**
   * Saves the edits to an existing manifest by calling the server action.
   */
  const handleSaveEdit = async () => {
    if (editingId && currentStoreWaiver) {
      const allFormValues = getValues();
      const manifestData = fromManifestFormData(allFormValues);
      manifestData.personId = editingId; // Pass the ID of the manifest to be updated
      manifestData.confirmation = currentStoreWaiver?.confirmation ?? "";
      manifestData.waiverId = currentStoreWaiver?.waiverId ?? "";

      // Call the server action to update the existing manifest
      const result = await upsertManifestAction(manifestData);

      if (currentStoreWaiver) {
        // Update the store with the server's response
        const updatedManifest = currentStoreWaiver.manifest?.map((manifest) =>
          manifest.personId === editingId
            ? result.manifest ?? manifest // Replace the old object with the new one from the server
            : manifest
        );
        setCurrentStoreWaiver({
          ...currentStoreWaiver,
          manifest: updatedManifest,
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
    setValue("personType", "");
    setValue("firstName", "");
    setValue("middleName", "");
    setValue("lastName", "");
    setValue("birthDate", "");
    setValue("birthCity", "");
    setValue("birthState", "");
    setValue("birthCntry", "");
    setValue("sex", "");
    setValue("ssn", "");
    setValue("passportNmbr", "");
    setValue("passportCntry", "");
    setValue("pilotCertNmbr", "");
    setValue("pilotCertCntry", "");
    setValue("asoCredential", "");
    setValue("passengerDca", "");
    setValue("aso", "");
    setValue("leoBadgeNumber", "");
    setValue("leoJurisdiction", "");
    setEditingId(null);
  };

  /**
   * Deletes a manifest from both the server and the local state.
   * @param personId The ID of the manifest to delete.
   */
  const handleDeleteManifest = async (personId: string) => {
    // Call the server action to delete the manifest
    const result = await deleteManifestAction(personId);

    if (result.success && currentStoreWaiver) {
      // If the deletion was successful on the server, update the local state
      const updatedManifest = currentStoreWaiver.manifest?.filter(
        (manifest) => manifest.personId !== personId
      );
      setCurrentStoreWaiver({
        ...currentStoreWaiver,
        manifest: updatedManifest,
      });
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="flex flex-col md:flex-row md:space-x-4">
        <Card className="bg-white shadow-sm">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">
              Individual Information
            </h2>
          </div>
          <div className="p-4 space-y-3">
            <Section title="Person Information">
              <div className="grid grid-cols-4 items-center gap-x-4 gap-y-2">
                <div>
                  <Label className="text-sm font-medium text-gray-700 px-1">
                    Person Type <span className="text-red-500">*</span>
                  </Label>
                  <SimpleSelect
                    options={personTypes}
                    className="h-8 -mt-1 px-0 py-1"
                    {...register("personType")}
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 px-1">
                    First Name <span className="text-red-500">*</span>
                  </Label>
                  <Input className="h-8 -mt-1" {...register("firstName")} />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 px-1">
                    Last Name <span className="text-red-500">*</span>
                  </Label>
                  <Input className="h-8 -mt-1" {...register("lastName")} />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 px-1">
                    Middle Name
                  </Label>
                  <Input className="h-8 -mt-1" {...register("middleName")} />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 px-1">
                    Birth Date <span className="text-red-500">*</span>
                  </Label>
                  {/* <Input className="h-8 -mt-1" {...register("birthDate")} /> */}
                  <DateInput2 className="h-8" value={watch("birthDate")} {...register("birthDate")} />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 px-1">
                    Birth City <span className="text-red-500">*</span>
                  </Label>
                  <Input className="h-8 -mt-1" {...register("birthCity")} />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 px-1">
                    Birth State
                  </Label>
                  <Input className="h-8 -mt-1" {...register("birthState")} />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 px-1">
                    Birth Country <span className="text-red-500">*</span>
                  </Label>
                  <Input className="h-8 -mt-1" {...register("birthCntry")} />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 px-1">
                    Sex
                  </Label>
                  <SimpleSelect
                    options={sexes}
                    className="h-8 -mt-1"
                    {...register("sex")}
                  />
                </div>
              </div>
            </Section>

            <Section title="Documentation">
              <div className="grid grid-cols-5 items-center gap-x-4 gap-y-2">
                <div className="col-span-2">
                  <Label className="text-sm font-medium text-gray-700 px-1">
                    Social Security Number
                  </Label>
                  <Input className="h-8 -mt-1" {...register("ssn")} />
                </div>

                <div className="text-center">OR</div>

                <div className="col-span-2">
                  <Label className="text-sm font-medium text-gray-700 px-1">
                    Passport Number
                  </Label>
                  <Input className="h-8 -mt-1" {...register("passportNmbr")} />
                  <Label className="text-sm font-medium text-gray-700 px-1">
                    Passport Issuing Country
                  </Label>
                  <Input className="h-8 -mt-1" {...register("passportCntry")} />
                </div>
              </div>
            </Section>

            {/* Conditional sections for different person types */}
            {watch("personType") === "Pilot" && (
              <div id="pilot-info">
                <Section title="Pilot Information">
                  <div className="grid grid-cols-2 items-center gap-x-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700 px-1">
                        Pilot Certification Number
                      </Label>
                      <Input
                        className="h-8 -mt-1"
                        {...register("pilotCertNmbr")}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700 px-1">
                        Pilot Certification Country
                      </Label>
                      <Input
                        className="h-8 -mt-1"
                        {...register("pilotCertCntry")}
                      />
                    </div>
                  </div>
                </Section>
              </div>
            )}

            {(watch("personType") === "ASO" ||
              watch("personType") === "LEO") && (
              <div id="aso-info">
                <Section title="Armed Security Officer/LEO Information">
                  <div className="grid grid-cols-2 items-center gap-x-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700 px-1">
                        TSA Credential Number
                      </Label>
                      <Input
                        className="h-8 -mt-1"
                        {...register("asoCredential")}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700 px-1">
                        DCA/ASO Direction
                      </Label>
                      <SimpleSelect
                        options={kdcaDirections}
                        className="h-8 -mt-1"
                        {...register("passengerDca")}
                      />
                    </div>
                  </div>
                </Section>
              </div>
            )}

            <div className="col-span-4 flex justify-center space-x-2">
              {editingId ? (
                <>
                  <Button
                    className="bg-green-600 hover:bg-green-700 text-white w-48 h-8"
                    onClick={handleSaveEdit}
                    disabled={!isSectionValid}
                  >
                    Edit Manifest
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
                  onClick={handleAddManifest}
                  disabled={!isSectionValid}
                >
                  <UserPlus className="mr-2" /> Add to Manifest
                </Button>
              )}
            </div>
          </div>
        </Card>

        <Card className="bg-white shadow-sm">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">
              Import Manifest Information
            </h2>
          </div>
          <div className="justify-items-center p-4">
            <p>Select a Manifest Spreadsheet to Import</p>
            <p>The manifest spreadsheet template can be downloaded here.</p>
            <Button className="h-8">
              <Upload className="mr-2" />
              Import Manifest
            </Button>
          </div>
        </Card>
      </div>

      <Card className="bg-white shadow-sm">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Manifest</h2>
        </div>
        <div className="p-4">
          <Table className="bg-white rounded-lg border border-slate-200 shadow-sm">
            <TableHeader>
              <TableRow className="bg-slate-50/80">
                <TableHead className="py-2 px-4 text-slate-700">#</TableHead>
                <TableHead className="py-2 px-4 text-slate-700">
                  Person Type
                </TableHead>
                <TableHead className="py-2 px-4 text-slate-700">
                  First Name
                </TableHead>
                <TableHead className="py-2 px-4 text-slate-700">M.I.</TableHead>
                <TableHead className="py-2 px-4 text-slate-700">
                  Last Name
                </TableHead>
                <TableHead className="py-2 px-4 text-slate-700">Sex</TableHead>
                <TableHead className="py-2 px-4 text-slate-700">
                  Birth Date
                </TableHead>
                <TableHead className="py-2 px-4 text-slate-700">
                  Birth City
                </TableHead>
                <TableHead className="py-2 px-4 text-slate-700">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedManifest.length > 0 ? (
                paginatedManifest.map((manifest, index) => (
                  <TableRow key={manifest.personId}>
                    <TableCell colSpan={1} className="h-20 text-slate-500">
                      <span className="text-sm">
                        {indexOfFirstItem + index + 1}
                      </span>
                    </TableCell>
                    <TableCell colSpan={1} className="h-20 text-slate-500">
                      <span className="text-sm">{manifest.personType}</span>
                    </TableCell>
                    <TableCell colSpan={1} className="h-20 text-slate-500">
                      <span className="text-sm">{manifest.firstName}</span>
                    </TableCell>
                    <TableCell colSpan={1} className="h-20 text-slate-500">
                      <span className="text-sm">{manifest.middleName}</span>
                    </TableCell>
                    <TableCell colSpan={1} className="h-20 text-slate-500">
                      <span className="text-sm">{manifest.lastName}</span>
                    </TableCell>
                    <TableCell colSpan={1} className="h-20 text-slate-500">
                      <span className="text-sm">{manifest.sex}</span>
                    </TableCell>
                    <TableCell colSpan={1} className="h-20 text-slate-500">
                      <span className="text-sm">{manifest.birthDate}</span>
                    </TableCell>
                    <TableCell colSpan={1} className="h-20 text-slate-500">
                      <span className="text-sm">{manifest.birthCity}</span>
                    </TableCell>
                    <TableCell colSpan={1} className="h-20 text-slate-500">
                      <div className="flex space-x-2 items-center">
                        <PencilIcon
                          className="h-5 w-5 cursor-pointer text-slate-500 hover:text-slate-700"
                          onClick={() => handleEditManifest(manifest.personId)}
                        />
                        <Trash2Icon
                          className="h-5 w-5 cursor-pointer text-red-500 hover:text-red-600"
                          onClick={() =>
                            handleDeleteManifest(manifest.personId)
                          }
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="h-20 text-center text-slate-500"
                  >
                    <span className="text-sm">
                      No Manifest Information Found
                    </span>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {currentStoreWaiver?.manifest &&
            currentStoreWaiver.manifest.length > itemsPerPage && (
              <div className="mt-4">
                <Pagination
                  totalItems={currentStoreWaiver.manifest.length}
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
