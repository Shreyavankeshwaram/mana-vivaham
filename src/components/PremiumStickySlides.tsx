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

export default function PremiumStickySlides({ slides = [] }: { slides?: any[] }) {
  const displaySlides = (slides || []).filter((s: any) => s.title || s.subtitle || s.description || s.image?.asset);

  if (!displaySlides.length) return null;

  const triggerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const scrollRoom = `${displaySlides.length * 100}vh`;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!triggerRef.current || !pinRef.current) return;

    const ctx = gsap.context(() => {
      const allSlides = gsap.utils.toArray(".mv-slide-wrapper") as HTMLElement[];
      const totalSlides = allSlides.length;
      const isMobile = window.innerWidth < 768;
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

        mainTl.fromTo(slide,
          { yPercent: 100, force3D: true },
          { yPercent: 0, ease: "none", force3D: true },
          i - 1
        );

        if (img && !isMobile) {
          mainTl.fromTo(img,
            { yPercent: -80, force3D: true },
            { yPercent: 0, ease: "none", force3D: true },
            i - 1
          );
        }

        if (content) {
          mainTl.fromTo(content,
            { y: isMobile ? 32 : 100, opacity: 0, force3D: true },
            { y: 0, opacity: 1, duration: isMobile ? 0.3 : 0.6, ease: "power2.out", force3D: true },
            (i - 1) + (isMobile ? 0.08 : 0.3)
          );
        }
      });

    }, triggerRef);

    return () => ctx.revert();
  }, [displaySlides.length]);

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
                <div className="mv-slide-image-container absolute inset-0 w-full h-full overflow-hidden">
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

                <div className="mv-slide-content relative z-20 w-full h-full flex flex-col justify-center px-8 md:px-24">
                  <div className="max-w-[1200px] w-full">
                    <span className="font-inter text-[10px] md:text-[12px] tracking-[0.5em] text-white/50 uppercase mb-6 block font-bold">
                      {slide.subtitle}
                    </span>
                    <h2 className="font-cormorant text-[4rem] md:text-[10rem] leading-[0.85] text-white font-semibold uppercase mb-10 drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
                      <span className="block">{(slide.title || "").split(' ')[0]}</span>
                      <span className="block ml-0 md:ml-32 text-white">
                        {(slide.title || "").split(' ').slice(1).join(' ')}
                      </span>
                    </h2>
                    <p className="font-inter text-white/90 text-[0.9rem] md:text-[1.2rem] leading-relaxed max-w-[500px] font-light tracking-wide">
                      {slide.description}
                    </p>
                  </div>
                </div>

                <div className="absolute bottom-12 right-12 z-30 flex flex-col items-end gap-2">
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
