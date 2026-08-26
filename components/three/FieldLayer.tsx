"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { useMediaQuery, usePrefersReducedMotion } from "@/lib/motion";

/** Three.js est différé : jamais dans le bundle initial. */
const ScanField = dynamic(() => import("./ScanField"), { ssr: false });

/**
 * La couche de fond, fixe derrière toute la page. Sous 900 px ou en
 * mouvement réduit, elle cède la place à un champ statique en CSS —
 * même image, aucun GPU sollicité.
 */
export function FieldLayer() {
  const reduced = usePrefersReducedMotion();
  const wide = useMediaQuery("(min-width: 900px)");
  const canRender = useMediaQuery("(min-width: 360px)");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onVisibility = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      {/* Le champ statique : présent d'entrée, il tient l'écran avant la 3D. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 42%, color-mix(in srgb, var(--color-flux) 9%, transparent), transparent 70%), radial-gradient(90% 70% at 50% 100%, var(--color-carbon), transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-grid) 1px, transparent 1px), linear-gradient(90deg, var(--color-grid) 1px, transparent 1px)",
          backgroundSize: "68px 68px",
          maskImage: "radial-gradient(75% 60% at 50% 45%, #000 20%, transparent 78%)",
        }}
      />
      {canRender && !reduced && (
        <div className="absolute inset-0">
          <ScanField active={visible} compact={!wide} />
        </div>
      )}

      {/* Masque de lisibilité : le champ recule là où le texte vit. Sans ça,
          le faisceau passe derrière un paragraphe et le rend illisible. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, var(--color-void) 0%, color-mix(in srgb, var(--color-void) 82%, transparent) 26%, transparent 58%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40"
        style={{ background: "linear-gradient(to top, var(--color-void), transparent)" }}
      />
      {/* Voile uniforme léger : garde le texte au-dessus du champ partout. */}
      <div className="absolute inset-0 bg-void/25" />
    </div>
  );
}
