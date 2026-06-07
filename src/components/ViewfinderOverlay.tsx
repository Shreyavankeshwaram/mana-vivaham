"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ViewfinderOverlay() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-[80] overflow-hidden">
      {/* Corner Brackets */}
      <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-white/20 rounded-tl-3xl mix-blend-difference" />
      <div className="absolute top-10 right-10 w-20 h-20 border-t-2 border-r-2 border-white/20 rounded-tr-3xl mix-blend-difference" />
      <div className="absolute bottom-10 left-10 w-20 h-20 border-b-2 border-l-2 border-white/20 rounded-bl-3xl mix-blend-difference" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-white/20 rounded-br-3xl mix-blend-difference" />

      {/* Viewfinder Elements */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/40 font-mono">REC</span>
        </div>
        <div className="w-[1px] h-4 bg-white/10" />
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/40 font-mono">4K 60FPS</span>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 mix-blend-difference">
        <span className="text-[10px] tracking-[0.5em] uppercase text-white/30 font-serif">
          Capture Timeless Moments
        </span>
      </div>

      {/* Side Scales */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 mix-blend-difference">
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`w-3 h-[1px] bg-white/25 ${i === 2 ? 'w-6 bg-white/50' : ''}`} />
        ))}
      </div>
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 mix-blend-difference">
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`w-3 h-[1px] bg-white/25 ${i === 2 ? 'w-6 bg-white/50' : ''}`} />
        ))}
      </div>

      {/* Grid Frames */}
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-[0.04] pointer-events-none mix-blend-difference">
        <div className="border-[0.5px] border-white/30" />
        <div className="border-[0.5px] border-white/30" />
        <div className="border-[0.5px] border-white/30" />
        <div className="border-[0.5px] border-white/30" />
        <div className="border-[0.5px] border-white/30" />
        <div className="border-[0.5px] border-white/30" />
        <div className="border-[0.5px] border-white/30" />
        <div className="border-[0.5px] border-white/30" />
        <div className="border-[0.5px] border-white/30" />
      </div>

      {/* Background Frame Lines */}
      <div className="absolute inset-0 border-[40px] border-white/5 pointer-events-none mix-blend-difference" />
    </div>
  );
}
