"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Bodoni_Moda } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
});

const stories = [
  {
    id: 1,
    label: "EDITORIAL STORYTELLING",
    title: "Wedding Frames Crafted Like Cinema",
    description: "We capture emotion with a cinematic editorial approach designed to feel timeless, immersive, and deeply personal.",
    image: "/images/editorial_wedding_1.png",
  },
  {
    id: 2,
    label: "MODERN ROMANCE",
    title: "Moments Beyond Photography",
    description: "From fleeting glances to grand celebrations, every scene is designed to feel emotionally alive and beautifully intentional.",
    image: "/images/wedding_temple.png",
  },
  {
    id: 3,
    label: "LUXURY EXPERIENCE",
    title: "Luxury Wedding Narratives",
    description: "For couples who value elegance, atmosphere, and storytelling beyond traditional photography.",
    image: "/images/wedding_botanical_1.png",
  },
  {
    id: 4,
    label: "TIMELESS MEMORIES",
    title: "Stories Designed To Endure",
    description: "Every wedding becomes a carefully composed visual memory filled with texture, emotion, and cinematic beauty.",
    image: "/images/editorial_detail_1.png",
  },
];

export default function CinematicStoryTabs() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current || !wrapperRef.current) return;

    const ctx = gsap.context(() => {
      const storyBlocks = gsap.utils.toArray(".mv-story-content-block") as HTMLElement[];
      const mediaPanels = gsap.utils.toArray(".mv-story-panel") as HTMLElement[];

      // Sticky Section Pinning
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: wrapperRef.current,
        pinSpacing: false,
      });

      // Transitions
      storyBlocks.forEach((block, i) => {
        if (i === 0) {
          // Initial state for first slide
          gsap.set(block, { opacity: 1, y: 0 });
          gsap.set(mediaPanels[i], { opacity: 1, scale: 1 });
        } else {
          gsap.set(block, { opacity: 0, y: 50 });
          gsap.set(mediaPanels[i], { opacity: 0, scale: 1.1 });
        }

        if (i > 0) {
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: () => `top+=${i * (sectionRef.current!.offsetHeight / stories.length)} top`,
            end: () => `top+=${(i + 1) * (sectionRef.current!.offsetHeight / stories.length)} top`,
            onToggle: (self) => {
              if (self.isActive) {
                // Fade In Current
                gsap.to(block, { opacity: 1, y: 0, duration: 1, ease: "power2.out" });
                gsap.to(mediaPanels[i], { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" });
                
                // Fade Out Others
                storyBlocks.forEach((other, j) => {
                  if (i !== j) {
                    gsap.to(other, { opacity: 0, y: -50, duration: 0.8 });
                    gsap.to(mediaPanels[j], { opacity: 0, scale: 1.05, duration: 0.8 });
                  }
                });
              }
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`mv-story-section relative w-full h-[500vh] ${bodoniModa.variable}`}
      style={{
        background: "linear-gradient(180deg, #f5efe4 0%, #efe6d7 45%, #eadfce 100%)"
      }}
    >
      {/* Subtle Film Grain Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-[1]" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* Soft Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none z-[2] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.03)_100%)]"></div>

      <div ref={wrapperRef} className="mv-story-wrapper sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center py-24 md:py-32 px-6 md:px-24">
        <div className="mv-story-grid w-full max-w-[1400px] h-full grid grid-cols-1 md:grid-cols-[0.4fr_0.6fr] gap-12 md:gap-24 relative z-[10]">
          
          {/* Left Column: Storytelling Content */}
          <div className="mv-story-left relative flex flex-col justify-center h-full">
            <div ref={contentRef} className="relative h-[60vh] md:h-[40vh]">
              {stories.map((story, i) => (
                <div 
                  key={story.id} 
                  className={`mv-story-content-block absolute inset-0 flex flex-col justify-center transition-all duration-1000 ${i === 0 ? "opacity-100" : "opacity-0"}`}
                >
                  <span className="mv-story-label font-inter text-[10px] md:text-[12px] tracking-[0.4em] text-[#8b2e3c] font-bold mb-6 uppercase">
                    {story.label}
                  </span>
                  
                  <h2 className="mv-story-title font-cormorant text-[2.5rem] md:text-[4.5rem] leading-[1.05] text-[#2a1d1b] font-medium mb-8">
                    {story.title}
                  </h2>
                  
                  <p className="mv-story-description font-inter text-[#7a6a58] text-[0.9rem] md:text-[1.1rem] leading-relaxed max-w-[400px] mb-12">
                    {story.description}
                  </p>

                  <div className="mv-story-cta">
                    <button className="mv-story-button group relative px-8 py-4 border border-[#8b2e3c]/30 rounded-full overflow-hidden transition-all duration-500">
                      <span className="relative z-10 font-inter text-[11px] tracking-[0.2em] uppercase text-[#2a1d1b] group-hover:text-white transition-colors duration-500">
                        View Portfolio
                      </span>
                      <div className="absolute inset-0 bg-[#8b2e3c] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Media Panels */}
          <div className="mv-story-right relative h-[50vh] md:h-full flex items-center">
            <div ref={mediaRef} className="relative w-full h-[80%] rounded-[32px] overflow-hidden shadow-2xl border border-white/40">
              {stories.map((story, i) => (
                <div 
                  key={story.id} 
                  className={`mv-story-panel absolute inset-0 w-full h-full transition-all duration-1000 ${i === 0 ? "opacity-100 scale-100" : "opacity-0 scale-110"}`}
                >
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover grayscale-0 md:grayscale-[0.4] hover:grayscale-0 transition-all duration-1000"
                    sizes="(max-width: 768px) 100vw, 60vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2a1d1b]/20 to-transparent"></div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        .font-cormorant { font-family: var(--font-playfair), serif; }
        .font-dm-serif { font-family: var(--font-playfair), serif; }
        .font-inter { font-family: var(--font-playfair), serif; }

        @media (max-width: 768px) {
          .mv-story-section { height: auto !important; }
          .mv-story-wrapper { position: relative !important; height: auto !important; padding-top: 4rem; padding-bottom: 4rem; }
          .mv-story-grid { grid-template-columns: 1fr !important; height: auto !important; }
          .mv-story-content-block { position: relative !important; opacity: 1 !important; transform: none !important; margin-bottom: 4rem; }
          .mv-story-panel { position: relative !important; height: 50vh !important; opacity: 1 !important; transform: none !important; margin-bottom: 2rem; }
          .mv-story-right { height: auto !important; order: -1; }
        }
      `}</style>
    </section>
  );
}
