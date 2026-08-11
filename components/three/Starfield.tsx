"use client";

import { useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { sceneState } from "@/lib/three";

export default function Starfield() {
  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const speed = 0.02 * sceneState.starSpeed;
    ref.current.rotation.y += delta * speed;
    ref.current.rotation.z += delta * speed * 0.3;
  });

  return (
    <group ref={ref}>
      <Stars radius={60} depth={40} count={2800} factor={4} saturation={0} fade speed={0.4} />
    </group>
  );
}
