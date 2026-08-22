import { motionValue, type MotionValue } from "framer-motion";

/** Shared DOM↔3D scroll progress (0..1), synced every frame by ScrollRig. */
export const scrollProgress: MotionValue<number> = motionValue(0);

/** Index of the current section waypoint (0..5), synced by ScrollRig. */
export const activeSection: MotionValue<number> = motionValue(0);

/** Human-readable metadata for the six sectors. */
export const SECTORS = [
  { index: 1, code: "IDENT", name: "Identification", color: "#d4af6a" },
  { index: 2, code: "PROFILE", name: "Mission Log", color: "#9b7fe0" },
  { index: 3, code: "SYSTEMS", name: "Tech Inventory", color: "#f0cd8a" },
  { index: 4, code: "LOG", name: "Flight Record", color: "#c15b4a" },
  { index: 5, code: "ARCHIVE", name: "Project Archive", color: "#b79df0" },
  { index: 6, code: "TRANSMISSION", name: "Comms", color: "#d4af6a" },
] as const;

type SceneHandler = (payload?: unknown) => void;

const listeners = new Map<string, Set<SceneHandler>>();

/**
 * Tiny typed pub/sub bridging the DOM (skill/project cards) and the 3D scene.
 * Events: "highlight" { id: string }, "clear" undefined.
 */
export const sceneEvents = {
  on(event: string, handler: SceneHandler) {
    if (!listeners.has(event)) listeners.set(event, new Set());
    listeners.get(event)!.add(handler);
    return () => sceneEvents.off(event, handler);
  },
  off(event: string, handler: SceneHandler) {
    listeners.get(event)?.delete(handler);
  },
  emit(event: string, payload?: unknown) {
    listeners.get(event)?.forEach((h) => h(payload));
  },
};

/** Holds the scroll container element created by drei ScrollControls. */
export const scrollControlsStore: { el: HTMLElement | null } = { el: null };
