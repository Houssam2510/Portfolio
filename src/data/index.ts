import type { Locale } from "@/i18n/config";
import { en } from "./content.en";
import { fr } from "./content.fr";
import type { Content } from "./types";

const dictionaries: Record<Locale, Content> = { fr, en };

export function getContent(locale: Locale): Content {
  return dictionaries[locale];
}

/** Coordonnées, identiques dans les deux langues. */
export const contact = {
  email: "houssam.nadir@outlook.com",
  linkedin: "https://www.linkedin.com/in/houssam-nadir-a1a292263/",
  github: "https://github.com/Houssam2510",
};

export * from "./types";
