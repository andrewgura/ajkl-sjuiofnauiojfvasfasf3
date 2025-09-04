'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { WaiverFormData, waiverFormSchema } from "./waiver-validation";

export const waiverFormDefaultValues = {
  reqFirstName: "",
  reqLastName: "",
  reqOrganization: "",
  reqStreetAddress: "",
  reqCity: "",
  reqZipCode: "",
  reqCountry: "",
  reqPrimaryPhone: "",
  req24hPhone: "",
  reqPrimaryEmail: "",
  opFirstName: "",
  opLastName: "",
  opOrganization: "",
  opStreetAddress: "",
  opCity: "",
  opZipCode: "",
  opCountry: "",
  opPrimaryPhone: "",
  op24hPhone: "",
  opPrimaryEmail: "",
  applicationDate: "",
  startDate: "",
  endDate: "",
  deptDate: "",
  arrivDate: "",
  deptDateDca: "",
  waiverType: "",
  waiverSubtype: "",
  purposeComments: "",
  tailNumber: "",
  callSign: "",
  aircraftType: "",
  registration: "",
  grossWeight: 0,
  personType: "",
  firstName: "",
  lastName: "",
  //birthDate: new Date,
  birthCity: "",
  birthCntry: "",
  secSecured: "",
  secManifest: "",
  secName: "",
  secTitle: "",
  secDate: "",
  secAccepted: false,
}

export const useWaiverForm = (
  formOptions: { mode?: 'onBlur' | 'onChange' | 'onSubmit' | 'onTouched' | 'all' } = {},
  defaultValues?: Partial<WaiverFormData>,
) => {
  return useForm<WaiverFormData>({
    resolver: zodResolver(waiverFormSchema),
    defaultValues: {
      ...waiverFormDefaultValues,
      ...defaultValues,
    },
    ...formOptions,
  });
};
