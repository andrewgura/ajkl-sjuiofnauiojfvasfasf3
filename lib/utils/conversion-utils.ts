import moment from "moment";

/**
 * Parses a date string or accepts a Date object, and returns it in a consistent YYYY-MM-DD format.
 * It handles both MM/DD/YYYY and YYYY-MM-DD input formats as strings.
 *
 * @param {string | Date} dateValue - The date string or Date object to format.
 * @returns {string} The formatted date string in YYYY-MM-DD format, or an empty string if invalid.
 */
export const formatDateForForm = (dateValue: string | Date): string => {
    if (!dateValue) {
        return '';
    }

    let parsedDate;

    if (dateValue instanceof Date) {
        // If it's already a Date object, use it directly
        parsedDate = moment(dateValue);
    } else {
        // Otherwise, it's a string, so parse it with flexible formats
        parsedDate = moment(dateValue, ['MM/DD/YYYY', 'YYYY-MM-DD'], true);
    }

    // If the parsed date is valid, format it to the desired YYYY-MM-DD format.
    if (parsedDate.isValid()) {
        return parsedDate.format('YYYY-MM-DD');
    }

    return '';
};
