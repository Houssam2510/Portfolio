"use client";

import CaseStudyCard from "@/components/CaseStudyCard";
import SectionHeading from "@/components/SectionHeading";
import { caseStudies } from "@/data/content";
import { useDossierIndex } from "@/hooks/useDossierIndex";

export default function CaseStudies() {
  useDossierIndex();

  return (
    <section id="s02" data-band="1" data-reveal="1" style={{ marginBottom: 128 }}>
      <div className="band-inner">
        <SectionHeading eyebrow="02 — QUATRE DOSSIERS, RIEN DE CACHÉ" title="Études de cas" />

        <div
          data-stagger="1"
          data-reveal="1"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(196px,1fr))",
            gap: 12,
            marginBottom: 76,
          }}
        >
          {caseStudies.map((cs) => (
            <a
              key={cs.id}
              href={`#${cs.id}`}
              data-dossier-link={cs.id}
              data-jump="1"
              className="dossier-link"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 7,
                padding: "16px 18px",
                border: "1px solid var(--line)",
                borderRadius: 12,
                background: "var(--surf)",
                color: "var(--ink)",
                transition: "border-color .2s ease, transform .2s ease",
              }}
            >
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em", color: "var(--acc)" }}>
                {cs.number}
              </span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 600, letterSpacing: "-0.015em" }}>
                {cs.name}
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, letterSpacing: "0.07em", color: "var(--dim)", lineHeight: 1.5 }}>
                {cs.navLabel}
              </span>
            </a>
          ))}
        </div>

        {caseStudies.map((cs) => (
          <CaseStudyCard key={cs.id} cs={cs} />
        ))}
      </div>
    </section>
  );
}
