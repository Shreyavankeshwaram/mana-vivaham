"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const layeredImages = [
  { id: 1, src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop", x: "-20%", y: "-20%", scale: 1.5, depth: 2 },
  { id: 2, src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000&auto=format&fit=crop", x: "25%", y: "-15%", scale: 1.8, depth: 3 },
  { id: 3, src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1000&auto=format&fit=crop", x: "-30%", y: "20%", scale: 1.6, depth: 4 },
  { id: 4, src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000&auto=format&fit=crop", x: "35%", y: "25%", scale: 2, depth: 5 },
];

export default function ZoomSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const centerImageRef = useRef<HTMLDivElement>(null);
  const textLeftRef = useRef<HTMLDivElement>(null);
  const textRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=3000",
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. Animate layered images for depth (zoom effect)
      const layers = containerRef.current?.querySelectorAll(".depth-layer");
      layers?.forEach((layer, i) => {
        const depth = layeredImages[i].depth;
        tl.to(layer, {
          scale: 0.8,
          opacity: 0,
          filter: "blur(20px)",
          z: -500 * depth,
          ease: "none",
        }, 0);
      });

      // 2. Animate center masked image
      tl.to(centerImageRef.current, {
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        ease: "power2.inOut",
      }, 0);

      // 3. Animate split text
      tl.to(textLeftRef.current, {
        x: "-100%",
        opacity: 0,
        ease: "none",
      }, 0);
      tl.to(textRightRef.current, {
        x: "100%",
        opacity: 0,
        ease: "none",
      }, 0);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden bg-transparent z-20">
      
      {/* Background Depth Container */}
      <div ref={containerRef} className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ perspective: "1000px" }}>
        {layeredImages.map((img) => (
          <div
            key={img.id}
            className="depth-layer absolute w-[40vw] h-[50vh] overflow-hidden opacity-80"
            style={{
              left: `calc(50% + ${img.x})`,
              top: `calc(50% + ${img.y})`,
              transform: `translate(-50%, -50%) scale(${img.scale}) translateZ(0px)`,
            }}
          >
            <Image src={img.src} alt="Depth layer" fill className="object-cover" sizes="40vw" />
          </div>
        ))}
      </div>

      {/* Central Masked Image (Starts larger/blurred) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div 
          ref={centerImageRef}
          className="relative w-[80vw] h-[80vh] md:w-[60vw] md:h-[70vh] overflow-hidden scale-[2] opacity-0 filter blur-3xl transition-all"
        >
          <Image 
            src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop" 
            alt="Hero centered" 
            fill 
            className="object-cover"
            sizes="80vw"
          />
          {/* Internal mask overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      </div>

      {/* Split Text Overlays */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="flex gap-4 md:gap-20">
          <div ref={textLeftRef} className="text-5xl md:text-[12rem] font-serif font-bold text-white tracking-tighter uppercase whitespace-nowrap drop-shadow-2xl">
            TIMELESS
          </div>
          <div ref={textRightRef} className="text-5xl md:text-[12rem] font-serif font-bold text-white tracking-tighter uppercase whitespace-nowrap drop-shadow-2xl">
            MOMENTS
          </div>
        </div>
      </div>

      {/* Scroll Indicator Removed */}

    </section>
  );
}
