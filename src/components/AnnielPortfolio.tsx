"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";

const images = [
  {
    url: "/images/editorial_wedding_1.png",
    title: "The Sculptural Moment",
    category: "EDITORIAL",
    size: "large",
  },
  {
    url: "/images/nature_mood_1.png",
    title: "Ethereal Whispers",
    category: "LANDSCAPE",
    size: "tall",
  },
  {
    url: "/images/editorial_detail_1.png",
    title: "Intimate Silks",
    category: "DETAIL",
    size: "square",
  },
  {
    url: "/images/antigravity.png",
    title: "Celestial Gravity",
    category: "EXPERIMENTAL",
    size: "wide",
  },
];

const AnnielPortfolio = () => {
  return (
    <section className="relative min-h-screen bg-lumus-beige pt-0 pb-32 px-6 md:px-20 overflow-hidden text-lumus-dark">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[150px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-white/5 rounded-full blur-[180px] -z-10" />

      <div className="max-w-[1400px] mx-auto">
        {/* Editorial Heading */}
        <div className="mb-24 flex flex-col items-start space-y-4">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="glass-pill sans-modern"
          >
            A Curated Selection
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl font-serif italic leading-tight"
          >
            Cinematic <br />
            <span className="ml-12 md:ml-32">Perspectives</span>
          </motion.h2>
        </div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          {images.map((img, index) => (
            <PortfolioCard key={index} image={img} index={index} />
          ))}
        </div>

        {/* Storytelling Section */}
        <div className="mt-48 flex flex-col md:flex-row items-center gap-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative w-full md:w-1/2 aspect-[4/5] overflow-hidden rounded-lg group"
          >
            <Image 
              src="/images/nature_mood_1.png" 
              alt="Story image" 
              fill 
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-1000" />
          </motion.div>

          <div className="w-full md:w-1/2 space-y-8">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl font-serif italic"
            >
              Capturing the Unspoken
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-lumus-dark/70 leading-relaxed max-w-md sans-modern"
            >
              Every frame is a dialogue between light and shadow, a silent story waiting to be told. We believe in the luxury of simplicity and the power of an authentic moment.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4 pt-6"
            >
              <div className="h-[1px] w-12 bg-lumus-dark/30" />
              <button className="text-sm uppercase tracking-widest hover:text-white/40 transition-colors">
                Discover the Journey
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PortfolioCard = ({ image, index }: { image: any, index: number }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: "-10%" });
  
  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, index % 2 === 0 ? -100 : 100]);

  // Determine grid span based on size
  const gridClasses = {
    large: "md:col-span-8 md:row-span-2",
    tall: "md:col-span-4 md:row-span-3",
    square: "md:col-span-6 md:row-span-2",
    wide: "md:col-span-12 md:row-span-2",
  }[image.size as "large" | "tall" | "square" | "wide"];

  return (
    <motion.div
      ref={containerRef}
      style={{ y: index > 0 ? y : 0 }}
      className={`relative group ${gridClasses} mb-12`}
    >
      <div className="overflow-hidden rounded-xl bg-[#eee] relative aspect-video md:aspect-auto min-h-[400px]">
        <motion.div
          animate={{ scale: isInView ? 1 : 1.15 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-full w-full"
        >
          <Image
            src={image.url}
            alt={image.title}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Subtle Glow Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </motion.div>

        {/* Floating Glass UI */}
        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
          <div className="glass-card p-4 backdrop-blur-md border border-[#8B1E2D]/10 flex flex-col space-y-1">
            <span className="text-[10px] uppercase tracking-tighter text-lumus-dark/50 sans-modern">{image.category}</span>
            <span className="text-lg font-serif italic text-lumus-dark">{image.title}</span>
          </div>
          <div className="glass-pill hover:bg-white hover:text-black transition-colors cursor-pointer">
            Explore
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnnielPortfolio;
