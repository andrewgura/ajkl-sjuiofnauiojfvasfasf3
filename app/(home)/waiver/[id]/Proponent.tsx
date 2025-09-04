'use client';

import { useFormContext } from "react-hook-form";
import { WaiverFormData } from "./waiver-validation";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";
import { SimpleSelect } from "@/components/ui/simple-select";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { SimpleCheckbox2 } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";

const titles = [
  { value: "Mr.", label: "Mr." },
  { value: "Mrs.", label: "Mrs." },
  { value: "Ms.", label: "Ms." },
  { value: "Miss", label: "Miss" },
  { value: "Dr.", label: "Dr." },
];

export default function Proponent() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<WaiverFormData>();

  const opSameAsReq = watch("opSameAsReq");
  const ownSameAsReq = watch("ownSameAsReq");
  const ownSameAsOp = watch("ownSameAsOp");

  // Watch the requester's fields for real-time updates
  const requesterValues = watch([
    "reqTitle",
    "reqFirstName",
    "reqMiddleName",
    "reqLastName",
    "reqOrganization",
    "reqStreetAddress",
    "reqCity",
    "reqState",
    "reqZipCode",
    "reqCountry",
    "reqPrimaryPhone",
    "req24hPhone",
    "reqPrimaryEmail",
  ]);

  // Watch the operator's fields for real-time updates
  const operatorValues = watch([
    "opTitle",
    "opFirstName",
    "opMiddleName",
    "opLastName",
    "opOrganization",
    "opStreetAddress",
    "opCity",
    "opState",
    "opZipCode",
    "opCountry",
    "opPrimaryPhone",
    "op24hPhone",
    "opPrimaryEmail",
  ]);

  // This single useEffect hook handles all the "same as" logic
  // It watches the state of the checkboxes and the source field values.
  useEffect(() => {
    // Sync the Operator fields with the Requester fields
    if (opSameAsReq) {
      setValue("opTitle", requesterValues[0]);
      setValue("opFirstName", requesterValues[1]);
      setValue("opMiddleName", requesterValues[2]);
      setValue("opLastName", requesterValues[3]);
      setValue("opOrganization", requesterValues[4]);
      setValue("opStreetAddress", requesterValues[5]);
      setValue("opCity", requesterValues[6]);
      setValue("opState", requesterValues[7]);
      setValue("opZipCode", requesterValues[8]);
      setValue("opCountry", requesterValues[9]);
      setValue("opPrimaryPhone", requesterValues[10]);
      setValue("op24hPhone", requesterValues[11]);
      setValue("opPrimaryEmail", requesterValues[12]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opSameAsReq, setValue, ...requesterValues]); // The spread operator ensures the effect re-runs when any individual value changes

  // Sync the Owner fields with the Requester fields
  useEffect(() => {
    if (ownSameAsReq) {
      setValue("ownSameAsOp", false); // Uncheck the other owner option to avoid conflicts
      setValue("ownTitle", requesterValues[0]);
      setValue("ownFirstName", requesterValues[1]);
      setValue("ownMiddleName", requesterValues[2]);
      setValue("ownLastName", requesterValues[3]);
      setValue("ownOrganization", requesterValues[4]);
      setValue("ownStreetAddress", requesterValues[5]);
      setValue("ownCity", requesterValues[6]);
      setValue("ownState", requesterValues[7]);
      setValue("ownZipCode", requesterValues[8]);
      setValue("ownCountry", requesterValues[9]);
      setValue("ownPrimaryPhone", requesterValues[10]);
      setValue("own24hPhone", requesterValues[11]);
      setValue("ownPrimaryEmail", requesterValues[12]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ownSameAsReq, setValue, ...requesterValues]);

  // Sync the Owner fields with the Operator fields
  useEffect(() => {
    if (ownSameAsOp) {
      setValue("ownSameAsReq", false); // Uncheck the other owner option to avoid conflicts
      setValue("ownTitle", operatorValues[0]);
      setValue("ownFirstName", operatorValues[1]);
      setValue("ownMiddleName", operatorValues[2]);
      setValue("ownLastName", operatorValues[3]);
      setValue("ownOrganization", operatorValues[4]);
      setValue("ownStreetAddress", operatorValues[5]);
      setValue("ownCity", operatorValues[6]);
      setValue("ownState", operatorValues[7]);
      setValue("ownZipCode", operatorValues[8]);
      setValue("ownCountry", operatorValues[9]);
      setValue("ownPrimaryPhone", operatorValues[10]);
      setValue("own24hPhone", operatorValues[11]);
      setValue("ownPrimaryEmail", operatorValues[12]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ownSameAsOp, setValue, ...operatorValues]);

  const handleOwnerChange = () => {
    if (ownSameAsReq) {
      setValue("ownSameAsReq", false);
    }
    if (ownSameAsOp) {
      setValue("ownSameAsOp", false);
    }
  };

  const handleOperatorChange = () => {
    if (opSameAsReq) {
      setValue("opSameAsReq", false);
    }
  };

  return (
    <div>
      <p className="text-sm bg-yellow-100 p-1">
        Reminder: Please do not submit request information in all capital-case.
      </p>
      <p className="text-sm p-1 mb-2">
        For all waiver types, please provide the information for the requester
        (person submitting this form) and aircraft operator. Aircraft owner is
        only required for international requests.
      </p>

      <Card>
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Proponent Information</h2>
        </div>
        <div className="grid grid-cols-7 gap-x-5 gap-y-1 items-center p-4">
          <div></div>
          <div className="justify-items-center font-semibold col-span-2 ">
            <div className="justify-items-center">
              Requester
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon className="h-4 w-4 ml-2 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm">
                      Enter contact information for yourself as the creator of
                      this request.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <div className="justify-items-center font-semibold col-span-2">
            <div className="justify-items-center">
              Aircraft Operator
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon className="h-4 w-4 ml-2 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm">
                      Enter contact information of the person, or point of
                      contact of the company, that will be operating the
                      aircraft.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <div className="justify-items-center font-semibold col-span-2">
            <div className="justify-items-center">
              Aircraft Owner
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon className="h-4 w-4 ml-2 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm">
                      Enter contact information for the person, or point of
                      contact of the company, that is legally and/or financially
                      responsible for the aircraft in this request (required
                      only for International requests).
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <Label className="text-sm font-medium text-gray-700">
            Title <span className="text-red-500">*</span>
          </Label>
          <SimpleSelect
            options={titles}
            className="col-span-2"
            {...register("reqTitle")}
          />
          <SimpleSelect
            options={titles}
            className="col-span-2"
            {...register("opTitle")}
            onChange={handleOperatorChange}
          />
          <SimpleSelect
            options={titles}
            className="col-span-2"
            {...register("ownTitle")}
            onChange={handleOwnerChange}
          />

          <Label className="text-sm font-medium text-gray-700">
            First Name <span className="text-red-500">*</span>
          </Label>
          <Input className="col-span-2" {...register("reqFirstName")} />
          <Input className="col-span-2 p-0" {...register("opFirstName")} onChange={handleOperatorChange} />
          <Input className="col-span-2 p-0" {...register("ownFirstName")} onChange={handleOwnerChange} />

          <Label className="text-sm font-medium text-gray-700">
            Middle Name
          </Label>
          <Input className="col-span-2" {...register("reqMiddleName")} />
          <Input className="col-span-2 p-0" {...register("opMiddleName")} onChange={handleOperatorChange} />
          <Input className="col-span-2 p-0" {...register("ownMiddleName")} onChange={handleOwnerChange} />

          <Label className="text-sm font-medium text-gray-700">
            Last Name <span className="text-red-500">*</span>
          </Label>
          <Input className="col-span-2" {...register("reqLastName")} />
          <Input className="col-span-2 p-0" {...register("opLastName")} onChange={handleOperatorChange} />
          <Input className="col-span-2 p-0" {...register("ownLastName")} onChange={handleOwnerChange} />

          <Label className="text-sm font-medium text-gray-700">
            Organization/Company <span className="text-red-500">*</span>
          </Label>
          <Input className="col-span-2" {...register("reqOrganization")} />
          <Input className="col-span-2" {...register("opOrganization")} onChange={handleOperatorChange} />
          <Input className="col-span-2" {...register("ownOrganization")} onChange={handleOwnerChange} />

          <Label className="text-sm font-medium text-gray-700">
            Street Address <span className="text-red-500">*</span>
          </Label>
          <Input className="col-span-2" {...register("reqStreetAddress")} />
          <Input className="col-span-2" {...register("opStreetAddress")} onChange={handleOperatorChange} />
          <Input className="col-span-2" {...register("ownStreetAddress")} onChange={handleOwnerChange} />

          <Label className="text-sm font-medium text-gray-700">
            City <span className="text-red-500">*</span>
          </Label>
          <Input className="col-span-2" {...register("reqCity")} />
          <Input className="col-span-2" {...register("opCity")} onChange={handleOperatorChange} />
          <Input className="col-span-2" {...register("ownCity")} onChange={handleOwnerChange} />

          <Label className="text-sm font-medium text-gray-700">
            State/Province
          </Label>
          <Input className="col-span-2" {...register("reqState")} />
          <Input className="col-span-2" {...register("opState")} onChange={handleOperatorChange} />
          <Input className="col-span-2" {...register("ownState")} onChange={handleOwnerChange} />

          <Label className="text-sm font-medium text-gray-700">
            Zip Code <span className="text-red-500">*</span>
          </Label>
          <Input className="col-span-2" {...register("reqZipCode")} />
          <Input className="col-span-2" {...register("opZipCode")} onChange={handleOperatorChange} />
          <Input className="col-span-2" {...register("ownZipCode")} onChange={handleOwnerChange} />

          <Label className="text-sm font-medium text-gray-700">
            Country <span className="text-red-500">*</span>
          </Label>
          <Input className="col-span-2" {...register("reqCountry")} />
          <Input className="col-span-2" {...register("opCountry")} onChange={handleOperatorChange} />
          <Input className="col-span-2" {...register("ownCountry")} onChange={handleOwnerChange} />

          <Label className="text-sm font-medium text-gray-700">
            Phone <span className="text-red-500">*</span>
          </Label>
          <Input className="col-span-2" {...register("reqPrimaryPhone")} />
          <Input className="col-span-2" {...register("opPrimaryPhone")} onChange={handleOperatorChange} />
          <Input className="col-span-2" {...register("ownPrimaryPhone")} onChange={handleOwnerChange} />

          <Label className="text-sm font-medium text-gray-700">
            24-hour Phone <span className="text-red-500">*</span>
          </Label>
          <Input className="col-span-2" {...register("req24hPhone")} />
          <Input className="col-span-2" {...register("op24hPhone")} onChange={handleOperatorChange} />
          <Input className="col-span-2" {...register("own24hPhone")} onChange={handleOwnerChange} />

          <Label className="text-sm font-medium text-gray-700">
            Primary Email <span className="text-red-500">*</span>
          </Label>
          <Input className="col-span-2" {...register("reqPrimaryEmail")} />
          <Input className="col-span-2" {...register("opPrimaryEmail")} onChange={handleOperatorChange} />
          <Input className="col-span-2" {...register("ownPrimaryEmail")} onChange={handleOwnerChange} />

          <div className="col-span-3"></div>
          <div className="col-span-2 justify-items-center">
            <div className="justify-items-center">
              <SimpleCheckbox2
                label="Same as Requester"
                {...register("opSameAsReq")}
              />
            </div>
          </div>
          <div className="col-span-2 justify-items-center">
            <div className="justify-items-left">
              <SimpleCheckbox2
                label="Same as Requester"
                id="ownerIsReq"
                disabled={ownSameAsOp}
                {...register("ownSameAsReq")}
              />
              <SimpleCheckbox2
                label="Same as Operator"
                id="ownerIsOpertor"
                disabled={ownSameAsReq}
                {...register("ownSameAsOp")}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
