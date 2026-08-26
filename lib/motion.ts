"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Les media queries sont un système externe : on s'y abonne, on n'en recopie
 * pas l'état dans un useState. Côté serveur, la réponse est toujours « non » —
 * le poster suffit, et rien ne saute à l'hydratation.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export const usePrefersReducedMotion = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)");

/**
 * Progression du passage « graphe libre » → « timeline », écrite au scroll et
 * lue dans useFrame. Volontairement hors de React : muter cette valeur ne doit
 * jamais déclencher de rendu.
 */
export const railProgress = { value: 0 };
