import { getTranslations } from "next-intl/server";

import { projects } from "@/content/projects";
import type { Locale } from "@/content/types";
import { Link } from "@/i18n/navigation";
import { Figure, SectionHead, StatusMark } from "@/components/ui/primitives";
import { ProductPreview } from "@/components/ui/ProductPreview";

export async function Products({ locale }: { locale: Locale }) {
  const t = await getTranslations("products");
  const s = await getTranslations("sections");
  const st = await getTranslations("status");

  return (
    <section id="produits" className="relative py-32 lg:py-44" aria-labelledby="produits-label">
      <div className="mx-auto max-w-[80rem] px-6 sm:px-10">
        <SectionHead label={s("products")} id="produits-label" />

        <div className="mt-20 flex flex-col gap-28 lg:gap-40">
          {projects.map((project) => (
            <article key={project.slug} className="reveal">
              <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-20">
                <div>
                  <StatusMark label={st(project.status)} status={project.status} />

                  <h3 className="mt-5 text-[clamp(2.2rem,4.6vw,3.6rem)] leading-[1.02] font-light tracking-[-0.025em]">
                    {project.name}
                  </h3>

                  <p className="lede mt-5 max-w-[34ch]">{project.promise[locale]}</p>

                  {/* Ce que fait l'outil, en deux lignes. Pas de cadre, pas de
                      cellules : deux phrases suffisent. */}
                  <dl className="mt-10 flex flex-col gap-4">
                    <div className="flex gap-6">
                      <dt className="label w-32 shrink-0 pt-1 sm:w-40">{t("scans")}</dt>
                      <dd className="text-[0.98rem] leading-snug">{project.scans[locale]}</dd>
                    </div>
                    <div className="flex gap-6">
                      <dt className="label w-32 shrink-0 pt-1 sm:w-40">{t("returns")}</dt>
                      <dd className="text-[0.98rem] leading-snug">{project.returns[locale]}</dd>
                    </div>
                  </dl>

                  <p className="mt-10 max-w-[46ch] leading-[1.75] text-muted">
                    {project.problem[locale]}
                  </p>

                  <p className="mt-8 text-[0.85rem] text-faint">{project.stack.join(", ")}</p>

                  <div className="mt-10 flex flex-wrap gap-x-14 gap-y-8">
                    {project.measures.slice(0, 3).map((m) => (
                      <Figure key={m.value + m.label.fr} item={m} locale={locale} />
                    ))}
                  </div>

                  <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-3 text-[0.95rem]">
                    <Link href={`/projets/${project.slug}`} className="link">
                      {t("open")}
                    </Link>
                    {project.url && (
                      <a
                        href={project.url}
                        className="link text-muted"
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {project.url.replace("https://", "")}
                      </a>
                    )}
                  </div>
                </div>

                <div className="lg:pt-14">
                  <ProductPreview
                    project={project}
                    reconstructionNote={t("reconstructionNote")}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
