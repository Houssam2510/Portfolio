import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n/config";

/**
 * La racine ne sert aucune page : chaque langue vit sous son propre préfixe
 * (/fr, /en) pour avoir une URL partageable et un hreflang propre. On y
 * redirige selon l'en-tête Accept-Language du visiteur, avec le français par
 * défaut.
 */
function negotiate(header: string | null) {
  if (!header) return defaultLocale;
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { tag: tag.toLowerCase(), q: q ? parseFloat(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    const base = tag.split("-")[0];
    const hit = locales.find((l) => l === base);
    if (hit) return hit;
  }
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return NextResponse.next();

  const locale = negotiate(request.headers.get("accept-language"));
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Laisse passer les fichiers servis par Next et les routes de métadonnées.
  matcher: ["/((?!_next|favicon.ico|icon.svg|robots.txt|sitemap.xml|.*\\..*).*)"],
};
