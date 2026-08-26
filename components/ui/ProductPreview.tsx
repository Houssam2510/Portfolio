import Image from "next/image";
import type { Project } from "@/content/projects";

/**
 * La sortie réelle de chaque outil. Le monospace n'existe que là-dedans :
 * c'est le seul endroit du site où c'est une machine qui écrit.
 * Tant qu'aucune capture n'est déposée dans public/shots/, la légende le dit.
 */
function Console({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-line bg-raise/70 px-6 py-6 font-mono text-[12px] leading-[2.1] text-muted backdrop-blur-sm sm:px-8 sm:py-7">
      {children}
    </div>
  );
}

function Bar({ pct, warn = false }: { pct: number; warn?: boolean }) {
  return (
    <div className="my-3 h-px w-full bg-line">
      <div className={`h-px ${warn ? "bg-warn" : "bg-accent"}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

function Carriv() {
  return (
    <Console>
      <div className="text-paper">score ats — analyste données, Montréal</div>
      <Bar pct={78} />
      <div className="text-paper">78 / 100</div>
      <div className="mt-4">couverts &nbsp; python · sql · etl · dbt</div>
      <div>manquants &nbsp;<span className="text-warn"> airflow · snowflake</span></div>
      <div className="mt-4 text-paper">reçu de personnalisation</div>
      <div>3 formulations réécrites, 0 ajoutée — 31 s</div>
    </Console>
  );
}

function Lumina() {
  return (
    <Console>
      <div className="text-paper">exam readiness score</div>
      <Bar pct={64} />
      <div className="text-paper">64 / 100</div>
      <div className="mt-1">calculé en code, jamais généré</div>
      <div className="mt-4 text-paper">chapitres faibles, par impact</div>
      <div>04 transformée de Laplace &nbsp;+12</div>
      <div>07 régime transitoire &nbsp;+8</div>
      <div>02 nombres complexes &nbsp;+5</div>
    </Console>
  );
}

function Cspm() {
  return (
    <Console>
      <div className="text-paper">$ cspm-lite scan --profile prod</div>
      <div className="mt-4">
        <span className="text-warn">critique</span> &nbsp;s3://exports — bucket public
      </div>
      <div>
        <span className="text-warn">critique</span> &nbsp;sg-0f4a — 22/tcp ouvert au monde
      </div>
      <div>moyen &nbsp;&nbsp;&nbsp;iam:deploy — MFA absent</div>
      <Bar pct={42} warn />
      <div className="text-paper">pipeline : intégration bloquée</div>
      <div>report.json · report.html</div>
    </Console>
  );
}

export function ProductPreview({
  project,
  reconstructionNote,
}: {
  project: Project;
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
        className="w-full border border-line"
      />
    );
  }

  const view =
    project.preview === "carriv" ? <Carriv /> : project.preview === "lumina" ? <Lumina /> : <Cspm />;

  return (
    <figure className="flex flex-col gap-3">
      {view}
      <figcaption className="text-[0.78rem] text-faint">{reconstructionNote}</figcaption>
    </figure>
  );
}
