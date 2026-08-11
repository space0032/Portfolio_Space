export default function Corners({
  color = "rgba(148, 163, 184, 0.35)",
  className = "",
}: {
  color?: string;
  className?: string;
}) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`}>
      <span className="hud-corner hud-corner--tl" style={{ borderColor: color }} />
      <span className="hud-corner hud-corner--tr" style={{ borderColor: color }} />
      <span className="hud-corner hud-corner--bl" style={{ borderColor: color }} />
      <span className="hud-corner hud-corner--br" style={{ borderColor: color }} />
    </div>
  );
}
