"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

const gridImages = [
  { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800", span: "md:col-span-2 md:row-span-2" },
  { src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800", span: "md:col-span-1 md:row-span-1" },
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800", span: "md:col-span-1 md:row-span-2" },
  { src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800", span: "md:col-span-1 md:row-span-1" },
  { src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800", span: "md:col-span-1 md:row-span-2" },
  { src: "https://images.unsplash.com/photo-1520699918507-3c3e05c46b0c?q=80&w=800", span: "md:col-span-2 md:row-span-1" },
  { src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800", span: "md:col-span-1 md:row-span-2" },
  { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800", span: "md:col-span-1 md:row-span-1" },
  { src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800", span: "md:col-span-1 md:row-span-1" },
  { src: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800", span: "md:col-span-2 md:row-span-2" },
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800", span: "md:col-span-1 md:row-span-2" },
  { src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800", span: "md:col-span-1 md:row-span-1" },
];

export default function InteractiveImageGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll(".interactive-card");

    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          scale: 1.05,
          zIndex: 50,
          duration: 0.6,
          ease: "power3.out",
        });
        gsap.to(Array.from(cards).filter(c => c !== card), {
          opacity: 0.3,
          filter: "blur(4px)",
          duration: 0.6,
          ease: "power3.out",
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(cards, {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          zIndex: 1,
          duration: 0.6,
          ease: "power3.out",
        });
      });
    });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 20;
      const yPos = (clientY / window.innerHeight - 0.5) * 20;

      gsap.to(gridRef.current, {
        x: xPos,
        y: yPos,
        duration: 1.5,
        ease: "power2.out"
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative w-full min-h-screen py-32 px-4 md:px-12 bg-transparent z-20 overflow-hidden">
      <div 
        ref={gridRef}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 auto-rows-[200px] md:auto-rows-[250px] max-w-[1600px] mx-auto will-change-transform"
      >
        {gridImages.map((img, i) => (
          <div
            key={i}
            className={`interactive-card relative group rounded-none overflow-hidden cursor-pointer shadow-none transition-shadow duration-500 ${img.span}`}
          >
            <Image 
              src={img.src}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 pointer-events-none" />
          </div>
        ))}
      </div>
    </section>
  );
}
