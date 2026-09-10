"use client";

import { useEffect } from "react";

/**
 * Scroll-reveal engine, ported from the design prototype.
 *
 * Invariant: content is never left hidden without an observer having proven
 * it can deliver, and an unconditional 2.2s net reveals everything regardless
 * so a missed intersection callback can never leave a section blank.
 */
export default function RevealEngine() {
  useEffect(() => {
    const fillBars = () =>
      document.querySelectorAll<HTMLElement>("[data-bar]").forEach((bar) => {
        bar.style.width = bar.getAttribute("data-bar") + "%";
      });

    const showAll = () => {
      document.querySelectorAll("[data-reveal]").forEach((el) => el.setAttribute("data-shown", ""));
      fillBars();
    };

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      showAll();
      return;
    }

    let delivered = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (!delivered) {
          delivered = true;
          document.querySelectorAll("[data-reveal]").forEach((el) => {
            if (!el.hasAttribute("data-shown")) el.setAttribute("data-reveal-armed", "");
          });
        }
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.setAttribute("data-reveal-armed", "");
          e.target.setAttribute("data-shown", "");
          if (e.target.id === "s04") fillBars();
          io.unobserve(e.target);
        });
      },
      { threshold: 0, rootMargin: "0px 0px -4% 0px" }
    );

    const rescan = () =>
      document.querySelectorAll("[data-reveal]:not([data-shown])").forEach((el) => io.observe(el));
    rescan();

    const sweep = () => {
      document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-shown])").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.98) {
          el.setAttribute("data-shown", "");
          io.unobserve(el);
        }
      });
      if (!document.querySelector("[data-reveal]:not([data-shown])")) fillBars();
    };

    let raf: number | null = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        sweep();
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const t1 = setTimeout(sweep, 400);
    const t2 = setTimeout(sweep, 1000);
    const t3 = setTimeout(showAll, 2200); // filet inconditionnel, jamais annulable

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      io.disconnect();
    };
  }, []);

  return null;
}
