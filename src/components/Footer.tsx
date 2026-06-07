'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import IndianWeddingBorder from './IndianWeddingBorder';

export default function Footer({ data }: { data?: any }) {
  const email = data?.email || data?.contactEmail || 'hello@manavivaham.com';
  const phone = data?.phone || '+91 99647 87383';
  const location = data?.location || data?.officeLocation || 'Mumbai . Bangalore';
  const instagram = data?.instagram || 'https://instagram.com/manavivaham';
  const copyright = data?.copyrightText || data?.copyright || `© ${new Date().getFullYear()} Mana Vivaham. All Rights Reserved.`;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact-wrapper" className="relative w-full bg-[#F5F5F5] text-[#1a1a1a] py-24 md:py-32 px-6 md:px-16 overflow-hidden font-sans border-t border-[#9E2F2A]/10">
      {/* Top Border */}
      <div className="absolute top-0 left-0 w-full z-20">
        <IndianWeddingBorder type="zari" color="both" parallax={true} opacity={0.4} />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col items-center mt-10">
        
        {/* Massive Premium Branding */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center w-full mb-20 md:mb-28"
        >
          <h2 
            className="text-5xl md:text-8xl lg:text-[9rem] font-serif tracking-tighter uppercase font-bold text-[#9E2F2A]"
          >
            Mana Vivaham
          </h2>
          <p className="mt-8 text-xs md:text-sm font-bold tracking-[0.6em] uppercase text-[#9E2F2A]/70">
            Cinematic Wedding Preservation
          </p>
        </motion.div>

        {/* Info Grid - Labels and values horizontally aligned side-by-side */}
        <div className="w-full flex flex-col lg:flex-row flex-wrap justify-between items-center lg:items-start gap-8 lg:gap-4 mb-24">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-row items-baseline space-x-3"
          >
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#9E2F2A]/80">Inquiries:</span>
            <Link href={`mailto:${email}`} className="text-base md:text-lg font-serif italic font-medium text-[#1a1a1a] hover:text-[#9E2F2A] transition-colors duration-500 relative group inline-block">
              {email}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#9E2F2A] transition-all duration-700 ease-in-out group-hover:w-full"></span>
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-row items-baseline space-x-3"
          >
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#9E2F2A]/80">Direct Line:</span>
            <Link href={`tel:${phone}`} className="text-base md:text-lg font-serif italic font-medium text-[#1a1a1a] hover:text-[#9E2F2A] transition-colors duration-500 relative group inline-block">
              {phone}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#9E2F2A] transition-all duration-700 ease-in-out group-hover:w-full"></span>
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex flex-row items-baseline space-x-3"
          >
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#9E2F2A]/80">Social:</span>
            <Link href={instagram} target="_blank" rel="noopener noreferrer" className="text-base md:text-lg font-serif italic font-medium text-[#1a1a1a] hover:text-[#9E2F2A] transition-colors duration-500 relative group inline-block">
              Instagram
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#9E2F2A] transition-all duration-700 ease-in-out group-hover:w-full"></span>
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-row items-baseline space-x-3"
          >
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#9E2F2A]/80">Studios:</span>
            <p className="text-base md:text-lg font-serif italic font-medium text-[#1a1a1a]">
              {location}
            </p>
          </motion.div>

        </div>

        {/* Footer Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="w-full border-t border-[#9E2F2A]/20 pt-10 flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-6"
        >
          <div className="flex flex-row items-center gap-3 md:gap-6 text-[10px] md:text-xs uppercase font-bold tracking-[0.2em] text-[#9E2F2A]/80 text-center">
            <span>Built by Shreya Vankeswaram</span>
            <span className="text-[#9E2F2A]/40">|</span>
            {copyright && <span>{copyright}</span>}
          </div>

          <button 
            onClick={scrollToTop}
            className="group flex flex-col items-center gap-4 cursor-pointer relative"
          >
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-[#9E2F2A] group-hover:text-[#9E2F2A]/70 transition-colors duration-500">
              Back to Top
            </span>
            <div className="w-[2px] h-16 bg-[#9E2F2A]/20 relative overflow-hidden mt-2">
              <div className="w-full h-full bg-[#9E2F2A] absolute top-0 -translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out" />
            </div>
          </button>
        </motion.div>
      </div>

      {/* Light Paper Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
    </footer>
  );
}
