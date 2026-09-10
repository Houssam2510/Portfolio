"use client";

import { useEffect } from "react";
import { startBackgroundEngine } from "@/lib/backgroundEngine";

/** Boots the shared canvas background loop once the page has mounted. */
export default function BackgroundEngine() {
  useEffect(() => {
    startBackgroundEngine();
  }, []);

  return null;
}
