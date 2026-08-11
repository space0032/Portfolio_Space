"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import React, { useRef, useState } from "react";

interface Skill {
  name: string;
  level: number;
  projects: number;
  color: string;
  category: "languages" | "frameworks" | "tools";
}

const skills: Skill[] = [
  { name: "Java", level: 90, projects: 10, color: "#f89820", category: "languages" },
  { name: "TypeScript", level: 85, projects: 6, color: "#3178c6", category: "languages" },
  { name: "Python", level: 70, projects: 4, color: "#3776ab", category: "languages" },
  { name: "JavaScript", level: 85, projects: 8, color: "#f7df1e", category: "languages" },
  { name: "React.js", level: 90, projects: 8, color: "#61dafb", category: "frameworks" },
  { name: "Next.js", level: 88, projects: 5, color: "#ffffff", category: "frameworks" },
  { name: "Node.js", level: 80, projects: 7, color: "#68a063", category: "frameworks" },
  { name: "Spring Boot", level: 85, projects: 6, color: "#6db33f", category: "frameworks" },
  { name: "Docker", level: 75, projects: 3, color: "#2496ed", category: "tools" },
  { name: "MongoDB", level: 75, projects: 5, color: "#4db33d", category: "tools" },
  { name: "AWS", level: 70, projects: 3, color: "#ff9900", category: "tools" },
  { name: "Git", level: 90, projects: 12, color: "#f05032", category: "tools" },
];

const otherTechs = [
  "GraphQL", "REST APIs", "Redis", "PostgreSQL", "MySQL",
  "Jest", "CI/CD", "Kubernetes", "Linux", "Jenkins",
  "Terraform", "Nginx", "RabbitMQ", "JPA/Hibernate",
];

const categories = [
  { id: "all" as const, label: "All" },
  { id: "languages" as const, label: "Languages" },
  { id: "frameworks" as const, label: "Frameworks" },
  { id: "tools" as const, label: "Tools & DevOps" },
];

// Circular progress ring component
const CircularProgress = ({ progress, color, size = 56, strokeWidth = 3 }: {
  progress: number;
  color: string;
  size?: number;
  strokeWidth?: number;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.05)"
        strokeWidth={strokeWidth}
      />
      {/* Progress circle */}
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{ filter: `drop-shadow(0 0 6px ${color}40)` }}
      />
    </svg>
  );
};

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState<"all" | "languages" | "frameworks" | "tools">("all");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const filteredSkills = activeCategory === "all"
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center px-4 py-24 overflow-hidden"
      id="skills"
    >
      {/* Readability veil over the 3D scene */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(10,15,30,0.6) 0%, rgba(10,15,30,0.2) 55%, transparent 80%)",
        }}
      />

      <div className="max-w-6xl w-full relative z-10">
        {/* Section heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent-emerald font-mono text-sm tracking-wider uppercase block mb-3">
            &lt;skills /&gt;
          </span>
          <h2 className="text-4xl md:text-6xl font-bold">
            Tech{" "}
            <span className="bg-gradient-to-r from-accent-emerald to-accent-cyan bg-clip-text text-transparent">
              Arsenal
            </span>
          </h2>
        </motion.div>

        {/* Category filters */}
        <motion.div
          className="flex justify-center gap-2 mb-12 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30"
                  : "text-text-muted border border-white/5 hover:border-white/15 hover:text-text-secondary"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          layout
        >
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              layout
              className="relative group"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onHoverStart={() => setHoveredSkill(skill.name)}
              onHoverEnd={() => setHoveredSkill(null)}
            >
              <motion.div
                className="glass-card rounded-2xl p-6 flex flex-col items-center gap-4 h-full cursor-pointer"
                whileHover={{
                  y: -8,
                  borderColor: `${skill.color}40`,
                  boxShadow: `0 0 30px ${skill.color}15`,
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Circular progress */}
                <div className="relative">
                  {isInView && (
                    <CircularProgress
                      progress={skill.level}
                      color={skill.color}
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold font-mono" style={{ color: skill.color }}>
                      {skill.level}%
                    </span>
                  </div>
                </div>

                {/* Skill name */}
                <h3 className="text-text-primary font-semibold text-sm text-center">
                  {skill.name}
                </h3>

                {/* Projects count (revealed on hover) */}
                <motion.div
                  className="overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: hoveredSkill === skill.name ? "auto" : 0,
                    opacity: hoveredSkill === skill.name ? 1 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-text-muted text-xs font-mono">
                    {skill.projects} projects
                  </span>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Other technologies */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-xl font-semibold text-text-primary mb-6">
            Also experienced with
          </h3>
          <div className="flex flex-wrap gap-3 justify-center max-w-3xl mx-auto">
            {otherTechs.map((tech, index) => (
              <motion.span
                key={tech}
                className="px-4 py-2 rounded-full text-sm text-text-secondary border border-white/5 hover:border-accent-cyan/20 hover:text-accent-cyan transition-all cursor-default"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.03 }}
                whileHover={{ y: -3, scale: 1.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
