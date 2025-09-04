import db from '@/lib/db';
import { categorizeError, dbNameConversion, dbNameConversionArray } from '@/lib/utils/db-utils';
import {
    type WaiverData,
    type WaiverProcessData,
    type DatabaseError,
    type GetWaiverParams,
    type GetWaiverResult,
    type UpdateProcessStepParams,
    type UpdateProcessStepResult,
    type UpsertWaiverResult,
    type GroupedWaivers,
    type WaiverRecord,
    type WaiverRequest,
    type Proponent,
    type AircraftData,
    type UpsertAircraftResult,
    type GetAircraftResult,
    type DeleteAircraftResult,
    type GetManifestResult,
    type ManifestData,
    type DeleteManifestResult,
    type UpsertManifestResult,
    type AircraftUnmannedData,
    WaiverTypeEnum} from './waiver-types';
import { TABLE_NAMES } from '@/types/table-names';
import { groupWaiversByConfirmation, processWaiverGroup } from '@/lib/utils/waiver-utils';

/**
 * Upsert waiver data to WAIVER_DATA table
 */
export async function upsertWaiver(waiverData: WaiverData): Promise<UpsertWaiverResult> {
    try {
        let result;
        const proponentsResult: Proponent[] = [];
        const { confirmation }= waiverData;
        console.log('>>>>> waiver_id, confirmation, waiverData', waiverData.waiverId, confirmation, waiverData);
        // knex does not have "upsert" for a dialect db, so we have to use separately "insert" and "update" below
        let waiverResult: UpsertWaiverResult = {};
        await db.transaction(async (trx: any) => {
            if (!confirmation) {
                const proponents = waiverData.proponents;
                delete waiverData.proponents;
                delete waiverData.aircraft;
                delete waiverData.manifest;
                result = await trx(TABLE_NAMES.WaiverData)
                    .insert(dbNameConversion({
                        ...waiverData,
                        confirmation: waiverData.confirmation ?? db.raw('CONFIRMATION_SEQ.nextval'),
                        waiver_id: waiverData.waiverId ?? db.raw('CONFIRMATION_SEQ.currval'),
                        secAccepted: waiverData.secAccepted ? 'Y' : 'N',
                        secDate: db.raw("TO_DATE(?, 'YYYY-MM-DD')", [waiverData.secDate]),
                        startDate: db.raw("TO_DATE(?, 'YYYY-MM-DD')", [waiverData.startDate]),
                        endDate: db.raw("TO_DATE(?, 'YYYY-MM-DD')", [waiverData.endDate]),
                        deptDate: db.raw("TO_DATE(?, 'YYYY-MM-DD')", [waiverData.deptDate]),
                        arrivDate: db.raw("TO_DATE(?, 'YYYY-MM-DD')", [waiverData.arrivDate]),
                        deptDateDca: db.raw("TO_DATE(?, 'YYYY-MM-DD')", [waiverData.deptDateDca]),
                        applicationDate: db.raw("TO_DATE(?, 'YYYY-MM-DD')", [waiverData.applicationDate]),
                    }), ['*']);
                if (!result) {
                    waiverResult = { waiver: null };
                } else {
                    if (proponents) {
                        for (let i = 0; i < proponents.length; i++) {
                            const proponentResult = await trx(TABLE_NAMES.WaiverProponents)
                                .insert(dbNameConversion({
                                    ...proponents[i],
                                    confirmation: result[0].CONFIRMATION,
                                    propId: db.raw('AAPUSER.PROPONENT_ID_SEQ.nextval')
                                }), ['*'])
                            proponentsResult.push(dbNameConversion(proponentResult[0], false));
                        }
                        console.log('>>>>>>> proponentsResult', proponentsResult);
                    }

                    const waiver: WaiverData = dbNameConversion(result[0], false) as WaiverData;
                    waiver.proponents = proponentsResult;

                    console.log('>>>>>>>> waiver', waiver);

                    waiverResult = {waiver};
                }
            } else {
                // TODO: proponents: what if on previous save, the requester, operator and owner were all different people
                // and now the user updated these to be the same, or some are the same as another?
                // ===>> then we need to remove the saved one.
                // For example, on save #3, the operator was different from the requester, so there are now 2 entries
                // one for the requester and one for the operator.
                // On save #4, the user updated so that the operator is the same as requester.
                // So there should be one person: requester with requester.operator === true.
                // But the operator entry is still in the DB. So we must remove this entry
                // This might be a bit tricky. Maybe re-think, re-architect this so that there are always 3 proponent entries
                // regardless if they are the same or not to simplify all this logic. Trade-off is we lose a bit of DB space
                // but the logic is much simpler and more maintainable
                const proponents = waiverData.proponents;
                delete waiverData.proponents;
                delete waiverData.aircraft;
                delete waiverData.manifest;
                const convertedWaiverData = dbNameConversion({
                    ...waiverData,
                    secAccepted: waiverData.secAccepted ? 'Y' : 'N',
                    secDate: db.raw("TO_DATE(?, 'YYYY-MM-DD')", [waiverData.secDate]),
                    startDate: db.raw("TO_DATE(?, 'YYYY-MM-DD')", [waiverData.startDate]),
                    endDate: db.raw("TO_DATE(?, 'YYYY-MM-DD')", [waiverData.endDate]),
                    deptDate: db.raw("TO_DATE(?, 'YYYY-MM-DD')", [waiverData.deptDate]),
                    arrivDate: db.raw("TO_DATE(?, 'YYYY-MM-DD')", [waiverData.arrivDate]),
                    deptDateDca: db.raw("TO_DATE(?, 'YYYY-MM-DD')", [waiverData.deptDateDca]),
                    applicationDate: db.raw("TO_DATE(?, 'YYYY-MM-DD')", [waiverData.applicationDate]),
                });
                console.log('>>>>>>> HERE, UPDATE, confirmation, convertedWaiverData', confirmation, convertedWaiverData);
                result = await trx(TABLE_NAMES.WaiverData)
                    .where('CONFIRMATION', confirmation)
                    .update(convertedWaiverData);
                console.log('>>>> result', result);

                if (!result) {
                    waiverResult =  { waiver: null };
                } else {
                    if (proponents) {
                        for (let i = 0; i < proponents.length; i++) {
                            const proponentResult = await trx(TABLE_NAMES.WaiverProponents)
                                .where('CONFIRMATION', confirmation) // NOTE: we can do this combined "where"'s because there is a unique constraint of the combo (CONFIRMATION, RTYPE)
                                .where('RTYPE', proponents[i]?.rtype) // TODO: in the future use the PROP_ID instead, but this does not have a unique constraint yet
                                .update(dbNameConversion({
                                    ...proponents[i],
                                }))
                            console.log('>>>>>>> i %s, proponentResult', i, proponentResult);
                            // TODO: what if some failed to be updated? Maybe best to re-query the data from DB
                        }
                    }
                    // TODO: what if some failed to be updated? Maybe best to re-query the data from DB
                    const waiver: WaiverData = {
                        ...waiverData,
                        proponents
                    };

                    console.log('>>>>>>>> waiver', waiver);

                    waiverResult = {waiver};
                }
            }
            await trx.commit();
        });
        console.log('>>>> waiverResult', waiverResult);
        return {waiver: waiverResult?.waiver };
    } catch (error) {
        const dbError = categorizeError(error);
        console.log('>>>> dbError', dbError);
        return {
            waiver: null,
            error: dbError
        };
    }
}

