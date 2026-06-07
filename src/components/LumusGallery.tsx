"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, ArrowRightLeft } from "lucide-react";

export default function TargetGallery() {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <section className="relative bg-transparent py-20 px-4 md:px-12 text-lumus-dark">
      <div className="max-w-[1600px] mx-auto">

        {/* Main Grid System */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* Row 1, Left: Settings Setting Card (8 cols) */}
          <div className="md:col-span-5 relative group overflow-hidden rounded-3xl anniel-glow" style={{ height: '400px' }}>
            <Image
              src="/images/editorial_wedding_1.png"
              alt="Setting"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center p-8 md:p-12">
              <h3 className="text-3xl md:text-5xl font-serif italic max-w-sm leading-tight text-white drop-shadow-lg">
                "We don't just take photos; we preserve feelings."
              </h3>
            </div>
          </div>

          {/* Row 1, Right: Proven Experience Card (7 cols) */}
          <div className="md:col-span-7 relative group overflow-hidden rounded-3xl bg-[#E7DFC8] border border-[#8B1E2D]/10 flex flex-col justify-center" style={{ height: '400px' }}>

            {/* Background Marquee Rows */}
            <div className="absolute inset-0 z-0 flex flex-col justify-center gap-4 opacity-20 pointer-events-none">
              {/* Row 1: Moving Right */}
              <div className="flex gap-4 animate-marquee-slow whitespace-nowrap">
                {["1534528741775-53994a69daeb", "1506794778202-cad84cf45f1d", "1531746020798-e6953c6e8e04", "1524504388940-b1c1722653e1", "1519741497674-611481863552"].map((id, i) => (
                  <div key={i} className="relative w-32 h-32 rounded-3xl overflow-hidden flex-shrink-0">
                    <Image src={`https://images.unsplash.com/photo-${id}?q=80&w=200`} alt="" fill className="object-cover grayscale" sizes="128px" />
                  </div>
                ))}
              </div>
              {/* Row 2: Moving Left */}
              <div className="flex gap-4 animate-marquee-slow-reverse whitespace-nowrap">
                {["1507003211169-0a1dd7228f2d", "1500648767791-00dcc994a43e", "1544005313-94ddf0286df2", "1539571696357-5a69c17a67c6", "1494790108377-be9c29b29330"].map((id, i) => (
                  <div key={i} className="relative w-32 h-32 rounded-3xl overflow-hidden flex-shrink-0">
                    <Image src={`https://images.unsplash.com/photo-${id}?q=80&w=200`} alt="" fill className="object-cover grayscale" sizes="128px" />
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 p-12 flex flex-col items-start gap-2">
              <div className="text-7xl font-black text-[#8B1E2D] mb-2">100+</div>
              <h3 className="text-2xl md:text-3xl font-serif leading-tight max-w-2xl">
                A Journey of Light & Shadow: Trusted by over 100 couples to document their most sacred chapters.
              </h3>
            </div>
          </div>

          {/* Row 2, Left: Professional Gears Card (4 cols) */}
          <div className="md:col-span-4 relative group overflow-hidden rounded-3xl bg-[#E7DFC8] border border-[#8B1E2D]/5" style={{ height: '800px' }}>
            <div className="absolute inset-0 z-0">
              <Image
                src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop"
                alt="Lens Detail"
                fill
                className="object-cover opacity-40 translate-y-20 scale-125"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="relative z-10 p-12 h-full flex flex-col justify-between">
              <div>
                <h2 className="text-5xl md:text-6xl font-bold leading-none mb-4">
                  I shoot with <span className="text-[#8B1E2D] underline decoration-2 underline-offset-8">professional</span>-grade gears.
                </h2>
              </div>
              <p className="text-lumus-dark/60 text-lg max-w-xs">
                Every equipments I shoot with is top-quality. This ensures every image is crisp, detailed, and ready for any scale.
              </p>
            </div>
          </div>

          {/* Row 2, Middle: Before/After & Awards (5 cols) */}
          <div className="md:col-span-4 flex flex-col gap-6">

            {/* International Recognition Card */}
            <div className="relative group overflow-hidden rounded-3xl anniel-glow" style={{ height: '387px' }}>
              <Image
                src="/images/editorial_detail_1.png"
                alt="Recognition"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/30 flex items-end p-8">
                <h3 className="text-2xl font-serif italic leading-tight text-white drop-shadow-md">
                  Recognized for excellence in cinematic storytelling.
                </h3>
              </div>
            </div>

            {/* Perfected Before/After Slider Card - Smaller Version */}
            <div className="relative rounded-3xl overflow-hidden bg-[#eee] group shadow-2xl border border-[#8B1E2D]/5" style={{ height: '400px' }}>
              <div className="absolute inset-0">
                {/* Edited (After) */}
                <div className="absolute inset-0">
                  <Image
                    src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200"
                    alt="After"
                    fill
                    className="object-cover scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* Raw (Before) */}
                <div
                  className="absolute inset-0 overflow-hidden z-10"
                  style={{ width: `${sliderPos}%`, borderRight: "1px solid rgba(255,255,255,0.8)" }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200"
                    alt="Before"
                    fill
                    className="object-cover scale-105 saturate-[0.4] brightness-90 contrast-75"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-6 left-6 flex items-center gap-2 bg-black/40 backdrop-blur-xl border border-white/10 px-3 py-1.5 rounded-full shadow-lg">
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white">Raw</span>
                  </div>
                </div>
              </div>

              <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-xl border border-white/20 px-3 py-1.5 rounded-full shadow-lg z-20">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#8B1E2D]">Edited</span>
              </div>

              {/* Slider Handle */}
              <div
                className="absolute inset-y-0 z-30 pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="h-full w-[1px] bg-white/30 relative flex items-center justify-center -translate-x-1/2">
                  <div className="w-10 h-10 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-full flex items-center justify-center shadow-xl pointer-events-auto cursor-ew-resize">
                    <ArrowRightLeft className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={sliderPos}
                onChange={(e) => setSliderPos(parseInt(e.target.value))}
                className="absolute inset-0 opacity-0 cursor-ew-resize z-40"
              />

              <div className="absolute bottom-8 left-8 right-8 pointer-events-none z-20">
                <h4 className="text-xl md:text-2xl font-bold leading-tight drop-shadow-2xl">
                  Editing That <span className="italic font-serif">Elevates</span>
                </h4>
              </div>
            </div>

          </div>

          {/* Row 2, Right: Featured Portrait & Stats (3 cols) */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="relative group overflow-hidden rounded-3xl" style={{ height: '550px' }}>
              <Image
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop"
                alt="Portrait"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            {/* Stats Card */}
            <div className="bg-[#E7DFC8] border border-[#8B1E2D]/10 rounded-3xl p-10 flex flex-col items-center justify-center text-lumus-dark h-[224px]">
              <div className="text-6xl font-black mb-2 text-[#8B1E2D]">80+</div>
              <div className="text-lumus-dark/50 font-bold tracking-tight mb-4">satisfied clients</div>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#8B1E2D] text-[#8B1E2D]" />
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
