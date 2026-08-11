import { ReactNode } from "react";

export default function HudLabel({
  children,
  accent,
  className = "",
}: {
  children: ReactNode;
  accent?: string;
  className?: string;
}) {
  return (
    <span
      className={`hud-label ${className}`}
      style={accent ? { color: accent } : undefined}
    >
      {children}
    </span>
  );
}
