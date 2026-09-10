"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { paletteItems } from "@/data/content";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return paletteItems;
    return paletteItems.filter(
      (i) => i.label.toLowerCase().includes(q) || i.hint.toLowerCase().includes(q) || i.index.includes(q)
    );
  }, [query]);

  const close = () => setOpen(false);

  const go = (id: string) => {
    close();
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
  };

  useEffect(() => {
    if (open) {
      // Resetting the modal's local UI state on open, not syncing render state.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuery("");
      setCursor(0);
      const t = setTimeout(() => inputRef.current?.focus(), 30);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    // Clamping the cursor to the filtered list's new bounds, not mirroring render state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCursor((c) => Math.min(c, Math.max(0, visible.length - 1)));
  }, [visible]);

  useEffect(() => {
    const openPalette = () => setOpen(true);
    window.addEventListener("pf:open-palette", openPalette);

    const onKeydown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (!open) return;
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setCursor((c) => Math.min(c + 1, visible.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setCursor((c) => Math.max(c - 1, 0));
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const v = visible[cursor];
        if (v) go(v.id);
      }
    };
    window.addEventListener("keydown", onKeydown);
    return () => {
      window.removeEventListener("pf:open-palette", openPalette);
      window.removeEventListener("keydown", onKeydown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, visible, cursor]);

  return (
    <div
      data-open={open ? "" : undefined}
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
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--acc)" }}>&gt;</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="aller à une section…"
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
            ESC
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