/**
 * Upsert aircraft data into the WAIVER_AIRCRAFT table.
 * @param {AircraftData} aircraftData The data for the aircraft to be inserted or updated.
 * @returns {Promise<UpsertAircraftResult>} The result of the upsert operation, including the upserted aircraft data or an error.
 */
export async function upsertAircraft(aircraftData: AircraftData | AircraftUnmannedData, uas: boolean = false): Promise<UpsertAircraftResult> {
    try {
        let result: any[] = [];
        let aircraftResult: UpsertAircraftResult = {};

        // Knex does not have a native "upsert" for all dialects, so we handle it with
        // an insert or update within a transaction.
        await db.transaction(async (trx: any) => {
            if (!aircraftData.id) {
                // If ID is not present, this is a new aircraft. Perform an INSERT.
                console.log('>>>>>>> Inserting new aircraft with confirmation', aircraftData.confirmation);

                result = await trx(uas ? TABLE_NAMES.WaiverAircraftUnmanned : TABLE_NAMES.WaiverAircraft)
                    .insert(dbNameConversion({
                        ...aircraftData,
                        // Get the next sequence value for the ID.
                        id: db.raw('AIRCRAFT_ID_SEQ.nextval'),
                        // Use the provided waiverId for the WAIVER_ID column.
                        waiver_id: aircraftData.waiverId,
                        // Use the provided confirmation for the CONFIRMATION column.
                        confirmation: aircraftData.confirmation,
                    }), ['*']); // Return all columns of the inserted row.

                if (result && result.length > 0) {
                    aircraftResult = { aircraft: dbNameConversion(result[0], false) as unknown as AircraftData };
                } else {
                    aircraftResult = { aircraft: null };
                }

            } else {
                // If ID is present, this is an existing aircraft. Perform an UPDATE.
                console.log('>>>>>>> Updating aircraft with ID', aircraftData.id);

                // Delete the ID from the update data to prevent updating the primary key.
                const updatedAircraftData = { ...aircraftData };

                const convertedData = dbNameConversion(updatedAircraftData);
                result = await trx(uas ? TABLE_NAMES.WaiverAircraftUnmanned : TABLE_NAMES.WaiverAircraft)
                    .where('ID', aircraftData.id)
                    .update(convertedData);

                if (result) {
                    aircraftResult = { aircraft: aircraftData };
                } else {
                    aircraftResult = { aircraft: null };
                }
            }
            await trx.commit();
        });

        console.log('>>>> aircraftResult', aircraftResult);
        return { aircraft: aircraftResult?.aircraft };

    } catch (error) {
        const dbError = categorizeError(error);
        console.log('>>>> dbError', dbError);
        return {
            aircraft: null,
            error: dbError
        };
    }
}

