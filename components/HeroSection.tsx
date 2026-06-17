"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

const roles = [
  "Backend Developer",
  "DevOps Engineer",
  "Full Stack Developer",
  "Software Engineer",
];

const terminalLines = [
  { prefix: "const", keyword: " developer", operator: " = ", value: 'new SDE("Antariksh Mankar");' },
  { prefix: "developer", keyword: ".passion", operator: "  → ", value: '"Building scalable systems"' },
  { prefix: "developer", keyword: ".expertise", operator: " → ", value: '"Java · React · DevOps · Cloud"' },
  { prefix: "developer", keyword: ".status", operator: "   → ", value: '"Open to opportunities 🚀"' },
];

const stats = [
  { label: "Certifications", value: 3, suffix: "+" },
  { label: "Projects", value: 8, suffix: "+" },
  { label: "Technologies", value: 15, suffix: "+" },
];

// Count-up hook
const useCountUp = (end: number, duration: number = 2000, startCounting: boolean = false) => {
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

const StatItem = ({ stat, startStats }: { stat: { label: string; value: number; suffix: string }; startStats: boolean }) => {
  const count = useCountUp(stat.value, 1500, startStats);
  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-accent-cyan">
        {count}
        <span className="text-accent-violet">{stat.suffix}</span>
      </div>
      <div className="text-text-muted text-xs uppercase tracking-wider mt-1">
        {stat.label}
      </div>
    </div>
  );
};

const HeroSection = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [terminalLineIndex, setTerminalLineIndex] = useState(0);
  const [showTerminal, setShowTerminal] = useState(false);
  const [startStats, setStartStats] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const gridX = useTransform(mouseX, [0, typeof window !== "undefined" ? window.innerWidth : 1920], [-15, 15]);
  const gridY = useTransform(mouseY, [0, typeof window !== "undefined" ? window.innerHeight : 1080], [-15, 15]);

  // Typewriter effect for roles
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

  // Terminal lines animation
  useEffect(() => {
    const timer = setTimeout(() => setShowTerminal(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showTerminal) return;
    if (terminalLineIndex < terminalLines.length) {
      const timer = setTimeout(() => {
        setTerminalLineIndex((prev) => prev + 1);
      }, 600);
      return () => clearTimeout(timer);
    } else {
      setStartStats(true);
    }
  }, [terminalLineIndex, showTerminal]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  }, [mouseX, mouseY]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-bg grid-pattern"
      onMouseMove={handleMouseMove}
    >
      {/* Animated grid background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ x: gridX, y: gridY }}
      >
        <div className="absolute inset-0 grid-pattern opacity-50" />
      </motion.div>

      {/* Floating code snippets in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { text: "const app = express();", x: "10%", y: "20%", delay: 0 },
          { text: "docker build -t api .", x: "75%", y: "15%", delay: 2 },
          { text: "git push origin main", x: "80%", y: "70%", delay: 4 },
          { text: "@Autowired", x: "5%", y: "75%", delay: 1 },
          { text: "kubectl apply -f deploy.yaml", x: "60%", y: "85%", delay: 3 },
          { text: "npm run build", x: "20%", y: "55%", delay: 5 },
        ].map((snippet, i) => (
          <motion.div
            key={i}
            className="absolute font-mono text-xs text-accent-cyan/10 whitespace-nowrap select-none"
            style={{ left: snippet.x, top: snippet.y }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.05, 0.12, 0.05],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: snippet.delay,
              ease: "easeInOut",
            }}
          >
            {snippet.text}
          </motion.div>
        ))}
      </div>

      {/* Glowing orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0, 240, 255, 0.08) 0%, transparent 70%)",
            left: "10%",
            top: "20%",
          }}
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-80 h-80 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)",
            right: "10%",
            bottom: "20%",
          }}
          animate={{ x: [0, -40, 0], y: [0, -40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Text content */}
          <div>
            {/* Greeting */}
            <motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-12 h-px bg-gradient-to-r from-accent-cyan to-transparent" />
              <span className="text-accent-cyan font-mono text-sm tracking-wider uppercase">
                Welcome to my portfolio
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Hi, I&apos;m{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-cyan bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift">
                  Antariksh
                </span>
              </span>
            </motion.h1>

            {/* Animated role */}
            <motion.div
              className="text-xl sm:text-2xl lg:text-3xl text-text-secondary mb-8 h-10 flex items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <span className="text-text-muted mr-2">&gt;</span>
              <span className="text-accent-violet font-mono">
                {displayedText}
              </span>
              <span className="cursor-blink" />
            </motion.div>

            {/* Bio */}
            <motion.p
              className="text-text-secondary text-lg mb-8 max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Microsoft Certified DevOps Engineer Expert crafting scalable systems
              with Java, React & Cloud technologies. Passionate about bridging
              development and operations.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <motion.button
                onClick={() => {
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-accent-cyan to-accent-violet text-bg-primary font-semibold text-sm cursor-pointer hover:shadow-lg hover:shadow-accent-cyan/25 transition-shadow"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.button>
              <motion.button
                onClick={() => {
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-3.5 rounded-full border border-text-muted/30 text-text-primary font-semibold text-sm cursor-pointer hover:border-accent-cyan/50 hover:text-accent-cyan transition-colors"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
              </motion.button>
            </motion.div>

            {/* Social links */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              {[
                { name: "GitHub", url: "https://github.com/space0032", icon: (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                )},
                { name: "LinkedIn", url: "https://www.linkedin.com/in/antariksh-mankar/", icon: (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                )},
                { name: "Email", url: "mailto:antariksh.mankar43@gmail.com", icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )},
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target={social.name !== "Email" ? "_blank" : undefined}
                  rel={social.name !== "Email" ? "noopener noreferrer" : undefined}
                  className="w-11 h-11 rounded-full glass-card flex items-center justify-center text-text-secondary hover:text-accent-cyan transition-colors"
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right — Terminal window */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="code-window shadow-2xl shadow-accent-cyan/5">
              <div className="code-titlebar">
                <div className="code-dot code-dot-red" />
                <div className="code-dot code-dot-yellow" />
                <div className="code-dot code-dot-green" />
                <span className="ml-3 text-text-muted text-xs font-mono">developer.ts</span>
              </div>
              <div className="p-6 font-mono text-sm space-y-3">
                {terminalLines.slice(0, terminalLineIndex).map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-wrap"
                  >
                    <span className="syntax-keyword">{line.prefix}</span>
                    <span className="syntax-property">{line.keyword}</span>
                    <span className="syntax-operator">{line.operator}</span>
                    <span className="syntax-string">{line.value}</span>
                  </motion.div>
                ))}
                {terminalLineIndex < terminalLines.length && (
                  <div className="flex items-center">
                    <span className="text-accent-cyan mr-1">❯</span>
                    <span className="cursor-blink" />
                  </div>
                )}
                {terminalLineIndex >= terminalLines.length && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="pt-2 border-t border-white/5 mt-4"
                  >
                    <span className="syntax-comment">{"// Ready to build something amazing?"}</span>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          className="mt-16 grid grid-cols-3 gap-4 max-w-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          {stats.map((stat) => (
            <StatItem key={stat.label} stat={stat} startStats={startStats} />
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer z-20 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        onClick={() => {
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="text-text-muted text-xs font-mono uppercase tracking-widest">
          scroll
        </span>
        <div className="w-5 h-9 border-2 border-text-muted/30 rounded-full flex justify-center pt-1.5">
          <motion.div
            className="w-1 h-2 bg-accent-cyan rounded-full"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
