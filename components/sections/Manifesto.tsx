import { getTranslations } from "next-intl/server";

import { profile } from "@/content/profile";
import type { Locale } from "@/content/types";
import { SectionHead } from "@/components/ui/primitives";

export async function Manifesto({ locale }: { locale: Locale }) {
  const t = await getTranslations("sections");

  return (
    <section id="manifeste" className="relative py-28 lg:py-40" aria-labelledby="manifeste-label">
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
        <SectionHead index="01" label={t("manifesto")} id="manifeste-label" />
        <div className="mt-14 flex max-w-[52rem] flex-col gap-9">
          {profile.manifesto.map((paragraph, i) => (
            <p
              key={i}
              className="reveal text-[clamp(1.2rem,2.4vw,1.85rem)] leading-[1.38]"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              {paragraph[locale]}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
