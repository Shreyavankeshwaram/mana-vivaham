"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { Bodoni_Moda } from "next/font/google";
import { urlForImage } from "@/sanity/lib/image";

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
});

export default function RoyalHeroReveal({ data }: { data?: any }) {
  const title = data?.title || "MANA VIVAHAM";
  const subtitle = data?.subtitle || "A Royal Cinematic Narrative";
  const imgSrc = data?.backgroundImage?.asset
    ? urlForImage(data.backgroundImage)?.url()
    : data?.image?.asset
      ? urlForImage(data.image)?.url()
      : "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1974&auto=format&fit=crop";

  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const textMaskRef = useRef<SVGTextElement>(null);
  const dummyRef = useRef<SVGRectElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const fullImageRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Prevent address bar hiding on mobile from instantly breaking the animation coordinates!
    ScrollTrigger.config({ ignoreMobileResize: true });

    if (!wrapperRef.current || !sectionRef.current || !textMaskRef.current || !fullImageRef.current || !dummyRef.current) return;

    // Use gsap.context to ensure complete cleanup on hot-reloads
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current, // Trigger on the outer wrapper
          pin: sectionRef.current,     // Explicitly pin the inner section (bulletproof pattern)
          start: "top top",
          end: () => window.innerWidth < 768 ? "+=140%" : "+=200%",
          scrub: true,
          invalidateOnRefresh: true,
        }
      });

      // 1. Fade in the background/content (Optional here, we start them visible but dark)
      tl.fromTo(
        [bgRef.current, contentRef.current],
        { autoAlpha: 0.8 },
        { autoAlpha: 1, duration: 0.2 }
      );

      const scaleAmt = isMobile ? 80 : 200; // Significantly reduced for mobile stability

      // 2. The massive scale zoom!
      tl.fromTo(
        textMaskRef.current,
        {
          scaleX: 1,
          scaleY: 1,
          x: 0,
          transformOrigin: "50% 50%"
        },
        {
          scaleX: scaleAmt,
          scaleY: scaleAmt,
          x: 0,
          transformOrigin: "50% 50%",
          ease: "power2.in", // Accelerates massively at the end
          duration: 1
        },
        0 // Start at timeline start
      );

      // 3. FORCE WEBKIT REPAINT HACK!
      // Animating an SVG attribute (not CSS) forces Chrome/Safari to redraw the clipPath on every frame.
      tl.fromTo(dummyRef.current, { attr: { width: 0 } }, { attr: { width: 10 }, duration: 1 }, 0);

      // 4. The Ultimate Compositor Trick!
      // Fades in the identical background image overlapping the final zoom.
      // This seamlessly eliminates all black mask edges and perfectly opens the picture!
      tl.fromTo(
        fullImageRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.4, ease: "power2.inOut" },
        0.6 // Starts slightly earlier to cross-fade beautifully
      );

      // Buffer at the end just like the codepen: .to({}, { duration: 0.25 })
      tl.to({}, { duration: 0.25 });

    }, wrapperRef); // Scope strictly to the wrapper

    return () => ctx.revert();
  }, [mounted, isMobile]);

  if (!mounted) return null;

  return (
    <div ref={wrapperRef} className={`w-full relative ${bodoniModa.variable}`}>
      {/* 
        Bulletproof GSAP Pinning: The outer wrapper holds the trigger, 
        and this inner section gets pinned. This prevents SelectedWorks from being affected!
      */}
      <section
        ref={sectionRef}
        className="w-full h-screen min-h-[100svh] flex items-center justify-center relative overflow-hidden z-20 bg-[#F5EBDD]"
      >
        {/* DUPLICATE FULL SCREEN IMAGE */}
        {/* This is hidden behind the mask and fades in at the end to guarantee a 100% picture reveal! */}
        <div ref={fullImageRef} className="absolute inset-0 w-full h-full z-0 invisible">
          <Image
            src={imgSrc}
            alt="Royal Indian Cinematic Wedding Full"
            fill
            className="object-cover opacity-90"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#2A1D1B]/30 via-transparent to-[#2A1D1B]/80 pointer-events-none" />
          <div className="absolute inset-0 bg-[#B68A4C]/10 mix-blend-color-burn pointer-events-none" />
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full pointer-events-none z-10" id="clipContainer">
          <defs>
            <clipPath id="royal-text-clip">
              {/* Using native SVG text as the perfect mask */}
              <text
                ref={textMaskRef}
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="central"
                className="font-cormorant font-bold whitespace-nowrap text-[16vw] md:text-[11vw]"
                style={{ letterSpacing: "0.02em" }}
              >
                {title}
              </text>
              {/* Invisible off-screen element to force Webkit to constantly repaint the mask */}
              <rect ref={dummyRef} x="-100" y="-100" width="0" height="1" />
            </clipPath>
          </defs>
        </svg>

        {/* 
          This container perfectly mirrors <div class="hero-container"> 
          The clip-path is applied here. Everything inside is only visible through the text!
        */}
        <div
          className="w-full h-screen absolute inset-0 flex items-center justify-center bg-[#1A1110] z-20 overflow-hidden"
          style={{ clipPath: isMobile ? "none" : "url(#royal-text-clip)" }}
        >
          {/* Equivalent to hero-bg-svg: The actual cinematic imagery */}
          <div ref={bgRef} className="absolute inset-0 w-full h-full">
            <Image
              src={imgSrc}
              alt="Royal Indian Cinematic Wedding"
              fill
              className="object-cover opacity-90"
              sizes="100vw"
              priority
            />
            {/* Dark luxury gradients */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#2A1D1B]/50 via-transparent to-[#2A1D1B]/90 pointer-events-none" />
            <div className="absolute inset-0 bg-[#B68A4C]/10 mix-blend-color-burn pointer-events-none" />


          </div>
        </div>

        {/* Foreground Title & Subtitle: Outside the mask, fades gracefully */}
        <div
          ref={contentRef}
          className="relative z-30 flex flex-col items-center drop-shadow-md pointer-events-none mt-[20vw] md:mt-[12vw]"
        >
          {/* Mobile-only visible title since SVG mask is disabled for stability */}
          {isMobile && (
            <h1 className="font-cormorant font-bold text-white text-[16vw] uppercase mb-4 tracking-wider leading-none text-center">
              {title}
            </h1>
          )}
          <div className="flex items-center gap-4">
            <div className="w-8 h-[1px] bg-[#B68A4C]" />
            <p className="font-sans text-[10px] md:text-xs tracking-[0.4em] text-[#B68A4C] uppercase font-bold text-center">
              {subtitle}
            </p>
            <div className="w-8 h-[1px] bg-[#B68A4C]" />
          </div>
        </div>

        {/* Font definitions */}
        <style dangerouslySetInnerHTML={{
          __html: `
          .font-cormorant { font-family: var(--font-playfair), serif; }
        `}} />
      </section>
    </div>
  );
}
