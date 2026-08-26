import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import "../globals.css";
import { display, body, mono } from "../fonts";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/content/types";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { Nav } from "@/components/ui/Nav";
import { Scroller } from "@/components/Scroller";
import { FieldLayer } from "@/components/three/FieldLayer";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL("https://houssamnadir.com"),
    title: t("homeTitle"),
    description: t("homeDescription"),
    alternates: {
      canonical: `/${locale}`,
      languages: { fr: "/fr", en: "/en" },
    },
    openGraph: {
      title: t("homeTitle"),
      description: t("homeDescription"),
      locale: locale === "fr" ? "fr_CA" : "en_CA",
      type: "profile",
    },
  };
}

export default async function LocaleLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "nav" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role[locale as Locale],
    alumniOf: { "@type": "CollegeOrUniversity", name: profile.school[locale as Locale] },
    address: { "@type": "PostalAddress", addressLocality: "Montréal", addressRegion: "QC" },
    sameAs: [...projects.map((p) => p.url), ...profile.links.map((l) => l.href)].filter(
      (v, i, a) => a.indexOf(v) === i,
    ),
  };

  return (
    <html lang={locale} className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="antialiased">
        <NextIntlClientProvider>
          <a
            href="#contenu"
            className="lab sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:border focus:border-flux focus:bg-void focus:px-3 focus:py-2"
          >
            {t("skipToContent")}
          </a>
          <FieldLayer />
          <Nav locale={locale as Locale} />
          <main id="contenu" className="relative z-10">{props.children}</main>
          <footer className="relative z-10 border-t border-edge/40">
            <div className="lab mx-auto flex max-w-[86rem] flex-wrap items-center justify-between gap-4 px-5 py-9 sm:px-8">
              <span>
                {profile.name} — {profile.city[locale as Locale]}
              </span>
              <span>{profile.graduation[locale as Locale]}</span>
            </div>
          </footer>
          <Scroller />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
