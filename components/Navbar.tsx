"use client";

import { motion, useMotionValueEvent, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { activeSection, scrollProgress, SECTORS, scrollControlsStore } from "@/lib/dom";

const navLinks = [
  { id: "home", code: "IDENT", index: 0 },
  { id: "about", code: "PROFILE", index: 1 },
  { id: "skills", code: "SYSTEMS", index: 2 },
  { id: "achievements", code: "LOG", index: 3 },
  { id: "projects", code: "ARCHIVE", index: 4 },
  { id: "contact", code: "TRANSMISSION", index: 5 },
];

const RESUME_URL =
  "https://drive.google.com/file/d/1acZLfDyLRgRAAsdpoavzDRzYTYn6vq30/view?usp=sharing";

const Navbar = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const progressWidth = useTransform(scrollProgress, (v) => `${Math.round(v * 100)}%`);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstItemRef = useRef<HTMLButtonElement>(null);

  useMotionValueEvent(activeSection, "change", (v) => setActiveIdx(v));

  const activeMeta = SECTORS[Math.min(Math.max(activeIdx, 0), SECTORS.length - 1)];

  const closeMenu = () => {
    setIsMobileOpen(false);
    menuButtonRef.current?.focus();
  };

  useEffect(() => {
    if (!isMobileOpen) return;
    const el = scrollControlsStore.el ?? document.documentElement;
    const prevOverflow = el.style.overflow;
    el.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    firstItemRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      el.style.overflow = prevOverflow;
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobileOpen]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    closeMenu();
  };

  return (
    <>
      <motion.nav
        className="fixed left-0 right-0 top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Scroll progress hairline */}
        <motion.div
          className="h-0.5 origin-left"
          style={{
            width: progressWidth,
            background: "linear-gradient(90deg, var(--accent-cyan), var(--accent-violet))",
          }}
        />

        <div
          className={`transition-all duration-500 ${
            activeIdx > 0 ? "border-b border-white/5 bg-bg-primary/70 backdrop-blur-md" : ""
          }`}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            {/* Brand */}
            <button
              onClick={() => scrollTo("home")}
              className="group flex cursor-pointer items-center gap-2"
            >
              <span className="hud-label opacity-60 transition-opacity group-hover:opacity-100" style={{ color: activeMeta.color }}>
                &lt;
              </span>
              <span className="font-mono text-lg font-bold tracking-wide text-text-primary transition-colors group-hover:text-accent-cyan">
                Antariksh
              </span>
              <span className="hud-label opacity-60 transition-opacity group-hover:opacity-100" style={{ color: activeMeta.color }}>
                /&gt;
              </span>
            </button>

            {/* Desktop sector links */}
            <div className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => {
                const active = activeIdx === link.index;
                return (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className="group relative cursor-pointer px-3 py-2"
                  >
                    <span
                      className={`hud-label transition-colors ${
                        active ? "" : "text-text-muted group-hover:text-text-primary"
                      }`}
                      style={active ? { color: activeMeta.color } : undefined}
                    >
                      <span className="opacity-50">{String(link.index + 1).padStart(2, "0")}</span>{" "}
                      {link.code}
                    </span>
                    {active && (
                      <motion.span
                        layoutId="navActive"
                        className="absolute -bottom-0.5 left-2 right-2 h-px"
                        style={{
                          backgroundColor: activeMeta.color,
                          boxShadow: `0 0 8px ${activeMeta.color}`,
                        }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right cluster */}
            <div className="flex items-center gap-4">
              <div className="hidden items-center gap-2 xl:flex">
                <span className="status-dot" style={{ color: activeMeta.color }} />
                <span className="hud-label text-text-muted">Sys.Online</span>
              </div>

              <motion.a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-2 border border-accent-cyan/30 px-4 py-2 font-mono text-xs tracking-widest text-accent-cyan transition-all hover:bg-accent-cyan/10 sm:flex"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Resume
              </motion.a>

              {/* Hamburger */}
              <motion.button
                ref={menuButtonRef}
                className="flex flex-col gap-1.5 p-2 lg:hidden"
                onClick={() => setIsMobileOpen((o) => !o)}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle menu"
                aria-expanded={isMobileOpen}
                aria-controls="mobile-menu"
              >
                <motion.span
                  className="block h-0.5 w-6 bg-text-primary"
                  animate={isMobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                />
                <motion.span
                  className="block h-0.5 w-6 bg-text-primary"
                  animate={isMobileOpen ? { opacity: 0 } : { opacity: 1 }}
                />
                <motion.span
                  className="block h-0.5 w-6 bg-text-primary"
                  animate={isMobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile full-screen overlay menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 lg:hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={{ open: { visibility: "visible" }, closed: { visibility: "hidden" } }}
          >
            <motion.div
              className="absolute inset-0 bg-bg-primary/95 backdrop-blur-md"
              variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
              onClick={closeMenu}
            />
            <motion.div
              className="hud-grid absolute inset-0 opacity-50"
              variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
            />
            <motion.div
              className="absolute inset-0 flex flex-col items-start justify-center gap-2 px-8"
              initial="closed"
              animate="open"
              exit="closed"
            >
              {navLinks.map((link, i) => {
                const active = activeIdx === link.index;
                const meta = SECTORS[link.index];
                return (
                  <motion.button
                    key={link.id}
                    ref={i === 0 ? firstItemRef : undefined}
                    onClick={() => scrollTo(link.id)}
                    className="group flex cursor-pointer items-baseline gap-4 py-2"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: 0.06 * i + 0.1 }}
                  >
                    <span className="hud-label text-text-muted">{String(link.index + 1).padStart(2, "0")}</span>
                    <span
                      className="text-3xl font-bold tracking-widest transition-colors"
                      style={{ color: active ? meta.color : "var(--text-secondary)" }}
                    >
                      {link.code}
                    </span>
                  </motion.button>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
