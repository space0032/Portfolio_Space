"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const HeroSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-black">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 4 + 1,
              height: Math.random() * 4 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4">
        {/* Animated headline */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Hi, I&apos;m{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Antariksh Mankar
          </span>
        </motion.h1>

        {/* Animated subtitle */}
        <motion.p
          className="text-xl md:text-2xl text-gray-300 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Software Developer | Full Stack Engineer | Tech Enthusiast
        </motion.p>

        {/* Animated profile image placeholder */}
        <motion.div
          className="w-40 h-40 mx-auto mb-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <span className="text-6xl">👨‍💻</span>
        </motion.div>

        {/* Social media links with hover effects */}
        <motion.div
          className="flex gap-6 justify-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {[
            { name: "GitHub", url: "#" },
            { name: "LinkedIn", url: "https://www.linkedin.com/in/antariksh-mankar/" },
            { name: "Twitter", url: "#" },
          ].map((social, index) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg border border-gray-600 hover:border-blue-500"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
            >
              {social.name}
            </motion.a>
          ))}
        </motion.div>

        {/* Glowing Contact Me button */}
        <motion.button
          className="relative px-8 py-4 text-lg font-semibold text-white rounded-full overflow-hidden"
          style={{
            background: isHovered
              ? "linear-gradient(45deg, #667eea 0%, #764ba2 100%)"
              : "linear-gradient(45deg, #4a5568 0%, #2d3748 100%)",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            className="absolute inset-0 bg-white"
            style={{ opacity: isHovered ? 0.2 : 0 }}
            animate={{
              scale: isHovered ? [1, 1.5, 1] : 1,
            }}
            transition={{ duration: 0.6 }}
          />
          <span className="relative z-10">Contact Me</span>
        </motion.button>

        {/* Scroll down indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="text-white text-sm">Scroll Down</div>
          <div className="mt-2 mx-auto w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <motion.div
              className="w-1 h-2 bg-white rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
