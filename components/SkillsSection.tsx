"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import SectionShell from "@/components/hud/SectionShell";
import { sceneEvents } from "@/lib/dom";

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
  { id: "all" as const, label: "All Systems" },
  { id: "languages" as const, label: "Languages" },
  { id: "frameworks" as const, label: "Frameworks" },
  { id: "tools" as const, label: "Tools & Ops" },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState<"all" | "languages" | "frameworks" | "tools">("all");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const filteredSkills =
    activeCategory === "all"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  const onEnter = (name: string) => {
    setHoveredSkill(name);
    sceneEvents.emit("highlight", { id: name });
  };
  const onLeave = () => {
    setHoveredSkill(null);
    sceneEvents.emit("clear");
  };

  return (
    <SectionShell
      ref={ref}
      id="skills"
      index={3}
      code="SYSTEMS"
      name="Tech Inventory"
      accent="#10b981"
    >
      <motion.div
        className="flex flex-wrap justify-center gap-2 pb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {categories.map((cat) => (
          <motion.button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`cursor-pointer border px-4 py-2 font-mono text-xs uppercase tracking-widest transition-all ${
              activeCategory === cat.id
                ? "border-accent-emerald/40 bg-accent-emerald/10 text-accent-emerald"
                : "border-white/10 text-text-muted hover:border-white/25 hover:text-text-secondary"
            }`}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            {cat.label}
          </motion.button>
        ))}
      </motion.div>

      <motion.div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4" layout>
        {filteredSkills.map((skill, index) => (
          <motion.div
            key={skill.name}
            layout
            initial={{ opacity: 0, scale: 0.85 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.35, delay: index * 0.04 }}
            onHoverStart={() => onEnter(skill.name)}
            onHoverEnd={onLeave}
            onFocus={() => onEnter(skill.name)}
            onBlur={onLeave}
          >
            <motion.div
              className="hud-panel group h-full cursor-pointer p-5 transition-colors hover:border-white/25"
              whileHover={{ y: -6 }}
            >
              <div className="mb-4 flex items-center justify-between">
                <span
                  className="status-dot"
                  style={{ color: skill.color, width: 10, height: 10 }}
                />
                <span className="hud-label text-text-muted/70">{skill.category}</span>
              </div>

              <h3 className="font-mono text-base font-bold text-text-primary transition-colors group-hover:text-text-primary">
                {skill.name}
              </h3>

              <div className="mt-4 flex items-center gap-2">
                <span className="font-mono text-xs" style={{ color: skill.color }}>
                  {skill.level}%
                </span>
                <div className="flex flex-1 gap-1">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <span
                      key={i}
                      className={`seg flex-1 ${i < Math.round(skill.level / 10) ? "seg--on" : ""}`}
                      style={{ color: skill.color }}
                    />
                  ))}
                </div>
              </div>

              <motion.div
                className="mt-3 overflow-hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: hoveredSkill === skill.name ? "auto" : 0,
                  opacity: hoveredSkill === skill.name ? 1 : 0,
                }}
                transition={{ duration: 0.2 }}
              >
                <span className="hud-label text-text-muted/70">
                  {skill.projects} missions · linked to 3D orb
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="pt-14 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="hud-label mb-6 flex items-center justify-center gap-2 text-text-muted">
          <span className="hud-divider w-16" />
          Secondary Modules
          <span className="hud-divider w-16" />
        </div>
        <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-3">
          {otherTechs.map((tech, index) => (
            <motion.span
              key={tech}
              className="cursor-default border border-white/10 px-4 py-2 font-mono text-xs text-text-secondary transition-colors hover:border-accent-emerald/30 hover:text-accent-emerald"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.7 + index * 0.03 }}
              whileHover={{ y: -3, scale: 1.05 }}
            >
              + {tech}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </SectionShell>
  );
};

export default SkillsSection;
