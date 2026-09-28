"use client";

import SectionHeading from "@/components/SectionHeading";
import { useContent } from "@/i18n/ContentProvider";

/**
 * Pas de barres de pourcentage : un « 86 % en Python » ne se vérifie pas.
 * Chaque outil est accompagné du projet où il a été mis en production.
 */
export default function Skills() {
  const { content } = useContent();
  const sk = content.sections.skills;

  return (
    <section id="capacites" data-band="1" data-reveal="1" style={{ marginBottom: 128 }}>
      <div className="band-inner">
        <SectionHeading eyebrow={sk.eyebrow} title={sk.title} />

        <div data-stagger="1" data-reveal="1" className="stack-grid">
          {content.skillGroups.map((group) => (
            <div key={group.id} className="stack-col">
              <div className="stack-head">{group.label}</div>
              <ul>
                {content.skills
                  .filter((s) => s.category === group.id)
                  .map((s) => (
                    <li key={s.name}>
                      <span className="stack-name">{s.name}</span>
                      <span className="stack-proof">{s.usedIn}</span>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
