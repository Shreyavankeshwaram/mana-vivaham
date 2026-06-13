"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Bodoni_Moda } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { urlForImage } from "@/sanity/lib/image";

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
});

const fallbackSlideCopy = [
  {
    title: "Sacred Beginnings",
    subtitle: "CHAPTER I",
    description: "The first breath of the celebration, where ritual, anticipation, and family gather into one frame.",
  },
  {
    title: "Royal Entrance",
    subtitle: "CHAPTER II",
    description: "A cinematic arrival shaped by movement, music, and the quiet gravity of the moment.",
  },
  {
    title: "Vows In Light",
    subtitle: "CHAPTER III",
    description: "The ceremony unfolds in intimate details, held in light, texture, and honest emotion.",
  },
  {
    title: "Living Legacy",
    subtitle: "CHAPTER IV",
    description: "The night becomes memory, preserved as an heirloom chapter for the years ahead.",
  },
];

export default function PremiumStickySlides({ slides = [] }: { slides?: any[] }) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const displaySlides = (slides || [])
    .filter((s: any) => s.title || s.subtitle || s.description || s.image?.asset)
    .map((slide: any, index: number) => ({
      ...slide,
      title: slide.title || fallbackSlideCopy[index % fallbackSlideCopy.length].title,
      subtitle: slide.subtitle || fallbackSlideCopy[index % fallbackSlideCopy.length].subtitle,
      description: slide.description || fallbackSlideCopy[index % fallbackSlideCopy.length].description,
    }));
  const scrollRoom = `${displaySlides.length * 100}vh`;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!displaySlides.length || !triggerRef.current || !pinRef.current) return;

    const ctx = gsap.context(() => {
      const allSlides = gsap.utils.toArray(".mv-slide-wrapper") as HTMLElement[];
      const totalSlides = allSlides.length;
      const isMobile = window.innerWidth < 768;

      // ✅ KEY FIX: Immediately push all slides except slide 0 below the viewport.
      // Without this, all slides are stacked at absolute inset-0 on mount,
      // and the highest z-index slide (last one) covers everything.
      allSlides.forEach((slide, i) => {
        if (i === 0) return;
        gsap.set(slide, { yPercent: 100, force3D: true });
        const content = slide.querySelector(".mv-slide-content");
        if (content) gsap.set(content, { opacity: 0, y: isMobile ? 32 : 60, force3D: true });
      });

      const snapConfig = totalSlides > 1 && !isMobile
        ? {
          snapTo: 1 / (totalSlides - 1),
          duration: { min: 0.25, max: 0.5 },
          delay: 0.02,
          ease: "power2.out"
        }
        : undefined;

      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: isMobile ? 0.12 : 0.65,
          snap: snapConfig,
          anticipatePin: 1,
          fastScrollEnd: true,
          preventOverlaps: true,
          invalidateOnRefresh: true
        }
      });

      allSlides.forEach((slide, i) => {
        if (i === 0) return;

        const img = slide.querySelector(".mv-slide-image-inner");
        const content = slide.querySelector(".mv-slide-content");

        // Animate slide up from below
        mainTl.fromTo(slide,
          { yPercent: 100, force3D: true },
          { yPercent: 0, ease: "none", force3D: true },
          i - 1
        );

        // Parallax on the image inside
        if (img && !isMobile) {
          mainTl.fromTo(img,
            { yPercent: -80, force3D: true },
            { yPercent: 0, ease: "none", force3D: true },
            i - 1
          );
        }

        // Fade in content text as slide enters
        if (content) {
          mainTl.fromTo(content,
            { y: isMobile ? 32 : 60, opacity: 0, force3D: true },
            { y: 0, opacity: 1, duration: isMobile ? 0.3 : 0.5, ease: "power2.out", force3D: true },
            (i - 1) + (isMobile ? 0.08 : 0.25)
          );
        }
      });

    }, triggerRef);

    return () => ctx.revert();
  }, [displaySlides.length]);

  if (!displaySlides.length) return null;

  return (
    <section
      ref={triggerRef}
      className={`mv-premium-slides-trigger relative w-full h-auto ${bodoniModa.variable}`}
      style={{ height: scrollRoom }}
    >
      <div
        ref={pinRef}
        className="mv-premium-slides-full sticky top-0 w-full h-screen overflow-hidden bg-black"
      >
        <div className="relative w-full h-full">
          {displaySlides.map((slide: any, index: number) => {
            const imgSrc = slide.image?.asset ? urlForImage(slide.image)?.url() : null;

            return (
              <div
                key={index}
                className="mv-slide-wrapper absolute inset-0 w-full h-full overflow-hidden transform-gpu will-change-transform"
                style={{ zIndex: index }}
              >
                <div className="mv-slide-image-container absolute inset-0 z-0 w-full h-full overflow-hidden">
                  <div className="mv-slide-image-inner absolute inset-0 w-full h-full md:h-[180%] md:-top-[40%] transform-gpu will-change-transform">
                    {imgSrc && (
                      <Image
                        src={imgSrc}
                        alt={slide.title || slide.subtitle || "Premium Slide"}
                        fill
                        className="object-contain md:object-cover"
                        sizes="100vw"
                        priority={index === 0}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/70 md:from-black/60 md:to-black/80" />
                  </div>
                </div>

                <div className="mv-slide-content absolute inset-0 z-40 w-full h-full flex flex-col justify-center px-8 md:px-24 pointer-events-none">
                  <div className="max-w-[1200px] w-full">
                    <span className="font-inter text-[10px] md:text-[12px] tracking-[0.5em] text-white/70 uppercase mb-6 block font-bold drop-shadow-[0_2px_14px_rgba(0,0,0,0.75)]">
                      {slide.subtitle}
                    </span>
                    <h2 className="font-cormorant text-[3.8rem] md:text-[8rem] lg:text-[10rem] leading-[0.85] text-white font-semibold uppercase mb-8 md:mb-10 drop-shadow-[0_4px_28px_rgba(0,0,0,0.85)]">
                      <span className="block">{(slide.title || "").split(' ')[0]}</span>
                      <span className="block ml-0 md:ml-32 text-white">
                        {(slide.title || "").split(' ').slice(1).join(' ')}
                      </span>
                    </h2>
                    <p className="font-inter text-white text-[0.9rem] md:text-[1.2rem] leading-relaxed max-w-[520px] font-light tracking-wide drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)]">
                      {slide.description}
                    </p>
                  </div>
                </div>

                <div className="absolute bottom-12 right-12 z-50 flex flex-col items-end gap-2">
                  <div className="w-16 h-[1px] bg-white/20" />
                  <span className="font-cormorant text-[2rem] md:text-[3.5rem] text-white/20 italic">0{index + 1}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <style jsx>{`
        .font-cormorant { font-family: var(--font-playfair), serif; } 
        .font-inter { font-family: var(--font-playfair), serif; }
      `}</style>
    </section>
  );
}
