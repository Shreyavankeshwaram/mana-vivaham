"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const text = "CINEMATIC STORYTELLING";

export default function AdvancedHorizontalScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current || !triggerRef.current || !textRef.current) return;

    const chars = textRef.current.querySelectorAll(".char");

    const ctx = gsap.context(() => {
      // 1. The Main Horizontal Scroll Tween
      const scrollTween = gsap.to(textRef.current, {
        xPercent: -100,
        x: "100vw", // Start from right
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          start: "top top",
          end: "+=5000",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // 2. Character Animations tied to the scrollTween via containerAnimation
      // This makes each character animate AS they pass through the viewport during the horizontal scroll
      chars.forEach((char) => {
        gsap.fromTo(
          char,
          {
            y: () => (Math.random() - 0.5) * 400,
            rotate: () => (Math.random() - 0.5) * 120,
            opacity: 0,
            scale: 0.5,
            filter: "blur(20px)",
          },
          {
            x: (i) => (i % 2 === 0 ? -50 : 50),
            y: 0,
            rotate: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            ease: "power2.out",
            scrollTrigger: {
              trigger: char,
              containerAnimation: scrollTween,
              start: "left 90%",
              end: "left 10%",
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full overflow-hidden bg-lumus-beige z-20"
    >
      <div ref={triggerRef} className="h-screen flex items-center overflow-hidden">
        <div 
          ref={textRef} 
          className="flex whitespace-nowrap px-[20vw]"
        >
          {text.split("").map((char, i) => (
            <span 
              key={i} 
              className={`char inline-block text-[25vw] md:text-[35vw] font-serif leading-none tracking-tighter 
                ${i % 3 === 0 ? "font-black italic" : "font-light"} 
                ${i % 5 === 0 ? "text-transparent stroke-text" : "text-[#8B1E2D]"}`}
              style={{ 
                display: char === " " ? "inline-block" : "inline-block", 
                minWidth: char === " " ? "0.3em" : "auto",
                WebkitTextStroke: i % 5 === 0 ? "2px #8B1E2D" : "none"
              }}
            >
              {char}
            </span>
          ))}
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-white rounded-full blur-[180px] animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Grain & Noise Overlay */}
      <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </section>
  );
}
