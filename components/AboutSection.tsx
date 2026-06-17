"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const codeContent = [
  { lineNum: 1, content: [{ text: "interface", type: "keyword" }, { text: " Developer ", type: "type" }, { text: "{", type: "operator" }] },
  { lineNum: 2, content: [{ text: "  name", type: "property" }, { text: ":", type: "operator" }, { text: ' "Antariksh Mankar"', type: "string" }, { text: ";", type: "operator" }] },
  { lineNum: 3, content: [{ text: "  role", type: "property" }, { text: ":", type: "operator" }, { text: ' "Software Development Engineer"', type: "string" }, { text: ";", type: "operator" }] },
  { lineNum: 4, content: [{ text: "  location", type: "property" }, { text: ":", type: "operator" }, { text: ' "Gandhinagar, Gujarat, India"', type: "string" }, { text: ";", type: "operator" }] },
  { lineNum: 5, content: [{ text: "  focus", type: "property" }, { text: ":", type: "operator" }, { text: ' ["Backend", "DevOps", "Full Stack"]', type: "string" }, { text: ";", type: "operator" }] },
  { lineNum: 6, content: [{ text: "}", type: "operator" }] },
  { lineNum: 7, content: [] },
  { lineNum: 8, content: [{ text: "// Passionate about building scalable systems", type: "comment" }] },
  { lineNum: 9, content: [{ text: "const", type: "keyword" }, { text: " aboutMe", type: "variable" }, { text: " = ", type: "operator" }, { text: "{", type: "operator" }] },
  { lineNum: 10, content: [{ text: "  bio", type: "property" }, { text: ": ", type: "operator" }, { text: '"A dedicated Backend Developer"', type: "string" }, { text: ",", type: "operator" }] },
  { lineNum: 11, content: [{ text: "  expertise", type: "property" }, { text: ": ", type: "operator" }, { text: '"DevOps & Cloud"', type: "string" }, { text: ",", type: "operator" }] },
  { lineNum: 12, content: [{ text: "  certified", type: "property" }, { text: ": ", type: "operator" }, { text: "true", type: "keyword" }, { text: ",", type: "operator" }] },
  { lineNum: 13, content: [{ text: "  hackathonWinner", type: "property" }, { text: ": ", type: "operator" }, { text: "true", type: "keyword" }] },
  { lineNum: 14, content: [{ text: "};", type: "operator" }] },
];

