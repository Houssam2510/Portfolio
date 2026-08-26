import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";

/** Nippo — grotesque technique large. Porte les titres et les verdicts. */
export const display = localFont({
  src: [
    { path: "./fonts/Nippo-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Nippo-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Nippo-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
  preload: true,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

/** Supreme — corps de texte, neutre et lisible sur fond noir. */
export const body = localFont({
  src: [
    { path: "./fonts/Supreme-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Supreme-500.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
  preload: false,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

/** JetBrains Mono — relevés, étiquettes, tout ce que la machine écrit. */
export const mono = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
  fallback: ["ui-monospace", "monospace"],
});
