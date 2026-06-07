"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Only enable custom cursor on devices with a real mouse/trackpad.
    const canHover = window.matchMedia?.("(hover: hover)").matches;
    const finePointer = window.matchMedia?.("(pointer: fine)").matches;
    if (!canHover || !finePointer) return;

    // Hide default cursor on body
    document.body.style.cursor = "none";

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out",
      });
      gsap.to(dotRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.05,
        ease: "power2.out",
      });
    };

    const handleHover = () => {
      gsap.to(cursorRef.current, {
        scale: 2.5,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        duration: 0.3,
      });
    };

    const handleHoverOut = () => {
      gsap.to(cursorRef.current, {
        scale: 1,
        backgroundColor: "transparent",
        duration: 0.3,
      });
    };

    window.addEventListener("mousemove", moveCursor);

    // Target elements that should trigger hover state
    const interactiveElements = document.querySelectorAll(
      "a, button, input, [role='button'], .group, img, canvas"
    );

    interactiveElements.forEach((el) => {
      (el as HTMLElement).style.cursor = "none";
      el.addEventListener("mouseenter", handleHover);
      el.addEventListener("mouseleave", handleHoverOut);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.body.style.cursor = "";
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleHover);
        el.removeEventListener("mouseleave", handleHoverOut);
      });
    };
  }, [pathname]);

  return (
    <>
      {/* Outer Circle */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[9999] mix-blend-difference transform -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
      {/* Inner Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference transform -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
    </>
  );
}
