import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { profile } from "@/content/profile";
import type { Locale } from "@/content/types";
import { ScanReadout } from "./ScanReadout";

export async function Nav({ locale }: { locale: Locale }) {
  const t = await getTranslations("nav");
  const other: Locale = locale === "fr" ? "en" : "fr";

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-edge/50 bg-void/70 backdrop-blur-md">
      <nav
        className="mx-auto flex max-w-[86rem] items-center justify-between gap-6 px-5 py-3.5 sm:px-8"
        aria-label={t("home")}
      >
        <Link href="/" className="lab text-ice">
          {profile.name}
        </Link>

        <div className="hidden md:block">
          <ScanReadout locale={locale} label={t("scan")} />
        </div>

        <div className="flex items-center gap-6">
          <ul className="lab flex items-center gap-5 sm:gap-6">
            <li>
              <a href="#produits" className="hover:text-ice">
                {t("products")}
              </a>
            </li>
            <li className="hidden sm:block">
              <a href="#parcours" className="hover:text-ice">
                {t("path")}
              </a>
            </li>
            <li>
              <Link href="/cv" className="hover:text-ice">
                {t("cv")}
              </Link>
            </li>
          </ul>
          <Link href="/" locale={other} className="lab border border-edge px-2.5 py-1.5 text-ice">
            {t("switchLang")}
          </Link>
        </div>
      </nav>
    </header>
  );
}
