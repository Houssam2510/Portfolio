"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo, useRef } from "react";

import { scan } from "@/lib/scan";
import { nodes, edges } from "@/content/graph";
import { readTokens } from "@/lib/tokens";

/**
 * LE RELIEF — le fond du site.
 *
 * Un scan ne rend pas un nuage de points : il rend une coupe. Le fond est donc
 * une carte de relief tracée en lignes de niveau, qui respire lentement. Au
 * dernier écran, les nœuds du vrai graphe de dépendances se posent dessus,
 * comme des sommets relevés sur une carte.
 *
 * Un seul draw call pour toute la nappe : une LineSegments unique, dont la
 * hauteur est calculée dans le vertex shader. Rien n'est recalculé côté CPU.
 */
const LINES = 58;
const SEGMENTS = 190;
const SPAN_X = 30;
const SPAN_Z = 22;

const RELIEF = /* glsl */ `
  float relief(vec2 q, float t) {
    float h = 0.0;
    h += sin(q.x * 0.29 + t * 0.21) * 0.95;
    h += sin(q.y * 0.37 - t * 0.17) * 0.72;
    h += sin((q.x * 0.61 + q.y * 0.43) + t * 0.13) * 0.46;
    h += sin((q.x * 0.97 - q.y * 0.79) - t * 0.11) * 0.24;
    h += sin((q.x * 1.63 + q.y * 1.31) + t * 0.09) * 0.12;
    return h;
  }
`;

const VERT = /* glsl */ `
  uniform float uTime;
  uniform float uAmp;
  uniform float uFocus;

  varying float vHeight;
  varying float vFade;
  varying float vFocus;

  ${RELIEF}

  void main() {
    vec3 p = position;
    float h = relief(p.xz, uTime);
    p.y = h * uAmp;

    vHeight = h;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);

    // Les lignes s'effacent au loin et sur les bords : la nappe n'a pas de bord franc.
    float far = smoothstep(-34.0, -9.0, mv.z);
    float side = 1.0 - smoothstep(7.5, 15.0, abs(p.x));
    vFade = far * side;

    // La bande de lecture : elle glisse sur la nappe et éclaire ce qu'elle traverse.
    vFocus = smoothstep(2.4, 0.0, abs(p.z - uFocus));

    gl_Position = projectionMatrix * mv;
  }
`;

const FRAG = /* glsl */ `
  precision highp float;

  uniform vec3 uPaper;
  uniform vec3 uAccent;
  uniform float uOpacity;

  varying float vHeight;
  varying float vFade;
  varying float vFocus;

  void main() {
    // Les crêtes prennent l'accent, les creux restent sourds.
    float ridge = smoothstep(0.7, 1.9, vHeight);
    vec3 col = mix(uPaper, uAccent, ridge * 0.55 * (0.35 + vFocus));

    float a = vFade * uOpacity * (0.11 + ridge * 0.17 + vFocus * 0.24);
    if (a < 0.002) discard;
    gl_FragColor = vec4(col, a);
  }
`;

