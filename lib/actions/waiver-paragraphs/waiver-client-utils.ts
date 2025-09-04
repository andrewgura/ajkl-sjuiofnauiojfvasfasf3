import type {
    Paragraph,
    ParagraphSet,
    ParagraphEditState
} from './waiver-types';

// Client-side filtering functions
export function filterParagraphsForSet(
    allParagraphs: any[],
    waiverType: string,
    subType: string,
    distance?: string
): ParagraphSet {
    const filteredParagraphs = allParagraphs.filter(row => {
        const typeMatch = row.WAIVERTYPE === waiverType;
        const subtypeMatch = row.SUBTYPE === subType;

        let distanceMatch = true;
        if (distance && distance !== '---') {
            distanceMatch = row.DISTANCE === distance;
        } else if (!distance) {
            distanceMatch = !row.DISTANCE;
        }

        return typeMatch && subtypeMatch && distanceMatch;
    });

    const paragraphs: Paragraph[] = filteredParagraphs.map(row => ({
        id: row.ID.toString(),
        number: row.PARAGRAPH,
        content: row.TEXT || '',
        startTag: row.STARTTAG,
        endTag: row.ENDTAG
    }));

    const title = `${waiverType} / ${subType}${distance ? ` (${distance})` : ''}`;

    return {
        id: `${waiverType}-${subType}${distance ? `-${distance}` : ''}`.toLowerCase(),
        title,
        paragraphs: paragraphs.sort((a, b) => a.number - b.number)
    };
}

export function findParagraphForEdit(
    allParagraphs: any[],
    waiverType: string,
    subType: string,
    paragraphNumber: number,
    distance?: string
): ParagraphEditState | null {
    const paragraph = allParagraphs.find(row => {
        const typeMatch = row.WAIVERTYPE === waiverType;
        const subtypeMatch = row.SUBTYPE === subType;
        const paragraphMatch = row.PARAGRAPH === paragraphNumber;

        let distanceMatch = true;
        if (distance && distance !== '---') {
            distanceMatch = row.DISTANCE === distance;
        } else if (!distance) {
            distanceMatch = !row.DISTANCE;
        }

        return typeMatch && subtypeMatch && paragraphMatch && distanceMatch;
    });

    if (!paragraph) {
        return null;
    }

    return {
        id: paragraph.ID.toString(),
        type: paragraph.WAIVERTYPE,
        subtype: paragraph.SUBTYPE,
        distance: paragraph.DISTANCE || '---',
        notice: paragraph.NOTICE || '---',
        startTag: paragraph.STARTTAG || '',
        endTag: paragraph.ENDTAG || '',
        text: paragraph.TEXT || ''
    };
}