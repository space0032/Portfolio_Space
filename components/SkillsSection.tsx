"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

interface Skill {
  name: string;
  level: number;
  experience: string;
  projects: number;
  icon: string;
}

const skills: Skill[] = [
  { name: "React.js", level: 90, experience: "5 years", projects: 8, icon: "⚛️" },
  { name: "TypeScript", level: 85, experience: "4 years", projects: 6, icon: "📘" },
  { name: "Node.js", level: 80, experience: "4 years", projects: 7, icon: "🟢" },
  { name: "Next.js", level: 88, experience: "3 years", projects: 5, icon: "▲" },
  { name: "TailwindCSS", level: 92, experience: "3 years", projects: 10, icon: "🎨" },
  { name: "MongoDB", level: 75, experience: "3 years", projects: 5, icon: "🍃" },
  { name: "Python", level: 70, experience: "2 years", projects: 4, icon: "🐍" },
  { name: "Docker", level: 65, experience: "2 years", projects: 3, icon: "🐳" },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900 px-4 py-20"
      id="skills"
    >
      <div className="max-w-6xl w-full">
        <motion.h2
          className="text-4xl md:text-6xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          My <span className="text-green-500">Skills</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="relative"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onHoverStart={() => setHoveredSkill(skill.name)}
              onHoverEnd={() => setHoveredSkill(null)}
            >
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-green-500 transition-colors relative overflow-hidden">
                {/* Skill header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <motion.span
                      className="text-3xl"
                      animate={{
                        scale: hoveredSkill === skill.name ? 1.2 : 1,
                        rotate: hoveredSkill === skill.name ? 360 : 0,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {skill.icon}
                    </motion.span>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {skill.name}
                      </h3>
                    </div>
                  </div>
                  <span className="text-green-400 font-bold text-lg">
                    {skill.level}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="relative h-3 bg-gray-700 rounded-full overflow-hidden mb-3">
                  <motion.div
                    className="absolute h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
                    initial={{ width: "0%" }}
                    animate={isInView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                  />
                </div>

                {/* Tooltip on hover */}
                <motion.div
                  className="overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: hoveredSkill === skill.name ? "auto" : 0,
                    opacity: hoveredSkill === skill.name ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="pt-2 border-t border-gray-700 mt-2">
                    <p className="text-gray-400 text-sm">
                      <span className="text-green-400 font-semibold">
                        {skill.experience}
                      </span>{" "}
                      of experience
                    </p>
                    <p className="text-gray-400 text-sm">
                      Completed{" "}
                      <span className="text-blue-400 font-semibold">
                        {skill.projects} projects
                      </span>
                    </p>
                  </div>
                </motion.div>

                {/* Glow effect on hover */}
                {hoveredSkill === skill.name && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional skill badges */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-white mb-6">
            Other Technologies
          </h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {["Git", "GraphQL", "REST APIs", "AWS", "Redis", "PostgreSQL", "Jest", "CI/CD"].map(
              (tech, index) => (
                <motion.span
                  key={tech}
                  className="px-4 py-2 bg-gray-800 text-gray-300 rounded-full border border-gray-700 hover:border-blue-500 hover:text-blue-400 transition-all cursor-pointer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.9 + index * 0.05 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                >
                  {tech}
                </motion.span>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
