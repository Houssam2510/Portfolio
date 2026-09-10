import { casesFr } from "./cases.fr";
import type { Content } from "./types";

export const fr: Content = {
  meta: {
    title: "Houssam Nadir · Génie informatique, Polytechnique Montréal",
    description:
      "Étudiant en génie informatique à Polytechnique Montréal. Cloud, cybersécurité et développement. Trois produits en production, seul : Carriv, StudyLumina, Sanade.",
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
    role: "RÔLE",
    period: "PÉRIODE",
    status: "STATUT",
    statusLive: "En production",
    statusInternal: "Outil interne",
    viewLive: "VOIR EN LIGNE ↗",
    live: "LIVE",
    theProblem: "LE PROBLÈME",
    theDecision: "LA DÉCISION CENTRALE",
    caseLabel: "CAS",
    screenshotCaption: "APERÇU AUTOMATIQUE DE {domain} · CAPTURÉ APRÈS STABILISATION",
    screenshotLoading: "CAPTURE EN COURS",
    screenshotFailed: "APERÇU INDISPONIBLE",
    screenshotOpen: "OUVRIR {domain} ↗",
    timelineScrollHint: "Parcours, faire défiler horizontalement",
    skillsFilterLabel: "Filtrer les compétences par domaine",
    footer: "© 2026 HOUSSAM NADIR · CONÇU ET CODÉ À MONTRÉAL",
    availability: "DISPONIBLE · STAGE 2027",
    location: "MONTRÉAL · UTC-5",
    graduation: "B.ING · DÉC. 2027",
    statusBarHeadline: "TROIS PRODUITS EN PRODUCTION",
    localTime: "MONTRÉAL · UTC-5",
  },

  sections: {
    thesis: {
      eyebrow: "01 · ./PRINCIPES --APPLIQUÉS",
      title: "Ma thèse d'ingénierie",
      intro:
        "Trois principes, tenus dans les trois produits. Ce ne sont pas des slogans : chacun est vérifié par du code.",
    },
    cases: { eyebrow: "02 · QUATRE DOSSIERS, RIEN DE CACHÉ", title: "Études de cas" },
    numbers: {
      eyebrow: "03 · AGRÉGÉ SUR LES TROIS PLATEFORMES",
      title: "Ce que ça représente",
      footnote: [
        "Les trois produits partagent la même colonne vertébrale : validation par schéma à toutes les frontières, jamais de ",
        { strong: ".parse()" },
        " qui explose, clients externes initialisés paresseusement pour qu'un build passe sans secret, et un échec bruyant préféré à une valeur fabriquée en silence.",
      ],
    },
    skills: { eyebrow: "04 · FILTRER PAR DOMAINE", title: "Capacités" },
    timeline: { eyebrow: "05 · GLISSER →", title: "Parcours" },
  },

  hero: {
    lede:
      "Étudiant en génie informatique à Polytechnique Montréal. J’expédie des produits complets, seul : pipelines LLM à sorties structurées, scoring déterministe, comptabilité transactionnelle sans course, sécurité cloud. Trois plateformes en production, de la landing bilingue au webhook de paiement signé.",
    ctaCases: "Voir les études de cas",
    ctaLinkedin: "LinkedIn ↗",
    ctaContact: "Me contacter",
  },

  contactSection: {
    prompt: "ouvrir --canal stage-2027",
    title: "Donnez-moi la contrainte, je reviens avec l’architecture.",
    body:
      "Je cherche un stage où je touche à la production : pipeline, sécurité, données, pas seulement à la maquette. Réponse sous 24 h.",
    facts: ["MONTRÉAL, QC", "UTC-5", "FR / EN", "DISPONIBLE 2027"],
  },

  thesisPrinciples: [
    {
      numeral: "I",
      label: "PRINCIPE I",
      title: "Le modèle extrait, le code décide",
      body:
        "Un LLM est excellent pour reformuler et classer, désastreux pour produire un nombre censé être reproductible. Chaque chiffre affiché à l'utilisateur sort d'une fonction pure.",
      proofs: [
        { label: "Carriv", detail: "score ATS déterministe" },
        { label: "StudyLumina", detail: "ERS, fonction pure de ~850 lignes" },
        { label: "Sanade", detail: "zéro modèle entraîné" },
      ],
    },
    {
      numeral: "II",
      label: "PRINCIPE II",
      title: "Un invariant non testé n'existe pas",
      body:
        "Les règles produit descendent au niveau du test : elles échouent la CI au lieu de vivre dans un document que personne ne relit.",
      proofs: [
        { label: "Cliquet", detail: "les any ne remontent jamais" },
        { label: "Seuils", detail: "client ≡ serveur, vérifié" },
        { label: "Architecture", detail: "faits ⇸ projections" },
        { label: "Couleurs", detail: "aucun littéral en dur" },
      ],
    },
    {
      numeral: "III",
      label: "PRINCIPE III",
      title: "La contrainte d'exécution est une contrainte de conception",
      body:
        "Le serverless, le débit d'un fournisseur, la mort d'une Lambda : des paramètres d'architecture, pas des accidents à absorber en production.",
      proofs: [
        { label: "Timeout", detail: "90 s < durée de vie Lambda" },
        { label: "Crédit", detail: "réservé avant l'appel" },
        { label: "Rate limit", detail: "en base, pas en mémoire" },
      ],
    },
  ],

  thesisNotes: [
    {
      title: "LE BUG QUI A CRÉÉ UNE RÈGLE",
      body: [
        "Huit copies d’une palette codaient les valeurs du thème clair en dur : le meilleur score possible s’affichait à ",
        { strong: "1,59:1" },
        " de contraste sur le thème sombre, invisible. Après passage aux tokens : ",
        { strong: "9,95:1", accent: true },
        ". Depuis, un test interdit les couleurs littérales dans les composants.",
      ],
    },
    {
      title: "CE QUE JE REFUSE D'EXPÉDIER",
      body: [
        "Une expérience inventée par un modèle, un score qui régresse sans raison explicable, un crédit débité pour une génération jamais reçue, un PDF joli mais illisible par un ATS. Ces quatre refus ont chacun produit une ligne d'architecture.",
      ],
    },
  ],

  caseStudies: casesFr,
  aggregateNumbers: [
    { value: "~110 000", label: "LIGNES DE TYPESCRIPT" },
    { value: "941 + 74", label: "CAS DE TEST · FICHIERS DE TESTS", accent: true },
    { value: "78", label: "ROUTES API · STUDYLUMINA" },
    { value: "3", label: "PRODUITS BILINGUES FR/EN" },
    { value: "0", label: "MODÈLE ML ENTRAÎNÉ" },
    { value: "2", label: "WEBHOOKS STRIPE EN PROD" },
  ],

  skills: [
    { category: "dev", name: "TypeScript strict", level: "expert", percent: 92 },
    { category: "dev", name: "Next.js · SvelteKit · React", level: "avancé", percent: 88 },
    { category: "dev", name: "Node.js · API typées (tRPC)", level: "avancé", percent: 85 },
    { category: "dev", name: "Python", level: "avancé", percent: 86 },
    { category: "dev", name: "C / C++ · systèmes", level: "solide", percent: 74 },
    { category: "cloud", name: "PostgreSQL · Prisma · MongoDB", level: "avancé", percent: 86 },
    { category: "cloud", name: "AWS · déploiement serverless", level: "solide", percent: 78 },
    { category: "cloud", name: "Docker · Linux · WSL", level: "avancé", percent: 84 },
    { category: "cloud", name: "Files de travaux (BullMQ · Redis)", level: "solide", percent: 76 },
    { category: "cloud", name: "RAG · pgvector · embeddings", level: "solide", percent: 80 },
    { category: "secu", name: "Sécurité applicative · authentification", level: "avancé", percent: 84 },
    { category: "secu", name: "Posture cloud · CIS · IAM", level: "solide", percent: 78 },
    { category: "secu", name: "Reconnaissance réseau · Linux", level: "solide", percent: 72 },
  ],

  skillFilters: [
    { id: "all", label: "TOUT" },
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
      body: "Parcours orienté systèmes sécurisés, cloud et environnements distribués.",
      lines: ["Cybersécurité : A", "Systèmes répartis & infonuagique : B+", "GPA : 3,65 (hiver 2026)"],
    },
    {
      date: "DEPUIS OCT. 2024",
      title: "Représentant de marque",
      org: "Qualcomm / Snapdragon PC, Channel Partners",
      body:
        "Vulgarisation de solutions techniques auprès du public : adapter le discours à chaque interlocuteur, rendre une architecture compréhensible en deux minutes. C'est la compétence qui rend une décision d'ingénierie défendable.",
    },
    {
      date: "2025-2026",
      title: "Trois produits expédiés seul",
      org: "Carriv · StudyLumina · Sanade",
      body:
        "Conception, développement, mise en production, paiement, e-mails transactionnels, SEO bilingue et observabilité, sans équipe.",
    },
    {
      date: "CERTIFICATIONS & LANGUES",
      title: "Repères",
      org: "",
      lines: [
        "Advent of Cyber · TryHackMe · déc. 2025",
        "Français : natif",
        "Anglais : courant",
        "Montréal, QC · ouvert au télétravail",
      ],
    },
  ],

  navLinks: [
    { id: "approche", label: "Approche" },
    { id: "travaux", label: "Travaux" },
    { id: "capacites", label: "Capacités" },
    { id: "parcours", label: "Parcours" },
  ],

  paletteItems: [
    { id: "accueil", index: "00", label: "Accueil", hint: "hero" },
    { id: "approche", index: "01", label: "Thèse d'ingénierie", hint: "principes" },
    { id: "travaux", index: "02", label: "Études de cas", hint: "carriv · studylumina · sanade" },
    { id: "chiffres", index: "03", label: "Chiffres", hint: "volume" },
    { id: "capacites", index: "04", label: "Capacités", hint: "stack" },
    { id: "parcours", index: "05", label: "Parcours", hint: "polytechnique" },
    { id: "contact", index: "06", label: "Contact", hint: "email · linkedin" },
  ],

  heroStats: [
    { value: "3", label: "PRODUITS EN PRODUCTION" },
    { value: "110k+", label: "LIGNES DE TYPESCRIPT" },
    { value: "941", label: "CAS DE TEST · SANADE" },
    { value: "3,65", label: "GPA · HIVER 2026" },
  ],

  typingLines: [
    "le modèle génère, le code décide",
    "trois produits en production, seul",
    "un invariant non testé n’existe pas",
    "du prompt jusqu’au webhook de paiement",
  ],
};
