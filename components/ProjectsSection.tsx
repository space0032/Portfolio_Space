"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { projects } from "@/lib/projects";

const filterOptions = ["All", "Java", "JavaScript", "TypeScript", "Python"];

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

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center px-4 py-24 overflow-hidden"
      id="projects"
      style={{
        background:
          "linear-gradient(180deg, #0a0f1e 0%, #0e1528 50%, #0a0f1e 100%)",
      }}
    >
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

      <div className="max-w-7xl w-full relative z-10">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent-violet font-mono text-sm tracking-wider uppercase block mb-3">
            &lt;projects /&gt;
          </span>
          <h2 className="text-4xl md:text-6xl font-bold">
            Featured{" "}
            <span className="bg-gradient-to-r from-accent-violet to-accent-rose bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          className="flex justify-center gap-2 mb-12 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filterOptions.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                activeFilter === filter
                  ? "bg-accent-violet/15 text-accent-violet border border-accent-violet/30"
                  : "text-text-muted border border-white/5 hover:border-white/15 hover:text-text-secondary"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                className={`${
                  project.featured
                    ? "md:col-span-2 lg:col-span-1 lg:row-span-1"
                    : ""
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onHoverStart={() => setHoveredId(project.id)}
                onHoverEnd={() => setHoveredId(null)}
              >
                <motion.div
                  className="relative glass-card rounded-2xl overflow-hidden h-full group"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Gradient background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-50 group-hover:opacity-80 transition-opacity`}
                  />

                  {/* Content */}
                  <div className="relative p-6 flex flex-col h-full min-h-[300px]">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <motion.span
                        className="text-4xl"
                        animate={{
                          scale: hoveredId === project.id ? 1.2 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {project.icon}
                      </motion.span>

                      {/* GitHub icon */}
                      <motion.a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full flex items-center justify-center text-text-muted hover:text-accent-cyan transition-colors bg-white/5 hover:bg-white/10"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`View ${project.title} on GitHub`}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </motion.a>
                    </div>

                    {project.featured && (
                      <span className="inline-flex w-fit items-center gap-1 px-2 py-0.5 rounded-full bg-accent-violet/10 text-accent-violet text-xs font-mono border border-accent-violet/20 mb-3">
                        ★ Featured
                      </span>
                    )}

                    {/* Title & Description */}
                    <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-accent-cyan transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed mb-auto line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tech stack pills + More Info */}
                    <div className="flex items-end justify-between mt-5 pt-4 border-t border-white/5">
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-full bg-white/5 text-text-muted text-xs border border-white/5"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 3 && (
                          <span className="px-3 py-1 rounded-full bg-white/5 text-text-muted text-xs border border-white/5">
                            +{project.techStack.length - 3}
                          </span>
                        )}
                      </div>
                      <Link
                        href={`/projects/${project.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex-shrink-0"
                      >
                        <motion.span
                          className="flex items-center gap-1.5 text-accent-cyan text-xs font-medium hover:text-accent-violet transition-colors cursor-pointer whitespace-nowrap"
                          whileHover={{ x: 3 }}
                        >
                          More Info
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </motion.span>
                      </Link>
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-bg-primary via-bg-primary/95 to-transparent p-6 flex items-end justify-center"
                    initial={{ y: "100%", opacity: 0 }}
                    animate={
                      hoveredId === project.id
                        ? { y: 0, opacity: 1 }
                        : { y: "100%", opacity: 0 }
                    }
                    transition={{ duration: 0.3 }}
                  >
                    <Link href={`/projects/${project.slug}`}>
                      <motion.span
                        className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-accent-violet to-accent-cyan text-bg-primary font-semibold text-sm hover:shadow-lg hover:shadow-accent-violet/25 transition-shadow cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Details
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </motion.span>
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <motion.a
            href="https://github.com/space0032"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-cyan transition-colors font-mono text-sm"
            whileHover={{ x: 5 }}
          >
            View all projects on GitHub
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
