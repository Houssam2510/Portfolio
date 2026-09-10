export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

export const localeNames: Record<Locale, string> = {
  fr: "Français",
  en: "English",
};

/** Code de langue complet, pour l'attribut lang et les métadonnées OpenGraph. */
export const localeTags: Record<Locale, string> = {
  fr: "fr-CA",
  en: "en-CA",
};

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}
