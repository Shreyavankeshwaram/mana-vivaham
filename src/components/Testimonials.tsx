"use client";

import { useEffect, useRef, useState } from "react";
import { urlForImage } from "@/sanity/lib/image";

export default function Testimonials({ testimonials: cmsTestimonials }: { testimonials?: any[] }) {
  const testimonials = cmsTestimonials || [];
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (!testimonials.length) return;
    const pairMs = 5000;
    let interval: ReturnType<typeof setInterval> | null = null;

    const advance = () => {
      setAnimating(true);
      setTimeout(() => {
        setIndex(i => (i + 2) % testimonials.length);
        setAnimating(false);
      }, 500);
    };

    const start = () => {
      if (interval) clearInterval(interval);
      interval = setInterval(advance, pairMs);
    };

    const stop = () => { if (interval) { clearInterval(interval); interval = null; } };

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start(); else stop();
    }, { threshold: 0.3 });

    if (containerRef.current) obs.observe(containerRef.current);

    containerRef.current?.addEventListener('mouseenter', stop);
    containerRef.current?.addEventListener('mouseleave', start);

    return () => {
      obs.disconnect(); stop();
      containerRef.current?.removeEventListener('mouseenter', stop);
      containerRef.current?.removeEventListener('mouseleave', start);
    };
  }, [testimonials.length]);

  if (!testimonials.length) return null;

  function getImageUrl(profileImage: any): string | null {
    if (!profileImage) return null;
    if (typeof profileImage === 'string') return profileImage;
    try { return urlForImage(profileImage)?.width(120).height(120).url() || null; }
    catch { return null; }
  }

  const t1 = testimonials[index % testimonials.length];
  const t2 = testimonials[(index + 1) % testimonials.length];
  const [expanded, setExpanded] = useState<boolean[]>([false, false]);

  const toggleExpanded = (i: number) => {
    setExpanded(prev => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #1A0F0A 0%, #2C1810 40%, #1A0A0F 70%, #0F0A1A 100%)',
        minHeight: '100vh',
      }}
    >
      {/* Ambient gold glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(197,168,128,0.3) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none opacity-15"
        style={{ background: 'radial-gradient(circle, rgba(139,30,45,0.4) 0%, transparent 70%)' }} />

      {/* Fine horizontal rule lines for editorial feel */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, #C5A880 0px, #C5A880 1px, transparent 1px, transparent 80px)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-32 md:py-40">

        {/* Header */}
        <div className="text-center mb-20 md:mb-28">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#C5A880]" />
            <span className="font-mono text-[9px] tracking-[0.5em] uppercase text-[#C5A880]">Client Love Notes</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#C5A880]" />
          </div>
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-light tracking-tight leading-none">
            Words of <span className="italic text-[#C5A880]">love</span>
          </h2>
          <p className="mt-5 text-white/40 text-sm tracking-widest font-light max-w-sm mx-auto">
            From the hearts we've had the honour to capture forever
          </p>
        </div>

        {/* Cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 transition-all duration-500"
          style={{ opacity: animating ? 0 : 1, transform: animating ? 'translateY(12px)' : 'translateY(0)' }}
        >
          {[t1, t2].map((item, cardIdx) => {
            if (!item) return null;
            const name = item?.clientName || item?.author || '';
            const quote = item?.quote || '';
            const location = item?.location || '';
            const imageUrl = getImageUrl(item?.profileImage);

            return (
              <div
                key={cardIdx}
                className="relative group"
              >
                {/* Card */}
                <div
                  className="relative rounded-[2px] p-8 md:p-10 overflow-hidden border border-white/[0.08] transition-all duration-700 group-hover:border-[#C5A880]/30"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                    backdropFilter: 'blur(20px)',
                  }}
                >
                  {/* Corner gold accent */}
                  <div className="absolute top-0 left-0 w-12 h-12 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-[#C5A880] to-transparent" />
                    <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-[#C5A880] to-transparent" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none">
                    <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-[#C5A880] to-transparent" />
                    <div className="absolute bottom-0 right-0 h-full w-px bg-gradient-to-t from-[#C5A880] to-transparent" />
                  </div>

                  {/* Large decorative quote mark */}
                  <div
                    className="absolute top-4 right-6 font-serif text-8xl text-white/[0.04] leading-none pointer-events-none select-none"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    &ldquo;
                  </div>

                  {/* Card number */}
                  <div className="font-mono text-[9px] tracking-[0.4em] text-[#C5A880]/60 mb-8 uppercase">
                    0{cardIdx + 1} / {testimonials.length.toString().padStart(2, '0')}
                  </div>

                  {/* Quote */}
                  <blockquote
                    className="text-white/80 text-base md:text-lg leading-relaxed font-light mb-4 relative z-10"
                    style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                  >
                    &ldquo;
                    {(() => {
                      const maxLen = 220;
                      const isExpanded = !!expanded[cardIdx];
                      if (quote.length <= maxLen) return quote;
                      if (isExpanded) return quote;
                      return quote.slice(0, maxLen).trimEnd() + '...';
                    })()}
                    &rdquo;
                  </blockquote>

                  {/* Read more / Show less */}
                  {quote.length > 220 && (
                    <div className="mb-6">
                      <button
                        onClick={() => toggleExpanded(cardIdx)}
                        className="text-sm text-[#C5A880] tracking-wider uppercase font-medium"
                        aria-expanded={!!expanded[cardIdx]}
                      >
                        {expanded[cardIdx] ? 'Show less' : 'Read more'}
                      </button>
                    </div>
                  )}

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-[#C5A880]/30 via-[#C5A880]/60 to-transparent mb-6" />

                  {/* Author row */}
                  <div className="flex items-center gap-4">
                    {imageUrl ? (
                      <div className="relative flex-shrink-0">
                        <div className="absolute inset-0 rounded-full ring-1 ring-[#C5A880]/40 ring-offset-2 ring-offset-transparent" />
                        <img
                          src={imageUrl}
                          alt={name}
                          className="w-14 h-14 rounded-full object-cover"
                        />
                      </div>
                    ) : (
                      <div
                        className="w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center border border-[#C5A880]/30"
                        style={{ background: 'linear-gradient(135deg, rgba(197,168,128,0.15), rgba(139,30,45,0.1))' }}
                      >
                        <span className="text-[#C5A880] font-serif text-xl">{name?.charAt(0) || '♥'}</span>
                      </div>
                    )}

                    <div>
                      <div className="text-white font-medium text-sm tracking-wide" style={{ fontFamily: 'serif' }}>
                        {name}
                      </div>
                      {location && (
                        <div className="text-white/40 text-xs tracking-widest font-mono mt-0.5 uppercase">{location}</div>
                      )}
                      <div className="flex mt-1.5 gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-2.5 h-2.5 text-[#C5A880]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.285-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.285-3.957z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-2 mt-12">
          {Array.from({ length: Math.ceil(testimonials.length / 2) }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i * 2)}
              className="transition-all duration-300"
            >
              <div
                className="h-px rounded-full transition-all duration-500"
                style={{
                  width: index === i * 2 ? '32px' : '12px',
                  background: index === i * 2 ? '#C5A880' : 'rgba(255,255,255,0.2)',
                }}
              />
            </button>
          ))}
        </div>

        {/* Bottom label */}
        <div className="text-center mt-16">
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase text-white/20">
            Every love story, documented with reverence
          </p>
        </div>
      </div>
    </section>
  );
}
