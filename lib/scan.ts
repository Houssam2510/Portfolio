/**
 * L'état du scan, tenu hors de React : le défilement l'écrit à chaque frame,
 * la scène 3D et le bandeau de relevés le lisent. Aucun rendu React déclenché.
 */
export const scan = {
  /** 0 → 1 sur toute la page. */
  progress: 0,
  /** 0 → 4, position continue entre les cinq états du champ (voir lib/field.ts). */
  stage: 0,
  /** Position du pointeur, -1 → 1, pour la parallaxe. */
  px: 0,
  py: 0,
};

export const STAGE_LABELS = [
  { fr: "SURFACE", en: "SURFACE" },
  { fr: "NAPPE", en: "SHEET" },
  { fr: "GRAPPES", en: "CLUSTERS" },
  { fr: "BRIN", en: "STRAND" },
  { fr: "CONSTELLATION", en: "CONSTELLATION" },
] as const;
