'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LuxuryStickyColumns from './LuxuryStickyColumns';

const zoomImages = [
  { src: "/images/editorial_wedding_1.png", layer: 2 },
  { src: "/images/wedding_temple.png", layer: 2 },
  { src: "/images/editorial_detail_1.png", layer: 1 },
  { src: "/images/antigravity.png", layer: 2 },
  { src: "/images/nature_mood_1.png", layer: 3 },
  { src: "/images/wedding_botanical_1.png", layer: 1 },
  { src: "/images/wedding_botanical_2.png", layer: 3 },
  { src: "/images/editorial_wedding_2.png", layer: 3 },
  { src: "/images/wedding_story_1.png", layer: 1 },
  { src: "/images/wedding_story_2.png", layer: 3 },
  { src: "/images/luxury_couple.png", layer: 2 },
  { src: "/images/cinematic_bride.png", layer: 1 },
];

export default function CinematicZoomDepth() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || !triggerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Perspective Zoom Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 1,
        }
      });

      tl.to(".zoom-item-3", {
        opacity: 1,
        z: 1200, // Move past camera
        ease: "power1.in"
      }, 0)
        .to(".zoom-item-2", {
          opacity: 1,
          z: 1000,
          ease: "power1.in"
        }, 0)
        .to(".zoom-item-1", {
          opacity: 1,
          z: 800,
          ease: "power1.in"
        }, 0)
        .to(".zoom-heading", {
          opacity: 1,
          z: 100,
          scale: 0.8,
          ease: "power1.inOut"
        }, 0);

      // Fade out the zoom container as we reach the columns
      gsap.to(triggerRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "bottom 20%",
          end: "bottom top",
          scrub: true,
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative bg-black">
      {/* Zoom Container - First Stage */}
      <div
        ref={triggerRef}
        className="zoom-container relative h-screen w-full overflow-hidden flex items-center justify-center bg-black z-20"
        style={{ perspective: '100vh' }}
      >
        <h2 className="zoom-heading absolute text-center text-white text-4xl md:text-8xl font-serif italic z-50 opacity-10 pointer-events-none transform -translate-z-[2000px] whitespace-nowrap">
          The Journey Within
        </h2>

        {zoomImages.map((img, i) => (
          <div
            key={i}
            className={`zoom-item zoom-item-${img.layer} absolute transform-gpu`}
            style={{
              zIndex: img.layer,
              width: `${[12, 8, 14, 6, 11, 13, 9, 7, 10, 15, 5, 12][i % 12]}vw`,
              maxWidth: '300px',
              opacity: img.layer === 3 ? 0.6 : img.layer === 2 ? 0.4 : 0.2,
              left: `${[15, 29, 36, 60, 85, 93, 16, 29, 7, 75, 45, 90][i % 12]}vw`,
              top: `${[21, 15, 3, 11, 28, 32, 75, 60, 46, 85, 80, 5][i % 12]}%`,
            }}
          >
            <div className="relative aspect-[6/7] w-full shadow-2xl overflow-hidden rounded-sm">
              <Image
                src={img.src}
                alt="wedding layer"
                fill
                className="object-cover grayscale"
                sizes="15vw"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Luxury Sticky Columns - Second Stage (Replacing the text) */}
      <div className="relative z-10 -mt-[20vh]">
        <LuxuryStickyColumns />
      </div>
    </div>
  );
}
