"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AutoPlayVideo({ data }: { data?: any }) {
  // Sanity-uploaded video takes priority, reliable CDN fallback for production
  const videoUrl =
    data?.videoUrl ||
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";
  const heading = data?.heading || "A Symphony of Light";
  const subheading = data?.subheading || "Experience the emotion in motion.";

  // Skip rendering entirely if no video is available
  if (!videoUrl) return null;

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">

      {/* ── VIDEO BACKGROUND ── */}
      <video
        src={videoUrl}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50 pointer-events-none" />

      {/* ── TEXT OVERLAY ── */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.4 }}
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-5xl"
      >
        {/* Small gold label */}
        <span className="block text-[9px] sm:text-[10px] tracking-[0.45em] uppercase text-[#C5A880] mb-4 font-medium">
          {subheading}
        </span>

        {/* Main heading */}
        <h2
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif italic text-white tracking-wide leading-tight"
          style={{
            fontFamily: "var(--font-playfair, 'Playfair Display'), serif",
            textShadow: "0 2px 40px rgba(0,0,0,0.8)",
          }}
        >
          {heading}
        </h2>
      </motion.div>
    </section>
  );
}