function Relief() {
  const { gl } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const tokens = useMemo(() => readTokens(), []);

  /* La grille est construite une fois. Seule la hauteur bouge, dans le GPU. */
  const geometry = useMemo(() => {
    const pts: number[] = [];
    for (let l = 0; l < LINES; l++) {
      const z = (l / (LINES - 1) - 0.5) * SPAN_Z;
      for (let s = 0; s < SEGMENTS; s++) {
        const x0 = (s / SEGMENTS - 0.5) * SPAN_X;
        const x1 = ((s + 1) / SEGMENTS - 0.5) * SPAN_X;
        pts.push(x0, 0, z, x1, 0, z);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 40);
    return g;
  }, []);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uAmp: { value: 0.9 },
          uFocus: { value: 0 },
          uOpacity: { value: 1 },
          uPaper: { value: new THREE.Color(tokens.paper || "#edece9") },
          uAccent: { value: new THREE.Color(tokens.accent || "#00e5a0") },
        },
      }),
    [tokens],
  );

  /* Les sommets relevés : les nœuds du vrai graphe, posés sur la nappe. */
  const marks = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(nodes.length * 3);
    const size = new Float32Array(nodes.length);
    nodes.forEach((n, i) => {
      pos[i * 3] = n.pos[0] * 1.35;
      pos[i * 3 + 1] = 0;
      pos[i * 3 + 2] = n.pos[1] * 0.55;
      size[i] = n.size;
    });
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 40);
    return g;
  }, []);

  const markMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uAmp: { value: 0.9 },
          uOpacity: { value: 0 },
          uDpr: { value: Math.min(gl.getPixelRatio(), 2) },
          uAccent: { value: new THREE.Color(tokens.accent || "#00e5a0") },
        },
        vertexShader: /* glsl */ `
          attribute float aSize;
          uniform float uTime;
          uniform float uAmp;
          uniform float uDpr;
          varying float vSize;
          ${RELIEF}
          void main() {
            vec3 p = position;
            p.y = relief(p.xz, uTime) * uAmp + 0.16;
            vSize = aSize;
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_Position = projectionMatrix * mv;
            gl_PointSize = (150.0 * (0.45 + aSize * 0.8)) / max(0.001, -mv.z) * uDpr;
          }
        `,
        fragmentShader: /* glsl */ `
          precision highp float;
          uniform vec3 uAccent;
          uniform float uOpacity;
          varying float vSize;
          void main() {
            vec2 c = gl_PointCoord - 0.5;
            float d = length(c);
            if (d > 0.5) discard;
            // Un point net, cerclé d'un halo léger. Pas une boule floue.
            float core = smoothstep(0.13, 0.07, d);
            float halo = smoothstep(0.5, 0.1, d) * 0.22;
            gl_FragColor = vec4(uAccent, (core + halo) * uOpacity);
          }
        `,
      }),
    [tokens, gl],
  );

  const edgeGeometry = useMemo(() => {
    const index = new Map(nodes.map((n, i) => [n.id, i]));
    const pts: number[] = [];
    for (const e of edges) {
      const a = nodes[index.get(e.from)!];
      const b = nodes[index.get(e.to)!];
      pts.push(a.pos[0] * 1.35, 0, a.pos[1] * 0.55);
      pts.push(b.pos[0] * 1.35, 0, b.pos[1] * 0.55);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 40);
    return g;
  }, []);

  const edgeMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uAmp: { value: 0.9 },
          uOpacity: { value: 0 },
          uAccent: { value: new THREE.Color(tokens.accent || "#00e5a0") },
        },
        vertexShader: /* glsl */ `
          uniform float uTime;
          uniform float uAmp;
          ${RELIEF}
          void main() {
            vec3 p = position;
            p.y = relief(p.xz, uTime) * uAmp + 0.16;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          precision highp float;
          uniform vec3 uAccent;
          uniform float uOpacity;
          void main() { gl_FragColor = vec4(uAccent, uOpacity); }
        `,
      }),
    [tokens],
  );

  const relief = useMemo(
    () => new THREE.LineSegments(geometry, material),
    [geometry, material],
  );
  const marksObj = useMemo(
    () => new THREE.Points(marks, markMaterial),
    [marks, markMaterial],
  );
  const edgesObj = useMemo(
    () => new THREE.LineSegments(edgeGeometry, edgeMaterial),
    [edgeGeometry, edgeMaterial],
  );

  useFrame(({ clock, camera }, delta) => {
    const t = clock.elapsedTime;
    const p = scan.progress;
    const k = Math.min(1, delta * 1.6);

    material.uniforms.uTime.value = t;
    markMaterial.uniforms.uTime.value = t;
    edgeMaterial.uniforms.uTime.value = t;

    /* Le relief s'aplanit à mesure qu'on descend : la page se calme. */
    const amp = 0.9 - p * 0.28;
    material.uniforms.uAmp.value = amp;
    markMaterial.uniforms.uAmp.value = amp;
    edgeMaterial.uniforms.uAmp.value = amp;

    /* La bande de lecture parcourt la nappe, en continu. */
    material.uniforms.uFocus.value = 9 - ((t * 0.75) % 22);

    /* Les sommets relevés n'apparaissent que sur le dernier écran. */
    const reveal = Math.max(0, Math.min(1, (scan.stage - 3.1) / 0.7));
    markMaterial.uniforms.uOpacity.value = THREE.MathUtils.lerp(
      markMaterial.uniforms.uOpacity.value,
      reveal,
      k,
    );
    edgeMaterial.uniforms.uOpacity.value = THREE.MathUtils.lerp(
      edgeMaterial.uniforms.uOpacity.value,
      reveal * 0.5,
      k,
    );
    material.uniforms.uOpacity.value = THREE.MathUtils.lerp(
      material.uniforms.uOpacity.value,
      1 - reveal * 0.25,
      k,
    );

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        scan.px * 0.06,
        Math.min(1, delta * 0.9),
      );
    }

    /* La caméra descend vers la nappe pendant la lecture. */
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 2.5 - p * 1.3, k);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 8.6 - p * 1.6, k);
    camera.lookAt(0, -0.5, -3.2);
  });

  return (
    <group ref={groupRef} rotation={[0, 0, 0]}>
      <primitive object={relief} />
      <primitive object={edgesObj} />
      <primitive object={marksObj} />
    </group>
  );
}

export default function ReliefField({ active }: { active: boolean }) {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
      camera={{ fov: 42, position: [0, 2.5, 8.6] }}
      frameloop={active ? "always" : "never"}
    >
      <Relief />
    </Canvas>
  );
}
