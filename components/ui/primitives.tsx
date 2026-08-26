import type { ReactNode } from "react";
import type { Measured, Locale, Status } from "@/content/types";

/** Étiquette machine. Tout ce que l'appareil écrit passe par là. */
export function Lab({ children, flux = false }: { children: ReactNode; flux?: boolean }) {
  return <span className={`lab ${flux ? "lab-flux" : ""}`}>{children}</span>;
}

/**
 * Les sections sont numérotées parce que ce sont les étapes d'un scan :
 * l'ordre porte de l'information. C'est le seul endroit où un numéro apparaît.
 */
export function SectionHead({
  index,
  label,
  id,
  children,
}: {
  index: string;
  label: string;
  id?: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="lab lab-flux">{index}</span>
        <span className="hairline w-10 shrink-0 opacity-70" aria-hidden="true" />
        <span className="lab" id={id}>
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}

export function StatusBadge({ label, status }: { label: string; status: Status }) {
  const live = status === "production";
  return (
    <span
      className={`lab inline-flex items-center gap-2.5 border px-2.5 py-1.5 ${
        live ? "border-flux/45 text-flux" : "border-edge text-dim"
      }`}
    >
      <span
        aria-hidden="true"
        className={`block size-1.5 rounded-full ${live ? "bg-flux" : "bg-dim"}`}
        style={live ? { boxShadow: "0 0 8px var(--color-flux)" } : undefined}
      />
      {label}
    </span>
  );
}

/**
 * LE VERDICT — tout chiffre rendu par un scan passe par ce composant.
 * C'est la seule façon d'afficher une valeur : le phosphore signifie
 * « relevé », jamais « argument ».
 */
export function Verdict({ item, locale }: { item: Measured; locale: Locale }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="lab">{item.label[locale]}</span>
      <span className="verdict font-display text-[1.7rem] leading-none font-medium">
        {item.value}
      </span>
      {item.note && <span className="text-xs leading-snug text-mute">{item.note[locale]}</span>}
    </div>
  );
}

/** Cadre d'instrument : équerres aux angles, aucun coin arrondi. */
export function Frame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bracket border border-edge/60 bg-carbon/40 backdrop-blur-[2px] ${className}`}>
      {children}
    </div>
  );
}
