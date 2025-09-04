// /app/waiver/not-found.tsx
import React, { JSX } from 'react';
import Link from 'next/link';

// This component is automatically rendered by Next.js whenever notFound() is called
// from within the /waiver route segment or any of its children.
export default function NotFound(): JSX.Element {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
            <h2 className="text-3xl font-semibold text-gray-600 mb-2">Waiver Not Found</h2>
            <p className="text-gray-500 mb-6 max-w-sm">
                We couldn&apos;t find a waiver with that ID. It may have been
                archived, deleted, or the URL is incorrect.
            </p>
            {/* Displaying two separate links for navigation */}
            <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/" className="px-6 py-3 rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200">
                    Return to Home
                </Link>
                <Link href="/my-waivers" className="px-6 py-3 rounded-full text-blue-600 border border-blue-600 bg-white hover:bg-blue-50 transition-colors duration-200">
                    Return to My Waivers
                </Link>
            </div>
        </div>
    );
}
