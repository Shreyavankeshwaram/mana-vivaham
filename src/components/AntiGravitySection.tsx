"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Image from "next/image";

interface AntiGravitySectionProps {
  title: string;
  subtitle: string;
  image: string;
  reverse?: boolean;
}

export default function AntiGravitySection({ title, subtitle, image, reverse }: AntiGravitySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const displacementRef = useRef<SVGFETurbulenceElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. SVG Turbulence Animation (Heat Haze / Anti-Gravity Waves)
      gsap.to(displacementRef.current, {
        attr: { baseFrequency: 0.001 },
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // 2. Image Reveal and Scale
      gsap.fromTo(imageWrapperRef.current,
        { scale: 1.4, opacity: 0, y: 100 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
          }
        }
      );

      // 3. Experimental Typography Repositioning
      gsap.fromTo(titleRef.current,
        { x: reverse ? 100 : -100, opacity: 0, rotate: reverse ? -5 : 5 },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, [reverse]);

  return (
    <section ref={sectionRef} className={`relative w-full min-h-screen flex items-center justify-center py-32 px-6 md:px-24 overflow-hidden z-20 ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'}`}>



      {/* Experimental Typography */}
      <div className={`relative w-full md:w-1/2 flex flex-col z-30 ${reverse ? 'items-end text-right' : 'items-start text-left'}`}>
        <motion.p
          initial={{ opacity: 0, x: reverse ? 20 : -20 }}
          whileInView={{ opacity: 0.6, x: 0 }}
          className="text-[#8B1E2D] font-mono text-[10px] md:text-xs tracking-[1em] uppercase mb-8"
        >
          {subtitle}
        </motion.p>
        <h2
          ref={titleRef}
          className="sanitize-heading text-white text-[15vw] md:text-[12vw] font-serif font-black leading-[0.95] tracking-tighter uppercase break-words md:break-normal"
        >
          {title.split(" ").map((word, i) => (
            <span key={i} className="block">{word}</span>
          ))}
        </h2>
      </div>

      {/* Surreal Visual Container */}
      <div className="relative w-full md:w-1/2 flex justify-center">
        <div
          ref={imageWrapperRef}
          className="relative w-full max-w-md aspect-[3/4] md:aspect-[4/5] rounded-none overflow-hidden"
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

    </section>
  );
}
