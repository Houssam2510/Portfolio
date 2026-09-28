"use client";

import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import { contact } from "@/data";
import { useContent } from "@/i18n/ContentProvider";

export default function CaseStudies() {
  const { content } = useContent();
  const s = content.sections.cases;
  const products = content.caseStudies.filter((cs) => cs.kind === "product");
  const lab = content.caseStudies.filter((cs) => cs.kind === "lab");

  return (
    <section id="travaux" data-band="1" data-reveal="1" style={{ marginBottom: 128 }}>
      <div className="band-inner">
        <SectionHeading eyebrow={s.eyebrow} title={s.title} />

        <GroupLabel>{s.productsLabel}</GroupLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 72 }}>
          {products.map((cs, i) => (
            <ProjectCard key={cs.id} cs={cs} flip={i % 2 === 1} />
          ))}
        </div>

        <GroupLabel>{s.labLabel}</GroupLabel>
        <div className="proj-lab-grid">
          {lab.map((cs) => (
            <ProjectCard key={cs.id} cs={cs} />
          ))}
        </div>

        <a href={contact.github} target="_blank" rel="noopener" className="proj-more-link">
          {s.more}
        </a>
      </div>
    </section>
  );
}

function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="group-label">
      <span>{children}</span>
    </div>
  );
}
