"use client";

import { useEffect, useState } from "react";
import { scrollControlsStore } from "@/lib/dom";

export default function ScrollProgress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    let currentEl: HTMLElement | null = null;

    const compute = () => {
      const el = currentEl ?? document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setWidth(max > 0 ? Math.min(100, Math.max(0, (el.scrollTop / max) * 100)) : 0);
    };

    const onScroll = () => compute();

    const attach = () => {
      const el = scrollControlsStore.el;
      if (el && el !== currentEl) {
        if (currentEl) currentEl.removeEventListener("scroll", onScroll);
        currentEl = el;
        el.addEventListener("scroll", onScroll, { passive: true });
        compute();
      }
    };

    document.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const interval = setInterval(attach, 400);
    attach();

    return () => {
      clearInterval(interval);
      document.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      currentEl?.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <div className="scroll-progress" style={{ width: `${width}%` }} />;
}
