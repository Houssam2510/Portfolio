import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="mx-auto flex min-h-[70svh] max-w-[86rem] flex-col justify-center px-5 py-28 sm:px-8">
      <p className="lab lab-flux">{t("code")}</p>
      <h1 className="mt-5 max-w-[18ch] font-display text-[clamp(2.4rem,7vw,4.5rem)] leading-[0.95] font-medium tracking-[-0.03em]">
        {t("title")}
      </h1>
      <p className="mt-7 max-w-[50ch] leading-[1.6] text-dim">{t("body")}</p>
      <ul className="lab mt-10 flex flex-wrap gap-x-8 gap-y-3">
        <li>
          <Link href="/" className="link-scan">
            {t("home")}
          </Link>
        </li>
        <li>
          <Link href="/projets/carriv" className="link-scan">
            {t("carriv")}
          </Link>
        </li>
        <li>
          <Link href="/projets/studylumina" className="link-scan">
            {t("lumina")}
          </Link>
        </li>
      </ul>
    </div>
  );
}
