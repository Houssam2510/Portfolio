import { RefObject } from "react";

export default function BackgroundLayer({ spotRef }: { spotRef: RefObject<HTMLDivElement | null> }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      <canvas
        data-bg="flow"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block", opacity: 0 }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 74% 14%, transparent 0%, var(--bg) 100%)",
          opacity: 0.55,
        }}
      />
      <div
        ref={spotRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 560,
          height: 560,
          margin: "-280px 0 0 -280px",
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--acc-glow) 0%, transparent 66%)",
          willChange: "transform",
        }}
      />
    </div>
  );
}
