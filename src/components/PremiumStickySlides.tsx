"use client";

import React, { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { Bodoni_Moda } from "next/font/google";
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
    image: "/images/wedding_botanical_1.png",
  },
  {
    title: "Royal Entrance",
    subtitle: "CHAPTER II",
    description: "A cinematic arrival shaped by movement, music, and the quiet gravity of the moment.",
    image: "/sequence-1/ezgif-frame-041.jpg",
  },
  {
    title: "Vows In Light",
    subtitle: "CHAPTER III",
    description: "The ceremony unfolds in intimate details, held in light, texture, and honest emotion.",
    image: "/sequence-1/ezgif-frame-074.jpg",
  },
  {
    title: "Living Legacy",
    subtitle: "CHAPTER IV",
    description: "The night becomes memory, preserved as an heirloom chapter for the years ahead.",
    image: "/sequence-1/ezgif-frame-115.jpg",
  },
];

export default function PremiumStickySlides({ slides = [] }: { slides?: any[] }) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const displaySlides = useMemo(() => {
    const cmsSlides = Array.isArray(slides) ? slides : [];
    const slideCount = Math.max(fallbackSlideCopy.length, cmsSlides.length);

    return Array.from({ length: slideCount }, (_, index) => {
      const fallback = fallbackSlideCopy[index % fallbackSlideCopy.length];
      const slide = cmsSlides[index] || {};

      return {
        ...slide,
        title: slide.title || fallback.title,
        subtitle: slide.subtitle || fallback.subtitle,
        description: slide.description || fallback.description,
        image: slide.image || fallback.image,
      };
    });
  }, [slides]);
  const scrollRoom = `${displaySlides.length * 100}vh`;

  useEffect(() => {
    if (!displaySlides.length || !triggerRef.current || !pinRef.current) return;

    const section = triggerRef.current;
    let frame = 0;

    const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

    const updateSlides = () => {
      frame = 0;

      const allSlides = Array.from(section.querySelectorAll<HTMLElement>(".mv-slide-wrapper"));
      const totalSlides = allSlides.length;
      if (totalSlides < 2) return;

      const rect = section.getBoundingClientRect();
      const scrollableDistance = Math.max(1, rect.height - window.innerHeight);
      const progress = clamp(-rect.top / scrollableDistance);
      const trackPosition = progress * (totalSlides - 1);
      const isMobile = window.innerWidth < 768;

      allSlides.forEach((slide, index) => {
        const content = slide.querySelector<HTMLElement>(".mv-slide-content");
        const image = slide.querySelector<HTMLElement>(".mv-slide-image-inner");

        if (index === 0) {
          slide.style.transform = "translate3d(0, 0, 0)";
          if (content) {
            content.style.opacity = `${clamp(1 - trackPosition * 1.4)}`;
            content.style.transform = `translate3d(0, ${-clamp(trackPosition) * (isMobile ? 24 : 44)}px, 0)`;
          }
          if (image) image.style.transform = "translate3d(0, 0, 0)";
          return;
        }

        const localProgress = trackPosition - (index - 1);
        const yPercent = clamp(1 - localProgress) * 100;
        const textProgress = clamp(localProgress * 1.4);
        const textOffset = (1 - textProgress) * (isMobile ? 32 : 60);
        const imageOffset = isMobile ? 0 : -clamp(1 - localProgress) * 18;

        slide.style.transform = `translate3d(0, ${yPercent}%, 0)`;
        if (content) {
          content.style.opacity = `${textProgress}`;
          content.style.transform = `translate3d(0, ${textOffset}px, 0)`;
        }
        if (image) {
          image.style.transform = `translate3d(0, ${imageOffset}%, 0)`;
        }
      });
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateSlides);
    };

    type LenisLike = {
      on?: (event: "scroll", callback: () => void) => void;
      off?: (event: "scroll", callback: () => void) => void;
    };

    const lenis = (window as Window & { __manaLenis?: LenisLike }).__manaLenis;

    updateSlides();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    lenis?.on?.("scroll", scheduleUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      lenis?.off?.("scroll", scheduleUpdate);
    };
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
            const imgSrc = typeof slide.image === "string"
              ? slide.image
              : slide.image?.asset
                ? urlForImage(slide.image)?.url()
                : null;

            return (
              <div
                key={index}
                className="mv-slide-wrapper absolute inset-0 w-full h-full overflow-hidden transform-gpu will-change-transform"
                style={{
                  zIndex: index + 1,
                  transform: index === 0 ? "translate3d(0, 0, 0)" : "translate3d(0, 100%, 0)",
                }}
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

                <div
                  className="mv-slide-content absolute inset-0 z-40 w-full h-full flex flex-col justify-center px-8 md:px-24 pointer-events-none"
                  style={{ opacity: index === 0 ? 1 : 0 }}
                >
                  <div className="max-w-[1200px] w-full">
                    <span className="font-inter text-[10px] md:text-[12px] tracking-[0.5em] text-white/70 uppercase mb-6 block font-bold drop-shadow-[0_2px_14px_rgba(0,0,0,0.75)]">
                      {slide.subtitle}
                    </span>
                    <h2 className="font-cormorant text-[2rem] md:text-[4rem] lg:text-[5rem] leading-[0.85] text-white font-semibold uppercase mb-8 md:mb-10 drop-shadow-[0_4px_28px_rgba(0,0,0,0.85)]">
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
      <style>{`
        .font-cormorant { font-family: var(--font-playfair), serif; } 
        .font-inter { font-family: var(--font-playfair), serif; }
      `}</style>
    </section>
  );
}
