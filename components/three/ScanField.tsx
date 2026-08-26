"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo, useRef } from "react";

import { buildField, COUNT, COUNT_COMPACT, STAGES } from "@/lib/field";
import { scan } from "@/lib/scan";
import { nodes, edges } from "@/content/graph";
import { readTokens } from "@/lib/tokens";

const VERT = /* glsl */ `
  attribute vec3 aTo;
  attribute float aSeed;

  uniform float uMix;
  uniform float uTime;
  uniform float uScanY;
  uniform float uSize;
  uniform float uDpr;

  varying float vBright;
  varying float vSeed;

  void main() {
    float m = uMix * uMix * (3.0 - 2.0 * uMix);
    vec3 p = mix(position, aTo, m);

    // Respiration : lente, à la limite du perceptible.
    p += vec3(
      sin(uTime * 0.55 + aSeed * 30.0),
      sin(uTime * 0.41 + aSeed * 17.0),
      cos(uTime * 0.47 + aSeed * 23.0)
    ) * 0.05;

    // Le faisceau : ce qu'il traverse s'allume et se soulève.
    float d = abs(p.y - uScanY);
    float hit = smoothstep(0.46, 0.0, d);
    p.y += hit * 0.12;

    vBright = hit;
    vSeed = aSeed;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (uSize * (0.5 + aSeed * 1.0) * (1.0 + hit * 1.8)) / max(0.001, -mv.z) * uDpr;
  }
`;

const FRAG = /* glsl */ `
  precision highp float;

  uniform vec3 uIce;
  uniform vec3 uFlux;
  uniform vec3 uAlert;
  uniform float uOpacity;

  varying float vBright;
  varying float vSeed;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = dot(c, c);
    if (d > 0.25) discard;
    float a = smoothstep(0.25, 0.0, d);

    // Un point sur cent est ambre : les constats critiques d'un rapport.
    float critical = step(0.988, vSeed);
    vec3 base = mix(uIce * 0.5, uAlert, critical);
    vec3 col = mix(base, uFlux, vBright * 0.92);

    gl_FragColor = vec4(col, a * uOpacity * (0.34 + vBright * 0.8));
  }
`;

