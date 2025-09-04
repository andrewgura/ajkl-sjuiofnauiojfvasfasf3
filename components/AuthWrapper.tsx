"use client";

import { useEffect, type ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface AuthWrapperProps {
  children: ReactNode;
}

/**
 * A wrapper component that protects its children from unauthenticated access.
 * If the user is not logged in, it redirects them to the login page.
 */
export default function AuthWrapper({ children }: AuthWrapperProps) {
  const { status } = useSession();
  const router = useRouter();

  // Redirect unauthenticated users to the login page.
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // If the session status is loading, show a loading message or spinner.
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-slate-900">
        <p className="text-gray-600 dark:text-gray-400 text-lg animate-pulse">Loading...</p>
      </div>
    );
  }

  // If the user is authenticated, render the children components.
  if (status === "authenticated") {
    return <>{children}</>;
  }

  // Return null or a blank screen for the unauthenticated case.
  return null;
}
