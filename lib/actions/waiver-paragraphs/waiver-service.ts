import db from '@/lib/db';
import type {
    FilterCategory,
    ParagraphEditState,
    DatabaseError,
} from './waiver-types';

function transformToFilterCategoriesWithDistance(dbResults: any[]): FilterCategory[] {
    const categoryMap = new Map<string, Set<string>>();

    dbResults.forEach(row => {
        const waiverType = row.WAIVERTYPE;
        let subType = row.SUBTYPE;
        const distance = row.DISTANCE;
        const notice = row.NOTICE;

        if (notice === 'Denial') {
            return;
        }

        if (distance) {
            subType = `${subType} (${distance})`;
        }

        if (!categoryMap.has(waiverType)) {
            categoryMap.set(waiverType, new Set());
        }
        categoryMap.get(waiverType)!.add(subType);
    });

    const categories = Array.from(categoryMap.entries()).map(([waiverType, subTypes]) => ({
        id: waiverType.toLowerCase().replace(/\s+/g, '-'),
        label: waiverType,
        selected: true,
        items: Array.from(subTypes).map(subType => ({
            id: subType.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, ''),
            label: subType,
            selected: false
        }))
    }));

    const denialResults = dbResults.filter(row => row.NOTICE === 'Denial');
    const denialMap = new Map<string, Set<string>>();

    denialResults.forEach(row => {
        const waiverType = row.WAIVERTYPE;
        const subType = 'Denial';

        if (!denialMap.has(waiverType)) {
            denialMap.set(waiverType, new Set());
        }
        denialMap.get(waiverType)!.add(subType);
    });


    denialMap.forEach((subTypes, waiverType) => {
        const category = categories.find(cat => cat.label === waiverType);
        if (category) {
            Array.from(subTypes).forEach(subType => {
                category.items.push({
                    id: subType.toLowerCase().replace(/\s+/g, '-'),
                    label: subType,
                    selected: false
                });
            });
        }
    });

    return categories;
}

function categorizeError(error: any): DatabaseError {
    const errorMessage = error?.message || 'Unknown error occurred';

    // Check for connection-related errors
    if (errorMessage.includes('connect') ||
        errorMessage.includes('ECONNREFUSED') ||
        errorMessage.includes('ENOTFOUND') ||
        errorMessage.includes('timeout') ||
        errorMessage.includes('Network') ||
        error?.code === 'ECONNREFUSED' ||
        error?.code === 'ENOTFOUND' ||
        error?.code === 'ETIMEDOUT') {
        return {
            type: 'CONNECTION_ERROR',
            message: 'Unable to connect to the database',
            details: errorMessage
        };
    }

    // Check for query-related errors
    if (errorMessage.includes('ORA-') ||
        errorMessage.includes('syntax') ||
        errorMessage.includes('table') ||
        errorMessage.includes('column')) {
        return {
            type: 'QUERY_ERROR',
            message: 'Database query failed',
            details: errorMessage
        };
    }

    // Default to unknown error
    return {
        type: 'UNKNOWN_ERROR',
        message: 'An unexpected error occurred',
        details: errorMessage
    };
}

// initial load with metadata only
export async function getWaiverMetadata(): Promise<{
    filterCategories: FilterCategory[];
    error?: DatabaseError;
}> {
    try {
        const categoryResults = await db
            .select('WAIVERTYPE', 'SUBTYPE', 'DISTANCE', 'NOTICE')
            .from('WAIVERPARAGRAPH')
            .distinct()
            .orderBy(['WAIVERTYPE', 'SUBTYPE', 'DISTANCE', 'NOTICE']);

        const filterCategories = transformToFilterCategoriesWithDistance(categoryResults);

        return {
            filterCategories,
        };
    } catch (error) {
        const dbError = categorizeError(error);

        return {
            filterCategories: [],
            error: dbError
        };
    }
}

// Fetch content for a specific category/subtype
export async function getParagraphsForCategory(
    waiverType: string,
    subType: string,
    distance?: string
): Promise<{
    paragraphs: any[];
    error?: DatabaseError;
}> {
    try {
        let query = db
            .select('*')
            .from('WAIVERPARAGRAPH')
            .where('WAIVERTYPE', waiverType);

        if (subType.toLowerCase() === 'denial') {
            query = query.where('NOTICE', 'Denial');
        } else {
            query = query.where('SUBTYPE', subType)
                .where('NOTICE', 'Approval');
        }

        if (distance && distance !== '---') {
            query = query.where('DISTANCE', distance);
        } else if (!distance || distance === '---') {
            query = query.whereNull('DISTANCE');
        }

        const paragraphs = await query.orderBy('PARAGRAPH');

        return { paragraphs };
    } catch (error) {
        const dbError = categorizeError(error);
        return {
            paragraphs: [],
            error: dbError
        };
    }
}

export async function getFilterCategories(): Promise<FilterCategory[]> {
    try {
        const { filterCategories, error } = await getWaiverMetadata();
        if (error) {
            throw new Error(error.message);
        }
        return filterCategories;
    } catch (error) {
        return [];
    }
}

// Update a paragraph
export async function updateParagraph(editState: ParagraphEditState): Promise<{ success: boolean; error?: DatabaseError }> {
    try {
        const result = await db('WAIVERPARAGRAPH')
            .where('ID', editState.id)
            .update({
                WAIVERTYPE: editState.type,
                SUBTYPE: editState.subtype,
                DISTANCE: editState.distance === '---' ? null : editState.distance,
                NOTICE: editState.notice === '---' ? null : editState.notice,
                STARTTAG: editState.startTag || null,
                ENDTAG: editState.endTag || null,
                TEXT: editState.text
            });

        if (result === 0) {
            return {
                success: false,
                error: {
                    type: 'QUERY_ERROR',
                    message: 'No rows were updated. The paragraph may not exist.',
                    details: `No paragraph found with ID: ${editState.id}`
                }
            };
        }

        return { success: true };
    } catch (error) {

        const dbError = categorizeError(error);

        return {
            success: false,
            error: dbError
        };
    }
}