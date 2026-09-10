import { contact } from "@/data/content";

export default function Contact() {
  return (
    <section
      id="s06"
      data-reveal="1"
      style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(20px,4vw,56px) 118px" }}
    >
      <div style={{ border: "1px solid var(--line2)", borderRadius: 18, overflow: "hidden", background: "var(--surf)" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "13px 20px",
            borderBottom: "1px solid var(--line)",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.07em",
            color: "var(--dim)",
          }}
        >
          <span style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--warn)" }} />
          <span style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--acc)" }} />
          <span style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--ok)" }} />
          <span style={{ marginLeft: 10 }}>~/contact</span>
        </div>
        <div style={{ padding: "clamp(36px,5.5vw,72px)", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 12.5, color: "var(--dim)", marginBottom: 22 }}>
            <span style={{ color: "var(--acc)" }}>$</span> ouvrir --canal stage-2027
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px,4.4vw,54px)",
              fontWeight: 600,
              letterSpacing: "-0.035em",
              lineHeight: 1.06,
              margin: "0 auto 22px",
              maxWidth: "26ch",
              textWrap: "balance",
            }}
          >
            Donnez-moi la contrainte, je reviens avec l&rsquo;architecture.
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.65, color: "var(--muted)", maxWidth: "58ch", margin: "0 auto 38px" }}>
            Je cherche un stage où je touche à la production : pipeline, sécurité, données, pas seulement à la
            maquette. Réponse sous 24 h.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 36, justifyContent: "center" }}>
            <a
              href={`mailto:${contact.email}`}
              className="contact-primary"
              style={{
                padding: "15px 26px",
                borderRadius: 9,
                background: "var(--acc)",
                color: "var(--on-acc)",
                fontWeight: 600,
                fontSize: 15,
                fontFamily: "var(--font-mono)",
              }}
            >
              {contact.email}
            </a>
            <a
              href={contact.phoneHref}
              className="contact-secondary"
              style={{
                padding: "15px 26px",
                borderRadius: 9,
                border: "1px solid var(--line2)",
                color: "var(--ink)",
                fontWeight: 500,
                fontSize: 15,
                fontFamily: "var(--font-mono)",
              }}
            >
              {contact.phone}
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener"
              className="contact-secondary"
              style={{
                padding: "15px 26px",
                borderRadius: 9,
                border: "1px solid var(--line2)",
                color: "var(--ink)",
                fontWeight: 500,
                fontSize: 15,
              }}
            >
              LinkedIn ↗
            </a>
          </div>
          <div
            style={{
              display: "flex",
              gap: 26,
              flexWrap: "wrap",
              justifyContent: "center",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.07em",
              color: "var(--dim)",
            }}
          >
            <span>MONTRÉAL, QC</span>
            <span>UTC−5</span>
            <span>FR / EN</span>
            <span>DISPONIBLE 2027</span>
          </div>
        </div>
      </div>
    </section>
  );
}
