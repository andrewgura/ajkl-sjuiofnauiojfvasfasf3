import { camelCase, constantCase } from "change-case";

export interface DatabaseError {
    type: 'CONNECTION_ERROR' | 'QUERY_ERROR' | 'UNKNOWN_ERROR';
    message: string;
    details: string;
}

/**
 * Categorize database errors for consistent error handling across services
 */
export function categorizeError(error: any): DatabaseError {
    const errorMessage = error?.message || String(error);

    // Check for connection errors
    if (errorMessage.includes('connection') ||
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

export function dbNameConversion(inputData: Record<string, unknown>, toDb: boolean = true): Record<string, unknown> {
    const outputData: Record<string, unknown> = {};
    // toDb !== true: constant-case & snake-case keys to camel-case keys: like WAIVER_ID to waiverId
    // toDb === true: from camel-case keys to constant-case & snake-case keys: like waiverId to WAIVER_ID
    for (const key of Object.keys(inputData)) {
        if (inputData[key] !== null) {
            outputData[toDb ? constantCase(key): camelCase(key)] = inputData[key];
        }
    }
    return outputData;
}

export function dbNameConversionArray(inputData: Array<Record<string, unknown>>, toDb: boolean = true): Array<Record<string, unknown>> {
    const outputData: Array<Record<string, unknown>> = [{}];
    // toDb !== true: constant-case & snake-case keys to camel-case keys: like WAIVER_ID to waiverId
    // toDb === true: from camel-case keys to constant-case & snake-case keys: like waiverId to WAIVER_ID
    for (let i = 0; i < inputData.length; i++) {
        for (const key of Object.keys(inputData[i])) {
            if (inputData[i][key] !== null) {
                outputData[i][toDb ? constantCase(key) : camelCase(key)] = inputData[i][key];
            }
        }
    }
    return outputData;
}