/**
 * Deletes an aircraft from the WAIVER_AIRCRAFT table.
 * @param {string} aircraftId The ID of the aircraft to be deleted.
 * @returns {Promise<DeleteAircraftResult>} An object indicating the success of the operation.
 */
export async function deleteAircraft(aircraftId: string, uas: boolean = false): Promise<DeleteAircraftResult> {
    try {
        console.log('>>>>>>> Deleting aircraft with ID:', aircraftId);

        // The 'del' method performs a DELETE query on the table.
        // We use a 'where' clause to specify the row to be deleted based on the aircraft ID.
        const result = await db(uas ? TABLE_NAMES.WaiverAircraftUnmanned : TABLE_NAMES.WaiverAircraft)
            .where('ID', aircraftId)
            .del();

        // The result of a 'del' operation is the number of rows affected.
        // If the result is 1, the deletion was successful.
        if (result === 1) {
            console.log(`Aircraft with ID ${aircraftId} successfully deleted.`);
            return { success: true };
        } else {
            console.log(`No aircraft found with ID ${aircraftId} to delete.`);
            return { success: false, error: { message: 'Aircraft not found.', type: 'QUERY_ERROR', details: '' } };
        }

    } catch (error) {
        const dbError = categorizeError(error);
        console.log('>>>> dbError', dbError);
        return {
            success: false,
            error: dbError
        };
    }
}

/**
 * Get waiver data by ID from WAIVER_DATA table
 */
export async function getWaiverData(waiverId: string): Promise<{
    waiver: WaiverData | null;
    error?: DatabaseError;
}> {
    try {
        const results = await db(`${TABLE_NAMES.WaiverData} as w`)
            .leftJoin(`${TABLE_NAMES.WaiverProponents} as p`, 'w.CONFIRMATION', '=', 'p.CONFIRMATION')
            .select(
                'w.WAIVER_ID',
                'w.USER_ID',
                'w.APPLICATION_DATE',
                'w.START_DATE',
                'w.END_DATE',
                'w.WAIVER_TYPE',
                'w.WAIVER_SUBTYPE',
                'w.PROCESSING_STEP',
                'w.STATUS',
                'w.SEC_SECURED',
                'w.SEC_MANIFEST',
                'w.SEC_ADD_SECURITY',
                'w.SEC_TITLE',
                'w.SEC_NAME',
                'w.SEC_DATE',
                'w.SEC_ACCEPTED',
                'w.DASSP_TYPE',
                'w.DASSP_COMPANY_NAME',
                'w.DASSP_OPERATOR_NUM',
                'w.DAS_COORDINATOR',
                'w.DASSP_DEPART_AIRPORT',
                'w.DASSP_DEPART_FBO',
                'w.DEPT_DATE',
                'w.DEPT_TIME',
                'w.ARRIV_DATE',
                'w.ARRIV_TIME',
                'w.DEPT_DATE_DCA',
                'w.DEPT_TIME_DCA',
                'w.DASSP_DEST_AIRPORT',
                'w.PURPOSE_COMMENTS',
                'w.DEST_STREET',
                'w.DEST_CITY',
                'w.DEST_STATE',
                'w.DEST_ZIP',
                'w.DCARADDIST',
                'w.FLIGHT_ALTITUDE',
                'w.LAT_LONG',
                'p.PROP_ID',
                'p.WAIVER_ID',
                'p.TITLE',
                'p.FIRST_NM',
                'p.LAST_NM',
                'p.MIDDLE_NM',
                'p.COMPANY',
                'p.ADDRESS',
                'p.CITY',
                'p.STATE',
                'p.COUNTRY',
                'p.ZIP',
                'p.PHONE',
                'p.PHONE_24HR',
                'p.FAX',
                'p.EMAIL',
                'p.RTYPE',
                'p.CONFIRMATION',
                'p.OPERATOR',
                'p.OWNER',
                'p.LICENSE_NUMBERS'
            )
            .where('w.WAIVER_ID', waiverId); // TODO: use confirmation instead of waiverId
            // .first();

        if (!results) {
            return { waiver: null };
        }
        console.log('<<<<<<<<<<< results', results);
        const processedResult: WaiverData = results.reduce((w, row) => {
            // console.log('>>>>>>>>>>>>>>>row', row);
            if (!w.confirmation) {
                w.confirmation = row.CONFIRMATION;
                w.waiverId = row.WAIVER_ID;
                w.applicationDate = row.APPLICATION_DATE;
                w.startDate = row.START_DATE;
                w.endDate = row.END_DATE;
                w.waiverType = row.WAIVER_TYPE;
                w.waiverSubtype = row.WAIVER_SUBTYPE;
                w.processingStep = row.PROCESSING_STEP;
                w.status = row.STATUS;
                w.secSecured = row.SEC_SECURED;
                w.secManifest = row.SEC_MANIFEST;
                w.secAddSecurity = row.SEC_ADD_SECURITY;
                w.secTitle = row.SEC_TITLE;
                w.secName = row.SEC_NAME;
                w.secDate = row.SEC_DATE;
                w.secAccepted = row.SEC_ACCEPTED === 1 || row.SEC_ACCEPTED === 'Y';
                w.dasspType = row.DASSP_TYPE;
                w.dasspCompanyName = row.DASSP_COMPANY_NAME;
                w.dasspOperatorNum = row.DASSP_OPERATOR_NUM;
                w.dasCoordinator = row.DAS_COORDINATOR;
                w.dasspDepartAirport = row.DASSP_DEPART_AIRPORT;
                w.dasspDepartFbo = row.DASSP_DEPART_FBO;
                w.deptDate = row.DEPT_DATE;
                w.deptTime  = row.DEPT_TIME;
                w.arrivDate = row.ARRIV_DATE;
                w.arrivTime = row.ARRIV_TIME;
                w.deptDateDca = row.DEPT_DATE_DCA;
                w.deptTimeDca = row.DEPT_TIME_DCA;
                w.dasspDestAirport = row.DASSP_DEST_AIRPORT;
                w.purposeComments = row.PURPOSE_COMMENTS;
                w.destStreet = row.DEST_STREET;
                w.destCity = row.DEST_CITY;
                w.destState = row.DEST_STATE;
                w.destZip = row.DEST_ZIP;
                w.dcaraddist = row.DCARADDIST;
                w.flightAltitude = row.FLIGHT_ALTITUDE;
                w.latLong = row.LAT_LONG;
            }
            if (!w.proponents) {
                w.proponents = [];
            }
            w.proponents.push({
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
                operator: row.OPERATOR,
                owner: row.OWNER,
                licenseNumbers: row.LICENSE_NUMBERS,
            });
            return w;
        }, {});

        console.log('processedResult', processedResult);
        const aircraftList = (processedResult.confirmation
            ? (await getAircraft(processedResult.confirmation, processedResult.waiverType === WaiverTypeEnum.UAS)).aircraft
            : []);
        const manifestList = (processedResult.confirmation ? (await getManifest(processedResult.confirmation)).manifest : []);
        processedResult.aircraft = aircraftList;
        processedResult.manifest = manifestList;

        return { waiver: processedResult };
    } catch (error) {
        const dbError = categorizeError(error);
        return {
            waiver: null,
            error: dbError
        };
    }
}

