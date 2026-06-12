"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { urlForImage } from "@/sanity/lib/image";
import { ArrowUpRight } from "lucide-react";

export default function EditorialJournal({ data, posts }: { data?: any, posts?: any[] }) {
  const heading = data?.heading || "Journal";
  const subheading = data?.subheading || "Stories from behind the lens";

  // Fallback posts if nothing is in Sanity yet
  const displayPosts = (posts && posts.length > 0) ? posts : [
    {
      title: "The Golden Hour Aesthetic",
      excerpt: "Why the moments just before sunset provide the most immaculate lighting for editorial wedding portraits.",
      author: "Mana Vivaham",
      publishedAt: new Date().toISOString(),
      slug: { current: "golden-hour-aesthetic" },
      fallbackImage: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1974&auto=format&fit=crop"
    },
    {
      title: "Archiving the Haldi",
      excerpt: "Exploring the playful chaos of pre-wedding rituals through a cinematic perspective.",
      author: "Studio Director",
      publishedAt: new Date().toISOString(),
      slug: { current: "archiving-the-haldi" },
      fallbackImage: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Film vs Digital",
      excerpt: "The tangible romance of 35mm film in modern luxury wedding storytelling.",
      author: "Mana Vivaham",
      publishedAt: new Date().toISOString(),
      slug: { current: "film-vs-digital" },
      fallbackImage: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop"
    }
  ];

  return (
    <section className="w-full bg-[#E8E1D3] py-24 md:py-32 px-6 md:px-12 relative z-20">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-[1px] bg-[#8B1E2D]" />
              <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-[#8B1E2D] font-bold">
                Editorial
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-playfair font-light text-[#1A1110]">
              {heading}
            </h2>
            <p className="font-playfair italic text-[#8B1E2D] text-xl md:text-2xl mt-2">
              {subheading}
            </p>
          </motion.div>

          <motion.a 
            href="/journal"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="group flex items-center gap-3 border-b border-[#1A1110]/20 pb-2 hover:border-[#8B1E2D] transition-colors"
          >
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#1A1110] group-hover:text-[#8B1E2D] transition-colors">
              Read All Stories
            </span>
            <ArrowUpRight className="w-4 h-4 text-[#1A1110] group-hover:text-[#8B1E2D] transition-colors" />
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {displayPosts.map((post: any, i: number) => {
            const date = new Date(post.publishedAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            });

            return (
              <motion.article 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.8 }}
                className="group cursor-pointer flex flex-col"
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden mb-6 bg-[#D8D1C3]">
                  {post.mainImage || post.fallbackImage ? (
                    <Image 
                      src={post.mainImage ? urlForImage(post.mainImage)?.url() || "" : post.fallbackImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-1000 group-hover:scale-105 filter grayscale hover:grayscale-0"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center opacity-30">
                      <span className="font-playfair italic text-2xl text-[#8B1E2D]">Mana Vivaham</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <div className="flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-[10px] uppercase font-mono tracking-widest text-[#8B1E2D] mb-4">
                    <span>{date}</span>
                    <span className="w-1 h-1 rounded-full bg-[#8B1E2D]" />
                    <span>{post.author || "Editorial"}</span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-playfair mb-4 text-[#1A1110] group-hover:text-[#8B1E2D] transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-[#1A1110]/70 text-sm leading-relaxed mb-6 flex-1">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-2 mt-auto">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#1A1110]/50 group-hover:text-[#8B1E2D] transition-colors">
                      Read Story
                    </span>
                    <div className="w-4 h-[1px] bg-[#1A1110]/30 group-hover:bg-[#8B1E2D] group-hover:w-8 transition-all duration-300" />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
