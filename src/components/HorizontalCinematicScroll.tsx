"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const word1 = "SACRED";
const word2 = "FRAMES";

export default function HorizontalCinematicScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const w1Ref = useRef<HTMLHeadingElement>(null);
  const w2Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current || !w1Ref.current || !w2Ref.current) return;

    const ctx = gsap.context(() => {
      // 1. Pin the section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=3000",
          pin: true,
          scrub: 1,
        },
      });

      // 2. Sequential Pop Animation
      // Word 1 In
      tl.fromTo(w1Ref.current, 
        { scale: 0, opacity: 0, filter: "blur(20px)" },
        { scale: 1, opacity: 1, filter: "blur(0px)", ease: "back.out(1.7)", duration: 1 }
      );
      
      // Word 1 Out
      tl.to(w1Ref.current, { 
        scale: 2, 
        opacity: 0, 
        filter: "blur(40px)", 
        duration: 1,
        ease: "power2.in" 
      }, "+=0.5");

      // Word 2 In
      tl.fromTo(w2Ref.current,
        { scale: 0, opacity: 0, filter: "blur(20px)" },
        { scale: 1, opacity: 1, filter: "blur(0px)", ease: "back.out(1.7)", duration: 1 },
        "-=0.2"
      );

      // Word 2 Out (Optional, for transition to next section)
      tl.to(w2Ref.current, { 
        scale: 0.5, 
        opacity: 0, 
        filter: "blur(20px)", 
        duration: 1,
        ease: "power2.in" 
      }, "+=0.5");

      // 3. Background Glow Pulse
      gsap.to(".bg-glow", {
        scale: 1.5,
        opacity: 0.4,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-transparent flex items-center justify-center z-20"
    >
      {/* Background Cinematic Glows */}
      <div className="bg-glow absolute w-[60vw] h-[60vw] bg-white/5 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Main Text Sequence */}
      <div ref={containerRef} className="relative flex flex-col items-center justify-center text-center px-4">
        <h2 
          ref={w1Ref}
          className="sanitize-heading absolute text-[20vw] md:text-[25vw] font-serif font-black italic uppercase tracking-tighter text-white leading-none will-change-transform drop-shadow-[0_0_50px_rgba(255,255,255,0.1)]"
        >
          {word1}
        </h2>
        
        <h2 
          ref={w2Ref}
          className="sanitize-heading absolute text-[20vw] md:text-[25vw] font-serif font-black italic uppercase tracking-tighter text-white leading-none will-change-transform drop-shadow-[0_0_50px_rgba(255,255,255,0.1)]"
        >
          {word2}
        </h2>
      </div>

      {/* Grain Texture */}
      <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </section>
  );
}
