'use server'

import {
    getWaiverMetadata,
    getParagraphsForCategory,
    updateParagraph
} from './waiver-service';

import type {
    AllWaiverData,
    ParagraphEditState,
    DatabaseError
} from './waiver-types';

// Initial Load to help with load time
export async function fetchWaiverMetadata() {
    return await getWaiverMetadata();
}

// Load specific categories content on demand
export async function fetchParagraphsForCategory(
    waiverType: string,
    subType: string,
    distance?: string
) {
    return await getParagraphsForCategory(waiverType, subType, distance);
}

export async function saveParagraphChanges(editState: ParagraphEditState): Promise<{ success: boolean; error?: DatabaseError }> {
    return await updateParagraph(editState);
}