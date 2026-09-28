"use client";

import Image from "next/image";
import type { CaseStudy } from "@/data/types";
import { useContent } from "@/i18n/ContentProvider";
import { shots } from "@/lib/shots";

/**
 * Carte projet. Tout ce qui est visible se lit en cinq secondes : domaine,
 * nom, une phrase, le flux en quatre étapes, trois chiffres. Le raisonnement
 * d'ingénierie reste disponible, replié, pour qui veut creuser.
 */
export default function ProjectCard({ cs, flip = false }: { cs: CaseStudy; flip?: boolean }) {
  const isProduct = cs.kind === "product";
  return (
    <article
      id={cs.id}
      data-reveal="1"
      data-lift="1"
      className={`proj ${isProduct ? "proj-product" : "proj-lab"}${flip ? " proj-flip" : ""}`}
    >
      {isProduct ? <BrowserVisual cs={cs} /> : <SpecsVisual cs={cs} />}

      <div className="proj-body">
        {isProduct && (
          <span aria-hidden="true" className="proj-ghost">
            {cs.number}
          </span>
        )}
        <Kicker cs={cs} />
        <h3 className="proj-name">{cs.name}</h3>
        <p className="proj-pitch">{cs.pitch}</p>
        {cs.note && <p className="proj-note">↳ {cs.note}</p>}
        <Flow steps={cs.flow} />
        <Stats cs={cs} />
        <div className="proj-tags">
          {cs.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <Actions cs={cs} />
        <UnderTheHood cs={cs} />
      </div>
    </article>
  );
}

function Kicker({ cs }: { cs: CaseStudy }) {
  const { ui } = useContent().content;
  const label = cs.status === "live" ? ui.statusLive : cs.status === "open" ? ui.statusOpen : ui.statusInternal;
  return (
    <div className="proj-kicker">
      <span style={{ color: "var(--acc)" }}>{cs.number}</span>
      <span>{cs.domainLabel}</span>
      <span className="proj-status" data-status={cs.status}>
        <span />
        {label}
      </span>
    </div>
  );
}

/** Le produit en quatre étapes. La dernière, celle qui décide, est en accent. */
function Flow({ steps }: { steps: string[] }) {
  return (
    <ol className="proj-flow">
      {steps.map((step, i) => (
        <li key={step} data-last={i === steps.length - 1 ? "" : undefined}>
          {step}
        </li>
      ))}
    </ol>
  );
}

function Stats({ cs }: { cs: CaseStudy }) {
  return (
    <dl className="proj-stats">
      {cs.stats.map((s) => (
        <div key={s.label}>
          <dt>{s.label}</dt>
          <dd style={{ color: s.accent ? "var(--acc)" : undefined }}>{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Actions({ cs }: { cs: CaseStudy }) {
  const { ui } = useContent().content;
  if (cs.url)
    return (
      <a className="proj-action view-live-btn" href={cs.url} target="_blank" rel="noopener">
        {ui.viewLive}
      </a>
    );
  if (cs.repo)
    return (
      <a className="proj-action view-live-btn" href={cs.repo} target="_blank" rel="noopener">
        {ui.viewCode}
      </a>
    );
  return <span className="proj-private">{ui.privateRepo}</span>;
}

function UnderTheHood({ cs }: { cs: CaseStudy }) {
  const { ui } = useContent().content;
  return (
    <details className="proj-more">
      <summary>
        <span>{ui.underTheHood}</span>
        <span aria-hidden="true" className="proj-more-icon">
          +
        </span>
      </summary>
      <div className="proj-more-body">
        <div className="proj-pd">
          <div>
            <div className="proj-label" style={{ color: "var(--acc)" }}>
              {ui.theProblem}
            </div>
            <p>{cs.problem}</p>
          </div>
          <div>
            <div className="proj-label">{ui.theDecision}</div>
            <p>{cs.decision}</p>
          </div>
        </div>
        <div className="proj-label">{cs.pipelineLabel}</div>
        <div className="proj-code" tabIndex={0} role="group" aria-label={cs.pipelineLabel}>
          {cs.pipelineCode}
        </div>
      </div>
    </details>
  );
}

function BrowserVisual({ cs }: { cs: CaseStudy }) {
  const { ui } = useContent().content;
  return (
    <figure className="proj-visual">
      <div className="proj-window">
        <div className="proj-window-bar">
          <span className="proj-dots">
            <span />
            <span />
            <span />
          </span>
          <a href={cs.url} target="_blank" rel="noopener" className="browser-url proj-url">
            <span style={{ color: "var(--ok)", flexShrink: 0 }}>▲</span>
            {cs.domain}
          </a>
          <span className="proj-live">{ui.live}</span>
        </div>
        {shots[cs.id] && (
          <Image
            src={shots[cs.id]}
            alt={cs.screenshotAlt ?? cs.name}
            placeholder="blur"
            sizes="(max-width: 960px) 100vw, 620px"
            style={{ display: "block", width: "100%", height: "auto" }}
          />
        )}
      </div>
    </figure>
  );
}

/** Pour un outil sans interface publique : sa fiche d'identité, en terminal. */
function SpecsVisual({ cs }: { cs: CaseStudy }) {
  return (
    <div className="proj-window proj-term">
      <div className="proj-window-bar">
        <span className="proj-dots" data-color="">
          <span />
          <span />
          <span />
        </span>
        <span className="proj-term-title">~/{cs.id}</span>
      </div>
      <dl className="proj-specs">
        {cs.specs?.map((s) => (
          <div key={s.key}>
            <dt>{s.key}</dt>
            <dd>{s.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
