"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function BotanicalOverlays() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const items = containerRef.current?.querySelectorAll(".botanical-side-item");
      
      items?.forEach((item, i) => {
        // Scroll-triggered popup/popout
        gsap.fromTo(item,
          { 
            y: 100, 
            opacity: 0, 
            scale: 0.9,
            filter: "blur(10px)" 
          },
          {
            y: 0,
            opacity: 0.45,
            scale: 1,
            filter: "blur(0px)",
            scrollTrigger: {
              trigger: item,
              start: "top 95%",
              end: "top 60%",
              scrub: 1.5,
              toggleActions: "play reverse play reverse"
            }
          }
        );

        // Slow floating motion
        gsap.to(item, {
          y: "+=25",
          rotation: i % 2 === 0 ? 4 : -4,
          duration: 6 + i,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[80] overflow-hidden">
      
      {/* Flower 1: Partially off-screen Left */}
      <div className="botanical-side-item absolute top-[25%] -left-[10%] w-[350px] h-[350px] md:w-[550px] md:h-[550px]">
        <Image 
          src="/images/wedding_flower_transparent.png" 
          alt="" 
          fill 
          className="object-contain rotate-[-15deg]"
          sizes="550px"
        />
      </div>

      {/* Flower 2: Partially off-screen Right */}
      <div className="botanical-side-item absolute top-[65%] -right-[12%] w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
        <Image 
          src="/images/wedding_flower_transparent.png" 
          alt="" 
          fill 
          className="object-contain rotate-[165deg]"
          sizes="500px"
        />
      </div>

      {/* Flower 3: Lower Left Edge */}
      <div className="botanical-side-item absolute bottom-[10%] -left-[8%] w-[250px] h-[250px] md:w-[450px] md:h-[450px]">
        <Image 
          src="/images/wedding_flower_transparent.png" 
          alt="" 
          fill 
          className="object-contain rotate-[15deg] blur-[1px]"
          sizes="450px"
        />
      </div>

    </div>
  );
}
