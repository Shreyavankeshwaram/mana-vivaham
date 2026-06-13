"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function MarqueeDivider() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;
    
    // Create an infinite horizontal scroll effect using GSAP
    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full bg-[#e8e4db] py-6 overflow-hidden border-y border-black/10 select-none pointer-events-none">
      <div ref={marqueeRef} className="flex w-max items-center">
        {/* We repeat the phrase multiple times so the infinite loop is seamless */}
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex gap-8 items-center px-4">
            <span className="text-lg md:text-2xl font-serif tracking-[0.2em] uppercase text-black/80">
              Macharla
            </span>
            <span className="text-black/30 text-sm">✦</span>
            <span className="text-lg md:text-2xl font-serif italic text-black/80">
              Editorial Photography
            </span>
            <span className="text-black/30 text-sm">✦</span>
            <span className="text-lg md:text-2xl font-serif tracking-[0.2em] uppercase text-black/80">
              Cinematic Portraits
            </span>
            <span className="text-black/30 text-sm">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
