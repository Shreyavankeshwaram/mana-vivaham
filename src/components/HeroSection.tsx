"use client";

import { useRef } from "react";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";

// Removed fallback arrays

const Column = ({ images, reverse = false }: { images: string[], reverse?: boolean }) => {
  // Double the images to create a seamless infinite scroll loop
  const loopImages = [...images, ...images];
  
  return (
    <div className="w-1/3 flex flex-col overflow-visible h-full">
      <div className={`flex flex-col gap-4 md:gap-8 w-full ${reverse ? 'animate-slide-down' : 'animate-slide-up'}`}>
        {loopImages.map((src, i) => (
          <div key={i} className="relative w-full aspect-[3/4] rounded-md overflow-hidden opacity-50 hover:opacity-100 transition-opacity duration-500 shadow-2xl">
            <Image src={src} fill alt="gallery loop" className="object-cover" sizes="33vw" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default function HeroSection({ images: cmsImages }: { images?: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  if (!cmsImages?.length) return null;

  const col1 = cmsImages.filter((_, idx) => idx % 3 === 0).map(img => img.asset ? urlForImage(img)?.url() : img).filter(Boolean);
  const col2 = cmsImages.filter((_, idx) => idx % 3 === 1).map(img => img.asset ? urlForImage(img)?.url() : img).filter(Boolean);
  const col3 = cmsImages.filter((_, idx) => idx % 3 === 2).map(img => img.asset ? urlForImage(img)?.url() : img).filter(Boolean);

  return (
    <section ref={containerRef} className="relative w-full h-screen flex items-center justify-center bg-transparent overflow-hidden">
      
      {/* Background Loop Grid rotated slightly for that dynamic, floating feel */}
      <div className="absolute inset-0 w-[100vw] md:w-[100vw] h-[150vh] md:h-[200vh] -top-[25vh] md:-top-[50vh] left-1/2 -translate-x-1/2 flex justify-center gap-4 md:gap-8 rotate-[-8deg] scale-110 pointer-events-auto">
        <Column images={col1} />
        <Column images={col2} reverse />
        <Column images={col3} />
      </div>

      {/* Dark overlay to make the main text pop */}
      <div className="absolute inset-0 bg-black/50 z-0 pointer-events-none" />

      {/* Main Typography */}
      <div className="relative z-10 text-center px-4 flex flex-col items-center pointer-events-none">
        <h1 className="sanitize-heading text-6xl md:text-[10rem] font-serif tracking-tighter text-[#f4eee0] leading-none drop-shadow-2xl mix-blend-overlay">
          Mana Vivaham
        </h1>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h1 className="sanitize-heading text-6xl md:text-[10rem] font-serif tracking-tighter text-[#f4eee0] leading-none drop-shadow-2xl opacity-90">
            Mana Vivaham
          </h1>
        </div>
        <p className="mt-8 text-xs md:text-lg font-serif text-[#f4eee0] tracking-[0.4em] font-light uppercase drop-shadow-md">
          A cinematic celebration of love
        </p>
      </div>

    </section>
  );
}
