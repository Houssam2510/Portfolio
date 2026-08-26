import { getTranslations } from "next-intl/server";

import { profile } from "@/content/profile";
import type { Locale } from "@/content/types";
import { SectionHead } from "@/components/ui/primitives";

export async function Manifesto({ locale }: { locale: Locale }) {
  const t = await getTranslations("sections");

  return (
    <section id="manifeste" className="relative py-32 lg:py-44" aria-labelledby="manifeste-label">
      <div className="mx-auto max-w-[80rem] px-6 sm:px-10">
        <SectionHead label={t("manifesto")} id="manifeste-label" />

        <div className="mt-16 flex max-w-[38rem] flex-col gap-8 lg:ml-[28%]">
          {profile.manifesto.map((paragraph, i) => (
            <p
              key={i}
              className={`reveal ${
                i === 0
                  ? "font-display text-[clamp(1.5rem,2.6vw,2.1rem)] leading-[1.32] font-light"
                  : "text-[1.05rem] leading-[1.75] text-muted"
              }`}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              {paragraph[locale]}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
