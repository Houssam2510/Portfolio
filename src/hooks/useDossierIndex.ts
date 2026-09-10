"use client";

import { useEffect } from "react";

/** Met en évidence la carte d'index correspondant au dossier actuellement à l'écran. */
export function useDossierIndex() {
  useEffect(() => {
    const links = Array.from(document.querySelectorAll<HTMLElement>("[data-dossier-link]"));
    const arts = Array.from(document.querySelectorAll<HTMLElement>("[data-dossier]"));
    if (!links.length || !arts.length) return;

    const paint = () => {
      raf = null;
      let cur: string | null = null;
      arts.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= window.innerHeight * 0.42 && r.bottom > window.innerHeight * 0.24) cur = el.id;
      });
      links.forEach((l) => {
        if (cur && l.getAttribute("data-dossier-link") === cur) l.setAttribute("data-active", "");
        else l.removeAttribute("data-active");
      });
    };

    // Un seul passage de mesure par frame, quel que soit le débit d'évènements.
    let raf: number | null = null;
    const schedule = () => {
      if (raf === null) raf = requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
}

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
