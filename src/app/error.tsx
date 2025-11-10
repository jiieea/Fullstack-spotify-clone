'use client'; // This is required for client-side error boundaries

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

/**
 * Custom Error Boundary Component for Next.js App Router.
 * This component catches runtime errors thrown in the segment it wraps.
 * * @param {{ error: Error & { digest?: string }, reset: () => void }} props 
 * @returns React.JSX.Element
 */
export default function ErrorComponent({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error('Captured Error in Segment:', error);
  }, [error]);
  const router = useRouter();

  return (
    // Updated: Background to neutral 900 (using gray-900 for dark mode base)
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-900 p-4">
      
      {/* Updated Card: Slightly lighter background for contrast against the body */}
      <div className="max-w-xl w-full p-8 sm:p-12 bg-neutral-800 rounded-2xl shadow-2xl text-center">
        
        {/* Error Icon/Visual - Kept red for visual severity */}
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-900/50 mb-6">
          <svg className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.398 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Title - Set to white, using font-sans (Montserrat assumed global) */}
        <h1 className="text-3xl font-extrabold text-white font-sans mb-3">
          Something Went Wrong!
        </h1>
        
        {/* User Message - Set to light gray */}
        <p className="text-lg text-gray-300 font-sans mb-6">
          We apologize, but an unexpected error occurred while trying to render this part of the page.
          Please try clicking the button below to continue.
        </p>

        {/* Technical Detail */}
        <p className="text-sm font-mono text-red-400 bg-neutral-700 p-3 rounded-lg break-words mb-8">
          Error: {error.message}
        </p>

        {/* Updated Button: Green color scheme */}
        <button
          onClick={
            // Attempt to recover by rendering the segment again
            () => router.push('/')
          }
          className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out transform hover:scale-[1.01] focus:ring-offset-gray-800"
        >
          Home
        </button>
      </div>
    </div>
  );
}