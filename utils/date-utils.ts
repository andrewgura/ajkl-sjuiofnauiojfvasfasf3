import { format, isValid, parseISO } from 'date-fns';

/**
 * Options for date formatting
 */
interface DateFormatOptions {
    format?: 'short' | 'medium' | 'long' | 'full';
    includeTime?: boolean;
    timeZone?: string;
}

/**
 * Formats a date string or Date object into a localized string representation
 * @param date - Date string or Date object to format
 * @param options - Formatting options
 * @param locale - Locale string (defaults to 'en-US')
 * @returns Formatted date string
 * @throws Error if date is invalid
 */
export const formatDate = (
    date: string | Date,
    options: DateFormatOptions = {},
    locale: string = 'en-US'
): string => {
    try {
        // Convert string to Date if necessary
        const dateObj = typeof date === 'string' ? new Date(date) : date;

        // Validate date
        if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
            throw new Error('Invalid date provided');
        }

        // Default formatting options
        const formatOptions: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: options.format === 'long' || options.format === 'full' ? 'long' : 'short',
            day: 'numeric',
            timeZone: options.timeZone,
        };

        if (options.includeTime) {
            formatOptions.hour = 'numeric';
            formatOptions.minute = 'numeric';
            formatOptions.second = options.format === 'full' ? 'numeric' : undefined;
        }

        return dateObj.toLocaleDateString(locale, formatOptions);
    } catch (error: any) {
        console.log(`Failed to format date: ${error.message}`);
        return '';
    }
};

/**
 * Formats a date string using date-fns
 * @param dateString - Date string to format
 * @param formatStr - Format string (default: 'MM/dd/yyyy')
 * @param fallback - Fallback string if date is invalid (default: '-')
 * @returns Formatted date string or fallback value if invalid
 */
export const formatDateFns = (
    dateString: string | null | undefined,
    formatStr: string = 'MM/dd/yyyy',
    fallback: string = '-'
): string => {
    if (!dateString) return fallback;
    try {
        const date = parseISO(dateString);
        return isValid(date) ? format(date, formatStr) : fallback;
    } catch (error) {
        console.error(`Failed to format date: ${error}`);
        return fallback;
    }
};