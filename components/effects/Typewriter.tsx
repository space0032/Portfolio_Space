"use client";

import { useEffect, useState } from "react";

interface TypewriterProps {
  phrases: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  holdTime?: number;
}

export default function Typewriter({
  phrases,
  typeSpeed = 45,
  deleteSpeed = 30,
  holdTime = 1600,
}: TypewriterProps) {
  const [text, setText] = useState("");

  useEffect(() => {
    let phraseIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = phrases[phraseIdx];
      if (!deleting) {
        charIdx++;
        setText(current.slice(0, charIdx));
        if (charIdx === current.length) {
          deleting = true;
          timer = setTimeout(tick, holdTime);
          return;
        }
      } else {
        charIdx--;
        setText(current.slice(0, charIdx));
        if (charIdx === 0) {
          deleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
        }
      }
      timer = setTimeout(tick, deleting ? deleteSpeed : typeSpeed);
    };

    timer = setTimeout(tick, typeSpeed);
    return () => clearTimeout(timer);
  }, [phrases, typeSpeed, deleteSpeed, holdTime]);

  return (
    <span className="inline-flex items-center">
      <span>{text}</span>
      <span className="cursor-blink" aria-hidden="true" />
    </span>
  );
}
