import type { CaseStudy } from "./types";

export const casesEn: CaseStudy[] = [
  {
    id: "dossier-01",
    number: "01",
    name: "Carriv",
    navLabel: "RÉSUMÉ TAILORING · LIVE",
    status: "live",
    domain: "carriv.com",
    role: "Design & engineering, solo",
    period: "2026",
    url: "https://carriv.com",
    title: "Carriv: tailoring a résumé to a posting without inventing anything",
    description:
      "Applying properly costs 30 to 45 minutes per posting; asking a chatbot to \"write the résumé\" produces invented experience that collapses in the interview. Carriv adapts a master profile to a given posting under a zero-fabrication rule written into every prompt.",
    screenshotAlt: "Carriv screenshot: tailored résumé and ATS score",
    changeTitle: "WHAT THIS CHANGES FOR THE CANDIDATE",
    changes: [
      "30 to 45 minutes of work per application, down to about thirty seconds.",
      "Nothing invented: everything on the résumé holds up in an interview.",
      "The PDF clears ATS filters instead of being rejected on layout.",
      "The credit is refunded automatically if generation fails. Never paid for nothing.",
    ],
    problem:
      "The model may reorder, select, rephrase and omit, but never fabricate an experience, a date, an employer, a diploma or a number. Translation is the only permitted transformation, with strict fidelity to the degree level.",
    decision:
      "The ATS score is not produced by the model. A real ATS is a keyword-matching engine, not a judge: the LLM extracts and ranks the gaps, the score is a deterministic function. Re-scoring always returns the same number, and applying a rewrite can only add a keyword, so it can never lower the score.",
    pipelineLabel: "POST /api/generate · THE PIPELINE",
    pipelineCode: `resolveApiUser      session or personal token (extension)
enforceRateLimit    30 generations / h / user
getProfile          scoped to userId: never a cross read
reserveCredit       atomic findOneAndUpdate { credits: { $gte: 1 } } → 402
analyzeJob          Structured Outputs · primary model
adaptCVAndLetter    Structured Outputs · primary model
scoreATS            deterministic matching, weighted must=2 / nice=1
createApplication
catch → refundCredit + alert`,
    stats: [
      { value: "~30 s", label: "GENERATION", accent: true },
      { value: "10", label: "PDF TEMPLATES" },
      { value: "30/h", label: "RATE CAP" },
      { value: "2", label: "CURRENCIES" },
    ],
    details: [
      {
        title: "GUARANTEED REFUND",
        body:
          "The OpenAI client is capped at 90 s with a single retry, instead of 10 minutes and 2 retries. On Vercel, a hung request has to fail while the Lambda is still alive, otherwise the catch block that issues the refund never runs and the user pays for a generation they never received.",
      },
      {
        title: "THE ATS WALL",
        body:
          "The application has a deliberate visual identity; the PDFs stay strictly ATS-safe: one column, typography only, no colour and no ornament. That is exactly where most generators fail.",
      },
      {
        title: "PAYMENT SECURITY",
        body:
          "The Stripe amount is never trusted from the client: the credit count comes from a server-side table indexed by Price ID, with a signature-verified webhook. Extension tokens are stored as SHA-256 only. An explicit 30-page cap guards against PDF decompression bombs.",
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
    navLabel: "EXAM READINESS · LIVE",
    status: "live",
    domain: "app.studylumina.com",
    role: "Design & engineering, solo",
    period: "2026",
    url: "https://app.studylumina.com",
    title: "StudyLumina: measuring real readiness for an exam",
    description:
      "AI study tools stop at generating content. StudyLumina measures actual readiness, chapter by chapter, and says what to do today. No grade is ever produced by an LLM.",
    screenshotAlt: "StudyLumina screenshot: readiness by chapter",
    changeTitle: "WHAT THIS CHANGES FOR THE STUDENT",
    changes: [
      "An answer to the only question that matters: am I ready, on which chapter, and what should I do today.",
      "Every answer is cited (document and page), so it can be checked rather than believed.",
      "The score exposes itself to contradiction: the mean error against real grades is displayed.",
      "Drop a PDF and keep working: summary, flashcards and quizzes arrive in the background.",
    ],
    problem:
      "A summary does not tell a student whether they are ready. Without binding a document to a chapter, a quiz answer cannot be attributed to a subject, so nothing can be measured beyond a worthless global average.",
    decision:
      "Course → Chapter → Document is mandatory: an orphan document does not exist. It is the precondition for the entire product. The Exam Readiness Score is a pure function of about 850 lines, with no network and no LLM, and the retention factor is gated: a chapter with no reviewed flashcard scores strictly the same as before, proven by test.",
    pipelineLabel: "ASYNCHRONOUS INGESTION · 6 BULLMQ QUEUES",
    pipelineCode: `upload → ingestion    PDF extraction, page cleanup
       → embeddings   chunking, batching + rate limit, pgvector
       → course-map   binding chunks ↔ chapters
       → summary | flashcards | quiz        (in parallel)

Hybrid RAG: pgvector + BM25 (GIN) fused, filtered by
course/chapter, parameterised SQL. On a follow-up, the
question is condensed into a standalone query before
retrieval. Citations → document + page.`,
    stats: [
      { value: "47,600", label: "TS LINES" },
      { value: "78", label: "API ROUTES" },
      { value: "74", label: "TEST FILES", accent: true },
      { value: "25", label: "PRISMA MODELS" },
    ],
    details: [
      {
        title: "A FALSIFIABLE SCORE",
        body:
          "The student enters their real grade after the exam; the product displays the mean error between predicted score and grade obtained. The real grade is never fed back into the calculation: the score makes itself refutable instead of declaring itself correct.",
      },
      {
        title: "AN HONEST SCORE",
        body:
          "Coverage acts as a confidence multiplier: three correct answers cannot make it read \"Ready\". The overall score is smoothed, so one bad quiz does not collapse everything.",
      },
      {
        title: "DATA MODEL",
        body:
          "A DocumentChapterSpan bridge model with page ranges rather than a foreign key: one PDF often spans several chapters, and one chapter is spread across several PDFs. No scalar metric is stored as raw JSON.",
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
    navLabel: "HABIT ARBITRATION · LIVE",
    status: "live",
    domain: "sanade.app",
    role: "Design & engineering, solo",
    period: "2025-2026",
    url: "https://sanade.app",
    title: "Sanade: the habit tracker that arbitrates instead of recording",
    description:
      "Trackers faithfully display the gap between planned and done, for months, without ever acting on it. Sanade computes the time actually available in a day, proposes two or three achievable goals and sets the rest aside, saying why.",
    screenshotAlt: "Sanade screenshot: today's arbitration",
    changeTitle: "WHAT THIS CHANGES FOR THE USER",
    changes: [
      "Two or three achievable goals for today, instead of a guilt-inducing list of twelve.",
      "Every goal set aside comes with a reason: the user sees why, rather than facing an opaque filter.",
      "Notes can be written in French, transliterated Darija or Arabic: the raw text is kept exactly as entered.",
      "Web and mobile share the same domain core: no divergence in calculation between the two.",
    ],
    problem:
      "A declared capacity is an imagined capacity. And with six domains and time lags, one analysis cycle tests hundreds of pairs: an individual threshold would mechanically guarantee false links on every pass.",
    decision:
      "Facts against projections, visible in the table names: every stored calculation carries the proj_ prefix, so clearProjections() is safe at any moment and a scoring formula can be corrected without leaving an inconsistent history. No fact table points at a projection, and an architecture test verifies it, because the rule was silently broken once already.",
    pipelineLabel: "INGESTION · AN EXTRACTION NEVER CREATES DATA",
    pipelineCode: `raw text (FR / transliterated Darija / Arabic)
  → RawNote                stored as-is, never rewritten
  → versioned prompt + server-side LLM
  → JSON validated by a strict Zod schema
      ├─ failure → one repair, then a logged failure
      └─ success → Extraction { proposals, confidence }
  → review screen           item-by-item confirmation
  → Trackable (PLAN) or LogEntry (CHECKIN)`,
    stats: [
      { value: "62,000", label: "TS LINES" },
      { value: "941", label: "TESTS", accent: true },
      { value: "13,700", label: "PURE DOMAIN" },
      { value: "0", label: "SERVICES REQUIRED" },
    ],
    details: [
      {
        title: "THE KINDNESS IS IN THE FORMULA",
        body:
          "A day left blank drops out of the calculation instead of counting as zero: it lowers the displayed confidence, never the score. Three days without data show \"score 74, low confidence\", not \"score 31\", otherwise the product would punish not opening the app.",
      },
      {
        title: "STATISTICAL RIGOUR",
        body:
          "What is displayed is an empirical conditional frequency: two numbers reproducible by hand. Links are tested per full cycle, the number of tests is counted, and publication is filtered on the false discovery rate. Every pattern freezes its cycle.",
      },
      {
        title: "PURE DOMAIN CORE",
        body:
          "packages/core never imports db, api, ingestion or React: 13,700 lines testable with no database, no network, no API key. The logic cannot diverge between web and mobile: it is a property of the structure, not a discipline.",
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
    navLabel: "CLOUD POSTURE · CLI TOOL",
    status: "internal",
    domain: "",
    role: "Personal tool",
    period: "2025",
    title: "CSPM-Lite: cloud security that blocks the pipeline",
    description:
      "A CLI tool that scans an AWS account, detects misconfigurations, evaluates compliance and produces actionable reports, then refuses to let the deployment through.",
    screenshotAlt: "",
    changeTitle: "WHAT THIS CHANGES FOR THE TEAM",
    changes: [
      "A critical finding stops the deployment: security becomes a gate, not a report.",
      "Two outputs: JSON for the machine, readable HTML for human review.",
      "CIS-aligned checks without a commercial tool licence.",
    ],
    problem:
      "A cloud misconfiguration is invisible in a code review: a public S3 bucket, an open SSH port, a user without MFA. It becomes visible in production, or in a breach.",
    decision:
      "A report is not enough: nobody reads a report. The check becomes blocking: a critical finding stops the CI/CD pipeline, which moves security from the audit to the front door.",
    pipelineLabel: "CHECKS AND OUTPUTS",
    pipelineCode: `scan AWS account
  → detection      public S3 · open SSH · missing MFA
  → compliance     checks aligned to CIS Benchmark
  → prioritisation severity + remediation guidance
  → reports        JSON (machine) + HTML (human)
  → CI/CD gate     critical finding → build blocked`,
    stats: [
      { value: "CIS", label: "BENCHMARK" },
      { value: "2", label: "REPORT FORMATS" },
      { value: "CI", label: "GATE ENFORCED", accent: true },
      { value: "A", label: "CYBERSECURITY COURSE" },
    ],
    details: [
      {
        title: "WHY THIS TOOL",
        body:
          "A cybersecurity course gives you the concepts; a real AWS account gives you the unpleasant surprises. This tool came out of needing to check my own deployments before a grader, or an attacker, did it for me.",
      },
      {
        title: "RELATED LAB WORK",
        body:
          "Network discovery, service enumeration, basic web security and troubleshooting in Linux environments. Advent of Cyber (TryHackMe, Dec. 2025) for structured investigative method.",
      },
    ],
    tags: ["Python", "AWS SDK (boto3)", "CIS Benchmark", "Linux", "GitHub Actions", "JSON / HTML"],
    terminalCommand: "$ cspm-lite scan --account prod --gate",
  },
];
