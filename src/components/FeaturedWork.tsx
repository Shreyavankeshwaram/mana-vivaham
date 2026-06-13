"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";

gsap.registerPlugin(ScrollTrigger);

const spanClasses = [
  "md:col-span-1 md:row-span-2", "md:col-span-1 md:row-span-1", "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-3", "md:col-span-1 md:row-span-2", "md:col-span-1 md:row-span-2",
  "md:col-span-1 md:row-span-3", "md:col-span-1 md:row-span-1", "md:col-span-1 md:row-span-3",
  "md:col-span-1 md:row-span-2", "md:col-span-1 md:row-span-1", "md:col-span-1 md:row-span-3",
  "md:col-span-1 md:row-span-2", "md:col-span-1 md:row-span-1"
];

export default function FeaturedWork({ images: cmsImages }: { images?: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const images = useMemo(() => (cmsImages || []).filter(img => img?.asset || typeof img === 'string').map((img: any, i: number) => ({
      id: img._id || i,
      src: img.asset ? urlForImage(img)?.url() : img,
      span: spanClasses[i % spanClasses.length],
  })), [cmsImages]);

  useEffect(() => {
    if (!images.length || !gridRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gridRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            stagger: 0.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [images.length]);

  if (!images.length) return null;

  return (
    <section ref={containerRef} className="relative w-full bg-transparent py-24 md:py-32 px-4 md:px-12 text-lumus-dark overflow-hidden z-20">
      <div className="max-w-[1400px] mx-auto">

        {/* Header matching the first screenshot */}
        <div className="mb-12 md:mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="flex items-start gap-4">
            <div className="w-5 h-5 bg-[#8B1E2D] mt-3 md:mt-5 flex-shrink-0" />
            <h2 className="text-5xl md:text-7xl font-sans font-bold leading-tight tracking-tight text-lumus-dark">
              See Through <br className="hidden md:block" />
              My Lens
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="text-gray-400 text-sm md:text-base leading-relaxed font-sans">
              Browse through a collection of my favorite shots & some moments captured while exploring the beauty of nature.
            </p>
          </div>
        </div>

        {/* 4-Column Masonry Grid */}
        <div ref={gridRef} className="relative grid grid-cols-2 md:grid-cols-4 grid-flow-dense gap-4 md:gap-6 auto-rows-[120px] md:auto-rows-[160px]">
          {images.map((img) => (
            <div
              key={img.id}
              className={`group relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden bg-gray-100 cursor-pointer shadow-sm ${img.span} col-span-1 row-span-2`}
            >
              <Image
                src={img.src}
                alt="Portfolio image"
                fill
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              {/* Subtle hover overlay to make it interactive, but NO text */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