export async function lazyGetWaivers(userId: string): Promise<{
  waivers: WaiverRequest[] | null;
  error?: DatabaseError;
}> {
  try {
    const results: any[] = await db(TABLE_NAMES.WaiverData)
      .select(
        'CONFIRMATION',
        'CONFIRMATION as ID',
        'WAIVER_TYPE as TYPE',
        'STATUS',
        'WAIVER_ID',
        'USER_ID',
        db.raw("TO_CHAR(APPLICATION_DATE, 'YYYY-MM-DD') as APPLICATION_DATE"),
        'ARCHIVED'
      )
      .orderBy('CONFIRMATION', 'desc');
      // .where('w.USER_ID', userId); // TODO: implement this when authentication is in place!

    if (!results || results.length === 0) {
      return { waivers: [] }; // Return an empty array if no results found
    }

    return { waivers: results.map((result) => dbNameConversion(result, false)) as unknown as WaiverRequest[] };
  } catch (error) {
    const dbError = categorizeError(error);
    return {
      waivers: null,
      error: dbError,
    };
  }
}

export async function getWaivers(userId: string): Promise<{
  waivers: WaiverData[] | null;
  error?: DatabaseError;
}> {
  try {
    const results: WaiverRecord[] = await db(`${TABLE_NAMES.WaiverData} as w`)
      .leftJoin(`${TABLE_NAMES.WaiverProponents} as p`, 'w.CONFIRMATION', '=', 'p.CONFIRMATION')
      .select(
        'w.CONFIRMATION',
        'w.WAIVER_ID',
        'w.USER_ID',
        'w.APPLICATION_DATE',
        'w.START_DATE',
        'w.END_DATE',
        'w.WAIVER_TYPE',
        'w.WAIVER_SUBTYPE',
        'w.PROCESSING_STEP',
        'w.STATUS',
        'p.PROP_ID',
        'p.TITLE',
        'p.FIRST_NM',
        'p.LAST_NM',
        'p.MIDDLE_NM',
        'p.COMPANY',
        'p.ADDRESS',
        'p.CITY',
        'p.STATE',
        'p.COUNTRY',
        'p.ZIP',
        'p.PHONE',
        'p.PHONE_24HR',
        'p.FAX',
        'p.EMAIL',
        'p.RTYPE',
        'p.OPERATOR',
        'p.OWNER',
        'p.LICENSE_NUMBERS'
      )
      .orderBy('w.CONFIRMATION', 'desc');
    //   .limit(12);
      // .where('w.USER_ID', userId); // TODO: implement this when authentication is in place!

    if (!results || results.length === 0) {
      return { waivers: [] }; // Return an empty array if no results found
    }

    const groupedResult: GroupedWaivers = groupWaiversByConfirmation(results);

    const processedWaivers: WaiverData[] = Object.values(groupedResult).map(processWaiverGroup);

    return { waivers: processedWaivers };
  } catch (error) {
    const dbError = categorizeError(error);
    return {
      waivers: null,
      error: dbError,
    };
  }
}

