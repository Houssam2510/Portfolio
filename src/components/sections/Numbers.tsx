import SectionHeading from "@/components/SectionHeading";
import { aggregateNumbers } from "@/data/content";

export default function Numbers() {
  return (
    <section
      id="s03"
      data-reveal="1"
      style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(20px,4vw,56px) 128px" }}
    >
      <SectionHeading eyebrow="03 · AGRÉGÉ SUR LES TROIS PLATEFORMES" title="Ce que ça représente" />
      <div
        data-stagger="1"
        data-reveal="1"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(168px,1fr))",
          gap: 1,
          background: "var(--line)",
          border: "1px solid var(--line)",
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        {aggregateNumbers.map((stat) => (
          <div key={stat.label} style={{ background: "var(--surf)", padding: "26px 24px" }}>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 30,
                fontWeight: 600,
                letterSpacing: "-0.025em",
                color: stat.accent ? "var(--acc)" : undefined,
              }}
            >
              {stat.value}
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.08em", color: "var(--dim)", marginTop: 8 }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "var(--muted)", margin: "26px auto 0", maxWidth: "76ch", textAlign: "center" }}>
        Les trois produits partagent la même colonne vertébrale : validation par schéma à toutes les frontières,
        jamais de <span style={{ fontFamily: "var(--font-mono)", color: "var(--ink)" }}>.parse()</span> qui explose,
        clients externes initialisés paresseusement pour qu&rsquo;un build passe sans secret, et un échec bruyant
        préféré à une valeur fabriquée en silence.
      </p>
    </section>
  );
}
