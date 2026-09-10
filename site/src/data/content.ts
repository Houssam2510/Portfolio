export type Stat = { value: string; label: string; accent?: boolean };

export type ThesisPrinciple = {
  numeral: string;
  label: string;
  title: string;
  body: string;
  proofs: { label: string; detail: string }[];
};

export const thesisPrinciples: ThesisPrinciple[] = [
  {
    numeral: "I",
    label: "PRINCIPE I",
    title: "Le modèle extrait, le code décide",
    body: "Un LLM est excellent pour reformuler et classer, désastreux pour produire un nombre censé être reproductible. Chaque chiffre affiché à l'utilisateur sort d'une fonction pure.",
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
    body: "Les règles produit descendent au niveau du test : elles échouent la CI au lieu de vivre dans un document que personne ne relit.",
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
    body: "Le serverless, le débit d'un fournisseur, la mort d'une Lambda : des paramètres d'architecture, pas des accidents à absorber en production.",
    proofs: [
      { label: "Timeout", detail: "90 s < durée de vie Lambda" },
      { label: "Crédit", detail: "réservé avant l'appel" },
      { label: "Rate limit", detail: "en base, pas en mémoire" },
    ],
  },
];

export const thesisNotes = [
  {
    title: "LE BUG QUI A CRÉÉ UNE RÈGLE",
    body: 'Huit copies d’une palette codaient les valeurs du thème clair en dur : le meilleur score possible s’affichait à <strong style="color:var(--ink)">1,59:1</strong> de contraste sur le thème sombre — invisible. Après passage aux tokens : <strong style="color:var(--acc)">9,95:1</strong>. Depuis, un test interdit les couleurs littérales dans les composants.',
  },
  {
    title: "CE QUE JE REFUSE D'EXPÉDIER",
    body: "Une expérience inventée par un modèle, un score qui régresse sans raison explicable, un crédit débité pour une génération jamais reçue, un PDF joli mais illisible par un ATS. Ces quatre refus ont chacun produit une ligne d'architecture.",
  },
];

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

