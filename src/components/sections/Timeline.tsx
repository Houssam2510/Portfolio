import SectionHeading from "@/components/SectionHeading";
import { timeline } from "@/data/content";

export default function Timeline() {
  return (
    <section
      id="s05"
      data-reveal="1"
      style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(20px,4vw,56px) 128px" }}
    >
      <SectionHeading eyebrow="05 · GLISSER →" title="Parcours" />
      <div
        data-stagger="1"
        data-reveal="1"
        tabIndex={0}
        role="group"
        aria-label="Parcours, faire défiler horizontalement"
        style={{
          display: "grid",
          gridAutoFlow: "column",
          gridAutoColumns: "minmax(272px,1fr)",
          gap: 16,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          paddingBottom: 14,
        }}
      >
        {timeline.map((entry) => (
          <article
            key={entry.title}
            data-lift="1"
            style={{
              scrollSnapAlign: "start",
              border: "1px solid var(--line)",
              borderTop: `2px solid ${entry.dateAccent ? "var(--acc)" : "var(--line2)"}`,
              borderRadius: "0 0 12px 12px",
              padding: "26px 22px",
              background: "var(--surf)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10.5,
                letterSpacing: "0.08em",
                color: entry.dateAccent ? "var(--acc)" : "var(--dim)",
                marginBottom: 14,
              }}
            >
              {entry.date}
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 600, margin: "0 0 6px", letterSpacing: "-0.01em" }}>
              {entry.title}
            </h3>
            {entry.org && <div style={{ fontSize: 13.5, color: "var(--muted)", marginBottom: 12 }}>{entry.org}</div>}
            {entry.body && (
              <p style={{ fontSize: 13.5, lineHeight: 1.65, color: "var(--muted)", margin: entry.lines ? "0 0 14px" : 0 }}>
                {entry.body}
              </p>
            )}
            {entry.lines && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: entry.body ? 8 : 10,
                  fontFamily: "var(--font-mono)",
                  fontSize: entry.body ? 11 : 11.5,
                  color: entry.body ? "var(--muted)" : "var(--text)",
                  borderTop: entry.body ? "1px solid var(--line)" : undefined,
                  paddingTop: entry.body ? 14 : undefined,
                }}
              >
                {entry.lines.map((line) => {
                  const at = line.indexOf(" : ");
                  const label = at === -1 ? line : line.slice(0, at);
                  const value = at === -1 ? null : line.slice(at + 3);
                  return (
                    <span key={line}>
                      {value ? (
                        <>
                          {label} : <strong style={{ color: "var(--ink)" }}>{value}</strong>
                        </>
                      ) : (
                        line
                      )}
                    </span>
                  );
                })}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
