"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const text = "CAPTURING TIMELESS MOMENTS ✨ ";

export default function HorizontalTextScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current || !textContainerRef.current) return;

    const chars = textContainerRef.current.querySelectorAll(".char");

    const ctx = gsap.context(() => {
      // 1. Create the horizontal scroll tween
      const scrollTween = gsap.to(textContainerRef.current, {
        x: () => -(textContainerRef.current!.scrollWidth - window.innerWidth + 100),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: "+=3000", // Adjusted for shorter text
        },
      });

      // 2. Animate each character with a structured, cinematic reveal
      chars.forEach((char) => {
        gsap.from(char, {
          y: 100,
          rotateX: -90,
          scale: 0.8,
          opacity: 0,
          filter: "blur(20px)",
          ease: "power3.out",
          scrollTrigger: {
            trigger: char,
            containerAnimation: scrollTween,
            start: "left 100%", 
            end: "left 60%",   
            scrub: true,
          },
        });
      });

      // 3. Perfect Lens Animation - Rotating and scaling based on scroll
      const rings = sectionRef.current?.querySelectorAll(".lens-ring");
      if (rings) {
        gsap.to(rings, {
          rotate: (i) => (i + 1) * 30,
          scale: (i) => 1 + (i * 0.05),
          opacity: (i) => 0.1 + (i * 0.05),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=3000",
            scrub: 1,
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-transparent text-[#f6f6f6] overflow-hidden flex items-center z-20"
    >
      {/* Text Container */}
      <div ref={textContainerRef} className="flex whitespace-nowrap px-[50vw] relative z-10" style={{ perspective: "1000px" }}>
        {Array.from(text).map((char, i) => (
          <h2
            key={i}
            className="char inline-block text-[10vw] md:text-[12vw] font-serif uppercase tracking-tight leading-none drop-shadow-2xl"
            style={{ minWidth: char === " " ? "3vw" : "auto", textShadow: "0 20px 40px rgba(0,0,0,0.5)", transformOrigin: "bottom" }}
          >
            {char}
          </h2>
        ))}
      </div>
    </section>
  );
}
