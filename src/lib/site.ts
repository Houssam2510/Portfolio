/**
 * URL publique du site, utilisée pour les métadonnées (canonique, OpenGraph,
 * sitemap, robots). NEXT_PUBLIC_SITE_URL permet de la surcharger pour un
 * environnement de préproduction ou un déploiement de test.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://houssam-nadir.me"
).replace(/\/$/, "");