/**
 * Retrieves all aircraft for a given waiver confirmation number.
 * @param {number} confirmation The confirmation number to query by.
 * @returns {Promise<GetAircraftResult>} The result of the get operation, including an array of aircraft data or an error.
 */
export async function getAircraft(confirmation: string, uas: boolean = false): Promise<GetAircraftResult> {
    try {
        const result = await db(uas ? TABLE_NAMES.WaiverAircraftUnmanned : TABLE_NAMES.WaiverAircraft)
            .select('*')
            .where('CONFIRMATION', confirmation);

        // Convert the database column names to camelCase for each result object.
        const aircraft = result.map(aircraft => dbNameConversion(aircraft, false) as unknown as AircraftData);

        console.log('>>>> getAircraft result:', aircraft);
        return { aircraft };

    } catch (error) {
        const dbError = categorizeError(error);
        console.log('>>>> dbError', dbError);
        return {
            aircraft: [],
            error: dbError
        };
    }
}

/**
 * Upserts manifest data into the WAIVER_MANIFEST table.
 * @param {ManifestData} manifestData The data for the manifest to be inserted or updated.
 * @returns {Promise<UpsertManifestResult>} The result of the upsert operation, including the upserted manifest data or an error.
 */
export async function upsertManifest(manifestData: ManifestData): Promise<UpsertManifestResult> {
    try {
        let result: any[] = [];
        let manifestResult: UpsertManifestResult = {};

        // Use a transaction for the upsert operation to ensure atomicity.
        await db.transaction(async (trx: any) => {
            if (!manifestData.personId) {
                // If personId is not present, this is a new manifest. Perform an INSERT.
                console.log('>>>>>>> Inserting new manifest with waiver ID:', manifestData.waiverId);

                result = await trx(TABLE_NAMES.WaiverManifest)
                    .insert(dbNameConversion({
                        ...manifestData,
                        // Get the next sequence value for the ID.
                        personId: db.raw('PERSON_ID_SEQ.nextval'),
                        waiver_id: manifestData.waiverId,
                    }), ['*']); // Return all columns of the inserted row.

                if (result && result.length > 0) {
                    manifestResult = { manifest: dbNameConversion(result[0], false) as unknown as ManifestData };
                } else {
                    manifestResult = { manifest: null };
                }

            } else {
                // If personId is present, this is an existing manifest. Perform an UPDATE.
                console.log('>>>>>>> Updating manifest with ID:', manifestData.personId);

                const { personId, ...updatedManifestDataWithoutPersonId } = manifestData;

                const convertedData = dbNameConversion(updatedManifestDataWithoutPersonId);
                result = await trx(TABLE_NAMES.WaiverManifest)
                    .where('PERSON_ID', manifestData.personId)
                    .update(convertedData);

                console.log('>>>>>>>>>> update manifest result', result);
                if (result) {
                    manifestResult = { manifest: manifestData };
                } else {
                    manifestResult = { manifest: null };
                }
            }
            await trx.commit();
        });

        console.log('>>>> manifestResult', manifestResult);
        return { manifest: manifestResult?.manifest };

    } catch (error) {
        const dbError = categorizeError(error);
        console.log('>>>> dbError', dbError);
        return {
            manifest: null,
            error: dbError
        };
    }
}

/**
 * Deletes a manifest from the WAIVER_MANIFEST table.
 * @param {string} personId The ID of the manifest to be deleted.
 * @returns {Promise<DeleteManifestResult>} An object indicating the success of the operation.
 */
export async function deleteManifest(personId: string): Promise<DeleteManifestResult> {
    try {
        console.log('>>>>>>> Deleting manifest with ID:', personId);

        // The 'del' method performs a DELETE query on the table.
        const result = await db(TABLE_NAMES.WaiverManifest)
            .where('PERSON_ID', personId)
            .del();

        // The result is the number of rows affected.
        if (result === 1) {
            console.log(`Manifest with ID ${personId} successfully deleted.`);
            return { success: true };
        } else {
            console.log(`No manifest found with ID ${personId} to delete.`);
            return { success: false, error: { message: 'Manifest not found.', type: 'QUERY_ERROR', details: '' } };
        }

    } catch (error) {
        const dbError = categorizeError(error);
        console.log('>>>> dbError', dbError);
        return {
            success: false,
            error: dbError
        };
    }
}

/**
 * Retrieves manifest data from the WAIVER_MANIFEST table based on a waiver ID.
 * @param {string} waiverId The ID of the waiver to retrieve manifests for.
 * @returns {Promise<GetManifestResult>} The result of the get operation, including the list of manifest data or an error.
 */
