"use client";

import { forwardRef, ReactNode } from "react";
import Corners from "./Corners";

interface SectionShellProps {
  id: string;
  index: number;
  code: string;
  name: string;
  accent: string;
  children: ReactNode;
  overlay?: ReactNode;
  className?: string;
}

const SectionShell = forwardRef<HTMLElement, SectionShellProps>(
  function SectionShell(
    {
      id,
      index,
      code,
      name,
      accent,
      children,
      overlay,
      className = "",
    }: SectionShellProps,
    ref
  ) {
    const num = String(index).padStart(2, "0");

    return (
      <section
        id={id}
        ref={ref}
        className={`relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-28 sm:px-6 lg:px-8 ${className}`}
      >
        <div className="hud-grid pointer-events-none absolute inset-0 opacity-70" />
        <div className="scanlines" />
        <div className="crt-vignette" />
        <Corners color={`${accent}33`} />

        {/* Top-left sector readout */}
        <div className="pointer-events-none absolute left-5 top-24 z-10 flex items-center gap-3 sm:left-10">
          <span className="hud-label" style={{ color: accent }}>
            Sector-{num} / {code}
          </span>
          <span className="hud-divider w-20" />
          <span className="hud-label hidden text-text-muted sm:inline">{name}</span>
        </div>

        {/* Watermark number */}
        <span
          aria-hidden
          className="section-num absolute right-0 top-1/2 hidden -translate-y-1/2 md:block"
          style={{ WebkitTextStroke: `1px ${accent}18` }}
        >
          {num}
        </span>

        {/* Bottom-right coordinates */}
        <div className="pointer-events-none absolute bottom-6 right-5 z-10 hidden text-right sm:right-10 md:block">
          <div className="hud-label text-text-muted/70">
            SYS.ONLINE · SEC-{num} · {accent.replace("#", "").toUpperCase()}
          </div>
        </div>

        <div className="relative z-10 w-full max-w-7xl">{children}</div>
        {overlay}
      </section>
    );
  }
);

export default SectionShell;
