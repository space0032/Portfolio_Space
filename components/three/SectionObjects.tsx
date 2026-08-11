"use client";

import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import { Line } from "@react-three/drei";
import { Sparkles } from "@react-three/drei";
import { Instances, Instance } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { sceneEvents } from "@/lib/dom";

/* ---------------------- SECTOR 02 · PROFILE ---------------------- */
export function ProfileObject() {
  const scroll = useScroll();
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = t * 0.25;
    group.current.rotation.x = Math.sin(t * 0.18) * 0.25;
  });

  return (
    <group
      ref={group}
      position={[4.2, 1.2, -0.5]}
      visible={scroll.visible(0.08, 0.32)}
    >
      <mesh>
        <icosahedronGeometry args={[1.2, 0]} />
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.55} />
      </mesh>
      <mesh rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[2.2, 0.02, 8, 80]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.35} />
      </mesh>
      <mesh rotation={[Math.PI / 1.8, 0.6, 0]}>
        <torusGeometry args={[1.9, 0.015, 8, 80]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

/* ---------------------- SECTOR 03 · SYSTEMS core ---------------------- */
export function SystemCore() {
  const scroll = useScroll();
  const core = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!core.current) return;
    const t = state.clock.elapsedTime;
    core.current.scale.setScalar(1 + Math.sin(t * 2) * 0.14);
  });

  return (
    <group visible={scroll.visible(0.24, 0.48)} position={[0, 0.2, 0]}>
      <mesh ref={core}>
        <octahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#10b981"
          emissiveIntensity={1.4}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>
      <Sparkles count={60} scale={[3, 3, 3]} size={2.5} speed={0.4} color="#10b981" opacity={0.6} />
    </group>
  );
}

/* ---------------------- SECTOR 04 · LOG flight path ---------------------- */
export function FlightPath() {
  const scroll = useScroll();

  const path = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-4.5, -1.6, -2),
      new THREE.Vector3(-2.6, 0.4, 0.2),
      new THREE.Vector3(0, 2.4, 1.6),
      new THREE.Vector3(2.6, 0.9, 0.1),
      new THREE.Vector3(4.5, -1.3, -1),
    ]);
    return {
      points: curve.getPoints(24),
      beacons: curve.getPoints(30).filter((_, i) => i % 6 === 0),
    };
  }, []);

  return (
    <group visible={scroll.visible(0.36, 0.64)}>
      <Line
        points={path.points}
        color="#f59e0b"
        lineWidth={1}
        transparent
        opacity={0.35}
      />
      {path.beacons.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshBasicMaterial color="#f59e0b" />
        </mesh>
      ))}
    </group>
  );
}

/* ---------------------- SECTOR 05 · ARCHIVE project orbs ---------------------- */
const ORBIT_COLORS = [
  "#00f0ff", "#8b5cf6", "#f59e0b", "#f43f5e",
  "#10b981", "#61dafb", "#f89820", "#3178c6",
];

export function ProjectOrbits() {
  const scroll = useScroll();
  const highlight = useRef<string | null>(null);
  const refs = useRef<Array<THREE.Object3D | null>>([]);

  const orbits = useMemo(
    () =>
      ORBIT_COLORS.map((_, i) => {
        const angle = (i / ORBIT_COLORS.length) * Math.PI * 2;
        return {
          radius: 3.4 + (i % 3) * 0.5,
          speed: 0.4 + (i % 4) * 0.14,
          phase: angle,
          yAmp: 1.2 + (i % 3) * 0.4,
          size: 0.22 + (i % 3) * 0.05,
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
    refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const o = orbits[i];
      const a = t * o.speed + o.phase;
      mesh.position.set(
        Math.cos(a) * o.radius,
        Math.sin(a * 0.8 + o.phase) * o.yAmp,
        Math.sin(a) * o.radius
      );
      mesh.scale.setScalar(o.size * (highlight.current === String(i) ? 2.4 : 1));
    });
  });

  return (
    <group visible={scroll.visible(0.56, 0.78)}>
      <Instances limit={ORBIT_COLORS.length} range={ORBIT_COLORS.length}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.6}
          roughness={0.3}
          metalness={0.2}
        />
        {ORBIT_COLORS.map((color, i) => (
          <Instance
            key={color}
            color={color}
            ref={(el) => {
              refs.current[i] = el as unknown as THREE.Object3D | null;
            }}
          />
        ))}
      </Instances>
    </group>
  );
}

/* ---------------------- SECTOR 06 · TRANSMISSION beacon ---------------------- */
export function SignalBeacon() {
  const scroll = useScroll();
  const group = useRef<THREE.Group>(null);
  const rings = useRef<Array<THREE.Mesh | null>>([]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = t * 0.12;
    rings.current.forEach((ring, i) => {
      if (!ring) return;
      const cycle = (t * 0.4 + i / rings.current.length) % 1;
      ring.scale.setScalar(0.5 + cycle * 3.4);
      const mat = ring.material as THREE.MeshBasicMaterial;
      mat.opacity = (1 - cycle) * 0.45;
    });
  });

  return (
    <group ref={group} position={[0, 0.6, 2.2]} visible={scroll.visible(0.7, 0.98)}>
      <mesh>
        <icosahedronGeometry args={[0.65, 1]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={1.6}
          roughness={0.2}
        />
      </mesh>
      <Sparkles count={80} scale={[6, 6, 6]} size={3} speed={0.5} color="#00f0ff" opacity={0.7} />
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh
          key={i}
          ref={(el) => {
            rings.current[i] = el as unknown as THREE.Mesh | null;
          }}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <torusGeometry args={[1, 0.015, 8, 48]} />
          <meshBasicMaterial
            color="#00f0ff"
            transparent
            opacity={0.4}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}
