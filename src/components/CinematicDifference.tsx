"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import { Bodoni_Moda } from "next/font/google";

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
});

function resolveImageUrl(source: any, fallback: string) {
  if (!source) return fallback;
  if (typeof source === "string") return source;
  if (typeof source.url === "string") return source.url;
  if (typeof source.imageUrl === "string") return source.imageUrl;
  if (typeof source.asset?.url === "string") return source.asset.url;

  try {
    if (source.asset || source._type === "image") {
      return urlForImage(source)?.url() || fallback;
    }
  } catch {
    return fallback;
  }

  return fallback;
}

export default function CinematicDifference({ data }: { data?: any }) {
  const [isMobile, setIsMobile] = useState(false);
  const heading = data?.heading;
  const subheading = data?.highlightText;
  const description = data?.description;

  const img1 = resolveImageUrl(data?.image1 || data?.portraitImage || data?.visual1, "");
  const img2 = resolveImageUrl(data?.image2 || data?.featureImage || data?.visual2, "");
  const img3 = resolveImageUrl(data?.image3 || data?.galleryImage1 || data?.visual3, "");
  const img4 = resolveImageUrl(data?.image4 || data?.galleryImage2 || data?.visual4, "");
  const img5 = resolveImageUrl(data?.image5 || data?.galleryImage3 || data?.visual5, "");

  const instagramUrl = data?.instagramUrl || "";
  const caption = data?.caption;
  const bottomCaption = data?.bottomCaption;

  const statsNumber = data?.statsNumber;
  const statsLabel = data?.statsLabel;

  const avatars = (data?.statsAvatars || []).map((img: any) => {
    return resolveImageUrl(img, "");
  }).filter(Boolean);

  const displayAvatars = avatars.length > 0 ? avatars : [];

  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // translateY = GPU composited only, no layout reflow = no lag
  const y1 = useTransform(scrollYProgress, [0, 1], ["0px", "-80px"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0px", "-40px"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0px", "-120px"]);
  const stillY = useTransform(scrollYProgress, [0, 1], ["0px", "0px"]);
  const mobileY1 = isMobile ? stillY : y1;
  const mobileY2 = isMobile ? stillY : y2;
  const mobileY3 = isMobile ? stillY : y3;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const syncMobile = () => setIsMobile(mediaQuery.matches);

    syncMobile();
    mediaQuery.addEventListener("change", syncMobile);

    return () => mediaQuery.removeEventListener("change", syncMobile);
  }, []);

  return (
    <section
      ref={containerRef}
      className={`relative w-full bg-white text-[#1A1A1A] py-16 md:py-24 px-6 md:px-12 overflow-hidden ${bodoniModa.variable}`}
      style={{ fontFamily: "var(--font-playfair), serif" }}
    >
      <div className="max-w-[1600px] mx-auto relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-12 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col gap-2"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-[1px] bg-[#8B1E2D]" />
              <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-[#8B1E2D] font-bold">The Signature Touch</span>
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-none text-[#1A1A1A]">
              {heading} <br />
              <span className="italic text-[#8B1E2D]">{subheading}</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-[#4A4A4A] text-sm md:text-base font-light italic max-w-sm md:text-right border-l md:border-l-0 md:border-r border-[#8B1E2D]/30 pl-4 md:pl-0 md:pr-6"
          >
            {description}
          </motion.p>
        </div>

        {/* 3-Column Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-6">

          {/* Column 1: Stats & Portrait */}
          <div className="contents md:col-span-4 md:flex md:flex-col md:gap-6">

            {/* Stats Card */}
            <motion.div
              style={{ translateY: mobileY1 }}
              className="bg-[#F5F0EB] border border-[#1A1A1A]/5 p-4 md:p-10 flex flex-col justify-center items-center text-center h-[170px] md:h-[300px] relative overflow-hidden group will-change-transform"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,30,45,0.08),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <h3 className="text-4xl md:text-7xl font-serif italic text-[#C5A880] mb-2 md:mb-4">{statsNumber}</h3>
              <p className="text-[#1A1A1A]/50 text-[8px] md:text-[10px] font-mono tracking-widest uppercase mb-4 md:mb-6 leading-relaxed">{statsLabel}</p>
              <div className="flex -space-x-2 md:-space-x-3">
                {displayAvatars.map((url: string, i: number) => (
                  <div key={i} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white overflow-hidden relative">
                    <Image src={url} alt="Client" fill sizes="40px" className="object-cover" />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Portrait 1 */}
            <motion.div
              style={{ translateY: mobileY1 }}
              className="h-[170px] md:h-[520px] relative overflow-hidden group will-change-transform"
            >
              {img1 && (
                <Image
                  src={img1}
                  alt="Cinematic Portrait"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  unoptimized
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-8 left-8 right-8 text-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#C5A880]">{caption}</p>
              </div>
            </motion.div>
          </div>

          {/* Column 2: Center Images + Maroon Quote */}
          <div className="contents md:col-span-4 md:flex md:flex-col md:gap-6 md:mt-12">

            <motion.div
              style={{ translateY: mobileY2 }}
              className="h-[170px] md:h-[360px] relative overflow-hidden group will-change-transform"
            >
              {img3 && (
                <Image
                  src={img3}
                  alt="Gallery Detail 1"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  loading="lazy"
                  unoptimized
                />
              )}
            </motion.div>

            {/* Maroon Quote Block */}
            <motion.div
              style={{ translateY: mobileY2 }}
              className="bg-[#8B1E2D] p-5 md:p-10 flex flex-col justify-center items-center text-center h-[170px] md:h-[250px] relative overflow-hidden will-change-transform"
            >
              <div className="w-10 md:w-12 h-[1px] bg-white/30 mb-4 md:mb-6" />
              <p className="text-white/90 text-sm md:text-xl font-light italic leading-relaxed">
                "{bottomCaption}"
              </p>
              <div className="w-10 md:w-12 h-[1px] bg-white/30 mt-4 md:mt-6" />
            </motion.div>

            <motion.div
              style={{ translateY: mobileY2 }}
              className="h-[170px] md:h-[320px] relative overflow-hidden group will-change-transform"
            >
              {img5 && (
                <Image
                  src={img5}
                  alt="Gallery Detail 2"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  loading="lazy"
                  unoptimized
                />
              )}
            </motion.div>
          </div>

          {/* Column 3: Large Feature + Small Image */}
          <div className="contents md:col-span-4 md:flex md:flex-col md:gap-6 md:-mt-12">

            {/* Large Feature Image with Instagram CTA */}
            <motion.div
              style={{ translateY: mobileY3 }}
              className="h-[170px] md:h-[560px] relative overflow-hidden group cursor-pointer will-change-transform"
            >
              {img2 && (
                <Image
                  src={img2}
                  alt="Feature Showcase"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  priority
                  unoptimized
                />
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 text-white hover:bg-white hover:text-black transition-colors duration-300"
                >
                  <span className="text-[10px] font-mono tracking-widest uppercase">View Instagram</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            <motion.div
              style={{ translateY: mobileY3 }}
              className="h-[170px] md:h-[320px] relative overflow-hidden group will-change-transform"
            >
              {img4 && (
                <Image
                  src={img4}
                  alt="Gallery Detail 3"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  loading="lazy"
                  unoptimized
                />
              )}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