export const caseStudies: CaseStudy[] = [
  {
    id: "dossier-01",
    number: "01",
    name: "Carriv",
    navLabel: "ADAPTATION DE CV · EN PRODUCTION",
    status: "live",
    domain: "carriv.com",
    role: "Conception & développement, seul",
    period: "2026",
    url: "https://carriv.com",
    title: "Carriv — adapter un CV à une offre, sans jamais rien inventer",
    description:
      "Postuler correctement demande 30 à 45 minutes par candidature ; demander à un chatbot de « faire le CV » produit des expériences inventées qui s'effondrent en entretien. Carriv adapte un profil maître à une offre donnée sous une règle de zéro invention inscrite dans chaque prompt.",
    screenshotAlt: "Capture Carriv — CV adapté et score ATS",
    changeTitle: "CE QUE ÇA CHANGE POUR LE CANDIDAT",
    changes: [
      "30 à 45 minutes de travail par candidature ramenées à une trentaine de secondes.",
      "Rien d'inventé : tout ce qui est écrit sur le CV est défendable en entretien.",
      "Le PDF passe les filtres ATS au lieu d'être rejeté par sa mise en page.",
      "Le crédit est remboursé automatiquement si la génération échoue — jamais payé pour rien.",
    ],
    problem:
      "Le modèle peut réordonner, sélectionner, reformuler et omettre — jamais fabriquer une expérience, une date, un employeur, un diplôme ou un chiffre. La traduction est la seule transformation autorisée, avec fidélité stricte du niveau de diplôme.",
    decision:
      "Le score ATS n'est pas produit par le modèle. Un vrai ATS est un moteur de correspondance de mots-clés, pas un juge : le LLM extrait et classe les écarts, le score est une fonction déterministe. Re-scorer donne toujours le même nombre, et appliquer une reformulation ne peut qu'ajouter un mot-clé — donc jamais faire baisser le score.",
    pipelineLabel: "POST /api/generate — LE PIPELINE",
    pipelineCode: `resolveApiUser      session ou token personnel (extension)
enforceRateLimit    30 générations / h / utilisateur
getProfile          scopé userId — jamais d'accès croisé
reserveCredit       findOneAndUpdate atomique { credits: { $gte: 1 } } → 402
analyzeJob          Structured Outputs · modèle principal
adaptCVAndLetter    Structured Outputs · modèle principal
scoreATS            matching déterministe, pondéré must=2 / nice=1
createApplication
catch → refundCredit + alerte`,
    stats: [
      { value: "~30 s", label: "GÉNÉRATION", accent: true },
      { value: "10", label: "MODÈLES PDF" },
      { value: "30/h", label: "PLAFOND" },
      { value: "2", label: "DEVISES" },
    ],
    details: [
      {
        title: "REMBOURSEMENT GARANTI",
        body: "Client OpenAI plafonné à 90 s et une seule reprise, au lieu de 10 minutes et 2 retries. Sur Vercel, une requête pendue doit échouer pendant que la Lambda vit encore — sinon le catch qui rembourse ne s'exécute jamais et l'utilisateur paie une génération qu'il n'a pas reçue.",
      },
      {
        title: "LE MUR ATS",
        body: "L'application a une direction artistique affirmée ; les PDF restent strictement ATS-safe — une colonne, typographie seule, aucune couleur ni décor. C'est exactement là que la plupart des générateurs échouent.",
      },
      {
        title: "SÉCURITÉ PAIEMENT",
        body: "Le montant Stripe n'est jamais cru côté client : le nombre de crédits vient de la table serveur indexée par Price ID, webhook vérifié par signature. Tokens d'extension stockés en SHA-256 uniquement. Plafond explicite à 30 pages contre les bombes de décompression PDF.",
      },
    ],
    tags: [
      "SvelteKit 2",
      "Svelte 5 runes",
      "TypeScript strict",
      "MongoDB",
      "better-auth",
      "OpenAI Structured Outputs",
      "Stripe",
      "puppeteer-core",
      "Vercel",
      "Vitest",
    ],
  },
  {
    id: "dossier-02",
    number: "02",
    name: "StudyLumina",
    navLabel: "PRÉPARATION AUX EXAMENS · EN PRODUCTION",
    status: "live",
    domain: "app.studylumina.com",
    role: "Conception & développement, seul",
    period: "2026",
    url: "https://app.studylumina.com",
    title: "StudyLumina — mesurer la préparation réelle à un examen",
    description:
      "Les outils d'étude IA s'arrêtent à la génération de contenu. StudyLumina mesure la préparation réelle, chapitre par chapitre, et indique quoi faire aujourd'hui. Aucune note n'est jamais produite par un LLM.",
    screenshotAlt: "Capture StudyLumina — préparation par chapitre",
    changeTitle: "CE QUE ÇA CHANGE POUR L'ÉTUDIANT",
    changes: [
      "Une réponse à la seule question utile : suis-je prêt, sur quel chapitre, et que faire aujourd'hui.",
      "Chaque réponse est citée — document et page — donc vérifiable au lieu d'être crue.",
      "Le score s'expose à la contradiction : l'erreur moyenne face aux vraies notes est affichée.",
      "On dépose un PDF et on continue à travailler : résumé, flashcards et quiz arrivent en arrière-plan.",
    ],
    problem:
      "Un résumé ne dit pas si l'étudiant est prêt. Sans rattachement d'un document à un chapitre, impossible d'attribuer une réponse de quiz à une matière — donc impossible de mesurer autre chose qu'une moyenne globale sans valeur.",
    decision:
      "Cours → Chapitre → Document est obligatoire : un document orphelin n'existe pas. C'est la condition de possibilité de tout le produit. L'Exam Readiness Score est une fonction pure de ~850 lignes, sans réseau ni LLM, et l'ajout du facteur de rétention est gaté : un chapitre sans flashcard révisée obtient un score strictement identique à avant, prouvé par test.",
    pipelineLabel: "INGESTION ASYNCHRONE — 6 FILES BULLMQ",
    pipelineCode: `upload → ingestion    extraction PDF, nettoyage pages
       → embeddings   chunking, batch + rate-limit, pgvector
       → course-map   rattachement chunks ↔ chapitres
       → summary | flashcards | quiz        (en parallèle)

RAG hybride : pgvector + BM25 (GIN) fusionnés, filtrés
cours/chapitre, SQL paramétré. Sur un follow-up, la
question est condensée en requête autonome avant
récupération. Citations → document + page.`,
    stats: [
      { value: "47 600", label: "LIGNES TS" },
      { value: "78", label: "ROUTES API" },
      { value: "74", label: "FICHIERS DE TESTS", accent: true },
      { value: "25", label: "MODÈLES PRISMA" },
    ],
    details: [
      {
        title: "UN SCORE FALSIFIABLE",
        body: "L'étudiant saisit sa vraie note après l'examen ; le produit affiche l'erreur moyenne entre score prédit et note obtenue. La note réelle n'est jamais réinjectée dans le calcul — le score se rend réfutable au lieu de se déclarer juste.",
      },
      {
        title: "HONNÊTETÉ DU SCORE",
        body: "La couverture agit en multiplicateur de confiance : trois bonnes réponses ne peuvent pas faire lire « Ready ». Le score global est lissé, donc un seul mauvais quiz ne fait pas tout s'effondrer.",
      },
      {
        title: "MODÈLE DE DONNÉES",
        body: "Modèle bridge DocumentChapterSpan avec plages de pages plutôt qu'une clé étrangère : un PDF couvre souvent plusieurs chapitres, un chapitre s'étale sur plusieurs PDF. Aucune métrique scalaire en JSON brut.",
      },
    ],
    tags: [
      "Next.js 15",
      "React 18",
      "PostgreSQL + pgvector",
      "Prisma 6",
      "BullMQ + Redis",
      "Auth.js v5",
      "Gemini / OpenAI / DeepSeek",
      "Stripe",
      "Pino + Prometheus",
      "next-intl",
    ],
  },
  {
    id: "dossier-03",
    number: "03",
    name: "Sanade",
    navLabel: "ARBITRAGE D'HABITUDES · EN PRODUCTION",
    status: "live",
    domain: "sanade.app",
    role: "Conception & développement, seul",
    period: "2025 — 2026",
    url: "https://sanade.app",
    title: "Sanade — le suivi d'habitudes qui arbitre au lieu d'enregistrer",
    description:
      "Les trackers affichent fidèlement l'écart entre le prévu et le fait, pendant des mois, sans jamais rien en faire. Sanade calcule le temps réellement utilisable dans la journée, propose deux ou trois objectifs tenables et écarte le reste en disant pourquoi.",
    screenshotAlt: "Capture Sanade — arbitrage du jour",
    changeTitle: "CE QUE ÇA CHANGE POUR L'UTILISATEUR",
    changes: [
      "Deux ou trois objectifs tenables pour aujourd'hui, au lieu d'une liste de douze qui culpabilise.",
      "Chaque objectif écarté est motivé : l'utilisateur voit pourquoi, il ne subit pas un tri opaque.",
      "On écrit sa note en français, en darija translittérée ou en arabe — le texte brut est conservé tel quel.",
      "Web et mobile partagent le même cœur de domaine : aucune divergence de calcul entre les deux.",
    ],
    problem:
      "Une capacité déclarée est une capacité fantasmée. Et avec six domaines et des décalages temporels, un cycle d'analyse teste des centaines de paires : un seuil individuel garantirait mécaniquement des faux liens à chaque passage.",
    decision:
      "Faits contre projections, visible dans les noms de tables : tout calcul stocké porte le préfixe proj_, donc clearProjections() est sûr à tout moment et une formule de score peut être corrigée sans laisser un historique incohérent. Aucune table de faits ne pointe vers une projection — et un test d'architecture le vérifie, parce que la règle a déjà été violée en silence une fois.",
    pipelineLabel: "INGESTION — UNE EXTRACTION NE CRÉE JAMAIS DE DONNÉE",
    pipelineCode: `texte brut (FR / darija translittérée / arabe)
  → RawNote                stockée telle quelle, jamais réécrite
  → prompt versionné + LLM côté serveur
  → JSON validé par schéma Zod strict
      ├─ échec  → une réparation, puis échec journalisé
      └─ succès → Extraction { proposals, confidence }
  → écran de revue          validation item par item
  → Trackable (PLAN) ou LogEntry (CHECKIN)`,
    stats: [
      { value: "62 000", label: "LIGNES TS" },
      { value: "941", label: "TESTS", accent: true },
      { value: "13 700", label: "DOMAINE PUR" },
      { value: "0", label: "SERVICE REQUIS" },
    ],
    details: [
      {
        title: "LA BIENVEILLANCE EST DANS LA FORMULE",
        body: "Une journée non renseignée sort du calcul au lieu de compter zéro : elle fait baisser la confiance affichée, jamais le score. Trois jours sans données affichent « score 74, confiance faible », pas « score 31 » — sinon le produit punirait le fait de ne pas ouvrir l'application.",
      },
      {
        title: "RIGUEUR STATISTIQUE",
        body: "Ce qui est affiché est une fréquence conditionnelle empirique — deux nombres refaisables à la main. Les liens sont testés par cycle complet, le nombre de tests est compté, et la publication est filtrée sur le taux de fausses découvertes. Chaque motif fige son cycle.",
      },
      {
        title: "CŒUR DE DOMAINE PUR",
        body: "packages/core n'importe jamais db, api, ingestion ni React : 13 700 lignes testables sans base, sans réseau, sans clé d'API. La logique ne peut pas diverger entre web et mobile — c'est une propriété de la structure, pas une discipline.",
      },
    ],
    tags: [
      "TypeScript ESM",
      "Next.js 16 / React 19",
      "Expo · React Native",
      "tRPC v11",
      "Prisma + PostgreSQL",
      "PGlite (WASM)",
      "Zod",
      "Vitest · Playwright",
      "Turborepo · pnpm",
      "Sentry",
    ],
  },
  {
    id: "dossier-04",
    number: "04",
    name: "CSPM-Lite",
    navLabel: "POSTURE CLOUD · OUTIL CLI",
    status: "internal",
    domain: "",
    role: "Outil personnel",
    period: "2025",
    title: "CSPM-Lite — la sécurité cloud qui bloque le pipeline",
    description:
      "Un outil CLI qui analyse un compte AWS, détecte les mauvaises configurations, évalue la conformité et produit des rapports exploitables — puis refuse de laisser passer le déploiement.",
    screenshotAlt: "",
    changeTitle: "CE QUE ÇA CHANGE POUR L'ÉQUIPE",
    changes: [
      "Une faille critique arrête le déploiement : la sécurité devient une porte, plus un rapport.",
      "Deux sorties : du JSON pour la machine, du HTML lisible pour la revue humaine.",
      "Des contrôles alignés CIS sans licence d'outil commercial.",
    ],
    problem:
      "Une mauvaise configuration cloud ne se voit pas dans une revue de code : bucket S3 public, port SSH ouvert, utilisateur sans MFA. Elle se voit en production, ou dans une fuite.",
    decision:
      "Le rapport ne suffit pas — personne ne lit un rapport. Le contrôle devient bloquant : une faille critique arrête le pipeline CI/CD, ce qui déplace la sécurité de l'audit vers la porte d'entrée.",
    pipelineLabel: "CONTRÔLES ET SORTIES",
    pipelineCode: `scan compte AWS
  → détection      S3 public · SSH ouvert · absence de MFA
  → conformité     contrôles alignés CIS Benchmark
  → priorisation   criticité + recommandation de remédiation
  → rapports       JSON (machine) + HTML (humain)
  → gate CI/CD     faille critique → build bloqué`,
    stats: [
      { value: "CIS", label: "RÉFÉRENTIEL" },
      { value: "2", label: "FORMATS DE RAPPORT" },
      { value: "CI", label: "BLOCAGE ACTIF", accent: true },
      { value: "A", label: "COURS CYBERSÉCURITÉ" },
    ],
    details: [
      {
        title: "POURQUOI CET OUTIL",
        body: "Le cours de cybersécurité donne les concepts ; un compte AWS réel donne les mauvaises surprises. Cet outil est né du besoin de vérifier mes propres déploiements avant qu'un correcteur — ou un attaquant — ne le fasse.",
      },
      {
        title: "LABORATOIRES ASSOCIÉS",
        body: "Découverte réseau, énumération de services, sécurité web de base et dépannage en environnement Linux. Advent of Cyber (TryHackMe, déc. 2025) pour la démarche d'investigation structurée.",
      },
    ],
    tags: ["Python", "AWS SDK (boto3)", "CIS Benchmark", "Linux", "GitHub Actions", "JSON / HTML"],
    terminalCommand: "$ cspm-lite scan --account prod --gate",
  },
];

