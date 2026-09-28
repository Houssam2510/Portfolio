export type Stat = { value: string; label: string; accent?: boolean };

export type ThesisPrinciple = {
  numeral: string;
  label: string;
  title: string;
  body: string;
  proofs: { label: string; detail: string }[];
};

/**
 * Un projet se lit en deux temps : ce qui se comprend en cinq secondes
 * (pitch, flux, trois chiffres) reste visible ; le raisonnement d'ingénierie
 * (problème, décision, pipeline) est replié sous « Sous le capot ».
 */
export type CaseStudy = {
  id: string;
  number: string;
  name: string;
  /** product : en production, carte large avec capture. lab : carte compacte. */
  kind: "product" | "lab";
  status: "live" | "internal" | "open";
  /** Mot-clé du domaine, affiché au-dessus du nom (ex. « CARRIÈRE »). */
  domainLabel: string;
  period: string;
  domain?: string;
  url?: string;
  repo?: string;
  screenshotAlt?: string;
  /** Une phrase. Si elle en demande deux, elle est trop longue. */
  pitch: string;
  /** Le produit en quatre étapes, rendu comme un schéma. */
  flow: string[];
  /** Fiche d'identité pour les projets sans capture d'écran. */
  specs?: { key: string; value: string }[];
  stats: Stat[];
  tags: string[];
  problem: string;
  decision: string;
  pipelineLabel: string;
  pipelineCode: string;
};

export type Skill = {
  category: "dev" | "cloud" | "secu";
  name: string;
  /** Où la compétence a été mise en œuvre : une preuve plutôt qu'un pourcentage. */
  usedIn: string;
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
    statusLive: string;
    statusInternal: string;
    statusOpen: string;
    viewLive: string;
    viewCode: string;
    privateRepo: string;
    live: string;
    underTheHood: string;
    theProblem: string;
    theDecision: string;
    timelineScrollHint: string;
    footer: string;
    availability: string;
    location: string;
    graduation: string;
    statusBarHeadline: string;
    localTime: string;
  };
  sections: {
    thesis: { eyebrow: string; title: string; intro: string };
    cases: { eyebrow: string; title: string; productsLabel: string; labLabel: string };
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
  caseStudies: CaseStudy[];
  skills: Skill[];
  skillGroups: { id: Skill["category"]; label: string }[];
  timeline: TimelineEntry[];
  navLinks: { id: string; label: string }[];
  paletteItems: { id: string; index: string; label: string; hint: string }[];
  heroStats: Stat[];
  typingLines: string[];
};
