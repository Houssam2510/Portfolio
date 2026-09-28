import type { CaseStudy } from "./types";

export const casesEn: CaseStudy[] = [
  {
    id: "carriv",
    number: "01",
    name: "Carriv",
    kind: "product",
    status: "live",
    domainLabel: "CAREERS · AI",
    period: "2026",
    domain: "carriv.com",
    url: "https://carriv.com",
    screenshotAlt: "Carriv screenshot: tailored résumé and ATS score",
    pitch: "Tailors a résumé to a job posting in 30 seconds, without ever inventing anything.",
    flow: ["posting", "LLM analysis", "tailored résumé", "deterministic ATS score"],
    stats: [
      { value: "~30 s", label: "PER APPLICATION", accent: true },
      { value: "10", label: "ATS-SAFE PDF TEMPLATES" },
      { value: "0", label: "INVENTED EXPERIENCE" },
    ],
    tags: ["SvelteKit", "TypeScript", "MongoDB", "OpenAI Structured Outputs", "Stripe", "Vercel"],
    problem:
      "Asking a chatbot to \"write the résumé\" produces invented experience that collapses in the interview.",
    decision:
      "The model rephrases, reorders, omits, but never fabricates. The ATS score comes out of a deterministic function: re-scoring always yields the same number.",
    pipelineLabel: "POST /api/generate",
    pipelineCode: `reserveCredit       atomic findOneAndUpdate { credits: { $gte: 1 } } → 402
analyzeJob          Structured Outputs
adaptCVAndLetter    Structured Outputs
scoreATS            deterministic matching, must=2 / nice=1
catch → refundCredit + alert     never paid for nothing`,
  },
  {
    id: "studylumina",
    number: "02",
    name: "StudyLumina",
    kind: "product",
    status: "live",
    domainLabel: "EDUCATION · RAG",
    period: "2026",
    domain: "app.studylumina.com",
    url: "https://app.studylumina.com",
    screenshotAlt: "StudyLumina screenshot: readiness per chapter",
    pitch: "Tells a student whether they are ready for their exam, chapter by chapter.",
    flow: ["course PDF", "hybrid RAG", "quizzes & flashcards", "readiness score"],
    stats: [
      { value: "62k", label: "TS LINES" },
      { value: "78", label: "API ROUTES" },
      { value: "75", label: "TEST FILES", accent: true },
    ],
    tags: ["Next.js", "PostgreSQL + pgvector", "Prisma", "BullMQ + Redis", "Stripe", "next-intl"],
    problem: "A summary does not tell a student whether they are ready. Neither does a global average.",
    decision:
      "The score is a pure function of ~850 lines, with no LLM. It makes itself refutable: the gap with real grades is shown.",
    pipelineLabel: "INGESTION · 6 BULLMQ QUEUES",
    pipelineCode: `upload → ingestion    PDF extraction
       → embeddings   chunking, pgvector
       → course-map   chunks ↔ chapters
       → summary | flashcards | quiz   (in parallel)

RAG: pgvector + BM25 fused · citations → document + page`,
  },
  {
    id: "sanade",
    number: "03",
    name: "Sanade",
    kind: "product",
    status: "live",
    domainLabel: "PRODUCTIVITY · WEB + MOBILE",
    period: "2025-2026",
    domain: "sanade.app",
    url: "https://sanade.app",
    screenshotAlt: "Sanade screenshot: today's arbitration",
    pitch: "Turns a scattered day into two or three goals you can actually hold.",
    flow: ["free note FR / darija", "validated extraction", "consistency scores", "today's priority"],
    stats: [
      { value: "1,020", label: "TESTS", accent: true },
      { value: "94%", label: "DOMAIN COVERAGE" },
      { value: "2", label: "APPS, ONE CORE" },
    ],
    tags: ["Next.js 16", "Expo", "tRPC", "Prisma", "PostgreSQL", "Turborepo"],
    problem:
      "Trackers show the gap between plan and reality for months, without ever doing anything about it.",
    decision:
      "Facts versus projections: every stored computation is disposable and recomputable. An architecture test forbids a fact from depending on a projection.",
    pipelineLabel: "AN EXTRACTION NEVER CREATES DATA",
    pipelineCode: `raw text (FR / darija / Arabic)
  → RawNote              stored verbatim
  → LLM + strict Zod schema
  → review screen        item-by-item approval
  → Trackable or LogEntry`,
  },
  {
    id: "job-radar",
    number: "04",
    name: "Job Radar",
    kind: "lab",
    status: "internal",
    domainLabel: "MONITORING · REAL TIME",
    period: "2026",
    pitch: "Sees an internship posting minutes after it goes up, not days.",
    flow: ["4,899 career sites", "requisition diff", "LLM-free score", "notification"],
    specs: [
      { key: "registry", value: "4,899 validated sources" },
      { key: "postings", value: "1,133,000+ covered" },
      { key: "ATS", value: "Workday · Greenhouse · Lever · Oracle · +20" },
      { key: "lead", value: "2 h to 72 h ahead of LinkedIn" },
    ],
    stats: [
      { value: "4,899", label: "SOURCES" },
      { value: "1.1 M", label: "POSTINGS COVERED" },
      { value: "429", label: "TESTS", accent: true },
    ],
    tags: ["Node.js", "Browser extension", "Playwright", "Deterministic scoring"],
    problem:
      "A posting takes 2 to 72 hours to reach LinkedIn, while most hiring is decided in the first few days.",
    decision:
      "Query the endpoint the career page itself calls, and diff on requisition IDs, never on content. The registry was mined from 37,000 real URLs, then every source validated live.",
    pipelineLabel: "ONE PASS",
    pipelineCode: `fetch           ~1 req/s per domain
pre-score       title + location, deterministic
diff            on requisition IDs
enrichment      only if the score can clear the threshold
notification    individual, or digest`,
  },
  {
    id: "ratchet",
    number: "05",
    name: "Ratchet",
    kind: "lab",
    status: "open",
    domainLabel: "CRYPTOGRAPHY · E2EE",
    period: "2026",
    repo: "https://github.com/Houssam2510/e2ee-messenger-protocol",
    pitch: "An end-to-end encrypted messenger where even a compromised server reads nothing.",
    flow: ["X3DH", "Double Ratchet", "blind relay", "decrypted on device"],
    specs: [
      { key: "server", value: "only ever sees opaque bytes" },
      { key: "key", value: "one message, then destroyed" },
      { key: "calls", value: "WebRTC, encrypted signaling" },
      { key: "crypto", value: "audited WebCrypto, nothing home-made" },
    ],
    stats: [
      { value: "91", label: "TESTS", accent: true },
      { value: "6", label: "SECURITY INVARIANTS" },
      { value: "0", label: "READABLE BYTES SERVER-SIDE" },
    ],
    tags: ["Strict TypeScript", "React 19", "WebCrypto", "Supabase", "WebRTC", "PWA"],
    problem: "Most \"encrypted chats\" wrap the message in AES and stop there.",
    decision:
      "Implement Signal's actual protocol, with audited primitives only, and document what it does not protect (metadata, a compromised device).",
    pipelineLabel: "INVARIANTS ENFORCED BY TESTS",
    pipelineCode: `private key     never leaves the device
GCM nonce       never reused with the same key
header          authenticated as AAD
backup          ratchet state excluded by construction`,
  },
  {
    id: "cspm-lite",
    number: "06",
    name: "CSPM-Lite",
    kind: "lab",
    status: "internal",
    domainLabel: "CLOUD SECURITY · CLI",
    period: "2025",
    pitch: "Scans an AWS account and blocks the deployment when a critical flaw shows up.",
    flow: ["AWS account", "CIS checks", "JSON + HTML report", "CI gate"],
    specs: [
      { key: "detects", value: "public S3 · open SSH · no MFA" },
      { key: "standard", value: "CIS Benchmark" },
      { key: "outputs", value: "JSON (machine) + HTML (human)" },
      { key: "in CI", value: "critical flaw → build blocked" },
    ],
    stats: [
      { value: "CIS", label: "BENCHMARK" },
      { value: "2", label: "REPORT FORMATS" },
      { value: "CI", label: "ACTIVE BLOCKING", accent: true },
    ],
    tags: ["Python", "boto3", "CIS Benchmark", "GitHub Actions"],
    problem:
      "A cloud misconfiguration does not show up in code review. It shows up in production, or in a leak.",
    decision: "Nobody reads a report: the check becomes a gate that stops the pipeline.",
    pipelineLabel: "$ cspm-lite scan --account prod --gate",
    pipelineCode: `scan → detection → CIS compliance → prioritisation
     → JSON + HTML reports
     → critical flaw → exit 1`,
  },
];
