"use client";

import { createContext, useContext } from "react";
import type { Content } from "@/data/types";
import type { Locale } from "./config";

type Value = { content: Content; locale: Locale };

const ContentContext = createContext<Value | null>(null);

export function ContentProvider({ value, children }: { value: Value; children: React.ReactNode }) {
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

/** Contenu de la langue courante. Lève si un composant sort de l'arbre du provider. */
export function useContent(): Value {
  const v = useContext(ContentContext);
  if (!v) throw new Error("useContent doit être utilisé à l'intérieur de <ContentProvider>");
  return v;
}

/** Remplit un gabarit du dictionnaire, ex. "OUVRIR {domain} ↗". */
export function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => values[k] ?? `{${k}}`);
}
