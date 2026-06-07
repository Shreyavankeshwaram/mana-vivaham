"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { urlForImage } from "@/sanity/lib/image";

export default function PortfolioCollections({ galleries: cmsGalleries = [] }: { galleries?: any[] }) {
  const galleries = cmsGalleries || [];
  if (!galleries.length) return null;

  return (
    <section className="relative w-full bg-white py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
          <div className="space-y-4">
            <span className="text-[10px] tracking-[0.5em] uppercase font-bold text-[#8B1E2D]/40">Curation</span>
            <h2 className="text-5xl md:text-8xl font-serif text-lumus-dark leading-none tracking-tighter">
              Archive <span className="italic font-light text-lumus-dark/40">of Emotion</span>
            </h2>
          </div>
          <div className="h-[1px] bg-lumus-dark/10 w-full md:w-1/3 mb-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
          {galleries.map((gallery, i) => {
            const coverImage = gallery.mainImage?.asset
              ? urlForImage(gallery.mainImage)?.url()
              : (gallery.images?.[0]?.asset ? urlForImage(gallery.images[0])?.url() : null);

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm mb-8 bg-zinc-100 grayscale group-hover:grayscale-0 transition-all duration-[1.5s]">
                  {coverImage ? (
                    <Image
                      src={coverImage}
                      alt={gallery.title}
                      fill
                      className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-zinc-200" />
                  )}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-1000" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-3xl font-serif text-lumus-dark group-hover:text-[#8B1E2D] transition-colors duration-500">
                      {gallery.title}
                    </h3>
                    <span className="text-[10px] font-mono text-lumus-dark/30">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-lumus-dark/40">{gallery.location}</span>
                    <div className="w-1.5 h-[1px] bg-lumus-dark/20" />
                    <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-lumus-dark/40">{gallery.year}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
