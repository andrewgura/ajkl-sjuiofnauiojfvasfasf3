import { WaiverFormData } from "@/app/(home)/waiver/[id]/waiver-validation";
import { AircraftData, AircraftUnmannedData, GroupedWaivers, ManifestData, Proponent, Proponents, WaiverData, WaiverRecord } from "../actions/waiver/waiver-types";
import { waiverFormDefaultValues } from "@/app/(home)/waiver/[id]/waiver-config";
import { formatDateForForm } from "./conversion-utils";

export const fromWaiverFormData = (waiverFormData: WaiverFormData): WaiverData => {
  console.log('waiverFormData', waiverFormData);
  const requester: Proponent = {
    title: waiverFormData.reqTitle,
    firstNm: waiverFormData.reqFirstName,
    lastNm:  waiverFormData.reqLastName,
    middleNm: waiverFormData.reqMiddleName,
    company: waiverFormData.reqOrganization,
    address: waiverFormData.reqStreetAddress,
    city: waiverFormData.reqCity,
    state: waiverFormData.reqState,
    country: waiverFormData.reqCountry,
    zip: waiverFormData.reqZipCode,
    phone: waiverFormData.reqPrimaryPhone,
    phone_24hr: waiverFormData.req24hPhone,
    // fax: waiverFormData.reqfax
    email: waiverFormData.reqPrimaryEmail,
    rtype: 'REQUESTOR',
    operator: waiverFormData.opSameAsReq,
    owner: waiverFormData.ownSameAsReq
  };
  const proponents: Proponent[] = [requester];

  if (waiverFormData.opSameAsReq) {
    // Do nothing, skip adding an operator separately
  } else {
    const operator: Proponent = {
      title: waiverFormData.opTitle,
      firstNm: waiverFormData.opFirstName,
      lastNm:  waiverFormData.opLastName,
      middleNm: waiverFormData.opMiddleName,
      company: waiverFormData.opOrganization,
      address: waiverFormData.opStreetAddress,
      city: waiverFormData.opCity,
      state: waiverFormData.opState,
      country: waiverFormData.opCountry,
      zip: waiverFormData.opZipCode,
      phone: waiverFormData.opPrimaryPhone,
      phone_24hr: waiverFormData.op24hPhone,
      // fax: waiverFormData.opfax
      email: waiverFormData.opPrimaryEmail,
      rtype: 'OPERATOR',
      owner: waiverFormData.ownSameAsOp
    }

    proponents.push(operator);
  }

  if (waiverFormData.ownSameAsReq || waiverFormData.ownSameAsOp) {
    // do nothing, skip adding an owner separately
  } else {
    const owner: Proponent = {
      title: waiverFormData.ownTitle,
      firstNm: waiverFormData.ownFirstName,
      lastNm:  waiverFormData.ownLastName,
      middleNm: waiverFormData.ownMiddleName,
      company: waiverFormData.ownOrganization,
      address: waiverFormData.ownStreetAddress,
      city: waiverFormData.ownCity,
      state: waiverFormData.ownState,
      country: waiverFormData.ownCountry,
      zip: waiverFormData.ownZipCode,
      phone: waiverFormData.ownPrimaryPhone,
      phone_24hr: waiverFormData.own24hPhone,
      // fax: waiverFormData.ownfax
      email: waiverFormData.ownPrimaryEmail,
      rtype: 'OWNER'
    }

    proponents.push(owner);
  }

  const result: WaiverData = {
    status: 'DRAFT', // TODO: get the correct status from waiverFormData, or from the actual waiver if already exists?
    waiverSubtype: waiverFormData.waiverSubtype,
    applicationDate: waiverFormData.applicationDate,
    startDate: waiverFormData.startDate,
    endDate: waiverFormData.endDate,
    secSecured: waiverFormData.secSecured,
    secManifest: waiverFormData.secManifest,
    secAddSecurity: waiverFormData.secAddSecurity,
    secName: waiverFormData.secName,
    secTitle: waiverFormData.secTitle,
    secDate: waiverFormData.secDate,
    secAccepted: waiverFormData.secAccepted,
    dasspType: waiverFormData.dasspType,
    dasspCompanyName: waiverFormData.dasspCompanyName,
    dasspOperatorNum: waiverFormData.dasspOperatorNum,
    dasCoordinator: waiverFormData.dasCoordinator,
    dasspDepartAirport: waiverFormData.dasspDepartAirport,
    dasspDepartFbo: waiverFormData.dasspDepartFbo,
    deptDate: waiverFormData.deptDate,
    deptTime: waiverFormData.deptTime,
    arrivDate: waiverFormData.arrivDate,
    arrivTime: waiverFormData.arrivTime,
    deptDateDca: waiverFormData.deptDateDca,
    deptTimeDca: waiverFormData.deptTimeDca,
    dasspDestAirport: waiverFormData.dasspDestAirport,
    purposeComments: waiverFormData.purposeComments,
    destStreet: waiverFormData.destStreet,
    destCity: waiverFormData.destCity,
    destState: waiverFormData.destState,
    destZip: waiverFormData.destZip,
    dcaraddist: waiverFormData.dcaraddist,
    flightAltitude: waiverFormData.flightAltitude,
    latLong: waiverFormData.latLong,
    proponents
  };

  return result;
}

