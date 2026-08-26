import { getTranslations } from "next-intl/server";

import { timeline } from "@/content/timeline";
import type { Locale } from "@/content/types";
import { SectionHead } from "@/components/ui/primitives";

/** §03 — Le champ s'étire en brin chronologique pendant qu'on lit cette liste. */
export async function Path({ locale }: { locale: Locale }) {
  const t = await getTranslations("sections");
  const k = await getTranslations("kind");

  return (
    <section id="parcours" className="relative py-28 lg:py-36" aria-labelledby="parcours-label">
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
        <SectionHead index="03" label={t("path")} id="parcours-label" />

        <ol className="mt-14 max-w-[58rem]">
          {timeline.map((entry, i) => (
            <li
              key={entry.id}
              className="reveal grid grid-cols-[3.5rem_1fr] gap-5 border-t border-edge/40 py-8 first:border-t-0 first:pt-0 sm:grid-cols-[4.5rem_1fr] sm:gap-8"
              style={{ transitionDelay: `${i * 55}ms` }}
            >
              <span className="lab pt-1.5">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className={`lab ${entry.kind === "ship" ? "lab-flux" : ""}`}>
                    {k(entry.kind)}
                  </span>
                  {entry.when && <span className="lab">{entry.when[locale]}</span>}
                </div>
                <h3 className="mt-3 font-display text-[clamp(1.15rem,2.2vw,1.6rem)] leading-tight font-medium tracking-[-0.02em]">
                  {entry.title[locale]}
                </h3>
                <p className="mt-3 max-w-[52ch] leading-[1.6] text-dim">{entry.detail[locale]}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
