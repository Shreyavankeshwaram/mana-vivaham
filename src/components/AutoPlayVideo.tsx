"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";

export default function AutoPlayVideo({ data }: { data?: any }) {
  // Use uploaded Sanity video first, then local fallback
  const videoUrl = data?.videoUrl || "/sample-wedding.mp4";
  const heading = data?.heading || "A Symphony of Light";
  const subheading = data?.subheading || "Experience the emotion in motion.";

  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    /* Sticky wrapper — section stays pinned while inner content scrolls */
    <div ref={sectionRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center justify-center">

        {/* ── VIDEO BACKGROUND (no parallax = no glitch) ── */}
        <video
          src={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Subtle gradient so text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40 pointer-events-none" />

        {/* ── TEXT OVERLAY — fades in smoothly, stays visible ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="relative z-10 flex flex-col items-center justify-center text-center px-6"
        >
          {/* Subheading — small gold spaced caps */}
          <span className="block text-[10px] md:text-[11px] tracking-[0.45em] uppercase text-[#C5A880] mb-5 font-medium">
            {subheading}
          </span>

          {/* Main title */}
          <h2
            className="text-5xl sm:text-6xl md:text-8xl font-serif italic text-white tracking-wide leading-tight"
            style={{
              fontFamily: "var(--font-playfair, 'Playfair Display'), serif",
              textShadow: "0 2px 40px rgba(0,0,0,0.7)",
            }}
          >
            {heading}
          </h2>
        </motion.div>

      </div>
    </div>
  );
}
