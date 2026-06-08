"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { urlForImage } from "@/sanity/lib/image";

// Removed fallback images

const CinematicStorytelling: React.FC<{ data?: any }> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroHeading = data?.heroHeading || data?.clientHeading || "Mana Vivaham";
  const heroSubHeading = data?.heroSubHeading || data?.clientSubHeading || "Cinematic Storytelling";
  const tagline =
    data?.tagline ||
    data?.clientTagline ||
    "Wedding Films • Photography • Creative Direction";

  // Use the Studio-controlled Narrative Storytelling Paragraphs if provided.
  // (In Sanity this is `cinematicStorytelling.paragraphs`.)
  const narrativeParagraphs = data?.heroBio || data?.paragraphs || data?.clientBio || [
    "We don’t just document weddings — we craft heirloom cinema.",
    "From the sacred rituals to the quiet glances, every frame is composed with emotion, elegance, and intention.",
    "Your story, preserved like art — timeless today, priceless tomorrow.",
  ];

  const filmStripImages =
    Array.isArray(data?.featuredImages) && data.featuredImages.length
      ? data.featuredImages.slice(0, 5).filter((img: any) => img?.asset || typeof img === 'string').map((img: any, idx: number) => ({
          src: img?.asset ? urlForImage(img)?.url() : img,
          alt: `Film frame ${idx + 1}`,
          label: `SCENE_${String(idx + 1).padStart(2, "0")}`,
          metadata: "T 1.4 | 1/125",
        }))
      : [];

  const heroImage = data?.heroImage?.asset
    ? urlForImage(data.heroImage)?.url()
    : data?.clientImage || '';

  return (
    <section 
      ref={containerRef}
      className="relative w-full pt-24 md:pt-48 pb-16 md:pb-12 px-5 md:px-12 lg:px-24 bg-[#E7DFC8] overflow-hidden select-none border-t border-black/5"
      id="cinematography-storytelling"
    >
      <div 
        className="absolute -top-[18%] -right-[6%] w-[70vw] h-[70vw] rounded-full pointer-events-none opacity-10 mix-blend-overlay"
        style={{
          background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, rgba(139,30,45,0.06) 40%, rgba(231,223,200,0) 70%)"
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-14 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-[5.25rem] lg:text-[6rem] leading-[0.9] font-serif italic text-[#8B1E2D] tracking-tight">
              {heroHeading}
            </h2>
            <div className="mt-3">
              <div className="w-24 h-1 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#8B1E2D]" />
            </div>
          </div>
          {/* removed small side metadata to keep client hero clean and premium */}
        </div>

        <div className="flex flex-nowrap justify-start md:justify-between gap-3 md:gap-4 mb-20 md:mb-32 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-3 md:pb-0">
          {filmStripImages.map((img: any, idx: number) => (
            <div 
              key={idx}
              className="relative w-[72vw] max-w-[270px] flex-none md:w-[19%] md:max-w-none aspect-[3/5] overflow-hidden grayscale contrast-[1.2] brightness-[0.85] hover:grayscale-0 hover:brightness-105 transition-all duration-[1500ms] ease-out group shadow-2xl shadow-black/10 snap-center"
            >
              <div className="absolute inset-0 z-20 border-[12px] border-black/5 opacity-40 pointer-events-none" />
              <div className="absolute inset-0 z-30 border-[1px] border-white/5 group-hover:border-white/20 transition-colors duration-700 pointer-events-none" />
              
              <div className="absolute top-4 left-4 z-40 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-2 group-hover:translate-y-0">
                <span className="text-[8px] text-white font-mono tracking-widest bg-black/40 px-2 py-1 backdrop-blur-md rounded-sm">{img.label}</span>
              </div>
              <div className="absolute bottom-4 right-4 z-40 opacity-0 group-hover:opacity-100 transition-all duration-700 -translate-y-2 group-hover:translate-y-0">
                <span className="text-[7px] text-white/80 font-mono tracking-tighter text-right leading-none">
                  {img.metadata} <br />
                  <span className="opacity-40">RAW_LOG_C</span>
                </span>
              </div>

              <div className="relative w-full h-full">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 20vw"
                  priority={idx === 0}
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-10 transition-opacity duration-1000 z-10" />
            </div>
          ))}
        </div>

        <div className="w-full relative">
          <div className="hidden md:block col-span-1 border-l border-lumus-dark/10 h-full" />

          <div className="w-full min-w-0 md:col-span-11 space-y-10 md:space-y-16">
            {/* top quote removed as requested */}

            <div className="border-y border-lumus-dark/10 py-8 md:py-12 w-full">
              <div className="w-full md:flex md:items-stretch md:gap-12">
                <div className="md:w-1/2 flex-shrink-0">
                  <div className="relative w-full h-[100svh] md:h-[720px] rounded-none md:rounded-lg overflow-hidden shadow-2xl border-0 md:border border-[#D4AF37]/12 ring-0 md:ring-1 ring-[#D4AF37]/8 -mx-5 md:mx-0 w-[calc(100%+2.5rem)] md:w-full">
                    {heroImage && (
                      <Image
                        src={heroImage}
                        alt={heroHeading}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    )}
                  </div>
                </div>

                <div className="md:w-1/2 flex flex-col justify-center">
                  <div className="mb-6">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-10 h-[1px] bg-[#8B1E2D]/50" />
                      <span className="text-[9px] md:text-[10px] tracking-[0.35em] uppercase text-[#8B1E2D] font-black">About</span>
                    </div>
                    <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif italic leading-none text-[#8B1E2D]">
                      {heroHeading}<br />{heroSubHeading}
                    </h3>
                    <div className="pt-6">
                      <p className="text-[#8B1E2D]/90 text-sm md:text-base italic font-serif tracking-wide">
                        {tagline}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    {narrativeParagraphs.map((paragraph: string, index: number) => (
                      <p key={index} className={"text-lumus-dark/75 text-base md:text-lg leading-relaxed font-sans-modern font-light"}>
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <div className="mt-8">
                    <a href="#contact-wrapper" className="inline-block mt-2 bg-[#8B1E2D] text-white px-6 py-3 rounded-full text-sm tracking-wider shadow-sm">Inquire Now</a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Philosophy and end reflection removed per request */}
          </div>
        </div>
      </div>

      {/* Subtle paper texture only for refined background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] z-10 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
    </section>
  );
};

export default CinematicStorytelling;
