"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { urlForImage } from "@/sanity/lib/image";

export default function BentoPortfolio({ images = [] }: { images?: any[] }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (gridRef.current) {
      const cards = gridRef.current.children;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
          },
        }
      );
    }
  }, []);

  const getImgSrc = (index: number) => {
    const img = images?.[index];
    if (img?.asset) return urlForImage(img)?.url() || "";
    if (typeof img === 'string') return img;
    return "";
  };

  const getMosaicImgSrc = (index: number) => {
    // Mosaic starts at index 1 to 8
    return getImgSrc(1 + index);
  };

  return (
    <section className="relative w-full bg-transparent py-24 md:py-32 px-4 md:px-12 text-lumus-dark overflow-hidden z-20">
      <div className="max-w-[1400px] mx-auto">

        {/* Heading Section */}
        <div className="mb-10 md:mb-16 flex flex-col md:flex-row md:justify-between md:items-end gap-6 px-2">
          <div>
            <h2 className="text-4xl md:text-6xl font-serif mb-2 md:mb-4 text-lumus-dark"></h2>
            <p className="text-zinc-500 text-xs md:text-sm tracking-widest uppercase"></p>
          </div>
          <button className="flex items-center gap-2 group hover:text-white/70 transition-colors">
            <span className="text-xs md:text-sm font-semibold tracking-wide uppercase text-lumus-dark"></span>
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-all group-hover:bg-white group-hover:text-black">
              {/* Arrow SVG using standard icon path */}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-lumus-dark"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
            </div>
          </button>
        </div>

        {/* Responsive Grid Layout matching the screenshot */}
        <div ref={gridRef} className="relative grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[300px] md:auto-rows-[320px]">

          {/* Card 1: Indoor or Outdoor */}
          <div className="group relative col-span-1 md:col-span-1 md:row-span-1 overflow-hidden bg-white/5 backdrop-blur-md cursor-pointer">
            {getImgSrc(0) && <Image
              src={getImgSrc(0)}
              alt="Indoor or Outdoor"
              fill
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />}
            {/* Gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-20">
              <h3 className="text-xl md:text-2xl font-serif italic text-white leading-snug">
                
              </h3>
            </div>
          </div>

          {/* Card 2: Proven Experience Grid */}
          <div className="group relative col-span-1 md:col-span-2 md:row-span-1 overflow-hidden flex flex-col cursor-pointer bg-white">
            <div className="grid grid-cols-4 grid-rows-2 gap-[2px] w-full h-full absolute inset-0 transition-transform duration-1000 ease-out group-hover:scale-105">
              {/* Fake multiple images to mimic the 8-image mosaic in screenshot */}
              <div className="relative w-full h-full">{getMosaicImgSrc(0) && <Image src={getMosaicImgSrc(0)} alt="" fill className="object-cover" sizes="25vw" />}</div>
              <div className="relative w-full h-full">{getMosaicImgSrc(1) && <Image src={getMosaicImgSrc(1)} alt="" fill className="object-cover grayscale" sizes="25vw" />}</div>
              <div className="relative w-full h-full">{getMosaicImgSrc(2) && <Image src={getMosaicImgSrc(2)} alt="" fill className="object-cover" sizes="25vw" />}</div>
              <div className="relative w-full h-full">{getMosaicImgSrc(3) && <Image src={getMosaicImgSrc(3)} alt="" fill className="object-cover" sizes="25vw" />}</div>
              <div className="relative w-full h-full">{getMosaicImgSrc(4) && <Image src={getMosaicImgSrc(4)} alt="" fill className="object-cover" sizes="25vw" />}</div>
              <div className="relative w-full h-full">{getMosaicImgSrc(5) && <Image src={getMosaicImgSrc(5)} alt="" fill className="object-cover saturate-150" sizes="25vw" />}</div>
              <div className="relative w-full h-full">{getMosaicImgSrc(6) && <Image src={getMosaicImgSrc(6)} alt="" fill className="object-cover grayscale" sizes="25vw" />}</div>
              <div className="relative w-full h-full">{getMosaicImgSrc(7) && <Image src={getMosaicImgSrc(7)} alt="" fill className="object-cover" sizes="25vw" />}</div>
            </div>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 transition-colors duration-500 group-hover:bg-black/50" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-20">
              <h3 className="text-xl md:text-2xl font-serif text-white max-w-xl leading-snug">
                
              </h3>
            </div>
          </div>

          {/* Card 3: Professional Gears (Black Card, Tall) */}
          <div className="group relative col-span-1 md:col-span-1 md:row-span-2 overflow-hidden bg-[#0a0a0a] cursor-pointer flex flex-col">
            <div className="p-8 md:p-10 z-20 flex-1">
              <h3 className="text-4xl md:text-5xl font-sans text-white leading-[1.2] font-semibold tracking-tight">
                
              </h3>
            </div>
            <div className="relative w-full h-[50%] mt-auto">
              {getImgSrc(9) && <Image
                src={getImgSrc(9)}
                alt="Camera Lens"
                fill
                className="object-cover object-bottom transition-transform duration-1000 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>
          </div>

          {/* Card 4: Recognized Beyond Borders */}
          <div className="group relative col-span-1 md:col-span-1 md:row-span-1 rounded-3xl overflow-hidden shadow-sm bg-white/5 backdrop-blur-md border border-white/10 cursor-pointer">
            {getImgSrc(10) && <Image
              src={getImgSrc(10)}
              alt="Event Recognition"
              fill
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-20">
              <h3 className="text-lg md:text-xl font-serif text-white leading-snug">
                
              </h3>
            </div>
          </div>

          {/* Card 5: Portrait of Photographer (Tall) */}
          <div className="group relative col-span-1 md:col-span-1 md:row-span-2 rounded-3xl overflow-hidden shadow-sm bg-white/5 backdrop-blur-md border border-white/10 cursor-pointer">
            {getImgSrc(11) && <Image
              src={getImgSrc(11)}
              alt="Photographer Portrait"
              fill
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
          </div>

          {/* Card 6: Half Face / Bottom Middle */}
          <div className="group relative col-span-1 md:col-span-1 md:row-span-1 rounded-3xl overflow-hidden shadow-sm bg-[#5fa8d3] cursor-pointer">
            {getImgSrc(12) && <Image
              src={getImgSrc(12)}
              alt="Portrait Face"
              fill
              className="object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />}
          </div>

        </div>
      </div>
    </section>
  );
}
