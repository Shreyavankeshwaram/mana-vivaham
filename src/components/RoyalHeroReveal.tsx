"use client";

import React, { useRef, useEffect } from "react";
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
          end: () => window.innerWidth < 768 ? "+=110%" : "+=200%",
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });

      // 1. Fade in the background/content (Optional here, we start them visible but dark)
      tl.fromTo(
        [bgRef.current, contentRef.current],
        { autoAlpha: 0.8 },
        { autoAlpha: 1, duration: 0.2 }
      );

      const isMobile = window.innerWidth < 768;
      // Keep title centered while scaling to avoid side drift on mobile/desktop.
      const scaleAmt = isMobile ? 28 : 160;

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
  }, []);

  return (
    <div ref={wrapperRef} className={`w-full relative overflow-x-hidden ${bodoniModa.variable}`}>
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
                dominantBaseline="middle"
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
          style={{ clipPath: "url(#royal-text-clip)" }}
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

            {/* Pre-rendered safe CSS particles (No Math.random() to prevent React Hydration errors!) */}
            <div className="absolute inset-0 pointer-events-none z-20">
              <div className="mv-particle mv-p1" />
              <div className="mv-particle mv-p2" />
              <div className="mv-particle mv-p3" />
              <div className="mv-particle mv-p4" />
              <div className="mv-particle mv-p5" />
            </div>
          </div>
        </div>

        {/* Foreground Subtitle: Outside the mask, fades gracefully */}
        <div
          ref={contentRef}
          className="relative z-30 flex flex-col items-center drop-shadow-md pointer-events-none mt-[35vw] md:mt-[12vw]"
        >
          <div className="flex items-center gap-4">
            <div className="w-8 h-[1px] bg-[#B68A4C]" />
            <p className="font-sans text-[10px] md:text-xs tracking-[0.4em] text-[#B68A4C] uppercase font-bold text-center">
              {subtitle}
            </p>
            <div className="w-8 h-[1px] bg-[#B68A4C]" />
          </div>
        </div>

        {/* Safe vanilla CSS for the particles */}
        <style dangerouslySetInnerHTML={{
          __html: `
          .font-cormorant { font-family: var(--font-playfair), serif; }
          .mv-particle {
            position: absolute;
            width: 12px; height: 12px;
            border-radius: 50% 0 50% 50%;
            background-color: #B68A4C;
            opacity: 0;
          }
          .mv-p1 { left: 20%; top: 80%; animation: float 15s ease-in-out infinite -2s; filter: blur(1px); }
          .mv-p2 { left: 60%; top: 70%; animation: float 18s ease-in-out infinite -5s; background-color: #7B2331; }
          .mv-p3 { left: 40%; top: 90%; animation: float 20s ease-in-out infinite -1s; filter: blur(2px); }
          .mv-p4 { left: 80%; top: 85%; animation: float 16s ease-in-out infinite -7s; }
          .mv-p5 { left: 10%; top: 60%; animation: float 19s ease-in-out infinite -4s; background-color: #7B2331; filter: blur(1.5px); }

          @keyframes float {
            0% { transform: translateY(10vh) rotate(0deg) scale(0.8); opacity: 0; }
            20% { opacity: 0.6; }
            80% { opacity: 0.6; }
            100% { transform: translateY(-30vh) rotate(360deg) scale(1.2); opacity: 0; }
          }
        `}} />
      </section>
    </div>
  );
}
