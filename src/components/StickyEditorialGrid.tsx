"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Bodoni_Moda } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
});

const cards = [
  {
    id: "01",
    label: "STORYTELLING",
    title: "Modern Wedding Storytelling",
    description: "Capturing the raw, unscripted moments that define your unique journey. Our approach blends editorial elegance with genuine emotion to create a visual legacy that speaks across generations.",
    image: "/images/editorial_wedding_1.png",
    bg: "#f5efe4",
  },
  {
    id: "02",
    label: "TIMELESS",
    title: "Frames That Feel Eternal",
    description: "Every shutter click is a conscious decision to preserve a fleeting moment. We focus on the quiet glances, the delicate details, and the overwhelming joy that makes your day unforgettable.",
    image: "/images/wedding_botanical_1.png",
    bg: "#efe7d8",
  },
  {
    id: "03",
    label: "EDITORIAL",
    title: "Editorial Cinema Experience",
    description: "Moving beyond traditional photography into the realm of fine art cinema. Our frames are composed with an intentional eye for light, shadow, and the sophisticated beauty of Indian heritage.",
    image: "/images/wedding_temple.png",
    bg: "#ede0cf",
  },
  {
    id: "04",
    label: "EMOTION",
    title: "Crafted With Emotion",
    description: "The deepest stories are often told without words. We specialize in capturing the atmospheric essence of your celebration, ensuring every image resonates with the heartbeat of the occasion.",
    image: "/images/editorial_detail_1.png",
    bg: "#f5efe4",
  },
];

export default function StickyEditorialGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter((card) => card !== null) as HTMLDivElement[];

      cards.forEach((card, index) => {
        if (index < cards.length - 1) {
          const nextCard = cards[index + 1];

          gsap.to(card, {
            scale: 0.9,
            opacity: 0.4,
            y: -20,
            filter: "blur(4px)",
            scrollTrigger: {
              trigger: nextCard,
              start: "top 80%",
              end: "top 10%",
              scrub: true,
            },
          });
        }

        const content = card.querySelector(".mv-sticky-content");
        const image = card.querySelector(".mv-sticky-image img");

        if (content && image) {
          gsap.fromTo(
            [content.children, image],
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.2,
              stagger: 0.1,
              ease: "power4.out",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        if (image) {
          gsap.to(image, {
            y: -40,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className={`mv-sticky-section relative w-full py-32 ${bodoniModa.variable}`}
      style={{ backgroundColor: "#f5efe4" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-[2]">
        <div className="mb-32 flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <span className="font-inter text-[10px] tracking-[0.4em] text-[#8b2e3c] font-bold uppercase mb-4 block">
              STORYTELLING
            </span>
            <h2 className="font-cormorant text-[4rem] md:text-[7rem] leading-[0.9] text-[#2a1d1b] font-medium uppercase italic">
              Working<br />Projects
            </h2>
          </div>
          <p className="font-inter text-[#7a6a58] text-[0.9rem] md:text-[1.1rem] max-w-[300px] leading-relaxed pb-4">
            A curated selection of our most recent editorial wedding sequences and cinematic frames.
          </p>
        </div>

        <div className="flex flex-col">
          {cards.map((card, index) => (
            <div
              key={card.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="mv-sticky-card sticky top-[10vh] w-full h-[80vh] flex items-center justify-center mb-[10vh]"
            >
              <div className="mv-sticky-inner w-full h-full flex flex-col md:flex-row items-center gap-8 md:gap-16">
                <div className="mv-sticky-image relative w-full md:w-[60%] h-[40vh] md:h-full rounded-[32px] overflow-hidden shadow-2xl">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                    sizes="(max-width: 768px) 100vw, 60vw"
                  />
                  <div className="absolute top-6 left-6 z-10">
                    <span className="font-inter text-[12px] font-bold text-white/80 bg-black/20 backdrop-blur-md px-3 py-1 rounded-full">
                      {card.id}
                    </span>
                  </div>
                </div>

                <div className="mv-sticky-content w-full md:w-[40%] flex flex-col justify-center items-start">
                  <span className="mv-sticky-label font-inter text-[10px] tracking-[0.3em] text-[#8b2e3c] font-semibold mb-6 uppercase">
                    {card.label}
                  </span>

                  <h3 className="font-cormorant text-[2.5rem] md:text-[4rem] leading-[1.1] text-[#2a1d1b] font-medium mb-8">
                    {card.title}
                  </h3>

                  <p className="font-inter text-[#7a6a58] text-[0.95rem] md:text-[1.15rem] leading-relaxed max-w-[400px]">
                    {card.description}
                  </p>

                  <div className="mt-12 group cursor-pointer">
                    <span className="font-inter text-[11px] tracking-[0.2em] text-[#2a1d1b] uppercase border-b border-[#2a1d1b]/20 pb-1 group-hover:border-[#8b2e3c] transition-all duration-300">
                      View Frame — {card.id}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32 pt-32 border-t border-[#2a1d1b]/10 text-center">
          <h2 className="font-cormorant text-[3.5rem] md:text-[8rem] leading-[0.8] text-[#2a1d1b] font-medium uppercase">
            Look Ma<br />
            <span className="italic opacity-50 text-[0.7em]">No JS!</span>
          </h2>
        </div>
      </div>

      <style jsx>{`
        .font-cormorant { font-family: var(--font-playfair), serif; }
        .font-inter { font-family: var(--font-playfair), serif; }
        @media (max-width: 768px) {
          .mv-sticky-card { position: relative !important; top: 0 !important; margin-bottom: 2rem; height: auto !important; min-height: auto !important; }
          .mv-sticky-inner { flex-direction: column !important; }
        }
      `}</style>
    </section>
  );
}
