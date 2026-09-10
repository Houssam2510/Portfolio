import { ImageResponse } from "next/og";
import { contact, getContent } from "@/data";
import { isLocale, locales } from "@/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const size = { width: 1200, height: 630 };

// Palette Ambre CRT, en dur : ImageResponse ne résout pas les variables CSS.
const BG = "#0F0C08";
const SURF = "#191510";
const LINE = "#3A342C";
const INK = "#F7F5F2";
const MUTED = "#B1ADA9";
const ACC = "#FFB225";

/**
 * Le texte alternatif doit suivre la langue de la page. Un `export const alt`
 * est figé au niveau du module ; generateImageMetadata reçoit params et permet
 * donc de le traduire.
 */
export async function generateImageMetadata({
  params,
}: {
  params: { locale: string } | Promise<{ locale: string }>;
}) {
  // Selon le contexte de build, Next passe params directement ou sous forme
  // de promesse : on accepte les deux plutôt que de supposer.
  const resolved = await params;
  const locale = isLocale(resolved?.locale) ? resolved.locale : "fr";
  return [{ id: locale, alt: getContent(locale).meta.ogAlt, size, contentType: "image/png" }];
}

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const c = getContent(isLocale(locale) ? locale : "fr");

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
          <div style={{ letterSpacing: 3 }}>{c.ui.availability}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 108, color: INK, lineHeight: 1.05, letterSpacing: -3 }}>
            Houssam Nadir
          </div>
          <div style={{ fontSize: 34, color: MUTED, marginTop: 18, lineHeight: 1.35 }}>
            {locale === "en"
              ? "Computer engineering · Polytechnique Montréal"
              : "Génie informatique · Polytechnique Montréal"}
          </div>
          <div style={{ fontSize: 30, color: ACC, marginTop: 10 }}>
            {locale === "en" ? "Three products in production, solo." : "Trois produits en production, seul."}
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
