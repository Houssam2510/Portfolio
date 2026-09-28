import { casesFr } from "./cases.fr";
import type { Content } from "./types";

export const fr: Content = {
  meta: {
    title: "Houssam Nadir · Génie informatique, Polytechnique Montréal",
    description:
      "Étudiant en génie informatique à Polytechnique Montréal. Trois produits en production, seul (Carriv, StudyLumina, Sanade), plus Job Radar, une messagerie E2EE et un scanner de sécurité AWS.",
    ogAlt:
      "Houssam Nadir, génie informatique à Polytechnique Montréal. Trois produits en production.",
  },

  ui: {
    tagline: "GÉNIE INFORMATIQUE · POLYMTL",
    skipToContent: "Aller au contenu",
    toggleTheme: "Basculer le thème",
    search: "Rechercher",
    contact: "CONTACT",
    openPalette: "Ouvrir la palette de commandes",
    paletteLabel: "Aller à une section",
    paletteFilter: "Filtrer les sections",
    paletteEscape: "ESC",
    switchLanguage: "Switch to English",
    statusLive: "En production",
    statusInternal: "Outil personnel",
    statusOpen: "Open source",
    viewLive: "VOIR EN LIGNE ↗",
    viewCode: "VOIR LE CODE ↗",
    privateRepo: "DÉPÔT PRIVÉ · DÉMO SUR DEMANDE",
    live: "LIVE",
    underTheHood: "Sous le capot",
    theProblem: "LE PROBLÈME",
    theDecision: "LA DÉCISION",
    timelineScrollHint: "Parcours, faire défiler horizontalement",
    footer: "© 2026 HOUSSAM NADIR · CONÇU ET CODÉ À MONTRÉAL",
    availability: "DISPONIBLE · STAGE 2027",
    location: "MONTRÉAL · UTC-5",
    graduation: "B.ING · DÉC. 2027",
    statusBarHeadline: "TROIS PRODUITS EN PRODUCTION",
    localTime: "MONTRÉAL · UTC-5",
  },

  sections: {
    thesis: {
      eyebrow: "02 · ./PRINCIPES --APPLIQUÉS",
      title: "Trois règles, tenues partout",
      intro: "Pas des slogans : chacune est vérifiée par du code.",
    },
    cases: {
      eyebrow: "01 · UNE SÉLECTION, CONSTRUITE SEUL",
      title: "Ce que j'ai construit",
      productsLabel: "EN PRODUCTION",
      labLabel: "LABO · OUTILS ET PROTOCOLES",
      more: "Une sélection de six. Les autres sont sur GitHub ↗",
    },
    skills: { eyebrow: "03 · CHAQUE OUTIL, SA PREUVE", title: "Stack" },
    timeline: { eyebrow: "04 · GLISSER →", title: "Parcours" },
  },

  hero: {
    lede:
      "Je construis des produits complets, seul, et je les mets en production : interface, backend, paiement, sécurité.",
    ctaCases: "Voir les projets",
    ctaLinkedin: "LinkedIn ↗",
    ctaContact: "Me contacter",
  },

  contactSection: {
    prompt: "ouvrir --canal stage-2027",
    title: "Donnez-moi la contrainte, je reviens avec l’architecture.",
    body: "Un stage où je touche à la production : pipeline, sécurité, données. Réponse sous 24 h.",
    facts: ["MONTRÉAL, QC", "UTC-5", "FR / EN", "DISPONIBLE 2027"],
  },

  thesisPrinciples: [
    {
      numeral: "I",
      label: "PRINCIPE I",
      title: "L'IA là où elle aide, le code là où il faut être sûr",
      body: "Un LLM lit et reformule très bien. Un score, un crédit, une décision sortent d'une fonction testée.",
      proofs: [
        { label: "Carriv", detail: "score ATS déterministe" },
        { label: "StudyLumina", detail: "score sans LLM" },
        { label: "Job Radar", detail: "tri sans LLM" },
      ],
    },
    {
      numeral: "II",
      label: "PRINCIPE II",
      title: "Un invariant non testé n'existe pas",
      body: "Une règle produit qui ne fait pas échouer la CI n'est qu'un vœu.",
      proofs: [
        { label: "Sanade", detail: "faits ⇸ projections, testé" },
        { label: "Ratchet", detail: "aucune clé sur le réseau" },
        { label: "Couleurs", detail: "aucun littéral en dur" },
      ],
    },
    {
      numeral: "III",
      label: "PRINCIPE III",
      title: "La contrainte d'exécution est une contrainte de conception",
      body: "Timeout, débit, mort d'une Lambda : des paramètres, pas des accidents.",
      proofs: [
        { label: "Carriv", detail: "90 s < durée de vie Lambda" },
        { label: "Crédit", detail: "réservé avant l'appel" },
        { label: "Job Radar", detail: "~1 req/s par domaine" },
      ],
    },
  ],

  caseStudies: casesFr,
  skills: [
    { category: "dev", name: "TypeScript strict", usedIn: "partout" },
    { category: "dev", name: "Next.js · SvelteKit · React", usedIn: "Carriv · StudyLumina · Sanade" },
    { category: "dev", name: "Node.js · tRPC", usedIn: "Sanade · Job Radar" },
    { category: "dev", name: "Expo · React Native", usedIn: "Sanade" },
    { category: "dev", name: "Python", usedIn: "CSPM-Lite" },
    { category: "dev", name: "C / C++", usedIn: "Polytechnique" },
    { category: "cloud", name: "PostgreSQL · Prisma", usedIn: "StudyLumina · Sanade" },
    { category: "cloud", name: "pgvector · RAG hybride", usedIn: "StudyLumina" },
    { category: "cloud", name: "MongoDB", usedIn: "Carriv" },
    { category: "cloud", name: "BullMQ · Redis", usedIn: "StudyLumina" },
    { category: "cloud", name: "AWS · Vercel · serverless", usedIn: "Carriv · CSPM-Lite" },
    { category: "cloud", name: "Docker · Linux", usedIn: "partout" },
    { category: "secu", name: "Cryptographie appliquée", usedIn: "Ratchet" },
    { category: "secu", name: "Paiement · webhooks signés", usedIn: "Carriv · StudyLumina" },
    { category: "secu", name: "Posture cloud · CIS · IAM", usedIn: "CSPM-Lite" },
    { category: "secu", name: "Authentification · tokens hachés", usedIn: "Carriv" },
    { category: "secu", name: "Reconnaissance réseau", usedIn: "TryHackMe" },
  ],

  skillGroups: [
    { id: "dev", label: "PRODUIT & BACKEND" },
    { id: "cloud", label: "CLOUD & DONNÉES" },
    { id: "secu", label: "SÉCURITÉ" },
  ],

  timeline: [
    {
      date: "→ DÉC. 2027",
      dateAccent: true,
      title: "B.Ing. génie informatique",
      org: "Polytechnique Montréal",
      lines: ["Cybersécurité : A", "Systèmes répartis & infonuagique : B+", "GPA : 3,65 (hiver 2026)"],
    },
    {
      date: "2025-2026",
      title: "Des projets construits seul",
      org: "3 en production · d'autres en labo",
      lines: ["Carriv · StudyLumina · Sanade", "Job Radar · Ratchet · CSPM-Lite"],
    },
    {
      date: "DEPUIS OCT. 2024",
      title: "Représentant de marque",
      org: "Qualcomm / Snapdragon PC",
      body: "Rendre une technologie claire en deux minutes, à n'importe qui.",
    },
    {
      date: "REPÈRES",
      title: "Certifications & langues",
      org: "",
      lines: [
        "Advent of Cyber · TryHackMe · déc. 2025",
        "Français : natif",
        "Anglais : courant",
        "Montréal · ouvert au télétravail",
      ],
    },
  ],

  navLinks: [
    { id: "travaux", label: "Projets" },
    { id: "approche", label: "Approche" },
    { id: "capacites", label: "Stack" },
    { id: "parcours", label: "Parcours" },
  ],

  paletteItems: [
    { id: "accueil", index: "00", label: "Accueil", hint: "hero" },
    { id: "travaux", index: "01", label: "Projets", hint: "carriv · job radar · ratchet" },
    { id: "approche", index: "02", label: "Approche", hint: "principes" },
    { id: "capacites", index: "03", label: "Stack", hint: "outils et preuves" },
    { id: "parcours", index: "04", label: "Parcours", hint: "polytechnique" },
    { id: "contact", index: "05", label: "Contact", hint: "email · linkedin" },
  ],

  heroStats: [
    { value: "3", label: "PRODUITS EN PRODUCTION" },
    { value: "1,1 M", label: "OFFRES SURVEILLÉES" },
    { value: "1 500+", label: "TESTS AUTOMATISÉS" },
    { value: "E2EE", label: "PROTOCOLE SIGNAL, RECODÉ" },
  ],

  typingLines: [
    "l'IA là où elle aide, le code là où il faut être sûr",
    "trois produits en production, seul",
    "un invariant non testé n’existe pas",
    "de la maquette au paiement en production",
  ],
};
