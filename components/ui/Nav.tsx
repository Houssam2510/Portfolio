import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { profile } from "@/content/profile";
import type { Locale } from "@/content/types";

export async function Nav({ locale }: { locale: Locale }) {
  const t = await getTranslations("nav");
  const other: Locale = locale === "fr" ? "en" : "fr";

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <nav
        className="mx-auto flex max-w-[80rem] items-baseline justify-between gap-8 px-6 py-6 sm:px-10"
        aria-label={t("home")}
      >
        <Link href="/" className="label text-paper">
          {profile.name}
        </Link>

        <ul className="label flex items-baseline gap-6 sm:gap-8">
          <li>
            <a href="#produits" className="transition-colors hover:text-paper">
              {t("products")}
            </a>
          </li>
          <li className="hidden sm:block">
            <a href="#parcours" className="transition-colors hover:text-paper">
              {t("path")}
            </a>
          </li>
          <li>
            <Link href="/cv" className="transition-colors hover:text-paper">
              {t("cv")}
            </Link>
          </li>
          <li>
            <Link href="/" locale={other} className="text-muted transition-colors hover:text-paper">
              {t("switchLang")}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
