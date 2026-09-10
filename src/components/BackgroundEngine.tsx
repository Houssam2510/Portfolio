"use client";

import { useEffect } from "react";
import { startBackgroundEngine, stopBackgroundEngine } from "@/lib/backgroundEngine";

/** Démarre la boucle de fond partagée une fois la page montée, et l'arrête au démontage. */
export default function BackgroundEngine() {
  useEffect(() => {
    startBackgroundEngine();
    return () => stopBackgroundEngine();
  }, []);

  return null;
}
