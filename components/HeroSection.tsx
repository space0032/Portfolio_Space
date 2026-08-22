"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import SectionShell from "@/components/hud/SectionShell";
import HudLabel from "@/components/hud/HudLabel";
import Typewriter from "@/components/effects/Typewriter";

const roles = [
  "Backend Developer",
  "DevOps Engineer",
  "Full Stack Developer",
  "Software Engineer",
];

const bootLines = [
  { text: "antariksh --identity", kind: "cmd" },
  { text: "> role: BACKEND_DEVELOPER", kind: "out" },
  { text: "> stack: JAVA · REACT · DEVOPS", kind: "out" },
  { text: "> clearance: MS_DEVOPS_EXPERT", kind: "out" },
  { text: "> status: OPEN_TO_MISSIONS", kind: "ok" },
];

const stats = [
  { label: "Missions Deployed", value: 8, suffix: "+", color: "#d4af6a" },
  { label: "Certifications", value: 3, suffix: "+", color: "#9b7fe0" },
  { label: "Stack Systems", value: 15, suffix: "+", color: "#f0cd8a" },
];

const useCountUp = (end: number, duration: number = 1500, startCounting: boolean = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;
    let startTime: number | null = null;
    let animationFrame: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, startCounting]);

  return count;
};

const StatTag = ({ stat, startStats }: { stat: { label: string; value: number; suffix: string; color: string }; startStats: boolean }) => {
  const count = useCountUp(stat.value, 1500, startStats);
  return (
    <div className="hud-panel px-5 py-3">
      <div className="font-mono text-2xl font-bold" style={{ color: stat.color }}>
        {count}
        <span className="opacity-70">{stat.suffix}</span>
      </div>
      <div className="hud-label mt-1 text-text-muted">{stat.label}</div>
    </div>
  );
};

const HeroSection = () => {
  const [bootLineIndex, setBootLineIndex] = useState(0);
  const [showBoot, setShowBoot] = useState(false);
  const [startStats, setStartStats] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowBoot(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showBoot) return;
    if (bootLineIndex < bootLines.length) {
      const timer = setTimeout(() => setBootLineIndex((prev) => prev + 1), 450);
      return () => clearTimeout(timer);
    } else {
      setStartStats(true);
    }
  }, [bootLineIndex, showBoot]);

  return (
    <SectionShell
      id="home"
      index={1}
      code="IDENT"
      name="Identification"
      accent="#d4af6a"
      overlay={
        <motion.div
          className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 cursor-pointer flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          onClick={() => {
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="hud-label text-text-muted">Descend</span>
          <div className="flex h-8 w-5 items-start justify-center border border-white/25 pt-1.5">
            <motion.div
              className="h-2 w-1"
              style={{ backgroundColor: "#f0cd8a", boxShadow: "0 0 8px #d4af6a" }}
              animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      }
    >
      <div className="grid items-center gap-14 lg:grid-cols-2">
        {/* Left — identity */}
        <div>
          <motion.div
            className="mb-6 flex items-center gap-3"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <HudLabel accent="#d4af6a">System Boot · Welcome Aboard</HudLabel>
          </motion.div>

          <motion.h1
            className="mb-5 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span className="hud-label mb-3 block text-text-muted">Operator Name</span>
            <span className="animate-shine bg-gradient-to-r from-parchment via-arcane to-gold-bright bg-clip-text bg-[length:220%_auto] text-transparent">
              ANTARIKSH
            </span>
          </motion.h1>

          <motion.div
            className="mb-7 flex h-9 items-center font-mono text-base sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="mr-3 text-gold">✦</span>
            <span className="text-text-secondary">
              <Typewriter phrases={roles} />
            </span>
          </motion.div>

          <motion.p
            className="mb-9 max-w-lg text-lg italic leading-relaxed text-slate"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Microsoft Certified DevOps Engineer Expert — deploying resilient, scalable
            systems with Java, React &amp; Cloud. Bridging development and operations,
            mission after mission.
          </motion.p>

          <motion.div
            className="mb-12 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <motion.button
              onClick={() => {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="cursor-pointer bg-gradient-to-br from-arcane to-arcane-dim px-7 py-3 font-mono text-xs font-semibold uppercase tracking-widest text-void transition-shadow hover:shadow-[0_0_26px_rgba(155,127,224,0.55)]"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
            >
              Initiate Contact
            </motion.button>
            <motion.button
              onClick={() => {
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="cursor-pointer border border-line-bright px-7 py-3 font-mono text-xs font-semibold uppercase tracking-widest text-gold-bright transition-colors hover:border-gold hover:bg-gold/[0.06]"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
            >
              View Archive
            </motion.button>
          </motion.div>

          {/* Stats tags */}
          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            {stats.map((stat) => (
              <StatTag key={stat.label} stat={stat} startStats={startStats} />
            ))}
          </motion.div>
        </div>

        {/* Right — boot log terminal */}
        <motion.div
          className="hidden lg:block"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="hud-panel overflow-hidden shadow-2xl shadow-arcane/5">
            <div className="flex items-center gap-2 border-b border-line px-5 py-3">
              <span className="hud-label text-text-muted">boot_log.ts</span>
              <span className="ml-auto flex items-center gap-2">
                <span className="hud-label text-text-muted/70">LIVE</span>
                <span className="status-dot" style={{ color: "#d4af6a" }} />
              </span>
            </div>
            <div className="scanlines" />
            <div className="relative p-6 font-mono text-sm">
              <div className="space-y-3">
                {bootLines.slice(0, bootLineIndex).map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className={
                      line.kind === "cmd"
                        ? "text-gold"
                        : line.kind === "ok"
                        ? "text-gold-bright"
                        : "text-text-secondary"
                    }
                  >
                    {line.text}
                  </motion.div>
                ))}
                {bootLineIndex < bootLines.length && (
                  <div className="flex items-center">
                    <span className="mr-1 text-gold">❯</span>
                    <span className="cursor-blink" />
                  </div>
                )}
                {bootLineIndex >= bootLines.length && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-4 border-t border-line pt-3"
                  >
                    <span className="syntax-comment">{"// Mission ready. Awaiting deployment orders."}</span>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionShell>
  );
};

export default HeroSection;
