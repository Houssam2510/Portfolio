"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";

/** Le nom entre caractère par caractère, une seule fois. Rien ne se rejoue. */
export function StaggerTitle({ text, className = "" }: { text: string; className?: string }) {
  const reduced = usePrefersReducedMotion();
  const [on, setOn] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setOn(true), 120);
    return () => window.clearTimeout(id);
  }, []);

  if (reduced) return <span className={className}>{text}</span>;

  /* Découpé par mots : un nom propre ne se coupe pas au milieu.
     Les caractères s'animent, le mot reste solidaire. */
  const words = text.split(" ");
  let index = 0;

  return (
    <span className={className} aria-label={text}>
      {words.map((word, w) => (
        <span key={`${word}-${w}`} className="inline-block whitespace-nowrap">
          {word.split("").map((char, c) => {
            const delay = index++ * 26;
            return (
              <span
                key={`${char}-${c}`}
                aria-hidden="true"
                className="inline-block will-change-transform"
                style={{
                  opacity: on ? 1 : 0,
                  transform: on ? "translateY(0)" : "translateY(0.22em)",
                  transition: `opacity 520ms var(--ease-cal) ${delay}ms, transform 520ms var(--ease-cal) ${delay}ms`,
                }}
              >
                {char}
              </span>
            );
          })}
          {w < words.length - 1 && <span aria-hidden="true"> </span>}
        </span>
      ))}
    </span>
  );
}
