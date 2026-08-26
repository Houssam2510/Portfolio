import { getTranslations } from "next-intl/server";

import { skills, languages } from "@/content/skills";
import { nodes, edges } from "@/content/graph";
import type { Locale } from "@/content/types";
import { SectionHead } from "@/components/ui/primitives";

export async function Constellation({ locale }: { locale: Locale }) {
  const t = await getTranslations("sections");
  const g = await getTranslations("graph");

  const label = new Map(nodes.map((n) => [n.id, n.label[locale]]));

  return (
    <section
      id="constellation"
      className="relative py-32 lg:py-44"
      aria-labelledby="competences-label"
    >
      <div className="mx-auto max-w-[80rem] px-6 sm:px-10">
        <SectionHead label={t("skills")} id="competences-label" />

        <div className="mt-16 grid gap-14 lg:grid-cols-3 lg:gap-20">
          {skills.map((group, i) => (
            <div key={group.id} className="reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              <h3 className="label">{group.title[locale]}</h3>
              <ul className="mt-6 flex flex-col gap-2.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className={
                      group.id === "solid"
                        ? "font-display text-[1.25rem] leading-tight font-light"
                        : group.id === "working"
                          ? "text-[1rem] leading-tight"
                          : "text-[0.95rem] leading-tight text-muted"
                    }
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-16 text-[0.9rem] text-faint">
          {languages.map((l) => l[locale]).join(" · ")}
        </p>

        <p className="reveal prose-col mt-16 leading-[1.75] text-muted">
          {locale === "fr"
            ? "La cybersécurité et l'infonuagique ne sont pas des étiquettes à cocher ici. Elles se lisent dans CSPM-Lite : ce que l'outil regarde dans un compte AWS, comment il classe un constat, et pourquoi il ferme la porte du pipeline au lieu d'envoyer un avertissement de plus."
            : "Cybersecurity and cloud aren't checkboxes here. They show up in CSPM-Lite: what the tool looks at inside an AWS account, how it ranks a finding, and why it closes the pipeline door instead of sending one more warning."}
        </p>

        {/* L'équivalent texte du champ : navigable au clavier, lisible par un
            lecteur d'écran, et honnête sur ce que dessine la 3D. */}
        <details className="mt-20 border-t border-line-soft pt-8">
          <summary className="label cursor-pointer list-none text-muted marker:content-none hover:text-paper">
            {g("listTitle")}
          </summary>
          <p className="prose-col mt-6 text-[0.95rem] leading-[1.7] text-faint">{g("listNote")}</p>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {nodes.map((n) => {
              const links = edges
                .filter((e) => e.from === n.id || e.to === n.id)
                .map((e) => label.get(e.from === n.id ? e.to : e.from)!);
              return (
                <li key={n.id} className="text-[0.9rem] leading-snug">
                  <span>{n.label[locale]}</span>
                  <span className="mt-1 block text-faint">
                    {g("connectedTo")} {links.join(", ")}
                  </span>
                </li>
              );
            })}
          </ul>
        </details>
      </div>
    </section>
  );
}
