"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const stripImages = [
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1541250848049-b4f7141dca3f?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop",
];

export default function InstagramStrip() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !scrollWrapperRef.current) return;

    const ctx = gsap.context(() => {
      // Calculate how far to move based on the wrapper's width vs the viewport's width
      const getScrollAmount = () => {
        const scrollWidth = scrollWrapperRef.current?.scrollWidth || 0;
        return -(scrollWidth - window.innerWidth);
      };

      const tween = gsap.to(scrollWrapperRef.current, {
        x: getScrollAmount,
        ease: "none"
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "center center",
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full h-screen bg-transparent flex flex-col justify-center overflow-hidden relative py-20">
      <div className="absolute top-10 left-10 md:left-20 z-10">
        <h2 className="text-xl md:text-3xl font-light tracking-[0.3em] uppercase text-white">
          @AuraPhotography
        </h2>
      </div>
      
      <div ref={scrollWrapperRef} className="flex gap-8 px-10 md:px-20 h-[50vh] md:h-[60vh] mt-10">
        {stripImages.map((src, i) => (
          <div key={i} className="flex-none w-[70vw] md:w-[30vw] h-full relative overflow-hidden group">
            <Image
              src={src}
              alt={`Instagram post ${i}`}
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105"
              sizes="(max-width: 768px) 70vw, 30vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
