'use server';

import {
    getWaiverWithProcessDataService,
    updateProcessStep as updateProcessStepService,
    getWaiverProcessSteps as getWaiverProcessStepsService,
    upsertWaiver as upsertWaiverService,
    upsertAircraft as upsertAircraftService,
    deleteAircraft as deleteAircraftService,
    getWaivers as getWaiversService,
    lazyGetWaivers as lazyGetWaiversService,
    upsertManifest as upsertManifestService,
    deleteManifest as deleteManifestService,
} from './waiver-service';
import type {
    AircraftData,
    AircraftUnmannedData,
    DeleteAircraftResult,
    DeleteManifestResult,
    GetWaiverParams,
    GetWaiverResult,
    GetWaiversResult,
    LazyGetWaiversResult,
    ManifestData,
    UpdateProcessStepParams,
    UpdateProcessStepResult,
    UpsertAircraftResult,
    UpsertManifestResult,
    UpsertWaiverResult,
    WaiverData
} from './waiver-types';


export async function getWaivers(userId: string): Promise<GetWaiversResult> {
    return await getWaiversService(userId);
}

export async function lazyGetWaivers(userId: string): Promise<LazyGetWaiversResult> {
    return await lazyGetWaiversService(userId);
}

/**
 * Get waiver data with process information
 */
export async function getWaiverWithProcessData(waiverId: string): Promise<GetWaiverResult> {
    const params: GetWaiverParams = { waiverId };
    return await getWaiverWithProcessDataService(params);
}

/**
 * Update a processing step
 */
export async function updateWaiverProcessStep(params: UpdateProcessStepParams): Promise<UpdateProcessStepResult> {
    return await updateProcessStepService(params);
}

/**
 * Upsert a waiver
 */
export async function upsertWaiverAction(params: WaiverData): Promise<UpsertWaiverResult> {
    return await upsertWaiverService(params);
}

/**
 * Upsert an aircraft
 */
export async function upsertAircraftAction(params: AircraftData | AircraftUnmannedData, uas: boolean = false): Promise<UpsertAircraftResult> {
    return await upsertAircraftService(params, uas);
}

/**
 * Delete an aircraft
 */
export async function deleteAircraftAction(aircraftId: string, uas: boolean = false): Promise<DeleteAircraftResult> {
    return await deleteAircraftService(aircraftId, uas);
}

/**
 * Upsert a manifest
 */
export async function upsertManifestAction(params: ManifestData): Promise<UpsertManifestResult> {
    return await upsertManifestService(params);
}

/**
 * Delete a manifest
 */
export async function deleteManifestAction(personId: string): Promise<DeleteManifestResult> {
    return await deleteManifestService(personId);
}

/**
 * Approve a processing step
 */
export async function approveProcessStep(
    waiverId: string,
    step: 'PROCESSING' | 'DETERMINED' | 'VETTED' | 'QA' | 'CERTIFIED' | 'SENT',
    signoff: string,
    comments?: string,
    approvalCode?: string,
    paragraphs?: { id: number; content: string; }[],
    emailBody?: string,
    emailTo?: string
): Promise<UpdateProcessStepResult> {
    const params: UpdateProcessStepParams = {
        waiverId,
        step,
        approved: 'Y',
        signoff,
        comments,
        approvalCode,
        paragraphs,
        emailBody,
        emailTo
    };
    return await updateProcessStepService(params);
}

/**
 * Deny a processing step
 */
export async function denyProcessStep(
    waiverId: string,
    step: 'PROCESSING' | 'DETERMINED' | 'VETTED' | 'QA' | 'CERTIFIED' | 'SENT',
    signoff: string,
    rejectionReason?: string,
    comments?: string
): Promise<UpdateProcessStepResult> {
    const params: UpdateProcessStepParams = {
        waiverId,
        step,
        approved: 'N',
        signoff,
        rejectionReason,
        comments
    };
    return await updateProcessStepService(params);
}

/**
 * Sent Step approve
 */
export async function sendWaiverEmail(
    waiverId: string,
    signoff: string,
    emailBody: string,
    emailTo: string,
    comments?: string
): Promise<UpdateProcessStepResult> {
    const params: UpdateProcessStepParams = {
        waiverId,
        step: 'SENT',
        approved: 'Y',
        signoff,
        comments,
        emailBody,
        emailTo
    };
    return await updateProcessStepService(params);
}

/**
 * Get waiver process steps with user information
 */
export async function getWaiverProcessSteps(waiverId: string): Promise<{
    stepsData: Array<{
        state: string;
        label: string;
        user: string | null;
        date: string | null;
    }>;
    error?: any;
}> {
    return await getWaiverProcessStepsService(waiverId);
}