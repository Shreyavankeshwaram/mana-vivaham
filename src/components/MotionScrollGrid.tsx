'use client';
import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { urlForImage } from "@/sanity/lib/image";

interface VisualPoetryData {
  title?: string;
  titleItalic?: string;
  subtitle?: string;
  description?: string;
  layer1Images?: any[];
  layer2Images?: any[];
  layer3Images?: any[];
  centerImage?: any;
  bottomTitle?: string;
  bottomSubtitle?: string;
}

export default function MotionScrollGrid({ data }: { data?: VisualPoetryData }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () =>
      setIsMobile(
        window.matchMedia('(pointer: coarse)').matches ||
        window.innerWidth < 768
      );
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end']
  });

  // On touch/mobile: skip all scroll-driven transforms to avoid Safari compositor crash.
  // Static values mirror the "fully revealed" end state so content is always visible.
  const imageScale = useTransform(scrollYProgress, [0, 0.6], isMobile ? [1, 1] : [1.08, 1]);

  const layer1Opacity = useTransform(scrollYProgress, [0.4, 0.9], isMobile ? [1, 1] : [0, 1]);
  const layer1Scale   = useTransform(scrollYProgress, [0.1, 0.9], isMobile ? [1, 1] : [0, 1]);

  const layer2Opacity = useTransform(scrollYProgress, [0.4, 0.85], isMobile ? [1, 1] : [0, 1]);
  const layer2Scale   = useTransform(scrollYProgress, [0.1, 0.85], isMobile ? [1, 1] : [0, 1]);

  const layer3Opacity = useTransform(scrollYProgress, [0.4, 0.8], isMobile ? [1, 1] : [0, 1]);
  const layer3Scale   = useTransform(scrollYProgress, [0.1, 0.8], isMobile ? [1, 1] : [0, 1]);

  // Fallbacks and mappings
  const fallbackLayer1 = [
    "/images/wedding_botanical_1.png",
    "/images/wedding_botanical_1.png",
    "/images/wedding_botanical_1.png",
    "/images/wedding_botanical_1.png",
    "/images/wedding_botanical_1.png",
    "/images/wedding_botanical_1.png"
  ];
  const fallbackLayer2 = [
    "/images/wedding_botanical_1.png",
    "/images/wedding_botanical_1.png",
    "/images/wedding_botanical_1.png",
    "/images/wedding_botanical_1.png",
    "/images/wedding_botanical_1.png",
    "/images/wedding_botanical_1.png"
  ];
  const fallbackLayer3 = [
    "/images/wedding_botanical_1.png",
    "/images/wedding_botanical_1.png"
  ];
  const fallbackCenter = "/images/wedding_botanical_1.png";

  const layer1Urls = fallbackLayer1.map((fallback, idx) => {
    const img = data?.layer1Images?.[idx];
    return img?.asset ? urlForImage(img)?.url() : fallback;
  });
  const layer2Urls = fallbackLayer2.map((fallback, idx) => {
    const img = data?.layer2Images?.[idx];
    return img?.asset ? urlForImage(img)?.url() : fallback;
  });
  const layer3Urls = fallbackLayer3.map((fallback, idx) => {
    const img = data?.layer3Images?.[idx];
    return img?.asset ? urlForImage(img)?.url() : fallback;
  });
  const centerUrl = data?.centerImage?.asset
    ? urlForImage(data.centerImage)?.url()
    : typeof data?.centerImage === "string"
      ? data.centerImage
      : data?.centerImage?.url || data?.centerImage?.asset?.url || fallbackCenter;

  return (
    <div className="motion-scroll-grid-wrapper bg-[#FAF8F5] text-[#2A2A2A] font-sans overflow-clip">
      <style>{`
        .motion-scroll-grid-wrapper {
          --gutter: 2rem;
        }
        @media (max-width: 600px) {
          .motion-scroll-grid-wrapper {
            --gutter: 1rem;
          }
        }
        .msg-header {
          min-height: 100vh;
          display: grid;
          align-content: center;
          max-width: calc(100% - (2 * var(--gutter)));
          padding-left: 48px;
          text-align: left;
        }
        .msg-h2 {
          padding-top: 12px;
        }
        .msg-a {
          color: #2A2A2A;
          text-decoration: underline;
        }
        .msg-fluid {
          font-size: clamp(4rem, 12vw, 11rem);
          line-height: 0.85;
          margin: 0;
        }
        .msg-h2.msg-fluid {
          font-size: clamp(0.5rem, 2vw, 1.5rem);
          padding-top: 48px;
        }
        .msg-section-first {
          position: relative;
          min-height: 240vh; /* Extra height for scroll space */
        }
        .msg-content {
          min-height: 100vh;
          width: 100vw;
          display: flex;
          place-items: center;
          align-content: center;
          position: sticky;
          top: 0;
          overflow: hidden;
          /* NOTE: clip-path: inset(0) has been intentionally removed.
             It caused a hard crash in Safari Mobile (compositor cannot handle
             clip-path + sticky + framer-motion scroll transforms simultaneously).
             overflow:hidden achieves the same visual clipping without crashing. */
        }
        .msg-section-last {
          min-height: 100vh;
          display: grid;
          place-items: center;
        }
        .msg-grid {
          --offset: 0;
          --container-width: 1600px;
          --gap: clamp(10px, 7.35vw, 80px);
          width: var(--container-width);
          max-width: calc(100% - (2 * var(--gutter)));
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          grid-template-rows: repeat(3, auto);
          gap: var(--gap);
          margin: 0 auto;
          align-content: center;
          position: absolute;
          top: 50%;
          left: 50%;
          translate: -50% -50%;
        }
        @media (max-width: 600px) {
          .msg-grid {
            grid-template-columns: repeat(3, 1fr);
            --offset: -1;
          }
          .msg-grid > .msg-layer {
            grid-template-columns: repeat(3, 1fr) !important;
          }
          .msg-grid > .msg-layer:nth-of-type(1) {
            display: none;
          }
        }
        .msg-grid > .msg-layer {
          display: grid;
          grid-column: 1 / -1;
          grid-row: 1 / -1;
          grid-template-columns: repeat(5, 1fr);
          grid-template-rows: repeat(3, auto);
          gap: var(--gap);
          pointer-events: none;
        }
        .msg-grid > .msg-layer:nth-of-type(1) div:nth-of-type(odd) {
          grid-column: 1;
        }
        .msg-grid > .msg-layer:nth-of-type(1) div:nth-of-type(even) {
          grid-column: -2;
        }
        .msg-grid > .msg-layer:nth-of-type(2) div:nth-of-type(odd) {
          grid-column: calc(2 + var(--offset));
        }
        .msg-grid > .msg-layer:nth-of-type(2) div:nth-of-type(even) {
          grid-column: calc(-3 - var(--offset));
        }
        .msg-grid > .msg-layer:nth-of-type(3) div:first-of-type {
          grid-column: calc(3 + var(--offset));
          grid-row: 1;
        }
        .msg-grid > .msg-layer:nth-of-type(3) div:last-of-type {
          grid-column: calc(3 + var(--offset));
          grid-row: -1;
        }
        .msg-grid img {
          width: 100%;
          aspect-ratio: 4 / 5;
          object-fit: cover;
          border-radius: 1rem;
        }
        .msg-grid .msg-scaler {
          position: relative;
          grid-area: 2 / calc(3 + var(--offset));
        }
        .msg-scaler {
          z-index: 2;
          width: 100%;
          aspect-ratio: 4 / 5;
          overflow: hidden;
          border-radius: 1rem;
          background: #E9E2D6;
          position: relative;
        }
        .msg-scaler img {
          position: absolute;
          top: 50%;
          left: 50%;
          translate: -50% -50%;
          object-fit: cover;
          border-radius: inherit;
          width: 100%;
          height: 100%;
          will-change: transform;
        }
        @media (max-width: 600px) {
          .msg-header {
            min-height: 76svh;
            padding-left: 0;
            margin-inline: var(--gutter);
          }
          .msg-section-first {
            min-height: 190vh;
          }
          .msg-section-last {
            min-height: 76svh;
            padding-inline: var(--gutter);
            text-align: center;
          }
          .msg-fluid {
            font-size: clamp(3.6rem, 18vw, 5.4rem);
          }
        }
      `}</style>

      <header className="msg-header relative flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex items-center gap-4 mb-8 md:mb-12"
        >
          <span className="w-12 h-[1px] bg-[#C9A46A]"></span>
          <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#C9A46A] font-sans font-medium">
            {data?.subtitle || "The Signature Collection"}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="msg-fluid font-serif text-[#2A2A2A] tracking-tighter"
        >
          {data?.title || "Visual"} <br />
          <span className="italic text-[#876532] pr-4">{data?.titleItalic || "Poetry."}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-8 md:mt-12 text-[10px] md:text-xs tracking-[0.2em] uppercase text-[#5A5A5A] font-sans max-w-xl leading-relaxed whitespace-pre-line"
        >
          {data?.description || "An immersive curation of our most breathtaking frames.\nWhere tradition meets unparalleled cinematic grandeur."}
        </motion.p>
      </header>

      <main>
        <section ref={sectionRef} className="msg-section-first">
          <div className="msg-content">
            <div className="msg-grid">

              {/* Layer 1: Outer edges (6 images) */}
              <motion.div
                className="msg-layer"
                style={{ opacity: layer1Opacity, scale: layer1Scale, willChange: 'transform, opacity' }}
              >
                <div><img src={layer1Urls[0]} alt="" loading="lazy" decoding="async" /></div>
                <div><img src={layer1Urls[1]} alt="" loading="lazy" decoding="async" /></div>
                <div><img src={layer1Urls[2]} alt="" loading="lazy" decoding="async" /></div>
                <div><img src={layer1Urls[3]} alt="" loading="lazy" decoding="async" /></div>
                <div><img src={layer1Urls[4]} alt="" loading="lazy" decoding="async" /></div>
                <div><img src={layer1Urls[5]} alt="" loading="lazy" decoding="async" /></div>
              </motion.div>

              {/* Layer 2: Inner columns (6 images) */}
              <motion.div
                className="msg-layer"
                style={{ opacity: layer2Opacity, scale: layer2Scale, willChange: 'transform, opacity' }}
              >
                <div><img src={layer2Urls[0]} alt="" loading="lazy" decoding="async" /></div>
                <div><img src={layer2Urls[1]} alt="" loading="lazy" decoding="async" /></div>
                <div><img src={layer2Urls[2]} alt="" loading="lazy" decoding="async" /></div>
                <div><img src={layer2Urls[3]} alt="" loading="lazy" decoding="async" /></div>
                <div><img src={layer2Urls[4]} alt="" loading="lazy" decoding="async" /></div>
                <div><img src={layer2Urls[5]} alt="" loading="lazy" decoding="async" /></div>
              </motion.div>

              {/* Layer 3: Center column top and bottom (2 images) */}
              <motion.div
                className="msg-layer"
                style={{ opacity: layer3Opacity, scale: layer3Scale, willChange: 'transform, opacity' }}
              >
                <div><img src={layer3Urls[0]} alt="" loading="lazy" decoding="async" /></div>
                <div><img src={layer3Urls[1]} alt="" loading="lazy" decoding="async" /></div>
              </motion.div>

              {/* Center scaler image — scale is GPU composited, no layout reflow */}
              <div className="msg-scaler">
                <motion.img
                  src={centerUrl}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  style={{
                    scale: imageScale,
                    opacity: 1,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    translate: '-50% -50%',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '1rem',
                    willChange: 'transform',
                  }}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="msg-section-last flex flex-col items-center justify-center">
          <motion.span
            initial={{ height: 0 }}
            whileInView={{ height: 96 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-[1px] bg-[#C9A46A]/50 mb-8"
          ></motion.span>
          <h2 className="msg-fluid font-serif italic text-[#2A2A2A] tracking-tighter">
            {data?.bottomTitle || "Timeless."}
          </h2>
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#C9A46A] mt-8">
            {data?.bottomSubtitle || "A Mana Vivaham Signature"}
          </span>
        </section>
      </main>
    </div>
  );
}
