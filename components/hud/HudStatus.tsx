"use client";

import { useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { activeSection, scrollProgress, SECTORS } from "@/lib/dom";

export default function HudStatus() {
  const [sector, setSector] = useState(0);
  const [pct, setPct] = useState(0);

  useMotionValueEvent(activeSection, "change", (v) => setSector(v));
  useMotionValueEvent(scrollProgress, "change", (v) => setPct(Math.round(v * 100)));

  const meta = SECTORS[Math.min(Math.max(sector, 0), SECTORS.length - 1)];

  return (
    <div className="pointer-events-none fixed bottom-5 left-5 z-40 hidden flex-col gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted md:flex">
      <div className="flex items-center gap-2">
        <span className="status-dot" style={{ color: meta.color }} />
        <span style={{ color: meta.color }}>
          Sector-{String(meta.index).padStart(2, "0")}
        </span>
      </div>
      <div>
        {meta.code} · {meta.name}
      </div>
      <div className="flex items-center gap-2">
        <div className="relative h-px w-24 overflow-hidden bg-white/10">
          <div
            className="absolute inset-y-0 left-0"
            style={{
              width: `${pct}%`,
              backgroundColor: meta.color,
              boxShadow: `0 0 6px ${meta.color}`,
            }}
          />
        </div>
        <span>{String(pct).padStart(3, "0")}%</span>
      </div>
    </div>
  );
}
