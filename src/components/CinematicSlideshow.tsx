"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Bodoni_Moda } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { urlForImage } from "@/sanity/lib/image";

const bodoniModa = Bodoni_Moda({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"], variable: "--font-playfair", style: ["normal", "italic"] });

export default function CinematicSlideshow({ slides: cmsSlides }: { slides?: any[] }) {
  const slides = (cmsSlides || []).filter((s: any) => s.asset).map((s: any) => ({
    src: urlForImage(s)?.url() || "",
    label: s.title || "CINEMA",
  })).filter(s => s.src);

  if (!slides.length) return null;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000); // Change every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={`mv-cinematic-slideshow relative w-full h-screen overflow-hidden bg-black ${bodoniModa.variable}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={slides[index].src}
            alt="Cinematic Slide"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* Branded Overlay - Fixed in Center */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="flex flex-col items-center"
        >
          <div className="w-12 h-12 md:w-16 md:h-16 mb-8 border border-white/30 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
          <h2 className="sanitize-heading font-cormorant text-[8vw] md:text-[6vw] italic text-white font-light tracking-tighter uppercase leading-none">
            MANA VIVAHAM
          </h2>
          <span className="font-sans text-[10px] md:text-xs tracking-[0.6em] text-white/50 uppercase mt-4">
            An Editorial Story
          </span>
        </motion.div>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex gap-4">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`h-[2px] transition-all duration-700 ${i === index ? "w-12 bg-white" : "w-6 bg-white/20"}`}
          />
        ))}
      </div>

      {/* Global Grain Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </section>
  );
}
