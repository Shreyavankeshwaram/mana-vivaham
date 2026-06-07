"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const items = [
  {
    id: 1,
    title: "Athlete Focus",
    date: "Jun 13, 2025",
    category: "SPORT",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
    color: "#1a1a1a"
  },
  {
    id: 2,
    title: "Nature Calling",
    date: "Jul 8, 2025",
    category: "NATURE",
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2000&auto=format&fit=crop", // Lush nature
    video: "https://player.vimeo.com/external/494191632.hd.mp4?s=1d74659f81d850d5360699ef7314589d81d4512e&profile_id=175", // Cinematic forest/nature video
    color: "#2d3a2a"
  },
  {
    id: 3,
    title: "Urban Contemplation",
    date: "Aug 3, 2025",
    category: "LIFESTYLE",
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop",
    color: "#1e2a3a"
  }
];

export default function FocusCarousel() {
  const [hoveredIndex, setHoveredIndex] = useState<number>(1); // Default focus middle

  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center py-24 px-4 md:px-12 bg-transparent overflow-hidden z-20">
      <div className="relative w-full max-w-7xl h-[650px] flex flex-col md:flex-row items-center justify-center gap-6">
        {items.map((item, index) => {
          const isHovered = hoveredIndex === index;
          const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;

          return (
            <motion.div
              key={item.id}
              onMouseEnter={() => setHoveredIndex(index)}
              className="relative h-full cursor-pointer rounded-2xl overflow-hidden shadow-xl bg-white"
              initial={false}
              animate={{
                width: isHovered ? "45%" : "27.5%",
                scale: isHovered ? 1.02 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 25,
              }}
            >
              {/* Media Layer */}
              <div className={`relative w-full transition-all duration-700 ${isHovered ? 'h-full' : 'h-[85%]'}`}>
                {item.video && isHovered ? (
                  <video
                    src={item.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className={`object-cover transition-all duration-1000 ${index === 0 ? 'grayscale' : ''} ${isHovered ? 'scale-105' : 'scale-100'}`}
                    priority={index === 1}
                  />
                )}
                {/* Subtle dark overlay for readability when focused */}
                <div className={`absolute inset-0 bg-black/10 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
              </div>

              {/* White Footer for non-focused cards */}
              <div className={`absolute bottom-0 left-0 w-full bg-white transition-all duration-500 flex items-center justify-center ${isHovered ? 'h-0 opacity-0' : 'h-[15%] opacity-100'}`}>
                <span className="text-black font-bold uppercase tracking-widest text-base md:text-xl">
                  {item.title}
                </span>
              </div>

              {/* Middle Text for focused card */}
              <div className={`absolute inset-0 flex flex-col items-center justify-center text-center p-8 transition-all duration-500 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                <h3 className="text-3xl md:text-5xl font-serif text-white leading-tight drop-shadow-lg">
                  {item.title}
                </h3>
                <div className="mt-4 flex items-center gap-4 text-white/90 text-[10px] md:text-xs tracking-[0.3em] uppercase">
                  <span>{item.date}</span>
                  <span className="w-1 h-1 bg-[#ffcc00] rounded-full" />
                  <span>{item.category}</span>
                </div>
              </div>
            </motion.div>
          );
        })}

      </div>
    </section>
  );
}
