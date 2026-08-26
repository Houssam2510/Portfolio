import { getTranslations } from "next-intl/server";

import { projects } from "@/content/projects";
import type { Locale } from "@/content/types";
import { Link } from "@/i18n/navigation";
import { SectionHead, StatusBadge, Verdict } from "@/components/ui/primitives";
import { ProductPreview } from "@/components/ui/ProductPreview";

export async function Products({ locale }: { locale: Locale }) {
  const t = await getTranslations("products");
  const s = await getTranslations("sections");
  const st = await getTranslations("status");

  return (
    <section id="produits" className="relative py-28 lg:py-36" aria-labelledby="produits-label">
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
        <SectionHead index="02" label={s("products")} id="produits-label" />
      </div>

      <div className="mt-16 flex flex-col">
        {projects.map((project, i) => (
          <article
            key={project.slug}
            className="border-t border-edge/40 py-16 first:border-t-0 lg:py-24"
          >
            <div
              className={`mx-auto grid max-w-[86rem] items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-last" : ""
              }`}
            >
              <div className="reveal">
                <StatusBadge label={st(project.status)} status={project.status} />

                <h3 className="mt-5 font-display text-[clamp(2.4rem,6.5vw,4.6rem)] leading-[0.9] font-medium tracking-[-0.035em] uppercase">
                  {project.name}
                </h3>

                {/* Ce que fait un scanner, dit en deux lignes : ce qu'il regarde,
                    ce qu'il rend. C'est la structure commune aux trois. */}
                <dl className="mt-7 grid gap-px border border-edge/50 bg-edge/40 sm:grid-cols-2">
                  <div className="bg-void/70 px-4 py-3.5">
                    <dt className="lab">{t("scans")}</dt>
                    <dd className="mt-1.5 text-[0.95rem] leading-snug">{project.scans[locale]}</dd>
                  </div>
                  <div className="bg-void/70 px-4 py-3.5">
                    <dt className="lab lab-flux">{t("returns")}</dt>
                    <dd className="mt-1.5 text-[0.95rem] leading-snug text-flux">
                      {project.returns[locale]}
                    </dd>
                  </div>
                </dl>

                <p className="mt-7 max-w-[46ch] leading-[1.6] text-dim">{project.problem[locale]}</p>

                <p className="lab mt-6">{project.stack.join("  ·  ")}</p>

                <div className="mt-9 flex flex-wrap gap-x-12 gap-y-7">
                  {project.measures.slice(0, 3).map((m) => (
                    <Verdict key={m.value + m.label.fr} item={m} locale={locale} />
                  ))}
                </div>

                <div className="lab mt-10 flex flex-wrap gap-x-8 gap-y-3">
                  <Link href={`/projets/${project.slug}`} className="link-scan">
                    {t("open")} →
                  </Link>
                  {project.url && (
                    <a
                      href={project.url}
                      className="link-scan"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {project.url.replace("https://", "")} ↗
                    </a>
                  )}
                </div>
              </div>

              <div className="reveal" style={{ transitionDelay: "90ms" }}>
                <ProductPreview
                  project={project}
                  reconstructionLabel={t("reconstruction")}
                  reconstructionNote={t("reconstructionNote")}
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
