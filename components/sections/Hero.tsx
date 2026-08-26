import { getTranslations } from "next-intl/server";

import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import type { Locale } from "@/content/types";
import { StatusMark } from "@/components/ui/primitives";

export async function Hero({ locale }: { locale: Locale }) {
  const st = await getTranslations("status");

  return (
    <section
      id="haut"
      className="relative flex min-h-[100svh] flex-col pt-28 pb-12"
      aria-labelledby="hero-title"
    >
      <div className="mx-auto flex w-full max-w-[80rem] flex-1 flex-col justify-center px-6 sm:px-10">
        <p className="label">
          {profile.name} — {profile.role[locale]}, {profile.school[locale]}
        </p>

        <h1
          id="hero-title"
          className="mt-10 max-w-[16ch] text-[clamp(2.9rem,7.2vw,6.4rem)] leading-[1.02] font-light tracking-[-0.025em]"
        >
          {profile.thesis[locale]}
        </h1>

        <p className="lede mt-8 max-w-[42ch]">{profile.thesisShort[locale]}</p>
      </div>

      <div className="mx-auto w-full max-w-[80rem] px-6 sm:px-10">
        <div className="rule" />
        <ul className="mt-6 flex flex-wrap gap-x-16 gap-y-6">
          {projects.map((project) => (
            <li key={project.slug} className="flex flex-col gap-2">
              <span className="font-display text-[1.35rem] leading-none font-light">
                {project.name}
              </span>
              <StatusMark label={st(project.status)} status={project.status} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