export const fromAircraftFormData = (waiverFormData: WaiverFormData): AircraftData => {
  return ({
    id: '',
    confirmation: '',
    waiverId: '',
    tailNumber: waiverFormData.tailNumber,
    callSign: waiverFormData.callSign,
    aircraftType: waiverFormData.aircraftType,
    registration: waiverFormData.registration,
    grossWeight: waiverFormData.grossWeight,
  })
}

export const fromUnmannedAircraftFormData = (
  data: WaiverFormData
): AircraftUnmannedData => {
  return {
    id: "", // Will be assigned by the server
    confirmation: "",
    waiverId: "",
    uasType: data.uasType!,
    faaRegistration: data.faaRegistration!,
    callSign: data.callSign!,
    makeAndModel: data.makeAndModel!,
    grossWeight: data.grossWeight!,
    uasCraftId: data.uasCraftId!,
    transmitterId: data.transmitterId!,
    remoteId: data.remoteId!,
  };
};


export const fromManifestFormData = (formData: WaiverFormData): ManifestData => {
  return {
    personId: '',
    confirmation: "",
    waiverId: "",
    personType: formData.personType, // TODO: convert personType back and forth from string to number, here and everywhere else
    firstName: formData.firstName,
    middleName: formData.middleName,
    lastName: formData.lastName,
    birthDate: formData.birthDate,
    birthCity: formData.birthCity,
    birthState: formData.birthState,
    birthCntry: formData.birthCntry,
    sex: formData.sex,
    ssn: formData.ssn,
    passportNmbr: formData.passportNmbr,
    passportCntry: formData.passportCntry,
    pilotCertNmbr: formData.pilotCertNmbr,
    pilotCertCntry: formData.pilotCertCntry,
    asoCredential: formData.asoCredential,
    passengerDca: formData.passengerDca,
    aso: formData.aso,
    leoBadgeNumber: formData.leoBadgeNumber,
    leoJurisdiction: formData.leoJurisdiction,
  };
}


