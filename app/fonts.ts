import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";

/** Sentient — serif contemporaine. Elle porte tout ce qui compte. */
export const display = localFont({
  src: [
    { path: "./fonts/Sentient-300.woff2", weight: "300", style: "normal" },
    { path: "./fonts/Sentient-400.woff2", weight: "400", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
  preload: true,
  fallback: ["Georgia", "ui-serif", "serif"],
});

/** Switzer — sans neutre. Elle ne cherche pas à se faire remarquer. */
export const body = localFont({
  src: [
    { path: "./fonts/Switzer-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Switzer-500.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
  preload: true,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

/** JetBrains Mono — uniquement à l'intérieur des consoles, là où c'est
 *  une machine qui écrit. Nulle part ailleurs. */
export const mono = JetBrains_Mono({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
  fallback: ["ui-monospace", "monospace"],
});
