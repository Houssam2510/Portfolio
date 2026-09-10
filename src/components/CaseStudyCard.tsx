import { CaseStudy } from "@/data/content";
import { screenshotUrl } from "@/lib/screenshot";

const monoMeta = { fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", color: "var(--dim)" };

export default function CaseStudyCard({ cs }: { cs: CaseStudy }) {
  return (
    <article
      id={cs.id}
      data-dossier={cs.number}
      data-reveal="1"
      data-lift="1"
      style={{
        position: "relative",
        border: "1px solid var(--line)",
        borderTop: "2px solid var(--acc)",
        borderRadius: 20,
        background: "var(--surf)",
        overflow: "hidden",
        marginBottom: cs.number === "04" ? 0 : 40,
        scrollMarginTop: 118,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 6,
          right: 26,
          fontFamily: "var(--font-display)",
          fontSize: "clamp(78px,10vw,146px)",
          fontWeight: 700,
          lineHeight: 0.8,
          letterSpacing: "-0.05em",
          color: "transparent",
          WebkitTextStroke: "1.5px var(--line2)",
          pointerEvents: "none",
          userSelect: "none",
          opacity: 0.55,
          zIndex: 0,
        }}
      >
        {cs.number}
      </span>

      <div style={{ position: "relative", zIndex: 1, padding: "clamp(24px,3vw,40px)" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 22,
            flexWrap: "wrap",
            paddingBottom: 22,
            borderBottom: "1px solid var(--line)",
            marginBottom: 26,
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", color: "var(--acc)" }}>
              CAS {cs.number}
            </span>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(26px,3vw,38px)",
                fontWeight: 600,
                letterSpacing: "-0.035em",
                lineHeight: 1,
              }}
            >
              {cs.name}
            </span>
          </div>
          <div style={{ display: "flex", gap: 26, flexWrap: "wrap", marginLeft: "auto" }}>
            <span style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <span style={monoMeta}>RÔLE</span>
              <span style={{ fontSize: 12.5, color: "var(--muted)" }}>{cs.role}</span>
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <span style={monoMeta}>PÉRIODE</span>
              <span style={{ fontSize: 12.5, color: "var(--muted)" }}>{cs.period}</span>
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <span style={monoMeta}>STATUT</span>
              <span style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12.5, color: "var(--muted)" }}>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: cs.status === "live" ? "var(--ok)" : "var(--line2)",
                  }}
                />
                {cs.status === "live" ? "En production" : "Outil interne"}
              </span>
            </span>
            {cs.url && (
              <a
                href={cs.url}
                target="_blank"
                rel="noopener"
                className="view-live-btn"
                style={{
                  position: "relative",
                  zIndex: 3,
                  alignSelf: "flex-end",
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  letterSpacing: "0.04em",
                  padding: "11px 18px",
                  borderRadius: 8,
                  background: "var(--ink)",
                  color: "var(--on-acc)",
                  whiteSpace: "nowrap",
                }}
              >
                VOIR EN LIGNE ↗
              </a>
            )}
          </div>
        </div>

        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(22px,2.7vw,31px)",
            fontWeight: 600,
            letterSpacing: "-0.025em",
            margin: "0 0 16px",
            lineHeight: 1.14,
          }}
        >
          {cs.title}
        </h3>
        <p style={{ fontSize: 15.5, lineHeight: 1.7, color: "var(--muted)", margin: "0 0 28px", maxWidth: "66ch" }}>
          {cs.description}
        </p>

        {cs.status === "live" ? (
          <figure style={{ margin: "0 0 28px" }}>
            <div
              style={{
                border: "1px solid var(--line2)",
                borderRadius: 14,
                overflow: "hidden",
                background: "var(--surf)",
                boxShadow: "0 18px 44px var(--sh1), 0 2px 6px var(--sh2)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "11px 14px",
                  borderBottom: "1px solid var(--line)",
                  background: "var(--soft)",
                }}
              >
                <span style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                  <span style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--line2)" }} />
                  <span style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--line2)" }} />
                  <span style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--line2)" }} />
                </span>
                <a
                  href={cs.url}
                  target="_blank"
                  rel="noopener"
                  className="browser-url"
                  style={{
                    flex: 1,
                    minWidth: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.02em",
                    color: "var(--muted)",
                    background: "var(--surf)",
                    border: "1px solid var(--line)",
                    borderRadius: 6,
                    padding: "6px 11px",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  <span style={{ color: "var(--ok)", flexShrink: 0 }}>▲</span>
                  {cs.domain}
                </a>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.09em", color: "var(--dim)", flexShrink: 0 }}>
                  LIVE
                </span>
              </div>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16/10",
                  background: "var(--soft)",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={screenshotUrl(cs.url!)}
                  alt={cs.screenshotAlt}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </div>
            </div>
            <figcaption
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9.5,
                letterSpacing: "0.08em",
                color: "var(--dim)",
                marginTop: 10,
                textAlign: "center",
              }}
            >
              APERÇU AUTOMATIQUE DE {cs.domain.toUpperCase()} · CAPTURÉ APRÈS STABILISATION
            </figcaption>
          </figure>
        ) : (
          <div
            style={{
              border: "1px solid var(--line2)",
              borderRadius: 14,
              overflow: "hidden",
              background: "var(--surf)",
              boxShadow: "0 18px 44px var(--sh1), 0 2px 6px var(--sh2)",
              marginBottom: 28,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "11px 14px",
                borderBottom: "1px solid var(--line)",
                background: "var(--soft)",
              }}
            >
              <span style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                <span style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--warn)" }} />
                <span style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--acc)" }} />
                <span style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--ok)" }} />
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.02em", color: "var(--dim)" }}>
                ~/cspm-lite
              </span>
            </div>
            <div style={{ padding: "22px 20px", fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--text)" }}>
              {cs.terminalCommand}
            </div>
          </div>
        )}

        <div
          style={{
            border: "1px solid var(--line)",
            borderRadius: 14,
            borderLeft: "2px solid var(--acc)",
            padding: "26px 28px",
            marginBottom: 28,
            background: "var(--soft)",
          }}
        >
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em", color: "var(--ink)", marginBottom: 18 }}>
            {cs.changeTitle}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(228px,1fr))", gap: "18px 26px" }}>
            {cs.changes.map((change, i) => (
              <div key={i} style={{ display: "flex", gap: 13, alignItems: "flex-start" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--acc)", paddingTop: 3, flexShrink: 0 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--muted)", margin: 0 }}>{change}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20, marginBottom: 28 }}>
          <div style={{ borderLeft: "2px solid var(--acc)", padding: "2px 0 2px 18px" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.09em", color: "var(--acc)", marginBottom: 9 }}>
              LE PROBLÈME
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.65, color: "var(--muted)", margin: 0 }}>{cs.problem}</p>
          </div>
          <div style={{ borderLeft: "2px solid var(--line2)", padding: "2px 0 2px 18px" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.09em", color: "var(--dim)", marginBottom: 9 }}>
              LA DÉCISION CENTRALE
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.65, color: "var(--muted)", margin: 0 }}>{cs.decision}</p>
          </div>
        </div>

        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.09em", color: "var(--dim)", marginBottom: 10 }}>
          {cs.pipelineLabel}
        </div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11.5,
            lineHeight: 1.85,
            color: "var(--text)",
            background: "var(--soft)",
            border: "1px solid var(--line)",
            borderRadius: 10,
            padding: "18px 20px",
            overflowX: "auto",
            whiteSpace: "pre",
            marginBottom: 24,
          }}
        >
          {cs.pipelineCode}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(104px,1fr))",
            gap: 18,
            padding: "22px 0",
            borderTop: "1px solid var(--line)",
            borderBottom: "1px solid var(--line)",
            marginBottom: 24,
          }}
        >
          {cs.stats.map((stat) => (
            <div key={stat.label}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 21,
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  color: stat.accent ? "var(--acc)" : undefined,
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, letterSpacing: "0.07em", color: "var(--dim)", marginTop: 5 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 18, marginBottom: 26 }}>
          {cs.details.map((d) => (
            <div key={d.title}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.08em", color: "var(--dim)", marginBottom: 8 }}>
                {d.title}
              </div>
              <p style={{ fontSize: 13.5, lineHeight: 1.65, color: "var(--muted)", margin: 0 }}>{d.body}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          {cs.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10.5,
                padding: "6px 10px",
                borderRadius: 6,
                border: "1px solid var(--line2)",
                color: "var(--text)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
