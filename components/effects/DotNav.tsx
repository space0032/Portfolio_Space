"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "home", label: "Threshold" },
  { id: "about", label: "Chapter I" },
  { id: "skills", label: "Chapter II" },
  { id: "achievements", label: "Chapter III" },
  { id: "projects", label: "Chapter IV" },
  { id: "contact", label: "Chapter V" },
];

export default function DotNav() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) spy.observe(el);
    });
    return () => spy.disconnect();
  }, []);

  return (
    <nav className="dotnav" aria-label="Section navigation">
      {SECTIONS.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          data-label={label}
          className={active === id ? "active" : ""}
          aria-label={label}
        />
      ))}
    </nav>
  );
}
