/**
 * URL publique du site, utilisée pour les métadonnées (canonique, OpenGraph,
 * sitemap, robots). Définis NEXT_PUBLIC_SITE_URL dans l'environnement de
 * déploiement ; la valeur par défaut ne sert qu'au développement local.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");
