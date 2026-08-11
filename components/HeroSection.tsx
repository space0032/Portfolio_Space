"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import SectionShell from "@/components/hud/SectionShell";
import HudLabel from "@/components/hud/HudLabel";

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
  { label: "Missions Deployed", value: 8, suffix: "+", color: "#00f0ff" },
  { label: "Certifications", value: 3, suffix: "+", color: "#8b5cf6" },
  { label: "Stack Systems", value: 15, suffix: "+", color: "#f59e0b" },
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
  const [currentRole, setCurrentRole] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [bootLineIndex, setBootLineIndex] = useState(0);
  const [showBoot, setShowBoot] = useState(false);
  const [startStats, setStartStats] = useState(false);

  useEffect(() => {
    const currentText = roles[currentRole];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentText.length) {
          setDisplayedText(currentText.slice(0, displayedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(currentText.slice(0, displayedText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentRole]);

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
      accent="#00f0ff"
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
              style={{ backgroundColor: "#00f0ff", boxShadow: "0 0 8px #00f0ff" }}
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
            <span className="status-dot" style={{ color: "#00f0ff" }} />
            <HudLabel accent="#00f0ff">System Boot · Welcome Aboard</HudLabel>
          </motion.div>

          <motion.h1
            className="mb-5 text-5xl font-extrabold leading-none tracking-tight sm:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span className="hud-label mb-3 block text-text-muted">Operator Name</span>
            <span className="animate-gradient-shift bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-cyan bg-clip-text bg-[length:200%_auto] text-transparent">
              ANTARIKSH
            </span>
          </motion.h1>

          <motion.div
            className="mb-7 flex h-9 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="mr-3 font-mono text-accent-cyan">&gt;</span>
            <span className="font-mono text-xl text-accent-violet sm:text-2xl">{displayedText}</span>
            <span className="cursor-blink" />
          </motion.div>

          <motion.p
            className="mb-9 max-w-lg text-lg leading-relaxed text-text-secondary"
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
              className="cursor-pointer bg-gradient-to-r from-accent-cyan to-accent-violet px-7 py-3 font-mono text-xs font-bold uppercase tracking-widest text-bg-primary transition-shadow hover:shadow-lg hover:shadow-accent-cyan/25"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
            >
              Initiate Contact
            </motion.button>
            <motion.button
              onClick={() => {
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="cursor-pointer border border-white/20 px-7 py-3 font-mono text-xs font-bold uppercase tracking-widest text-text-primary transition-colors hover:border-accent-cyan/50 hover:text-accent-cyan"
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
          <div className="hud-panel overflow-hidden shadow-2xl shadow-accent-cyan/5">
            <div className="flex items-center gap-2 border-b border-white/5 px-5 py-3">
              <span className="hud-label text-text-muted">boot_log.ts</span>
              <span className="ml-auto flex items-center gap-2">
                <span className="hud-label text-text-muted/70">LIVE</span>
                <span className="status-dot" style={{ color: "#00f0ff" }} />
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
                        ? "text-accent-cyan"
                        : line.kind === "ok"
                        ? "text-accent-emerald"
                        : "text-text-secondary"
                    }
                  >
                    {line.text}
                  </motion.div>
                ))}
                {bootLineIndex < bootLines.length && (
                  <div className="flex items-center">
                    <span className="mr-1 text-accent-cyan">❯</span>
                    <span className="cursor-blink" />
                  </div>
                )}
                {bootLineIndex >= bootLines.length && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-4 border-t border-white/5 pt-3"
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
