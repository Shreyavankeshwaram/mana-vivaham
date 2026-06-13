"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
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

export default function CapturedServices({ data }: { data?: any }) {
  const fallbackServices = [
    {
      title: "Cinematic Films",
      tagline: "4K EDITORIAL MASTER",
      description: "Every frame is composed with an editorial eye, bringing high-fashion aesthetics to raw, authentic moments.",
      image: "https://images.unsplash.com/photo-1541250848049-b4f7141dca3f?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Editorial Photography",
      tagline: "NATURAL LIGHT PERSPECTIVE",
      description: "Crafted with intentionality and light, turning candid emotions into timeless fine-art portraiture.",
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Destination Weddings",
      tagline: "GLOBAL CANVAS",
      description: "Whether in an Italian villa or a royal palace in Rajasthan, we travel globally to document your legacy.",
      image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Pre-Wedding Portraits",
      tagline: "INTIMATE NARRATIVES",
      description: "Styled like a Vogue cover shoot. We create breathtaking imagery of your bond before the big day.",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Heirloom Albums",
      tagline: "PHYSICAL LEGACY",
      description: "Bespoke, handcrafted leather-bound albums printed on archival museum-grade fine-art paper.",
      image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Super-8 Vintage",
      tagline: "ANALOG NOSTALGIA",
      description: "For lovers of classic romance, we bring actual vintage 8mm film cameras for authentic nostalgic moments.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop",
    }
  ];

  const cmsServices = data?.servicesList || [];
  const description = data?.description;

  // Always ensure exactly 6 items for the layout
  const services = Array.from({ length: 6 }).map((_, index) => {
    const s = cmsServices[index] || {};
    const fallback = fallbackServices[index];
    
    return {
      id: String(index + 1).padStart(2, '0'),
      title: s.title || fallback.title,
      tagline: s.tagline || fallback.tagline,
      description: s.description || fallback.description,
      image: resolveImageUrl(
        s.image || s.thumbnail || s.thumbnailImage || s.serviceImage || s.photo,
        fallback.image
      ),
    };
  });

  const renderHeading = () => {
    if (!data?.heading) {
      return null;
    }
    const words = data.heading.split(' ');
    if (words.length > 2) {
      const mid = Math.ceil(words.length / 2);
      const firstLine = words.slice(0, mid).join(' ');
      const secondLine = words.slice(mid).join(' ');
      return (
        <span className="flex flex-col gap-2 md:gap-4">
          <span className="text-white whitespace-nowrap">{firstLine}</span>
          <span className="text-[#8B1E2D] italic font-medium whitespace-nowrap">{secondLine}</span>
        </span>
      );
    }
    return data.heading;
  };

  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const lineScale = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const bgImageObj = data?.backgroundImage;

  const bgImageUrl = resolveImageUrl(bgImageObj, services[2]?.image || fallbackServices[2].image);

  return (
    <section
      ref={containerRef}
      className={`relative w-full bg-[#050505] text-white overflow-hidden pt-16 pb-24 md:pt-24 md:pb-40 ${bodoniModa.variable}`}
      style={{ fontFamily: "var(--font-playfair), serif" }}
    >
      {/* Premium Background Image (Parallax) */}
      <motion.div
        style={{
          y: bgY,
          backgroundImage: `url('${bgImageUrl}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="absolute -top-[15%] -bottom-[15%] left-0 right-0 opacity-[0.35] pointer-events-none select-none grayscale contrast-[1.2]"
      />

      {/* Fixed Gradient Overlays (prevents hard edges at top/bottom without hiding the middle) */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-0" />

      {/* Super Premium Noise/Grain */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-10 bg-[url('/noise.svg')]" />

      <div className="relative z-20 max-w-[1500px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-20">

        {/* Left Content */}
        <div className="md:col-span-5 md:pr-10 lg:pr-24 flex flex-col justify-start pt-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-12"
          >
            <div className="w-10 h-[1px] bg-white/20" />
            <span className="text-[10px] font-mono tracking-[0.6em] uppercase text-white/40">Our Capabilities</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-serif font-light tracking-tight mb-12 leading-none"
          >
            {renderHeading()}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="text-xl md:text-2xl text-white font-light leading-relaxed max-w-sm border-l border-white/20 pl-8 mb-20"
          >
            {description}
          </motion.p>

          {/* Technical Metadata */}
          <div className="hidden md:flex flex-col gap-6 opacity-[0.08] text-[9px] font-mono uppercase tracking-[0.5em] mt-auto pb-10">
            <span>35MM PRIME OPTICS / MASTER STUDY</span>
            <span>NATURAL LIGHT PERSPECTIVE // 2026</span>
          </div>
        </div>

        {/* Right Grid (Straight Lines & Small Boxes) */}
        <div className="md:col-span-7 relative">

          {/* Main Vertical Separator (Animated) */}
          <motion.div
            style={{ scaleY: lineScale, transformOrigin: "top" }}
            className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/10 hidden md:block"
          />

          {/* Middle Vertical Separator (Animated) */}
          <motion.div
            style={{ scaleY: lineScale, transformOrigin: "top" }}
            className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/10 hidden md:block"
          />

          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Box 01 */}
            <div className="relative border-b border-white/10 hidden md:block" />
            <div className="relative border-b border-white/10">
              <ServiceCard service={services[0]} index="01" />
            </div>

            {/* Box 02 & 04 */}
            <div className="relative border-b border-white/10">
              <ServiceCard service={services[1]} index="02" />
            </div>
            <div className="relative border-b border-white/10">
              <ServiceCard service={services[3]} index="04" />
            </div>

            {/* Box 03 & 05 */}
            <div className="relative border-b border-white/10">
              <ServiceCard service={services[2]} index="03" />
            </div>
            <div className="relative border-b border-white/10">
              <ServiceCard service={services[4]} index="05" />
            </div>

            {/* Box 06 */}
            <div className="md:col-start-2">
              <ServiceCard service={services[5]} index="06" />
            </div>

          </div>
        </div>

      </div>

      {/* Decorative Bottom Bar */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-12 opacity-[0.05] text-[9px] font-mono uppercase tracking-[0.7em] whitespace-nowrap">
        <span>ISO 100</span>
        <div className="w-[1px] h-3 bg-white" />
        <span>F/1.2 CINEMATIC GUIDE</span>
        <div className="w-[1px] h-3 bg-white" />
        <span>4K EDITORIAL MASTER</span>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: any, index: string }) {
  if (!service) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="p-6 md:p-8 group hover:bg-white/[0.03] transition-all duration-700 relative overflow-hidden h-full flex flex-col group"
    >
      {/* Box Glassmorphism/Glow Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.03),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

      <div className="relative z-10 mb-8 aspect-[4/3] w-full overflow-hidden rounded-sm border border-white/10 bg-white/[0.03] shadow-2xl">
        {service.image ? (
          <Image
            src={service.image}
            alt={service.title || "Service image"}
            fill
            className="object-cover md:grayscale opacity-100 md:opacity-80 transition-all duration-[1500ms] md:group-hover:scale-105 md:group-hover:grayscale-0 md:group-hover:opacity-100"
            sizes="(max-width: 768px) 100vw, 30vw"
          />
        ) : (
          <div className="w-full h-full bg-white/5" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/50 pointer-events-none" />
        <span className="absolute bottom-4 right-4 text-xs font-mono text-white/50 group-hover:text-white transition-colors">
          {index}
        </span>
      </div>

      <div className="relative z-10 mt-auto">
        <span className="text-[10px] md:text-[8px] font-mono tracking-[0.4em] md:tracking-[0.5em] uppercase text-[#C5A880] md:text-white/30 mb-3 block opacity-100 md:opacity-0 md:group-hover:opacity-100 md:translate-y-2 md:group-hover:translate-y-0 transition-all duration-500">
          {service.tagline}
        </span>
        <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 text-white md:group-hover:pl-2 transition-all duration-700">
          {service.title}
        </h3>
        <p className="text-white/90 md:text-white font-light leading-relaxed text-sm md:text-base md:group-hover:text-white transition-colors duration-700">
          {service.description}
        </p>
      </div>

      <div className="absolute left-0 bottom-0 w-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:w-full transition-all duration-[2000ms]" />
    </motion.div>
  );
}
