import { getTranslations } from "next-intl/server";

import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import type { Locale } from "@/content/types";

/**
 * §00 — Le champ occupe l'écran, le texte passe par-dessus.
 * Pas de « bienvenue », pas de flèche qui rebondit.
 */
export async function Hero({ locale }: { locale: Locale }) {
  const st = await getTranslations("status");
  const t = await getTranslations("hero");

  return (
    <section
      id="haut"
      className="relative flex min-h-[100svh] items-center pt-24 pb-16"
      aria-labelledby="hero-title"
    >
      <div className="mx-auto w-full max-w-[86rem] px-5 sm:px-8">
        <p className="lab">
          {profile.name} — {profile.role[locale]}, {profile.school[locale]}
        </p>

        <h1
          id="hero-title"
          className="mt-7 font-display text-[clamp(3rem,10.5vw,9rem)] leading-[0.86] font-medium tracking-[-0.035em] uppercase"
        >
          {profile.thesis[locale]}
        </h1>

        <p className="mt-8 max-w-[34ch] text-[clamp(1.05rem,1.8vw,1.4rem)] leading-[1.45] text-dim">
          {profile.thesisShort[locale]}
        </p>

        <ul className="mt-12 flex flex-wrap gap-x-10 gap-y-5">
          {projects.map((project) => (
            <li key={project.slug} className="flex flex-col gap-1.5">
              <span className="font-display text-lg leading-none font-medium tracking-[-0.02em] uppercase">
                {project.name}
              </span>
              <span className={`lab ${project.status === "production" ? "lab-flux" : ""}`}>
                {st(project.status)}
              </span>
            </li>
          ))}
        </ul>

        <p className="lab mt-14 max-w-[52ch] normal-case tracking-normal">{t("beam")}</p>
      </div>
    </section>
  );
}
