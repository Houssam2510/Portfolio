"use client";

import { useEffect, useRef } from "react";
import { scan, STAGE_LABELS } from "@/lib/scan";
import type { Locale } from "@/content/types";

/**
 * Le relevé du scan, en direct. Il lit l'état hors de React et écrit
 * directement dans le DOM : aucun rendu React déclenché par le défilement.
 */
export function ScanReadout({ locale, label }: { locale: Locale; label: string }) {
  const stageRef = useRef<HTMLSpanElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    let lastPct = -1;
    let lastStage = -1;

    const tick = () => {
      const pct = Math.round(scan.progress * 100);
      const stage = Math.min(STAGE_LABELS.length - 1, Math.round(scan.stage));
      if (pct !== lastPct) {
        lastPct = pct;
        if (pctRef.current) pctRef.current.textContent = String(pct).padStart(3, "0");
        if (barRef.current) barRef.current.style.transform = `scaleX(${scan.progress})`;
      }
      if (stage !== lastStage) {
        lastStage = stage;
        if (stageRef.current) stageRef.current.textContent = STAGE_LABELS[stage][locale];
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [locale]);

  return (
    <div className="flex items-center gap-3" aria-hidden="true">
      <span className="lab hidden sm:inline">{label}</span>
      <span className="relative block h-px w-16 bg-edge sm:w-24">
        <span
          ref={barRef}
          className="absolute inset-0 origin-left bg-flux"
          style={{ transform: "scaleX(0)" }}
        />
      </span>
      <span className="lab lab-flux tabular-nums">
        <span ref={pctRef}>000</span>
      </span>
      <span className="lab hidden md:inline" ref={stageRef}>
        {STAGE_LABELS[0][locale]}
      </span>
    </div>
  );
}
