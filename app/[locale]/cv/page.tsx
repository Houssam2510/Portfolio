import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { skills, languages } from "@/content/skills";
import { timeline } from "@/content/timeline";
import type { Locale } from "@/content/types";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("cvTitle"), description: t("cvDescription") };
}

/** Sans 3D, sans animation, imprimable en A4. Le même contenu, rien de plus. */
export default async function CvPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const t = await getTranslations("cv");
  const st = await getTranslations("status");

  const byKind = (kind: string) => timeline.filter((e) => e.kind === kind);

  return (
    <div className="mx-auto max-w-[54rem] px-5 pt-28 pb-24 sm:px-8 print:px-0 print:pt-0 print:pb-0">
      <header className="border-b border-edge pb-6 print:border-black">
        <h1 className="font-display text-[clamp(2rem,6vw,3.2rem)] leading-none font-medium tracking-[-0.03em] uppercase">
          {profile.name}
        </h1>
        <p className="mt-4 max-w-[40ch] font-display text-lg leading-tight font-medium">
          {profile.thesis[l]} {profile.thesisShort[l]}
        </p>
        <p className="lab mt-5 flex flex-wrap gap-x-5 gap-y-1">
          <span>{profile.role[l]}</span>
          <span>{profile.school[l]}</span>
          <span>{profile.city[l]}</span>
          <span>{profile.email}</span>
        </p>
      </header>

      <p className="lab no-print mt-5">{t("note")}</p>

      <section className="mt-11">
        <h2 className="lab border-b border-edge/60 pb-2 print:border-black">{t("education")}</h2>
        {[...byKind("school"), ...byKind("cert")].map((e) => (
          <div key={e.id} className="mt-5 break-inside-avoid">
            <h3 className="font-display text-lg font-medium">{e.title[l]}</h3>
            {e.when && <p className="lab mt-1.5">{e.when[l]}</p>}
            <p className="mt-2 leading-[1.55] text-dim print:text-black">{e.detail[l]}</p>
          </div>
        ))}
      </section>

      <section className="mt-11">
        <h2 className="lab border-b border-edge/60 pb-2 print:border-black">{t("experience")}</h2>
        {byKind("work").map((e) => (
          <div key={e.id} className="mt-5 break-inside-avoid">
            <h3 className="font-display text-lg font-medium">{e.title[l]}</h3>
            {e.when && <p className="lab mt-1.5">{e.when[l]}</p>}
            <p className="mt-2 leading-[1.55] text-dim print:text-black">{e.detail[l]}</p>
          </div>
        ))}
      </section>

      <section className="mt-11">
        <h2 className="lab border-b border-edge/60 pb-2 print:border-black">{t("products")}</h2>
        {projects.map((project) => (
          <div key={project.slug} className="mt-6 break-inside-avoid">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h3 className="font-display text-lg font-medium">{project.name}</h3>
              <span className="lab">{st(project.status)}</span>
              {project.url && (
                <a href={project.url} className="lab link-scan print:text-black">
                  {project.url.replace("https://", "")}
                </a>
              )}
            </div>
            <p className="mt-2 leading-[1.55]">{project.promise[l]}</p>
            <p className="mt-2 leading-[1.55] text-dim print:text-black">{project.built[0][l]}</p>
            <p className="lab mt-2">{project.stack.join(" · ")}</p>
            <ul className="mt-3 flex flex-wrap gap-x-8 gap-y-2">
              {project.measures.map((m) => (
                <li key={m.value + m.label.fr} className="text-sm">
                  <span className="lab mr-2">{m.label[l]}</span>
                  <span className="verdict font-medium print:text-black">{m.value}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mt-11 break-inside-avoid">
        <h2 className="lab border-b border-edge/60 pb-2 print:border-black">{t("skills")}</h2>
        <dl className="mt-4 grid gap-3">
          {skills.map((group) => (
            <div key={group.id} className="grid grid-cols-[9rem_1fr] gap-4">
              <dt className="lab pt-1">{group.title[l]}</dt>
              <dd className="leading-[1.55]">{group.items.join(" · ")}</dd>
            </div>
          ))}
          <div className="grid grid-cols-[9rem_1fr] gap-4">
            <dt className="lab pt-1">{t("languages")}</dt>
            <dd className="leading-[1.55]">{languages.map((x) => x[l]).join(" · ")}</dd>
          </div>
        </dl>
      </section>

      <section className="mt-11 break-inside-avoid">
        <h2 className="lab border-b border-edge/60 pb-2 print:border-black">{t("contact")}</h2>
        <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
          <li>
            <a href={`mailto:${profile.email}`} className="link-scan print:text-black">
              {profile.email}
            </a>
          </li>
          {profile.links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="link-scan print:text-black">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
