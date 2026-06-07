"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function NatureOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leaf1Ref = useRef<HTMLDivElement>(null);
  const leaf2Ref = useRef<HTMLDivElement>(null);
  const leaf3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(leaf1Ref.current, { y: 150, rotate: -20, opacity: 0 }, {
        y: 0, rotate: 0, opacity: 0.4,
        scrollTrigger: { trigger: "body", start: "top top", end: "20% top", scrub: 1.5 }
      });
      gsap.fromTo(leaf2Ref.current, { y: 150, rotate: 20, opacity: 0 }, {
        y: 0, rotate: 0, opacity: 0.3,
        scrollTrigger: { trigger: "body", start: "10% top", end: "30% top", scrub: 2 }
      });
      gsap.fromTo(leaf3Ref.current, { x: 100, rotate: 45, opacity: 0 }, {
        x: 0, rotate: 0, opacity: 0.4,
        scrollTrigger: { trigger: "body", start: "40% top", end: "60% top", scrub: 1 }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[90] overflow-hidden">
      <div ref={leaf1Ref} className="absolute -bottom-10 -left-10 w-[250px] h-[250px] md:w-[350px] md:h-[350px] blur-md">
        <Image src="/images/wedding_palm.png" alt="" fill className="object-contain -scale-x-100 rotate-[45deg]" sizes="350px" />
      </div>
      <div ref={leaf2Ref} className="absolute -bottom-10 -right-10 w-[200px] h-[200px] md:w-[300px] md:h-[300px] blur-lg">
        <Image src="/images/wedding_palm.png" alt="" fill className="object-contain rotate-[180deg]" sizes="300px" />
      </div>
      <div ref={leaf3Ref} className="absolute bottom-[20%] -right-20 w-[300px] h-[300px] md:w-[450px] md:h-[450px] blur-md">
        <Image src="/images/wedding_palm.png" alt="" fill className="object-contain -rotate-[30deg]" sizes="450px" />
      </div>
      <div className="absolute -bottom-10 left-0 right-0 h-32 bg-gradient-to-t from-[#E7DFC8] to-transparent z-[100] opacity-40" />
      <div className="absolute -bottom-20 left-0 right-0 h-40 bg-[#E7DFC8]/10 blur-3xl z-[90]" />
    </div>
  );
}
