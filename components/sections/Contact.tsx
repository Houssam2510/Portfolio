"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { profile } from "@/content/profile";
import { SectionHead } from "@/components/ui/primitives";

export function Contact() {
  const t = useTranslations("contact");
  const s = useTranslations("sections");
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(profile.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2400);
  };

  return (
    <section className="relative py-28 lg:py-36" aria-labelledby="contact-label">
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
        <SectionHead index="05" label={s("contact")} id="contact-label" />

        <p className="mt-10 text-lg text-dim">{t("lead")}</p>

        <div className="mt-5 flex flex-wrap items-baseline gap-x-8 gap-y-4">
          <a
            href={`mailto:${profile.email}`}
            className="font-display text-[clamp(1.4rem,5vw,3.4rem)] leading-none font-medium tracking-[-0.03em] break-all text-flux"
          >
            {profile.email}
          </a>
          <button
            type="button"
            onClick={copy}
            className="lab border border-edge px-3.5 py-2.5 text-ice transition-colors hover:border-flux hover:text-flux"
          >
            {copied ? t("copied") : t("copy")}
          </button>
        </div>

        <div className="mt-16 border-t border-edge/40 pt-7">
          <span className="lab">{t("elsewhere")}</span>
          <ul className="lab mt-5 flex flex-wrap gap-x-10 gap-y-3 normal-case tracking-normal">
            {profile.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="link-scan" target="_blank" rel="noreferrer noopener">
                  {link.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
