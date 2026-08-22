"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import SectionShell from "@/components/hud/SectionShell";

type TabType = "experience" | "certifications" | "achievements";

interface Certification {
  id: number;
  name: string;
  issuer: string;
  date: string;
  icon: string;
  featured?: boolean;
  color: string;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  date: string;
  icon: string;
}

interface Experience {
  id: number;
  role: string;
  year: string;
  description: string;
  technologies: string[];
}

const certifications: Certification[] = [
  {
    id: 1,
    name: "Microsoft Certified: DevOps Engineer Expert",
    issuer: "Microsoft",
    date: "2024",
    icon: "🏆",
    featured: true,
    color: "#d4af6a",
  },
  {
    id: 2,
    name: "IBM Certified Software Engineer",
    issuer: "IBM",
    date: "2024",
    icon: "💼",
    color: "#9b7fe0",
  },
  {
    id: 3,
    name: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    issuer: "Oracle",
    date: "2024",
    icon: "🎓",
    color: "#f0cd8a",
  },
];

const achievements: Achievement[] = [
  {
    id: 1,
    title: "1st Place — College Hackathon",
    description: "Led a team to victory in the college's internal hackathon, delivering an innovative solution that impressed judges with its technical excellence and practical application.",
    date: "2025",
    icon: "🥇",
  },
  {
    id: 2,
    title: "Problem Solver Excellence",
    description: "Recognized for exceptional problem-solving and the ability to deliver high-quality solutions under pressure.",
    date: "2025",
    icon: "⚡",
  },
];

const experiences: Experience[] = [
  {
    id: 1,
    role: "Java Developer",
    year: "2025",
    description: "Developed robust backend systems using Java and Spring Boot. Focused on scalable microservices and adopting DevOps practices.",
    technologies: ["Java", "Spring Boot", "MySQL", "Docker"],
  },
  {
    id: 2,
    role: "Software Developer",
    year: "2026",
    description: "Full-stack development with emphasis on automation, CI/CD pipelines, and cloud infrastructure. Bridging development and operations.",
    technologies: ["React", "Node.js", "AWS", "Kubernetes"],
  },
];

const tabs = [
  { id: "experience" as TabType, label: "Experience", num: "01" },
  { id: "certifications" as TabType, label: "Certifications", num: "02" },
  { id: "achievements" as TabType, label: "Achievements", num: "03" },
];

const AchievementsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState<TabType>("experience");

  return (
    <SectionShell
      ref={ref}
      id="achievements"
      index={4}
      code="LOG"
      name="Flight Record"
      accent="#c15b4a"
    >
      <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
        {/* Route select */}
        <motion.nav
          aria-label="Record type"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="hud-label mb-4 flex items-center gap-2 text-text-muted">
            <span className="status-dot" style={{ color: "#c15b4a" }} />
            Route Select
          </div>
          <div className="flex gap-2 lg:flex-col">
            {tabs.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group flex flex-1 cursor-pointer items-center gap-3 border px-4 py-3 text-left transition-all lg:flex-none ${
                    active
                      ? "border-gold-bright/40 bg-gold-bright/5"
                      : "border-line hover:border-line-bright"
                  }`}
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span
                    className={`hud-label ${
                      active ? "text-gold-bright" : "text-text-muted"
                    }`}
                  >
                    {tab.num}
                  </span>
                  <span
                    className={`font-mono text-sm ${
                      active
                        ? "text-gold-bright"
                        : "text-text-secondary group-hover:text-text-primary"
                    }`}
                  >
                    {tab.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.nav>

        {/* Panel */}
        <div className="min-w-0">
          <AnimatePresence mode="wait">
            {activeTab === "experience" && (
              <motion.div
                key="experience"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="relative pl-10"
              >
                <motion.div
                  className="absolute bottom-2 left-[15px] top-2 w-px bg-gradient-to-b from-accent-amber/50 via-accent-violet/50 to-accent-cyan/50"
                  initial={{ height: 0 }}
                  animate={{ height: "calc(100% - 16px)" }}
                  transition={{ duration: 1.5, delay: 0.3 }}
                />
                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    className="relative mb-10 last:mb-0"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    <span
                      className="absolute -left-10 mt-2 h-3.5 w-3.5 rotate-45 border"
                      style={{
                        borderColor: "#d4af6a",
                        backgroundColor: "#08060f",
                        boxShadow: "0 0 10px rgba(212,175,106,0.5)",
                      }}
                    />
                    <div className="hud-panel p-6 transition-colors hover:border-line-bright">
                      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                        <span className="font-mono text-xs text-gold-bright">
                          [ {exp.year} ]
                        </span>
                        <span className="hud-label text-text-muted/70">
                          Flight {String(exp.id).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="mb-2 text-xl font-bold text-text-primary">
                        {exp.role}
                      </h3>
                      <p className="mb-4 text-sm leading-relaxed text-text-secondary">
                        {exp.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="border border-line px-3 py-1 font-mono text-xs text-text-muted"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === "certifications" && (
              <motion.div
                key="certifications"
                className="grid gap-5 md:grid-cols-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    className="relative h-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <motion.div
                      className="hud-panel relative flex h-full flex-col p-6"
                      whileHover={{ y: -6 }}
                    >
                      {cert.featured && (
                        <span
                          className="hud-label absolute -top-3 right-4 border px-3 py-1"
                          style={{
                            color: "#f0cd8a",
                            borderColor: "rgba(240,205,138,0.3)",
                            backgroundColor: "rgba(240,205,138,0.12)",
                          }}
                        >
                          Featured
                        </span>
                      )}
                      <div className="mb-4 flex items-center justify-between">
                        <span className="text-3xl">{cert.icon}</span>
                        <span className="hud-label text-text-muted/70">{cert.date}</span>
                      </div>
                      <h3 className="mb-4 text-lg font-bold leading-tight text-text-primary">
                        {cert.name}
                      </h3>
                      <div className="hud-divider mb-4 mt-auto" />
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-muted">{cert.issuer}</span>
                        <span className="status-dot" style={{ color: cert.color }} />
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === "achievements" && (
              <motion.div
                key="achievements"
                className="grid gap-5 md:grid-cols-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <motion.div
                      className="hud-panel h-full p-6"
                      whileHover={{ y: -6, borderColor: "rgba(240,205,138,0.3)" }}
                    >
                      <div className="flex items-start gap-4">
                        <span className="text-3xl">{achievement.icon}</span>
                        <div>
                          <div className="hud-label mb-2 text-gold-bright">
                            {achievement.date}
                          </div>
                          <h3 className="mb-2 text-lg font-bold text-text-primary">
                            {achievement.title}
                          </h3>
                          <p className="text-sm leading-relaxed text-text-secondary">
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SectionShell>
  );
};

export default AchievementsSection;
