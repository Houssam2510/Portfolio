export type Stat = { value: string; label: string; accent?: boolean };

/**
 * Fragment de texte enrichi. Remplace le HTML brut qui était injecté via
 * dangerouslySetInnerHTML : le contenu reste des données, pas du balisage.
 */
export type RichPart = string | { strong: string; accent?: boolean };

export type ThesisPrinciple = {
  numeral: string;
  label: string;
  title: string;
  body: string;
  proofs: { label: string; detail: string }[];
};

export type CaseStudy = {
  id: string;
  number: string;
  name: string;
  navLabel: string;
  status: "live" | "internal";
  domain: string;
  role: string;
  period: string;
  url?: string;
  title: string;
  description: string;
  screenshotAlt: string;
  changeTitle: string;
  changes: string[];
  problem: string;
  decision: string;
  pipelineLabel: string;
  pipelineCode: string;
  stats: Stat[];
  details: { title: string; body: string }[];
  tags: string[];
  terminalCommand?: string;
};

export type Skill = {
  category: "dev" | "cloud" | "secu";
  name: string;
  level: string;
  percent: number;
};

export type TimelineEntry = {
  date: string;
  dateAccent?: boolean;
  title: string;
  org: string;
  body?: string;
  lines?: string[];
};

/**
 * Toutes les chaînes affichées par le site, y compris celles qui vivaient
 * auparavant en dur dans les composants (chapeaux de section, étiquettes de
 * fiches, libellés d'interface). Une seule forme par langue, vérifiée par le
 * compilateur : une clé oubliée dans une traduction est une erreur de build.
 */
export type Content = {
  meta: { title: string; description: string; ogAlt: string };
  ui: {
    tagline: string;
    skipToContent: string;
    toggleTheme: string;
    search: string;
    contact: string;
    openPalette: string;
    paletteLabel: string;
    paletteFilter: string;
    paletteEscape: string;
    switchLanguage: string;
    role: string;
    period: string;
    status: string;
    statusLive: string;
    statusInternal: string;
    viewLive: string;
    live: string;
    theProblem: string;
    theDecision: string;
    caseLabel: string;
    /** Gabarit ; {domain} est remplacé à l'affichage. Une fonction ne peut pas
     *  franchir la frontière Server -> Client Component. */
    screenshotCaption: string;
    screenshotLoading: string;
    screenshotFailed: string;
    screenshotOpen: string;
    timelineScrollHint: string;
    skillsFilterLabel: string;
    footer: string;
    availability: string;
    location: string;
    graduation: string;
    statusBarHeadline: string;
    localTime: string;
  };
  sections: {
    thesis: { eyebrow: string; title: string; intro: string };
    cases: { eyebrow: string; title: string };
    numbers: { eyebrow: string; title: string; footnote: RichPart[] };
    skills: { eyebrow: string; title: string };
    timeline: { eyebrow: string; title: string };
  };
  hero: {
    lede: string;
    ctaCases: string;
    ctaLinkedin: string;
    ctaContact: string;
  };
  contactSection: {
    prompt: string;
    title: string;
    body: string;
    facts: string[];
  };
  thesisPrinciples: ThesisPrinciple[];
  thesisNotes: { title: string; body: RichPart[] }[];
  caseStudies: CaseStudy[];
  aggregateNumbers: Stat[];
  skills: Skill[];
  skillFilters: { id: string; label: string }[];
  timeline: TimelineEntry[];
  navLinks: { id: string; label: string }[];
  paletteItems: { id: string; index: string; label: string; hint: string }[];
  heroStats: Stat[];
  typingLines: string[];
};
