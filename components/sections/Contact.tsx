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
    <section className="relative py-32 lg:py-44" aria-labelledby="contact-label">
      <div className="mx-auto max-w-[80rem] px-6 sm:px-10">
        <SectionHead label={s("contact")} id="contact-label" />

        <div className="mt-14 flex flex-wrap items-baseline gap-x-8 gap-y-4">
          <a
            href={`mailto:${profile.email}`}
            className="link font-display text-[clamp(1.5rem,4.4vw,3rem)] leading-none font-light tracking-[-0.02em] break-all"
          >
            {profile.email}
          </a>
          <button
            type="button"
            onClick={copy}
            className="label text-muted transition-colors hover:text-accent"
          >
            {copied ? t("copied") : t("copy")}
          </button>
        </div>

        <ul className="mt-14 flex flex-wrap gap-x-10 gap-y-3 text-[0.95rem]">
          {profile.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="link text-muted"
                target="_blank"
                rel="noreferrer noopener"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
