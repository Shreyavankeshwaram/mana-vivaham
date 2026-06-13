'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Footer({ data }: { data?: any }) {
  const email = data?.email || data?.contactEmail || 'hello@manavivaham.com';
  const phone = data?.phone || '+91 99647 87383';
  const instagram = data?.instagram || 'https://instagram.com/manavivaham';
  
  const studioLocation = (typeof data?.location === 'string' && data.location)
    || (typeof data?.officeLocation === 'string' && data.officeLocation)
    || 'Hyderabad · Telangana';
  const copyright = data?.copyrightText || data?.copyright || `© ${new Date().getFullYear()} Mana Vivaham`;

  const footerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  // Parallax the massive bottom logo text
  const logoY = useTransform(scrollYProgress, [0, 1], ["50%", "0%"]);
  const logoOpacity = useTransform(scrollYProgress, [0.5, 1], [0, 1]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Framer Motion Variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      }
    }
  };

  const textVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const } 
    }
  };

  return (
    <footer ref={footerRef} id="contact-wrapper" className="relative w-full bg-[#030303] text-[#E7DFC8] overflow-hidden pt-24 md:pt-40 flex flex-col items-center border-t border-white/5">
      
      {/* Ambient background glow & texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] pointer-events-none mix-blend-overlay" />
      <div className="absolute top-0 right-0 w-[80vw] h-[80vw] md:w-[60vw] md:h-[60vw] bg-[#8B1E2D]/20 blur-[120px] md:blur-[180px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-[#8B1E2D]/20 to-transparent pointer-events-none" />
      
      {/* Core Layout */}
      <div className="w-full max-w-[1440px] px-6 md:px-12 lg:px-20 z-10 relative">
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 md:mb-32 gap-16">
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="max-w-3xl"
          >
            <motion.p variants={textVariants} className="text-[10px] md:text-sm tracking-[0.4em] uppercase text-[#C5A880] mb-8 font-bold flex items-center gap-4">
              <span className="w-12 h-px bg-[#C5A880]" />
              Start Your Journey
            </motion.p>

            <div className="text-[4rem] sm:text-[5.5rem] lg:text-[7.5rem] xl:text-[8.5rem] leading-[0.9] md:leading-[0.85] text-white tracking-tighter mb-12 overflow-hidden py-2 cursor-default">
              <motion.span variants={textVariants} className="block text-white font-normal hover:translate-x-4 transition-transform duration-700 ease-[0.16,1,0.3,1]" style={{ fontFamily: 'var(--font-playfair), serif' }}>Let&apos;s talk</motion.span>
              <motion.span variants={textVariants} className="block italic text-[#C5A880] mt-1 md:mt-3 hover:translate-x-8 transition-transform duration-700 ease-[0.16,1,0.3,1]" style={{ fontFamily: 'var(--font-playfair), serif' }}>about forever.</motion.span>
            </div>
            
            <motion.div variants={textVariants}>
              <Link 
                href={`mailto:${email}`}
                className="inline-flex items-center gap-5 md:gap-8 px-8 md:px-10 py-4 md:py-6 rounded-full border border-white/20 hover:border-[#C5A880] transition-all duration-700 group bg-white/5 backdrop-blur-md overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-[#C5A880] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1] z-0" />
                <span className="relative z-10 text-xs md:text-sm tracking-[0.2em] uppercase font-bold text-white group-hover:text-[#030303] transition-colors duration-500 pt-1">Inquire Now</span>
                <div className="relative z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-transparent group-hover:text-[#030303] transition-all duration-500">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:text-[#030303] transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Location & Quick Info */}
          <div className="flex flex-col gap-12 lg:text-right lg:items-end w-full lg:w-auto mt-10 lg:mt-0 relative z-20">
            
            {/* Spinning Text Badge inside Quick Info Area */}
            <div className="hidden lg:flex w-36 h-36 relative mb-4 items-center justify-center">
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="w-full h-full absolute inset-0"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full text-[#C5A880]/60">
                  <path id="circlePath" fill="none" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
                  <text className="text-[12.5px] tracking-[0.2em] uppercase font-bold" style={{ fill: 'currentColor' }}>
                    <textPath href="#circlePath" startOffset="0%">
                      • MANA VIVAHAM • INQUIRE NOW 
                    </textPath>
                  </text>
                </svg>
              </motion.div>
              <div className="w-3 h-3 bg-[#C5A880] rounded-full" />
            </div>

            <div className="group">
              <p className="text-[10px] md:text-sm tracking-[0.3em] uppercase text-white/40 mb-3 md:mb-4">Studio</p>
              <p className="text-xl md:text-3xl text-white/90 group-hover:text-white transition-colors cursor-default" style={{ fontFamily: 'var(--font-playfair), serif' }}>{studioLocation}</p>
            </div>
            <div className="group">
              <p className="text-[10px] md:text-sm tracking-[0.3em] uppercase text-white/40 mb-3 md:mb-4">Direct</p>
              <a href={`tel:${phone}`} className="block text-xl md:text-3xl text-white/90 hover:text-[#C5A880] transition-colors" style={{ fontFamily: 'var(--font-playfair), serif' }}>{phone}</a>
              <a href={`mailto:${email}`} className="block text-xl md:text-3xl text-white/90 hover:text-[#C5A880] transition-colors mt-2" style={{ fontFamily: 'var(--font-playfair), serif' }}>{email}</a>
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-12" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-16 md:mb-32">
          <ul className="flex flex-wrap items-center justify-center md:justify-start gap-8 md:gap-16">
            {[
              { name: 'Instagram', url: instagram },
              { name: 'Showcase', url: 'https://manavivaham51.pixieset.com/manashowcase/' }
            ].map((social) => (
              <li key={social.name}>
                <a href={social.url} target="_blank" rel="noopener noreferrer" className="group relative text-sm md:text-base tracking-[0.25em] uppercase text-white/70 hover:text-white transition-colors duration-300 py-2 inline-block">
                  <span className="relative z-10">{social.name}</span>
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C5A880] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
                </a>
              </li>
            ))}
          </ul>

          <button 
            onClick={scrollToTop}
            className="group flex flex-col items-center gap-4 hover:-translate-y-3 transition-transform duration-700 cursor-pointer"
          >
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#C5A880] bg-white/5 group-hover:bg-[#C5A880] backdrop-blur-sm transition-all duration-700 overflow-hidden relative">
              <div className="absolute inset-0 bg-[#C5A880] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1]" />
              <svg className="w-5 h-5 md:w-6 md:h-6 text-white/70 group-hover:text-[#030303] transition-colors relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </div>
            <span className="text-[10px] md:text-sm tracking-[0.3em] uppercase text-white/60 group-hover:text-[#C5A880] transition-colors">Back to Top</span>
          </button>
        </div>
      </div>

      {/* Massive Parallax Brand Name at the Bottom */}
      <motion.div 
        style={{ y: logoY, opacity: logoOpacity }}
        className="w-full overflow-hidden flex justify-center items-end px-2 md:px-8 pointer-events-none z-10 select-none mt-4 md:mt-0"
      >
        <div 
          className="text-[9vw] sm:text-[10vw] md:text-[10.5vw] lg:text-[11vw] leading-[0.75] font-black text-center tracking-tighter w-full whitespace-nowrap text-transparent bg-clip-text"
          style={{ 
            fontFamily: 'var(--font-playfair), serif', 
            WebkitTextStroke: '1px rgba(255, 255, 255, 0.15)',
            backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 100%)',
          }}
        >
          MANA VIVAHAM
        </div>
      </motion.div>

      {/* Copyright Bar */}
      <div className="relative z-20 w-full py-6 md:py-8 flex flex-col lg:flex-row justify-between items-center gap-4 px-6 md:px-12 bg-[#050505] border-t border-white/10 text-[10px] md:text-xs tracking-[0.1em] md:tracking-[0.15em] text-white/40 uppercase mt-[-1px]">
        <p className="text-center lg:text-left">Designed & Built by Shreya Vankeshwaram</p>
        <p className="text-center">{copyright}</p>
        <p className="text-center lg:text-right text-[#C5A880]/80 italic tracking-[0.2em] md:tracking-[0.25em] capitalize" style={{ fontFamily: 'var(--font-playfair), serif' }}>Timeless Wedding Stories</p>
      </div>

    </footer>
  );
}
