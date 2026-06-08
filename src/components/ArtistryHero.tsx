"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ArtistryHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. SVG Paths Reveal
      gsap.fromTo(".artistry-path", 
        { y: 100, opacity: 0, filter: "blur(20px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.05,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );

      // 2. Image Expand & Blur to Focus
      gsap.fromTo(imageRef.current,
        { scale: 1.2, filter: "blur(30px)", opacity: 0 },
        {
          scale: 1,
          filter: "blur(0px)",
          opacity: 1,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "center center",
            scrub: 1
          }
        }
      );

      // 3. Text Reveal
      gsap.fromTo(textRef.current,
        { y: 50, opacity: 0, filter: "blur(10px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen bg-[#F2F2F2] py-24 px-6 md:px-12 flex flex-col justify-between overflow-hidden">
      
      {/* Massive SVG Wordmark: ARTISTRY Style */}
      <div className="relative w-full mt-12 mb-20">
        <svg 
          ref={svgRef}
          width="100%" 
          height="auto" 
          viewBox="0 0 113 19" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <g fill="#8B1E2D" className="artistry-paths">
            <path className="artistry-path" d="m98.9088 18v-17.159973h13.0082v3.528003h-8.688v3.048h7.488v3.52797h-7.488v3.528h8.832v3.528z" />
            <path className="artistry-path" d="m87.9181 18-5.712-17.159973h4.728l3.24 12.023973h.048l3.264-12.023973h4.56l-5.568 17.159973z" />
            <path className="artistry-path" d="m77.0988 18v-17.159973h4.32v17.159973z" />
            <path className="artistry-path" d="m66.7308 18v-13.63197h-4.992v-3.528003h14.28v3.528003h-4.968v13.63197z" />
            <path className="artistry-path" d="m46.8616 18 6.528-17.159973h4.344l6.576 17.159973h-4.728l-1.104-3.576h-5.88l-1.104 3.576zm6.72-6.864h3.936l-1.944-6.33597h-.048z" />
            <path className="artistry-path" d="m33.7431 18v-17.159973h13.008v3.528003h-8.688v3.048h7.488v3.52797h-7.488v3.528h8.832v3.528z" />
            <path className="artistry-path" d="m17.9397 18v-17.159973h8.088c3.816 0 6.12 1.776003 6.12 4.896003 0 2.4-1.344 3.816-3.48 4.29597v.048c4.296.744 2.736 7.392 3.72 7.68v.24h-4.488c-.84-.72.72-5.976-2.952-5.976h-2.688v5.976zm4.32-9.50397h2.928c1.728 0 2.64-.624 2.64-2.064s-.912-2.064-2.64-2.064h-2.928z" />
            <path className="artistry-path" d="m8.99145 18.384c-5.448 0-8.208003-3.792-8.208003-8.90401 0-5.256 2.904003-9.023996 8.328003-9.023996 4.67995 0 7.17595 2.783996 7.58395 6.767996h-4.416c-.312-1.872-1.08-3.24-3.35995-3.24-2.856 0-3.72 2.208-3.72 5.424 0 3.24001.864 5.44801 3.72 5.44801 2.30395 0 3.07195-1.368 3.35995-3.288h4.416c-.384 3.936-2.976 6.816-7.70395 6.816z" />
          </g>
        </svg>
        <div className="absolute inset-0 bg-[url('https://cdn.cosmos.so/00c1aedd-73e6-4e74-a278-2252a626bbff?format=jpeg')] bg-contain bg-center mix-blend-screen opacity-40 pointer-events-none" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end w-full">
        <div className="md:col-span-5">
          <div ref={imageRef} className="relative aspect-[3/4] w-full overflow-hidden shadow-2xl">
            <Image 
              src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop" 
              alt="Artistry Portrait" 
              fill 
              className="object-cover grayscale"
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-[url('https://cdn.cosmos.so/00c1aedd-73e6-4e74-a278-2252a626bbff?format=jpeg')] bg-cover mix-blend-screen opacity-20" />
          </div>
        </div>
        <div className="hidden md:block md:col-span-3" />
        <div className="md:col-span-4 text-right">
          <p ref={textRef} className="text-lg md:text-2xl font-serif italic text-[#8B1E2D] leading-relaxed">
            "I am a visual artist exploring the intersection of mental landscapes and cinematic preservation. Creating art as a therapeutic journey, my work embodies the transformation of internal chaos into external beauty."
          </p>
          <div className="mt-6 flex justify-end">
            <div className="w-16 h-[2px] bg-[#8B1E2D]/20" />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('/noise.svg')]" />
    </section>
  );
}
