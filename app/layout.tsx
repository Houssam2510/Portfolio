import type { ReactNode } from "react";

/** Le vrai gabarit vit dans app/[locale]/layout.tsx : c'est lui qui connaît la langue. */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
