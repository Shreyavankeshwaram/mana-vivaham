"use client";

import React, { useEffect, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setIsVisible(false),
    });

    // 1. Initial State
    gsap.set(".m-part", { x: -20, opacity: 0 });
    gsap.set(".v-part", { x: 20, opacity: 0 });
    gsap.set(".full-name", { opacity: 0, y: 20 });

    // 2. Entrance
    tl.to([".m-part", ".v-part"], {
      x: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power4.out",
      stagger: 0.2
    });

    // 3. Name Reveal
    tl.to(".full-name", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.5");

    // 4. The Split (WOW moment)
    tl.to(".m-part", {
      x: "-100vw",
      duration: 1.5,
      ease: "power4.inOut",
    }, "+=1");

    tl.to(".v-part", {
      x: "100vw",
      duration: 1.5,
      ease: "power4.inOut",
    }, "<");

    tl.to(".full-name", {
      opacity: 0,
      scale: 1.5,
      filter: "blur(20px)",
      duration: 1,
    }, "<");

    tl.to(".preloader-bg", {
      opacity: 0,
      duration: 1,
      ease: "none"
    }, "-=0.5");

  }, []);

  if (!isVisible) return null;

  return (
    <div className="preloader-bg fixed inset-0 z-[9999] bg-lumus-beige flex flex-col items-center justify-center overflow-hidden">

      {/* Central Split Initials */}
      <div className="relative flex items-center justify-center mb-8">
        <span className="m-part sanitize-heading text-[25vw] md:text-[20vw] font-serif font-light italic text-[#8B1E2D] leading-none tracking-tighter">M</span>
        <span className="v-part sanitize-heading text-[25vw] md:text-[20vw] font-serif font-black text-[#8B1E2D] leading-none tracking-tighter -ml-6 md:-ml-[5vw]">V</span>
      </div>

      {/* Sub-text Name */}
      <div className="full-name flex flex-col items-center">
        <h2 className="text-xl md:text-3xl font-serif tracking-[0.6em] uppercase text-[#8B1E2D]/80">Mana Vivaham</h2>
        <div className="mt-4 w-12 h-[1px] bg-[#8B1E2D]/20 animate-pulse" />
      </div>

      {/* Cinematic Grain */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
