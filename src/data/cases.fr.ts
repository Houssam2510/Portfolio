import type { CaseStudy } from "./types";

export const casesFr: CaseStudy[] = [
  {
    id: "carriv",
    number: "01",
    name: "Carriv",
    kind: "product",
    status: "live",
    domainLabel: "CARRIÈRE · IA",
    period: "2026",
    domain: "carriv.com",
    url: "https://carriv.com",
    screenshotAlt: "Capture Carriv : CV adapté et score ATS",
    pitch: "Adapte un CV à une offre en 30 secondes, sans jamais rien inventer.",
    flow: ["offre", "analyse LLM", "CV adapté", "score ATS déterministe"],
    stats: [
      { value: "~30 s", label: "PAR CANDIDATURE", accent: true },
      { value: "10", label: "MODÈLES PDF ATS-SAFE" },
      { value: "0", label: "EXPÉRIENCE INVENTÉE" },
    ],
    tags: ["SvelteKit", "TypeScript", "MongoDB", "OpenAI Structured Outputs", "Stripe", "Vercel"],
    problem:
      "Demander à un chatbot de « faire le CV » produit des expériences inventées qui s'effondrent en entretien.",
    decision:
      "Le modèle reformule, réordonne, omet, mais ne fabrique jamais. Le score ATS sort d'une fonction déterministe : re-scorer donne toujours le même nombre.",
    pipelineLabel: "POST /api/generate",
    pipelineCode: `reserveCredit       findOneAndUpdate atomique { credits: { $gte: 1 } } → 402
analyzeJob          Structured Outputs
adaptCVAndLetter    Structured Outputs
scoreATS            matching déterministe, must=2 / nice=1
catch → refundCredit + alerte     jamais payé pour rien`,
  },
  {
    id: "studylumina",
    number: "02",
    name: "StudyLumina",
    kind: "product",
    status: "live",
    domainLabel: "ÉDUCATION · RAG",
    period: "2026",
    domain: "app.studylumina.com",
    url: "https://app.studylumina.com",
    screenshotAlt: "Capture StudyLumina : préparation par chapitre",
    pitch: "Dit à un étudiant s'il est prêt pour son examen, chapitre par chapitre.",
    flow: ["PDF du cours", "RAG hybride", "quiz & flashcards", "score de préparation"],
    stats: [
      { value: "62k", label: "LIGNES TS" },
      { value: "78", label: "ROUTES API" },
      { value: "75", label: "FICHIERS DE TESTS", accent: true },
    ],
    tags: ["Next.js", "PostgreSQL + pgvector", "Prisma", "BullMQ + Redis", "Stripe", "next-intl"],
    problem: "Un résumé ne dit pas si l'étudiant est prêt. Une moyenne globale non plus.",
    decision:
      "Le score est une fonction pure de ~850 lignes, sans LLM. Il se rend réfutable : l'écart avec les vraies notes est affiché.",
    pipelineLabel: "INGESTION · 6 FILES BULLMQ",
    pipelineCode: `upload → ingestion    extraction PDF
       → embeddings   chunking, pgvector
       → course-map   chunks ↔ chapitres
       → summary | flashcards | quiz   (en parallèle)

RAG : pgvector + BM25 fusionnés · citations → document + page`,
  },
  {
    id: "sanade",
    number: "03",
    name: "Sanade",
    kind: "product",
    status: "live",
    domainLabel: "PRODUCTIVITÉ · WEB + MOBILE",
    period: "2025-2026",
    domain: "sanade.app",
    url: "https://sanade.app",
    screenshotAlt: "Capture Sanade : arbitrage du jour",
    pitch: "Transforme une journée dispersée en deux ou trois objectifs tenables.",
    flow: ["note libre FR / darija", "extraction validée", "scores de cohérence", "priorité du jour"],
    stats: [
      { value: "1 020", label: "TESTS", accent: true },
      { value: "94 %", label: "COUVERTURE DU DOMAINE" },
      { value: "2", label: "APPS, UN SEUL CŒUR" },
    ],
    tags: ["Next.js 16", "Expo", "tRPC", "Prisma", "PostgreSQL", "Turborepo"],
    problem:
      "Les trackers affichent l'écart entre le prévu et le fait pendant des mois, sans jamais rien en faire.",
    decision:
      "Faits contre projections : tout calcul stocké est jetable et recalculable. Un test d'architecture interdit qu'un fait dépende d'une projection.",
    pipelineLabel: "UNE EXTRACTION NE CRÉE JAMAIS DE DONNÉE",
    pipelineCode: `texte brut (FR / darija / arabe)
  → RawNote              stockée telle quelle
  → LLM + schéma Zod strict
  → écran de revue       validation item par item
  → Trackable ou LogEntry`,
  },
  {
    id: "job-radar",
    number: "04",
    name: "Job Radar",
    kind: "lab",
    status: "internal",
    domainLabel: "VEILLE · TEMPS RÉEL",
    period: "2026",
    pitch: "Voit une offre de stage quelques minutes après sa publication, pas quelques jours.",
    flow: ["4 899 sites carrière", "diff des réquisitions", "score sans LLM", "notification"],
    specs: [
      { key: "registre", value: "4 899 sources validées" },
      { key: "offres", value: "1 133 000+ couvertes" },
      { key: "ATS", value: "Workday · Greenhouse · Lever · Oracle · +20" },
      { key: "avance", value: "2 h à 72 h sur LinkedIn" },
    ],
    stats: [
      { value: "4 899", label: "SOURCES" },
      { value: "1,1 M", label: "OFFRES COUVERTES" },
      { value: "429", label: "TESTS", accent: true },
    ],
    tags: ["Node.js", "Extension navigateur", "Playwright", "Scoring déterministe"],
    problem:
      "Une offre met 2 à 72 h à arriver sur LinkedIn, alors que la majorité des embauches se joue dans les premiers jours.",
    decision:
      "Interroger l'endpoint que la page carrière appelle elle-même, et comparer les IDs de réquisition, jamais le contenu. Le registre a été miné depuis 37 000 URL réelles, puis chaque source validée en direct.",
    pipelineLabel: "UN PASSAGE",
    pipelineCode: `fetch           ~1 req/s par domaine
pré-score       titre + lieu, déterministe
diff            sur les IDs de réquisition
enrichissement  seulement si le score peut passer le seuil
notification    individuelle, ou digest`,
  },
  {
    id: "ratchet",
    number: "05",
    name: "Ratchet",
    kind: "lab",
    status: "open",
    domainLabel: "CRYPTOGRAPHIE · E2EE",
    period: "2026",
    repo: "https://github.com/Houssam2510/e2ee-messenger-protocol",
    pitch: "Une messagerie chiffrée de bout en bout où même un serveur compromis ne lit rien.",
    flow: ["X3DH", "Double Ratchet", "relais aveugle", "déchiffré sur l'appareil"],
    specs: [
      { key: "serveur", value: "ne voit que des octets opaques" },
      { key: "clé", value: "un message, puis détruite" },
      { key: "appels", value: "WebRTC, signalisation chiffrée" },
      { key: "crypto", value: "WebCrypto auditée, zéro maison" },
    ],
    stats: [
      { value: "91", label: "TESTS", accent: true },
      { value: "6", label: "INVARIANTS DE SÉCURITÉ" },
      { value: "0", label: "OCTET LISIBLE CÔTÉ SERVEUR" },
    ],
    tags: ["TypeScript strict", "React 19", "WebCrypto", "Supabase", "WebRTC", "PWA"],
    problem:
      "La plupart des « chats chiffrés » enveloppent le message dans AES et s'arrêtent là.",
    decision:
      "Implémenter le vrai protocole de Signal, avec des primitives auditées uniquement, et documenter ce qu'il ne protège pas (métadonnées, appareil compromis).",
    pipelineLabel: "INVARIANTS VÉRIFIÉS PAR LES TESTS",
    pipelineCode: `clé privée      ne quitte jamais l'appareil
nonce GCM       jamais réutilisé avec la même clé
en-tête         authentifié en AAD
sauvegarde      l'état du ratchet est exclu par construction`,
  },
  {
    id: "cspm-lite",
    number: "06",
    name: "CSPM-Lite",
    kind: "lab",
    status: "internal",
    domainLabel: "SÉCURITÉ CLOUD · CLI",
    period: "2025",
    pitch: "Scanne un compte AWS et bloque le déploiement si une faille critique apparaît.",
    flow: ["compte AWS", "contrôles CIS", "rapport JSON + HTML", "gate CI"],
    specs: [
      { key: "détecte", value: "S3 public · SSH ouvert · sans MFA" },
      { key: "norme", value: "CIS Benchmark" },
      { key: "sorties", value: "JSON (machine) + HTML (humain)" },
      { key: "en CI", value: "faille critique → build bloqué" },
    ],
    stats: [
      { value: "CIS", label: "RÉFÉRENTIEL" },
      { value: "2", label: "FORMATS DE RAPPORT" },
      { value: "CI", label: "BLOCAGE ACTIF", accent: true },
    ],
    tags: ["Python", "boto3", "CIS Benchmark", "GitHub Actions"],
    problem:
      "Une mauvaise configuration cloud ne se voit pas en revue de code. Elle se voit en production, ou dans une fuite.",
    decision: "Personne ne lit un rapport : le contrôle devient une porte, qui arrête le pipeline.",
    pipelineLabel: "$ cspm-lite scan --account prod --gate",
    pipelineCode: `scan → détection → conformité CIS → priorisation
     → rapports JSON + HTML
     → faille critique → exit 1`,
  },
];
