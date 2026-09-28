import type { StaticImageData } from "next/image";
import carriv from "@/assets/shots/carriv.jpg";
import sanade from "@/assets/shots/sanade.jpg";
import studylumina from "@/assets/shots/studylumina.jpg";

/**
 * Captures des produits en ligne, prises au build plutôt qu'à la volée : un
 * service de capture tiers laissait un cadre vide tant qu'il n'avait pas fini.
 */
export const shots: Record<string, StaticImageData> = { carriv, sanade, studylumina };
