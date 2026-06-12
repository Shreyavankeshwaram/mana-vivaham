"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isFinePointer = window.matchMedia?.("(pointer: fine)")?.matches;
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (!isFinePointer || prefersReduced) return;

    document.body.style.cursor = "none";

    let rafId: number | null = null;
    let mouseX = 0;
    let mouseY = 0;
    let curX = 0;
    let curY = 0;

    const lerp = (a: number, b: number, n = 0.18) => (1 - n) * a + n * b;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (rafId == null) rafId = requestAnimationFrame(loop);
    };

    const loop = () => {
      curX = lerp(curX, mouseX);
      curY = lerp(curY, mouseY);
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${curX}px, ${curY}px, 0) translate(-50%, -50%)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(loop);
    };

    const interactiveElements = Array.from(document.querySelectorAll("a, button, input, [role='button']")) as HTMLElement[];

    const handleHover = () => {
      if (cursorRef.current) cursorRef.current.style.transform += " scale(2.2)";
      if (cursorRef.current) cursorRef.current.style.backgroundColor = "rgba(255,255,255,0.06)";
    };
    const handleHoverOut = () => {
      if (cursorRef.current) cursorRef.current.style.backgroundColor = "transparent";
    };

    window.addEventListener("mousemove", onMove);
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleHover);
      el.addEventListener("mouseleave", handleHoverOut);
    });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleHover);
        el.removeEventListener("mouseleave", handleHoverOut);
      });
      document.body.style.cursor = "";
    };
  }, [pathname]);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[9999] mix-blend-difference transform -translate-x-1/2 -translate-y-1/2 hidden md:block transition-transform duration-200"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference transform -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{ willChange: 'transform' }}
      />
    </>
  );
}
