"use client";

import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, ReactNode } from "react";
import Link from "next/link";
import SectionShell from "@/components/hud/SectionShell";
import { projects } from "@/lib/projects";
import { sceneEvents } from "@/lib/dom";

const filterOptions = ["All", "Java", "JavaScript", "TypeScript", "Python"];

const TiltCard = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 220, damping: 18 });
  const sry = useSpring(ry, { stiffness: 220, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 10);
    rx.set(-py * 10);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState("All");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) =>
          p.techStack.some((t) =>
            t.toLowerCase().includes(activeFilter.toLowerCase())
          )
        );

  const onEnter = (id: number) => {
    setHoveredId(id);
    sceneEvents.emit("highlight", { id: String(id - 1) });
  };
  const onLeave = () => {
    setHoveredId(null);
    sceneEvents.emit("clear");
  };

  return (
    <SectionShell
      ref={ref}
      id="projects"
      index={5}
      code="ARCHIVE"
      name="Project Archive"
      accent="#b79df0"
    >
      <motion.div
        className="flex flex-wrap justify-center gap-2 pb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {filterOptions.map((filter) => (
          <motion.button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`cursor-pointer border px-4 py-2 font-mono text-xs uppercase tracking-widest transition-all ${
              activeFilter === filter
                ? "border-gold/40 bg-gold/10 text-gold-bright"
                : "border-line text-text-muted hover:border-line-bright hover:text-text-secondary"
            }`}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            {filter}
          </motion.button>
        ))}
      </motion.div>

      <motion.div
        layout
        className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 [perspective:1200px]"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              className="h-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onHoverStart={() => onEnter(project.id)}
              onHoverEnd={onLeave}
              onFocus={() => onEnter(project.id)}
              onBlur={onLeave}
            >
              <TiltCard className="h-full">
                <div
                  className={`hud-panel group relative h-full overflow-hidden p-6 transition-colors ${
                    project.featured ? "!border-gold/30" : "hover:border-line-bright"
                  }`}
                >
                  {/* Gradient glow */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-40 transition-opacity duration-300 group-hover:opacity-70`}
                  />

                  <div className="relative flex h-full min-h-[280px] flex-col">
                    {/* Header row */}
                    <div className="mb-4 flex items-start justify-between">
                      <span className="hud-label" style={{ color: "#c15b4a" }}>
                        PRJ-{String(project.id).padStart(2, "0")}
                      </span>
                      <span className="text-3xl">{project.icon}</span>
                    </div>

                    {project.featured && (
                      <span className="hud-label mb-3 w-fit border border-gold/40 px-2 py-0.5 text-gold-bright">
                        ★ Featured
                      </span>
                    )}

                    <h3 className="mb-2 font-display text-xl font-semibold text-parchment transition-colors group-hover:text-gold-bright">
                      {project.title}
                    </h3>
                    <p className="mb-auto line-clamp-3 text-sm leading-relaxed text-slate">
                      {project.description}
                    </p>

                    {/* Footer */}
                    <div className="mt-5 flex items-end justify-between gap-3 border-t border-line pt-4">
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="border border-line px-2.5 py-1 font-mono text-[11px] text-slate-dim"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 3 && (
                          <span className="border border-line px-2.5 py-1 font-mono text-[11px] text-text-muted">
                            +{project.techStack.length - 3}
                          </span>
                        )}
                      </div>
                      <Link href={`/projects/${project.slug}`} className="flex-shrink-0">
                        <motion.span
                          className="flex cursor-pointer items-center gap-1.5 font-mono text-xs text-gold transition-colors hover:text-gold-bright"
                          whileHover={{ x: 3 }}
                        >
                          OPEN
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </motion.span>
                      </Link>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="pt-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.7 }}
      >
        <motion.a
          href="https://github.com/space0032"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 font-mono text-sm text-text-secondary transition-colors hover:text-gold-bright"
          whileHover={{ x: 5 }}
        >
          <span className="text-gold">&gt;</span>
          view all_missions on github
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.a>
      </motion.div>
    </SectionShell>
  );
};

export default ProjectsSection;