export const aggregateNumbers: Stat[] = [
  { value: "~110 000", label: "LIGNES DE TYPESCRIPT" },
  { value: "941 + 74", label: "CAS DE TEST · FICHIERS DE TESTS", accent: true },
  { value: "78", label: "ROUTES API · STUDYLUMINA" },
  { value: "3", label: "PRODUITS BILINGUES FR/EN" },
  { value: "0", label: "MODÈLE ML ENTRAÎNÉ" },
  { value: "2", label: "WEBHOOKS STRIPE EN PROD" },
];

export type Skill = {
  category: "dev" | "cloud" | "secu";
  name: string;
  level: string;
  percent: number;
};

export const skills: Skill[] = [
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
];

export const skillFilters = [
  { id: "all", label: "TOUT" },
  { id: "dev", label: "PRODUIT & BACKEND" },
  { id: "cloud", label: "CLOUD & DONNÉES" },
  { id: "secu", label: "SÉCURITÉ" },
] as const;

export type TimelineEntry = {
  date: string;
  dateAccent?: boolean;
  title: string;
  org: string;
  body?: string;
  lines?: string[];
};

export const timeline: TimelineEntry[] = [
  {
    date: "→ DÉC. 2027",
    dateAccent: true,
    title: "B.Ing. génie informatique",
    org: "Polytechnique Montréal",
    body: "Parcours orienté systèmes sécurisés, cloud et environnements distribués.",
    lines: [
      "Cybersécurité — A",
      "Systèmes répartis & infonuagique — B+",
      "GPA — 3,65 (hiver 2026)",
    ],
  },
  {
    date: "OCT. 2024 — PRÉSENT",
    title: "Représentant de marque",
    org: "Qualcomm / Snapdragon PC — Channel Partners",
    body: "Vulgarisation de solutions techniques auprès du public : adapter le discours à chaque interlocuteur, rendre une architecture compréhensible en deux minutes. C'est la compétence qui rend une décision d'ingénierie défendable.",
  },
  {
    date: "2025 — 2026",
    title: "Trois produits expédiés seul",
    org: "Carriv · StudyLumina · Sanade",
    body: "Conception, développement, mise en production, paiement, e-mails transactionnels, SEO bilingue et observabilité — sans équipe.",
  },
  {
    date: "CERTIFICATIONS & LANGUES",
    title: "Repères",
    org: "",
    lines: [
      "Advent of Cyber — TryHackMe · déc. 2025",
      "Français — natif",
      "Anglais — courant",
      "Montréal, QC · ouvert au télétravail",
    ],
  },
];

