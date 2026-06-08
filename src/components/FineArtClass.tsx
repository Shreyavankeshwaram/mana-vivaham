'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function FineArtClass() {
  return (
    <section className="relative w-full bg-[#E8E1D3] text-[#1a1a1a] overflow-hidden">
      {/* 1. Main Content Area */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-20 py-24 md:py-40 flex flex-col md:flex-row items-center gap-12 md:gap-20">
        
        {/* Left Side: Content */}
        <div className="w-full md:w-1/2 z-10 flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-4xl md:text-7xl font-serif tracking-tighter uppercase mb-8 leading-none">
              <span className="block opacity-30 text-[0.6em] tracking-[0.2em] mb-2 font-light">The</span>
              Fine-Art Class
            </h2>
            
            <p className="text-base md:text-lg leading-relaxed font-serif italic text-[#1a1a1a]/80 max-w-lg mb-10">
              Mana Vivaham is our finest offering with fine-art editorial style photography led by Siddharth Sharma, founder of Mana Vivaham. The essence of Ibtida is to create photographs that stand the test of time. 
              <br /><br />
              The classic, non-intrusive approach of documenting the most important day of your life with bright and airy images that take you back in time. This is an exclusive package which we offer to selected weddings only and we believe this it serves a website of its own. Click below to visit our studio.
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-4 bg-[#7A6B5D] text-white font-serif italic text-lg rounded-sm shadow-xl hover:bg-[#6A5B4D] transition-colors"
            >
              Visit Mana Vivaham
            </motion.button>
          </motion.div>
        </div>

        {/* Right Side: Large Cinematic Image */}
        <div className="w-full md:w-1/2 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/5] w-full shadow-2xl overflow-hidden rounded-sm"
          >
            <Image 
              src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000" 
              alt="Fine Art Photography" 
              fill 
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Soft overlay to match reference */}
            <div className="absolute inset-0 bg-white/5 mix-blend-overlay" />
          </motion.div>
          
          {/* Decorative floating element */}
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#7A6B5D]/5 rounded-full blur-3xl pointer-events-none" />
        </div>
      </div>



      {/* Background detail */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('/noise.svg')]" />
    </section>
  );
}
