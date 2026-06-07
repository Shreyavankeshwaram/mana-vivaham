"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000",
    alt: "Editorial Portrait",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000",
    alt: "Cinematic Fashion",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000",
    alt: "Vibrant Art",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1000",
    alt: "Street Style",
    span: "md:col-span-2 md:row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000",
    alt: "Studio Shot",
    span: "md:col-span-1 md:row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000",
    alt: "Movement",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1000",
    alt: "Elegance",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000",
    alt: "Urban",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000",
    alt: "Lifestyle",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000",
    alt: "Modernism",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000",
    alt: "Vogue",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000",
    alt: "Portraiture",
    span: "md:col-span-2 md:row-span-1",
  }
];

export default function PremiumEditorialGallery() {
  return (
    <section className="relative w-full bg-transparent py-24 md:py-48 px-4 md:px-16 overflow-hidden">

      {/* Subtle Grain Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Header Section - Transparent Minimalist */}
      <div className="max-w-[1500px] mx-auto mb-20 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-12 pt-10">
        <div className="relative">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "60px" }}
            transition={{ duration: 1, ease: "circOut" }}
            className="h-[1px] bg-white/20 mb-8"
          />
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 0.5, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-lumus-dark font-sans text-[10px] md:text-xs tracking-[0.6em] uppercase mb-4"
          >
            Creative Index / 2025
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lumus-dark text-6xl md:text-[9vw] font-serif font-light leading-[0.85] tracking-tighter"
          >
            See Through <br /> <span className="italic font-normal opacity-90 pl-[0.5em]">My Lens</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.4, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="max-w-[300px] md:max-w-[400px] relative"
        >
          <div className="absolute -left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/20 via-white/5 to-transparent" />
          <p className="text-lumus-dark text-base md:text-xl font-light leading-relaxed tracking-tight">
            A high-fidelity exploration of cinematic narratives. Capturing the raw, unfiltered essence of human connection.
          </p>
        </motion.div>
      </div>

      {/* High-Density Grid View */}
      <div className="max-w-[1500px] mx-auto grid grid-cols-2 md:grid-cols-6 gap-4 md:gap-6 auto-rows-[160px] md:auto-rows-[240px]">
        {galleryImages.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: i * 0.05,
              ease: [0.16, 1, 0.3, 1]
            }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className={`group relative rounded-2xl md:rounded-[2rem] bg-zinc-900/50 cursor-pointer overflow-visible ${img.span}`}
          >
            {/* Index Number */}
            <div className="absolute -top-4 -left-2 z-20 overflow-hidden pointer-events-none">
              <span className="block text-white/10 text-4xl md:text-6xl font-serif italic tracking-tighter transition-transform duration-700 group-hover:-translate-y-full">
                0{i + 1 < 10 ? `0${i + 1}` : i + 1}
              </span>
              <span className="block absolute inset-0 text-white/40 text-4xl md:text-6xl font-serif italic tracking-tighter translate-y-full transition-transform duration-700 group-hover:translate-y-0">
                0{i + 1 < 10 ? `0${i + 1}` : i + 1}
              </span>
            </div>

            {/* Image Container */}
            <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/5 group-hover:border-white/20 transition-colors duration-700">
              <motion.div
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full h-full"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-all duration-1000 grayscale-[0.1] group-hover:grayscale-0"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </motion.div>

              {/* Glassmorphism Reveal Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="absolute inset-x-3 bottom-3 md:inset-x-4 md:bottom-4 z-10">
                <div className="w-full p-3 md:p-4 backdrop-blur-2xl bg-white/5 border border-white/10 rounded-xl md:rounded-2xl flex items-center justify-between opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-[0.16,1,0.3,1]">
                  <div className="flex flex-col">
                    <span className="text-white/40 text-[7px] md:text-[9px] uppercase tracking-[0.2em] mb-0.5">Perspective</span>
                    <span className="text-white text-[10px] md:text-sm font-medium tracking-tight truncate pr-2">{img.alt}</span>
                  </div>
                  <div className="flex-shrink-0 w-6 h-6 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center group/btn overflow-hidden relative">
                    <motion.div
                      className="relative z-10"
                      whileHover={{ rotate: 45 }}
                    >
                      <svg width="12" height="12" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white w-3 h-3 md:w-5 md:h-5">
                        <path d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6464L10.2929 4H6.5C6.22386 4 6 3.77614 6 3.5C6 3.22386 6.22386 3 6.5 3H11.5C11.7761 3 12 3.22386 12 3.5V8.5C12 8.77614 11.7761 9 11.5 9C11.2239 9 11 8.77614 11 8.5V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" fill="currentColor"></path>
                      </svg>
                    </motion.div>
                    <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
