"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";



export default function CinematicRuler() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rulerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || !rulerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(rulerRef.current, {
        x: "-20%", // Move the ruler horizontally
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Generate ticks and numbers
  const ticks = Array.from({ length: 100 }).map((_, i) => i);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[60vh] bg-transparent flex flex-col items-center justify-center overflow-hidden py-20"
    >


      {/* Top Silhouette (Subtle) */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#8B1E2D]/5 to-transparent pointer-events-none" />

      {/* The Moving Ruler Container */}
      <div className="relative w-full flex flex-col items-center justify-center overflow-hidden">

        {/* Static Red Dot Indicator */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#8B1E2D] rounded-full z-20 shadow-[0_0_10px_rgba(139,30,45,0.4)]" />

        {/* The Ruler Track */}
        <div
          ref={rulerRef}
          className="flex items-end gap-4 md:gap-8 whitespace-nowrap will-change-transform py-12 px-[50%]"
        >
          {ticks.map((tick) => (
            <div key={tick} className="flex flex-col items-center gap-4">
              {/* Ticks */}
              <div className={`w-[1px] bg-lumus-dark/30 ${tick % 10 === 0 ? 'h-12' : 'h-6'}`} />

              {/* Numbers every 10 ticks */}
              {tick % 10 === 0 && (
                <span className="text-lumus-dark/40 font-mono text-[10px] md:text-xs tracking-widest">
                  {tick.toString().padStart(2, '0')}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Text - Moved Lower */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <h2 className="text-lumus-dark text-2xl md:text-4xl font-light tracking-[0.4em] uppercase opacity-30">
          SOCIAL
        </h2>
      </div>

      {/* Edge Vignettes */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-lumus-beige to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-lumus-beige to-transparent z-10" />
    </section>
  );
}
