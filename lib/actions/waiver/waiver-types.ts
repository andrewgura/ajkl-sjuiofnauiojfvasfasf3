import type { DatabaseError } from '@/lib/utils/db-utils';

export interface WaiverRecord {
  WAIVER_ID?: string;
  USER_ID?: string;
  APPLICATION_DATE?: Date;
  START_DATE?: Date;
  END_DATE?: Date;
  WAIVER_TYPE?: string;
  WAIVER_SUBTYPE?: string;
  PROCESSING_STEP?: string;
  STATUS?: string;
  PROP_ID?: number;
  TITLE?: string;
  FIRST_NM?: string;
  LAST_NM?: string;
  MIDDLE_NM?: string;
  COMPANY?: string;
  ADDRESS?: string;
  CITY?: string;
  STATE?: string;
  COUNTRY?: string;
  ZIP?: string;
  PHONE?: string;
  PHONE_24HR?: string;
  FAX?: string;
  EMAIL?: string;
  RTYPE?: RType;
  CONFIRMATION?: string;
  OPERATOR?: string;
  OWNER?: string;
  LICENSE_NUMBERS?: string;
  // TODO add more fields
}

export interface WaiverData { // TODO: make these field required, not optional (must also update the code everywhere else for this)
    confirmation?: string;
    waiverId?: string;
    userId?: string;
    applicationDate?: Date | string;
    startDate?: Date | string;
    endDate?: Date | string;
    waiverType?: string;
    waiverSubtype?: string;
    processingStep?: string;
    status?: string;
    secSecured?: string;
    secManifest?: string;
    secAddSecurity?: string;
    secName?: string;
    secTitle?: string;
    secDate?: string;
    secAccepted?: boolean;
    dasspType?: string;
    dasspCompanyName?: string;
    dasspOperatorNum?: string;
    dasCoordinator?: string;
    dasspDepartAirport?: string;
    dasspDepartFbo?: string;
    deptDate?: string;
    deptTime?: string;
    arrivDate?: string;
    arrivTime?: string;
    deptDateDca?: string;
    deptTimeDca?: string;
    dasspDestAirport?: string;
    purposeComments?: string;
    destStreet?: string;
    destCity?: string;
    destState?: string;
    destZip?: string;
    dcaraddist?: string;
    flightAltitude?: string;
    latLong?: string;
    proponents?: Proponent[];
    aircraft?: AircraftData[] | AircraftUnmannedData[];
    manifest?: ManifestData[];
}

export interface AircraftData {
    id: string;
    confirmation: string;
    waiverId?: string;
    tailNumber: string;
    callSign: string;
    aircraftType: string;
    registration: string;
    grossWeight: number;
    // makeAndModel: string;
}

export interface AircraftUnmannedData {
    id: string;
    confirmation: string;
    waiverId?: string;
    uasType: string;
    faaRegistration: string;
    callSign: string;
    makeAndModel: string;
    grossWeight: number;
    uasCraftId: string;
    transmitterId: string;
    remoteId: string;
}

/**
 * @typedef {object} ManifestData
 * @property {string} [personId] The optional ID of the manifest. Required for updates.
 * @property {string} waiverId The ID of the parent waiver.
 * @property {string} confirmation The waiver confirmation number.
 * @property {string} personType The type of person (e.g., pilot, passenger).
 * @property {string} firstName The first name of the person.
 * @property {string} [middleName] The middle name.
 * @property {string} lastName The last name.
 * @property {string} birthDate The birth date in YYYY-MM-DD format.
 * @property {string} birthCity The city of birth.
 * @property {string} [birthState] The state of birth.
 * @property {string} birthCntry The country of birth.
 * @property {string} [sex] The sex of the person.
 * @property {string} [ssn] The Social Security Number.
 * @property {string} [passportNmbr] The passport number.
 * @property {string} [passportCntry] The passport country.
 * @property {string} [pilotCertNmbr] The pilot certificate number.
 * @property {string} [pilotCertCntry] The pilot certificate country.
 * @property {string} [asoCredential] The TSA credential number.
 * @property {string} [passengerDca] The DCA direction.
 * @property {string} [aso] The ASO direction.
 * @property {string} [leoBadgeNumber] The LEO badge number.
 * @property {string} [leoJurisdiction] The LEO jurisdiction.
 */
export interface ManifestData {
    personId: string;
    waiverId: string;
    confirmation: string;
    personType: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    birthDate: string;
    birthCity: string;
    birthState?: string;
    birthCntry: string;
    sex?: string;
    ssn?: string;
    passportNmbr?: string;
    passportCntry?: string;
    pilotCertNmbr?: string;
    pilotCertCntry?: string;
    asoCredential?: string;
    passengerDca?: string;
    aso?: string;
    leoBadgeNumber?: string;
    leoJurisdiction?: string;
}

/**
 * @typedef {object} UpsertManifestResult
 * @property {ManifestData | null | undefined} manifest The upserted manifest data, if successful.
 * @property {DatabaseError | null | undefined} [error] An optional error object if the operation failed.
 */
export interface UpsertManifestResult {
    manifest?: ManifestData | null;
    error?: DatabaseError | null;
}

/**
 * @typedef {object} DeleteManifestResult
 * @property {boolean} success Indicates whether the deletion was successful.
 * @property {DatabaseError | null | undefined} [error] An optional error object if the deletion failed.
 */
export interface DeleteManifestResult {
    success: boolean;
    error?: DatabaseError | null;
}

/**
 * @typedef {object} GetManifestResult
 * @property {ManifestData[]} manifest The list of manifest data associated with the waiver.
 * @property {DatabaseError | null | undefined} [error] An optional error object if the operation failed.
 */
export interface GetManifestResult {
    manifest: ManifestData[];
    error?: DatabaseError | null;
}

