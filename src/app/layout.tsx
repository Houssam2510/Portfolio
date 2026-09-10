import type { Metadata, Viewport } from "next";
import { Space_Grotesk, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import { contact } from "@/data/content";
import { siteUrl } from "@/lib/site";
import "./globals.css";

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

const title = "Houssam Nadir · Génie informatique, Polytechnique Montréal";
const description =
  "Étudiant en génie informatique à Polytechnique Montréal. Cloud, cybersécurité et développement. Trois produits en production, seul : Carriv, StudyLumina, Sanade.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "Portfolio Houssam Nadir",
  authors: [{ name: "Houssam Nadir" }],
  creator: "Houssam Nadir",
  keywords: [
    "Houssam Nadir",
    "génie informatique",
    "Polytechnique Montréal",
    "stage 2027",
    "cloud",
    "cybersécurité",
    "Next.js",
    "Carriv",
    "StudyLumina",
    "Sanade",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_CA",
    url: siteUrl,
    siteName: "Houssam Nadir",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F9F7F4" },
    { media: "(prefers-color-scheme: dark)", color: "#0F0C08" },
  ],
};

/**
 * Applique le thème enregistré avant le premier rendu.
 * Sans ce script bloquant, un visiteur en thème clair voit un flash sombre le
 * temps que React monte et lise localStorage.
 */
const themeScript = `(function(){try{var t=localStorage.getItem("pf-theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}document.documentElement.setAttribute("data-theme",t)}catch(e){document.documentElement.setAttribute("data-theme","dark")}})()`;

/**
 * Données structurées Person : donnent aux moteurs de recherche (et aux outils
 * de recrutement qui les lisent) le nom, la formation, les compétences et les
 * projets sous forme exploitable, au lieu de les laisser deviner depuis le HTML.
 */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Houssam Nadir",
  jobTitle: "Étudiant en génie informatique",
  description,
  url: siteUrl,
  email: `mailto:${contact.email}`,
  telephone: contact.phone,
  sameAs: [contact.linkedin],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Montréal",
    addressRegion: "QC",
    addressCountry: "CA",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Polytechnique Montréal",
  },
  knowsLanguage: ["fr", "en"],
  knowsAbout: [
    "Génie informatique",
    "Infonuagique",
    "Cybersécurité",
    "Next.js",
    "TypeScript",
    "AWS",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
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
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
