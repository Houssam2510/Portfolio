import type { RichPart } from "@/data/types";

/**
 * Rend un texte enrichi décrit en données. Remplace l'injection de HTML brut
 * par dangerouslySetInnerHTML qui servait auparavant pour les mêmes chaînes.
 */
export default function Rich({ parts }: { parts: RichPart[] }) {
  return (
    <>
      {parts.map((part, i) =>
        typeof part === "string" ? (
          part
        ) : (
          <strong
            key={i}
            style={{
              color: part.accent ? "var(--acc)" : "var(--ink)",
              fontFamily: part.strong.startsWith(".") ? "var(--font-mono)" : undefined,
              fontWeight: 600,
            }}
          >
            {part.strong}
          </strong>
        )
      )}
    </>
  );
}
