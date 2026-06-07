'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Camera, Users, Heart, Sparkles } from 'lucide-react';

const services = [
  {
    id: '01',
    title: 'Events',
    icon: <Camera className="w-5 h-5" />,
    description: 'Capturing every moment of your special occasions, from corporate events to celebrations, with creativity and care.',
    side: 'left'
  },
  {
    id: '02',
    title: 'Family Session',
    icon: <Users className="w-5 h-5" />,
    description: 'Creating natural, heartfelt portraits that celebrate the bond, joy, and togetherness of your family moments.',
    side: 'left'
  },
  {
    id: '03',
    title: 'Weddings',
    icon: <Heart className="w-5 h-5" />,
    description: 'Preserving the love, laughter, and memories of your wedding day through timeless and emotive photography.',
    side: 'right'
  },
  {
    id: '04',
    title: 'Lifestyle',
    icon: <Sparkles className="w-5 h-5" />,
    description: 'Documenting everyday life and personal milestones with an artistic eye, turning ordinary moments into lasting memories.',
    side: 'right'
  }
];

function ServiceCard({ service, index }: { service: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between group">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-12 h-12 flex items-center justify-center rounded-full border border-black/5 group-hover:border-[#8B1E2D]/40 transition-all duration-700 bg-white/30 backdrop-blur-sm">
                <div className="text-lumus-dark group-hover:text-[#8B1E2D] transition-colors duration-500">
                  {service.icon}
                </div>
              </div>
              <div className="absolute inset-0 bg-[#8B1E2D]/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
            <h3 className="text-3xl md:text-4xl font-serif italic group-hover:pl-4 transition-all duration-700">
              {service.title}
            </h3>
          </div>
          <span className="text-[10px] font-mono text-lumus-dark/30 group-hover:text-[#8B1E2D]/60 transition-colors">
            {service.id}
          </span>
        </div>

        <div className="pl-[72px] relative">
          <div className="absolute left-[23px] top-0 bottom-0 w-[1px] bg-black/5 group-hover:bg-[#8B1E2D]/20 transition-colors duration-1000" />
          <p className="text-lumus-dark/60 text-lg leading-relaxed font-serif italic font-light group-hover:text-lumus-dark transition-colors duration-700">
            {service.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1]);

  return (
    <section
      ref={containerRef}
      className="relative py-48 px-6 md:px-12 lg:px-24 bg-[#E7DFC8] text-lumus-dark overflow-hidden border-t border-black/5"
    >
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -rotate-90 opacity-[0.03] select-none pointer-events-none hidden xl:block">
        <span className="text-[200px] font-serif italic whitespace-nowrap leading-none">
          SERVICES // STUDY
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center mb-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-[1px] bg-[#8B1E2D]/40" />
            <span className="text-[10px] tracking-[0.6em] uppercase font-black text-[#8B1E2D]">Service Catalog</span>
            <div className="w-12 h-[1px] bg-[#8B1E2D]/40" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl font-serif italic leading-[0.9] tracking-tighter mb-10"
          >
            How i can <br /> <span className="ml-12 md:ml-32">help you</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="text-lg md:text-2xl text-lumus-dark/70 max-w-2xl font-serif italic font-light leading-relaxed"
          >
            I capture authentic moments & emotions, turning your special occasions into timeless memories you'll cherish forever.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center">
          <div className="lg:col-span-4 space-y-12 lg:pr-12">
            {services.filter(s => s.side === 'left').map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>

          <div className="lg:col-span-4 relative flex justify-center py-12 lg:py-0">
            <div className="relative w-full aspect-[3/4] max-w-[420px] group">
              <div className="absolute -inset-4 border border-[#8B1E2D]/10 rounded-[2rem] -z-10 group-hover:border-[#8B1E2D]/30 transition-all duration-1000" />
              <motion.div
                style={{ y: imageY, scale: imageScale }}
                className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-black/20"
              >
                <Image
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1974&auto=format&fit=crop"
                  alt="Service Detail"
                  fill
                  className="object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-1000" />
                <div className="absolute bottom-6 left-6 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                  <span className="text-[8px] text-white/60 font-mono tracking-widest uppercase">Perspective Control</span>
                  <span className="text-xs text-white font-serif italic">Natural Light Study</span>
                </div>
              </motion.div>
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#8B1E2D]/40 -translate-x-2 -translate-y-2 rounded-tl-lg" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#8B1E2D]/40 translate-x-2 translate-y-2 rounded-br-lg" />
            </div>
          </div>

          <div className="lg:col-span-4 space-y-12 lg:pl-12">
            {services.filter(s => s.side === 'right').map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index + 2} />
            ))}
          </div>
        </div>

        <div className="mt-32 flex justify-center">
          <div className="flex items-center gap-8 opacity-30 group cursor-help">
            <span className="text-[10px] font-mono tracking-widest">ISO 100</span>
            <div className="w-1 h-1 rounded-full bg-[#8B1E2D]" />
            <span className="text-[10px] font-mono tracking-widest">SHUTTER 1/250</span>
            <div className="w-1 h-1 rounded-full bg-[#8B1E2D]" />
            <span className="text-[10px] font-mono tracking-widest">APERTURE F/1.4</span>
          </div>
        </div>
      </div>
    </section>
  );
}
