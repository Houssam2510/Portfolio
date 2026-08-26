import type { L, Measured, Status } from "./types";

export type Decision = {
  readonly question: L;
  readonly chosen: L;
  readonly rejected: L;
  readonly why: L;
};

export type Project = {
  readonly slug: string;
  readonly name: string;
  readonly status: Status;
  readonly url: string | null;
  /** Ce que le scanner regarde — le système opaque. */
  readonly scans: L;
  /** Ce qu'il rend — le relevé vérifiable. */
  readonly returns: L;
  readonly problem: L;
  readonly promise: L;
  readonly built: readonly L[];
  readonly stack: readonly string[];
  readonly role: L;
  readonly measures: readonly Measured[];
  readonly preview: "carriv" | "lumina" | "cspm";
  /** Dépose une capture réelle dans public/shots/ et mets son chemin ici. */
  readonly shot: string | null;
  readonly decisions: readonly Decision[];
  /** null = pas encore écrit par Houssam. On n'invente pas un échec. */
  readonly retro: readonly L[] | null;
};

export const projects: readonly Project[] = [
  {
    slug: "carriv",
    name: "Carriv",
    status: "production",
    url: "https://carriv.com",
    scans: { fr: "Un CV contre une offre d'emploi", en: "A résumé against a job posting" },
    returns: { fr: "Un score ATS et les mots-clés manquants", en: "An ATS score and the missing keywords" },
    problem: {
      fr: "Un CV générique se fait filtrer par les ATS avant qu'un humain le lise. L'adapter à la main pour chaque offre est intenable — et la plupart des outils qui prétendent le faire inventent des expériences que le candidat n'a pas vécues.",
      en: "A generic résumé gets filtered by ATS before a human reads it. Tailoring it by hand for every posting is unsustainable — and most tools that claim to do it invent experience the candidate never had.",
    },
    promise: {
      fr: "Un CV taillé pour chaque offre, sans rien inventer.",
      en: "A résumé cut to fit each posting, with nothing made up.",
    },
    built: [
      {
        fr: "Tu colles une offre et tu choisis un profil. Le moteur reformule tes vraies expériences pour ce poste précis, rédige la lettre, et retourne un score ATS avec les mots-clés couverts et ceux qui manquent — en une trentaine de secondes.",
        en: "You paste a posting and pick a profile. The engine rewrites your real experience for that specific role, drafts the letter, and returns an ATS score listing covered and missing keywords — in about thirty seconds.",
      },
      {
        fr: "Le moteur ne peut que reformuler ce que le profil contient déjà. Compétence absente ? Il la demande au lieu de la supposer. Chaque changement apparaît dans un reçu de personnalisation.",
        en: "The engine can only rephrase what the profile already holds. Missing a skill? It asks instead of assuming. Every change shows up in a tailoring receipt.",
      },
      {
        fr: "CV une page, une colonne, réellement analysable par un ATS. Suivi de candidatures. Extension Chrome publiée sur le Chrome Web Store. FR et EN.",
        en: "One page, one column, genuinely ATS-parsable. Application tracking. A Chrome extension published on the Chrome Web Store. FR and EN.",
      },
    ],
    stack: ["SvelteKit", "JavaScript", "MongoDB", "Stripe", "Extension Chrome"],
    role: { fr: "Conception, développement, mise en production, support", en: "Design, development, shipping, support" },
    measures: [
      {
        label: { fr: "Candidature générée en", en: "Application generated in" },
        value: "~30 s",
        note: { fr: "CV, lettre et score", en: "résumé, letter and score" },
      },
      {
        label: { fr: "Pack 10 candidatures", en: "10-application pack" },
        value: "6 $ USD",
        note: { fr: "sans abonnement, crédits sans expiration", en: "no subscription, credits never expire" },
      },
      {
        label: { fr: "Essai sans carte", en: "Free trial, no card" },
        value: "3",
        note: { fr: "candidatures offertes", en: "applications included" },
      },
      {
        label: { fr: "Langues", en: "Languages" },
        value: "2",
        note: { fr: "FR et EN dès le premier commit", en: "FR and EN since the first commit" },
      },
    ],
    preview: "carriv",
    shot: null,
    decisions: [
      {
        question: {
          fr: "Que fait le moteur quand une compétence demandée manque au profil ?",
          en: "What does the engine do when a required skill is missing from the profile?",
        },
        chosen: {
          fr: "Il la signale et la demande. Le CV sort avec un trou visible plutôt qu'avec une ligne inventée.",
          en: "It flags it and asks. The résumé ships with a visible gap rather than an invented line.",
        },
        rejected: {
          fr: "Laisser le modèle combler le vide — ce que fait la majorité des outils de la catégorie.",
          en: "Letting the model fill the gap — which is what most tools in the category do.",
        },
        why: {
          fr: "Un CV qui ment est un problème qui explose en entrevue, pas au moment du filtrage.",
          en: "A résumé that lies is a problem that detonates in the interview, not at the filter.",
        },
      },
      {
        question: { fr: "Abonnement mensuel ou paiement à l'usage ?", en: "Monthly subscription or pay-as-you-go?" },
        chosen: {
          fr: "Paiement à l'usage, crédits sans expiration, optimisation du score gratuite.",
          en: "Pay-as-you-go, credits that never expire, free score optimization.",
        },
        rejected: { fr: "L'abonnement mensuel, plus rentable sur le papier.", en: "A monthly subscription, more profitable on paper." },
        why: {
          fr: "Une recherche d'emploi dure six semaines, pas douze mois. Facturer un abonnement à quelqu'un qui cherche un emploi, c'est facturer son anxiété.",
          en: "A job search lasts six weeks, not twelve months. Charging a subscription to someone job-hunting is charging them for their anxiety.",
        },
      },
    ],
    retro: null,
  },
  {
    slug: "studylumina",
    name: "StudyLumina",
    status: "production",
    url: "https://studylumina.com",
    scans: { fr: "Ta préparation réelle à un examen", en: "Your actual readiness for an exam" },
    returns: { fr: "Un score 0–100 ventilé par chapitre", en: "A 0–100 score broken down per chapter" },
    problem: {
      fr: "La veille d'un examen, personne ne sait répondre à « est-ce que je suis prêt ? ». Les outils d'étude génèrent des résumés, des cartes, des quiz — aucun ne dit si tu vas passer.",
      en: "The night before an exam, nobody can answer “am I ready?”. Study tools generate summaries, cards, quizzes — none of them tells you whether you'll pass.",
    },
    promise: { fr: "Sache que tu es prêt. Avant le jour de l'examen.", en: "Know you're ready. Before exam day." },
    built: [
      {
        fr: "Tu déposes tes PDF de cours. Le système les analyse, indexe, détecte les chapitres tout seul, puis génère quiz et flashcards à partir du contenu réel.",
        en: "You upload your course PDFs. The system parses and indexes them, detects chapters on its own, then generates quizzes and flashcards from the real content.",
      },
      {
        fr: "L'Exam Readiness Score est calculé en code à partir de tes tentatives de quiz persistées. Jamais généré par un modèle. Ventilé par chapitre, donc explicable : tu vois d'où vient le chiffre.",
        en: "The Exam Readiness Score is computed in code from your persisted quiz attempts. Never generated by a model. Broken down per chapter, so it's explainable: you can see where the number comes from.",
      },
      {
        fr: "Le tuteur ne répond que depuis tes documents, avec citation. Les chapitres faibles sont classés par impact sur le score, et le plan du jour découle du score et de la date d'examen.",
        en: "The tutor answers only from your documents, with citations. Weak chapters are ranked by impact on the score, and today's plan follows from the score and the exam date.",
      },
    ],
    stack: ["Next.js", "TypeScript", "React", "PostgreSQL", "Prisma", "Docker"],
    role: { fr: "Conception, développement, refonte v2, mise en production", en: "Design, development, v2 rebuild, shipping" },
    measures: [
      {
        label: { fr: "Exam Readiness Score", en: "Exam Readiness Score" },
        value: "0–100",
        note: { fr: "déterministe, calculé en code", en: "deterministic, computed in code" },
      },
      { label: { fr: "Premium", en: "Premium" }, value: "14 $/mois", note: { fr: "gratuit : 3 cours, 10 questions/jour", en: "free tier: 3 courses, 10 questions/day" } },
      { label: { fr: "Version", en: "Version" }, value: "2.1", note: { fr: "en production", en: "in production" } },
      { label: { fr: "Cours couverts", en: "Courses covered" }, value: "50+", note: { fr: "cégep et université, FR et EN", en: "cégep and university, FR and EN" } },
    ],
    preview: "lumina",
    shot: null,
    decisions: [
      {
        question: { fr: "Qui calcule l'Exam Readiness Score ?", en: "Who computes the Exam Readiness Score?" },
        chosen: {
          fr: "Du code, à partir des tentatives de quiz réellement persistées. Le même état d'entrée donne toujours le même score.",
          en: "Code, from quiz attempts actually persisted. The same input state always yields the same score.",
        },
        rejected: {
          fr: "Demander le score au modèle de langage — trois lignes de prompt au lieu d'un module de calcul.",
          en: "Asking the language model for the score — three lines of prompt instead of a scoring module.",
        },
        why: {
          fr: "Un score qui bouge sans que l'étudiant ait rien fait est pire qu'aucun score. Et un score inexplicable ne dit pas quoi réviser ce soir.",
          en: "A score that moves while the student did nothing is worse than no score. And an unexplainable score doesn't tell anyone what to revise tonight.",
        },
      },
      {
        question: { fr: "Sur quoi le tuteur a-t-il le droit de répondre ?", en: "What is the tutor allowed to answer from?" },
        chosen: {
          fr: "Uniquement les documents déposés par l'étudiant, avec la source citée à chaque réponse.",
          en: "Only the documents the student uploaded, with the source cited on every answer.",
        },
        rejected: {
          fr: "Laisser le modèle compléter avec ses connaissances générales quand le document est muet.",
          en: "Letting the model fill in from general knowledge when the document is silent.",
        },
        why: {
          fr: "Un étudiant révise pour l'examen de son professeur, pas pour la moyenne d'Internet.",
          en: "A student is revising for their professor's exam, not for the internet's average.",
        },
      },
    ],
    retro: null,
  },
  {
    slug: "cspm-lite",
    name: "CSPM-Lite",
    status: "tool",
    url: null,
    scans: { fr: "Un compte AWS", en: "An AWS account" },
    returns: { fr: "Des mauvaises configurations classées par criticité", en: "Misconfigurations ranked by severity" },
    problem: {
      fr: "Un compte infonuagique dérive sans bruit : un bucket S3 laissé public, un port SSH ouvert au monde, un utilisateur sans MFA. Rien ne casse — jusqu'au jour où quelque chose casse.",
      en: "A cloud account drifts quietly: an S3 bucket left public, an SSH port open to the world, a user without MFA. Nothing breaks — until something does.",
    },
    promise: {
      fr: "Un scan de posture cloud qui bloque la mise en production quand il trouve une faille critique.",
      en: "A cloud posture scan that blocks the deploy when it finds a critical hole.",
    },
    built: [
      {
        fr: "Un outil en ligne de commande, en Python, qui analyse un compte AWS et détecte les mauvaises configurations : buckets S3 publics, ports SSH ouverts, utilisateurs sans MFA.",
        en: "A Python command-line tool that analyzes an AWS account and detects misconfigurations: public S3 buckets, open SSH ports, users without MFA.",
      },
      {
        fr: "La logique d'évaluation est alignée sur le CIS Benchmark, ce qui donne à chaque constat une criticité comparable au lieu d'une opinion.",
        en: "The evaluation logic is aligned with the CIS Benchmark, which gives every finding a comparable severity instead of an opinion.",
      },
      {
        fr: "Rapports JSON et HTML avec criticité et remédiation, et un contrôle de pipeline CI/CD qui bloque l'intégration dès qu'une faille critique est détectée.",
        en: "JSON and HTML reports with severity and remediation, plus a CI/CD pipeline check that blocks integration as soon as a critical finding appears.",
      },
    ],
    stack: ["Python", "AWS", "CIS Benchmark", "CI/CD"],
    role: { fr: "Conception et développement", en: "Design and development" },
    measures: [
      { label: { fr: "Référentiel", en: "Benchmark" }, value: "CIS", note: { fr: "criticité comparable, pas une opinion", en: "comparable severity, not an opinion" } },
      { label: { fr: "Formats de rapport", en: "Report formats" }, value: "JSON · HTML", note: { fr: "lisible par une machine et par un humain", en: "machine-readable and human-readable" } },
      { label: { fr: "Pipeline", en: "Pipeline" }, value: "bloquant", note: { fr: "une faille critique arrête l'intégration", en: "a critical finding halts integration" } },
    ],
    preview: "cspm",
    shot: null,
    decisions: [
      {
        question: {
          fr: "Que fait l'outil quand il trouve une faille critique dans un pipeline ?",
          en: "What does the tool do when it finds a critical issue in a pipeline?",
        },
        chosen: {
          fr: "Il bloque l'intégration. Le rapport n'est pas un courriel qu'on archive, c'est une porte fermée.",
          en: "It blocks integration. The report isn't an email you archive, it's a closed door.",
        },
        rejected: {
          fr: "Émettre un avertissement et laisser passer — le comportement par défaut de la plupart des scanners.",
          en: "Emitting a warning and letting it through — the default behavior of most scanners.",
        },
        why: {
          fr: "Un avertissement qu'on peut ignorer finit toujours par être ignoré. Une porte fermée force la décision au moment où elle coûte le moins cher.",
          en: "A warning you can ignore always ends up ignored. A closed door forces the decision when it's cheapest to make.",
        },
      },
      {
        question: {
          fr: "Comment classer les constats sans inventer une échelle maison ?",
          en: "How do you rank findings without inventing your own scale?",
        },
        chosen: {
          fr: "S'aligner sur le CIS Benchmark, un référentiel public et vérifiable.",
          en: "Align with the CIS Benchmark, a public and checkable standard.",
        },
        rejected: {
          fr: "Une pondération maison, plus rapide à écrire et impossible à défendre devant quelqu'un.",
          en: "A homemade weighting, faster to write and impossible to defend to anyone.",
        },
        why: {
          fr: "Le même réflexe que pour les deux autres produits : un verdict doit pouvoir être contesté ligne par ligne, sinon il ne vaut rien.",
          en: "Same reflex as the other two products: a verdict has to be contestable line by line, or it's worth nothing.",
        },
      },
    ],
    retro: null,
  },
];

export const projectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);
