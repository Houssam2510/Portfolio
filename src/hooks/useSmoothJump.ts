"use client";

import { useEffect } from "react";

/** Défilement doux vers la cible d'une ancre interne (`data-jump`), décalé sous l'en-tête collant. */
export function useSmoothJump() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest<HTMLAnchorElement>("[data-jump]");
      if (!target) return;
      const id = (target.getAttribute("href") || "").slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      // La hauteur de l'en-tête collant varie beaucoup entre mobile et bureau :
      // un décalage codé en dur laissait le titre de section caché dessous.
      const header = document.querySelector("header");
      const offset = (header?.getBoundingClientRect().height ?? 70) + 14;
      window.scrollTo({
        top: Math.max(0, el.getBoundingClientRect().top + window.scrollY - offset),
        behavior: "smooth",
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
}
