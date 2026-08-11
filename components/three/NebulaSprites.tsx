"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function makeGlowTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.35, "rgba(255,255,255,0.45)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

const NEBULAS = [
  { color: "#00f0ff", position: [-9, 4, -14], scale: [30, 30, 1], opacity: 0.16 },
  { color: "#8b5cf6", position: [9, -3, -12], scale: [26, 26, 1], opacity: 0.14 },
  { color: "#f59e0b", position: [6, 6, -18], scale: [22, 22, 1], opacity: 0.1 },
] as const;

export default function NebulaSprites() {
  const texture = useMemo(makeGlowTexture, []);
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.03) * 0.08;
  });

  return (
    <group ref={group}>
      {NEBULAS.map((nebula, i) => (
        <sprite
          key={i}
          position={nebula.position as [number, number, number]}
          scale={nebula.scale as [number, number, number]}
        >
          <spriteMaterial
            map={texture}
            color={nebula.color}
            transparent
            opacity={nebula.opacity}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </sprite>
      ))}
    </group>
  );
}