export type GroupedWaivers = {
  [confirmation: string]: WaiverRecord[]; // TODO define this "any" type
};

export interface WaiverProcessData {
    waiverId: string;
    // Processing step
    processingDate?: Date;
    processingSignoff?: string;
    processingApproved?: 'Y' | 'N';
    processingComments?: string;
    // Determined step
    determinedDate?: Date;
    determinedSignoff?: string;
    determinedApproved?: 'Y' | 'N';
    determinedRejectionReason?: string;
    determinedComments?: string;
    determinedApprovalCode?: string;
    determinedParagraphs?: string; // JSON string of paragraph array
    // Vetted step
    vettedDate?: Date;
    vettedSignoff?: string;
    vettedApproved?: 'Y' | 'N';
    vettedComments?: string;
    vettedApprovalCode?: string;
    vettedRejectionReason?: string;
    // QA step
    qaDate?: Date;
    qaSignoff?: string;
    qaApproved?: 'Y' | 'N';
    qaComments?: string;
    qaApprovalCode?: string;
    qaRejectionReason?: string;
    // Certified step
    certifiedDate?: Date;
    certifiedSignoff?: string;
    certifiedApproved?: 'Y' | 'N';
    certifiedComments?: string;
    certifiedApprovalCode?: string;
    certifiedRejectionReason?: string;
    // Sent step
    sentDate?: Date;
    sentSignoff?: string;
    sentApproved?: 'Y' | 'N';
    sentComments?: string;
    sentEmailBody?: string;
    sentEmailTo?: string;
    // Metadata
    createdBy?: string;
    createdDate?: Date;
    updatedBy?: string;
    updatedDate?: Date;
}

export type { DatabaseError };

export interface GetWaiverParams {
    waiverId: string;
}

export interface GetWaiverResult {
    waiver: WaiverData | null;
    process: WaiverProcessData | null;
    error?: DatabaseError;
}

export interface GetWaiversResult {
    waivers: WaiverData[] | null;
    error?: DatabaseError;
}

export interface LazyGetWaiversResult {
    waivers: WaiverRequest[] | null;
    error?: DatabaseError;
}

/**
 * Interface for the result of the get operation for multiple aircraft.
 */
export interface GetAircraftResult {
    aircraft: AircraftData[] | AircraftUnmannedData[];
    error?: any;
}

export interface UpdateProcessStepParams {
    waiverId: string;
    step: 'PROCESSING' | 'DETERMINED' | 'VETTED' | 'QA' | 'CERTIFIED' | 'SENT';
    approved: 'Y' | 'N';
    signoff: string;
    comments?: string;
    rejectionReason?: string;
    approvalCode?: string;
    paragraphs?: { id: number; content: string; }[];
    emailBody?: string;
    emailTo?: string;
}

export interface UpdateProcessStepResult {
    success: boolean;
    error?: DatabaseError;
}

export interface UpsertWaiverResult {
    waiver?: WaiverData | null;
    error?: DatabaseError;
    data?: any;
}

/**
 * Interface for the result of the upsert operation.
 */
export interface UpsertAircraftResult {
    aircraft?: AircraftData | AircraftUnmannedData | null;
    error?: any;
}

/**
 * @typedef {object} DeleteAircraftResult
 * @property {boolean} success Indicates whether the deletion was successful.
 * @property {DatabaseError | null | undefined} [error] An optional error object if the deletion failed.
 */
export interface DeleteAircraftResult {
    success: boolean;
    error?: DatabaseError | null;
}

export interface Proponent {
  propId?: number;
  waiverId?: string;
  title?: string;
  firstNm?: string;
  lastNm?: string;
  middleNm?: string;
  company?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zip?: string;
  phone?: string;
  phone_24hr?: string;
  fax?: string;
  email?: string;
  rtype?: RType;
  confirmation?: string;
  operator?: boolean;
  owner?: boolean;
  licenseNumbers?: string;
}

export type Proponents = [Proponent?, Proponent?, Proponent?];

export type RType = 'REQUESTOR' | 'OPERATOR' | 'OWNER';

export interface WaiverRequest {
    id: number;
    confirmation: string;
    type: string;
    status: WaiverStatus;
    waiverId: string;
    applicationDate: string | null;
    archived: boolean;
}

// Define the enum first, as the primary source of truth.
export enum WaiverStatusEnum {
    APPROVED = "APPROVED",
    CANCELLED = "CANCELLED",
    VOIDED = "VOIDED",
    WITHDRAWN = "WITHDRAWN",
    DENIED = "DENIED",
    TERMINATED = "TERMINATED",
    DRAFT = "DRAFT",
    INCOMPLETE_PLEASE_REVISE = "INCOMPLETE, PLEASE REVISE",
    MODIFICATION = "MODIFICATION",
    NEW_UNSAVED = "NEW/UNSAVED",
    PROCESSING = "PROCESSING",
    SUBMITTED = "SUBMITTED",
    COMPLETED = "COMPLETED",
}

// Create the array from the enum's values.
export const WAIVER_STATUS_LIST = Object.values(WaiverStatusEnum);

// Create the type from the values in the array.
export type WaiverStatus = typeof WAIVER_STATUS_LIST[number];

export interface MyWaiversData {
    activeRequests: WaiverRequest[];
    archivedRequests: WaiverRequest[];
}

export enum WaiverTypeEnum {
    UAS = 'Unmanned Aircraft System',
    DASSP = 'DASSP',
    DASSPOneWay = ' DASSP One Way',
    Domestic = 'Domestic',
    Sport = 'Sporting Event',
    Special = 'Special Event',
    International = 'International',
    Disney = 'Disney',
    Moored = 'Moored Balloon',
    SGI = 'Part 107 Special Government Interest'
}