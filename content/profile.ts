import type { L } from "./types";

export type ProfileSchema = {
  readonly name: string;
  readonly thesis: L;
  readonly thesisShort: L;
  readonly role: L;
  readonly school: L;
  readonly graduation: L;
  readonly city: L;
  readonly email: string;
  /** Le téléphone est sur le CV papier, pas sur une page publique indexée. */
  readonly links: readonly { readonly label: string; readonly href: string }[];
  readonly manifesto: readonly L[];
};

export const profile: ProfileSchema = {
  name: "Houssam Nadir",

  /* La thèse. Trois projets, un seul geste : regarder dans un système qu'on ne
     voit pas, et rendre un verdict vérifiable. Toute la direction en découle. */
  thesis: {
    fr: "Je construis des scanners.",
    en: "I build scanners.",
  },
  thesisShort: {
    fr: "Ils regardent dans ce qu'on ne voit pas, et rendent un verdict vérifiable.",
    en: "They look into what you can't see, and return a verdict you can check.",
  },
  role: { fr: "Génie informatique", en: "Computer Engineering" },
  school: { fr: "Polytechnique Montréal", en: "Polytechnique Montréal" },
  graduation: { fr: "Diplomation décembre 2027", en: "Graduating December 2027" },
  city: { fr: "Montréal, Québec", en: "Montréal, Québec" },

  email: "houssam.nadir@outlook.com",
  links: [
    { label: "carriv.com", href: "https://carriv.com" },
    { label: "studylumina.com", href: "https://studylumina.com" },
    // TODO — URL exacte du LinkedIn et du GitHub : voir content/TODO.md
  ],

  manifesto: [
    {
      fr: "Un filtre ATS, ta propre préparation à un examen, un compte AWS : trois systèmes dont tu subis le verdict sans jamais voir l'intérieur.",
      en: "An ATS filter, your own exam readiness, an AWS account: three systems whose verdict you live with without ever seeing inside.",
    },
    {
      fr: "J'écris des outils qui entrent dedans et ressortent avec un relevé : un score ATS et la liste des mots-clés manquants, un Exam Readiness Score calculé sur des quiz réellement faits, un rapport de posture cloud classé par criticité.",
      en: "I write tools that go in and come back with a reading: an ATS score and the list of missing keywords, an Exam Readiness Score computed from quizzes actually taken, a cloud posture report ranked by severity.",
    },
    {
      fr: "Les trois s'interdisent la même chose : inventer. Carriv ne peut rien ajouter que ton profil ne contienne déjà. StudyLumina refuse que son score sorte d'un modèle de langage — il est calculé en code, donc explicable ligne par ligne. CSPM-Lite ne signale que ce qu'il a réellement trouvé dans le compte.",
      en: "All three refuse the same thing: making things up. Carriv can't add anything your profile doesn't already hold. StudyLumina refuses to let a language model produce its score — it's computed in code, so it can be explained line by line. CSPM-Lite only reports what it actually found in the account.",
    },
    {
      fr: "Un scanner qui exagère ne sert à rien. C'est vrai d'un rapport de sécurité, c'est vrai d'un CV, et c'est vrai de ce site.",
      en: "A scanner that exaggerates is useless. That's true of a security report, true of a résumé, and true of this site.",
    },
  ],
};
