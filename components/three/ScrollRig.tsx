"use client";

import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { sampleScene, sceneState, sectorIndexAt } from "@/lib/three";
import { scrollProgress, activeSection } from "@/lib/dom";

const CAMERA_LAMBDA = 4;

export default function ScrollRig() {
  const scroll = useScroll();
  const pos = useMemo(() => new THREE.Vector3(0, 0, 12), []);
  const look = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    sampleScene(0);
  }, []);

  useFrame((state, delta) => {
    sampleScene(scroll.offset);
    scrollProgress.set(scroll.offset);
    activeSection.set(sectorIndexAt(scroll.offset));

    if (typeof document !== "undefined") {
      const el = document.documentElement;
      el.style.setProperty("--section-accent", sceneState.color.getStyle());
    }

    const alpha = 1 - Math.exp(-CAMERA_LAMBDA * delta);
    pos.lerp(sceneState.cameraTarget, alpha);
    look.lerp(sceneState.lookAtTarget, alpha);

    state.camera.position.copy(pos);
    const t = state.clock.elapsedTime;
    state.camera.lookAt(
      look.x + Math.sin(t * 0.25) * 0.4,
      look.y + Math.cos(t * 0.21) * 0.3,
      look.z
    );
  });

  return null;
}
