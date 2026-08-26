import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { projects } from "@/content/projects";

const base = "https://houssamnadir.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/cv", ...projects.map((p) => `/projets/${p.slug}`)];

  return routing.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${base}/${locale}${path}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${base}/${l}${path}`]),
        ),
      },
    })),
  );
}
