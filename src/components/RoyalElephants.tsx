"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function RoyalElephants() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftElephantRef = useRef<HTMLDivElement>(null);
  const rightElephantRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const leftEl = leftElephantRef.current;
    const rightEl = rightElephantRef.current;
    if (!leftEl || !rightEl) return;

    // 1. Initial State (Fade in from slight drift)
    gsap.set(leftEl, { opacity: 0, x: -60, y: 30 });
    gsap.set(rightEl, { opacity: 0, x: 60, y: 30 });

    // 2. Slow Luxurious Fade Reveal on Load
    gsap.to(leftEl, {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 2.5,
      ease: "power3.out",
      delay: 0.5,
    });

    gsap.to(rightEl, {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 2.5,
      ease: "power3.out",
      delay: 0.7,
    });

    // 3. Gentle Breathing/Floating Motion (Looping Yoyo)
    gsap.to(leftEl, {
      y: "-=18px",
      rotationZ: 1.5,
      duration: 5.5,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    });

    gsap.to(rightEl, {
      y: "-=15px",
      rotationZ: -1.5,
      duration: 6.2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
      delay: 0.5, // Offset to make them breathe asynchronously
    });

    // 4. Subtle Parallax on Scroll (Linking to global viewport scroll)
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5, // Smooth lag
      },
    });

    scrollTl.to(leftEl, {
      y: "-=80px",
      ease: "none",
    }, 0);

    scrollTl.to(rightEl, {
      y: "-=80px",
      ease: "none",
    }, 0);

    return () => {
      // Clean up ScrollTriggers
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === document.body) {
          t.kill();
        }
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="royal-elephant-wrapper fixed inset-0 w-full h-full pointer-events-none z-[15] overflow-hidden select-none"
    >
      {/* Left Royal Elephant (Facing Right / Inwards) */}
      <div
        ref={leftElephantRef}
        className="royal-elephant-left fixed bottom-[12vh] -left-[140px] md:-left-[180px] lg:-left-[120px] w-[260px] md:w-[320px] lg:w-[380px] aspect-square pointer-events-none select-none opacity-0 filter drop-shadow-[0_15px_25px_rgba(123,35,49,0.3)] transition-opacity duration-500"
      >
        <Image
          src="/images/royal_elephant.png"
          alt="Royal Indian Elephant"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 260px, 380px"
          priority
        />
      </div>

      {/* Right Royal Elephant (Facing Left / Inwards - Mirrored via scaleX) */}
      <div
        ref={rightElephantRef}
        className="royal-elephant-right fixed bottom-[12vh] -right-[140px] md:-right-[180px] lg:-right-[120px] w-[260px] md:w-[320px] lg:w-[380px] aspect-square pointer-events-none select-none opacity-0 filter drop-shadow-[0_15px_25px_rgba(123,35,49,0.3)] transition-opacity duration-500 transform scale-x-[-1]"
      >
        <Image
          src="/images/royal_elephant.png"
          alt="Royal Indian Elephant Mirrored"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 260px, 380px"
          priority
        />
      </div>
    </div>
  );
}