export async function getManifest(waiverId: string): Promise<GetManifestResult> {
    try {
        // Retrieve all manifests for a given waiver ID.
        const result = await db(TABLE_NAMES.WaiverManifest)
            .select('*')
            .where('WAIVER_ID', waiverId);

        // Convert the database column names to camelCase for each result object.
        const manifest = result.map(manifest => dbNameConversion(manifest, false) as unknown as ManifestData);

        console.log('>>>> getManifest result:', manifest);
        return { manifest };

    } catch (error) {
        const dbError = categorizeError(error);
        console.log('>>>> dbError', dbError);
        return {
            manifest: [],
            error: dbError
        };
    }
}

/**
 * Get waiver process data by ID from WAIVER_PROCESS table
 * TODO: To be protected by user roles
 */
export async function getWaiverProcessData(waiverId: string): Promise<{
    process: WaiverProcessData | null;
    error?: DatabaseError;
}> {
    try {
        const result = await db
            .select('*')
            .from('WAIVER_PROCESS')
            .where('WAIVER_ID', waiverId)
            .first();

        if (!result) {
            return { process: null };
        }

        const process: WaiverProcessData = {
            waiverId: result.WAIVER_ID,
            processingDate: result.PROCESSING_DATE,
            processingSignoff: result.PROCESSING_SIGNOFF,
            processingApproved: result.PROCESSING_APPROVED,
            processingComments: result.PROCESSING_COMMENTS,
            determinedDate: result.DETERMINED_DATE,
            determinedSignoff: result.DETERMINED_SIGNOFF,
            determinedApproved: result.DETERMINED_APPROVED,
            determinedRejectionReason: result.DETERMINED_REJECTION_REASON,
            determinedComments: result.DETERMINED_COMMENTS,
            determinedApprovalCode: result.DETERMINED_APPROVAL_CODE,
            determinedParagraphs: result.DETERMINED_PARAGRAPHS,
            vettedDate: result.VETTED_DATE,
            vettedSignoff: result.VETTED_SIGNOFF,
            vettedApproved: result.VETTED_APPROVED,
            vettedComments: result.VETTED_COMMENTS,
            vettedApprovalCode: result.VETTED_APPROVAL_CODE,
            vettedRejectionReason: result.VETTED_REJECTION_REASON,
            qaDate: result.QA_DATE,
            qaSignoff: result.QA_SIGNOFF,
            qaApproved: result.QA_APPROVED,
            qaComments: result.QA_COMMENTS,
            qaApprovalCode: result.QA_APPROVAL_CODE,
            qaRejectionReason: result.QA_REJECTION_REASON,
            certifiedDate: result.CERTIFIED_DATE,
            certifiedSignoff: result.CERTIFIED_SIGNOFF,
            certifiedApproved: result.CERTIFIED_APPROVED,
            certifiedComments: result.CERTIFIED_COMMENTS,
            certifiedApprovalCode: result.CERTIFIED_APPROVAL_CODE,
            certifiedRejectionReason: result.CERTIFIED_REJECTION_REASON,
            sentDate: result.SENT_DATE,
            sentSignoff: result.SENT_SIGNOFF,
            sentApproved: result.SENT_APPROVED,
            sentComments: result.SENT_COMMENTS,
            sentEmailBody: result.SENT_EMAIL_BODY,
            sentEmailTo: result.SENT_EMAIL_TO,
            createdBy: result.CREATED_BY,
            createdDate: result.CREATED_DATE,
            updatedBy: result.UPDATED_BY,
            updatedDate: result.UPDATED_DATE
        };

        return { process };
    } catch (error) {
        const dbError = categorizeError(error);
        return {
            process: null,
            error: dbError
        };
    }
}

/**
 * Get combined waiver and process data (service function)
 */
export async function getWaiverWithProcessDataService(params: GetWaiverParams): Promise<GetWaiverResult> {
    try {
        // Get waiver data
        const waiverResult = await getWaiverData(params.waiverId);
        if (waiverResult.error) {
            return {
                waiver: null,
                process: null,
                error: waiverResult.error
            };
        }

        // TODO: Add role-based permission check here for process data
        // Get waiver-process data
        const processResult = await getWaiverProcessData(params.waiverId);
        if (processResult.error) {
            return {
                waiver: waiverResult.waiver,
                process: null,
                error: processResult.error
            };
        }

        console.log('>>>>>>>>>>>>>>>>>>>>>>> waiverResult.waiver', waiverResult.waiver);

        return {
            waiver: waiverResult.waiver,
            process: processResult.process
        };
    } catch (error) {
        const dbError = categorizeError(error);
        return {
            waiver: null,
            process: null,
            error: dbError
        };
    }
}

/**
 * Update a process step for a waiver
 */
