"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { scrollControlsStore } from "@/lib/dom";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let el: HTMLElement | null = null;
    let raf = 0;

    const onScroll = () => {
      if (el) setIsVisible(el.scrollTop > 500);
    };

    const tick = () => {
      if (scrollControlsStore.el) {
        el = scrollControlsStore.el;
        el.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
      } else {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      el?.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollToTop = () => {
    const el = scrollControlsStore.el;
    if (el) {
      el.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <motion.button
      onClick={scrollToTop}
      className="group fixed bottom-8 right-8 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full hud-panel"
      initial={{ opacity: 0, scale: 0 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(212, 175, 106, 0.3)" }}
      whileTap={{ scale: 0.9 }}
      aria-label="Scroll to top"
    >
      <span className="hud-label absolute -top-7 whitespace-nowrap text-text-muted/60 opacity-0 transition-opacity group-hover:opacity-100">
        top
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-accent-cyan group-hover:animate-bounce-gentle"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </motion.button>
  );
};

export default ScrollToTop;
