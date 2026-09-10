"use client";

import { contact } from "@/data";
import { useContent } from "@/i18n/ContentProvider";

export default function Footer() {
  const { content } = useContent();
  return (
    <footer style={{ borderTop: "1px solid var(--line)", background: "var(--bg2)" }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "30px clamp(20px,4vw,56px)",
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          alignItems: "center",
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.06em",
          color: "var(--dim)",
        }}
      >
        <span style={{ marginRight: "auto" }}>{content.ui.footer}</span>
        <a href={contact.github} target="_blank" rel="noopener" className="footer-link" style={{ color: "var(--muted)" }}>
          GITHUB
        </a>
        <a href={contact.linkedin} target="_blank" rel="noopener" className="footer-link" style={{ color: "var(--muted)" }}>
          LINKEDIN
        </a>
        <a href={`mailto:${contact.email}`} className="footer-link" style={{ color: "var(--muted)" }}>
          EMAIL
        </a>
      </div>
    </footer>
  );
}