const timeline = [
  {
    year: "2024",
    title: "Microsoft Certified DevOps Expert",
    description: "Earned Microsoft Certified: DevOps Engineer Expert certification",
    color: "accent-cyan",
  },
  {
    year: "2025",
    title: "Java Developer",
    description: "Built robust backend systems with Java, Spring Boot & microservices",
    color: "accent-violet",
  },
  {
    year: "2026",
    title: "Software Developer",
    description: "Full-stack development, CI/CD pipelines & cloud infrastructure",
    color: "accent-amber",
  },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center px-4 py-24 overflow-hidden"
      id="about"
      style={{ background: "linear-gradient(180deg, #0a0f1e 0%, #0f172a 50%, #0a0f1e 100%)" }}
    >
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

      <div className="max-w-6xl w-full relative z-10">
        {/* Section heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent-cyan font-mono text-sm tracking-wider uppercase block mb-3">
            &lt;about /&gt;
          </span>
          <h2 className="text-4xl md:text-6xl font-bold">
            About{" "}
            <span className="bg-gradient-to-r from-accent-cyan to-accent-violet bg-clip-text text-transparent">
              Me
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left — Code editor window */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="code-window">
              <div className="code-titlebar">
                <div className="code-dot code-dot-red" />
                <div className="code-dot code-dot-yellow" />
                <div className="code-dot code-dot-green" />
                <span className="ml-3 text-text-muted text-xs font-mono">about_me.ts</span>
              </div>
              <div className="p-5 font-mono text-[13px] leading-relaxed overflow-x-auto">
                {codeContent.map((line, lineIndex) => (
                  <motion.div
                    key={line.lineNum}
                    className="flex"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.3 + lineIndex * 0.05 }}
                  >
                    <span className="text-text-muted/40 w-8 text-right mr-4 select-none flex-shrink-0">
                      {line.lineNum}
                    </span>
                    <span>
                      {line.content.length === 0 ? (
                        <br />
                      ) : (
                        line.content.map((token, tokenIndex) => (
                          <span
                            key={tokenIndex}
                            className={
                              token.type === "keyword" ? "syntax-keyword" :
                              token.type === "type" ? "syntax-type" :
                              token.type === "string" ? "syntax-string" :
                              token.type === "operator" ? "syntax-operator" :
                              token.type === "property" ? "syntax-property" :
                              token.type === "variable" ? "syntax-variable" :
                              token.type === "comment" ? "syntax-comment" :
                              "text-text-primary"
                            }
                          >
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

          {/* Right — About text + timeline */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <p className="text-text-secondary text-lg leading-relaxed mb-4">
              I&apos;m a dedicated Backend Developer with a strong focus on DevOps. 🚀 A proven problem-solver who secured first place in my college&apos;s internal hackathon.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed mb-4">
              My expertise lies in automating workflows and building scalable systems using <span className="text-accent-cyan">Java</span> and <span className="text-accent-violet">React.js</span>.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed mb-8">
              As a <span className="text-accent-amber">Microsoft Certified DevOps Engineer Expert</span>, with additional certifications from IBM and Oracle, I&apos;m passionate about bridging the gap between development and operations to deliver high-quality, efficient solutions. 💡
            </p>

            {/* Timeline */}
            <div className="relative">
              {/* Timeline line */}
              <motion.div
                className="absolute left-[17px] top-0 w-px bg-gradient-to-b from-accent-cyan via-accent-violet to-accent-amber"
                initial={{ height: 0 }}
                animate={isInView ? { height: "100%" } : {}}
                transition={{ duration: 1.5, delay: 0.5 }}
              />

              <div className="space-y-6">
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex gap-5 group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.15 }}
                  >
                    {/* Dot */}
                    <div className="relative flex-shrink-0">
                      <motion.div
                        className={`w-9 h-9 rounded-full bg-${item.color}/20 border-2 border-${item.color} flex items-center justify-center`}
                        style={{
                          backgroundColor: item.color === "accent-cyan" ? "rgba(0,240,255,0.1)" :
                                         item.color === "accent-violet" ? "rgba(139,92,246,0.1)" :
                                         "rgba(245,158,11,0.1)",
                          borderColor: item.color === "accent-cyan" ? "#00f0ff" :
                                      item.color === "accent-violet" ? "#8b5cf6" : "#f59e0b",
                        }}
                        whileHover={{ scale: 1.2 }}
                      >
                        <span className="text-xs font-mono font-bold" style={{
                          color: item.color === "accent-cyan" ? "#00f0ff" :
                                item.color === "accent-violet" ? "#8b5cf6" : "#f59e0b",
                        }}>
                          {item.year.slice(2)}
                        </span>
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="glass-card rounded-xl p-4 flex-1 group-hover:border-accent-cyan/20 transition-all">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-text-muted text-xs font-mono">{item.year}</span>
                      </div>
                      <h4 className="text-text-primary font-semibold text-lg">{item.title}</h4>
                      <p className="text-text-secondary text-sm mt-1">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Download resume as terminal command */}
            <motion.a
              href="https://drive.google.com/file/d/1acZLfDyLRgRAAsdpoavzDRzYTYn6vq30/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 mt-8 px-6 py-3 rounded-lg bg-white/5 border border-white/10 hover:border-accent-cyan/30 transition-all group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1 }}
              whileHover={{ scale: 1.02, x: 5 }}
            >
              <span className="text-accent-cyan font-mono text-sm">$</span>
              <span className="text-text-secondary font-mono text-sm group-hover:text-text-primary transition-colors">
                download resume.pdf
              </span>
              <svg className="w-4 h-4 text-text-muted group-hover:text-accent-cyan transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
