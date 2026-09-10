"use client";

import { useCallback, useEffect, useState } from "react";

export type Theme = "dark" | "light";

const STORAGE_KEY = "pf-theme";

export function useTheme() {
  // Le rendu serveur part de "dark", comme l'attribut par défaut du <html>.
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    // Le script bloquant du layout a déjà posé l'attribut avant le premier
    // paint : on s'aligne dessus plutôt que de relire localStorage, pour que
    // React et le DOM ne puissent pas diverger.
    const applied = document.documentElement.getAttribute("data-theme");
    if (applied === "light" || applied === "dark") {
      // Synchronisation depuis un système externe (le DOM) au montage.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTheme(applied);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Persistance indisponible (navigation privée). Le thème reste
        // appliqué pour la session en cours.
      }
      return next;
    });
  }, []);

  return { theme, toggleTheme };
}
