"use client";

import { useEffect } from "react";
import { prefetchCriticalData } from "../utils/prefetch";

export default function ClientPrefetch() {
  useEffect(() => {
    // Prefetch critical data on mount
    prefetchCriticalData();
  }, []);

  return null; // This component doesn't render anything
}
