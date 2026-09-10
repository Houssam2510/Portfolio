"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useContent } from "@/i18n/ContentProvider";

export default function CommandPalette() {
  const { content } = useContent();
  const paletteItems = content.paletteItems;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return paletteItems;
    return paletteItems.filter(
      (i) => i.label.toLowerCase().includes(q) || i.hint.toLowerCase().includes(q) || i.index.includes(q)
    );
  }, [query, paletteItems]);

  const close = useCallback(() => setOpen(false), []);

  const go = useCallback((id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (!open) {
      // Rend le focus à l'élément qui a ouvert la palette.
      restoreFocusRef.current?.focus();
      restoreFocusRef.current = null;
      return;
    }
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    // Réinitialisation de l'état local de la modale à l'ouverture.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuery("");
    setCursor(0);
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    // Ramène le curseur dans les bornes de la liste filtrée.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCursor((c) => Math.min(c, Math.max(0, visible.length - 1)));
  }, [visible]);

  // Le gestionnaire de touches lit l'état via des refs : il n'est enregistré
  // qu'une fois, au lieu d'être réattaché à chaque frappe.
  const stateRef = useRef({ open, visible, cursor });
  useEffect(() => {
    stateRef.current = { open, visible, cursor };
  }, [open, visible, cursor]);

  useEffect(() => {
    const openPalette = () => setOpen(true);
    window.addEventListener("pf:open-palette", openPalette);

    const onKeydown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      const s = stateRef.current;
      if (!s.open) return;
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setCursor((c) => Math.min(c + 1, s.visible.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setCursor((c) => Math.max(c - 1, 0));
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const v = s.visible[s.cursor];
        if (v) go(v.id);
      }
    };
    window.addEventListener("keydown", onKeydown);
    return () => {
      window.removeEventListener("pf:open-palette", openPalette);
      window.removeEventListener("keydown", onKeydown);
    };
  }, [go]);

  return (
    <div
      // Fermée, la palette sort de l'arbre d'accessibilité et du parcours de
      // tabulation : sans cela son champ et ses options restent lisibles par
      // les lecteurs d'écran alors qu'elles sont invisibles.
      aria-hidden={!open}
      inert={!open}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 80,
        background: "var(--scrim)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "14vh",
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
        transition: "opacity .18s ease",
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={content.ui.paletteLabel}
        style={{
          width: "min(560px,92vw)",
          border: "1px solid var(--line2)",
          borderRadius: 14,
          background: "var(--surf)",
          overflow: "hidden",
          boxShadow: "0 24px 60px var(--sh1)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "16px 18px",
            borderBottom: "1px solid var(--line)",
          }}
        >
          <span aria-hidden="true" style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--acc)" }}>
            &gt;
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={content.ui.paletteLabel.toLowerCase() + "…"}
            aria-label={content.ui.paletteFilter}
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "var(--ink)",
              fontFamily: "var(--font-mono)",
              fontSize: 13.5,
            }}
          />
          <span
            aria-hidden="true"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.07em",
              color: "var(--dim)",
              border: "1px solid var(--line2)",
              borderRadius: 5,
              padding: "4px 7px",
            }}
          >
            {content.ui.paletteEscape}
          </span>
        </div>
        <div style={{ padding: 8, display: "flex", flexDirection: "column", gap: 2 }}>
          {visible.map((item, i) => (
            <button
              key={item.id}
              type="button"
              className="pal-item"
              onClick={() => go(item.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                textAlign: "left",
                padding: "12px 14px",
                border: "none",
                borderRadius: 9,
                background: i === cursor ? "var(--soft)" : "transparent",
                color: "var(--ink2)",
                fontFamily: "var(--font-mono)",
                fontSize: 12.5,
                cursor: "pointer",
              }}
            >
              <span style={{ color: "var(--dim)" }}>{item.index}</span>
              {item.label}
              <span style={{ marginLeft: "auto", color: "var(--dim)" }}>{item.hint}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
