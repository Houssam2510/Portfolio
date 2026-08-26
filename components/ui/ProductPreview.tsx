import Image from "next/image";
import type { Project } from "@/content/projects";

/**
 * La sortie de chaque scanner, reconstituée. Tant qu'aucune capture réelle
 * n'est déposée dans public/shots/, c'est explicitement étiqueté comme une
 * reconstitution : jamais un faux screenshot.
 */
function Console({
  title,
  meta,
  children,
}: {
  title: string;
  meta: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bracket relative overflow-hidden border border-edge/70 bg-void/80">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-grid) 1px, transparent 1px), linear-gradient(90deg, var(--color-grid) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div className="relative flex items-center justify-between border-b border-edge/70 px-4 py-2.5">
        <span className="lab">{title}</span>
        <span className="lab lab-flux">{meta}</span>
      </div>
      <div className="relative px-4 py-4 font-mono text-[11.5px] leading-[2] text-dim">
        {children}
      </div>
    </div>
  );
}

function Bar({ pct, alert = false }: { pct: number; alert?: boolean }) {
  return (
    <div className="my-2.5 h-1 w-full bg-grid">
      <div
        className={`h-full ${alert ? "bg-alert" : "bg-flux"}`}
        style={{ width: `${pct}%`, boxShadow: "0 0 10px currentColor" }}
      />
    </div>
  );
}

function Carriv() {
  return (
    <Console title="carriv · scan ats" meta="78 / 100">
      <div className="text-ice">Analyste données — Montréal, QC</div>
      <Bar pct={78} />
      <div>
        <span className="text-flux">couverts</span> python · sql · etl · dbt
      </div>
      <div>
        <span className="text-alert">manquants</span> airflow · snowflake
      </div>
      <div className="mt-3 text-ice">reçu de personnalisation</div>
      <div>3 formulations réécrites · 0 ajoutée</div>
      <div className="mt-3 text-mute">terminé en 31 s</div>
    </Console>
  );
}

function Lumina() {
  return (
    <Console title="studylumina · readiness" meta="v2.1">
      <div className="text-ice">Exam Readiness Score</div>
      <Bar pct={64} />
      <div>
        <span className="text-flux">64 / 100</span> · calculé en code, pas généré
      </div>
      <div className="mt-3 text-ice">chapitres faibles, par impact</div>
      <div>04 transformée de Laplace — 12 pts</div>
      <div>07 régime transitoire — 8 pts</div>
      <div>02 nombres complexes — 5 pts</div>
    </Console>
  );
}

function Cspm() {
  return (
    <Console title="cspm-lite · aws" meta="CIS">
      <div className="text-ice">$ cspm-lite scan --profile prod</div>
      <div className="mt-2">
        <span className="text-alert">CRITIQUE</span> s3://exports — bucket public
      </div>
      <div>
        <span className="text-alert">CRITIQUE</span> sg-0f4a — 22/tcp ouvert 0.0.0.0/0
      </div>
      <div>
        <span className="text-flux">MOYEN</span> iam:deploy — MFA absent
      </div>
      <Bar pct={42} alert />
      <div className="mt-2 text-ice">pipeline : intégration bloquée</div>
      <div className="text-mute">rapport écrit — report.json · report.html</div>
    </Console>
  );
}

export function ProductPreview({
  project,
  reconstructionLabel,
  reconstructionNote,
}: {
  project: Project;
  reconstructionLabel: string;
  reconstructionNote: string;
}) {
  if (project.shot) {
    return (
      <Image
        src={project.shot}
        alt={project.name}
        width={1200}
        height={900}
        sizes="(max-width: 900px) 100vw, 46vw"
        className="w-full border border-edge/70"
      />
    );
  }

  const view =
    project.preview === "carriv" ? <Carriv /> : project.preview === "lumina" ? <Lumina /> : <Cspm />;

  return (
    <figure className="flex flex-col gap-2.5">
      {view}
      <figcaption className="lab normal-case tracking-normal">
        <span className="tracking-[0.18em] uppercase">{reconstructionLabel}</span> · {reconstructionNote}
      </figcaption>
    </figure>
  );
}