function Field({ compact }: { compact: boolean }) {
  const { gl } = useThree();
  const count = compact ? COUNT_COMPACT : COUNT;
  const groupRef = useRef<THREE.Group>(null);
  const lineRef = useRef<THREE.LineSegments>(null);
  const beamRef = useRef<THREE.Mesh>(null);
  const currentStage = useRef(-1);

  const tokens = useMemo(() => readTokens(), []);
  const field = useMemo(() => buildField(count), [count]);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(field.stages[0].slice(), 3));
    g.setAttribute("aTo", new THREE.BufferAttribute(field.stages[1].slice(), 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(field.seeds, 1));
    g.setDrawRange(0, count);
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 20);
    return g;
  }, [field, count]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uMix: { value: 0 },
          uTime: { value: 0 },
          uScanY: { value: 0 },
          uSize: { value: compact ? 34 : 30 },
          uDpr: { value: Math.min(gl.getPixelRatio(), 2) },
          uOpacity: { value: 1 },
          uIce: { value: new THREE.Color(tokens.ice || "#e6f0f2") },
          uFlux: { value: new THREE.Color(tokens.flux || "#00e5a0") },
          uAlert: { value: new THREE.Color(tokens.alert || "#ff7a1a") },
        },
      }),
    [tokens, gl, compact],
  );

  /* Les arêtes du vrai graphe : elles n'apparaissent qu'au dernier état,
     quand le nuage s'est posé sur la constellation. */
  const lineGeometry = useMemo(() => {
    const index = new Map(nodes.map((n, i) => [n.id, i]));
    const pts: number[] = [];
    for (const e of edges) {
      const a = nodes[index.get(e.from)!];
      const b = nodes[index.get(e.to)!];
      pts.push(a.pos[0] * 1.18, a.pos[1] * 1.18, a.pos[2] * 1.18);
      pts.push(b.pos[0] * 1.18, b.pos[1] * 1.18, b.pos[2] * 1.18);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    return g;
  }, []);

  const lineMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color(tokens.flux || "#00e5a0"),
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [tokens],
  );

  const points = useMemo(() => new THREE.Points(geometry, material), [geometry, material]);

  useFrame(({ clock, camera }, delta) => {
    const t = clock.elapsedTime;
    const stage = Math.min(STAGES - 1.001, Math.max(0, scan.stage));
    const from = Math.floor(stage);
    const mix = stage - from;

    /* Les tampons ne sont recopiés qu'au franchissement d'un état,
       jamais à chaque frame. */
    if (from !== currentStage.current) {
      currentStage.current = from;
      const pos = geometry.getAttribute("position") as THREE.BufferAttribute;
      const to = geometry.getAttribute("aTo") as THREE.BufferAttribute;
      (pos.array as Float32Array).set(field.stages[from]);
      (to.array as Float32Array).set(field.stages[Math.min(STAGES - 1, from + 1)]);
      pos.needsUpdate = true;
      to.needsUpdate = true;
    }

    material.uniforms.uMix.value = mix;
    material.uniforms.uTime.value = t;

    /* Le champ recule à mesure que les sections deviennent denses en texte.
       Le spectacle appartient à l'ouverture ; ensuite c'est le contenu qui lit. */
    const dense = Math.max(0, Math.min(1, (stage - 2.0) / 1.3));
    material.uniforms.uOpacity.value = THREE.MathUtils.lerp(
      material.uniforms.uOpacity.value,
      1 - dense * 0.52,
      Math.min(1, delta * 3),
    );

    /* Le faisceau balaie de haut en bas, en continu. */
    const beamY = 6.4 - ((t * 1.45) % 12.8);
    material.uniforms.uScanY.value = beamY;
    if (beamRef.current) {
      beamRef.current.position.y = beamY;
      const mat = beamRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.42 + Math.sin(t * 2.4) * 0.1;
    }

    lineMaterial.opacity = THREE.MathUtils.lerp(
      lineMaterial.opacity,
      Math.max(0, Math.min(1, (stage - 3.35) / 0.55)) * 0.5,
      Math.min(1, delta * 4),
    );

    if (groupRef.current) {
      /* Parallaxe pointeur, très amortie : la scène respire, elle ne suit pas. */
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        scan.px * 0.22 + Math.sin(t * 0.06) * 0.14,
        Math.min(1, delta * 1.6),
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -scan.py * 0.12,
        Math.min(1, delta * 1.6),
      );
    }

    /* La caméra recule à mesure que le scan progresse. */
    const target = 9.2 + scan.progress * 3.4;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, target, Math.min(1, delta * 2));
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      scan.py * 0.35,
      Math.min(1, delta * 2),
    );
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={groupRef} scale={compact ? 0.72 : 1}>
      <primitive object={points} />
      <lineSegments ref={lineRef} geometry={lineGeometry} material={lineMaterial} />
      {/* Le trait du faisceau : une ligne, pas une nappe — une nappe additive
          voilerait toute la page. */}
      <mesh ref={beamRef}>
        <planeGeometry args={[30, 0.035]} />
        <meshBasicMaterial
          color={tokens.flux || "#00e5a0"}
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

export default function ScanField({
  active,
  compact = false,
}: {
  active: boolean;
  compact?: boolean;
}) {
  return (
    <Canvas
      dpr={compact ? [1, 1.5] : [1, 2]}
      gl={{ antialias: false, powerPreference: "high-performance", alpha: true }}
      camera={{ fov: 46, position: [0, 0, 9.2] }}
      frameloop={active ? "always" : "never"}
    >
      <Field compact={compact} />
    </Canvas>
  );
}