export async function updateProcessStep(params: UpdateProcessStepParams): Promise<UpdateProcessStepResult> {
    try {
        const stepColumns = {
            'PROCESSING': {
                date: 'PROCESSING_DATE',
                signoff: 'PROCESSING_SIGNOFF',
                approved: 'PROCESSING_APPROVED',
                comments: 'PROCESSING_COMMENTS'
            },
            'DETERMINED': {
                date: 'DETERMINED_DATE',
                signoff: 'DETERMINED_SIGNOFF',
                approved: 'DETERMINED_APPROVED',
                rejection: 'DETERMINED_REJECTION_REASON',
                comments: 'DETERMINED_COMMENTS',
                approvalCode: 'DETERMINED_APPROVAL_CODE',
                paragraphs: 'DETERMINED_PARAGRAPHS'
            },
            'VETTED': {
                date: 'VETTED_DATE',
                signoff: 'VETTED_SIGNOFF',
                approved: 'VETTED_APPROVED',
                comments: 'VETTED_COMMENTS',
                approvalCode: 'VETTED_APPROVAL_CODE',
                rejection: 'VETTED_REJECTION_REASON'
            },
            'QA': {
                date: 'QA_DATE',
                signoff: 'QA_SIGNOFF',
                approved: 'QA_APPROVED',
                comments: 'QA_COMMENTS',
                approvalCode: 'QA_APPROVAL_CODE',
                rejection: 'QA_REJECTION_REASON'
            },
            'CERTIFIED': {
                date: 'CERTIFIED_DATE',
                signoff: 'CERTIFIED_SIGNOFF',
                approved: 'CERTIFIED_APPROVED',
                comments: 'CERTIFIED_COMMENTS',
                approvalCode: 'CERTIFIED_APPROVAL_CODE',
                rejection: 'CERTIFIED_REJECTION_REASON'
            },
            'SENT': {
                date: 'SENT_DATE',
                signoff: 'SENT_SIGNOFF',
                approved: 'SENT_APPROVED',
                comments: 'SENT_COMMENTS',
                emailBody: 'SENT_EMAIL_BODY',
                emailTo: 'SENT_EMAIL_TO'
            }
        };

        const columns = stepColumns[params.step];
        if (!columns) {
            return {
                success: false,
                error: {
                    type: 'QUERY_ERROR',
                    message: 'Invalid processing step',
                    details: `Step ${params.step} is not valid`
                }
            };
        }

        // Determine next processing step and status
        const getNextStepAndStatus = (currentStep: string, approved: 'Y' | 'N'): { step: string; status: string } => {
            if (approved === 'N') {
                return {
                    step: `REJECTED_${currentStep}`,
                    status: 'REJECTED'
                };
            }

            const stepOrder = ['PROCESSING', 'DETERMINED', 'VETTED', 'QA', 'CERTIFIED', 'SENT'];
            const currentIndex = stepOrder.indexOf(currentStep);

            if (currentIndex === -1 || currentIndex === stepOrder.length - 1) {
                return {
                    step: 'COMPLETED',
                    status: 'COMPLETED'
                };
            }

            const nextStep = stepOrder[currentIndex + 1];
            return {
                step: nextStep,
                status: "PROCESSING"
            };
        };

        const { step: nextStep, status: newStatus } = getNextStepAndStatus(params.step, params.approved);

        // Prepare WAIVER_PROCESS update
        const updateData: any = {
            [columns.date]: new Date(),
            [columns.signoff]: params.signoff,
            [columns.approved]: params.approved,
            UPDATED_BY: params.signoff,
            UPDATED_DATE: new Date()
        };

        // Add comments if provided
        if (params.comments && 'comments' in columns) {
            updateData[columns.comments] = params.comments;
        }

        // Add rejection reason if denied
        if (params.approved === 'N' && params.rejectionReason && 'rejection' in columns) {
            updateData[columns.rejection] = params.rejectionReason;
        }

        // Add approval code if approved and supported
        if (params.approved === 'Y' && params.approvalCode && 'approvalCode' in columns) {
            updateData[columns.approvalCode] = params.approvalCode;
        }

        // Add step-specific fields
        if (params.step === 'DETERMINED') {
            // Determined step specific fields
            if (params.paragraphs && 'paragraphs' in columns) {
                updateData[columns.paragraphs] = JSON.stringify(params.paragraphs);
            }
        }

        if (params.step === 'SENT') {
            // Sent step specific fields
            if (params.emailBody && 'emailBody' in columns) {
                updateData[columns.emailBody] = params.emailBody;
            }
            if (params.emailTo && 'emailTo' in columns) {
                updateData[columns.emailTo] = params.emailTo;
            }
        }

        // Check if WAIVER_PROCESS record exists
        const existingRecord = await db
            .select('WAIVER_ID')
            .from('WAIVER_PROCESS')
            .where('WAIVER_ID', params.waiverId)
            .first();

        // Update/Insert WAIVER_PROCESS record
        if (existingRecord) {
            await db('WAIVER_PROCESS')
                .where('WAIVER_ID', params.waiverId)
                .update(updateData);
        } else {
            await db('WAIVER_PROCESS').insert({
                WAIVER_ID: params.waiverId,
                ...updateData,
                CREATED_BY: params.signoff,
                CREATED_DATE: new Date()
            });
        }

        // Update WAIVER_DATA.PROCESSING_STEP and STATUS
        await db(TABLE_NAMES.WaiverData)
            .where('WAIVER_ID', params.waiverId)
            .update({
                PROCESSING_STEP: nextStep,
                STATUS: newStatus
            });

        return { success: true };
    } catch (error) {
        const dbError = categorizeError(error);
        return {
            success: false,
            error: dbError
        };
    }
}

