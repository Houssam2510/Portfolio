"use client";

import Link from "next/link";
import { useContent } from "@/i18n/ContentProvider";
import { locales } from "@/i18n/config";
import { Theme } from "@/hooks/useTheme";

export default function Header({ theme, toggleTheme }: { theme: Theme; toggleTheme: () => void }) {
  const { content, locale } = useContent();
  const other = locales.find((l) => l !== locale)!;
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "var(--bg-88)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div
        className="header-inner"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "18px clamp(20px,4vw,56px)",
          display: "flex",
          alignItems: "center",
          gap: "clamp(16px,3vw,44px)",
        }}
      >
        <a
          href="#accueil"
          data-jump="1"
          style={{ display: "flex", alignItems: "center", gap: 11, marginRight: "auto", color: "var(--ink)" }}
        >
          <span
            style={{
              width: 32,
              height: 32,
              border: "1.5px solid var(--acc)",
              borderRadius: 9,
              display: "grid",
              placeItems: "center",
              fontFamily: "var(--font-mono)",
              fontSize: 11.5,
              color: "var(--acc)",
              flexShrink: 0,
            }}
          >
            HN
          </span>
          <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.25 }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 600, letterSpacing: "-0.015em" }}>
              Houssam Nadir
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, letterSpacing: "0.09em", color: "var(--dim)" }}>
              {content.ui.tagline}
            </span>
          </span>
        </a>

        <nav
          data-topnav="1"
          style={{ display: "flex", alignItems: "center", gap: "clamp(14px,2vw,30px)", flexWrap: "wrap" }}
        >
          {content.navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              data-jump="1"
              data-nav={link.id}
              className="nav-link"
              style={{
                color: "var(--muted)",
                fontSize: 13.5,
                letterSpacing: "-0.005em",
                padding: "6px 0",
                borderBottom: "1px solid transparent",
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Un vrai lien vers l'autre langue : indexable, partageable, et
              fonctionnel sans JavaScript. */}
          <Link
            href={`/${other}`}
            hrefLang={other}
            title={content.ui.switchLanguage}
            aria-label={content.ui.switchLanguage}
            className="chrome-btn"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.06em",
              padding: "8px 11px",
              border: "1px solid var(--line2)",
              borderRadius: 8,
              color: "var(--dim)",
              textTransform: "uppercase",
            }}
          >
            {other}
          </Link>
          <button
            type="button"
            onClick={toggleTheme}
            title={content.ui.toggleTheme}
            aria-label={content.ui.toggleTheme}
            className="chrome-btn"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.06em",
              width: 34,
              height: 34,
              display: "grid",
              placeItems: "center",
              border: "1px solid var(--line2)",
              borderRadius: 8,
              background: "transparent",
              color: "var(--dim)",
              cursor: "pointer",
            }}
          >
            <span>{theme === "dark" ? "☾" : "☀"}</span>
          </button>
          <button
            type="button"
            title={`${content.ui.search} (⌘K)`}
            aria-label={content.ui.openPalette}
            className="chrome-btn palette-btn"
            onClick={() => window.dispatchEvent(new CustomEvent("pf:open-palette"))}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.06em",
              padding: "8px 11px",
              border: "1px solid var(--line2)",
              borderRadius: 8,
              background: "transparent",
              color: "var(--dim)",
              cursor: "pointer",
            }}
          >
            ⌘K
          </button>
          <a
            href="#contact"
            data-jump="1"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11.5,
              letterSpacing: "0.05em",
              padding: "10px 18px",
              borderRadius: 8,
              background: "var(--ink)",
              color: "var(--bg)",
              fontWeight: 500,
              whiteSpace: "nowrap",
            }}
          >
            {content.ui.contact}
          </a>
        </div>
      </div>
    </header>
  );
}
