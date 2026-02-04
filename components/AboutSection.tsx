"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900 px-4 py-20"
      id="about"
    >
      <motion.div
        className="max-w-6xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h2
          className="text-4xl md:text-6xl font-bold text-center mb-12"
          variants={itemVariants}
        >
          About <span className="text-blue-500">Me</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Animated profile image */}
          <motion.div
            className="flex justify-center"
            variants={itemVariants}
          >
            <motion.div
              className="relative w-64 h-64 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-1"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-full h-full bg-gray-800 rounded-2xl flex items-center justify-center">
                <span className="text-8xl">👨‍💻</span>
              </div>
            </motion.div>
          </motion.div>

          {/* About text */}
          <motion.div variants={itemVariants}>
            <p className="text-lg text-gray-300 mb-6">
              I&apos;m Antariksh Mankar, a passionate software developer with expertise in building modern,
              scalable, and user-friendly web applications. With a strong
              foundation in both frontend and backend technologies, I create
              seamless digital experiences that solve real-world problems.
            </p>
            <p className="text-lg text-gray-300 mb-6">
              My journey in software development has been driven by continuous learning
              and a commitment to excellence. I specialize in full-stack development,
              working with cutting-edge technologies to deliver high-quality solutions
              that make a difference.
            </p>

            {/* Timeline achievements */}
            <motion.div className="space-y-4 mt-8" variants={itemVariants}>
              {[
                { year: "2024", title: "Software Developer" },
                { year: "2023", title: "Full Stack Development" },
                { year: "2022", title: "Started Professional Journey" },
              ].map((achievement, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors"
                  whileHover={{ x: 10 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center font-bold">
                    {achievement.year}
                  </div>
                  <div className="text-white font-semibold">
                    {achievement.title}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
