"use client";

import React from "react";
import { motion } from "framer-motion";

export default function SideMarigolds() {
  // Symmetrical layout: 4 vertical hanging mango leaf toran strings on each side with hand-picked durations to prevent hydration mismatches
  const leftGarlands = [
    { length: 5, delay: 0.0, duration: 9.2 },
    { length: 5, delay: 0.15, duration: 11.4 },
    { length: 5, delay: 0.3, duration: 8.8 },
    { length: 5, delay: 0.45, duration: 10.6 },
  ];

  const rightGarlands = [
    { length: 5, delay: 0.45, duration: 10.2 },
    { length: 5, delay: 0.3, duration: 11.8 },
    { length: 5, delay: 0.15, duration: 8.5 },
    { length: 5, delay: 0.0, duration: 9.6 },
  ];

  const renderToranString = (length: number, delay: number, duration: number) => {
    return (
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1], delay }}
        className="relative flex flex-col items-center"
        style={{
          // Ultra-soft ceremonial sway in a palace breeze
          animationName: "mv-toran-sway",
          animationDuration: `${duration}s`,
          animationTimingFunction: "ease-in-out",
          animationIterationCount: "infinite",
          animationDirection: "alternate",
          animationDelay: `${delay}s`,
          transformOrigin: "top center",
        }}
      >
        {/* Core maroon ceremonial thread */}
        <div className="absolute top-0 bottom-8 w-[1.2px] bg-[#8A5A60] left-1/2 -translate-x-1/2 z-0" />

        {/* Chain of Layered Authentic South Indian Mango Leaves (Maavilai) */}
        {Array.from({ length }).map((_, i) => (
          <div key={i} className="relative z-10 -my-[3px] w-[28px] h-[48px] md:w-[32px] md:h-[54px] flex flex-col items-center">
            {/* Elegant connection joint: Sandalwood pearl bead or Gold accent */}
            <div className="w-[6px] h-[6px] rounded-full bg-gradient-to-r from-[#FFFDF9] to-[#E5C590] border-[0.5px] border-[#C9A46A]/50 z-20 -mt-[2px]" />

            <svg viewBox="0 0 30 50" className="w-full h-full filter drop-shadow-[0_2px_4px_rgba(42,82,44,0.08)]">
              {/* Detailed Organic Mango Leaf */}
              <path 
                d="M15,2 C10,13 6,26 15,48 C24,26 20,13 15,2 Z" 
                fill="url(#mango-leaf-grad)" 
                stroke="#C9A46A" 
                strokeOpacity="0.35"
                strokeWidth="0.75" 
              />
              {/* Fine delicate leaf veins in gold */}
              <path d="M15,2 L15,44" fill="none" stroke="#C9A46A" strokeOpacity="0.3" strokeWidth="0.5" />
              <path d="M15,10 C12,14 10,18 10,18" fill="none" stroke="#C9A46A" strokeOpacity="0.2" strokeWidth="0.5" />
              <path d="M15,10 C18,14 20,18 20,18" fill="none" stroke="#C9A46A" strokeOpacity="0.2" strokeWidth="0.5" />
              <path d="M15,20 C11,25 9,29 9,29" fill="none" stroke="#C9A46A" strokeOpacity="0.2" strokeWidth="0.5" />
              <path d="M15,20 C19,25 21,29 21,29" fill="none" stroke="#C9A46A" strokeOpacity="0.2" strokeWidth="0.5" />
              <path d="M15,30 C12,35 10,39 10,39" fill="none" stroke="#C9A46A" strokeOpacity="0.2" strokeWidth="0.5" />
              <path d="M15,30 C18,35 20,39 20,39" fill="none" stroke="#C9A46A" strokeOpacity="0.2" strokeWidth="0.5" />
            </svg>
          </div>
        ))}

        {/* Bottom Accent: Traditional Royal Temple Gold Bell (Pooja Bell) */}
        <div className="relative z-20 mt-[-2px] w-[24px] h-[32px] md:w-[28px] md:h-[38px] flex flex-col items-center">
          {/* Maroon connection knot */}
          <div className="w-[5px] h-[5px] rounded-full bg-[#8A5A60] mb-[2px]" />
          
          <svg viewBox="0 0 30 40" className="w-full h-full filter drop-shadow-[0_2px_4px_rgba(201,164,106,0.12)]">
            {/* Styled Gold Temple Bell */}
            <path 
              d="M15,4 C10,4 8,8 8,14 C8,18 6,24 5,26 L25,26 C24,24 22,18 22,14 C22,8 20,4 15,4 Z" 
              fill="url(#temple-gold-grad)" 
              stroke="#C9A46A"
              strokeWidth="0.75"
            />
            {/* Bottom rim and clapper */}
            <rect x="4" y="26" width="22" height="3" rx="1.5" fill="url(#temple-gold-grad-dark)" />
            <circle cx="15" cy="33" r="3.5" fill="url(#temple-gold-grad)" />
            <line x1="15" y1="29" x2="15" y2="30.5" stroke="#8A5A60" strokeWidth="1.5" />
          </svg>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="absolute top-0 left-0 right-0 w-full pointer-events-none z-[5] overflow-hidden select-none">
      {/* Global Color Definitions for Natural Mango Leaves and Royal Gold Temple Bells */}
      <svg className="absolute w-0 h-0">
        <defs>
          {/* Muted Natural Green Mango Leaf Gradients */}
          <linearGradient id="mango-leaf-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4A6B4E" />
            <stop offset="50%" stopColor="#3C5C40" />
            <stop offset="100%" stopColor="#2A422D" />
          </linearGradient>

          {/* Temple Gold Bell Gradients */}
          <linearGradient id="temple-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFDF9" />
            <stop offset="35%" stopColor="#E5C590" />
            <stop offset="70%" stopColor="#C9A46A" />
            <stop offset="100%" stopColor="#A88248" />
          </linearGradient>

          <linearGradient id="temple-gold-grad-dark" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A88248" />
            <stop offset="50%" stopColor="#C9A46A" />
            <stop offset="100%" stopColor="#876532" />
          </linearGradient>
        </defs>
      </svg>

      <div className="max-w-[1920px] mx-auto w-full flex justify-between px-4 md:px-16">
        {/* Left Symmetrical Mango Leaf Toran Strings (Mobile Optimized: 1 on mobile) */}
        <div className="flex gap-4 md:gap-8 items-start">
          {leftGarlands.map((g, idx) => (
            <div key={idx} className={`${idx > 0 ? "hidden md:block" : ""}`}>
              {renderToranString(g.length, g.delay, g.duration)}
            </div>
          ))}
        </div>

        {/* Right Symmetrical Mango Leaf Toran Strings (Mobile Optimized: 1 on mobile) */}
        <div className="flex gap-4 md:gap-8 items-start">
          {rightGarlands.map((g, idx) => (
            <div key={idx} className={`${idx < 3 ? "hidden md:block" : ""}`}>
              {renderToranString(g.length, g.delay, g.duration)}
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes mv-toran-sway {
          0% {
            transform: rotateZ(-0.5deg);
          }
          100% {
            transform: rotateZ(0.5deg);
          }
        }
      `}</style>
    </div>
  );
}
