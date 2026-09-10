"use client";

import { useContent } from "@/i18n/ContentProvider";
import { useTyping } from "@/hooks/useTyping";

export default function Hero() {
  const { content } = useContent();
  const typed = useTyping(content.typingLines);

  return (
    <section
      id="accueil"
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "clamp(36px,7vh,132px) clamp(20px,4vw,56px) clamp(56px,8vh,104px)",
        minHeight: "min(82vh, 720px)",
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
          <span>{content.ui.availability}</span>
          <span className="hero-rule" style={{ width: 40, height: 1, background: "var(--line2)" }} />
          <span>{content.ui.location}</span>
          <span className="hero-rule" style={{ width: 40, height: 1, background: "var(--line2)" }} />
          <span>{content.ui.graduation}</span>
        </div>

        {/* Un seul h1 pour la page : les deux lignes du nom sont des blocs internes,
            pour garder le rendu du design sans casser la hiérarchie de titres. */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(46px,9vw,132px)",
            lineHeight: 0.9,
            letterSpacing: "-0.045em",
            margin: "0 0 30px",
          }}
        >
          <span style={{ display: "block", marginBottom: 2 }}>Houssam</span>
          <span
            style={{
              display: "block",
              color: "transparent",
              WebkitTextStroke: "1.7px var(--acc)",
            }}
          >
            Nadir
            <span style={{ WebkitTextStroke: 0, color: "var(--acc)" }}>.</span>
          </span>
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
          <span style={{ color: "var(--acc)" }} aria-hidden="true">
            &gt;
          </span>
          {/* Le texte animé est décoratif pour les lecteurs d'écran : ils reçoivent
              la liste complète et stable plutôt qu'une chaîne tronquée en cours de frappe. */}
          <span className="sr-only">{content.typingLines.join(". ")}</span>
          <span aria-hidden="true">{typed}</span>
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
          {content.hero.lede}
        </p>

        <div
          data-hero-block="1"
          style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 60, justifyContent: "center" }}
        >
          <a
            href="#travaux"
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
            {content.hero.ctaCases} <span style={{ color: "var(--on-acc)", fontFamily: "var(--font-mono)" }}>→</span>
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
            {content.hero.ctaLinkedin}
          </a>
          <a
            href="#contact"
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
            {content.hero.ctaContact}
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
          {content.heroStats.map((stat) => (
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
