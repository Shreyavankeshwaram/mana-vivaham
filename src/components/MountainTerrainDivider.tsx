"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface MountainTerrainDividerProps {
  height?: string | number;
  showFlowers?: boolean;
  showText?: boolean;
  opacity?: number;
  data?: any;
}

const MountainTerrainDivider: React.FC<MountainTerrainDividerProps> = ({
  height = "400px",
  showFlowers = true,
  showText = false,
  opacity = 0.6,
  data
}) => {
  const quote = data?.quote || "A bit of shameless self-glorification: I'm a Way Up North Finalist, which means my work has been recognised by some of the best in the industry.";
  const containerRef = useRef<HTMLDivElement>(null);
  const mountainLayer1Ref = useRef<HTMLDivElement>(null);
  const mountainLayer2Ref = useRef<HTMLDivElement>(null);
  const textMainRef = useRef<HTMLHeadingElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    gsap.registerPlugin(ScrollTrigger);

    // Slight delay to ensure DOM and pins from previous sections are settled
    const timer = setTimeout(() => {
      if (!containerRef.current || !mountainLayer1Ref.current || !mountainLayer2Ref.current) return;

      const ctx = gsap.context(() => {
        // Background mountain parallax
        gsap.to(mountainLayer1Ref.current, {
          y: -24,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.7,
          }
        });

        // Foreground mountain parallax
        gsap.to(mountainLayer2Ref.current, {
          y: -48,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.7,
          }
        });

        // Quote GSAP scroll animation
        if (textMainRef.current) {
          gsap.fromTo(
            textMainRef.current,
            { opacity: 0, y: 32, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: textMainRef.current,
                start: "top 92%",
                end: "top 62%",
                scrub: 0.6,
              }
            }
          );
        }
      });
      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-transparent flex flex-col items-center justify-center"
      style={{ height, opacity: isMounted ? opacity : 0 }}
    >
      {/* Layered Mountains for Depth (Parallax) */}
      <div
        ref={mountainLayer1Ref}
        className="absolute bottom-[-28px] w-full"
      >
        <svg viewBox="0 0 1440 320" className="w-full h-[320px]" preserveAspectRatio="none">
          <path
            d="M0,240 C300,200 600,300 900,260 C1200,220 1440,280 1440,280"
            fill="none"
            stroke="rgba(139, 30, 45, 0.1)"
            strokeWidth="0.5"
          />
        </svg>
      </div>

      {/* Foreground Mountain Terrain */}
      <div
        ref={mountainLayer2Ref}
        className="absolute bottom-[-72px] w-full z-30"
      >
        {/* Thin Elegant Line Contour */}
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-[240px] pointer-events-none overflow-visible"
          preserveAspectRatio="none"
        >
          <path
            d="M0,180 C150,140 300,220 450,200 C600,180 750,120 900,140 C1050,160 1200,240 1350,220 S1400,210 1440,220"
            fill="none"
            stroke="rgba(139, 30, 45, 0.3)"
            strokeWidth="1.2"
          />

          {/* Flowers Attached to the Line */}
          {isMounted && showFlowers && [
            { x: 225, y: 160 },
            { x: 450, y: 200 },
            { x: 750, y: 120 },
            { x: 975, y: 150 },
            { x: 1275, y: 220 },
          ].map((pos, i) => (
            <motion.g key={i}>
              <line
                x1={pos.x} y1={pos.y}
                x2={pos.x} y2={pos.y - 15}
                stroke="rgba(139, 30, 45, 0.2)"
                strokeWidth="1"
              />
              <motion.circle
                cx={pos.x}
                cy={pos.y - 15}
                r="3.5"
                fill="#8B1E2D"
                initial={{ scale: 0 }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 2 + (i % 2),
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <circle
                cx={pos.x}
                cy={pos.y - 15}
                r="8"
                fill="url(#flowerGlow)"
                className="opacity-60"
              />
            </motion.g>
          ))}

          <defs>
            <radialGradient id="flowerGlow">
              <stop offset="0%" stopColor="#8B1E2D" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8B1E2D" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Text Overlay - Detached from parallax mountain container */}
      {isMounted && showText && (
        <div className="relative z-40 flex w-full max-w-5xl flex-col items-center justify-center text-lumus-dark/90 px-5 md:px-6 -mt-8">
          <h3
            ref={textMainRef}
            className="text-xl sm:text-2xl md:text-5xl font-serif italic text-center max-w-4xl md:px-12 leading-[1.3] tracking-tight text-[#8B1E2D] opacity-0"
          >
            "{quote}"
          </h3>
        </div>
      )}

      {/* Grain Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.03] bg-[url('/noise.svg')]" />
    </div>
  );
};

export default MountainTerrainDivider;
