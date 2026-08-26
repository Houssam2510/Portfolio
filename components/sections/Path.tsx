import { getTranslations } from "next-intl/server";

import { timeline } from "@/content/timeline";
import type { Locale } from "@/content/types";
import { SectionHead } from "@/components/ui/primitives";

export async function Path({ locale }: { locale: Locale }) {
  const t = await getTranslations("sections");
  const k = await getTranslations("kind");

  return (
    <section id="parcours" className="relative py-32 lg:py-44" aria-labelledby="parcours-label">
      <div className="mx-auto max-w-[80rem] px-6 sm:px-10">
        <SectionHead label={t("path")} id="parcours-label" />

        <ol className="mt-16">
          {timeline.map((entry, i) => (
            <li
              key={entry.id}
              className="reveal grid gap-4 border-t border-line-soft py-10 first:border-t-0 first:pt-0 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-12"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="flex flex-col gap-1.5">
                {entry.when && (
                  <span className="text-[0.9rem] tabular-nums text-muted">{entry.when[locale]}</span>
                )}
                <span className="label">{k(entry.kind)}</span>
              </div>
              <div className="max-w-[46rem]">
                <h3 className="text-[clamp(1.25rem,2.1vw,1.6rem)] leading-[1.25] font-light">
                  {entry.title[locale]}
                </h3>
                <p className="mt-3 leading-[1.75] text-muted">{entry.detail[locale]}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
