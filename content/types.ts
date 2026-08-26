/** Toute chaîne visible du site existe dans les deux langues. Pas de fallback silencieux. */
export type L = { readonly fr: string; readonly en: string };
export type Locale = "fr" | "en";

export const t = (value: L, locale: Locale): string => value[locale];

/** Une valeur mesurée. Elle sera rendue avec le filet ambre — jamais autre chose. */
export type Measured = {
  readonly label: L;
  readonly value: string;
  readonly note?: L;
};

export type Status = "production" | "beta" | "prototype" | "coursework" | "tool";
