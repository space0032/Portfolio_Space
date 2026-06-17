"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

type TabType = "certifications" | "achievements" | "experience";

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
  side: "left" | "right";
}

const certifications: Certification[] = [
  {
    id: 1,
    name: "Microsoft Certified: DevOps Engineer Expert",
    issuer: "Microsoft",
    date: "2024",
    icon: "🏆",
    featured: true,
    color: "#00f0ff",
  },
  {
    id: 2,
    name: "IBM Certified Software Engineer",
    issuer: "IBM",
    date: "2024",
    icon: "💼",
    color: "#8b5cf6",
  },
  {
    id: 3,
    name: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    issuer: "Oracle",
    date: "2024",
    icon: "🎓",
    color: "#f59e0b",
  },
];

const achievements: Achievement[] = [
  {
    id: 1,
    title: "1st Place — College Hackathon",
    description: "Led a team to victory in the college's internal hackathon, developing an innovative solution that impressed judges with its technical excellence and practical application.",
    date: "2025",
    icon: "🥇",
  },
  {
    id: 2,
    title: "Problem Solver Excellence",
    description: "Recognized for exceptional problem-solving skills and ability to deliver high-quality solutions under pressure.",
    date: "2025",
    icon: "⚡",
  },
];

const experiences: Experience[] = [
  {
    id: 1,
    role: "Java Developer",
    year: "2025",
    description: "Developed robust backend systems using Java and Spring Boot. Focused on building scalable microservices and implementing DevOps practices.",
    technologies: ["Java", "Spring Boot", "MySQL", "Docker"],
    side: "left",
  },
  {
    id: 2,
    role: "Software Developer",
    year: "2026",
    description: "Full-stack development with emphasis on automation, CI/CD pipelines, and cloud infrastructure. Bridging the gap between development and operations.",
    technologies: ["React", "Node.js", "AWS", "Kubernetes"],
    side: "right",
  },
];

const tabs = [
  { id: "experience" as TabType, label: "Experience" },
  { id: "certifications" as TabType, label: "Certifications" },
  { id: "achievements" as TabType, label: "Achievements" },
];

const AchievementsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState<TabType>("experience");

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center px-4 py-24 overflow-hidden"
      id="achievements"
      style={{ background: "linear-gradient(180deg, #0a0f1e 0%, #10162a 50%, #0a0f1e 100%)" }}
    >
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

      <div className="max-w-6xl w-full relative z-10">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent-amber font-mono text-sm tracking-wider uppercase block mb-3">
            &lt;experience /&gt;
          </span>
          <h2 className="text-4xl md:text-6xl font-bold">
            Experience &{" "}
            <span className="bg-gradient-to-r from-accent-amber to-accent-rose bg-clip-text text-transparent">
              Credentials
            </span>
          </h2>
        </motion.div>

        {/* Tabs with animated underline */}
        <motion.div
          className="flex justify-center gap-1 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-6 py-3 text-sm font-medium transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? "text-accent-amber"
                  : "text-text-muted hover:text-text-secondary"
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-amber to-accent-rose"
                  layoutId="activeTab"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {/* Experience Tab — Timeline */}
          {activeTab === "experience" && (
            <motion.div
              key="experience"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              {/* Center timeline line */}
              <motion.div
                className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-gradient-to-b from-accent-amber/50 via-accent-violet/50 to-accent-cyan/50 hidden md:block"
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                transition={{ duration: 1.5, delay: 0.3 }}
              />

              {/* Mobile timeline line */}
              <motion.div
                className="absolute left-[17px] top-0 w-px bg-gradient-to-b from-accent-amber/50 via-accent-violet/50 to-accent-cyan/50 md:hidden"
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                transition={{ duration: 1.5, delay: 0.3 }}
              />

              <div className="space-y-12">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    className={`flex flex-col md:flex-row items-start md:items-center gap-6 ${
                      exp.side === "right" ? "md:flex-row-reverse" : ""
                    }`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    {/* Card */}
                    <motion.div
                      className={`glass-card rounded-2xl p-6 flex-1 w-full md:w-auto ${
                        exp.side === "right" ? "md:text-right" : ""
                      }`}
                      whileHover={{ y: -5, borderColor: "rgba(245,158,11,0.3)" }}
                    >
                      <div className={`flex items-center gap-3 mb-3 ${
                        exp.side === "right" ? "md:flex-row-reverse" : ""
                      }`}>
                        <span className="px-3 py-1 rounded-full bg-accent-amber/10 text-accent-amber text-xs font-mono border border-accent-amber/20">
                          {exp.year}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-text-primary mb-2">{exp.role}</h3>
                      <p className="text-text-secondary text-sm leading-relaxed mb-4">{exp.description}</p>
                      <div className={`flex flex-wrap gap-2 ${
                        exp.side === "right" ? "md:justify-end" : ""
                      }`}>
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-full bg-white/5 text-text-muted text-xs border border-white/5"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>

                    {/* Center dot */}
                    <div className="hidden md:flex flex-shrink-0">
                      <motion.div
                        className="w-4 h-4 rounded-full bg-accent-amber border-4 border-bg-primary"
                        whileHover={{ scale: 1.5 }}
                        style={{ boxShadow: "0 0 15px rgba(245,158,11,0.4)" }}
                      />
                    </div>

                    {/* Mobile dot */}
                    <div className="md:hidden absolute left-[9px]" style={{ top: `${index * 200 + 20}px` }}>
                      <motion.div
                        className="w-4 h-4 rounded-full bg-accent-amber border-4 border-bg-primary"
                        style={{ boxShadow: "0 0 15px rgba(245,158,11,0.4)" }}
                      />
                    </div>

                    {/* Empty space for opposite side */}
                    <div className="flex-1 hidden md:block" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Certifications Tab */}
          {activeTab === "certifications" && (
            <motion.div
              key="certifications"
              className="grid md:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  className="relative group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <motion.div
                    className={`glass-card rounded-2xl p-6 h-full ${
                      cert.featured ? "border-accent-cyan/20" : ""
                    }`}
                    whileHover={{
                      y: -8,
                      borderColor: `${cert.color}40`,
                      boxShadow: `0 0 30px ${cert.color}15`,
                    }}
                  >
                    {cert.featured && (
                      <div className="absolute -top-3 right-4">
                        <span className="px-3 py-1 rounded-full bg-accent-cyan/10 text-accent-cyan text-xs font-mono border border-accent-cyan/30">
                          Featured
                        </span>
                      </div>
                    )}

                    <motion.div
                      className="text-4xl mb-4"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                    >
                      {cert.icon}
                    </motion.div>

                    <h3 className="text-lg font-bold text-text-primary mb-2 leading-tight">
                      {cert.name}
                    </h3>

                    <div className="flex items-center justify-between mt-4">
                      <span className="text-text-muted text-sm">{cert.issuer}</span>
                      <span
                        className="text-xs font-mono px-2 py-0.5 rounded-full border"
                        style={{
                          color: cert.color,
                          borderColor: `${cert.color}30`,
                          backgroundColor: `${cert.color}10`,
                        }}
                      >
                        {cert.date}
                      </span>
                    </div>

                    {/* Holographic shine */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none overflow-hidden">
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(105deg, transparent 40%, ${cert.color}08 45%, ${cert.color}12 50%, ${cert.color}08 55%, transparent 60%)`,
                          animation: "shine 3s infinite",
                        }}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Achievements Tab */}
          {activeTab === "achievements" && (
            <motion.div
              key="achievements"
              className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
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
                    className="glass-card rounded-2xl p-6 h-full"
                    whileHover={{ y: -5, borderColor: "rgba(245,158,11,0.3)" }}
                  >
                    <div className="flex items-start gap-4">
                      <motion.div
                        className="text-4xl flex-shrink-0"
                        whileHover={{ scale: 1.3, rotate: 15 }}
                      >
                        {achievement.icon}
                      </motion.div>
                      <div>
                        <h3 className="text-lg font-bold text-text-primary mb-2">
                          {achievement.title}
                        </h3>
                        <p className="text-text-secondary text-sm leading-relaxed mb-3">
                          {achievement.description}
                        </p>
                        <span className="text-accent-amber text-xs font-mono">
                          {achievement.date}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default AchievementsSection;
