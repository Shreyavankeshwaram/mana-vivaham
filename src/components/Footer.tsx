'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer({ data }: { data?: any }) {
  const email = data?.email || data?.contactEmail || 'hello@manavivaham.com';
  const phone = data?.phone || '+91 99647 87383';
  const instagram = data?.instagram || 'https://instagram.com/manavivaham';
  
  // Safe extraction to avoid React "Objects are not valid as a React child" from global window.location vs Sanity geopoints
  const studioLocation = (typeof data?.location === 'string' && data.location)
    || (typeof data?.officeLocation === 'string' && data.officeLocation)
    || 'Hyderabad · Telangana';
  const copyright = data?.copyrightText || data?.copyright || `© ${new Date().getFullYear()} Mana Vivaham`;

  return (
    <footer id="contact-wrapper" className="relative w-full bg-[#111111] text-white overflow-hidden">

      {/* Top thin gold line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C5A880]/50 to-transparent" />

      <div className="max-w-6xl mx-auto px-8 md:px-16 py-24 md:py-32">

        {/* Main headline */}
        <div className="mb-20 md:mb-28">
          <h2
            className="text-[3rem] md:text-[5.5rem] lg:text-[7rem] font-light italic leading-none tracking-tight text-white"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            Let&apos;s capture your<br />
            <span className="text-[#C5A880]">love story.</span>
          </h2>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 mb-16" />

        {/* 3 column layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-24 divide-y md:divide-y-0 md:divide-x divide-white/[0.08]">

          {/* Column 1 — Brand */}
          <div className="flex flex-col md:pr-12 md:pb-0 pb-10">
            <p className="text-[9px] tracking-[0.5em] uppercase text-white/30 font-mono mb-6">01 — Studio</p>
            <p
              className="text-3xl lg:text-4xl font-light italic text-white mb-3"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Mana Vivaham
            </p>
            <p className="text-[11px] text-white/50 font-light tracking-[0.25em] uppercase">
              {studioLocation}
            </p>
          </div>

          {/* Column 2 — Contact */}
          <div className="flex flex-col md:px-12 md:pb-0 py-10 md:py-0">
            <p className="text-[9px] tracking-[0.5em] uppercase text-white/30 font-mono mb-6">02 — Contact</p>
            <div className="space-y-6">
              <div className="group inline-block">
                <Link
                  href={`mailto:${email}`}
                  className="text-lg lg:text-xl text-white/80 group-hover:text-white transition-colors duration-300 block"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {email}
                </Link>
                <div className="w-0 group-hover:w-full h-px bg-[#C5A880] transition-all duration-500 ease-out mt-1" />
              </div>
              
              <div className="group inline-block">
                <Link
                  href={`tel:${phone}`}
                  className="text-lg lg:text-xl text-white/80 group-hover:text-white transition-colors duration-300 block"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {phone}
                </Link>
                <div className="w-0 group-hover:w-full h-px bg-[#C5A880] transition-all duration-500 ease-out mt-1" />
              </div>
            </div>
          </div>

          {/* Column 3 — Social */}
          <div className="flex flex-col md:pl-12 pt-10 md:pt-0">
            <p className="text-[9px] tracking-[0.5em] uppercase text-white/30 font-mono mb-6">03 — Follow</p>
            
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-start gap-4"
            >
              <div className="flex items-center justify-between w-full pb-4 border-b border-white/[0.08] group-hover:border-[#C5A880]/50 transition-colors duration-500">
                <span
                  className="text-2xl text-white/60 group-hover:text-white transition-colors duration-300 italic"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  @manavivaham
                </span>
                
                <div className="w-10 h-10 rounded-full border border-white/10 group-hover:border-[#C5A880] group-hover:bg-[#C5A880]/10 transition-all duration-500 flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 text-white/50 group-hover:text-[#C5A880] transition-colors duration-300"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </div>
              </div>
              <p className="text-[10px] text-white/30 tracking-[0.2em] font-light mt-1">
                A curated gallery of our finest visual poetry.
              </p>
            </a>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="w-full h-px bg-white/10 mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 border-t border-white/10 pt-6 mt-4">
          <p className="text-[11px] tracking-[0.1em] font-bold text-white hover:text-white/80 transition-colors duration-300 w-full md:w-1/3 text-center md:text-left">
            Designed & Built by Shreya Vankeshwaram
          </p>
          <p className="text-[11px] tracking-[0.1em] font-bold text-white w-full md:w-1/3 text-center">
            {copyright}
          </p>
          <p className="text-[11px] tracking-[0.2em] font-light italic text-[#C5A880]/70 w-full md:w-1/3 text-center md:text-right" style={{ fontFamily: 'Georgia, serif' }}>
            Timeless Wedding Stories
          </p>
        </div>

      </div>

    </footer>
  );
}
