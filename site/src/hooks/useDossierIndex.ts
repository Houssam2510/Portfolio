"use client";

import { useEffect } from "react";

/** Highlights the case-study index card matching the dossier currently in view. */
export function useDossierIndex() {
  useEffect(() => {
    const links = Array.from(document.querySelectorAll<HTMLElement>("[data-dossier-link]"));
    const arts = Array.from(document.querySelectorAll<HTMLElement>("[data-dossier]"));
    if (!links.length || !arts.length) return;

    const paint = () => {
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
    paint();
    window.addEventListener("scroll", paint, { passive: true });
    window.addEventListener("resize", paint);
    return () => {
      window.removeEventListener("scroll", paint);
      window.removeEventListener("resize", paint);
    };
  }, []);
}

/** Smooth-scrolls any in-page anchor (`data-jump`) to its target, offset for the sticky header. */
export function useSmoothJump() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest<HTMLAnchorElement>("[data-jump]");
      if (!target) return;
      const id = (target.getAttribute("href") || "").slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      const offset = target.closest("[data-dossier-link]") ? 104 : 70;
      window.scrollTo({
        top: Math.max(0, el.getBoundingClientRect().top + window.scrollY - offset),
        behavior: "smooth",
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
}
