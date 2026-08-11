"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import SectionShell from "@/components/hud/SectionShell";
import HudLabel from "@/components/hud/HudLabel";

const codeContent = [
  { lineNum: 1, content: [{ text: "interface", type: "keyword" }, { text: " Developer ", type: "type" }, { text: "{", type: "operator" }] },
  { lineNum: 2, content: [{ text: "  name", type: "property" }, { text: ":", type: "operator" }, { text: ' "Antariksh Mankar"', type: "string" }, { text: ";", type: "operator" }] },
  { lineNum: 3, content: [{ text: "  role", type: "property" }, { text: ":", type: "operator" }, { text: ' "Software Development Engineer"', type: "string" }, { text: ";", type: "operator" }] },
  { lineNum: 4, content: [{ text: "  location", type: "property" }, { text: ":", type: "operator" }, { text: ' "Gandhinagar, Gujarat, India"', type: "string" }, { text: ";", type: "operator" }] },
  { lineNum: 5, content: [{ text: "  focus", type: "property" }, { text: ":", type: "operator" }, { text: ' ["Backend", "DevOps", "Full Stack"]', type: "string" }, { text: ";", type: "operator" }] },
  { lineNum: 6, content: [{ text: "}", type: "operator" }] },
  { lineNum: 7, content: [] },
  { lineNum: 8, content: [{ text: "// Mission briefing: architecting scalable systems", type: "comment" }] },
  { lineNum: 9, content: [{ text: "const", type: "keyword" }, { text: " profile", type: "variable" }, { text: " = ", type: "operator" }, { text: "{", type: "operator" }] },
  { lineNum: 10, content: [{ text: "  bio", type: "property" }, { text: ": ", type: "operator" }, { text: '"Backend Developer & DevOps Engineer"', type: "string" }, { text: ",", type: "operator" }] },
  { lineNum: 11, content: [{ text: "  clearance", type: "property" }, { text: ": ", type: "operator" }, { text: '"Microsoft DevOps Expert"', type: "string" }, { text: ",", type: "operator" }] },
  { lineNum: 12, content: [{ text: "  certified", type: "property" }, { text: ": ", type: "operator" }, { text: "true", type: "keyword" }, { text: ",", type: "operator" }] },
  { lineNum: 13, content: [{ text: "  hackathonWinner", type: "property" }, { text: ": ", type: "operator" }, { text: "true", type: "keyword" }] },
  { lineNum: 14, content: [{ text: "};", type: "operator" }] },
];

const metrics = [
  { label: "Role", value: "Software Dev Engineer", color: "#00f0ff" },
  { label: "Location", value: "Gandhinagar, India", color: "#8b5cf6" },
  { label: "Experience", value: "3+ Years", color: "#f59e0b" },
  { label: "Focus", value: "Backend · DevOps", color: "#10b981" },
  { label: "Clearance", value: "MS DevOps Expert", color: "#00f0ff" },
  { label: "Hackathon", value: "1st Place", color: "#f43f5e" },
];

