"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { Bodoni_Moda } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Eye, Sparkles, RotateCcw, Compass } from "lucide-react";
import { urlForImage } from "@/sanity/lib/image";

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
});



export default function SelectedWorks({
  works = [],
  title,
  description
}: {
  works?: any[];
  title?: string;
  description?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLButtonElement>(null);

  // State for premium monochrome B&W filter toggle
  const [isMonochrome, setIsMonochrome] = useState(false);
  const [orbHovered, setOrbHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Set mounted state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const fallbackWorks = [
    {
      title: "INTERVALS",
      location: "NEW YORK",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "ELEGANCE",
      location: "MUMBAI",
      image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "RITUALS",
      location: "JAIPUR",
      image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop",
    }
  ];

  // Display elements
  // Use CMS works if available, otherwise use fallback. If CMS has works but less than fallback, just use CMS works.
  // The layout doesn't strictly break on length, but if there are 0 works, we show fallback.
  const displayWorks = works?.length > 0 ? works.map((work, idx) => ({
    title: work.title || fallbackWorks[idx % fallbackWorks.length].title,
    location: work.location || fallbackWorks[idx % fallbackWorks.length].location,
    image: work.image || fallbackWorks[idx % fallbackWorks.length].image,
  })) : fallbackWorks;

  const displayTitle = title || "Selected Works";
  const titleParts = displayTitle.split(" ");
  const firstWord = titleParts[0];
  const restOfTitle = titleParts.slice(1).join(" ");
  const displayDescription = description || "We believe weddings are more than moments—they are stories, emotions, and memories that deserve to be preserved with timeless beauty and cinematic elegance.";

  // Trigger brief floating text alert for monochrome changes
  const triggerNotification = (text: string) => {
    setNotification(text);
    setTimeout(() => {
      setNotification((prev) => (prev === text ? null : prev));
    }, 2000);
  };

  // Handle Monochrome B&W toggle
  const toggleMonochrome = () => {
    setIsMonochrome(prev => {
      const next = !prev;
      triggerNotification(next ? "OBSIDIAN DEEP NOIR" : "VIBRANT FINE-ART CHROME");
      return next;
    });
  };

  // Magnetic 3D tilt movement on image card hover
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    const dx = (x - cx) / cx;
    const dy = (y - cy) / cy;

    // Rotate tilt-container in 3D perspective
    const tiltContainer = card.querySelector(".tilt-container");
    if (tiltContainer) {
      gsap.to(tiltContainer, {
        rotateX: -dy * 6,
        rotateY: dx * 6,
        duration: 0.4,
        ease: "power2.out"
      });
    }

    // Move floating VIEW custom cursor inside the card boundaries
    const cursor = card.querySelector(".card-cursor");
    if (cursor) {
      gsap.to(cursor, {
        x: x - 48,
        y: y - 48,
        scale: 1,
        opacity: 1,
        duration: 0.1,
        ease: "power2.out"
      });
    }

    // Elegant gold foil light reflection sweep following cursor
    const reflection = card.querySelector(".shimmer-reflection");
    if (reflection) {
      const reflectX = (x / rect.width) * 100;
      const reflectY = (y / rect.height) * 100;
      gsap.to(reflection, {
        background: `radial-gradient(circle at ${reflectX}% ${reflectY}%, rgba(197, 168, 128, 0.12) 0%, transparent 60%)`,
        duration: 0.3
      });
    }
  }, []);

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;

    // Scale up image slightly
    const img = card.querySelector(".parallax-img");
    if (img) {
      gsap.to(img, { scale: 1.18, duration: 0.8, ease: "power3.out" });
    }

    // Frosted glass frame border glow & gold bezel outline
    const tiltContainer = card.querySelector(".tilt-container");
    if (tiltContainer) {
      gsap.to(tiltContainer, {
        borderColor: "rgba(197, 168, 128, 0.35)",
        boxShadow: "0 40px 80px -20px rgba(0, 0, 0, 0.95), inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 0 15px rgba(197, 168, 128, 0.08)",
        duration: 0.6,
        ease: "power2.out"
      });
    }
  }, []);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;

    // Reset card rotations & glass border styles
    const tiltContainer = card.querySelector(".tilt-container");
    if (tiltContainer) {
      gsap.to(tiltContainer, {
        rotateX: 0,
        rotateY: 0,
        borderColor: "rgba(255, 255, 255, 0.07)",
        boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
        duration: 0.8,
        ease: "elastic.out(1, 0.6)"
      });
    }

    // Reset image scale
    const img = card.querySelector(".parallax-img");
    if (img) {
      gsap.to(img, { scale: 1.1, duration: 0.8, ease: "power3.out" });
    }

    // Fade out cursor follower
    const cursor = card.querySelector(".card-cursor");
    if (cursor) {
      gsap.to(cursor, {
        scale: 0.4,
        opacity: 0,
        duration: 0.4,
        ease: "power3.out"
      });
    }

    // Fade out light reflection
    const reflection = card.querySelector(".shimmer-reflection");
    if (reflection) {
      gsap.to(reflection, {
        background: "transparent",
        duration: 0.5
      });
    }
  }, []);

  // GSAP Animations setup
  useEffect(() => {
    if (!isMounted) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Reveal headers
      gsap.fromTo(
        ".reveal-header-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".reveal-header-trigger",
            start: "top 85%",
            once: true,
          }
        }
      );

      // 2. Parallax and shutter reveals on card grid
      const cards = gsap.utils.toArray(".premium-card-wrapper") as HTMLElement[];
      cards.forEach((card) => {
        const imageContainer = card.querySelector(".card-image-container");
        const parallaxImg = card.querySelector(".parallax-img");
        const textElements = card.querySelectorAll(".reveal-text-item");

        if (imageContainer && parallaxImg) {
          // Shutter reveal: upward clip path reveal on scroll
          gsap.fromTo(
            imageContainer,
            { clipPath: "inset(100% 0% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.6,
              ease: "power4.out",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                once: true,
              }
            }
          );

          // Parallax shift inside container
          gsap.fromTo(
            parallaxImg,
            { yPercent: -10 },
            {
              yPercent: 10,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: true
              }
            }
          );
        }

        // Split rising metadata reveals
        if (textElements.length > 0) {
          gsap.fromTo(
            textElements,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.2,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 82%",
                once: true,
              }
            }
          );
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, [isMounted]);

  return (
    <section
      ref={containerRef}
      className={`mv-selected-works relative w-full bg-[#080809] pt-28 pb-20 md:pt-36 md:pb-28 px-6 md:px-14 overflow-hidden ${bodoniModa.variable}`}
      style={{ fontFamily: "var(--font-playfair), serif" }}
    >
      {/* Ambient luxurious glowing radial backlights — native gradient, zero GPU cost */}
      <div 
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(197,168,128,0.025) 0%, transparent 70%)" }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(139,30,45,0.015) 0%, transparent 70%)" }}
      />

      {/* Subtle luxury digital noise overlay for physical texture */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: "url('/noise.svg')",
          backgroundSize: "200px 200px"
        }}
      />

      {/* Modern thin architectural sketch gridlines */}
      <div className="absolute inset-y-0 left-0 right-0 z-0 pointer-events-none flex justify-between px-6 md:px-14">
        <div className="w-px h-full bg-white/[0.02]" />
        <div className="w-px h-full bg-white/[0.02] hidden md:block" />
        <div className="w-px h-full bg-white/[0.02] hidden md:block" />
        <div className="w-px h-full bg-white/[0.02]" />
      </div>

      {/* Floating glassmorphic notification banner */}
      {notification && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-[#121214]/80 backdrop-blur-xl border border-white/10 text-white font-mono text-[9px] tracking-[0.4em] uppercase px-6 py-3 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.8)] animate-fade-in-up">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A880] animate-pulse" />
          <span>{notification}</span>
        </div>
      )}

      <div className="max-w-[1700px] mx-auto relative z-10">

        {/* 🏛 Header Section */}
        <div className="reveal-header-trigger flex flex-col md:flex-row justify-between items-end mb-24 md:mb-32 gap-10 border-b border-white/[0.06] pb-16 relative">

          {/* Top Left Title */}
          <div className="flex flex-col gap-5">
            <h2 className="reveal-header-item text-6xl md:text-9xl font-light tracking-tighter text-[#8B1E2D] leading-none font-serif select-none">
              {firstWord} {restOfTitle && <span className="text-[#C5A880] italic font-extralight ml-3">{restOfTitle}</span>}
            </h2>
          </div>

          {/* Top Right Orb Widget and Narrative Description */}
          <div className="flex flex-col items-start md:items-end gap-8 max-w-lg">

            {/* The Royal Interactive Focus Orb */}
            <div className="reveal-header-item flex items-center gap-4 group">
              <div className="flex flex-col items-start md:items-end font-mono">
                <span className="text-[8px] tracking-[0.4em] text-white/30 uppercase font-bold">EXHIBIT STYLE</span>
                <span className="text-[9px] tracking-[0.25em] text-[#C5A880] uppercase font-bold mt-0.5">
                  {isMonochrome ? "OBSIDIAN DEEP" : "CHROMATIC HIGH"}
                </span>
              </div>

              <button
                ref={orbRef}
                onClick={toggleMonochrome}
                onMouseEnter={() => setOrbHovered(true)}
                onMouseLeave={() => setOrbHovered(false)}
                className="relative w-14 h-14 rounded-full border border-white/10 bg-[#121214] shadow-[0_8px_30px_rgba(0,0,0,0.6)] flex items-center justify-center cursor-pointer transition-all duration-500 overflow-hidden active:scale-95"
              >
                {/* Rotating Lens Focus Ring */}
                <div
                  className={`absolute inset-1 rounded-full border border-dashed border-[#C5A880]/60 transition-transform duration-[4s] ease-linear`}
                  style={{
                    transform: orbHovered ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)"
                  }}
                />

                {/* Central Focus Aperture Core */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${isMonochrome ? "bg-white text-black" : "bg-[#C5A880] text-black"}`}>
                  {isMonochrome ? (
                    <RotateCcw className="w-3.5 h-3.5" />
                  ) : (
                    <Compass className="w-3.5 h-3.5 fill-current" />
                  )}
                </div>
              </button>
            </div>

            {/* Description Text block */}
            <div className="reveal-header-item md:text-right relative">
              <p className="text-[12px] md:text-[14px] leading-relaxed text-white font-serif max-w-md">
                {displayDescription}
              </p>
              {/* Gold flourish dot */}
              <div className="absolute -left-4 md:-right-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#C5A880] rounded-full opacity-40" />
            </div>
          </div>
        </div>

        {/* 🖼 Staggered Asymmetric Exhibition Grid of STRICTLY Vertical Rectangles */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-y-24 md:gap-x-20 md:gap-y-40">
          {displayWorks.map((work, index) => {

            const imgSrc = work.image?.asset ? urlForImage(work.image)?.url() : work.image;

            // Asymmetric layout structure - strictly vertical rectangles:
            const isEven = index % 2 === 0;
            const cardAspect = "aspect-[3/4]";

            // Apply staggered translation offsets to alternating columns on desktop
            const staggeredClass = !isEven
              ? "md:translate-y-32 md:mt-16"
              : "md:-translate-y-4";

            return (
              <div
                key={index}
                className={`premium-card-wrapper flex flex-col gap-10 group cursor-pointer ${staggeredClass}`}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {/* 3D Perspective Card Tilt Wrap (Ultra-premium Glassmorphic container wrapper) */}
                <div
                  className="tilt-container relative w-full rounded-[4px] p-3 md:p-3.5 bg-white/[0.015] border border-white/7 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] transition-colors duration-500"
                  style={{
                    transformStyle: "preserve-3d",
                    perspective: "1200px"
                  }}
                >

                  {/* Outer Image Window Container (Animated with upward clip-path reveal) */}
                  <div className={`card-image-container relative ${cardAspect} w-full overflow-hidden bg-black/40 border border-white/5 rounded-[2px]`}>

                    {/* Parallax Image Element */}
                    <div className="absolute inset-0 w-full h-full scale-[1.1] parallax-img-container">
                      {imgSrc ? (
                        <Image
                          src={imgSrc}
                          alt={work.title || "Selected Work"}
                          fill
                          className={`parallax-img object-cover transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]`}
                          style={{
                            filter: isMonochrome
                              ? "grayscale(100%) contrast(1.22) brightness(0.85) sepia(0.02)"
                              : "grayscale(0%) contrast(1) brightness(1)",
                          }}
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority={index < 2}
                        />
                      ) : (
                        <div className="w-full h-full bg-white/5" />
                      )}
                    </div>

                    {/* Immersive Shimmer overlay sweep on card hover */}
                    <div className="shimmer-reflection absolute inset-0 z-10 pointer-events-none transition-all duration-300" />

                    {/* Luxury dark vignette radial overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/45 opacity-60 z-10 pointer-events-none" />

                    {/* 📸 Camera Viewfinder Corner Brackets (Super Cool Snap & Focus Micro-interaction) */}
                    <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/10 rounded-tl-[3px] transition-all duration-500 group-hover:border-[#C5A880] group-hover:top-6 group-hover:left-6 group-hover:scale-90 z-20 pointer-events-none" />
                    <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white/10 rounded-tr-[3px] transition-all duration-500 group-hover:border-[#C5A880] group-hover:top-6 group-hover:right-6 group-hover:scale-90 z-20 pointer-events-none" />
                    <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white/10 rounded-bl-[3px] transition-all duration-500 group-hover:border-[#C5A880] group-hover:bottom-6 group-hover:left-6 group-hover:scale-90 z-20 pointer-events-none" />
                    <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/10 rounded-br-[3px] transition-all duration-500 group-hover:border-[#C5A880] group-hover:bottom-6 group-hover:right-6 group-hover:scale-90 z-20 pointer-events-none" />

                    {/* 3D Glassmorphic Floating Follower Cursor Inside Card Boundaries */}
                    <div
                      className="card-cursor absolute w-24 h-24 rounded-full border border-white/20 bg-white/5 flex flex-col items-center justify-center opacity-0 scale-50 z-30 pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-2xl select-none"
                      style={{ transform: "translate3d(0, 0, 50px)" }}
                    >
                      <Eye className="w-4 h-4 text-white" />
                      <span className="text-[8px] tracking-[0.35em] text-white uppercase font-bold font-mono mt-1">EXPLORE</span>
                    </div>
                  </div>
                </div>

                {/* 📝 Exhibition Metadata Card Footer (Animated upward rising on scroll) */}
                <div className="flex flex-col gap-3 border-b border-white/[0.06] pb-6 relative select-none">

                  {/* Line 1: Clean Minimalist Title */}
                  <div className="flex justify-between items-baseline gap-4 overflow-hidden">

                    {/* Work Title */}
                    <div className="reveal-text-item">
                      <h3 className="text-3xl md:text-4xl font-normal text-white font-serif tracking-tight leading-none group-hover:text-[#C5A880] transition-colors duration-500">
                        {work.title}
                      </h3>
                    </div>
                  </div>

                  {/* High-end Gold Flourish Slide line indicator below metadata */}
                  <div
                    className="absolute bottom-0 left-0 h-0.5 bg-[#C5A880] transition-all duration-700 ease-out origin-left scale-x-0 group-hover:scale-x-100"
                    style={{ width: "80px" }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Global CSS adjustments */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate(-50%, 15px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </section>
  );
}
