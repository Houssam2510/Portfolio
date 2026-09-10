export default function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 13,
        marginBottom: 52,
      }}
    >
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.14em", color: "var(--acc)" }}>
        {eyebrow}
      </span>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(26px,3.4vw,42px)",
          fontWeight: 600,
          letterSpacing: "-0.035em",
          margin: 0,
          maxWidth: "26ch",
          textWrap: "balance",
        }}
      >
        {title}
      </h2>
      <span style={{ width: 52, height: 2, background: "var(--acc)", borderRadius: 2 }} />
    </div>
  );
}
