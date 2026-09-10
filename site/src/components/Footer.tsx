import { contact } from "@/data/content";

export default function Footer() {
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
        <span style={{ marginRight: "auto" }}>© 2026 HOUSSAM NADIR — CONÇU ET CODÉ À MONTRÉAL</span>
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
