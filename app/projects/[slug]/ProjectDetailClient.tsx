"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { getProjectBySlug, getRelatedProjects } from "@/lib/projects";
import { notFound } from "next/navigation";

export default function ProjectDetailClient({ slug }: { slug: string }) {
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = getRelatedProjects(slug, 3);

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Sticky back nav */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 glass"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            href="/#projects"
            className="flex items-center gap-2 text-text-secondary hover:text-accent-cyan transition-colors group"
          >
            <svg
              className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span className="text-sm font-medium">Back to Portfolio</span>
          </Link>

          <div className="flex items-center gap-3">
            <motion.a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-sm border border-gold/40 text-gold-bright text-sm font-medium hover:bg-gold/10 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              View Source
            </motion.a>
          </div>
        </div>
      </motion.nav>

      {/* Hero Banner */}
      <section className="relative pt-28 pb-16 px-4 overflow-hidden">
        {/* Background gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-50`}
        />
        <div className="absolute inset-0 grid-pattern opacity-30" />

        {/* Floating orbs */}
        <motion.div
          className="absolute w-96 h-96 rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(212, 175, 106, 0.13) 0%, transparent 70%)",
            left: "-5%",
            top: "10%",
          }}
          animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <motion.div
            className="flex items-center gap-2 text-sm text-text-muted mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/"
              className="hover:text-accent-cyan transition-colors"
            >
              Home
            </Link>
            <span>/</span>
            <Link
              href="/#projects"
              className="hover:text-accent-cyan transition-colors"
            >
              Projects
            </Link>
            <span>/</span>
            <span className="text-text-secondary">{project.title}</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — Project info */}
            <div>
              <motion.div
                className="flex items-center gap-3 mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="px-3 py-1 rounded-sm bg-arcane/10 text-arcane text-xs font-mono border border-arcane/25">
                  {project.category}
                </span>
                <span className="px-3 py-1 rounded-sm bg-white/5 text-text-muted text-xs font-mono border border-line">
                  {project.year}
                </span>
              </motion.div>

              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {project.title}
              </motion.h1>

              <motion.p
                className="text-xl text-accent-cyan font-medium mb-6"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {project.tagline}
              </motion.p>

              <motion.p
                className="text-text-secondary text-lg leading-relaxed mb-8"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {project.description}
              </motion.p>

              {/* Meta info */}
              <motion.div
                className="flex flex-wrap gap-6 mb-8"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div>
                  <span className="text-text-muted text-xs uppercase tracking-wider block mb-1">
                    Role
                  </span>
                  <span className="text-text-primary font-medium">
                    {project.role}
                  </span>
                </div>
                <div>
                  <span className="text-text-muted text-xs uppercase tracking-wider block mb-1">
                    Year
                  </span>
                  <span className="text-text-primary font-medium">
                    {project.year}
                  </span>
                </div>
                <div>
                  <span className="text-text-muted text-xs uppercase tracking-wider block mb-1">
                    Tech Stack
                  </span>
                  <span className="text-text-primary font-medium">
                    {project.techStack.length} technologies
                  </span>
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <motion.a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-7 py-3 rounded-sm bg-gradient-to-r from-arcane to-arcane-dim text-void font-semibold text-sm hover:shadow-lg hover:shadow-arcane/25 transition-shadow"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  View on GitHub
                </motion.a>
                <Link href="/#contact">
                  <motion.span
                    className="flex items-center gap-2 px-7 py-3 rounded-sm border border-line-bright text-text-primary font-semibold text-sm hover:border-gold/50 hover:text-gold-bright transition-colors cursor-pointer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Hire Me
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
            </div>

            {/* Right — Project icon showcase */}
            <motion.div
              className="hidden lg:flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="relative">
                {/* Glowing backdrop */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradientFull} blur-3xl opacity-20 scale-150`}
                />

                <motion.div
                  className="relative glass-card rounded-3xl p-16 flex items-center justify-center"
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <span className="text-[120px]">{project.icon}</span>
                </motion.div>

                {/* Orbiting tech badges */}
                {project.techStack.slice(0, 4).map((tech, i) => {
                  const angle = (i * 360) / 4;
                  const radius = 180;
                  const x =
                    Math.cos((angle * Math.PI) / 180) * radius;
                  const y =
                    Math.sin((angle * Math.PI) / 180) * radius;

                  return (
                    <motion.div
                      key={tech}
                      className="absolute px-3 py-1.5 rounded-sm glass-card text-xs font-mono text-text-secondary whitespace-nowrap"
                      style={{
                        left: `calc(50% + ${x}px - 30px)`,
                        top: `calc(50% + ${y}px - 12px)`,
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                    >
                      {tech}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Stack Strip */}
      <section className="border-y border-line bg-deep/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
            <span className="text-text-muted text-xs uppercase tracking-wider flex-shrink-0">
              Built with:
            </span>
            {project.techStack.map((tech, i) => (
              <motion.span
                key={tech}
                className="px-4 py-2 rounded-sm bg-panel text-text-secondary text-sm border border-line flex-shrink-0 hover:border-gold/30 hover:text-gold-bright transition-colors"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content — Two column layout */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left — Deep dive */}
            <div className="lg:col-span-2 space-y-16">
              {/* Overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-accent-cyan/10 flex items-center justify-center text-accent-cyan text-sm">
                    📖
                  </span>
                  Overview
                </h2>
                <div className="text-text-secondary leading-relaxed text-lg space-y-4">
                  {project.longDescription
                    .split(". ")
                    .reduce((acc: string[][], sentence, i) => {
                      const groupIndex = Math.floor(i / 3);
                      if (!acc[groupIndex]) acc[groupIndex] = [];
                      acc[groupIndex].push(sentence);
                      return acc;
                    }, [])
                    .map((group, i) => (
                      <p key={i}>{group.join(". ")}.</p>
                    ))}
                </div>
              </motion.div>

              {/* Key Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-accent-emerald/10 flex items-center justify-center text-accent-emerald text-sm">
                    ✨
                  </span>
                  Key Features
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {project.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      className="flex items-start gap-3 p-4 glass-card rounded-xl"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <span className="text-accent-emerald mt-0.5 flex-shrink-0">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </span>
                      <span className="text-text-secondary text-sm leading-relaxed">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Challenges & Solutions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-accent-amber/10 flex items-center justify-center text-accent-amber text-sm">
                    🧩
                  </span>
                  Technical Challenges
                </h2>
                <div className="space-y-4">
                  {project.challenges.map((challenge, i) => (
                    <motion.div
                      key={i}
                      className="flex items-start gap-4 p-5 glass-card rounded-xl"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <span className="text-accent-amber font-mono text-sm font-bold mt-0.5 flex-shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-text-secondary leading-relaxed">
                        {challenge}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right — Sidebar */}
            <div className="space-y-8">
              {/* Project info card */}
              <motion.div
                className="glass-card rounded-2xl p-6 sticky top-24"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-bold text-text-primary mb-5">
                  Project Details
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-line">
                    <span className="text-text-muted text-sm">Category</span>
                    <span className="text-text-primary text-sm font-medium">
                      {project.category}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-line">
                    <span className="text-text-muted text-sm">Year</span>
                    <span className="text-text-primary text-sm font-medium">
                      {project.year}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-line">
                    <span className="text-text-muted text-sm">Role</span>
                    <span className="text-text-primary text-sm font-medium">
                      {project.role}
                    </span>
                  </div>
                  <div className="py-3">
                    <span className="text-text-muted text-sm block mb-3">
                      Tech Stack
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-sm bg-panel text-text-muted text-xs border border-line"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* GitHub CTA */}
                <motion.a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-6 flex items-center justify-center gap-2 px-6 py-3 rounded-sm bg-gradient-to-r from-arcane to-arcane-dim text-void font-semibold text-sm hover:shadow-lg hover:shadow-arcane/25 transition-shadow"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  View Source Code
                </motion.a>

                {/* Recruiter CTA */}
                <Link href="/#contact" className="block mt-3">
                  <motion.div
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-sm border border-gold/40 text-gold-bright font-semibold text-sm hover:bg-gold/5 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    💼 Interested? Let&apos;s Talk
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="py-20 px-4 border-t border-line">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-2xl font-bold text-text-primary mb-8"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            More Projects
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProjects.map((related, i) => (
              <motion.div
                key={related.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/projects/${related.slug}`}>
                  <motion.div
                    className="glass-card rounded-2xl p-6 h-full group cursor-pointer"
                    whileHover={{ y: -5, borderColor: "rgba(212,175,106,0.3)" }}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${related.gradient} opacity-30 rounded-2xl group-hover:opacity-50 transition-opacity`}
                    />
                    <div className="relative">
                      <span className="text-3xl mb-4 block">
                        {related.icon}
                      </span>
                      <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-gold-bright transition-colors">
                        {related.title}
                      </h3>
                      <p className="text-text-secondary text-sm line-clamp-2 mb-4">
                        {related.tagline}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {related.techStack.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded-sm bg-panel text-text-muted text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recruiter CTA Banner */}
      <section className="py-16 px-4 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="glass-card rounded-3xl p-12 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 to-accent-violet/5" />
            <div className="relative">
              <h2 className="text-3xl font-bold text-text-primary mb-3">
                Like what you see?
              </h2>
              <p className="text-text-secondary text-lg mb-8 max-w-md mx-auto">
                I&apos;m open to new opportunities. Let&apos;s discuss how I
                can bring value to your team.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/#contact">
                  <motion.span
                    className="flex items-center gap-2 px-8 py-3.5 rounded-sm bg-gradient-to-r from-arcane to-arcane-dim text-void font-semibold text-sm hover:shadow-lg hover:shadow-arcane/25 transition-shadow cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Contact Me
                  </motion.span>
                </Link>
                <Link href="/">
                  <motion.span
                    className="flex items-center gap-2 px-8 py-3.5 rounded-sm border border-line-bright text-text-primary font-semibold text-sm hover:border-gold/50 hover:text-gold-bright transition-colors cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Full Portfolio
                  </motion.span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-line py-8 px-4 text-center">
        <p className="text-text-muted text-sm">
          © {new Date().getFullYear()} Antariksh Mankar · Built with Next.js &
          TypeScript
        </p>
      </footer>
    </div>
  );
}
