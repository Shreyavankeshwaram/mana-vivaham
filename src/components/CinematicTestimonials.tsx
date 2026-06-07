"use client";

import React from "react";
import { motion } from "framer-motion";

export default function CinematicTestimonials({ testimonials = [] }: { testimonials?: any[] }) {
  if (!testimonials?.length) return null;

  return (
    <section className="relative w-full bg-[#E8E1D3] py-32 px-6 md:px-12 lg:px-24 overflow-hidden border-t border-black/5">
      <div className="max-w-[1200px] mx-auto text-center">
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="w-8 h-[1px] bg-[#1a1a1a]/20" />
          <span className="text-[10px] md:text-xs font-sans tracking-[0.4em] uppercase font-bold opacity-40">
            Voices of Devotion
          </span>
          <div className="w-8 h-[1px] bg-[#1a1a1a]/20" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="text-3xl font-serif text-[#8B1E2D]/20 mb-6 font-bold leading-none">“</div>
              <p className="text-xl md:text-2xl font-serif italic text-lumus-dark leading-relaxed mb-8">
                {item.quote}
              </p>
              <div className="w-6 h-[1px] bg-[#8B1E2D]/20 mb-4" />
              <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-lumus-dark/60">
                {item.author}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Decorative SVG quote marks in background */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none">
        <span className="text-[300px] font-serif font-black text-[#8B1E2D]">“</span>
      </div>
      <div className="absolute top-1/2 right-10 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none">
        <span className="text-[300px] font-serif font-black text-[#8B1E2D]">”</span>
      </div>
    </section>
  );
}
