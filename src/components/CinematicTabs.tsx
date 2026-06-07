"use client";

import React, { useEffect, useRef } from "react";
import { Bodoni_Moda } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
});

const tabData = [
  {
    id: 1,
    title: "Reinventing Wedding Cinema with <span class='text-[#8b2e3c] italic'>Award winning</span> frames",
    description: "Our mission is to bridge the gap between traditional photography and fine-art cinema. Every frame is a conscious decision to preserve the soul of your celebration.",
    video: "https://assets-global.website-files.com/65ae37af356fab4845432048/65be0fdac914d702e08f70ed_Yoda-Helmet_1-transcode.mp4",
  },
  {
    id: 2,
    title: "Best in class lighting for <span class='text-[#8b2e3c] italic'>optimal atmosphere</span>",
    description: "3 light modes: 🌱 natural, ⚡️ editorial & 🚀 dramatic - that offer up to 8k resolution on every capture.",
    video: "https://assets-global.website-files.com/65ae37af356fab4845432048/65ae37af356fab48454320ae_BatteryRemoval_Pingpong_001-transcode.mp4",
  },
  {
    id: 3,
    title: "Durable and effortless, <span class='text-[#8b2e3c] italic'>all the way</span> through the night",
    description: "We spend years perfecting our craft, stripping away the unnecessary to deliver a simple, efficient, and deeply emotional storytelling experience.",
    video: "https://assets-global.website-files.com/65ae37af356fab4845432048/65be104f9aba74d774b7f4a3_Yoda-Exploded-50-transcode.mp4",
  },
];

export default function CinematicTabs() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ".mv-intro-wrapper",
        start: "top top",
        end: "bottom top",
        pin: ".mv-intro-content",
        pinSpacing: false,
      });

      const textSlides = gsap.utils.toArray(".mv-tab-text") as HTMLElement[];
      const videoSlides = gsap.utils.toArray(".mv-tab-video") as HTMLElement[];

      textSlides.forEach((text, i) => {
        if (i === 0) return;
        gsap.set([text, videoSlides[i]], { opacity: 0, y: 50 });
        ScrollTrigger.create({
          trigger: ".mv-tabs-trigger",
          start: () => `top+=${i * window.innerHeight * 1.5} top`,
          end: () => `top+=${(i + 1) * window.innerHeight * 1.5} top`,
          onToggle: (self) => {
            if (self.isActive) {
              gsap.to([text, videoSlides[i]], { opacity: 1, y: 0, duration: 0.6 });
              textSlides.forEach((other, j) => {
                if (i !== j) gsap.to([other, videoSlides[j]], { opacity: 0, y: -50, duration: 0.4 });
              });
            }
          },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className={`mv-cinematic-tabs relative w-full ${bodoniModa.variable}`}>
      <div className="mv-intro-wrapper relative h-[80vh] bg-[#f5efe4] flex items-center justify-center">
        <div className="mv-intro-content text-center max-w-[600px] px-6">
          <h2 className="font-cormorant text-[3rem] md:text-[4.5rem] leading-none text-[#2a1d1b] font-medium mb-6">
            <span className="border-b-2 border-[#8b2e3c]/30 italic">Pure Emotion</span><br />captured forever
          </h2>
          <p className="font-inter text-[#7a6a58] text-[1.125rem]">We take care of every frame to ensure a hassle-free cinematic experience.</p>
        </div>
      </div>
      <div className="mv-tabs-trigger relative bg-[#141414] rounded-t-[3rem] z-10">
        <div className="h-[450vh]">
          <div className="sticky top-0 h-screen w-full flex items-center justify-center px-6 md:px-12">
            <div className="max-w-[1400px] w-full grid grid-cols-1 md:grid-cols-[0.4fr_1fr] gap-8 h-[80vh]">
              <div className="bg-[#1c1c1c] rounded-[2rem] p-8 flex flex-col justify-between relative overflow-hidden">
                <div className="relative h-full">
                  {tabData.map((tab, i) => (
                    <div key={tab.id} className={`mv-tab-text absolute inset-0 flex flex-col justify-center ${i === 0 ? "opacity-100" : "opacity-0"}`}>
                      <h3 className="font-cormorant text-[2rem] text-white leading-tight mb-8" dangerouslySetInnerHTML={{ __html: tab.title }} />
                      <div className="w-full h-[1px] bg-white/10 mb-8" />
                      <p className="font-inter text-white/50 text-[1rem]">{tab.description}</p>
                    </div>
                  ))}
                </div>
                <button className="group flex items-center gap-4 text-white uppercase tracking-widest text-[12px]">Book Session</button>
              </div>
              <div className="relative rounded-[2rem] overflow-hidden bg-black">
                {tabData.map((tab, i) => (
                  <div key={tab.id} className={`mv-tab-video absolute inset-0 w-full h-full ${i === 0 ? "opacity-100" : "opacity-0"}`}>
                    <video autoPlay loop muted playsInline className="w-full h-full object-cover grayscale opacity-60">
                      <source src={tab.video} type="video/mp4" />
                    </video>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`.font-cormorant { font-family: var(--font-playfair), serif; } .font-inter { font-family: var(--font-playfair), serif; }`}</style>
    </section>
  );
}
