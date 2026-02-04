"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  demoLink: string;
  githubLink: string;
  image: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Smart Attendance System",
    description: "An intelligent attendance tracking system built with Java and Spring Boot. Features automated attendance management, real-time tracking, and comprehensive reporting capabilities.",
    techStack: ["Java", "Spring Boot", "MySQL", "REST API"],
    demoLink: "https://github.com/space0032/smart_attandance_system",
    githubLink: "https://github.com/space0032/smart_attandance_system",
    image: "📋",
  },
  {
    id: 2,
    title: "College Management System",
    description: "A comprehensive college management platform with student enrollment, course management, and administrative features. Built with modern Java technologies.",
    techStack: ["Java", "Spring Framework", "MySQL", "JPA"],
    demoLink: "https://github.com/space0032/College-Management-2",
    githubLink: "https://github.com/space0032/College-Management-2",
    image: "🎓",
  },
  {
    id: 3,
    title: "Smart Clinic Management",
    description: "Healthcare management system for clinics with patient records, appointment scheduling, and medical history tracking. Features a modern JavaScript-based interface.",
    techStack: ["JavaScript", "Node.js", "React", "MongoDB"],
    demoLink: "https://github.com/space0032/Smart-Clinic-Management-System",
    githubLink: "https://github.com/space0032/Smart-Clinic-Management-System",
    image: "🏥",
  },
  {
    id: 4,
    title: "Hackathon Voting System",
    description: "Real-time voting platform for hackathons with secure authentication, live vote counting, and admin dashboard. Built with TypeScript and Next.js.",
    techStack: ["TypeScript", "Next.js", "React", "TailwindCSS"],
    demoLink: "https://github.com/space0032/Hackathon_Voting_System",
    githubLink: "https://github.com/space0032/Hackathon_Voting_System",
    image: "🗳️",
  },
  {
    id: 5,
    title: "Java Validation Sanitizer",
    description: "A robust Java library for input validation and sanitization. Helps prevent security vulnerabilities like SQL injection and XSS attacks.",
    techStack: ["Java", "Security", "Validation", "Testing"],
    demoLink: "https://github.com/space0032/java-validation-sanitizer",
    githubLink: "https://github.com/space0032/java-validation-sanitizer",
    image: "🔒",
  },
  {
    id: 6,
    title: "Data Science Projects",
    description: "Collection of data science projects and Jupyter notebooks covering machine learning, data analysis, and visualization techniques.",
    techStack: ["Python", "Jupyter", "Pandas", "Machine Learning"],
    demoLink: "https://github.com/space0032/Tutudude_DataScience",
    githubLink: "https://github.com/space0032/Tutudude_DataScience",
    image: "📊",
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [flippedId, setFlippedId] = useState<number | null>(null);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black px-4 py-20"
      id="projects"
    >
      <div className="max-w-7xl w-full">
        <motion.h2
          className="text-4xl md:text-6xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          My <span className="text-purple-500">Projects</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="relative h-80 cursor-pointer"
              style={{ perspective: "1000px" }}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onHoverStart={() => setHoveredId(project.id)}
              onHoverEnd={() => setHoveredId(null)}
              onClick={() => setFlippedId(flippedId === project.id ? null : project.id)}
            >
              <motion.div
                className="relative w-full h-full"
                animate={{
                  rotateY: flippedId === project.id ? 180 : 0,
                }}
                transition={{ duration: 0.6 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Front of card */}
                <div
                  className="absolute w-full h-full backface-hidden rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 overflow-hidden"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="p-8 h-full flex flex-col items-center justify-center relative">
                    <motion.div
                      className="text-8xl mb-4"
                      animate={{
                        scale: hoveredId === project.id ? 1.2 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {project.image}
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-2 text-center">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-center text-sm">
                      Click to see details
                    </p>

                    {/* Hover glow effect */}
                    {hoveredId === project.id && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </div>
                </div>

                {/* Back of card */}
                <div
                  className="absolute w-full h-full backface-hidden rounded-2xl bg-gradient-to-br from-blue-900 to-purple-900 border border-blue-500 p-6 overflow-y-auto"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4 text-sm">
                    {project.description}
                  </p>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-blue-300 mb-2">
                      Tech Stack:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-blue-500/30 text-blue-200 rounded-full text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-white text-purple-900 rounded-lg font-semibold hover:bg-gray-200 transition-colors mt-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View on GitHub →
                  </a>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Add a "Contact Me" button */}
        <div className="text-center mt-12">
          <button
            onClick={() => scrollToSection("contact")}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
          >
            Contact Me
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
