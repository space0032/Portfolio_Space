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
    icon: string;
}

const certifications: Certification[] = [
    {
        id: 1,
        name: "Microsoft Certified: DevOps Engineer Expert",
        issuer: "Microsoft",
        date: "2024",
        icon: "🏆",
        featured: true,
    },
    {
        id: 2,
        name: "IBM Certified Software Engineer",
        issuer: "IBM",
        date: "2024",
        icon: "💼",
    },
    {
        id: 3,
        name: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
        issuer: "Oracle",
        date: "2024",
        icon: "🎓",
    },
];

const achievements: Achievement[] = [
    {
        id: 1,
        title: "College Hackathon",
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
        icon: "☕",
    },
    {
        id: 2,
        role: "Software Developer",
        year: "2026",
        description: "Full-stack development with emphasis on automation, CI/CD pipelines, and cloud infrastructure. Bridging the gap between development and operations.",
        technologies: ["React", "Node.js", "AWS", "Kubernetes"],
        icon: "💻",
    },
];

const AchievementsSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [activeTab, setActiveTab] = useState<TabType>("certifications");
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    const tabs = [
        { id: "certifications" as TabType, label: "Certifications", icon: "🎓" },
        { id: "achievements" as TabType, label: "Achievements", icon: "🏆" },
        { id: "experience" as TabType, label: "Experience", icon: "💼" },
    ];

    return (
        <section
            ref={ref}
            className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black px-4 py-20"
            id="achievements"
        >
            <div className="max-w-7xl w-full">
                <motion.h2
                    className="text-4xl md:text-6xl font-bold text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    Achievements & <span className="text-yellow-500">Credentials</span>
                </motion.h2>

                {/* Tabs */}
                <motion.div
                    className="flex justify-center gap-4 mb-12 flex-wrap"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {tabs.map((tab) => (
                        <motion.button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-3 rounded-lg font-semibold transition-all ${activeTab === tab.id
                                ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
                                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="mr-2">{tab.icon}</span>
                            {tab.label}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Content */}
                <motion.div
                    layout
                    className="relative min-h-[400px]"
                    transition={{ duration: 0.3 }}
                >
                    <AnimatePresence mode="wait">
                        {/* Certifications Tab */}
                        {activeTab === "certifications" && (
                            <motion.div
                                key="certifications"
                                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {certifications.map((cert, index) => (
                                    <motion.div
                                        key={cert.id}
                                        className={`relative p-6 rounded-2xl border ${cert.featured
                                                ? "bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-yellow-500"
                                                : "bg-gray-800 border-gray-700"
                                            } hover:border-yellow-500 transition-colors`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        onHoverStart={() => setHoveredId(cert.id)}
                                        onHoverEnd={() => setHoveredId(null)}
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        {cert.featured && (
                                            <div className="absolute -top-3 -right-3 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                                                Featured
                                            </div>
                                        )}
                                        <motion.div
                                            className="text-5xl mb-4"
                                            animate={{
                                                scale: hoveredId === cert.id ? 1.2 : 1,
                                                rotate: hoveredId === cert.id ? 360 : 0,
                                            }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            {cert.icon}
                                        </motion.div>
                                        <h3 className="text-xl font-bold text-white mb-2">
                                            {cert.name}
                                        </h3>
                                        <p className="text-gray-400 mb-2">{cert.issuer}</p>
                                        <p className="text-sm text-yellow-400">{cert.date}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}

                        {/* Achievements Tab */}
                        {activeTab === "achievements" && (
                            <motion.div
                                key="achievements"
                                className="grid md:grid-cols-2 gap-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {achievements.map((achievement, index) => (
                                    <motion.div
                                        key={achievement.id}
                                        className="relative p-6 rounded-2xl bg-gray-800 border border-gray-700 hover:border-yellow-500 transition-colors"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        onHoverStart={() => setHoveredId(achievement.id)}
                                        onHoverEnd={() => setHoveredId(null)}
                                        whileHover={{ scale: 1.03 }}
                                    >
                                        <motion.div
                                            className="text-5xl mb-4"
                                            animate={{
                                                scale: hoveredId === achievement.id ? 1.2 : 1,
                                                rotate: hoveredId === achievement.id ? 360 : 0,
                                            }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            {achievement.icon}
                                        </motion.div>
                                        <h3 className="text-xl font-bold text-white mb-2">
                                            {achievement.title}
                                        </h3>
                                        <p className="text-gray-400 mb-3">{achievement.description}</p>
                                        <p className="text-sm text-yellow-400">{achievement.date}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}

                        {/* Experience Tab */}
                        {activeTab === "experience" && (
                            <motion.div
                                key="experience"
                                className="grid md:grid-cols-2 gap-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {experiences.map((exp, index) => (
                                    <motion.div
                                        key={exp.id}
                                        className="relative p-6 rounded-2xl bg-gray-800 border border-gray-700 hover:border-yellow-500 transition-colors"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        onHoverStart={() => setHoveredId(exp.id)}
                                        onHoverEnd={() => setHoveredId(null)}
                                        whileHover={{ scale: 1.03 }}
                                    >
                                        <motion.div
                                            className="text-5xl mb-4"
                                            animate={{
                                                scale: hoveredId === exp.id ? 1.2 : 1,
                                            }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {exp.icon}
                                        </motion.div>
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                                            <span className="text-yellow-400 font-semibold">{exp.year}</span>
                                        </div>
                                        <p className="text-gray-400 mb-4">{exp.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {exp.technologies.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default AchievementsSection;
