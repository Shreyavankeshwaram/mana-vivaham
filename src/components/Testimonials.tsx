"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials({ testimonials: cmsTestimonials }: { testimonials?: any[] }) {
  const testimonials = cmsTestimonials || [];
  const containerRef = useRef<HTMLDivElement>(null);
  const quotesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || !testimonials.length) return;

    const ctx = gsap.context(() => {
      // Create a master timeline pinned to the container
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%", // 4 screens of scrolling for a slow, premium scrub
          scrub: 1,
          pin: true,
        }
      });

      quotesRef.current.forEach((quoteEl, index) => {
        if (!quoteEl) return;
        
        const words = quoteEl.querySelectorAll(".word");
        const author = quoteEl.querySelector(".author");

        // If it's not the first quote, animate it floating UP from the bottom
        if (index > 0) {
          tl.fromTo(quoteEl, 
            { opacity: 0, y: 100 }, 
            { opacity: 1, y: 0, duration: 1 }, 
            "+=0.5" // Small delay before next quote enters
          );
        } else {
          // First quote starts visible
          gsap.set(quoteEl, { opacity: 1, y: 0 });
        }

        // Scrub effect: light up the words one by one as you scroll
        tl.fromTo(words, 
          { opacity: 0.15 }, 
          { opacity: 1, stagger: 0.2, duration: 2, ease: "none" }
        );

        // Fade in the author gracefully
        tl.fromTo(author,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
          "-=0.5" // Start slightly before the words finish lighting up
        );

        // If it's not the last quote, fade it OUT and float it UP
        if (index < testimonials.length - 1) {
          tl.to(quoteEl, { opacity: 0, y: -100, duration: 1 }, "+=1.5");
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [testimonials.length]);

  if (!testimonials.length) return null;

  return (
    <section ref={containerRef} className="w-full h-screen bg-[#e8e4db] overflow-hidden flex items-center justify-center relative">
      {/* Massive decorative quotation mark to anchor the space */}
      <div className="absolute top-10 md:top-20 text-[10rem] md:text-[20rem] font-serif text-black/[0.03] leading-none pointer-events-none select-none">
        &quot;
      </div>
      
      <div className="relative w-full max-w-7xl mx-auto px-6 h-full flex items-center justify-center">
        {testimonials.map((t, i) => (
          <div 
            key={i} 
            ref={el => { quotesRef.current[i] = el; }}
            className="absolute w-full flex flex-col items-center justify-center opacity-0"
            style={{ zIndex: testimonials.length - i }}
          >
            {/* Split text manually into words for GSAP targeting */}
            <p className="text-4xl md:text-6xl lg:text-7xl font-serif font-light text-black/90 mb-12 leading-tight text-center max-w-5xl flex flex-wrap justify-center gap-x-4 md:gap-x-6 gap-y-2">
              {t.quote.split(" ").map((word: string, wordIdx: number) => (
                <span key={wordIdx} className="word inline-block opacity-15">
                  {word}
                </span>
              ))}
            </p>
            <p className="author text-sm md:text-xl font-serif uppercase tracking-[0.4em] text-black/50 text-center opacity-0">
              — {t.author || t.clientName}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
