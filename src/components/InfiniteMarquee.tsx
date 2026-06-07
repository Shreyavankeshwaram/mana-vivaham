"use client";

import React from "react";
import Image from "next/image";
import { Bodoni_Moda } from "next/font/google";

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
});

const items = [
  { src: "/images/editorial_wedding_1.png", label: "CINEMA" },
  { src: "/images/wedding_temple.png", label: "HERITAGE" },
  { src: "/images/editorial_detail_1.png", label: "EDITORIAL" },
  { src: "/images/wedding_botanical_1.png", label: "SOUL" },
];

export default function InfiniteMarquee() {
  return (
    <section className={`mv-marquee-full relative w-full h-screen overflow-hidden bg-black ${bodoniModa.variable}`}>
      <div className="flex w-fit h-full">
        {/* First Loop */}
        <div className="flex animate-infinite-scroll h-full">
          {items.map((item, index) => (
            <div key={index} className="relative w-screen h-full flex-shrink-0">
              <Image 
                src={item.src} 
                alt={item.label} 
                fill 
                className="object-cover" 
                sizes="100vw"
                priority={index === 0}
              />
              {/* Branded Overlay */}
              <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center">
                <h2 className="sanitize-heading font-cormorant text-[12vw] md:text-[15vw] italic text-white/20 uppercase tracking-tighter leading-none select-none">
                  {item.label}
                </h2>
              </div>
            </div>
          ))}
        </div>

        {/* Second Loop */}
        <div className="flex animate-infinite-scroll h-full" aria-hidden="true">
          {items.map((item, index) => (
            <div key={`dup-${index}`} className="relative w-screen h-full flex-shrink-0">
              <Image 
                src={item.src} 
                alt={item.label} 
                fill 
                className="object-cover" 
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center">
                <h2 className="sanitize-heading font-cormorant text-[12vw] md:text-[15vw] italic text-white/20 uppercase tracking-tighter leading-none select-none">
                  {item.label}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Global Grain Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <style jsx>{`
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 60s linear infinite;
        }
        .font-cormorant {
          font-family: var(--font-playfair), serif;
        }
      `}</style>
    </section>
  );
}
