"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AutoPlayVideo({ data }: { data?: any }) {
  // Sanity-uploaded video takes priority, reliable CDN fallback for production
  const videoUrl =
    data?.videoUrl ||
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";
  // Heading and subheading intentionally omitted per design — video only

  // Skip rendering entirely if no video is available
  if (!videoUrl) return null;

  return (
    <section className="relative w-full h-[100dvh] overflow-hidden bg-black flex items-center justify-center">

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

      {/* Text overlay removed per request (heading/subheading hidden) */}
    </section>
  );
}
