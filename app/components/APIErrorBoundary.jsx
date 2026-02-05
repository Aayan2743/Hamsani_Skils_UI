"use client";

import { useState, useEffect } from "react";

export default function APIErrorBoundary({ 
  children, 
  fallback = null,
  onError = null 
}) {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleUnhandledRejection = (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      setError(event.reason);
      setHasError(true);
      if (onError) onError(event.reason);
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    
    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [onError]);

  if (hasError) {
    if (fallback) {
      return fallback;
    }

    return (
      <div className="min-h-[200px] flex items-center justify-center bg-gray-50 rounded-lg">
        <div className="text-center p-6">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Connection Error
          </h3>
          <p className="text-gray-600 mb-4">
            Unable to load data. Please check your connection.
          </p>
          <button
            onClick={() => {
              setHasError(false);
              setError(null);
              window.location.reload();
            }}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return children;
}