// Function to map backend data to form data
export const mapBackendToForm = (backendData: WaiverData): WaiverFormData => {
  console.log('>>>>>>>>>>>>> backendData', backendData);
  return {
    ...waiverFormDefaultValues,
    reqTitle: backendData.proponents?.[0]?.title ?? '',
    reqFirstName: backendData.proponents?.[0]?.firstNm ?? '',
    reqLastName: backendData.proponents?.[0]?.lastNm ?? '',
    reqMiddleName: backendData.proponents?.[0]?.middleNm ?? '',
    reqOrganization: backendData.proponents?.[0]?.company ?? '',
    reqStreetAddress: backendData.proponents?.[0]?.address ?? '',
    reqCity: backendData.proponents?.[0]?.city ?? '',
    reqState: backendData.proponents?.[0]?.state ?? '',
    reqZipCode: backendData.proponents?.[0]?.zip ?? '',
    reqCountry: backendData.proponents?.[0]?.country ?? '',
    reqPrimaryPhone: backendData.proponents?.[0]?.phone ?? '',
    req24hPhone: backendData.proponents?.[0]?.phone_24hr ?? '',
    reqPrimaryEmail: backendData.proponents?.[0]?.email ?? '',
    // TODO: need to make sure if op = req, own = op, or own = req, the proponents arrays should have less than 3. So must do a better index assignment here!
    opTitle: backendData.proponents?.[1]?.title ?? '',
    opFirstName: backendData.proponents?.[1]?.firstNm ?? '',
    opLastName: backendData.proponents?.[1]?.lastNm ?? '',
    opMiddleName: backendData.proponents?.[1]?.middleNm ?? '',
    opOrganization: backendData.proponents?.[1]?.company ?? '',
    opStreetAddress: backendData.proponents?.[1]?.address ?? '',
    opCity: backendData.proponents?.[1]?.city ?? '',
    opState: backendData.proponents?.[1]?.state ?? '',
    opZipCode: backendData.proponents?.[1]?.zip ?? '',
    opCountry: backendData.proponents?.[1]?.country ?? '',
    opPrimaryPhone: backendData.proponents?.[1]?.phone ?? '',
    op24hPhone: backendData.proponents?.[1]?.phone_24hr ?? '',
    opPrimaryEmail: backendData.proponents?.[1]?.email ?? '',
    ownTitle: backendData.proponents?.[2]?.title ?? '',
    ownFirstName: backendData.proponents?.[2]?.firstNm ?? '',
    ownLastName: backendData.proponents?.[2]?.lastNm ?? '',
    ownMiddleName: backendData.proponents?.[2]?.middleNm ?? '',
    ownOrganization: backendData.proponents?.[2]?.company ?? '',
    ownStreetAddress: backendData.proponents?.[2]?.address ?? '',
    ownCity: backendData.proponents?.[2]?.city ?? '',
    ownState: backendData.proponents?.[2]?.state ?? '',
    ownZipCode: backendData.proponents?.[2]?.zip ?? '',
    ownCountry: backendData.proponents?.[2]?.country ?? '',
    ownPrimaryPhone: backendData.proponents?.[2]?.phone ?? '',
    own24hPhone: backendData.proponents?.[2]?.phone_24hr ?? '',
    ownPrimaryEmail: backendData.proponents?.[2]?.email ?? '', // TODO: map all other fields
    applicationDate: backendData.applicationDate ? formatDateForForm(new Date(backendData.applicationDate)) : waiverFormDefaultValues.applicationDate,
    startDate: backendData.startDate ? formatDateForForm(new Date(backendData.startDate)) : waiverFormDefaultValues.startDate,
    endDate:  backendData.endDate ? formatDateForForm(new Date(backendData.endDate)) : waiverFormDefaultValues.endDate,
    waiverType: backendData.waiverType ?? "",
    waiverSubtype: backendData.waiverSubtype ?? "",
    purposeComments: backendData.purposeComments ?? "",
    tailNumber: "",
    callSign: "",
    aircraftType: "",
    registration: "",
    grossWeight: 0,
    personType: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    birthCity: "",
    birthCntry: "",
    secSecured: backendData.secSecured ?? waiverFormDefaultValues.secSecured,
    secManifest: backendData.secManifest,
    secAddSecurity: backendData.secAddSecurity,
    secName: backendData.secName ?? waiverFormDefaultValues.secName,
    secTitle: backendData.secTitle ?? waiverFormDefaultValues.secTitle,
    // TODO: have a better date conversion utility that also add leading zeros. Also implement a Date picker
    secDate: backendData.secDate ? formatDateForForm(new Date(backendData.secDate)) : waiverFormDefaultValues.secDate,
    secAccepted: backendData.secAccepted ?? waiverFormDefaultValues.secAccepted,
    dasspType: backendData.dasspType,
    dasspCompanyName: backendData.dasspCompanyName,
    dasspOperatorNum: backendData.dasspOperatorNum,
    dasCoordinator: backendData.dasCoordinator,
    dasspDepartAirport: backendData.dasspDepartAirport,
    dasspDepartFbo: backendData.dasspDepartFbo,
    deptDate: backendData.deptDate ? formatDateForForm(new Date(backendData.deptDate)) : waiverFormDefaultValues.deptDate,
    deptTime: backendData.deptTime,
    arrivDate: backendData.arrivDate ? formatDateForForm(new Date(backendData.arrivDate)) : waiverFormDefaultValues.arrivDate,
    arrivTime: backendData.arrivTime,
    deptDateDca: backendData.deptDateDca ? formatDateForForm(new Date(backendData.deptDateDca)) : waiverFormDefaultValues.deptDateDca,
    deptTimeDca: backendData.deptTimeDca,
    dasspDestAirport: backendData.dasspDestAirport,
    destStreet: backendData.destStreet,
    destCity: backendData.destCity,
    destState: backendData.destState,
    destZip: backendData.destZip,
    dcaraddist: backendData.dcaraddist,
    flightAltitude: backendData.flightAltitude,
    latLong: backendData.latLong,
  };
};

