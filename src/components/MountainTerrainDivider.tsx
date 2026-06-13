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
  const coordinates = data?.coordinates || "51°03'N, 3°43'E";
  const locationName = data?.locationName || "Gent, BE";
  const containerRef = useRef<HTMLDivElement>(null);
  const mountainLayer1Ref = useRef<HTMLDivElement>(null);
  const mountainLayer2Ref = useRef<HTMLDivElement>(null);
  const textSubRef = useRef<HTMLDivElement>(null);
  const textMainRef = useRef<HTMLHeadingElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    gsap.registerPlugin(ScrollTrigger);

    // Skip parallax on touch/mobile — scrub animations on touch cause constant
    // repaints that freeze Safari and Chrome on low-RAM phones.
    const isTouchMobile =
      window.matchMedia?.('(pointer: coarse)').matches ||
      window.innerWidth < 768;
    if (isTouchMobile) return;

    // Slight delay to ensure DOM and pins from previous sections are settled
    const timer = setTimeout(() => {
      if (!containerRef.current || !mountainLayer1Ref.current || !mountainLayer2Ref.current) return;

      const ctx = gsap.context(() => {
        // Background mountain parallax
        gsap.to(mountainLayer1Ref.current, {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });

        // Foreground mountain parallax
        gsap.to(mountainLayer2Ref.current, {
          y: -100,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });

        // Text Reveal Animations
        if (textSubRef.current && textMainRef.current) {
          gsap.fromTo(
            textSubRef.current,
            { opacity: 0, y: 10 },
            {
              opacity: 0.6,
              y: 0,
              duration: 1.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: textSubRef.current,
                start: "top 90%",
              }
            }
          );

          gsap.fromTo(
            textMainRef.current,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: textMainRef.current,
                start: "top 90%",
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
        className="absolute bottom-[-50px] w-full"
      >
        <svg viewBox="0 0 1440 320" className="w-full h-[450px]" preserveAspectRatio="none">
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
        className="absolute bottom-[-100px] w-full z-30"
      >
        {/* Thin Elegant Line Contour */}
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-[320px] pointer-events-none overflow-visible"
          preserveAspectRatio="none"
        >
          <path
            d="M0,180 C150,140 300,220 450,200 C600,180 750,120 900,140 C1050,160 1200,240 1350,220 C1400,210 1440,220"
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
          ].map((pos, i) => {
            const isTouchMobile =
              typeof window !== "undefined" &&
              (window.matchMedia('(pointer: coarse)').matches ||
              window.innerWidth < 768);

            return (
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
                  initial={isTouchMobile ? { scale: 1, opacity: 0.85 } : { scale: 0 }}
                  animate={isTouchMobile ? {} : {
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={isTouchMobile ? {} : {
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
            );
          })}

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
        <div className="relative z-40 flex w-full max-w-5xl flex-col items-center justify-center text-lumus-dark/90 px-5 md:px-6 -mt-20">
          <div
            ref={textSubRef}
            className="flex w-full flex-wrap items-center justify-center gap-2 md:gap-6 text-[8px] md:text-[10px] tracking-[0.24em] md:tracking-[0.5em] uppercase font-medium mb-8 md:mb-10 opacity-0 text-center"
          >
            <span>Coordinates</span>
            <span className="w-5 md:w-16 h-[1px] bg-lumus-dark/20" />
            <span>{coordinates}</span>
            <span className="w-5 md:w-16 h-[1px] bg-lumus-dark/20" />
            <span>{locationName}</span>
          </div>

          <h3
            ref={textMainRef}
            className="text-xl sm:text-2xl md:text-5xl font-serif italic text-center max-w-4xl md:px-12 leading-[1.3] tracking-tight text-[#8B1E2D] opacity-0"
          >
            "{quote}"
          </h3>
        </div>
      )}

      {/* Grain Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};

export default MountainTerrainDivider;
