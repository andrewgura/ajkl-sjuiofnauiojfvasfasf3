"use client"

import React from 'react';
import { Card } from "@/components/ui/card";
import { AlertTriangle, Wifi, Database } from 'lucide-react';
import type { DatabaseError } from '../../../../lib/actions/waiver-paragraphs/waiver-types';

interface ErrorStateProps {
    error: DatabaseError;
}

const ErrorState: React.FC<ErrorStateProps> = ({
    error
}) => {

    const getErrorIcon = () => {
        switch (error.type) {
            case 'CONNECTION_ERROR':
                return <Wifi className="w-12 h-12 text-red-500" />;
            case 'QUERY_ERROR':
                return <Database className="w-12 h-12 text-orange-500" />;
            default:
                return <AlertTriangle className="w-12 h-12 text-red-500" />;
        }
    };

    const getErrorColor = () => {
        switch (error.type) {
            case 'CONNECTION_ERROR':
                return 'border-red-200 bg-red-50';
            case 'QUERY_ERROR':
                return 'border-orange-200 bg-orange-50';
            default:
                return 'border-red-200 bg-red-50';
        }
    };

    const getErrorTitle = () => {
        switch (error.type) {
            case 'CONNECTION_ERROR':
                return 'Database Connection Failed';
            case 'QUERY_ERROR':
                return 'Database Query Error';
            default:
                return 'System Error';
        }
    };

    const getErrorSuggestions = () => {
        switch (error.type) {
            case 'CONNECTION_ERROR':
                return [
                    'Check your network connection',
                    'Check the console for error response',
                    'Contact system administrator if the problem persists after refresh'
                ];
            case 'QUERY_ERROR':
                return [
                    'The database query encountered an error',
                    'Check the console for error response',
                    'Try refreshing the page or contact support'
                ];
            default:
                return [
                    'An unexpected error occurred',
                    'Check the console for error response',
                    'Try refreshing the page',
                    'Contact system administrator if the problem persists after refresh'
                ];
        }
    };

    return (
        <div className="bg-slate-50 flex items-center justify-center p-6">
            <Card className={`max-w-2xl w-full p-8 text-center ${getErrorColor()}`}>
                <div className="flex flex-col items-center space-y-6">
                    {/* Error Icon */}
                    <div className="flex items-center justify-center">
                        {getErrorIcon()}
                    </div>

                    {/* Error Title */}
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold text-slate-800">
                            {getErrorTitle()}
                        </h1>
                        <p className="text-lg text-slate-600">
                            {error.message}
                        </p>
                    </div>

                    {/* Error Suggestions */}
                    <div className="space-y-3 text-left w-full max-w-md">
                        <h3 className="text-sm font-semibold text-slate-700 text-center">
                            What you can do:
                        </h3>
                        <ul className="space-y-2">
                            {getErrorSuggestions().map((suggestion, index) => (
                                <li key={index} className="flex items-start space-x-2 text-sm text-slate-600">
                                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                                    <span>{suggestion}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ErrorState;