import * as THREE from "three";

export interface SectionWaypoint {
  /** Normalized scroll offset (0..1) where this waypoint is exact */
  at: number;
  camera: [number, number, number];
  lookAt: [number, number, number];
  color: string;
  distort: number;
  orbRadius: number;
  orbSpeed: number;
  starSpeed: number;
}

export const WAYPOINTS: SectionWaypoint[] = [
  { at: 0.0, camera: [0, 0, 12], lookAt: [0, 0, 0], color: "#00f0ff", distort: 0.3, orbRadius: 0.9, orbSpeed: 0.4, starSpeed: 0.5 },
  { at: 0.16, camera: [5.5, 2.2, 8], lookAt: [0, 0, 0], color: "#8b5cf6", distort: 0.42, orbRadius: 1.1, orbSpeed: 0.6, starSpeed: 0.8 },
  { at: 0.33, camera: [-5.5, 3.2, 8.5], lookAt: [0, 0, 0], color: "#10b981", distort: 0.58, orbRadius: 1.4, orbSpeed: 0.75, starSpeed: 1.0 },
  { at: 0.5, camera: [0, 5.2, 9.5], lookAt: [0, 0, 0], color: "#f59e0b", distort: 0.38, orbRadius: 1.05, orbSpeed: 0.5, starSpeed: 0.6 },
  { at: 0.66, camera: [7.5, 0.8, 6.5], lookAt: [0, 0, 0], color: "#f43f5e", distort: 0.52, orbRadius: 1.3, orbSpeed: 0.7, starSpeed: 1.1 },
  { at: 0.84, camera: [0, -2.5, 14.5], lookAt: [0, 0, 0], color: "#00f0ff", distort: 0.24, orbRadius: 0.85, orbSpeed: 0.35, starSpeed: 0.4 },
];

export const TECHS: { name: string; color: string }[] = [
  { name: "Java", color: "#f89820" },
  { name: "React", color: "#61dafb" },
  { name: "TypeScript", color: "#3178c6" },
  { name: "Docker", color: "#2496ed" },
  { name: "AWS", color: "#ff9900" },
  { name: "Git", color: "#f05032" },
  { name: "Node.js", color: "#68a063" },
  { name: "Spring Boot", color: "#6db33f" },
];

const scratchA = new THREE.Color();
const scratchB = new THREE.Color();

function lerpHex(a: string, b: string, t: number): string {
  scratchA.set(a);
  scratchB.set(b);
  scratchA.lerp(scratchB, t);
  return `#${scratchA.getHexString()}`;
}

function sampleWaypoint(t: number): SectionWaypoint {
  if (t <= WAYPOINTS[0].at) return WAYPOINTS[0];
  const last = WAYPOINTS[WAYPOINTS.length - 1];
  if (t >= last.at) return last;

  for (let i = 0; i < WAYPOINTS.length - 1; i++) {
    const a = WAYPOINTS[i];
    const b = WAYPOINTS[i + 1];
    if (t >= a.at && t <= b.at) {
      const span = b.at - a.at || 1;
      const f = Math.min(1, Math.max(0, (t - a.at) / span));
      const ease = f * f * (3 - 2 * f); // smoothstep
      return {
        at: t,
        camera: [
          a.camera[0] + (b.camera[0] - a.camera[0]) * ease,
          a.camera[1] + (b.camera[1] - a.camera[1]) * ease,
          a.camera[2] + (b.camera[2] - a.camera[2]) * ease,
        ],
        lookAt: [
          a.lookAt[0] + (b.lookAt[0] - a.lookAt[0]) * ease,
          a.lookAt[1] + (b.lookAt[1] - a.lookAt[1]) * ease,
          a.lookAt[2] + (b.lookAt[2] - a.lookAt[2]) * ease,
        ],
        color: lerpHex(a.color, b.color, ease),
        distort: a.distort + (b.distort - a.distort) * ease,
        orbRadius: a.orbRadius + (b.orbRadius - a.orbRadius) * ease,
        orbSpeed: a.orbSpeed + (b.orbSpeed - a.orbSpeed) * ease,
        starSpeed: a.starSpeed + (b.starSpeed - a.starSpeed) * ease,
      };
    }
  }
  return last;
}

/** Live scene state updated every frame by ScrollRig, read by the 3D objects. */
export const sceneState = {
  cameraTarget: new THREE.Vector3(0, 0, 12),
  lookAtTarget: new THREE.Vector3(0, 0, 0),
  color: new THREE.Color("#00f0ff"),
  distort: 0.3,
  orbRadius: 0.9,
  orbSpeed: 0.4,
  starSpeed: 0.5,
};

export function sampleScene(t: number): void {
  const w = sampleWaypoint(t);
  sceneState.cameraTarget.set(...w.camera);
  sceneState.lookAtTarget.set(...w.lookAt);
  sceneState.color.set(w.color);
  sceneState.distort = w.distort;
  sceneState.orbRadius = w.orbRadius;
  sceneState.orbSpeed = w.orbSpeed;
  sceneState.starSpeed = w.starSpeed;
}

/** Holds the scroll container element created by drei ScrollControls. */
export const scrollControlsStore: { el: HTMLElement | null } = { el: null };
