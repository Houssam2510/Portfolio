"use client";

import { RefObject, useEffect } from "react";

const SECTION_IDS = ["s00", "s01", "s02", "s03", "s04", "s05", "s06"];

declare global {
  interface Window {
    __pfBg?: { mouse?: { x: number; y: number } };
  }
}

/**
 * Global scroll chrome: progress bar width, active-section nav highlight,
 * the local clock, and the mouse-follow spotlight glow. Ported from the
 * prototype's single window-level listener set.
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

    const updateChrome = () => {
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      const pct = Math.min(100, Math.max(0, (window.scrollY / max) * 100));
      if (progressRef.current) progressRef.current.style.width = pct + "%";

      const sections = SECTION_IDS.map((id) => document.getElementById(id));
      let active = 0;
      sections.forEach((s, i) => {
        if (s && s.getBoundingClientRect().top <= window.innerHeight * 0.4) active = i;
      });
      const activeId = sections[active]?.id;
      document.querySelectorAll<HTMLElement>("header [data-nav]").forEach((a) => {
        if (a.getAttribute("data-nav") === activeId) a.setAttribute("data-active", "");
        else a.removeAttribute("data-active");
      });
    };
    updateChrome();

    const onMouseMove = (e: MouseEvent) => {
      if (spotRef.current) {
        spotRef.current.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`;
      }
      const m = (window.__pfBg = window.__pfBg || {});
      m.mouse = m.mouse || { x: 0, y: 0 };
      m.mouse.x = (e.clientX / Math.max(1, window.innerWidth) - 0.5) * 0.6;
      m.mouse.y = (e.clientY / Math.max(1, window.innerHeight) - 0.5) * 0.6;
    };

    window.addEventListener("scroll", updateChrome, { passive: true });
    window.addEventListener("resize", updateChrome);
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      clearInterval(clockTimer);
      window.removeEventListener("scroll", updateChrome);
      window.removeEventListener("resize", updateChrome);
      window.removeEventListener("mousemove", onMouseMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