const timeline = [
  {
    year: "2024",
    title: "DevOps Expert Clearance",
    description: "Certified as Microsoft DevOps Engineer Expert — pipelines, IaC & release engineering.",
    color: "#00f0ff",
  },
  {
    year: "2025",
    title: "Java Developer",
    description: "Backend systems with Java, Spring Boot & microservices in production.",
    color: "#8b5cf6",
  },
  {
    year: "2026",
    title: "Software Developer",
    description: "Full-stack development, CI/CD pipelines & cloud infrastructure.",
    color: "#f59e0b",
  },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const tokenClass = (type: string) =>
    type === "keyword" ? "syntax-keyword" :
    type === "type" ? "syntax-type" :
    type === "string" ? "syntax-string" :
    type === "operator" ? "syntax-operator" :
    type === "property" ? "syntax-property" :
    type === "variable" ? "syntax-variable" :
    type === "comment" ? "syntax-comment" :
    "text-text-primary";

  return (
    <SectionShell
      ref={ref}
      id="about"
      index={2}
      code="PROFILE"
      name="Mission Log"
      accent="#8b5cf6"
    >
      <div className="grid items-start gap-12 lg:grid-cols-2">
        {/* Left — mission brief code panel */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="hud-panel overflow-hidden">
            <div className="flex items-center gap-2 border-b border-white/5 px-5 py-3">
              <span className="hud-label text-text-muted">mission_brief.ts</span>
              <span className="ml-auto status-dot" style={{ color: "#8b5cf6" }} />
            </div>
            <div className="scanlines" />
            <div className="relative p-5 font-mono text-[13px] leading-relaxed">
              {codeContent.map((line, lineIndex) => (
                <motion.div
                  key={line.lineNum}
                  className="flex"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.3 + lineIndex * 0.05 }}
                >
                  <span className="mr-4 w-8 flex-shrink-0 select-none text-right text-text-muted/40">
                    {line.lineNum}
                  </span>
                  <span>
                    {line.content.length === 0 ? (
                      <br />
                    ) : (
                      line.content.map((token, tokenIndex) => (
                        <span key={tokenIndex} className={tokenClass(token.type)}>
                          {token.text}
                        </span>
                      ))
                    )}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right — bio + metrics + journey log */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <p className="mb-4 text-lg leading-relaxed text-text-secondary">
            Software Development Engineer focused on backend systems and DevOps
            automation. Took first place in my unit&apos;s internal hackathon — pressure-tested
            at live demo speed.
          </p>
          <p className="mb-4 text-lg leading-relaxed text-text-secondary">
            Specializing in automating workflows and architecting scalable systems
            with <span className="text-accent-cyan">Java</span> and{" "}
            <span className="text-accent-violet">React.js</span>.
          </p>
          <p className="mb-8 text-lg leading-relaxed text-text-secondary">
            Cleared as a <span className="text-accent-amber">Microsoft Certified DevOps
            Engineer Expert</span>, with additional IBM &amp; Oracle credentials. I operate
            at the seam where development hands off to operations.
          </p>

          {/* Bio-metrics */}
          <div className="hud-panel mb-10 p-5">
            <div className="hud-label mb-4 flex items-center gap-2 text-text-muted">
              <span className="status-dot" style={{ color: "#8b5cf6" }} />
              Bio-Metrics
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {metrics.map((m) => (
                <div key={m.label} className="border-l border-white/10 pl-3">
                  <div className="hud-label text-text-muted/70">{m.label}</div>
                  <div className="mt-0.5 text-sm font-medium" style={{ color: m.color }}>
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Journey log timeline */}
          <div className="hud-label mb-4 flex items-center gap-2 text-text-muted">
            <span className="status-dot" style={{ color: "#f59e0b" }} />
            Journey Log
          </div>
          <div className="relative">
            <motion.div
              className="absolute left-[7px] top-1 w-px bg-gradient-to-b from-accent-cyan via-accent-violet to-accent-amber"
              initial={{ height: 0 }}
              animate={isInView ? { height: "100%" } : {}}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
            <div className="space-y-7">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex gap-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.15 }}
                >
                  <span
                    className="relative z-10 mt-1.5 h-3.5 w-3.5 flex-shrink-0 rotate-45 border"
                    style={{
                      borderColor: item.color,
                      backgroundColor: "#0a0f1e",
                      boxShadow: `0 0 10px ${item.color}`,
                    }}
                  />
                  <div className="hud-panel flex-1 p-4 transition-colors hover:border-white/20">
                    <span className="font-mono text-xs" style={{ color: item.color }}>
                      [{item.year}]
                    </span>
                    <h4 className="mt-1 text-lg font-semibold text-text-primary">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Resume command */}
          <motion.a
            href="https://drive.google.com/file/d/1acZLfDyLRgRAAsdpoavzDRzYTYn6vq30/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="hud-panel group mt-8 inline-flex items-center gap-3 px-5 py-3 transition-colors hover:border-accent-cyan/30"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1 }}
            whileHover={{ scale: 1.02, x: 5 }}
          >
            <span className="font-mono text-sm text-accent-cyan">$</span>
            <span className="font-mono text-sm text-text-secondary transition-colors group-hover:text-text-primary">
              wget resume.pdf
            </span>
            <svg className="h-4 w-4 text-text-muted transition-colors group-hover:text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </SectionShell>
  );
};

export default AboutSection;
