"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Only enable on true pointer devices
    const canHover = window.matchMedia?.("(hover: hover)").matches;
    const finePointer = window.matchMedia?.("(pointer: fine)").matches;
    if (!canHover || !finePointer) return;

    document.body.style.cursor = "none";

    // Use a single rAF-batched move to avoid GSAP overhead on every pixel
    let rafId = 0;
    let mouseX = 0;
    let mouseY = 0;

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Cancel any pending frame and schedule a fresh one
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        gsap.set(dotRef.current, { x: mouseX, y: mouseY });
        gsap.to(cursorRef.current, {
          x: mouseX,
          y: mouseY,
          duration: 0.18,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
    };

    const handleHover = () => {
      gsap.to(cursorRef.current, {
        scale: 2.5,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        duration: 0.3,
        overwrite: "auto",
      });
    };

    const handleHoverOut = () => {
      gsap.to(cursorRef.current, {
        scale: 1,
        backgroundColor: "transparent",
        duration: 0.3,
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });

    // Scope interactive elements to avoid expensive global querySelectorAll on re-mounts
    const interactiveElements = document.querySelectorAll<HTMLElement>(
      "a, button, input, [role='button'], .group, img, canvas"
    );

    interactiveElements.forEach((el) => {
      el.style.cursor = "none";
      el.addEventListener("mouseenter", handleHover, { passive: true });
      el.addEventListener("mouseleave", handleHoverOut, { passive: true });
    });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", moveCursor);
      document.body.style.cursor = "";
      interactiveElements.forEach((el) => {
        el.style.cursor = "";
        el.removeEventListener("mouseenter", handleHover);
        el.removeEventListener("mouseleave", handleHoverOut);
      });
    };
  }, [pathname]);

  return (
    <>
      {/* Outer ring — GPU-composited via transform */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[9999] mix-blend-difference transform -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{ willChange: "transform" }}
      />
      {/* Inner dot — snaps immediately, no lerp */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference transform -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
