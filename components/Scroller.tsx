"use client";

import { useEffect } from "react";
import Lenis from "lenis";

import { scan } from "@/lib/scan";
import { usePrefersReducedMotion } from "@/lib/motion";

/** Les cinq ancres du scan, dans l'ordre où on les traverse. */
const ANCHORS = ["haut", "manifeste", "produits", "parcours", "constellation"];

/**
 * Trois responsabilités, sans dépendance d'animation :
 *   1. le défilement lissé (coupé net si prefers-reduced-motion) ;
 *   2. l'état du scan — progression et position entre les cinq champs ;
 *   3. les révélations, qui se jouent une fois et ne se rejouent jamais.
 */
export function Scroller() {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onPointer = (e: PointerEvent) => {
      scan.px = (e.clientX / window.innerWidth) * 2 - 1;
      scan.py = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => window.removeEventListener("pointermove", onPointer);
  }, []);

  useEffect(() => {
    const measure = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      scan.progress = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;

      /* L'état du champ suit les sections réelles, pas un pourcentage abstrait :
         chaque section a son propre champ, et la transition tient exactement
         entre les deux. */
      const marks = ANCHORS.map((id) => {
        const el = document.getElementById(id);
        return el ? el.offsetTop - window.innerHeight * 0.45 : null;
      }).filter((v): v is number => v !== null);

      if (marks.length < 2) return;
      if (y <= marks[0]) {
        scan.stage = 0;
        return;
      }
      for (let i = 0; i < marks.length - 1; i++) {
        if (y >= marks[i] && y < marks[i + 1]) {
          const span = Math.max(1, marks[i + 1] - marks[i]);
          scan.stage = i + (y - marks[i]) / span;
          return;
        }
      }
      scan.stage = marks.length - 1;
    };

    if (reduced) {
      const onScroll = () => requestAnimationFrame(measure);
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      measure();
      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      };
    }

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      measure();
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reduced]);

  return null;
}
