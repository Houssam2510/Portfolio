"use client";

import { RefObject, useEffect } from "react";

const SECTION_IDS = ["accueil", "approche", "travaux", "chiffres", "capacites", "parcours", "contact"];

declare global {
  interface Window {
    __pfBg?: { mouse?: { x: number; y: number } };
  }
}

/**
 * Chrome global au scroll : largeur de la barre de progression, surlignage de
 * la section active, horloge locale et halo qui suit la souris.
 *
 * Les lectures de mise en page (getBoundingClientRect) et les écritures de
 * style sont regroupées dans une frame d'animation : le scroll et le
 * déplacement de souris ne déclenchent qu'un seul recalcul par frame au lieu
 * d'un par évènement.
 */
export function useScrollChrome(
  progressRef: RefObject<HTMLDivElement | null>,
  spotRef: RefObject<HTMLDivElement | null>,
  clockRef: RefObject<HTMLSpanElement | null>
) {
  useEffect(() => {
    const tick = () => {
      const el = clockRef.current;
      if (!el) return;
      const d = new Date();
      const p = (n: number) => String(n).padStart(2, "0");
      el.textContent = `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
    };
    tick();
    const clockTimer = setInterval(tick, 1000);

    // Résolus une fois : les sections et les liens de nav sont statiques.
    const sections = SECTION_IDS.map((id) => document.getElementById(id));
    const navLinks = Array.from(
      document.querySelectorAll<HTMLElement>("header [data-nav]")
    );

    const updateChrome = () => {
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      const pct = Math.min(100, Math.max(0, (window.scrollY / max) * 100));
      if (progressRef.current) progressRef.current.style.width = pct + "%";

      let active = 0;
      sections.forEach((s, i) => {
        if (s && s.getBoundingClientRect().top <= window.innerHeight * 0.4) active = i;
      });
      const activeId = sections[active]?.id;
      navLinks.forEach((a) => {
        if (a.getAttribute("data-nav") === activeId) a.setAttribute("data-active", "");
        else a.removeAttribute("data-active");
      });
    };

    // Une seule frame en vol à la fois, partagée par le scroll et la souris.
    let raf: number | null = null;
    let pendingMouse: { x: number; y: number } | null = null;

    const flush = () => {
      raf = null;
      if (pendingMouse) {
        const { x, y } = pendingMouse;
        pendingMouse = null;
        if (spotRef.current) {
          spotRef.current.style.transform = `translate3d(${x}px,${y}px,0)`;
        }
        const m = (window.__pfBg = window.__pfBg || {});
        m.mouse = m.mouse || { x: 0, y: 0 };
        m.mouse.x = (x / Math.max(1, window.innerWidth) - 0.5) * 0.6;
        m.mouse.y = (y / Math.max(1, window.innerHeight) - 0.5) * 0.6;
      }
      updateChrome();
    };

    const schedule = () => {
      if (raf === null) raf = requestAnimationFrame(flush);
    };

    const onMouseMove = (e: MouseEvent) => {
      pendingMouse = { x: e.clientX, y: e.clientY };
      schedule();
    };

    updateChrome();

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      clearInterval(clockTimer);
      if (raf !== null) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [progressRef, spotRef, clockRef]);
}
