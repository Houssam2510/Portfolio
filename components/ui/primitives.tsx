import type { ReactNode } from "react";
import type { Measured, Locale, Status } from "@/content/types";

/** La seule étiquette du site. Petite, discrète, jamais en monospace. */
export function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`label ${className}`}>{children}</span>;
}

/** Un titre de section : une étiquette, un filet, de l'air. Rien d'autre. */
export function SectionHead({
  label,
  id,
  children,
}: {
  label: string;
  id?: string;
  children?: ReactNode;
}) {
  return (
    <header className="reveal">
      <div className="rule" />
      <p className="label mt-5" id={id}>
        {label}
      </p>
      {children}
    </header>
  );
}

/** Le point d'état. C'est le seul endroit du site où l'accent est un aplat. */
export function StatusMark({ label, status }: { label: string; status: Status }) {
  const live = status === "production";
  return (
    <span className="label inline-flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className={`block size-[5px] rounded-full ${live ? "bg-accent" : "bg-faint"}`}
      />
      {label}
    </span>
  );
}

/** Une valeur publique et vérifiable. Le chiffre en clair, son intitulé dessous. */
export function Figure({ item, locale }: { item: Measured; locale: Locale }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-display text-[1.6rem] leading-none font-light tabular-nums">
        {item.value}
      </span>
      <span className="text-[0.82rem] leading-snug text-muted">{item.label[locale]}</span>
    </div>
  );
}
