import type { L } from "./types";

/**
 * LA CARTE — chaque nœud est une chose réelle, chaque arête une dépendance
 * réelle. Positions PRÉCALCULÉES : aucune simulation physique au runtime.
 *   pos   constellation libre
 *   rail  colonne chronologique, à l'arrivée sur la section Parcours
 */
export type NodeKind = "product" | "tool" | "principle" | "tech" | "path";

export type GraphNode = {
  readonly id: string;
  readonly label: L;
  readonly kind: NodeKind;
  readonly size: number;
  readonly pos: readonly [number, number, number];
  readonly rail: readonly [number, number, number];
  readonly href?: string;
};

export type GraphEdge = {
  readonly from: string;
  readonly to: string;
  readonly why?: L;
};

export const nodes: readonly GraphNode[] = [
  { id: "poly", kind: "path", size: 0.62, pos: [0, 3.15, 0], rail: [0, 4.2, 0],
    label: { fr: "Polytechnique Montréal", en: "Polytechnique Montréal" } },

  { id: "carriv", kind: "product", size: 1.0, pos: [-3.1, 0.9, 0.35], rail: [0, 3.1, 0],
    href: "/projets/carriv", label: { fr: "Carriv", en: "Carriv" } },
  { id: "svelte", kind: "tech", size: 0.5, pos: [-4.7, 1.9, -0.55], rail: [1.7, 2.55, 0],
    label: { fr: "SvelteKit", en: "SvelteKit" } },
  { id: "mongo", kind: "tech", size: 0.5, pos: [-4.9, -0.15, 0.45], rail: [1.7, 2.0, 0],
    label: { fr: "MongoDB", en: "MongoDB" } },
  { id: "chrome", kind: "tech", size: 0.52, pos: [-3.5, -1.1, -0.8], rail: [1.7, 1.45, 0],
    label: { fr: "Extension Chrome", en: "Chrome extension" } },
  { id: "stripe", kind: "tech", size: 0.44, pos: [-2.0, -1.0, 0.65], rail: [1.7, 0.9, 0],
    label: { fr: "Stripe", en: "Stripe" } },
  { id: "ats", kind: "principle", size: 0.68, pos: [-1.3, 1.85, 0.85], rail: [-1.7, 2.55, 0],
    label: { fr: "Score ATS", en: "ATS score" } },

  { id: "study", kind: "product", size: 1.0, pos: [3.1, 0.9, -0.35], rail: [0, 0.3, 0],
    href: "/projets/studylumina", label: { fr: "StudyLumina", en: "StudyLumina" } },
  { id: "next", kind: "tech", size: 0.5, pos: [4.7, 1.9, 0.55], rail: [1.7, -0.25, 0],
    label: { fr: "Next.js", en: "Next.js" } },
  { id: "pg", kind: "tech", size: 0.52, pos: [4.9, -0.15, -0.45], rail: [1.7, -0.8, 0],
    label: { fr: "PostgreSQL + Prisma", en: "PostgreSQL + Prisma" } },
  { id: "docker", kind: "tech", size: 0.44, pos: [3.9, -1.15, 0.5], rail: [1.7, -1.35, 0],
    label: { fr: "Docker", en: "Docker" } },
  { id: "rag", kind: "tech", size: 0.5, pos: [2.4, -1.0, -0.9], rail: [1.7, -1.9, 0],
    label: { fr: "RAG", en: "RAG" } },
  { id: "ers", kind: "principle", size: 0.68, pos: [1.3, 1.85, -0.85], rail: [-1.7, -0.25, 0],
    label: { fr: "Exam Readiness Score", en: "Exam Readiness Score" } },

  { id: "cspm", kind: "tool", size: 0.82, pos: [0, -2.55, 0.4], rail: [0, -2.5, 0],
    href: "/projets/cspm-lite", label: { fr: "CSPM-Lite", en: "CSPM-Lite" } },
  { id: "python", kind: "tech", size: 0.48, pos: [-1.7, -3.35, -0.5], rail: [1.7, -3.05, 0],
    label: { fr: "Python", en: "Python" } },
  { id: "aws", kind: "tech", size: 0.5, pos: [1.7, -3.35, 0.5], rail: [1.7, -3.6, 0],
    label: { fr: "AWS", en: "AWS" } },
  { id: "cis", kind: "principle", size: 0.6, pos: [0, -4.15, -0.35], rail: [-1.7, -2.5, 0],
    label: { fr: "CIS Benchmark", en: "CIS Benchmark" } },

  { id: "verdict", kind: "principle", size: 0.72, pos: [0, 0.15, 1.15], rail: [-1.7, -4.15, 0],
    label: { fr: "Un verdict vérifiable", en: "A verdict you can check" } },
];

export const edges: readonly GraphEdge[] = [
  { from: "poly", to: "carriv" },
  { from: "poly", to: "study" },
  { from: "poly", to: "cspm" },

  { from: "carriv", to: "svelte" },
  { from: "carriv", to: "mongo" },
  { from: "carriv", to: "chrome" },
  { from: "carriv", to: "stripe" },
  { from: "carriv", to: "ats" },

  { from: "study", to: "next" },
  { from: "study", to: "pg" },
  { from: "study", to: "docker" },
  { from: "study", to: "rag" },
  { from: "study", to: "ers" },

  { from: "cspm", to: "python" },
  { from: "cspm", to: "aws" },
  { from: "cspm", to: "cis" },

  { from: "pg", to: "rag", why: { fr: "la recherche du tuteur passe par là", en: "the tutor's retrieval runs through it" } },

  /* Les trois arêtes qui font la thèse : chaque scanner rend un verdict. */
  { from: "ats", to: "verdict", why: { fr: "un score et les mots-clés manquants", en: "a score and the missing keywords" } },
  { from: "ers", to: "verdict", why: { fr: "0–100, ventilé par chapitre", en: "0–100, broken down per chapter" } },
  { from: "cis", to: "verdict", why: { fr: "des constats classés par criticité", en: "findings ranked by severity" } },
];

export const nodeIndex = new Map(nodes.map((n, i) => [n.id, i]));

export const neighbours = (id: string): ReadonlySet<string> => {
  const s = new Set<string>([id]);
  for (const e of edges) {
    if (e.from === id) s.add(e.to);
    if (e.to === id) s.add(e.from);
  }
  return s;
};
