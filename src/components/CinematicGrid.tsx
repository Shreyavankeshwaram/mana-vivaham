"use client";

import Image from "next/image";
import { Camera, ArrowUpRight } from "lucide-react";

import { urlForImage } from "@/sanity/lib/image";

export default function CinematicGrid({ cards: cmsCards }: { cards?: any[] }) {
  const cards = (cmsCards || []).filter((c: any) => c.image?.asset || c.src).map((c: any, i: number) => ({
      id: c._id || i,
      src: c.image?.asset ? urlForImage(c.image)?.url() : c.src,
      title: c.title || "",
      year: c.year || "",
      category: c.category || "",
  }));
  if (!cards.length) return null;
  return (
    <section className="relative w-full bg-transparent py-16 md:py-24 px-2 md:px-12 z-20">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-2 md:mb-4">Latest Work</h2>
          <p className="text-gray-500 text-[10px] md:text-sm tracking-widest uppercase">I capture your vision through creative photography.</p>
        </div>
        
        <div className="grid grid-cols-2 gap-3 md:gap-8">
          {cards.map((card) => (
            <div
              key={card.id}
              className="group relative w-full aspect-[16/10] overflow-hidden bg-black cursor-pointer"
            >
              <Image
                src={card.src}
                alt={card.category}
                fill
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 50vw"
              />
              
              {/* Subtle dark gradient overlay so white text is always readable */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 opacity-70 group-hover:opacity-40 transition-opacity duration-500" />



              {/* Top Left Text */}
              <div className="absolute top-5 left-6 md:top-9 md:left-11 z-20 text-white font-sans text-[10px] md:text-lg tracking-wide">
                {card.title}
              </div>



              {/* Bottom Left Text */}
              <div className="absolute bottom-5 left-6 md:bottom-9 md:left-11 z-20 flex items-center text-white font-sans text-[8px] md:text-sm tracking-wide">
                {card.year}
                <ArrowUpRight strokeWidth={1.5} className="w-2.5 h-2.5 md:w-4 md:h-4 ml-[2px] md:ml-1 opacity-80 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>

              {/* Bottom Right Text */}
              <div className="absolute bottom-5 right-6 md:bottom-9 md:right-11 z-20 text-white font-sans text-[8px] md:text-sm tracking-wide opacity-80">
                {card.category}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
