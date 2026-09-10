import { ImageResponse } from "next/og";
import { contact } from "@/data/content";

export const alt =
  "Houssam Nadir, génie informatique à Polytechnique Montréal. Trois produits en production.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Palette Ambre CRT, en dur : ImageResponse ne résout pas les variables CSS.
const BG = "#0F0C08";
const SURF = "#191510";
const LINE = "#3A342C";
const INK = "#F7F5F2";
const MUTED = "#B1ADA9";
const ACC = "#FFB225";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          padding: "64px 72px",
          border: `2px solid ${LINE}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, color: ACC, fontSize: 24 }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: ACC }} />
          <div style={{ letterSpacing: 3 }}>DISPONIBLE · STAGE 2027</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 108, color: INK, lineHeight: 1.05, letterSpacing: -3 }}>
            Houssam Nadir
          </div>
          <div style={{ fontSize: 34, color: MUTED, marginTop: 18, lineHeight: 1.35 }}>
            Génie informatique · Polytechnique Montréal
          </div>
          <div style={{ fontSize: 30, color: ACC, marginTop: 10 }}>
            Trois produits en production, seul.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {["CARRIV", "STUDYLUMINA", "SANADE"].map((p) => (
            <div
              key={p}
              style={{
                display: "flex",
                fontSize: 22,
                letterSpacing: 2,
                color: MUTED,
                background: SURF,
                border: `1px solid ${LINE}`,
                borderRadius: 10,
                padding: "12px 20px",
              }}
            >
              {p}
            </div>
          ))}
          <div style={{ display: "flex", marginLeft: "auto", fontSize: 22, color: MUTED }}>
            {contact.email}
          </div>
        </div>
      </div>
    ),
    size
  );
}
