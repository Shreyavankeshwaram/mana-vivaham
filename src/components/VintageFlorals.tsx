"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function VintageFlorals() {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      const flowers = containerRef.current?.querySelectorAll(".vintage-flower");
      flowers?.forEach((flower, i) => {
        gsap.fromTo(flower, { scale: 0.8, opacity: 0, filter: "blur(10px)", y: 50 }, {
          scale: 1, opacity: 0.3, filter: "blur(0px)", y: 0,
          scrollTrigger: { trigger: flower, start: "top bottom", end: "bottom top", scrub: 1 }
        });
        gsap.to(flower, { y: "+=20", x: "+=10", rotation: i % 2 === 0 ? 5 : -5, duration: 4 + i, repeat: -1, yoyo: true, ease: "sine.inOut" });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);
  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[85] overflow-hidden">
      <div className="vintage-flower absolute top-[10%] -left-12 w-[250px] h-[250px] md:w-[400px] md:h-[400px] rotate-[-15deg]">
        <Image src="/images/vintage_flower.png" alt="" fill className="object-contain mix-blend-multiply opacity-80" sizes="400px" />
      </div>
      <div className="vintage-flower absolute top-[40%] -right-16 w-[200px] h-[200px] md:w-[350px] md:h-[350px] rotate-[15deg]">
        <Image src="/images/vintage_flower.png" alt="" fill className="object-contain mix-blend-multiply opacity-80" sizes="350px" />
      </div>
      <div className="vintage-flower absolute bottom-[15%] -left-16 w-[220px] h-[220px] md:w-[380px] md:h-[380px] rotate-[10deg]">
        <Image src="/images/vintage_flower.png" alt="" fill className="object-contain mix-blend-multiply opacity-80 -scale-y-100" sizes="380px" />
      </div>
    </div>
  );
}
