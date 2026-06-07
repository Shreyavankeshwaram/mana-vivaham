"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface IndianWeddingBorderProps {
  type?: "zari" | "temple" | "mandala" | "paisley";
  color?: "maroon" | "gold" | "both";
  height?: number | string;
  className?: string;
  parallax?: boolean;
  flip?: boolean;
  opacity?: number;
}

export default function IndianWeddingBorder({
  type = "zari",
  color = "both",
  height,
  className = "",
  parallax = true,
  flip = false,
  opacity = 1.0, // 100% solid opacity for high contrast vibrancy
}: IndianWeddingBorderProps) {
  const borderRef = useRef<HTMLDivElement>(null);
  
  // Subtle parallax scroll movement to make the border feel alive
  const { scrollYProgress } = useScroll({
    target: borderRef,
    offset: ["start end", "end start"],
  });

  const xTranslation = useTransform(scrollYProgress, [0, 1], parallax ? ["-3%", "3%"] : ["0%", "0%"]);
  
  // Define premium heights for detailed repeating patterns
  const defaultHeights = {
    zari: 38,
    temple: 56, // Tall enough for hanging mango leaves and bells!
    mandala: 38,
    paisley: 38,
  };
  
  const borderHeight = height || defaultHeights[type];

  // Unique ID for SVG pattern mapping
  const patternId = `mv-pattern-v2-${type}-${color}-${flip ? "flipped" : "normal"}`;

  return (
    <div
      ref={borderRef}
      style={{ 
        height: borderHeight,
        opacity,
      }}
      className={`mv-indian-border w-full overflow-hidden select-none pointer-events-none relative z-20 ${
        flip ? "transform rotate-180" : ""
      } ${className}`}
    >
      <motion.div 
        style={{ x: xTranslation }}
        className="w-[110%] h-full -left-[5%] absolute"
      >
        <svg width="100%" height="100%" className="block">
          <defs>
            {/* 1. ZARI: Banarasi Saree Zari border with gold vines, crimson flowers, and green leaves */}
            {type === "zari" && (
              <pattern id={patternId} width="60" height="38" patternUnits="userSpaceOnUse">
                {/* Outer borders */}
                <rect x="0" y="0" width="60" height="3" fill="#7b2331" />
                <rect x="0" y="3" width="60" height="1.5" fill="#c9a46a" />
                <rect x="0" y="33.5" width="60" height="1.5" fill="#c9a46a" />
                <rect x="0" y="35" width="60" height="3" fill="#7b2331" />

                {/* Central golden floral vine (zari wave) */}
                <path 
                  d="M 0,18 C 10,8 20,8 30,18 C 40,28 50,28 60,18" 
                  fill="none" 
                  stroke="#c9a46a" 
                  strokeWidth="2.5" 
                  strokeLinecap="round"
                />
                <path 
                  d="M 0,18 C 10,28 20,28 30,18 C 40,8 50,8 60,18" 
                  fill="none" 
                  stroke="#c9a46a" 
                  strokeWidth="1" 
                  strokeDasharray="2,2"
                />

                {/* Crimson Flowers (Kumkum) */}
                <circle cx="15" cy="11" r="3" fill="#7b2331" stroke="#c9a46a" strokeWidth="0.75" />
                <circle cx="45" cy="25" r="3" fill="#7b2331" stroke="#c9a46a" strokeWidth="0.75" />
                
                {/* Mehendi Green Leaves */}
                <path d="M 12,24 C 14,21 18,21 19,25 C 16,26 13,26 12,24 Z" fill="#2a522c" stroke="#c9a46a" strokeWidth="0.5" />
                <path d="M 48,12 C 46,15 42,15 41,11 C 44,10 47,10 48,12 Z" fill="#2a522c" stroke="#c9a46a" strokeWidth="0.5" />

                {/* Tiny Gold Buds */}
                <circle cx="30" cy="18" r="1.5" fill="#c9a46a" />
                <circle cx="0" cy="18" r="1.5" fill="#c9a46a" />
                <circle cx="60" cy="18" r="1.5" fill="#c9a46a" />
              </pattern>
            )}

            {/* 2. TEMPLE: Traditional Hanging Toran with Green Mango Leaves, Brass Bells, and Marigold Garlands */}
            {type === "temple" && (
              <pattern id={patternId} width="80" height="56" patternUnits="userSpaceOnUse">
                {/* Horizontal Mandap Wood/Gold Beam */}
                <rect x="0" y="0" width="80" height="4" fill="#7b2331" />
                <rect x="0" y="4" width="80" height="2" fill="#c9a46a" />
                
                {/* Repeating Architectural Temple Spire Scallop */}
                <path d="M 0,6 Q 20,16 40,6 Q 60,16 80,6" fill="none" stroke="#7b2331" strokeWidth="1.5" />
                <path d="M 0,8 Q 20,18 40,8 Q 60,18 80,8" fill="none" stroke="#c9a46a" strokeWidth="1" />

                {/* Hanging Mango Leaves (Maavilai) in Forest Green & Gold */}
                {/* Leaf 1 (Left) */}
                <path 
                  d="M 20,11 C 17,17 16,28 20,44 C 24,28 23,17 20,11 Z" 
                  fill="#2a522c" 
                  stroke="#c9a46a" 
                  strokeWidth="1.25" 
                  strokeLinejoin="round"
                />
                <path d="M 20,11 L 20,42" fill="none" stroke="#c9a46a" strokeWidth="0.75" opacity="0.6" />
                
                {/* Leaf 2 (Right) */}
                <path 
                  d="M 60,11 C 57,17 56,28 60,44 C 64,28 63,17 60,11 Z" 
                  fill="#2a522c" 
                  stroke="#c9a46a" 
                  strokeWidth="1.25" 
                  strokeLinejoin="round"
                />
                <path d="M 60,11 L 60,42" fill="none" stroke="#c9a46a" strokeWidth="0.75" opacity="0.6" />

                {/* Hanging Brass Bells (Mani) in Gold and Maroon */}
                {/* Bell 1 (Center) */}
                <g transform="translate(40, 10)">
                  {/* String */}
                  <line x1="0" y1="0" x2="0" y2="16" stroke="#c9a46a" strokeWidth="1.25" />
                  {/* Beads */}
                  <circle cx="0" cy="4" r="2.5" fill="#7b2331" />
                  <circle cx="0" cy="10" r="2" fill="#c9a46a" />
                  {/* Bell Cap */}
                  <path d="M -4,22 C -4,16 4,16 4,22 Z" fill="#c9a46a" />
                  {/* Bell Body */}
                  <path d="M -5,22 L -6,28 Q 0,31 6,28 L 5,22 Z" fill="#c9a46a" stroke="#7b2331" strokeWidth="0.5" />
                  {/* Clapper */}
                  <circle cx="0" cy="30" r="1.5" fill="#c9a46a" />
                </g>

                {/* Bell 2 (Left Edge) */}
                <g transform="translate(0, 10)">
                  <line x1="0" y1="0" x2="0" y2="16" stroke="#c9a46a" strokeWidth="1.25" />
                  <circle cx="0" cy="4" r="2.5" fill="#7b2331" />
                  <circle cx="0" cy="10" r="2" fill="#c9a46a" />
                  <path d="M -4,22 C -4,16 4,16 4,22 Z" fill="#c9a46a" />
                  <path d="M -5,22 L -6,28 Q 0,31 6,28 L 5,22 Z" fill="#c9a46a" stroke="#7b2331" strokeWidth="0.5" />
                  <circle cx="0" cy="30" r="1.5" fill="#c9a46a" />
                </g>

                {/* Bell 3 (Right Edge) */}
                <g transform="translate(80, 10)">
                  <line x1="0" y1="0" x2="0" y2="16" stroke="#c9a46a" strokeWidth="1.25" />
                  <circle cx="0" cy="4" r="2.5" fill="#7b2331" />
                  <circle cx="0" cy="10" r="2" fill="#c9a46a" />
                  <path d="M -4,22 C -4,16 4,16 4,22 Z" fill="#c9a46a" />
                  <path d="M -5,22 L -6,28 Q 0,31 6,28 L 5,22 Z" fill="#c9a46a" stroke="#7b2331" strokeWidth="0.5" />
                  <circle cx="0" cy="30" r="1.5" fill="#c9a46a" />
                </g>

                {/* Marigold Flower Garlands (Genda Phool) Orange-Gold Beads */}
                <circle cx="20" cy="8" r="2.5" fill="#c9a46a" stroke="#7b2331" strokeWidth="0.5" />
                <circle cx="60" cy="8" r="2.5" fill="#c9a46a" stroke="#7b2331" strokeWidth="0.5" />
              </pattern>
            )}

            {/* 3. MANDALA: Carved Golden Mandap Panel with Intricate Lotuses */}
            {type === "mandala" && (
              <pattern id={patternId} width="60" height="38" patternUnits="userSpaceOnUse">
                {/* Horizontal Framing Borders */}
                <line x1="0" y1="2" x2="60" y2="2" stroke="#7b2331" strokeWidth="1.5" />
                <line x1="0" y1="4" x2="60" y2="4" stroke="#c9a46a" strokeWidth="1" />
                <line x1="0" y1="34" x2="60" y2="34" stroke="#c9a46a" strokeWidth="1" />
                <line x1="0" y1="36" x2="60" y2="36" stroke="#7b2331" strokeWidth="1.5" />
                
                {/* Detailed Mandala Center */}
                <g transform="translate(30, 19)">
                  {/* Outer flower ring */}
                  <circle cx="0" cy="0" r="12" fill="none" stroke="#c9a46a" strokeWidth="1.5" />
                  <circle cx="0" cy="0" r="9" fill="#7b2331" stroke="#c9a46a" strokeWidth="0.75" />
                  
                  {/* Petals radiating */}
                  {[...Array(8)].map((_, i) => {
                    const angle = (i * Math.PI) / 4;
                    const x1 = Math.cos(angle) * 3;
                    const y1 = Math.sin(angle) * 3;
                    const x2 = Math.cos(angle) * 8;
                    const y2 = Math.sin(angle) * 8;
                    return (
                      <line 
                        key={i} 
                        x1={x1} 
                        y1={y1} 
                        x2={x2} 
                        y2={y2} 
                        stroke="#c9a46a" 
                        strokeWidth="1.25" 
                      />
                    );
                  })}
                  
                  <circle cx="0" cy="0" r="3" fill="#c9a46a" />
                  <circle cx="0" cy="0" r="1" fill="#2a522c" />
                </g>

                {/* Lotus Motifs on Left & Right Sides */}
                {/* Lotus 1 (Left Side) */}
                <g transform="translate(5, 19) scale(0.85)">
                  <path d="M 0,-6 C 2,-2 5,0 0,6 C -5,0 -2,-2 0,-6 Z" fill="#7b2331" stroke="#c9a46a" strokeWidth="1" />
                  <path d="M -2,-5 C -4,-1 -6,2 0,6 C 2,2 0,-1 -2,-5 Z" fill="#7b2331" stroke="#c9a46a" strokeWidth="0.75" />
                  <path d="M 2,-5 C 4,-1 6,2 0,6 C -2,2 0,-1 2,-5 Z" fill="#7b2331" stroke="#c9a46a" strokeWidth="0.75" />
                  <path d="M -4,2 Q 0,6 4,2" fill="none" stroke="#2a522c" strokeWidth="1.25" />
                </g>

                {/* Lotus 2 (Right Side) */}
                <g transform="translate(55, 19) scale(0.85)">
                  <path d="M 0,-6 C 2,-2 5,0 0,6 C -5,0 -2,-2 0,-6 Z" fill="#7b2331" stroke="#c9a46a" strokeWidth="1" />
                  <path d="M -2,-5 C -4,-1 -6,2 0,6 C 2,2 0,-1 -2,-5 Z" fill="#7b2331" stroke="#c9a46a" strokeWidth="0.75" />
                  <path d="M 2,-5 C 4,-1 6,2 0,6 C -2,2 0,-1 2,-5 Z" fill="#7b2331" stroke="#c9a46a" strokeWidth="0.75" />
                  <path d="M -4,2 Q 0,6 4,2" fill="none" stroke="#2a522c" strokeWidth="1.25" />
                </g>
              </pattern>
            )}

            {/* 4. PAISLEY: Royal Gold & Crimson Paisley Scroll (Kalka motif) */}
            {type === "paisley" && (
              <pattern id={patternId} width="80" height="38" patternUnits="userSpaceOnUse">
                {/* Horizontal Frame Lines */}
                <line x1="0" y1="2" x2="80" y2="2" stroke="#7b2331" strokeWidth="1.5" />
                <line x1="0" y1="5" x2="80" y2="5" stroke="#c9a46a" strokeWidth="1" />
                <line x1="0" y1="33" x2="80" y2="33" stroke="#c9a46a" strokeWidth="1" />
                <line x1="0" y1="36" x2="80" y2="36" stroke="#7b2331" strokeWidth="1.5" />
                
                {/* Paisley 1 (Facing Right, Maroon & Gold) */}
                <g transform="translate(20, 19) scale(0.9)">
                  {/* Paisley Outer Body */}
                  <path 
                    d="M -12,8 C -18,8 -20,2 -20,-4 C -20,-11 -14,-14 -9,-14 C -4,-14 -1,-9 -4,-4 C -7,1 -3,4 -3,8 C -3,10 -6,10 -12,8 Z" 
                    fill="#7b2331" 
                    stroke="#c9a46a" 
                    strokeWidth="1.5" 
                  />
                  {/* Inner Golden detailing */}
                  <path d="M -12,4 C -15,4 -16,1 -16,-2 C -16,-6 -13,-8 -10,-8 C -7,-8 -6,-5 -7,-2" fill="none" stroke="#c9a46a" strokeWidth="0.75" />
                  <circle cx="-12" cy="-2" r="1.5" fill="#c9a46a" />
                  
                  {/* Small Mehendi Green leaves emerging from tail */}
                  <path d="M -4,-12 Q 2,-16 4,-10" fill="none" stroke="#2a522c" strokeWidth="1.5" strokeLinecap="round" />
                </g>

                {/* Paisley 2 (Facing Left, Flipped color scheme) */}
                <g transform="translate(60, 19) scale(0.9) rotate(180)">
                  <path 
                    d="M -12,8 C -18,8 -20,2 -20,-4 C -20,-11 -14,-14 -9,-14 C -4,-14 -1,-9 -4,-4 C -7,1 -3,4 -3,8 C -3,10 -6,10 -12,8 Z" 
                    fill="#2a522c" 
                    stroke="#c9a46a" 
                    strokeWidth="1.25" 
                  />
                  <path d="M -12,4 C -15,4 -16,1 -16,-2 C -16,-6 -13,-8 -10,-8 C -7,-8 -6,-5 -7,-2" fill="none" stroke="#c9a46a" strokeWidth="0.75" />
                  <circle cx="-12" cy="-2" r="1.5" fill="#7b2331" />
                  <path d="M -4,-12 Q 2,-16 4,-10" fill="none" stroke="#c9a46a" strokeWidth="1" strokeLinecap="round" />
                </g>
                
                {/* Tiny Gold separator dots */}
                <circle cx="40" cy="19" r="2.5" fill="#c9a46a" stroke="#7b2331" strokeWidth="0.5" />
                <circle cx="0" cy="19" r="1.5" fill="#c9a46a" />
                <circle cx="80" cy="19" r="1.5" fill="#c9a46a" />
              </pattern>
            )}
          </defs>
          
          <rect width="100%" height="100%" fill={`url(#${patternId})`} />
        </svg>
      </motion.div>
    </div>
  );
}
