/**
 * Les couleurs vivent dans app/globals.css (@theme). Le WebGL ne peut pas lire
 * une classe Tailwind : il lit donc la variable CSS elle-même, au montage.
 * Une seule source de vérité, aucun hex dupliqué dans un composant.
 */
export type Tokens = {
  void: string;
  ice: string;
  dim: string;
  flux: string;
  alert: string;
  grid: string;
};

const read = (name: string): string => {
  if (typeof window === "undefined") return "";
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
};

export const readTokens = (): Tokens => ({
  void: read("--color-void"),
  ice: read("--color-ice"),
  dim: read("--color-dim"),
  flux: read("--color-flux"),
  alert: read("--color-alert"),
  grid: read("--color-grid"),
});
