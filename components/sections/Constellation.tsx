import { getTranslations } from "next-intl/server";

import { skills, languages } from "@/content/skills";
import { nodes, edges } from "@/content/graph";
import type { Locale } from "@/content/types";
import { SectionHead } from "@/components/ui/primitives";

/** La taille du texte porte la maîtrise. Pas de barre, pas de pourcentage :
 *  venant de quelqu'un dont les outils rendent des scores calculés, une note
 *  auto-attribuée serait une contradiction ouverte. */
const scale: Record<string, string> = {
  solid:
    "font-display text-[clamp(1.4rem,2.8vw,2.2rem)] leading-[1.2] font-medium tracking-[-0.025em]",
  working: "text-[clamp(1.05rem,1.8vw,1.35rem)] leading-[1.35] font-medium text-ice/90",
  learning: "text-[0.95rem] leading-[1.5] text-dim",
};

export async function Constellation({ locale }: { locale: Locale }) {
  const t = await getTranslations("sections");
  const g = await getTranslations("graph");

  const label = new Map(nodes.map((n) => [n.id, n.label[locale]]));

  return (
    <section
      id="constellation"
      className="relative py-28 lg:py-36"
      aria-labelledby="competences-label"
    >
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
        <SectionHead index="04" label={t("skills")} id="competences-label" />

        <div className="mt-14 grid gap-12 lg:grid-cols-3">
          {skills.map((group, i) => (
            <div key={group.id} className="reveal" style={{ transitionDelay: `${i * 70}ms` }}>
              <h3 className="lab border-b border-edge/50 pb-3">{group.title[locale]}</h3>
              <p className={`mt-6 ${scale[group.id]}`}>{group.items.join("  ·  ")}</p>
            </div>
          ))}
        </div>

        <p className="lab mt-12">{languages.map((l) => l[locale]).join("  ·  ")}</p>

        <p className="mt-12 max-w-[58ch] leading-[1.6] text-dim">
          {locale === "fr"
            ? "La cybersécurité et l'infonuagique ne sont pas des étiquettes à cocher ici. Elles se lisent dans CSPM-Lite : ce que l'outil regarde dans un compte AWS, comment il classe un constat, et pourquoi il ferme la porte du pipeline au lieu d'envoyer un avertissement de plus."
            : "Cybersecurity and cloud aren't checkboxes here. They show up in CSPM-Lite: what the tool looks at inside an AWS account, how it ranks a finding, and why it closes the pipeline door instead of sending one more warning."}
        </p>

        {/* L'équivalent texte de la constellation : navigable au clavier,
            lisible par un lecteur d'écran, utile même quand la 3D tourne. */}
        <details className="mt-16 border-t border-edge/40 pt-6">
          <summary className="lab cursor-pointer list-none text-flux marker:content-none">
            <span className="border-b border-flux/40 pb-1">{g("listTitle")}</span>
          </summary>
          <p className="lab mt-5 normal-case tracking-normal">{g("listNote")}</p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {nodes.map((n) => {
              const links = edges
                .filter((e) => e.from === n.id || e.to === n.id)
                .map((e) => label.get(e.from === n.id ? e.to : e.from)!);
              return (
                <li key={n.id} className="text-sm leading-snug">
                  <span className="font-medium">{n.label[locale]}</span>
                  <span className="lab mt-1 block normal-case tracking-normal">
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
