"use client";

import { useState, useEffect } from "react";

/**
 * Returns true on mobile viewports (< 768px).
 * Defaults to false (desktop) on server to avoid hydration mismatch.
 * On mobile, Framer Motion viewport animations are disabled so elements
 * are always visible without relying on IntersectionObserver.
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);
  return isMobile;
}
