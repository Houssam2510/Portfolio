"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { useMediaQuery, usePrefersReducedMotion } from "@/lib/motion";

/** Three.js est différé : jamais dans le bundle initial. */
const ReliefField = dynamic(() => import("./ReliefField"), { ssr: false });

/**
 * La couche de fond, fixe derrière toute la page. En mouvement réduit,
 * elle cède la place à un dégradé statique — même ambiance, aucun GPU.
 */
export function FieldLayer() {
  const reduced = usePrefersReducedMotion();
  const canRender = useMediaQuery("(min-width: 360px)");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onVisibility = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(72% 58% at 60% 40%, color-mix(in srgb, var(--color-accent) 9%, transparent), transparent 74%)",
        }}
      />

      {canRender && !reduced && (
        <div className="absolute inset-0">
          <ReliefField active={visible} />
        </div>
      )}

      {/* Le champ recule là où le texte vit. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(102deg, var(--color-ground) 0%, color-mix(in srgb, var(--color-ground) 46%, transparent) 26%, transparent 56%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-48"
        style={{ background: "linear-gradient(to top, var(--color-ground), transparent)" }}
      />
    </div>
  );
}
