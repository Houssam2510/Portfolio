import { RefObject } from "react";

export default function StatusBar({ clockRef }: { clockRef: RefObject<HTMLSpanElement | null> }) {
  return (
    <div style={{ borderBottom: "1px solid var(--line)", background: "var(--bg2)" }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "11px clamp(20px,4vw,56px)",
          display: "flex",
          alignItems: "center",
          gap: 20,
          flexWrap: "wrap",
          fontFamily: "var(--font-mono)",
          fontSize: 10.5,
          letterSpacing: "0.09em",
          color: "var(--dim)",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--acc)" }}>
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--ok)",
              animation: "cnPulse 2.4s ease-in-out infinite",
            }}
          />
          TROIS PRODUITS EN PRODUCTION
        </span>
        <span style={{ width: 1, height: 11, background: "var(--line2)" }} />
        <span>CARRIV</span>
        <span>STUDYLUMINA</span>
        <span>SANADE</span>
        <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 14 }}>
          <span ref={clockRef}>--:--:--</span>
          <span>MONTRÉAL · UTC−5</span>
        </span>
      </div>
    </div>
  );
}
