import { casesEn } from "./cases.en";
import type { Content } from "./types";

export const en: Content = {
  meta: {
    title: "Houssam Nadir · Computer Engineering, Polytechnique Montréal",
    description:
      "Computer engineering student at Polytechnique Montréal. Cloud, cybersecurity and software. Three products in production, built solo: Carriv, StudyLumina, Sanade.",
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
    role: "ROLE",
    period: "PERIOD",
    status: "STATUS",
    statusLive: "In production",
    statusInternal: "Internal tool",
    viewLive: "VIEW LIVE ↗",
    live: "LIVE",
    theProblem: "THE PROBLEM",
    theDecision: "THE CENTRAL DECISION",
    caseLabel: "CASE",
    screenshotCaption: "AUTOMATIC PREVIEW OF {domain} · CAPTURED AFTER SETTLING",
    screenshotLoading: "CAPTURING",
    screenshotFailed: "PREVIEW UNAVAILABLE",
    screenshotOpen: "OPEN {domain} ↗",
    timelineScrollHint: "Career path, scroll horizontally",
    skillsFilterLabel: "Filter capabilities by domain",
    footer: "© 2026 HOUSSAM NADIR · DESIGNED AND CODED IN MONTRÉAL",
    availability: "AVAILABLE · INTERNSHIP 2027",
    location: "MONTRÉAL · UTC-5",
    graduation: "B.ENG · DEC. 2027",
    statusBarHeadline: "THREE PRODUCTS IN PRODUCTION",
    localTime: "MONTRÉAL · UTC-5",
  },

  sections: {
    thesis: {
      eyebrow: "01 · ./PRINCIPLES --APPLIED",
      title: "My engineering thesis",
      intro:
        "Three principles, held across all three products. These are not slogans: each one is verified by code.",
    },
    cases: { eyebrow: "02 · FOUR CASES, NOTHING HIDDEN", title: "Case studies" },
    numbers: {
      eyebrow: "03 · AGGREGATED ACROSS THE THREE PLATFORMS",
      title: "What that adds up to",
      footnote: [
        "All three products share the same backbone: schema validation at every boundary, never a ",
        { strong: ".parse()" },
        " that blows up, external clients initialised lazily so a build passes without secrets, and a loud failure preferred over a value quietly made up.",
      ],
    },
    skills: { eyebrow: "04 · FILTER BY DOMAIN", title: "Capabilities" },
    timeline: { eyebrow: "05 · SWIPE →", title: "Career path" },
  },

  hero: {
    lede:
      "Computer engineering student at Polytechnique Montréal. I ship complete products on my own: structured-output LLM pipelines, deterministic scoring, race-free transactional accounting, cloud security. Three platforms in production, from the bilingual landing page to the signed payment webhook.",
    ctaCases: "See the case studies",
    ctaLinkedin: "LinkedIn ↗",
    ctaContact: "Get in touch",
  },

  contactSection: {
    prompt: "open --channel internship-2027",
    title: "Give me the constraint, I will come back with the architecture.",
    body:
      "I am looking for an internship where I touch production: pipeline, security, data, not just the mockup. Reply within 24 h.",
    facts: ["MONTRÉAL, QC", "UTC-5", "FR / EN", "AVAILABLE 2027"],
  },

  thesisPrinciples: [
    {
      numeral: "I",
      label: "PRINCIPLE I",
      title: "The model extracts, the code decides",
      body:
        "An LLM is excellent at rephrasing and classifying, disastrous at producing a number that is meant to be reproducible. Every figure shown to a user comes out of a pure function.",
      proofs: [
        { label: "Carriv", detail: "deterministic ATS score" },
        { label: "StudyLumina", detail: "ERS, a pure function of ~850 lines" },
        { label: "Sanade", detail: "zero trained models" },
      ],
    },
    {
      numeral: "II",
      label: "PRINCIPLE II",
      title: "An untested invariant does not exist",
      body:
        "Product rules come down to the test level: they fail CI instead of living in a document nobody rereads.",
      proofs: [
        { label: "Ratchet", detail: "any types never creep back" },
        { label: "Thresholds", detail: "client ≡ server, verified" },
        { label: "Architecture", detail: "facts ⇸ projections" },
        { label: "Colours", detail: "no hardcoded literals" },
      ],
    },
    {
      numeral: "III",
      label: "PRINCIPLE III",
      title: "A runtime constraint is a design constraint",
      body:
        "Serverless, a provider's rate limit, the death of a Lambda: architecture parameters, not accidents to absorb in production.",
      proofs: [
        { label: "Timeout", detail: "90 s < Lambda lifetime" },
        { label: "Credit", detail: "reserved before the call" },
        { label: "Rate limit", detail: "in the database, not in memory" },
      ],
    },
  ],

  thesisNotes: [
    {
      title: "THE BUG THAT CREATED A RULE",
      body: [
        "Eight copies of one palette hardcoded the light-theme values: the best possible score rendered at ",
        { strong: "1.59:1" },
        " contrast on the dark theme, invisible. After moving to tokens: ",
        { strong: "9.95:1", accent: true },
        ". Since then, a test forbids colour literals in components.",
      ],
    },
    {
      title: "WHAT I REFUSE TO SHIP",
      body: [
        "An experience invented by a model, a score that regresses for no explainable reason, a credit charged for a generation never received, a PDF that looks good but is unreadable by an ATS. Each of these four refusals produced a line of architecture.",
      ],
    },
  ],

  caseStudies: casesEn,

  aggregateNumbers: [
    { value: "~110,000", label: "LINES OF TYPESCRIPT" },
    { value: "941 + 74", label: "TEST CASES · TEST FILES", accent: true },
    { value: "78", label: "API ROUTES · STUDYLUMINA" },
    { value: "3", label: "BILINGUAL FR/EN PRODUCTS" },
    { value: "0", label: "TRAINED ML MODELS" },
    { value: "2", label: "STRIPE WEBHOOKS IN PROD" },
  ],

  skills: [
    { category: "dev", name: "TypeScript strict", level: "expert", percent: 92 },
    { category: "dev", name: "Next.js · SvelteKit · React", level: "advanced", percent: 88 },
    { category: "dev", name: "Node.js · typed APIs (tRPC)", level: "advanced", percent: 85 },
    { category: "dev", name: "Python", level: "advanced", percent: 86 },
    { category: "dev", name: "C / C++ · systems", level: "solid", percent: 74 },
    { category: "cloud", name: "PostgreSQL · Prisma · MongoDB", level: "advanced", percent: 86 },
    { category: "cloud", name: "AWS · serverless deployment", level: "solid", percent: 78 },
    { category: "cloud", name: "Docker · Linux · WSL", level: "advanced", percent: 84 },
    { category: "cloud", name: "Job queues (BullMQ · Redis)", level: "solid", percent: 76 },
    { category: "cloud", name: "RAG · pgvector · embeddings", level: "solid", percent: 80 },
    { category: "secu", name: "Application security · authentication", level: "advanced", percent: 84 },
    { category: "secu", name: "Cloud posture · CIS · IAM", level: "solid", percent: 78 },
    { category: "secu", name: "Network reconnaissance · Linux", level: "solid", percent: 72 },
  ],

  skillFilters: [
    { id: "all", label: "ALL" },
    { id: "dev", label: "PRODUCT & BACKEND" },
    { id: "cloud", label: "CLOUD & DATA" },
    { id: "secu", label: "SECURITY" },
  ],

  timeline: [
    {
      date: "→ DEC. 2027",
      dateAccent: true,
      title: "B.Eng. Computer Engineering",
      org: "Polytechnique Montréal",
      body: "A track oriented toward secure systems, cloud and distributed environments.",
      lines: ["Cybersecurity : A", "Distributed systems & cloud : B+", "GPA : 3.65 (winter 2026)"],
    },
    {
      date: "SINCE OCT. 2024",
      title: "Brand representative",
      org: "Qualcomm / Snapdragon PC, Channel Partners",
      body:
        "Explaining technical solutions to the public: adapting the pitch to each person, making an architecture understandable in two minutes. It is the skill that makes an engineering decision defensible.",
    },
    {
      date: "2025-2026",
      title: "Three products shipped solo",
      org: "Carriv · StudyLumina · Sanade",
      body:
        "Design, development, production release, payments, transactional email, bilingual SEO and observability, with no team.",
    },
    {
      date: "CERTIFICATIONS & LANGUAGES",
      title: "Markers",
      org: "",
      lines: [
        "Advent of Cyber · TryHackMe · Dec. 2025",
        "French : native",
        "English : fluent",
        "Montréal, QC · open to remote",
      ],
    },
  ],

  navLinks: [
    { id: "approche", label: "Approach" },
    { id: "travaux", label: "Work" },
    { id: "capacites", label: "Capabilities" },
    { id: "parcours", label: "Path" },
  ],

  paletteItems: [
    { id: "accueil", index: "00", label: "Home", hint: "hero" },
    { id: "approche", index: "01", label: "Engineering thesis", hint: "principles" },
    { id: "travaux", index: "02", label: "Case studies", hint: "carriv · studylumina · sanade" },
    { id: "chiffres", index: "03", label: "Numbers", hint: "volume" },
    { id: "capacites", index: "04", label: "Capabilities", hint: "stack" },
    { id: "parcours", index: "05", label: "Career path", hint: "polytechnique" },
    { id: "contact", index: "06", label: "Contact", hint: "email · linkedin" },
  ],

  heroStats: [
    { value: "3", label: "PRODUCTS IN PRODUCTION" },
    { value: "110k+", label: "LINES OF TYPESCRIPT" },
    { value: "941", label: "TEST CASES · SANADE" },
    { value: "3.65", label: "GPA · WINTER 2026" },
  ],

  typingLines: [
    "the model generates, the code decides",
    "three products in production, solo",
    "an untested invariant does not exist",
    "from the prompt to the payment webhook",
  ],
};