/**
 * Groups raw waiver records by their confirmation number.
 * @param waivers The array of raw waiver records from the database.
 * @returns An object where each key is a confirmation number and the value is an array of records for that confirmation.
 */
export const groupWaiversByConfirmation = (waivers: WaiverRecord[]): GroupedWaivers => {
  return waivers.reduce((acc, waiver) => {
    const confirmation = String(waiver.CONFIRMATION);
    if (!acc[confirmation]) {
      acc[confirmation] = [];
    }
    acc[confirmation].push(waiver);
    return acc;
  }, {} as GroupedWaivers);
};

/**
 * Processes a single group of waiver records into a structured WaiverData object.
 * @param subArray An array of records for a single confirmation number.
 * @returns A single WaiverData object with a nested array of proponents.
 */
export const processWaiverGroup = (subArray: WaiverRecord[]): WaiverData => {
  if (subArray.length === 0) {
    throw new Error('Cannot process an empty waiver group.');
  }

  const mainRecord = subArray[0];

  const proponents: Proponent[] = subArray.map((row): Proponent => ({
    propId: row.PROP_ID,
    waiverId: row.WAIVER_ID,
    title: row.TITLE,
    firstNm: row.FIRST_NM,
    lastNm: row.LAST_NM,
    middleNm: row.MIDDLE_NM,
    company: row.COMPANY,
    address: row.ADDRESS,
    city: row.CITY,
    state: row.STATE,
    country: row.COUNTRY,
    zip: row.ZIP,
    phone: row.PHONE,
    phone_24hr: row.PHONE_24HR,
    fax: row.FAX,
    email: row.EMAIL,
    rtype: row.RTYPE,
    confirmation: row.CONFIRMATION,
    operator: row.OPERATOR === 'TRUE',
    owner: row.OWNER === 'TRUE',
    licenseNumbers: row.LICENSE_NUMBERS,
  }));

  return {
    confirmation: mainRecord.CONFIRMATION,
    waiverId: mainRecord.WAIVER_ID,
    applicationDate: mainRecord.APPLICATION_DATE,
    startDate: mainRecord.START_DATE,
    endDate: mainRecord.END_DATE,
    waiverType: mainRecord.WAIVER_TYPE,
    waiverSubtype: mainRecord.WAIVER_SUBTYPE,
    processingStep: mainRecord.PROCESSING_STEP,
    status: mainRecord.STATUS,
    proponents,
  };
};
