"use client";

import SectionHeading from "@/components/SectionHeading";
import Rich from "@/components/Rich";
import { useContent } from "@/i18n/ContentProvider";

export default function Thesis() {
  const { content } = useContent();
  const th = content.sections.thesis;
  return (
    <section
      id="approche"
      data-reveal="1"
      style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(20px,4vw,56px) 128px" }}
    >
      <SectionHeading eyebrow={th.eyebrow} title={th.title} />
      <p
        style={{
          fontSize: "clamp(18px,2.1vw,25px)",
          lineHeight: 1.45,
          letterSpacing: "-0.02em",
          color: "var(--ink2)",
          margin: "0 auto 52px",
          maxWidth: "46ch",
          textAlign: "center",
          textWrap: "balance",
        }}
      >
        Trois principes, tenus dans les trois produits. Ce ne sont pas des slogans : chacun est vérifié par du
        code.
      </p>

      <div
        data-stagger="1"
        data-reveal="1"
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(292px,1fr))", gap: 16 }}
      >
        {content.thesisPrinciples.map((p) => (
          <div
            key={p.numeral}
            data-lift="1"
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              padding: "36px 30px 30px",
              border: "1px solid var(--line)",
              borderRadius: 18,
              background: "var(--surf)",
              overflow: "hidden",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                top: -6,
                right: 16,
                fontFamily: "var(--font-display)",
                fontSize: 104,
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: "-0.04em",
                color: "transparent",
                WebkitTextStroke: "1.4px var(--line)",
                pointerEvents: "none",
                userSelect: "none",
              }}
            >
              {p.numeral}
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.14em",
                color: "var(--acc)",
                marginBottom: 22,
              }}
            >
              <span style={{ width: 20, height: 2, background: "var(--acc)", borderRadius: 2 }} />
              {p.label}
            </span>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 20,
                fontWeight: 600,
                letterSpacing: "-0.02em",
                margin: "0 0 14px",
                lineHeight: 1.22,
                maxWidth: "22ch",
                position: "relative",
              }}
            >
              {p.title}
            </h3>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--muted)", margin: "0 0 24px" }}>{p.body}</p>
            <div
              style={{
                marginTop: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 11,
                paddingTop: 20,
                borderTop: "1px solid var(--line)",
              }}
            >
              {p.proofs.map((proof) => (
                <span
                  key={proof.label}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 11,
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    lineHeight: 1.5,
                  }}
                >
                  <span style={{ color: "var(--acc)", flexShrink: 0 }}>✓</span>
                  <span style={{ color: "var(--text)", minWidth: 88, flexShrink: 0 }}>{proof.label}</span>
                  <span style={{ color: "var(--dim)" }}>{proof.detail}</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div
        data-stagger="1"
        data-reveal="1"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          gap: 16,
          marginTop: 16,
        }}
      >
        {content.thesisNotes.map((note) => (
          <div
            key={note.title}
            style={{ padding: "28px 30px", border: "1px solid var(--line)", borderRadius: 18, background: "var(--bg2)" }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.12em",
                color: "var(--dim)",
                marginBottom: 14,
              }}
            >
              {note.title}
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--muted)", margin: 0 }}>
              <Rich parts={note.body} />
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
