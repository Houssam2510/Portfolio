import { casesEn } from "./cases.en";
import type { Content } from "./types";

export const en: Content = {
  meta: {
    title: "Houssam Nadir · Computer Engineering, Polytechnique Montréal",
    description:
      "Computer engineering student at Polytechnique Montréal. Three products in production, built solo (Carriv, StudyLumina, Sanade), plus Job Radar, an E2EE messenger and an AWS security scanner.",
    ogAlt:
      "Houssam Nadir, computer engineering at Polytechnique Montréal. Three products in production.",
  },

  ui: {
    tagline: "COMPUTER ENGINEERING · POLYMTL",
    skipToContent: "Skip to content",
    toggleTheme: "Toggle theme",
    search: "Search",
    contact: "CONTACT",
    openPalette: "Open command palette",
    paletteLabel: "Jump to a section",
    paletteFilter: "Filter sections",
    paletteEscape: "ESC",
    switchLanguage: "Passer en français",
    statusLive: "In production",
    statusInternal: "Personal tool",
    statusOpen: "Open source",
    viewLive: "VIEW LIVE ↗",
    viewCode: "VIEW THE CODE ↗",
    privateRepo: "PRIVATE REPO · DEMO ON REQUEST",
    live: "LIVE",
    underTheHood: "Under the hood",
    theProblem: "THE PROBLEM",
    theDecision: "THE DECISION",
    timelineScrollHint: "Career path, scroll horizontally",
    footer: "© 2026 HOUSSAM NADIR · DESIGNED AND CODED IN MONTRÉAL",
    availability: "AVAILABLE · INTERNSHIP 2027",
    location: "MONTRÉAL · UTC-5",
    graduation: "B.ENG · DEC. 2027",
    statusBarHeadline: "THREE PRODUCTS IN PRODUCTION",
    localTime: "MONTRÉAL · UTC-5",
  },

  sections: {
    thesis: {
      eyebrow: "02 · ./PRINCIPLES --APPLIED",
      title: "Three rules, held everywhere",
      intro: "Not slogans: each one is verified by code.",
    },
    cases: {
      eyebrow: "01 · SIX PROJECTS, BUILT SOLO",
      title: "What I have built",
      productsLabel: "IN PRODUCTION",
      labLabel: "LAB · TOOLS AND PROTOCOLS",
    },
    skills: { eyebrow: "03 · EVERY TOOL, ITS PROOF", title: "Stack" },
    timeline: { eyebrow: "04 · SWIPE →", title: "Career path" },
  },

  hero: {
    lede: "I ship complete products on my own: from the idea to payments in production.",
    ctaCases: "See the projects",
    ctaLinkedin: "LinkedIn ↗",
    ctaContact: "Get in touch",
  },

  contactSection: {
    prompt: "open --channel internship-2027",
    title: "Give me the constraint, I will come back with the architecture.",
    body: "An internship where I touch production: pipeline, security, data. Reply within 24 h.",
    facts: ["MONTRÉAL, QC", "UTC-5", "FR / EN", "AVAILABLE 2027"],
  },

  thesisPrinciples: [
    {
      numeral: "I",
      label: "PRINCIPLE I",
      title: "The model extracts, the code decides",
      body: "An LLM rephrases and classifies. Every number shown comes out of a pure function.",
      proofs: [
        { label: "Carriv", detail: "deterministic ATS score" },
        { label: "StudyLumina", detail: "LLM-free score" },
        { label: "Job Radar", detail: "LLM-free ranking" },
      ],
    },
    {
      numeral: "II",
      label: "PRINCIPLE II",
      title: "An untested invariant does not exist",
      body: "A product rule that does not fail CI is only a wish.",
      proofs: [
        { label: "Sanade", detail: "facts ⇸ projections, tested" },
        { label: "Ratchet", detail: "no key on the wire" },
        { label: "Colours", detail: "no hardcoded literals" },
      ],
    },
    {
      numeral: "III",
      label: "PRINCIPLE III",
      title: "A runtime constraint is a design constraint",
      body: "Timeouts, rate limits, a dying Lambda: parameters, not accidents.",
      proofs: [
        { label: "Carriv", detail: "90 s < Lambda lifetime" },
        { label: "Credit", detail: "reserved before the call" },
        { label: "Job Radar", detail: "~1 req/s per domain" },
      ],
    },
  ],

  caseStudies: casesEn,

  skills: [
    { category: "dev", name: "Strict TypeScript", usedIn: "everywhere" },
    { category: "dev", name: "Next.js · SvelteKit · React", usedIn: "Carriv · StudyLumina · Sanade" },
    { category: "dev", name: "Node.js · tRPC", usedIn: "Sanade · Job Radar" },
    { category: "dev", name: "Expo · React Native", usedIn: "Sanade" },
    { category: "dev", name: "Python", usedIn: "CSPM-Lite" },
    { category: "dev", name: "C / C++", usedIn: "Polytechnique" },
    { category: "cloud", name: "PostgreSQL · Prisma", usedIn: "StudyLumina · Sanade" },
    { category: "cloud", name: "pgvector · hybrid RAG", usedIn: "StudyLumina" },
    { category: "cloud", name: "MongoDB", usedIn: "Carriv" },
    { category: "cloud", name: "BullMQ · Redis", usedIn: "StudyLumina" },
    { category: "cloud", name: "AWS · Vercel · serverless", usedIn: "Carriv · CSPM-Lite" },
    { category: "cloud", name: "Docker · Linux", usedIn: "everywhere" },
    { category: "secu", name: "Applied cryptography", usedIn: "Ratchet" },
    { category: "secu", name: "Payments · signed webhooks", usedIn: "Carriv · StudyLumina" },
    { category: "secu", name: "Cloud posture · CIS · IAM", usedIn: "CSPM-Lite" },
    { category: "secu", name: "Authentication · hashed tokens", usedIn: "Carriv" },
    { category: "secu", name: "Network reconnaissance", usedIn: "TryHackMe" },
  ],

  skillGroups: [
    { id: "dev", label: "PRODUCT & BACKEND" },
    { id: "cloud", label: "CLOUD & DATA" },
    { id: "secu", label: "SECURITY" },
  ],

  timeline: [
    {
      date: "→ DEC. 2027",
      dateAccent: true,
      title: "B.Eng. computer engineering",
      org: "Polytechnique Montréal",
      lines: ["Cybersecurity : A", "Distributed systems & cloud : B+", "GPA : 3.65 (winter 2026)"],
    },
    {
      date: "2025-2026",
      title: "Six projects, built solo",
      org: "3 in production · 3 in the lab",
      lines: ["Carriv · StudyLumina · Sanade", "Job Radar · Ratchet · CSPM-Lite"],
    },
    {
      date: "SINCE OCT. 2024",
      title: "Brand representative",
      org: "Qualcomm / Snapdragon PC",
      body: "Making a technology clear in two minutes, to anyone.",
    },
    {
      date: "MILESTONES",
      title: "Certifications & languages",
      org: "",
      lines: [
        "Advent of Cyber · TryHackMe · Dec. 2025",
        "French : native",
        "English : fluent",
        "Montréal · open to remote",
      ],
    },
  ],

  navLinks: [
    { id: "travaux", label: "Projects" },
    { id: "approche", label: "Approach" },
    { id: "capacites", label: "Stack" },
    { id: "parcours", label: "Career" },
  ],

  paletteItems: [
    { id: "accueil", index: "00", label: "Home", hint: "hero" },
    { id: "travaux", index: "01", label: "Projects", hint: "carriv · job radar · ratchet" },
    { id: "approche", index: "02", label: "Approach", hint: "principles" },
    { id: "capacites", index: "03", label: "Stack", hint: "tools and proof" },
    { id: "parcours", index: "04", label: "Career path", hint: "polytechnique" },
    { id: "contact", index: "05", label: "Contact", hint: "email · linkedin" },
  ],

  heroStats: [
    { value: "3", label: "PRODUCTS IN PRODUCTION" },
    { value: "200k+", label: "LINES OF CODE" },
    { value: "1,500+", label: "AUTOMATED TESTS" },
    { value: "3.65", label: "GPA · WINTER 2026" },
  ],

  typingLines: [
    "the model generates, the code decides",
    "three products in production, solo",
    "an untested invariant does not exist",
    "from the prompt to the payment webhook",
  ],
};
