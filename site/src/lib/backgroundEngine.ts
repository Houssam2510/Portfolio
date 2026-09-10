/**
 * Dual canvas background, ported from the design prototype.
 *
 * "hero"  — continuous drifting light-ribbons behind the name, evided over
 *           the real text so it never sits on top of a letter.
 * "flow"  — a topographic contour field for the rest of the page, with one
 *           bright contour that migrates upward as the page scrolls.
 *
 * A single rAF loop lives on `window` (not tied to any component's mount
 * lifecycle) so nothing in React's render cycle can kill it — mirrors the
 * prototype's own fix for the same class of bug.
 */

type Size = { w: number; h: number };

type BgConfig = {
  running?: boolean;
  raf?: number;
  enabled: boolean;
  mouse: { x: number; y: number };
  readColors: boolean;
  accent: string;
  paper: string;
  dotColor: string;
  pickColors: () => void;
  mask: HTMLCanvasElement | null;
  maskW?: number;
  maskH?: number;
  maskHostH?: number;
  off?: HTMLCanvasElement;
  ro?: ResizeObserver;
};

declare global {
  interface Window {
    __pfBgEngine?: BgConfig;
  }
}

const TRAILS = [
  { amp: 0.16, freq: 1.05, sp: 0.34, off: -0.16, w: 2.4, al: 0.95 },
  { amp: 0.22, freq: 0.74, sp: -0.26, off: 0.04, w: 1.7, al: 0.78 },
  { amp: 0.12, freq: 1.55, sp: 0.44, off: 0.2, w: 1.3, al: 0.62 },
  { amp: 0.28, freq: 0.52, sp: -0.18, off: 0.3, w: 1.1, al: 0.48 },
];

function trailY(tr: (typeof TRAILS)[number], u: number, H: number, ph: number, lift: number) {
  return (
    H * (0.5 + tr.off) +
    H * tr.amp * Math.sin(u * 6.283 * tr.freq + ph) +
    H * tr.amp * 0.34 * Math.sin(u * 6.283 * tr.freq * 2.3 - ph * 1.4) +
    lift
  );
}

