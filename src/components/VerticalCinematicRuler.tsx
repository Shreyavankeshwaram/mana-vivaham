"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";

export default function VerticalCinematicRuler() {
  const rulerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      // We use a slightly different calculation to ensure the ruler stays "centered" in its movement
      const rawProgress = (window.scrollY / totalHeight);
      setScrollProgress(rawProgress * 100);

      if (rulerRef.current) {
        // We only move the ruler by a portion of its height to keep it from flying off screen
        // and we use a more cinematic smoothing
        gsap.to(rulerRef.current, {
          y: `${rawProgress * -2000}px`, // Move by pixels for better control
          duration: 0.8,
          ease: "power2.out"
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Generate ticks
  const ticks = Array.from({ length: 151 }).map((_, i) => i);

  return (
    <div className="fixed top-0 left-6 h-screen w-16 z-[60] pointer-events-none hidden lg:flex items-center justify-center">

      {/* Central Focus Marker (The "Lens" Indicator) */}
      <div className="absolute top-1/2 left-0 w-full flex items-center z-20">
        <div className="w-full h-[1px] bg-[#8B1E2D]" />
        <div className="absolute right-0 w-2 h-2 rounded-full bg-[#8B1E2D] shadow-[0_0_10px_rgba(139,30,45,0.6)] animate-pulse" />

        {/* The "Lens" Detail the user might be referring to */}
        <div className="absolute -left-2 w-10 h-10 border border-[#8B1E2D]/30 rounded-full flex items-center justify-center backdrop-blur-sm">
          <div className="w-6 h-6 border-2 border-[#8B1E2D]/50 rounded-full" />
          <div className="absolute w-[1px] h-full bg-[#8B1E2D]/20 rotate-45" />
          <div className="absolute w-[1px] h-full bg-[#8B1E2D]/20 -rotate-45" />
        </div>
      </div>

      {/* The Moving Vertical Ruler */}
      <div
        ref={rulerRef}
        className="flex flex-col items-end gap-5 will-change-transform pt-[50vh]"
      >
        {ticks.map((tick) => (
          <div key={tick} className="flex items-center gap-3 pr-2">

            {/* Tick Numbers (Every 10 units) */}
            <span
              className={`text-[#8B1E2D]/40 font-mono text-[8px] font-bold tracking-tighter origin-right -rotate-90 transition-all duration-500 ${tick % 10 === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
            >
              {(tick * 10).toString().padStart(3, '0')}
            </span>

            {/* Tick Marks */}
            <div
              className={`h-[1px] transition-all duration-300
                ${tick % 10 === 0 ? 'w-8 bg-[#8B1E2D]/40' : tick % 5 === 0 ? 'w-5 bg-[#8B1E2D]/20' : 'w-3 bg-[#8B1E2D]/10'}`}
            />
          </div>
        ))}
      </div>

      {/* Side Label */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 -rotate-90 origin-center whitespace-nowrap">
        <span className="text-[7px] font-sans-modern font-black tracking-[0.8em] text-[#8B1E2D]/20 uppercase">
          Focus Axis / 85mm Prime
        </span>
      </div>

      {/* Top & Bottom Vignettes to fade out the ruler */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#E7DFC8] to-transparent z-10" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#E7DFC8] to-transparent z-10" />

    </div>
  );
}
