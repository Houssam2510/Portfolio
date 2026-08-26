import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { projects, projectBySlug } from "@/content/projects";
import type { Locale } from "@/content/types";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { Figure, SectionHead, StatusMark } from "@/components/ui/primitives";
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
    <article className="mx-auto max-w-[80rem] px-6 pt-36 pb-32 sm:px-10">
      <Link href="/" className="link label text-muted">
        {t("back")}
      </Link>

      <header className="mt-16">
        <StatusMark label={st(project.status)} status={project.status} />

        <h1 className="mt-5 text-[clamp(2.6rem,7vw,5.4rem)] leading-[1] font-light tracking-[-0.03em]">
          {project.name}
        </h1>

        <p className="lede mt-6 max-w-[36ch]">{project.promise[l]}</p>

        <dl className="mt-14 flex max-w-[52rem] flex-col gap-4">
          <div className="flex gap-6">
            <dt className="label w-32 shrink-0 pt-1 sm:w-40">{p("scans")}</dt>
            <dd className="text-[1.05rem] leading-snug">{project.scans[l]}</dd>
          </div>
          <div className="flex gap-6">
            <dt className="label w-32 shrink-0 pt-1 sm:w-40">{p("returns")}</dt>
            <dd className="text-[1.05rem] leading-snug">{project.returns[l]}</dd>
          </div>
          <div className="flex gap-6">
            <dt className="label w-32 shrink-0 pt-1 sm:w-40">{p("stack")}</dt>
            <dd className="text-[1.05rem] leading-snug text-muted">{project.stack.join(", ")}</dd>
          </div>
          <div className="flex gap-6">
            <dt className="label w-32 shrink-0 pt-1 sm:w-40">{p("role")}</dt>
            <dd className="text-[1.05rem] leading-snug text-muted">{project.role[l]}</dd>
          </div>
        </dl>

        {project.url && (
          <p className="mt-10">
            <a href={project.url} className="link" target="_blank" rel="noreferrer noopener">
              {project.url.replace("https://", "")}
            </a>
          </p>
        )}
      </header>

      <section className="mt-32" aria-labelledby="probleme">
        <SectionHead label={t("problem")} id="probleme" />
        <div className="mt-12 grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <p className="text-[clamp(1.2rem,2.2vw,1.6rem)] leading-[1.45] font-light">
            {project.problem[l]}
          </p>
          <ProductPreview project={project} reconstructionNote={p("reconstructionNote")} />
        </div>
      </section>

      <section className="mt-32" aria-labelledby="construit">
        <SectionHead label={t("built")} id="construit" />
        <div className="mt-12 grid gap-12 lg:grid-cols-3 lg:gap-16">
          {project.built.map((item, i) => (
            <p key={i} className="leading-[1.75] text-muted">
              {item[l]}
            </p>
          ))}
        </div>
      </section>

      <section className="mt-32" aria-labelledby="decisions">
        <SectionHead label={t("decisions")} id="decisions" />
        <div className="mt-12 flex flex-col">
          {project.decisions.map((d, i) => (
            <div
              key={i}
              className="grid gap-8 border-t border-line-soft py-12 first:border-t-0 first:pt-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16"
            >
              <h2 className="max-w-[24ch] text-[1.3rem] leading-[1.3] font-light">
                {d.question[l]}
              </h2>
              <dl className="flex flex-col gap-7">
                <div>
                  <dt className="label">{t("chosen")}</dt>
                  <dd className="mt-2.5 max-w-[58ch] leading-[1.7]">{d.chosen[l]}</dd>
                </div>
                <div>
                  <dt className="label">{t("rejected")}</dt>
                  <dd className="mt-2.5 max-w-[58ch] leading-[1.7] text-muted">{d.rejected[l]}</dd>
                </div>
                <div>
                  <dt className="label">{t("why")}</dt>
                  <dd className="mt-2.5 max-w-[58ch] leading-[1.7] text-muted">{d.why[l]}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-32" aria-labelledby="mesures">
        <SectionHead label={t("measures")} id="mesures" />
        <div className="mt-12 flex flex-wrap gap-x-20 gap-y-10">
          {project.measures.map((m) => (
            <Figure key={m.value + m.label.fr} item={m} locale={l} />
          ))}
        </div>
      </section>

      <section className="mt-32" aria-labelledby="retro">
        <SectionHead label={t("retro")} id="retro" />
        {project.retro ? (
          <div className="mt-12 flex max-w-[44rem] flex-col gap-7">
            {project.retro.map((item, i) => (
              <p key={i} className="text-[1.1rem] leading-[1.7]">
                {item[l]}
              </p>
            ))}
          </div>
        ) : (
          <p className="mt-12 max-w-[52ch] leading-[1.75] text-faint">{t("retroPending")}</p>
        )}
      </section>
    </article>
  );
}