export const navLinks = [
  { id: "s01", label: "Approche" },
  { id: "s02", label: "Travaux" },
  { id: "s04", label: "Capacités" },
  { id: "s05", label: "Parcours" },
];

export const paletteItems = [
  { id: "s00", index: "00", label: "Accueil", hint: "hero" },
  { id: "s01", index: "01", label: "Thèse d'ingénierie", hint: "principes" },
  { id: "s02", index: "02", label: "Études de cas", hint: "carriv · studylumina · sanade" },
  { id: "s03", index: "03", label: "Chiffres", hint: "volume" },
  { id: "s04", index: "04", label: "Capacités", hint: "stack" },
  { id: "s05", index: "05", label: "Parcours", hint: "polytechnique" },
  { id: "s06", index: "06", label: "Contact", hint: "email · téléphone" },
];

export const contact = {
  email: "houssam.nadir@outlook.com",
  phone: "+1 514 503 0893",
  phoneHref: "tel:+15145030893",
  linkedin: "https://www.linkedin.com/in/houssam-nadir-a1a292263/",
};

export const heroStats: Stat[] = [
  { value: "3", label: "PRODUITS EN PRODUCTION" },
  { value: "110k+", label: "LIGNES DE TYPESCRIPT" },
  { value: "941", label: "CAS DE TEST · SANADE" },
  { value: "3,65", label: "GPA · HIVER 2026" },
];

export const typingLines = [
  "le modèle génère, le code décide",
  "trois produits en production, seul",
  "un invariant non testé n’existe pas",
  "du prompt jusqu’au webhook de paiement",
];
