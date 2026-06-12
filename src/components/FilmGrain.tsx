"use client";

import { useEffect, useState } from "react";

// Lightweight film grain replacement — only render on fine-pointer
// devices and when the user hasn't requested reduced motion. Avoid
// SVG filters (expensive) in favor of a simple CSS pattern.
export default function FilmGrain() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const isCoarse = window.matchMedia?.("(pointer: coarse)")?.matches;
    if (!prefersReduced && !isCoarse) setShow(true);
  }, []);

  if (!show) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9998] h-full w-full opacity-25 mix-blend-overlay">
      <div
        aria-hidden
        className="w-full h-full bg-[repeating-linear-gradient(0deg,#0000_0px,#0000_1px,#0002_1px,#0002_2px)] opacity-10"
        style={{ backgroundSize: '3px 3px' }}
      />
    </div>
  );
}
