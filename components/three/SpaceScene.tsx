"use client";

import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll } from "@react-three/drei";
import { Suspense, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import ScrollRig from "./ScrollRig";
import ScrollBridge from "./ScrollBridge";
import Starfield from "./Starfield";
import NebulaSprites from "./NebulaSprites";
import TechOrbs from "./TechOrbs";
import CentralObject from "./CentralObject";
import {
  ProfileObject,
  SystemCore,
  FlightPath,
  ProjectOrbits,
  SignalBeacon,
} from "./SectionObjects";

const DEFAULT_PAGES = 9;

export default function SpaceScene({ children }: { children: ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState(DEFAULT_PAGES);

  const measure = useCallback(() => {
    if (!contentRef.current || typeof window === "undefined") return;
    const next = Math.max(3, Math.ceil(contentRef.current.scrollHeight / window.innerHeight));
    setPages((prev) => (prev === next ? prev : next));
  }, []);

  useEffect(() => {
    measure();
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(measure, 200);
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, [measure]);

  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 12], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#08060f"]} />
        <fog attach="fog" args={["#08060f", 18, 46]} />
        <hemisphereLight args={["#9b7fe0", "#08060f", 0.6]} />
        <ambientLight intensity={0.35} />
        <pointLight position={[12, 10, 10]} intensity={180} color="#d4af6a" />
        <pointLight position={[-12, -8, 6]} intensity={180} color="#9b7fe0" />

        <Suspense fallback={null}>
          <ScrollControls pages={pages} distance={1} damping={0.25}>
            <ScrollBridge />
            <ScrollRig />
            <Starfield />
            <NebulaSprites />
            <CentralObject />
            <ProfileObject />
            <SystemCore />
            <TechOrbs />
            <FlightPath />
            <ProjectOrbits />
            <SignalBeacon />
            <Scroll html style={{ width: "100%" }}>
              <div ref={contentRef} className="relative z-10 w-full">
                {children}
              </div>
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>

      {/* Readability vignette over the 3D scene */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
            background:
              "radial-gradient(ellipse at center, transparent 45%, rgba(4,2,10,0.6) 100%)",
        }}
      />
    </div>
  );
}
