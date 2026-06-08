'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const column1 = [
  { src: "/images/editorial_wedding_1.png", title: "THE SACRED VOWS" },
  { src: "/images/wedding_temple.png", title: "MISTRESS AND MAID" },
  { src: "/images/editorial_detail_1.png", title: "THE GUITAR PLAYER" },
  { src: "/images/editorial_wedding_1.png", title: "THE SACRED VOWS" },
  { src: "/images/wedding_temple.png", title: "MISTRESS AND MAID" },
];

const column2 = [
  { src: "/images/nature_mood_1.png", title: "THE MILKMAID" },
  { src: "/images/wedding_botanical_1.png", title: "THE ASTRONOMER" },
  { src: "/images/wedding_botanical_2.png", title: "VIEW OF DELFT" },
  { src: "/images/nature_mood_1.png", title: "THE MILKMAID" },
  { src: "/images/wedding_botanical_1.png", title: "THE ASTRONOMER" },
];

const column3 = [
  { src: "/images/editorial_wedding_1.png", title: "THE LACEMAKER" },
  { src: "/images/editorial_detail_1.png", title: "OFFICER & GIRL" },
  { src: "/images/antigravity.png", title: "THE GEOGRAPHER" },
  { src: "/images/editorial_wedding_1.png", title: "THE LACEMAKER" },
  { src: "/images/editorial_detail_1.png", title: "OFFICER & GIRL" },
];

export default function LuxuryStickyColumns() {
  const triggerRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!triggerRef.current || !pinRef.current) return;

    // Use a small delay to ensure DOM is ready and prevent 'removeChild' errors
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    const ctx = gsap.context(() => {
      // 1. Stable Pinning - Separation of trigger and pin
      ScrollTrigger.create({
        trigger: triggerRef.current,
        start: "top top",
        end: "+=300%",
        pin: pinRef.current,
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        // Added markers for stability during debug if needed, but keeping off for production
      });

      const setupScroll = (ref: React.RefObject<HTMLDivElement | null>, reverse: boolean) => {
        if (!ref.current) return;
        const height = ref.current.offsetHeight;
        const distance = height - window.innerHeight;

        gsap.fromTo(ref.current,
          { y: reverse ? -distance : 0 },
          {
            y: reverse ? 0 : -distance,
            ease: "none",
            scrollTrigger: {
              trigger: triggerRef.current,
              start: "top top",
              end: "+=300%",
              scrub: 1.2,
            }
          }
        );
      };

      setupScroll(col1Ref, false);
      setupScroll(col2Ref, true);
      setupScroll(col3Ref, false);

    }, triggerRef);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  const renderItem = (item: any, i: number) => (
    <figure key={i} className="flex flex-col m-0 w-full group">
      <figcaption className="mb-4 text-[11px] md:text-sm font-serif italic tracking-wide text-black/40 group-hover:text-[#8B1E2D] transition-colors duration-500">
        {item.title}
      </figcaption>
      <div className="relative aspect-[6/7] w-full overflow-hidden shadow-sm rounded-sm transition-all duration-700 group-hover:shadow-2xl">
        <Image
          src={item.src}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 25vw"
          loading="lazy"
        />
      </div>
    </figure>
  );

  return (
    <section
      ref={triggerRef}
      className="luxury-scroll-trigger relative w-full bg-[#F0F0F0] z-20"
    >
      <div
        ref={pinRef}
        className="luxury-scroll-pin relative w-full h-screen overflow-hidden flex flex-col bg-[#F0F0F0]"
      >
        {/* Editorial Header with Super Cool Serif Font */}
        <div className="w-full flex flex-col items-center pt-24 pb-12 px-6 bg-[#F0F0F0] z-30">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-[1px] bg-black/10" />
            <span className="text-[10px] md:text-xs font-serif italic tracking-[0.2em] text-black/30">An Editorial Showcase</span>
            <div className="w-12 h-[1px] bg-black/10" />
          </div>
          <h2 className="text-4xl md:text-7xl font-serif italic text-black tracking-tighter text-center leading-[1.1]">
            The Art of Cinematic <br /> Perspective
          </h2>
        </div>

        {/* Grid System */}
        <div className="flex-1 flex flex-row justify-center items-start gap-6 md:gap-16 px-6 md:px-24">
          <div className="flex flex-col flex-1 max-w-[25vw]">
            <div ref={col1Ref} className="flex flex-col gap-24 md:gap-40 will-change-transform pt-12">
              {column1.map((item, i) => renderItem(item, i))}
            </div>
          </div>

          <div className="flex flex-col flex-1 max-w-[25vw]">
            <div ref={col2Ref} className="flex flex-col gap-24 md:gap-40 will-change-transform pt-12">
              {column2.map((item, i) => renderItem(item, i))}
            </div>
          </div>

          <div className="flex flex-col flex-1 max-w-[25vw]">
            <div ref={col3Ref} className="flex flex-col gap-24 md:gap-40 will-change-transform pt-12">
              {column3.map((item, i) => renderItem(item, i))}
            </div>
          </div>
        </div>

        {/* Film grain overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[url('/noise.svg')]" />
      </div>
    </section>
  );
}
