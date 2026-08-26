import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { projects, projectBySlug } from "@/content/projects";
import type { Locale } from "@/content/types";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { SectionHead, StatusBadge, Verdict } from "@/components/ui/primitives";
import { ProductPreview } from "@/components/ui/ProductPreview";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await props.params;
  const project = projectBySlug(slug);
  if (!project) return {};
  const l = locale as Locale;

  return {
    title: `${project.name} — ${project.promise[l]}`,
    description: project.problem[l],
    alternates: { canonical: `/${locale}/projets/${slug}` },
  };
}

export default async function CasePage(props: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await props.params;
  setRequestLocale(locale);
  const l = locale as Locale;

  const project = projectBySlug(slug);
  if (!project) notFound();

  const t = await getTranslations("case");
  const p = await getTranslations("products");
  const st = await getTranslations("status");

  return (
    <article className="pt-24">
      <header className="relative py-16 lg:py-24">
        <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
          <Link href="/" className="lab link-scan">
            ← {t("back")}
          </Link>

          <div className="mt-10 flex flex-wrap items-center gap-5">
            <StatusBadge label={st(project.status)} status={project.status} />
            {project.url && (
              <a href={project.url} className="lab link-scan" target="_blank" rel="noreferrer noopener">
                {project.url.replace("https://", "")} ↗
              </a>
            )}
          </div>

          <h1 className="mt-6 font-display text-[clamp(2.8rem,9vw,6.5rem)] leading-[0.88] font-medium tracking-[-0.035em] uppercase">
            {project.name}
          </h1>

          <dl className="mt-10 grid max-w-[62rem] gap-px border border-edge/50 bg-edge/40 sm:grid-cols-2">
            <div className="bg-void/70 px-5 py-5">
              <dt className="lab">{p("scans")}</dt>
              <dd className="mt-2 text-lg leading-snug">{project.scans[l]}</dd>
            </div>
            <div className="bg-void/70 px-5 py-5">
              <dt className="lab lab-flux">{p("returns")}</dt>
              <dd className="mt-2 text-lg leading-snug text-flux">{project.returns[l]}</dd>
            </div>
          </dl>

          <p className="lab mt-8">
            {project.stack.join("  ·  ")}  ·  {project.role[l]}
          </p>
        </div>
      </header>

      <section className="relative py-14" aria-labelledby="probleme">
        <div className="mx-auto grid max-w-[86rem] items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHead index="01" label={t("problem")} id="probleme" />
            <p className="mt-8 max-w-[46ch] text-[1.2rem] leading-[1.5]">{project.problem[l]}</p>
          </div>
          <ProductPreview
            project={project}
            reconstructionLabel={p("reconstruction")}
            reconstructionNote={p("reconstructionNote")}
          />
        </div>
      </section>

      <section className="relative py-14" aria-labelledby="construit">
        <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
          <SectionHead index="02" label={t("built")} id="construit" />
          <div className="mt-10 grid gap-10 lg:grid-cols-3">
            {project.built.map((item, i) => (
              <p key={i} className="max-w-[44ch] leading-[1.65] text-dim">
                {item[l]}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-14" aria-labelledby="decisions">
        <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
          <SectionHead index="03" label={t("decisions")} id="decisions" />
          <div className="mt-10 flex flex-col gap-12">
            {project.decisions.map((d, i) => (
              <div key={i} className="grid gap-7 border-t border-edge/40 pt-9 lg:grid-cols-[1fr_2fr]">
                <h2 className="max-w-[26ch] font-display text-[1.35rem] leading-tight font-medium tracking-[-0.02em]">
                  {d.question[l]}
                </h2>
                <dl className="grid gap-7 sm:grid-cols-3">
                  <div>
                    <dt className="lab lab-flux">{t("chosen")}</dt>
                    <dd className="mt-3 leading-[1.6]">{d.chosen[l]}</dd>
                  </div>
                  <div>
                    <dt className="lab">{t("rejected")}</dt>
                    <dd className="mt-3 leading-[1.6] text-mute">{d.rejected[l]}</dd>
                  </div>
                  <div>
                    <dt className="lab">{t("why")}</dt>
                    <dd className="mt-3 leading-[1.6] text-dim">{d.why[l]}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-14" aria-labelledby="mesures">
        <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
          <SectionHead index="04" label={t("measures")} id="mesures" />
          <div className="mt-10 flex flex-wrap gap-x-16 gap-y-9">
            {project.measures.map((m) => (
              <Verdict key={m.value + m.label.fr} item={m} locale={l} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-14 pb-28" aria-labelledby="retro">
        <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
          <SectionHead index="05" label={t("retro")} id="retro" />
          {project.retro ? (
            <div className="mt-10 flex max-w-[48rem] flex-col gap-7">
              {project.retro.map((item, i) => (
                <p key={i} className="text-[1.15rem] leading-[1.55]">
                  {item[l]}
                </p>
              ))}
            </div>
          ) : (
            <p className="mt-10 max-w-[48ch] border-l border-alert/70 pl-6 leading-[1.6] text-mute">
              {t("retroPending")}
            </p>
          )}
        </div>
      </section>
    </article>
  );
}
