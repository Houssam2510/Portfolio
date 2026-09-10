"use client";

import { heroStats, typingLines } from "@/data/content";
import { useTyping } from "@/hooks/useTyping";

export default function Hero() {
  const typed = useTyping(typingLines);

  return (
    <section
      id="s00"
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "clamp(76px,12vh,132px) clamp(20px,4vw,56px) 104px",
        minHeight: "82vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <canvas
        data-bg="hero"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block", zIndex: 0 }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background:
            "radial-gradient(ellipse at 50% 48%, var(--bg-88) 0%, var(--bg-55) 30%, transparent 66%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "30%",
          zIndex: 0,
          background: "linear-gradient(to bottom, transparent, var(--bg))",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1280,
          margin: "0 auto",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div
          data-hero-block="1"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.1em",
            color: "var(--muted)",
            marginBottom: 34,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "var(--ok)",
              animation: "cnPulse 2.4s ease-in-out infinite",
            }}
          />
          <span>DISPONIBLE — STAGE 2027</span>
          <span style={{ width: 40, height: 1, background: "var(--line2)" }} />
          <span>MONTRÉAL · UTC−5</span>
          <span style={{ width: 40, height: 1, background: "var(--line2)" }} />
          <span>B.ING · DÉC. 2027</span>
        </div>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(46px,9vw,132px)",
            lineHeight: 0.9,
            letterSpacing: "-0.045em",
            margin: "0 0 2px",
          }}
        >
          Houssam
        </h1>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(46px,9vw,132px)",
            lineHeight: 0.9,
            letterSpacing: "-0.045em",
            margin: "0 0 30px",
            color: "transparent",
            WebkitTextStroke: "1.7px var(--acc)",
          }}
        >
          Nadir
          <span style={{ WebkitTextStroke: 0, color: "var(--acc)" }}>.</span>
        </h1>

        <div
          data-hero-block="1"
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 14,
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(13px,1.6vw,17px)",
            color: "var(--ink2)",
            marginBottom: 30,
            minHeight: "1.6em",
          }}
        >
          <span style={{ color: "var(--acc)" }}>&gt;</span>
          <span>{typed}</span>
          <span
            style={{
              width: 9,
              height: "1.05em",
              background: "var(--acc)",
              animation: "cnBlink 1.1s step-end infinite",
            }}
          />
        </div>

        <p
          style={{
            fontSize: "clamp(15px,1.5vw,18px)",
            lineHeight: 1.65,
            color: "var(--muted)",
            maxWidth: "60ch",
            margin: "0 0 42px",
            textWrap: "pretty",
          }}
        >
          Étudiant en génie informatique à Polytechnique Montréal. J&rsquo;expédie des produits complets, seul
          — pipelines LLM à sorties structurées, scoring déterministe, comptabilité transactionnelle sans
          course, sécurité cloud. Trois plateformes en production, de la landing bilingue au webhook de
          paiement signé.
        </p>

        <div
          data-hero-block="1"
          style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 60, justifyContent: "center" }}
        >
          <a
            href="#s02"
            data-jump="1"
            className="cta-primary"
            style={{
              color: "var(--on-acc)",
              background: "var(--acc)",
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "15px 26px",
              borderRadius: 9,
              fontWeight: 600,
              fontSize: 14.5,
            }}
          >
            Voir les études de cas <span style={{ color: "var(--on-acc)", fontFamily: "var(--font-mono)" }}>→</span>
          </a>
          <a
            href="https://www.linkedin.com/in/houssam-nadir-a1a292263/"
            target="_blank"
            rel="noopener"
            className="cta-secondary"
            style={{
              color: "var(--ink)",
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "15px 26px",
              borderRadius: 9,
              border: "1px solid var(--line2)",
              fontWeight: 500,
              fontSize: 14.5,
            }}
          >
            LinkedIn ↗
          </a>
          <a
            href="#s06"
            data-jump="1"
            className="cta-secondary"
            style={{
              color: "var(--ink)",
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "15px 26px",
              borderRadius: 9,
              border: "1px solid var(--line2)",
              fontWeight: 500,
              fontSize: 14.5,
            }}
          >
            Me contacter
          </a>
        </div>

        <div
          data-hero-block="1"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
            gap: 1,
            width: "100%",
            maxWidth: 940,
            background: "var(--line)",
            border: "1px solid var(--line)",
            borderRadius: 14,
            overflow: "hidden",
          }}
        >
          {heroStats.map((stat) => (
            <div key={stat.label} className="stat-cell" style={{ background: "var(--surf)", padding: "20px 22px", transition: "background .3s ease" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 27, fontWeight: 600, letterSpacing: "-0.02em" }}>
                {stat.value.includes("+") ? (
                  <>
                    {stat.value.replace("+", "")}
                    <span style={{ color: "var(--acc)" }}>+</span>
                  </>
                ) : (
                  stat.value
                )}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.08em",
                  color: "var(--dim)",
                  marginTop: 6,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
