import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "design/**",
  ]),
  {
    // La boucle de rendu 3D mute par conception : matrices d'instances, buffers
    // d'arêtes et caméra sont écrits à chaque frame, hors du cycle de rendu React.
    // C'est précisément ce qui permet un seul draw call et zéro re-rendu.
    files: ["components/three/**"],
    rules: { "react-hooks/immutability": "off" },
  },
]);

export default eslintConfig;
