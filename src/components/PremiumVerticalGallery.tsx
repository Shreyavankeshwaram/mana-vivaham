"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const photos = {
  col1: [
    { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop", title: "Eternal Grace", category: "Editorial", num: "01" },
    { src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop", title: "Sacred Vow", category: "Wedding", num: "02" },
    { src: "https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=1200&auto=format&fit=crop", title: "Bloom", category: "Fine Art", num: "03" },
    { src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1200&auto=format&fit=crop", title: "Chiaroscuro", category: "Portrait", num: "04" },
  ],
  col2: [
    { src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1200&auto=format&fit=crop", title: "Soft Whispers", category: "Fine Art", num: "05" },
    { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop", title: "Ethereal", category: "Vogue", num: "06" },
    { src: "https://images.unsplash.com/photo-1541250848049-b4f7141dca3f?q=80&w=1200&auto=format&fit=crop", title: "Midnight Muse", category: "Fashion", num: "07" },
    { src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1200&auto=format&fit=crop", title: "The Wander", category: "Street", num: "08" },
  ],
  col3: [
    { src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop", title: "Quiet Fury", category: "Portrait", num: "09" },
    { src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop", title: "Neon Dreams", category: "Urban", num: "10" },
    { src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop", title: "Golden Hour", category: "Wedding", num: "11" },
    { src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop", title: "Classic Spirit", category: "Editorial", num: "12" },
  ],
};

type Photo = { src: string; title: string; category: string; num: string };

function MagneticCard({ photo, aspect }: { photo: Photo; aspect: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !innerRef.current || !shimmerRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = (x - cx) / cx;
    const dy = (y - cy) / cy;
    gsap.to(innerRef.current, { rotateX: -dy * 8, rotateY: dx * 8, duration: 0.4, ease: "power2.out" });
    const shimmerX = (x / rect.width) * 100;
    const shimmerY = (y / rect.height) * 100;
    gsap.to(shimmerRef.current, {
      background: "radial-gradient(circle at " + shimmerX + "% " + shimmerY + "%, rgba(255,255,255,0.08) 0%, transparent 60%)",
      duration: 0.3,
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setHovered(true);
    if (!innerRef.current) return;
    gsap.to(innerRef.current, { scale: 1.02, duration: 0.5, ease: "power3.out" });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    if (!innerRef.current || !shimmerRef.current) return;
    gsap.to(innerRef.current, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.7, ease: "elastic.out(1, 0.5)" });
    gsap.to(shimmerRef.current, { background: "transparent", duration: 0.4 });
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative group cursor-pointer"
      style={{ aspectRatio: aspect, perspective: "1000px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={innerRef}
        className="relative w-full h-full overflow-hidden"
        style={{ transformStyle: "preserve-3d", willChange: "transform" }}
      >
        <Image
          src={photo.src}
          alt={photo.title}
          fill
          className={`object-cover transition-transform duration-[2s] ease-out ${hovered ? "scale-[1.07]" : "scale-100"}`}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/20" />
        <div ref={shimmerRef} className="absolute inset-0 z-10 pointer-events-none" />

        <div className="absolute top-4 left-4 z-20">
          <span className="font-mono text-[10px] tracking-[0.25em] text-white/25 transition-colors duration-500 group-hover:text-white/60">
            {photo.num}
          </span>
        </div>

        <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <span className="text-[8px] tracking-[0.4em] uppercase text-white/50 border border-white/15 px-2 py-1">
            {photo.category}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 p-5">
          <div
            className="h-px bg-white/30 mb-3 transition-all duration-700 ease-out"
            style={{ width: hovered ? "100%" : "0%" }}
          />
          <div className="overflow-hidden">
            <h4
              className="text-base md:text-lg font-serif italic font-light text-white leading-tight transition-transform duration-700 ease-out"
              style={{ transform: hovered ? "translateY(0)" : "translateY(110%)" }}
            >
              {photo.title}
            </h4>
          </div>
          <div className="overflow-hidden mt-1">
            <p
              className="text-[8px] tracking-[0.5em] uppercase text-white/35 transition-transform duration-700 ease-out delay-75"
              style={{ transform: hovered ? "translateY(0)" : "translateY(110%)" }}
            >
              Open series
            </p>
          </div>
        </div>

        <div
          className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-500"
          style={{
            opacity: hovered ? 1 : 0,
            boxShadow: "inset 0 0 0 0.5px rgba(255,255,255,0.12), inset 0 0 60px rgba(255,255,255,0.02)",
          }}
        />
      </div>
    </div>
  );
}

export default function PremiumVerticalGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    if (!isMounted || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40, filter: "blur(12px)" },
        {
          opacity: 1, y: 0, filter: "blur(0px)", duration: 1.6, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
        }
      );
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=450%",
          scrub: 2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      tl.to(col1Ref.current, { y: "-22%", ease: "none" }, 0);
      tl.to(col2Ref.current, { y: "-52%", ease: "none" }, 0);
      tl.to(col3Ref.current, { y: "-32%", ease: "none" }, 0);
    }, sectionRef);
    return () => ctx.revert();
  }, [isMounted]);

  return (
    <section className="relative w-full h-screen bg-[#030303] overflow-hidden">
      <div ref={sectionRef} className="relative w-full h-screen bg-[#030303] overflow-hidden">
        {isMounted && (
          <div className="w-full h-full">
            <div
              ref={headingRef}
              className="absolute top-8 md:top-10 left-0 right-0 z-40 flex items-end justify-between px-8 md:px-14 pointer-events-none"
            >
              <div>
                <p className="text-[8px] tracking-[0.7em] uppercase font-mono mb-3" style={{ color: "rgba(255,255,255,0.2)" }}>
                  Selected Works
                </p>
                <h2 className="text-5xl md:text-7xl font-serif font-light italic text-white leading-none" style={{ letterSpacing: "-0.02em" }}>
                  The
                  <br />
                  <span style={{ color: "rgba(255,255,255,0.4)" }}>Archive</span>
                </h2>
              </div>
              <div className="text-right">
                <p className="text-[8px] tracking-[0.5em] uppercase font-mono mb-1" style={{ color: "rgba(255,255,255,0.2)" }}>AURA STUDIO</p>
                <p className="text-[8px] tracking-[0.3em] font-mono" style={{ color: "rgba(255,255,255,0.1)" }}>2025 Collection</p>
                <div className="mt-3 flex flex-col items-end gap-1">
                  <div className="w-10 h-px" style={{ background: "rgba(255,255,255,0.1)" }} />
                  <div className="w-6 h-px" style={{ background: "rgba(255,255,255,0.1)" }} />
                </div>
              </div>
            </div>

            <div className="absolute top-44 left-8 md:left-14 right-8 md:right-14 h-px z-40 pointer-events-none" style={{ background: "rgba(255,255,255,0.05)" }} />

            <div className="absolute top-48 bottom-0 left-0 right-0 grid grid-cols-3 gap-2 md:gap-3 px-4 md:px-8 z-10 overflow-hidden">
              <div ref={col1Ref} className="flex flex-col gap-2 md:gap-3">
                {photos.col1.map((photo, i) => (
                  <MagneticCard key={i} photo={photo} aspect={i % 2 === 0 ? "3/4" : "4/5"} />
                ))}
              </div>
              <div ref={col2Ref} className="flex flex-col gap-2 md:gap-3" style={{ transform: "translateY(-15%)" }}>
                {photos.col2.map((photo, i) => (
                  <MagneticCard key={i} photo={photo} aspect={i % 2 === 0 ? "4/5" : "3/4"} />
                ))}
              </div>
              <div ref={col3Ref} className="flex flex-col gap-2 md:gap-3" style={{ transform: "translateY(10%)" }}>
                {photos.col3.map((photo, i) => (
                  <MagneticCard key={i} photo={photo} aspect={i % 2 === 0 ? "4/5" : "3/4"} />
                ))}
              </div>
            </div>

            <div className="absolute inset-0 z-30 pointer-events-none" style={{ background: "radial-gradient(ellipse 85% 75% at 50% 55%, transparent 35%, rgba(3,3,3,0.6) 70%, rgba(3,3,3,0.95) 100%)" }} />
            <div className="absolute top-0 left-0 right-0 z-30 pointer-events-none" style={{ height: "220px", background: "linear-gradient(to bottom, #030303, transparent)" }} />
            <div className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none" style={{ height: "120px", background: "linear-gradient(to top, #030303, transparent)" }} />

            <div className="absolute bottom-8 left-0 right-0 z-40 flex items-center justify-between px-8 md:px-14 pointer-events-none">
              <p className="text-[7px] tracking-[0.6em] uppercase font-mono" style={{ color: "rgba(255,255,255,0.12)" }}>
                12 frames curated
              </p>
              <div className="flex flex-col items-center gap-1">
                <div className="w-px h-6 animate-pulse" style={{ background: "rgba(255,255,255,0.15)" }} />
                <p className="text-[6px] tracking-[0.6em] uppercase font-mono" style={{ color: "rgba(255,255,255,0.1)" }}>Scroll</p>
              </div>
              <p className="text-[7px] tracking-[0.4em] uppercase font-mono" style={{ color: "rgba(255,255,255,0.12)" }}>
                aura.studio
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
