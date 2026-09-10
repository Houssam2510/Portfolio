"use client";

import { useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import { skillFilters, skills } from "@/data/content";

export default function Skills() {
  const [filter, setFilter] = useState<string>("all");

  return (
    <section id="s04" data-band="1" data-reveal="1" style={{ marginBottom: 128 }}>
      <div className="band-inner">
        <SectionHeading eyebrow="04 · FILTRER PAR DOMAINE" title="Capacités" />

        <div
          role="group"
          aria-label="Filtrer les compétences par domaine"
          style={{ display: "flex", flexWrap: "wrap", gap: 9, marginBottom: 44, justifyContent: "center" }}
        >
          {skillFilters.map((f) => (
            <button
              key={f.id}
              type="button"
              data-filter={f.id}
              data-active={filter === f.id ? "" : undefined}
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.07em",
                padding: "9px 15px",
                border: "1px solid var(--line2)",
                borderRadius: 999,
                background: "transparent",
                color: "var(--muted)",
                cursor: "pointer",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(276px,1fr))", gap: "16px 44px" }}>
          {skills.map((skill) => (
            <div
              key={skill.name}
              data-skill={skill.category}
              data-dim={filter !== "all" && filter !== skill.category ? "" : undefined}
              style={{ transition: "opacity .3s ease" }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 9 }}>
                <span style={{ fontSize: 14.5, color: "var(--ink2)" }}>{skill.name}</span>
                <span style={{ marginLeft: "auto", fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--dim)" }}>
                  {skill.level}
                </span>
              </div>
              <div style={{ height: 3, background: "var(--soft)", borderRadius: 2, overflow: "hidden" }}>
                <div
                  data-bar={skill.percent}
                  style={{ height: "100%", width: 0, background: "var(--acc)", transition: "width 1.1s cubic-bezier(.16,.8,.24,1)" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
