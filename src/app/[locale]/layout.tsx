import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Space_Grotesk, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import { contact, getContent } from "@/data";
import { isLocale, locales, localeTags, type Locale } from "@/i18n/config";
import { siteUrl } from "@/lib/site";
import "../globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

/** Une page statique par langue, générée au build. */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { meta } = getContent(locale);

  return {
    metadataBase: new URL(siteUrl),
    title: meta.title,
    description: meta.description,
    applicationName: "Portfolio Houssam Nadir",
    authors: [{ name: "Houssam Nadir" }],
    creator: "Houssam Nadir",
    alternates: {
      canonical: `/${locale}`,
      // hreflang : indique aux moteurs que les deux pages sont la même page
      // dans deux langues, plutôt que du contenu dupliqué.
      languages: {
        fr: "/fr",
        en: "/en",
        "x-default": "/fr",
      },
    },
    openGraph: {
      type: "website",
      locale: localeTags[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeTags[l]),
      url: `${siteUrl}/${locale}`,
      siteName: "Houssam Nadir",
      title: meta.title,
      description: meta.description,
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F9F7F4" },
    { media: "(prefers-color-scheme: dark)", color: "#0F0C08" },
  ],
};

/**
 * Applique le thème enregistré avant le premier rendu. Sans ce script
 * bloquant, un visiteur en thème clair voit un flash sombre le temps que
 * React monte et lise localStorage.
 */
const themeScript = `(function(){try{var t=localStorage.getItem("pf-theme");if(t!=="light"&&t!=="dark"){t="dark"}document.documentElement.setAttribute("data-theme",t)}catch(e){document.documentElement.setAttribute("data-theme","dark")}})()`;

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const { meta, ui } = getContent(locale as Locale);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Houssam Nadir",
    jobTitle: locale === "fr" ? "Étudiant en génie informatique" : "Computer engineering student",
    description: meta.description,
    url: `${siteUrl}/${locale}`,
    email: `mailto:${contact.email}`,
    sameAs: [contact.linkedin, contact.github],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Montréal",
      addressRegion: "QC",
      addressCountry: "CA",
    },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Polytechnique Montréal" },
    knowsLanguage: ["fr", "en"],
    knowsAbout: [
      "Computer engineering",
      "Cloud computing",
      "Cybersecurity",
      "Next.js",
      "TypeScript",
      "AWS",
    ],
  };

  return (
    <html
      lang={locale}
      data-theme="dark"
      className={`${spaceGrotesk.variable} ${ibmPlexSans.variable} ${jetBrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        <a href="#contenu" className="skip-link">
          {ui.skipToContent}
        </a>
        {children}
      </body>
    </html>
  );
}
