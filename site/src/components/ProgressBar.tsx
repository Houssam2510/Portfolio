import { RefObject } from "react";

export default function ProgressBar({ progressRef }: { progressRef: RefObject<HTMLDivElement | null> }) {
  return (
    <div
      ref={progressRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: 2,
        width: "0%",
        background: "var(--acc)",
        zIndex: 60,
      }}
    />
  );
}
