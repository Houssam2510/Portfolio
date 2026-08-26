import type { L } from "./types";

export type TimelineEntry = {
  readonly id: string;
  /** null quand la date n'est pas confirmée. On n'invente pas une chronologie. */
  readonly when: L | null;
  readonly kind: "school" | "work" | "ship" | "cert";
  readonly title: L;
  readonly detail: L;
  readonly node: string;
};

export const timeline: readonly TimelineEntry[] = [
  {
    id: "poly",
    when: { fr: "En cours → décembre 2027", en: "Ongoing → December 2027" },
    kind: "school",
    title: {
      fr: "Baccalauréat en génie informatique, Polytechnique Montréal",
      en: "BEng in Computer Engineering, Polytechnique Montréal",
    },
    detail: {
      fr: "Cybersécurité, systèmes répartis et infonuagique, systèmes d'exploitation, bases de données, C/C++ et Python.",
      en: "Cybersecurity, distributed systems and cloud, operating systems, databases, C/C++ and Python.",
    },
    node: "poly",
  },
  {
    id: "qualcomm",
    when: { fr: "Octobre 2024 → présent", en: "October 2024 → present" },
    kind: "work",
    title: {
      fr: "Représentant de marque, Qualcomm / Snapdragon PC — Channel Partners LLC",
      en: "Brand representative, Qualcomm / Snapdragon PC — Channel Partners LLC",
    },
    detail: {
      fr: "Expliquer une technologie à quelqu'un qui n'est pas ingénieur, en face à face, plusieurs fois par jour. C'est là que j'ai appris à écrire une interface : si la phrase ne tient pas debout à l'oral, elle ne tiendra pas à l'écran.",
      en: "Explaining a technology face to face, several times a day, to people who aren't engineers. That's where I learned to write an interface: if the sentence doesn't hold up out loud, it won't hold up on screen.",
    },
    node: "poly",
  },
  {
    id: "advent",
    when: { fr: "Décembre 2025", en: "December 2025" },
    kind: "cert",
    title: { fr: "Advent of Cyber — TryHackMe", en: "Advent of Cyber — TryHackMe" },
    detail: {
      fr: "Découverte réseau, énumération de services, sécurité web, investigation sous Linux.",
      en: "Network discovery, service enumeration, web security, Linux investigation.",
    },
    node: "cis",
  },
  {
    id: "session",
    when: { fr: "Hiver 2026", en: "Winter 2026" },
    kind: "school",
    title: { fr: "Cybersécurité : A · Systèmes répartis et infonuagique : B+", en: "Cybersecurity: A · Distributed systems and cloud: B+" },
    detail: { fr: "Moyenne cumulative 3,65.", en: "Cumulative GPA 3.65." },
    node: "poly",
  },
  {
    id: "carriv",
    when: null, // TODO — date de mise en production
    kind: "ship",
    title: { fr: "Carriv en production", en: "Carriv in production" },
    detail: {
      fr: "SaaS payant, bilingue, extension Chrome publiée. Une candidature complète en une trentaine de secondes.",
      en: "A paid, bilingual SaaS with a published Chrome extension. A complete application in about thirty seconds.",
    },
    node: "carriv",
  },
  {
    id: "studylumina",
    when: null, // TODO — date de la v1, puis de la v2
    kind: "ship",
    title: { fr: "StudyLumina v2 en production", en: "StudyLumina v2 in production" },
    detail: {
      fr: "Refonte d'un produit existant vers un usage centré sur l'examen : score de préparation calculé en code, plan d'étude priorisé.",
      en: "A rebuild of an existing product around exam use: readiness score computed in code, prioritized study plan.",
    },
    node: "study",
  },
  {
    id: "cspm",
    when: null, // TODO — date
    kind: "ship",
    title: { fr: "CSPM-Lite", en: "CSPM-Lite" },
    detail: {
      fr: "Scan de posture AWS aligné sur le CIS Benchmark, rapports JSON et HTML, contrôle CI/CD bloquant.",
      en: "AWS posture scan aligned with the CIS Benchmark, JSON and HTML reports, blocking CI/CD check.",
    },
    node: "cspm",
  },
];
