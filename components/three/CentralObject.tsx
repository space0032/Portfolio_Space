"use client";

import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import { MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { sceneState } from "@/lib/three";

export default function CentralObject() {
  const scroll = useScroll();
  const group = useRef<THREE.Group>(null);
  const matRef = useRef<React.ElementRef<typeof MeshDistortMaterial>>(null);

  useFrame((state, delta) => {
    if (matRef.current) {
      matRef.current.color.copy(sceneState.color);
      matRef.current.distort = THREE.MathUtils.lerp(
        matRef.current.distort,
        sceneState.distort,
        1 - Math.exp(-3 * delta)
      );
    }
    if (group.current) {
      group.current.rotation.y += delta * 0.18;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.15;
    }
  });

  return (
    <group ref={group} visible={scroll.visible(0, 0.14)}>
      <mesh>
        <torusKnotGeometry args={[0.95, 0.32, 200, 32]} />
        <MeshDistortMaterial
          ref={matRef}
          color="#d4af6a"
          emissive="#9b7fe0"
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={0.3}
          distort={0.3}
          speed={2}
        />
      </mesh>
      <Sparkles count={120} scale={[7, 5, 7]} size={3.2} speed={0.35} color="#f0cd8a" opacity={0.6} />
    </group>
  );
}
