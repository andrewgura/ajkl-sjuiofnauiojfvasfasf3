import { z } from "zod";

export const waiverFormSchema = z.object({
  // Proponent Information
  reqTitle: z.string().optional(),
  reqFirstName: z.string().min(1, "Requester first name is required"),
  reqMiddleName: z.string().optional(),
  reqLastName: z.string().min(1, "Requester last name is required"),
  reqOrganization: z.string().min(1, "Requester organization is required"),
  reqStreetAddress: z.string().min(1, "Requester street address is required"),
  reqCity: z.string().min(1, "Requester city is required"),
  reqState: z.string().optional(),
  reqZipCode: z.string().min(1, "Requester zip code is required"),
  reqCountry: z.string().min(1, "Requester country is required"),
  reqPrimaryPhone: z
    .string()
    .min(10, "Valid phone number required")
    .max(15, "Valid phone number required"),
  req24hPhone: z
    .string()
    .min(10, "Valid phone number required")
    .max(15, "Valid phone number required"),
  reqPrimaryEmail: z
    .string()
    .email("Valid email required")
    .min(1, "Email required"),
  reqAdditionalEmails: z
    .array(z.string().email("Please use valid emails"))
    .optional(),
  opSameAsReq: z.boolean().optional(),
  opTitle: z.string().optional(),
  opFirstName: z.string().min(1, "Operator first name is required"),
  opMiddleName: z.string().optional(),
  opLastName: z.string().min(1, "Operator last name is required"),
  opOrganization: z.string().min(1, "Operator organization is required"),
  opStreetAddress: z.string().min(1, "Operator street address is required"),
  opCity: z.string().min(1, "Operator city is required"),
  opState: z.string().optional(),
  opZipCode: z.string().min(1, "Operator zip code is required"),
  opCountry: z.string().min(1, "Operator country is required"),
  opPrimaryPhone: z
    .string()
    .min(10, "Valid phone number required")
    .max(15, "Valid phone number required"),
  op24hPhone: z
    .string()
    .min(10, "Valid phone number required")
    .max(15, "Valid phone number required"),
  opPrimaryEmail: z
    .string()
    .email("Valid email required")
    .min(1, "Email required"),
  opAdditionalEmails: z
    .array(z.string().email("Must use valid emails"))
    .optional(),
  ownSameAsReq: z.boolean().optional(),
  ownSameAsOp: z.boolean().optional(),
  ownTitle: z.string().optional(),
  ownFirstName: z.string().optional(),
  ownMiddleName: z.string().optional(),
  ownLastName: z.string().optional(),
  ownOrganization: z.string().optional(),
  ownStreetAddress: z.string().optional(),
  ownCity: z.string().optional(),
  ownState: z.string().optional(),
  ownZipCode: z.string().optional(),
  ownCountry: z.string().optional(),
  ownPrimaryPhone: z
    .string()
    .min(10, "Must use a valid phone number")
    .max(15, "Must use a valid phone number")
    .optional(),
  own24hPhone: z
    .string()
    .min(10, "Must use a valid phone number")
    .max(15, "Must use a valid phone number")
    .optional(),
  ownPrimaryEmail: z.string().email("Must use a valid email").optional(),
  ownAdditionalEmails: z
    .array(z.string().email("Must use valid emails"))
    .optional(),

  // Itinerary Information
  applicationDate: z.string().date().min(1, "Must provide application date"),
  startDate: z.string().date().min(1, "Must provide start date"),
  endDate: z.string().date().min(1, "Must provide end date"),
  waiverType: z.string().min(1, "Must have a waiver type"),
  waiverSubtype: z.string().min(1, "Must have a waiver subtype"),
  purposeComments: z.string().min(1, "Must provide a purpose"),
  dasspType: z.string().optional(),
  dasspCompanyName: z.string().optional(),
  dasspOperatorNum: z.string().optional(),
  dasCoordinator: z.string().optional(),
  dasspDepartAirport: z.string().optional(),
  dasspDepartFbo: z.string().optional(),
  deptDate: z.string().date().optional(),
  deptTime: z.string().time().optional(),
  arrivDate: z.string().date().optional(),
  arrivTime: z.string().time().optional(),
  deptDateDca: z.string().date().optional(),
  deptTimeDca: z.string().time().optional(),
  dasspDestAirport: z.string().optional(),
  disneyPark: z.string().optional(),
  disneyDepartPoint: z.string().optional(),
  disneyFinalDest: z.string().optional(),
  domApprovedDistance: z.string().optional(),
  domDcaDistance: z.string().optional(),
  domFrzDest: z.string().optional(),
  domFrzOverflights: z.string().optional(),
  faaDepartAirport: z.string().optional(),
  faaIntStops: z.string().optional(),
  faaArriveAirport: z.string().optional(),
  intlSubtype: z.string().optional(),
  intlFlightType: z.string().optional(),
  intlDepartPoint: z.string().optional(),
  intlIntStops: z.string().optional(),
  intlDestPoint: z.string().optional(),
  intlFinalDest: z.string().optional(),
  intlContactName: z.string().optional(),
  intlContactStreet: z.string().optional(),
  intlContactCity: z.string().optional(),
  intlContactState: z.string().optional(),
  intlContactCountry: z.string().optional(),
  intlContactZip: z.string().optional(),
  intlContactPhone: z.string().optional(),
  intlAmbRoute: z.string().optional(),
  intlAmbHospitalName: z.string().optional(),
  intlAmbHospitalNumber: z.string().optional(),
  intlAmbHospitalAddress: z.string().optional(),
  intlAmbHospitalPoc: z.string().optional(),
  balDcaDistance: z.string().optional(),
  balFrzDest: z.string().optional(),
  balFrzOverflights: z.string().optional(),
  paaDepartAirport: z.string().optional(),
  paaIntStops: z.string().optional(),
  paaArriveAirport: z.string().optional(),
  speOperationType: z.string().optional(),
  speDepartAirport: z.string().optional(),
  speDepartDate: z.string().date().optional(),
  speDepartTime: z.string().time().optional(),
  speDepartGateway: z.string().optional(),
  speDepartSlot: z
    .string()
    .length(4)
    .regex(/^\d+$/, "Must be 4 digits")
    .optional(),
  speArriveAirport: z.string().optional(),
  speArriveDate: z.string().date().optional(),
  speArriveTime: z.string().time().optional(),
  speArriveSlot: z
    .string()
    .length(4)
    .regex(/^\d+$/, "Must be 4 digits")
    .optional(),
  speOverflight: z.string().optional(),
  sportEventName: z.string().optional(),
  sportEventVenue: z.string().optional(),
  sportPrevVenueName: z.string().optional(),
  sportCity: z.string().optional(),
  sportState: z.string().optional(),
  uasApprovedDistance: z.string().optional(),
  destStreet: z.string().optional(),
  destCity: z.string().optional(),
  destState: z.string().optional(),
  destZip: z.string().optional(),
  dcaraddist: z.string().optional(),
  flightAltitude: z.string().optional(),
  latLong: z.string().optional(),

  // Aircraft Information
  tailNumber: z
    .string()
    .min(1, "Tail number required")
    .max(10, "Must be 10 or fewer characters"),
  callSign: z
    .string()
    .min(1, "Call sign required")
    .max(7, "Must be 7 or fewer characters"),
  aircraftType: z.string().min(1, "Aircraft type required"),
  registration: z.string().min(1, "Registration country required"),
  grossWeight: z
    .number({ invalid_type_error: "Gross weight must be a number" })
    .min(1, "Gross weight required"),
  faaRegistration: z
    .string()
    .max(10, "Must be 10 or fewer characters")
    .optional(),
  uasType: z.string().optional(),
  makeAndModel: z.string().optional(),
  uasCraftId: z.string().optional(),
  transmitterId: z.string().optional(),
  remoteId: z.string().optional(),

  // Manifest Information
  personType: z.string().min(1, "Person type required"),
  firstName: z.string().min(1, "First name required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name required"),
  birthDate: z.string().date().min(1, "Birth date required"),
  birthCity: z.string().min(1, "Birth city required"),
  birthState: z.string().optional(),
  birthCntry: z.string().min(1, "Birth country required"),
  sex: z.string().optional(),
  ssn: z.string().length(9, "Must 9 digits long").optional(),
  passportNmbr: z.string().optional(),
  passportCntry: z.string().optional(),
  pilotCertNmbr: z.string().optional(),
  pilotCertCntry: z.string().optional(),
  asoCredential: z.string().optional(),
  aso: z.string().optional(),
  passengerDca: z.string().optional(),
  leoBadgeNumber: z.string().optional(),
  leoJurisdiction: z.string().optional(),

  // Security Information
  secSecured: z.string().min(1, "Security measures required"),
  secManifest: z.string().optional(),
  secAddSecurity: z.string().optional(),
  secName: z.string().min(1, "Name required"),
  secTitle: z.string().min(1, "Title required"),
  secDate: z.string().date().min(1, "Date required"),
  secAccepted: z.boolean({ required_error: "Must accept before submitting" }),

  // Document Information
  // attachment definition here

  // Case Notes
  caseNote: z
    .string()
    .max(4000, "Must be under 4000 characters long")
    .optional(),
  caseNoteDate: z.string().date().optional(),
  caseNoteTime: z.string().time().optional(),
  caseNoteCreator: z.string().optional(),

  // Transaction Logs
  transactionDate: z.string().date().optional(),
  transactionUser: z.string().optional(),
  transactionStatus: z.string().optional(),
  transactionNotes: z.string().optional(),
  transactionLink: z.string().optional(),
  confirmation: z.string().optional(),
});

export type WaiverFormData = z.infer<typeof waiverFormSchema>;
