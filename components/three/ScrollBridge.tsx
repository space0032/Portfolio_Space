"use client";

import { useScroll } from "@react-three/drei";
import { useEffect } from "react";
import { scrollControlsStore } from "@/lib/dom";

export default function ScrollBridge() {
  const scroll = useScroll();

  useEffect(() => {
    scrollControlsStore.el = scroll.el;
  }, [scroll.el]);

  return null;
}
