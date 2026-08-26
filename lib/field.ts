import { nodes } from "@/content/graph";

/**
 * Les cinq états du champ de points. Tout est PRÉCALCULÉ ici, une fois, avec
 * un générateur déterministe : deux chargements donnent exactement la même
 * image, et il n'y a aucune simulation physique au runtime.
 *
 *   0 SURFACE       une coque sous le faisceau — l'objet qu'on va scanner
 *   1 NAPPE         la coque s'ouvre à plat : la surface d'analyse
 *   2 GRAPPES       trois amas — Carriv, StudyLumina, CSPM-Lite
 *   3 BRIN          les amas s'étirent en une chronologie verticale
 *   4 CONSTELLATION les points se posent sur le vrai graphe de dépendances
 */
export const STAGES = 5;
export const COUNT = 24000;
/** Sur petit écran, le même champ avec moins de points : la scène reste
    la même, le GPU du téléphone n'est pas mis à genoux. */
export const COUNT_COMPACT = 7000;

/** xorshift32 : même graine, même nuage, à chaque chargement. */
function rng(seed: number) {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return ((s >>> 0) % 100000) / 100000;
  };
}

const GOLDEN = Math.PI * (3 - Math.sqrt(5));

function surface(i: number, n: number, r: () => number): [number, number, number] {
  const y = 1 - (i / (n - 1)) * 2;
  const radius = Math.sqrt(Math.max(0, 1 - y * y));
  const theta = GOLDEN * i;
  const jitter = 1 + (r() - 0.5) * 0.05;
  const R = 3.5 * jitter;
  return [Math.cos(theta) * radius * R, y * R * 0.92, Math.sin(theta) * radius * R];
}

function sheet(i: number, n: number, r: () => number): [number, number, number] {
  const cols = Math.round(Math.sqrt(n * 1.9));
  const rows = Math.ceil(n / cols);
  const cx = (i % cols) / (cols - 1) - 0.5;
  const cz = Math.floor(i / cols) / (rows - 1) - 0.5;
  const wave = Math.sin(cx * 7.5) * 0.18 + Math.cos(cz * 6.2) * 0.14;
  return [cx * 15.5, -1.3 + wave + (r() - 0.5) * 0.08, cz * 9.5 - 1.5];
}

const CLUSTERS: readonly [number, number, number, number][] = [
  [-4.15, 1.15, -0.4, 1.0], // Carriv
  [0.15, -0.35, 0.9, 1.0], // StudyLumina
  [4.15, 1.0, -0.6, 0.82], // CSPM-Lite
];

function clusters(i: number, r: () => number): [number, number, number] {
  const c = CLUSTERS[i % CLUSTERS.length];
  /* Distribution gaussienne approchée : trois tirages moyennés. */
  const g = () => (r() + r() + r() - 1.5) * 1.25;
  return [c[0] + g() * c[3], c[1] + g() * c[3] * 0.72, c[2] + g() * c[3] * 0.66];
}

function strand(i: number, n: number, r: () => number): [number, number, number] {
  const t = i / n;
  const turns = 5.5;
  const a = t * Math.PI * 2 * turns + (i % 2) * Math.PI;
  const radius = 1.55 + Math.sin(t * Math.PI) * 0.85 + (r() - 0.5) * 0.22;
  return [Math.cos(a) * radius, 5.6 - t * 11.2, Math.sin(a) * radius * 0.7];
}

function constellation(i: number, r: () => number): [number, number, number] {
  /* Les points se répartissent sur les nœuds réels, en nombre proportionnel
     à leur importance : les deux produits en production dominent l'image. */
  const weights = nodes.map((n) => n.size ** 2);
  const total = weights.reduce((a, b) => a + b, 0);
  let pick = ((i * 2654435761) % 100000) / 100000;
  pick *= total;
  let idx = 0;
  for (let k = 0; k < weights.length; k++) {
    pick -= weights[k];
    if (pick <= 0) {
      idx = k;
      break;
    }
  }
  const node = nodes[idx];
  const spread = 0.17 + node.size * 0.16;
  const g = () => (r() + r() - 1) * spread;
  return [node.pos[0] * 1.18 + g(), node.pos[1] * 1.18 + g(), node.pos[2] * 1.18 + g()];
}

export type FieldData = {
  /** STAGES × COUNT × 3 */
  readonly stages: Float32Array[];
  readonly seeds: Float32Array;
};

export function buildField(count: number = COUNT): FieldData {
  const stages = Array.from({ length: STAGES }, () => new Float32Array(count * 3));
  const seeds = new Float32Array(count);
  const r = rng(20271202);

  for (let i = 0; i < count; i++) {
    seeds[i] = r();
    const writers: [number, number, number][] = [
      surface(i, count, r),
      sheet(i, count, r),
      clusters(i, r),
      strand(i, count, r),
      constellation(i, r),
    ];
    for (let s = 0; s < STAGES; s++) {
      stages[s][i * 3] = writers[s][0];
      stages[s][i * 3 + 1] = writers[s][1];
      stages[s][i * 3 + 2] = writers[s][2];
    }
  }

  return { stages, seeds };
}
