import type { L } from "./types";

/** Trois paliers. Pas de pourcentage : venant de quelqu'un dont les trois outils
 *  rendent des scores calculés, une note auto-attribuée serait une contradiction. */
export type SkillGroup = {
  readonly id: "solid" | "working" | "learning";
  readonly title: L;
  readonly items: readonly string[];
};

export const skills: readonly SkillGroup[] = [
  {
    id: "solid",
    title: { fr: "Solide", en: "Solid" },
    items: ["TypeScript", "JavaScript", "React", "Next.js", "Node.js", "PostgreSQL", "Linux", "Git"],
  },
  {
    id: "working",
    title: { fr: "Fonctionnel", en: "Working" },
    items: ["SvelteKit", "MongoDB", "Prisma", "Docker", "Python", "C / C++", "SQL", "Tests automatisés"],
  },
  {
    id: "learning",
    title: { fr: "J'apprends en ce moment", en: "Currently learning" },
    items: ["Posture cloud AWS", "CIS Benchmark", "Systèmes répartis", "pgvector et RAG", "WebGL"],
  },
];

export const languages: readonly L[] = [
  { fr: "Français", en: "French" },
  { fr: "Anglais", en: "English" },
  { fr: "Arabe", en: "Arabic" },
];
