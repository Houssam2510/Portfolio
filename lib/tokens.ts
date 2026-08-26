/**
 * Les couleurs vivent dans app/globals.css (@theme). Le WebGL ne peut pas lire
 * une classe Tailwind : il lit la variable CSS elle-même, au montage.
 * Une seule source de vérité, aucun hex dupliqué dans un composant.
 */
export type Tokens = {
  ground: string;
  paper: string;
  muted: string;
  accent: string;
};

const read = (name: string): string => {
  if (typeof window === "undefined") return "";
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
};

export const readTokens = (): Tokens => ({
  ground: read("--color-ground"),
  paper: read("--color-paper"),
  muted: read("--color-muted"),
  accent: read("--color-accent"),
});
