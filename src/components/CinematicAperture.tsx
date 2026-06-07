"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { urlForImage } from "@/sanity/lib/image";

export default function CinematicAperture({ data }: { data?: any }) {
  const centerImage = data?.centerImage?.asset
    ? urlForImage(data.centerImage)?.url()
    : "https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?q=80&w=1974&auto=format&fit=crop";
  const caption = data?.caption || 'Where Hearts Become Heirlooms';
  const headingLine1 = data?.headingLine1 || 'A';
  const headingLine2 = data?.headingLine2 || 'Cinematic';
  const headingLine3 = data?.headingLine3 || 'Love Legacy';
  const description = data?.description || 'From the sacred knot to the quiet in-between glances, Mana Vivaham crafts your wedding into a timeless visual legacy filled with emotion, elegance, and soul.';

  const sectionTag = data?.sectionTag || 'THE APERTURE SEQUENCE // VOL_02';
  const apertureSpec = data?.aperture || 'APR_F1.2';
  const shutterSpec = data?.shutter || 'SHUTTER_1/160';
  const cameraSpec = data?.camera || 'LEICA_M11';

  const fullscreenLocation = data?.fullscreenLocation || 'VIJAYA MAHAL • THE ROYAL CHAMBERS';
  const fullscreenDescription = data?.fullscreenDescription || 'Capturing the Ethereal aura of royal Indian devotion. Every frame meticulously recorded in 35mm format.';
  const fullscreenIso = data?.fullscreenIso || 'ISO 100';
  const fullscreenFilm = data?.fullscreenFilm || 'KODAK PORTRA 400';
  const fullscreenShutter = data?.fullscreenShutter || 'SHUTTER AUTOMATIC';

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    let ctx: gsap.Context;

    const initAnimation = () => {
      if (ctx) ctx.revert();

      const container = containerRef.current;
      const scrollWrapper = scrollWrapperRef.current;
      const marker = markerRef.current;
      const image = imageRef.current;
      const textCol = textColRef.current;
      const overlay = overlayRef.current;

      if (!container || !scrollWrapper || !marker || !image || !textCol || !overlay) return;

      // 1. Reset standard styles to ensure correct bounding box measurements
      gsap.set(image, { clearProps: "all" });
      gsap.set(textCol, { clearProps: "all" });
      gsap.set(overlay, { clearProps: "all" });

      // 2. Measure bounding boxes
      const containerRect = container.getBoundingClientRect();
      const markerRect = marker.getBoundingClientRect();

      // Safety check: if layout is not settled yet, retry shortly
      if (markerRect.width === 0 || markerRect.height === 0) {
        setTimeout(initAnimation, 50);
        return;
      }

      const fitWidth = markerRect.width;
      const fitHeight = markerRect.height;
      const fitX = markerRect.left - containerRect.left;
      const fitY = markerRect.top - containerRect.top;

      // 3. Set the initial fitted position using captured properties
      gsap.set(image, {
        x: fitX,
        y: fitY,
        width: fitWidth,
        height: fitHeight,
        borderRadius: "24px",
        opacity: 1, // Reveal once fitted
      });

      // 4. Initialize GSAP context for ScrollTrigger timeline scrub
      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: scrollWrapper,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // Smoothly interpolate from fitted initial state to fullscreen natural state
        tl.to(image, {
          x: 0,
          y: 0,
          width: "100%",
          height: "100%",
          borderRadius: "0px",
          ease: "none",
          duration: 1,
        }, 0)
          // Fade out initial narrative column
          .to(textCol, {
            opacity: 0,
            x: -50,
            filter: "blur(6px)",
            ease: "none",
            duration: 0.5,
          }, 0)
          // Fade in the fullscreen overlay once expanded
          .to(overlay, {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            duration: 0.5,
          }, 0.5);

      }, container);
    };

    // Ensure DOM hydration and styles are computed before measuring
    const timer = setTimeout(initAnimation, 120);

    window.addEventListener("resize", initAnimation);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
      window.removeEventListener("resize", initAnimation);
    };
  }, []);

  return (
    <div ref={scrollWrapperRef} className="relative w-full h-[210vh] md:h-[250vh]">
      <div
        ref={containerRef}
        className="ca-pinned-container"
        id="ca-aperture-reveal"
        style={{ position: "sticky", top: 0 }}
      >
        {/* Decorative overlays */}
        <div className="ca-vignette" />
        <div className="ca-film-grain" />

        {/* Decorative ambient lighting glows */}
        <div className="absolute top-10 left-1/4 hidden md:block w-[400px] h-[400px] bg-[#E7DFC8]/15 rounded-full blur-[100px] pointer-events-none opacity-30" />
        <div className="absolute bottom-10 right-1/4 hidden md:block w-[500px] h-[500px] bg-[#8B1E2D]/5 rounded-full blur-[120px] pointer-events-none opacity-25" />

        <div className="ca-grid">

          {/* LEFT SIDE: Narrative Editorial Typography */}
          <div ref={textColRef} className="ca-text-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-[1px] bg-[#8B1E2D]/40" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-[#8B1E2D] font-bold">
                {sectionTag}
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#8B1E2D] leading-[1.05] tracking-tight mb-8 font-light italic">
              {headingLine1} <br /> {headingLine2} <br /> {headingLine3}
            </h2>

            <p className="text-zinc-600 text-sm md:text-base lg:text-lg leading-relaxed font-light font-sans max-w-md">
              {description}
            </p>

            <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-8 md:mt-12 font-mono text-[8px] md:text-[9px] text-zinc-400 tracking-widest uppercase">
              <span>[ {apertureSpec} ]</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B1E2D]/30" />
              <span>[ {shutterSpec} ]</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B1E2D]/30" />
              <span>[ {cameraSpec} ]</span>
            </div>
          </div>

          {/* RIGHT SIDE: The Relative marker that the image starts fitted to */}
          <div className="ca-image-col">
            <div ref={markerRef} className="ca-inline-frame" />
          </div>

        </div>

        {/* ── THE SINGLE ANIMATED IMAGE WRAPPER ── */}
        {/* Positioned absolute relative to containerRef; fitted to markerRef using Flip.fit() on load */}
        <div ref={imageRef} className="ca-animated-image group">
          <Image
            src={centerImage}
            alt="Vintage Miniature Bride Portrait"
            fill
            className="object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-105"
            sizes="100vw"
            priority
          />
          {/* Shutter shadows / film grade vignettes inside image */}
          <div className="ca-image-overlay-bg" />

          {/* Viewfinder element lines inside image */}
          <div className="absolute inset-8 border border-white/5 pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity duration-700 z-10">
            <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-white/60" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-white/60" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-white/60" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-white/60" />
          </div>
        </div>

        {/* FULLSCREEN OVERLAY CONTENT (Fades in when image goes fullscreen) */}
        <div ref={overlayRef} className="ca-fullscreen-overlay px-6 text-center opacity-0 translate-y-8 pointer-events-none">

          {/* Subtle gold viewfinder focus center */}
          <div className="mb-8 relative flex items-center justify-center">
            <div className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-[#E7DFC8] animate-ping" />
            </div>
            <div className="absolute w-8 h-[1px] bg-white/40" />
            <div className="absolute h-8 w-[1px] bg-white/40" />
          </div>

          <span className="text-[10px] md:text-xs font-mono tracking-[0.5em] text-[#E7DFC8] uppercase mb-4 block">
            {fullscreenLocation}
          </span>

          <h3 className="text-4xl md:text-7xl font-serif font-light text-white italic tracking-tighter max-w-4xl leading-tight">
            "{caption}"
          </h3>

          <p className="max-w-md mx-auto text-zinc-300 text-xs md:text-sm mt-6 font-light tracking-wide leading-relaxed">
            {fullscreenDescription}
          </p>

          <div className="absolute bottom-7 md:bottom-12 inset-x-0 flex flex-wrap justify-center gap-x-5 gap-y-2 md:gap-12 px-5 font-mono text-[8px] md:text-[10px] text-white/50 tracking-[0.16em] md:tracking-[0.2em] uppercase">
            <span>{fullscreenIso}</span>
            <span>{fullscreenFilm}</span>
            <span>{fullscreenShutter}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