export function startBackgroundEngine() {
  if (typeof window === "undefined") return;

  const css = (n: string, fb: string) =>
    getComputedStyle(document.documentElement).getPropertyValue(n).trim() || fb;

  const cfg: BgConfig = (window.__pfBgEngine =
    window.__pfBgEngine ||
    ({
      enabled: true,
      mouse: { x: 0, y: 0 },
      readColors: true,
      accent: "",
      paper: "",
      dotColor: "",
      mask: null,
      pickColors: () => {},
    } as BgConfig));

  cfg.pickColors = () => {
    cfg.accent = css("--acc", "#6B8F1F");
    cfg.paper = css("--bg", "#F8F8F6");
    cfg.dotColor = css("--acc-2", "#4C6B14");
    cfg.readColors = false;
  };
  cfg.pickColors();
  cfg.readColors = true;

  const heroCanvas = document.querySelector<HTMLCanvasElement>('canvas[data-bg="hero"]');
  if (heroCanvas && !cfg.ro) {
    cfg.ro = new ResizeObserver(() => {
      cfg.mask = null;
    });
    cfg.ro.observe(heroCanvas);
  }

  if (cfg.running) return;
  cfg.running = true;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const size = new WeakMap<HTMLCanvasElement, Size>();
  const fit = (el: HTMLCanvasElement) => {
    const r = el.getBoundingClientRect();
    const s0 = size.get(el);
    if (!s0 || s0.w !== r.width || s0.h !== r.height) {
      size.set(el, { w: r.width, h: r.height });
      el.width = Math.max(1, r.width * dpr);
      el.height = Math.max(1, r.height * dpr);
    }
    return r;
  };

  let t = 0;
  let last = performance.now();

  const drawHero = (el: HTMLCanvasElement) => {
    const r = fit(el);
    const W = r.width;
    const H = r.height;
    if (!W || !H) return;
    const ctx = el.getContext("2d")!;
    const host = el.parentElement;
    if (!host) return;

    const hostH = host.offsetHeight;
    if (!cfg.mask || cfg.maskW !== el.width || cfg.maskH !== el.height || cfg.maskHostH !== hostH) {
      cfg.maskHostH = hostH;
      cfg.maskW = el.width;
      cfg.maskH = el.height;
      const hostRect = host.getBoundingClientRect();
      const rects: DOMRect[] = [];
      const rng = document.createRange();
      host.querySelectorAll("h1, p").forEach((zn) => {
        const walk = document.createTreeWalker(zn, NodeFilter.SHOW_TEXT);
        let n: Node | null;
        while ((n = walk.nextNode())) {
          if (!n.nodeValue || !n.nodeValue.trim()) continue;
          rng.selectNodeContents(n);
          for (const lr of Array.from(rng.getClientRects())) {
            if (lr.width > 1 && lr.height > 1) rects.push(lr);
          }
        }
      });
      host.querySelectorAll("[data-hero-block] > *").forEach((ch) => {
        const cr = ch.getBoundingClientRect();
        if (cr.width > 1 && cr.height > 1) rects.push(cr);
      });
      const mk = (cfg.mask = document.createElement("canvas"));
      mk.width = el.width;
      mk.height = el.height;
      const mctx = mk.getContext("2d")!;
      mctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      mctx.filter = "blur(14px)";
      mctx.fillStyle = "#000";
      for (const r2 of rects) {
        mctx.fillRect(r2.left - hostRect.left - 12, r2.top - hostRect.top - 8, r2.width + 24, r2.height + 16);
      }
      mctx.filter = "none";
    }

    if (!cfg.off) cfg.off = document.createElement("canvas");
    const off = cfg.off;
    if (off.width !== el.width || off.height !== el.height) {
      off.width = el.width;
      off.height = el.height;
    }
    const octx = off.getContext("2d")!;
    octx.setTransform(dpr, 0, 0, dpr, 0, 0);
    octx.clearRect(0, 0, W, H);
    octx.lineCap = "round";
    octx.lineJoin = "round";

    const my = cfg.mouse.y * H * 0.12;
    const mx = cfg.mouse.x * 0.5;
    const STEP = Math.max(9, W / 120);

    octx.fillStyle = cfg.accent;
    const G = 58;
    for (let x = W * 0.3; x < W + G; x += G) {
      for (let y = G * 0.5; y < H; y += G) {
        const d = Math.sin(x * 0.013 + y * 0.011 + t * 0.5);
        octx.globalAlpha = 0.1 + 0.12 * (d * 0.5 + 0.5);
        octx.beginPath();
        octx.arc(x, y, 1.1, 0, 6.2832);
        octx.fill();
      }
    }

    for (let i = 0; i < TRAILS.length; i++) {
      const tr = TRAILS[i];
      const ph = t * tr.sp * 6.283 + i * 1.7 + mx;
      for (let pass = 0; pass < 2; pass++) {
        const lift = pass ? 9 + i * 3 : 0;
        octx.globalAlpha = pass ? tr.al * 0.22 : tr.al;
        octx.lineWidth = pass ? tr.w * 0.6 : tr.w;
        octx.strokeStyle = cfg.accent;
        octx.beginPath();
        for (let x = -STEP; x <= W + STEP; x += STEP) {
          const u = x / W;
          const y = trailY(tr, u, H, ph, lift + my * (0.4 + i * 0.2));
          if (x === -STEP) octx.moveTo(x, y);
          else octx.lineTo(x, y);
        }
        octx.stroke();
      }
      const uu = ((t * 0.09 + i * 0.27) % 1.2) - 0.1;
      if (uu > 0 && uu < 1) {
        const px = uu * W;
        const py = trailY(tr, uu, H, ph, my * (0.4 + i * 0.2));
        octx.globalAlpha = tr.al;
        octx.fillStyle = cfg.dotColor;
        octx.beginPath();
        octx.arc(px, py, 2.6, 0, 6.2832);
        octx.fill();
        octx.globalAlpha = tr.al * 0.3;
        octx.beginPath();
        octx.arc(px, py, 8.5, 0, 6.2832);
        octx.fill();
      }
    }

    octx.globalAlpha = 1;
    octx.globalCompositeOperation = "destination-out";
    octx.setTransform(1, 0, 0, 1, 0, 0);
    octx.drawImage(cfg.mask, 0, 0);
    octx.setTransform(dpr, 0, 0, dpr, 0, 0);
    octx.globalCompositeOperation = "source-over";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    const glow = ctx.createRadialGradient(W * 0.74, H * 0.42, 0, W * 0.74, H * 0.42, Math.max(W, H) * 0.6);
    glow.addColorStop(0, cfg.accent);
    glow.addColorStop(1, "transparent");
    ctx.globalAlpha = 0.09;
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(off, 0, 0);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const drawFlow = (el: HTMLCanvasElement) => {
    const r = fit(el);
    const W = r.width;
    const H = r.height;
    if (!W || !H) return;
    const ctx = el.getContext("2d")!;
    const y0 = window.scrollY || 0;
    const ph = y0 * 0.0016;
    const dx = y0 * 0.045;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const field = (x: number, y: number) =>
      Math.sin(x * 0.0042 + ph * 1.5) * Math.cos(y * 0.0051 - ph * 1.1) +
      0.55 * Math.sin((x * 0.0026 + y * 0.0037) * 1.7 + ph * 2.2) +
      0.3 * Math.cos(x * 0.0091 - ph * 0.8);

    const LEVELS = 11;
    const STEP = Math.max(11, W / 130);
    const live = ((y0 * 0.0022) % 1) * LEVELS;
    for (let l = 0; l < LEVELS; l++) {
      const isLive = Math.abs(l - live) < 0.55;
      const base = H * (0.06 + (l / (LEVELS - 1)) * 0.94);
      const amp = 26 + 30 * Math.sin(l * 0.9 + 0.4);
      ctx.strokeStyle = cfg.accent;
      ctx.globalAlpha = isLive ? 0.42 : 0.085 + 0.05 * (l / LEVELS);
      ctx.lineWidth = isLive ? 1.8 : 0.7;
      ctx.beginPath();
      for (let x = -STEP; x <= W + STEP; x += STEP) {
        const y = base + amp * field(x + dx * (0.4 + l * 0.06), base);
        if (x === -STEP) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      if (isLive) {
        ctx.fillStyle = cfg.accent;
        for (let n = 0; n <= 6; n++) {
          const x = (n / 6) * W;
          const y = base + amp * field(x + dx * (0.4 + l * 0.06), base);
          ctx.globalAlpha = 0.55;
          ctx.beginPath();
          ctx.arc(x, y, 2.4, 0, 6.2832);
          ctx.fill();
          ctx.globalAlpha = 0.14;
          ctx.beginPath();
          ctx.arc(x, y, 9, 0, 6.2832);
          ctx.fill();
        }
      }
    }

    const G = 76;
    const offX = (dx * 0.5) % G;
    ctx.fillStyle = cfg.dotColor;
    for (let x = -G + offX; x < W + G; x += G) {
      for (let y = -G + ((y0 * 0.22) % G); y < H + G; y += G) {
        const d = field(x, y);
        ctx.globalAlpha = 0.05 + 0.1 * (d * 0.5 + 0.5);
        ctx.beginPath();
        ctx.arc(x, y, 1.2, 0, 6.2832);
        ctx.fill();
      }
    }

    ctx.strokeStyle = cfg.accent;
    const rx = W - 34;
    ctx.globalAlpha = 0.16;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(rx, 0);
    ctx.lineTo(rx, H);
    ctx.stroke();
    const TICK = 46;
    const tOff = (y0 * 0.28) % TICK;
    for (let y = -TICK + tOff; y < H + TICK; y += TICK) {
      const major = Math.round((y + y0 * 0.28) / TICK) % 4 === 0;
      ctx.globalAlpha = major ? 0.3 : 0.13;
      ctx.lineWidth = major ? 1.4 : 0.8;
      ctx.beginPath();
      ctx.moveTo(rx, y);
      ctx.lineTo(rx + (major ? 16 : 8), y);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  };

  const loop = () => {
    cfg.raf = requestAnimationFrame(loop);
    const now = performance.now();
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (!cfg.enabled) return;
    if (cfg.readColors) cfg.pickColors();
    t += dt;
    const hero = document.querySelector<HTMLCanvasElement>('canvas[data-bg="hero"]');
    const flow = document.querySelector<HTMLCanvasElement>('canvas[data-bg="flow"]');
    const heroSec = document.getElementById("s00");
    let heroVis = 1;
    if (heroSec) {
      const hr = heroSec.getBoundingClientRect();
      heroVis = Math.min(1, Math.max(0, (hr.bottom - 40) / Math.max(1, hr.height)));
    }
    if (hero && hero.isConnected) {
      const co = parseFloat(css("--canvas-op", "0.85")) || 0.85;
      hero.style.opacity = String(co * (0.42 + 0.58 * heroVis));
      if (heroVis > 0.02) drawHero(hero);
    }
    if (flow && flow.isConnected) {
      flow.style.opacity = ((parseFloat(css("--canvas-op", "0.85")) || 0.85) * (1 - heroVis)).toFixed(3);
      if (heroVis < 0.98) drawFlow(flow);
    }
  };
  loop();
}

/** Forces the next frame to re-sample theme colors (call on theme toggle). */
export function refreshBackgroundColors() {
  if (typeof window === "undefined") return;
  if (window.__pfBgEngine) window.__pfBgEngine.readColors = true;
}
