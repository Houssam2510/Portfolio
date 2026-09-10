"use client";

import { useState } from "react";
import { fill, useContent } from "@/i18n/ContentProvider";
import { screenshotUrl } from "@/lib/screenshot";

/**
 * Aperçu d'un site, capturé à la volée par un service tiers.
 *
 * La capture peut être lente ou échouer (service tiers gratuit). Plutôt que de
 * laisser un cadre vide, on affiche un état de chargement puis, en cas d'échec,
 * un repli lisible qui renvoie vers le site réel.
 */
export default function SiteScreenshot({
  url,
  domain,
  alt,
}: {
  url: string;
  domain: string;
  alt: string;
}) {
  const { content } = useContent();
  const ui = content.ui;
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  return (
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
      {state !== "error" && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={screenshotUrl(url)}
          alt={alt}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => setState("ready")}
          onError={() => setState("error")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            opacity: state === "ready" ? 1 : 0,
            transition: "opacity .4s ease",
          }}
        />
      )}

      {state !== "ready" && (
        <div
          aria-hidden={state === "loading"}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.08em",
            color: "var(--dim)",
            textAlign: "center",
            padding: 20,
          }}
        >
          {state === "loading" ? (
            <>
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "var(--acc)",
                  animation: "cnPulse 1.4s ease-in-out infinite",
                }}
              />
              {ui.screenshotLoading}
            </>
          ) : (
            <>
              <span style={{ color: "var(--muted)" }}>{ui.screenshotFailed}</span>
              <a
                href={url}
                target="_blank"
                rel="noopener"
                className="view-live-btn"
                style={{
                  padding: "9px 16px",
                  borderRadius: 8,
                  border: "1px solid var(--line2)",
                  color: "var(--ink)",
                  letterSpacing: "0.04em",
                }}
              >
                {fill(ui.screenshotOpen, { domain: domain.toUpperCase() })}
              </a>
            </>
          )}
        </div>
      )}
    </div>
  );
}
