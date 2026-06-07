'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const gridImages = [
  { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800", alt: "Wedding" },
  { src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800", alt: "Wedding" },
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800", alt: "Wedding" },
  { src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800", alt: "Wedding" },
  { src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800", alt: "Wedding" },
  { src: "https://images.unsplash.com/photo-1520699918507-3c3e05c46b0c?q=80&w=800", alt: "Wedding" },
  { src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800", alt: "Wedding" },
  // Center is text
  { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800", alt: "Wedding" },
  { src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800", alt: "Wedding" },
  { src: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800", alt: "Wedding" },
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800", alt: "Wedding" },
  { src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800", alt: "Wedding" },
  { src: "https://images.unsplash.com/photo-1515895309288-a3815ab7cf81?q=80&w=800", alt: "Wedding" },
  { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800", alt: "Wedding" },
];

export default function IconicGrid() {
  return (
    <section className="relative w-full py-32 px-4 md:px-12 bg-[#F3EFE7] text-[#2A2A2A] overflow-hidden">
      <div className="max-w-[1600px] mx-auto">

        {/* Premium Editorial Header */}
        <div className="mb-24 flex flex-col items-center text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#C9A46A] font-sans font-medium mb-6"
          >
            A Curated Gallery
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="text-6xl md:text-8xl font-light leading-[1.1] text-[#2A2A2A] tracking-tighter"
          >
            The Art of <br />
            <span className="font-serif italic text-[#C9A46A] pr-4">Visual Poetry</span>
          </motion.h2>
          
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: 96 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="w-[1px] bg-[#C9A46A]/40 mx-auto mt-12" 
          />
        </div>

        {/* 5-Column Iconic Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-1 md:gap-2">
          {gridImages.map((img, idx) => {
            // Insert the Text Tile exactly in the center (8th slot)
            if (idx === 7) {
              return (
                <React.Fragment key={`frag-${idx}`}>
                  <div className="relative aspect-[4/5] bg-white flex flex-col items-center justify-center p-8 text-center border border-[#C9A46A]/20 shadow-sm group hover:bg-[#FAF8F5] transition-colors duration-700">
                    <div className="absolute inset-3 border border-[#C9A46A]/10 pointer-events-none" />
                    <span className="text-[10px] tracking-[0.3em] uppercase font-sans text-zinc-400 mb-6">A Collection of</span>
                    <h3 className="text-4xl md:text-6xl font-serif italic mb-6 tracking-tighter text-[#C9A46A]">Iconic</h3>
                    <span className="text-[10px] tracking-[0.3em] uppercase font-sans text-[#2A2A2A]">Masterpieces</span>
                  </div>
                  <div className="relative aspect-[4/5] overflow-hidden group">
                    <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-[2000ms] group-hover:scale-110 filter grayscale-[20%] group-hover:grayscale-0" sizes="20vw" />
                    <div className="absolute inset-0 bg-[#2A2A2A]/10 group-hover:bg-transparent transition-colors duration-1000" />
                  </div>
                </React.Fragment>
              );
            }
            
            return (
              <div key={idx} className="relative aspect-[4/5] overflow-hidden group">
                <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-[2000ms] group-hover:scale-110 filter grayscale-[20%] group-hover:grayscale-0" sizes="20vw" />
                <div className="absolute inset-0 bg-[#2A2A2A]/10 group-hover:bg-transparent transition-colors duration-1000" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
