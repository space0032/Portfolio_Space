"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect } from "react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#achievements" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map((link) => link.href.replace("#", ""));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "glass py-3"
            : "bg-transparent py-5"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={() => scrollToSection("#home")}
            className="flex items-center gap-2 group cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-accent-cyan font-mono text-lg opacity-60 group-hover:opacity-100 transition-opacity">
              &lt;
            </span>
            <span className="text-xl font-bold text-text-primary">
              Antariksh
            </span>
            <span className="text-accent-cyan font-mono text-lg opacity-60 group-hover:opacity-100 transition-opacity">
              /&gt;
            </span>
          </motion.button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <motion.button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg cursor-pointer ${
                  activeSection === link.href.replace("#", "")
                    ? "text-accent-cyan"
                    : "text-text-secondary hover:text-text-primary"
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.name}
                {activeSection === link.href.replace("#", "") && (
                  <motion.div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-accent-cyan rounded-full"
                    layoutId="activeSection"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Resume Button + Mobile Hamburger */}
          <div className="flex items-center gap-4">
            <motion.a
              href="https://drive.google.com/file/d/1acZLfDyLRgRAAsdpoavzDRzYTYn6vq30/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-full border border-accent-cyan/30 text-accent-cyan text-sm font-medium hover:bg-accent-cyan/10 transition-all cursor-pointer"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 240, 255, 0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Resume
            </motion.a>

            {/* Mobile hamburger */}
            <motion.button
              className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              whileTap={{ scale: 0.9 }}
            >
              <motion.span
                className="w-6 h-0.5 bg-text-primary block"
                animate={isMobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              />
              <motion.span
                className="w-6 h-0.5 bg-text-primary block"
                animate={isMobileOpen ? { opacity: 0 } : { opacity: 1 }}
              />
              <motion.span
                className="w-6 h-0.5 bg-text-primary block"
                animate={isMobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu drawer */}
      <motion.div
        className="fixed inset-0 z-40 md:hidden"
        initial={false}
        animate={isMobileOpen ? "open" : "closed"}
        variants={{
          open: { visibility: "visible" as const },
          closed: { visibility: "hidden" as const, transition: { delay: 0.3 } },
        }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          variants={{
            open: { opacity: 1 },
            closed: { opacity: 0 },
          }}
          onClick={() => setIsMobileOpen(false)}
        />

        {/* Menu */}
        <motion.div
          className="absolute right-0 top-0 h-full w-64 glass-card bg-bg-primary/95 p-8 pt-24 flex flex-col gap-2"
          variants={{
            open: { x: 0 },
            closed: { x: "100%" },
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {navLinks.map((link, index) => (
            <motion.button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className={`text-left px-4 py-3 rounded-lg text-lg font-medium transition-colors cursor-pointer ${
                activeSection === link.href.replace("#", "")
                  ? "text-accent-cyan bg-accent-cyan/10"
                  : "text-text-secondary hover:text-text-primary hover:bg-white/5"
              }`}
              initial={{ opacity: 0, x: 20 }}
              animate={isMobileOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ delay: index * 0.05 + 0.1 }}
            >
              {link.name}
            </motion.button>
          ))}

          <motion.a
            href="https://drive.google.com/file/d/1acZLfDyLRgRAAsdpoavzDRzYTYn6vq30/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-accent-cyan/30 text-accent-cyan font-medium hover:bg-accent-cyan/10 transition-all"
            initial={{ opacity: 0, x: 20 }}
            animate={isMobileOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ delay: 0.4 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Resume
          </motion.a>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Navbar;
