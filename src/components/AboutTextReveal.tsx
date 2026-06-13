"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const text = "We are Macharla. A collective of visual storytellers dedicated to the art of cinematic preservation. We believe in the raw, the unscripted, and the timeless. Our lens doesn't just record events; it captures the very soul of the moment, weaving together a narrative that will endure for generations.";

export default function AboutTextReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || !textRef.current) return;

    const words = textRef.current.querySelectorAll(".word");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.1 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            end: "bottom 85%",
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-white py-24 md:py-32 px-6 md:px-12 flex items-center justify-center z-10 relative">
      <h2
        ref={textRef}
        className="max-w-4xl text-2xl md:text-4xl lg:text-5xl font-serif italic font-medium text-lumus-dark leading-[1.4] md:leading-[1.5] text-center"
      >
        {text.split(" ").map((word, i) => (
          <span key={i} className="word inline-block mr-2 md:mr-4 mb-2">
            {word}
          </span>
        ))}
      </h2>
    </section>
  );
}