/**
 * Get waiver process steps with user information for ProcessStatusBar
 */
export async function getWaiverProcessSteps(waiverId: string): Promise<{
    stepsData: Array<{
        state: string;
        label: string;
        user: string | null;
        date: string | null;
    }>;
    error?: DatabaseError;
}> {
    try {
        const result = await db
            .select([
                'wp.PROCESSING_DATE',
                'wp.PROCESSING_SIGNOFF',
                'wp.DETERMINED_DATE',
                'wp.DETERMINED_SIGNOFF',
                'wp.VETTED_DATE',
                'wp.VETTED_SIGNOFF',
                'wp.QA_DATE',
                'wp.QA_SIGNOFF',
                'wp.CERTIFIED_DATE',
                'wp.CERTIFIED_SIGNOFF',
                'wp.SENT_DATE',
                'wp.SENT_SIGNOFF',
                // Join with accounts for user names
                'acc_proc.FIRST_NAME as PROCESSING_FIRST_NAME',
                'acc_proc.LAST_NAME as PROCESSING_LAST_NAME',
                'acc_det.FIRST_NAME as DETERMINED_FIRST_NAME',
                'acc_det.LAST_NAME as DETERMINED_LAST_NAME',
                'acc_vet.FIRST_NAME as VETTED_FIRST_NAME',
                'acc_vet.LAST_NAME as VETTED_LAST_NAME',
                'acc_qa.FIRST_NAME as QA_FIRST_NAME',
                'acc_qa.LAST_NAME as QA_LAST_NAME',
                'acc_cert.FIRST_NAME as CERTIFIED_FIRST_NAME',
                'acc_cert.LAST_NAME as CERTIFIED_LAST_NAME',
                'acc_sent.FIRST_NAME as SENT_FIRST_NAME',
                'acc_sent.LAST_NAME as SENT_LAST_NAME'
            ])
            .from('WAIVER_PROCESS as wp')
            .leftJoin('ACCOUNTS as acc_proc', 'wp.PROCESSING_SIGNOFF', 'acc_proc.USER_ID')
            .leftJoin('ACCOUNTS as acc_det', 'wp.DETERMINED_SIGNOFF', 'acc_det.USER_ID')
            .leftJoin('ACCOUNTS as acc_vet', 'wp.VETTED_SIGNOFF', 'acc_vet.USER_ID')
            .leftJoin('ACCOUNTS as acc_qa', 'wp.QA_SIGNOFF', 'acc_qa.USER_ID')
            .leftJoin('ACCOUNTS as acc_cert', 'wp.CERTIFIED_SIGNOFF', 'acc_cert.USER_ID')
            .leftJoin('ACCOUNTS as acc_sent', 'wp.SENT_SIGNOFF', 'acc_sent.USER_ID')
            .where('wp.WAIVER_ID', waiverId)
            .first();

        const formatUserName = (firstName: string | null, lastName: string | null): string | null => {
            if (!firstName && !lastName) return null;
            if (!firstName) return lastName;
            if (!lastName) return firstName;
            return `${lastName}, ${firstName}`;
        };

        const formatDate = (date: Date | null): string | null => {
            if (!date) return null;
            return new Date(date).toLocaleDateString('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric'
            });
        };

        const stepsData = [
            {
                state: "processing",
                label: "Processing",
                user: result ? formatUserName(result.PROCESSING_FIRST_NAME, result.PROCESSING_LAST_NAME) : null,
                date: result ? formatDate(result.PROCESSING_DATE) : null
            },
            {
                state: "determined",
                label: "Determined",
                user: result ? formatUserName(result.DETERMINED_FIRST_NAME, result.DETERMINED_LAST_NAME) : null,
                date: result ? formatDate(result.DETERMINED_DATE) : null
            },
            {
                state: "vetted",
                label: "Vetted",
                user: result ? formatUserName(result.VETTED_FIRST_NAME, result.VETTED_LAST_NAME) : null,
                date: result ? formatDate(result.VETTED_DATE) : null
            },
            {
                state: "qa",
                label: "QA",
                user: result ? formatUserName(result.QA_FIRST_NAME, result.QA_LAST_NAME) : null,
                date: result ? formatDate(result.QA_DATE) : null
            },
            {
                state: "certified",
                label: "Certified",
                user: result ? formatUserName(result.CERTIFIED_FIRST_NAME, result.CERTIFIED_LAST_NAME) : null,
                date: result ? formatDate(result.CERTIFIED_DATE) : null
            },
            {
                state: "sent",
                label: "Sent",
                user: result ? formatUserName(result.SENT_FIRST_NAME, result.SENT_LAST_NAME) : null,
                date: result ? formatDate(result.SENT_DATE) : null
            }
        ];

        return { stepsData };
    } catch (error) {
        const dbError = categorizeError(error);
        return {
            stepsData: [],
            error: dbError
        };
    }
}