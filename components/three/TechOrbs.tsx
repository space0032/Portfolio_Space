"use client";

import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import { Instances, Instance } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { TECHS, sceneState } from "@/lib/three";
import { sceneEvents } from "@/lib/dom";

interface Orbit {
  radius: number;
  speed: number;
  phase: number;
  yAmp: number;
  size: number;
}

export default function TechOrbs() {
  const scroll = useScroll();
  const highlight = useRef<string | null>(null);
  const refs = useRef<Array<THREE.Object3D | null>>([]);

  const orbits = useMemo<Orbit[]>(
    () =>
      TECHS.map((_, i) => {
        const angle = (i / TECHS.length) * Math.PI * 2;
        return {
          radius: 3.1 + (i % 3) * 0.45,
          speed: 0.5 + (i % 4) * 0.18,
          phase: angle,
          yAmp: 1.1 + (i % 3) * 0.35,
          size: 0.2 + (i % 3) * 0.04,
        };
      }),
    []
  );

  useEffect(() => {
    const offHl = sceneEvents.on("highlight", (payload) => {
      highlight.current = (payload as { id?: string } | undefined)?.id ?? null;
    });
    const offCl = sceneEvents.on("clear", () => {
      highlight.current = null;
    });
    return () => {
      offHl();
      offCl();
    };
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const scale = sceneState.orbRadius;
    const speedMul = sceneState.orbSpeed;

    refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const o = orbits[i];
      const a = t * o.speed * speedMul + o.phase;
      mesh.position.set(
        Math.cos(a) * o.radius * scale,
        Math.sin(a * 0.8 + o.phase) * o.yAmp,
        Math.sin(a) * o.radius * scale
      );
      mesh.rotation.y = a;
      const isHot = highlight.current === TECHS[i].name;
      mesh.scale.setScalar(o.size * (isHot ? 2.6 : 1));
      const mat = (mesh as THREE.Mesh).material as THREE.MeshStandardMaterial;
      if (mat) mat.emissiveIntensity = isHot ? 1.6 : 0.5;
    });
  });

  return (
    <group visible={scroll.visible(0.24, 0.48)}>
      <Instances limit={TECHS.length} range={TECHS.length}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#ece3d0"
          emissive="#ece3d0"
          emissiveIntensity={0.5}
          roughness={0.35}
          metalness={0.2}
        />
        {TECHS.map((tech, i) => (
          <Instance
            key={tech.name}
            color={tech.color}
            ref={(el) => {
              refs.current[i] = el as unknown as THREE.Object3D | null;
            }}
          />
        ))}
      </Instances>
    </group>
  );
}
