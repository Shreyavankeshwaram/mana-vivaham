'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SideMarigolds from './SideMarigolds';
import { urlForImage } from "@/sanity/lib/image";

export default function ModernTradition({ data }: { data?: any }) {
  const heading = data?.heading || "A Modern Approach";
  const subheading = data?.subheading || "to an Age Old Tradition";
  const portraitImg = data?.portraitImage?.asset
    ? urlForImage(data.portraitImage)?.url()
    : data?.image?.asset
      ? urlForImage(data.image)?.url()
      : "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1964&auto=format&fit=crop";
  const landscapeImg = data?.landscapeImage?.asset
    ? urlForImage(data.landscapeImage)?.url()
    : data?.image?.asset
      ? urlForImage(data.image)?.url()
      : "/images/wedding_botanical_1.png";
  const paragraphs = data?.paragraphs?.length
    ? data.paragraphs
    : data?.description
      ? [data.description]
      : [
        "Considered to be the epitome of Modern Photography and Filmmaking, HOTC has transformed the Indian Wedding landscape on a regular basis. For almost a decade House On The Clouds has been creating photographs and films which are timeless and have been etched in memories of thousands of people forever.",
        "Awarded as the Wedding Filmmaker of the year for four consecutive years at the Weddingsutra awards along with numerous other awards, we are the only company listed on IMDB for its award-winning films."
      ];

  return (
    <section className="relative w-full py-20 md:py-36 px-4 md:px-20 bg-[#E8E1D3] text-[#1a1a1a] overflow-hidden">

      {/* Symmetrical Cascading Hanging Marigolds inside Philosophy section */}
      <div className="absolute top-4 left-0 right-0 w-full pointer-events-none z-0 opacity-[0.45]">
        <SideMarigolds />
      </div>

      {/* Indian Style Traditional Top Border (Toran) */}
      <div className="absolute top-0 left-0 w-full h-[28px] overflow-hidden pointer-events-none opacity-80 z-20">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="indian-border-top" width="40" height="28" patternUnits="userSpaceOnUse">
              {/* Horizontal red line removed to clean up look */}
              <path d="M 20,2 C 16,2 14,5 14,10 C 14,16 20,22 20,24 C 20,22 26,16 26,10 C 26,5 24,2 20,2 Z" fill="#8B1E2D" />
              <path d="M 20,24 L 22,26 L 20,28 L 18,26 Z" fill="#8B1E2D" />
              {/* Curved red line paths removed for maximum cleanliness */}
              <path d="M 8,5 L 10,9 L 6,9 Z" fill="#8B1E2D" />
              <path d="M 12,6 L 14,10 L 10,10 Z" fill="#8B1E2D" />
              <path d="M 28,6 L 30,10 L 26,10 Z" fill="#8B1E2D" />
              <path d="M 32,5 L 34,9 L 30,9 Z" fill="#8B1E2D" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#indian-border-top)" />
        </svg>
      </div>

      <div className="max-w-[1600px] mx-auto relative flex flex-col">

        {/* Compact & Refined Editorial Heading */}
        <div className="flex flex-col items-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-[#1a1a1a]/20" />
              <span className="text-[10px] md:text-xs font-sans tracking-[0.4em] uppercase font-bold opacity-40">
                Philosophy
              </span>
              <div className="w-8 h-[1px] bg-[#1a1a1a]/20" />
            </div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif leading-tight tracking-tight">
              {heading} <br className="md:hidden" />
              <span className="italic font-light text-[#1a1a1a]/60">{subheading}</span>
            </h2>
          </motion.div>
        </div>

        {/* Main Content Layout - 3 Column Symmetrical Grid */}
        <div className="flex flex-col md:grid md:grid-cols-12 gap-8 md:gap-12 items-center">

          {/* 1. Portrait Image (Left) */}
          <div className="w-full md:col-span-4 relative z-10 order-1">
            <div className="grid grid-cols-2 md:block gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-[3/4] w-full shadow-lg md:shadow-2xl overflow-hidden rounded-sm group cursor-pointer"
              >
                <Image
                  src={portraitImg}
                  alt="Traditional Indian Miniature Painting"
                  fill
                  className="object-cover transition-transform duration-[2s] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </motion.div>

              {/* Mobile second image placeholder */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="md:hidden relative aspect-[3/4] w-full shadow-lg overflow-hidden grayscale rounded-sm"
              >
                <Image
                  src={landscapeImg}
                  alt="Cinematic Moment"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </motion.div>
            </div>
          </div>

          {/* 2. Storytelling Block (Center) */}
          <div className="w-full md:col-span-4 z-20 px-4 order-3 md:order-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="space-y-6 md:space-y-8 text-center"
            >
              {paragraphs.map((text: string, i: number) => (
                <p key={i} className="text-sm md:text-base leading-[1.8] font-serif italic text-[#1a1a1a]/80">
                  {text}
                </p>
              ))}
            </motion.div>
          </div>

          {/* 3. Landscape Image (Right) */}
          <div className="hidden md:block md:col-span-4 z-10 order-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[3/4] md:aspect-[4/5] w-full shadow-lg md:shadow-2xl overflow-hidden grayscale"
            >
              <Image
                src={landscapeImg}
                alt="Cinematic Moment"
                fill
                className="object-cover"
                sizes="33vw"
              />
            </motion.div>
          </div>
        </div>

        {/* Brand Logos */}
        <div className="w-full mt-24 md:mt-32 flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-80">
          <span className="font-serif text-2xl md:text-4xl tracking-widest uppercase">Vogue</span>
          <span className="font-sans text-2xl md:text-4xl font-bold tracking-tighter uppercase">Cosmopolitan</span>
          <span className="font-serif text-2xl md:text-4xl font-medium tracking-tight uppercase">Hello!</span>
          <div className="flex flex-col items-center">
            <span className="font-serif text-xl md:text-3xl tracking-widest uppercase leading-none">Brides</span>
            <span className="font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase mt-1">Today</span>
          </div>
          <span className="font-sans text-xl md:text-3xl font-bold tracking-widest uppercase">Travel+Leisure</span>
        </div>
      </div>

      {/* Indian Style Traditional Bottom Border (Toran, flipped) */}
      <div className="absolute bottom-0 left-0 w-full h-[28px] overflow-hidden pointer-events-none opacity-80 z-20 transform rotate-180">
        <svg width="100%" height="100%">
          <rect width="100%" height="100%" fill="url(#indian-border-top)" />
        </svg>
      </div>

      {/* Atmospheric detail */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </section>
  );
}
