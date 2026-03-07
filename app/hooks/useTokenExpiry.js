"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { isTokenExpired, clearAllAuthData } from "../utils/auth";

export const useTokenExpiry = () => {
  const router = useRouter();

  const handleTokenExpiry = useCallback(() => {
    if (isTokenExpired()) {
      clearAllAuthData();
      // Show session expired message
      alert("Session expired. Please login again.");
      router.push("/account/login");
    }
  }, [router]);

  useEffect(() => {
    // Check token expiry immediately on mount
    handleTokenExpiry();

    // Check token expiry every minute (60000ms)
    const interval = setInterval(handleTokenExpiry, 60000);

    return () => clearInterval(interval);
  }, [handleTokenExpiry]);
};
