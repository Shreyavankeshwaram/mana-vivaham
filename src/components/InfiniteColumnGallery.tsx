"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { urlForImage } from "@/sanity/lib/image";

// Removed FALLBACK_IMAGES

interface InfiniteColumnGalleryProps {
  images?: any[];
  columns?: number;
  scrollHeight?: string; // how long user scrolls through this section
}

function resolveGalleryImage(source: any) {
  if (!source) return "";
  if (typeof source === "string") return source;
  if (typeof source.url === "string") return source.url;
  if (typeof source.asset?.url === "string") return source.asset.url;

  try {
    if (source.asset || source._type === "image") {
      return urlForImage(source)?.width(520).height(520).url() || "";
    }
  } catch {
    return "";
  }

  return "";
}

export default function InfiniteColumnGallery({
  images = [],
  columns = 5,
  scrollHeight = "340vh",
}: InfiniteColumnGalleryProps) {
  const wrapperRef = useRef<HTMLDivElement>(null); // tall scroll container
  const stickyRef = useRef<HTMLDivElement>(null);  // sticky 100vh viewport
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [activeColumns, setActiveColumns] = useState(columns);

  // Map CMS image objects to URLs
  const processedImages = (images || [])
    .map(resolveGalleryImage)
    .filter(Boolean);

  // Duplicate images to keep every column filled while the sticky grid moves.
  let expandedImages = [...processedImages];
  const isMobileLayout = activeColumns < columns;
  const cardsPerColumn = isMobileLayout ? 8 : 16;
  const targetImageCount = activeColumns * cardsPerColumn;
  
  if (processedImages.length > 0) {
    while (expandedImages.length < targetImageCount) {
      expandedImages = [...expandedImages, ...processedImages];
    }
  }

  const columnData = Array.from({ length: activeColumns }, (_, i) =>
    expandedImages.filter((_, idx) => idx % activeColumns === i).slice(0, cardsPerColumn)
  );

  useEffect(() => {
    setIsMounted(true);
    const syncColumns = () => {
      setActiveColumns(window.innerWidth < 640 ? Math.min(2, columns) : columns);
    };
    syncColumns();
    window.addEventListener("resize", syncColumns);
    return () => window.removeEventListener("resize", syncColumns);
  }, [columns]);

  useEffect(() => {
    if (!isMounted || !processedImages.length) return;

    gsap.registerPlugin(ScrollTrigger);
    let ctx: gsap.Context | undefined;

    // Wait for DOM to render column heights
    const t = setTimeout(() => {
      if (!wrapperRef.current || !stickyRef.current) return;

      ctx = gsap.context(() => {
        columnRefs.current.forEach((col, i) => {
          if (!col) return;

          // The column scrolls either up (reverse) or down (forwards) as user scrolls
          const isReverse = i % 2 === 0;

          // Calculate how much the column can travel
          // Column height minus the 100vh sticky viewport = total travel distance
          const colH = col.scrollHeight;
          const viewH = window.innerHeight;
          const travel = Math.max(0, colH - viewH);

          gsap.set(col, {
            y: isReverse ? 0 : -travel,
            force3D: true,
          });

          gsap.to(col, {
            y: isReverse ? -travel : 0,
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        });
      }, stickyRef);
    }, 300);

    return () => {
      clearTimeout(t);
      ctx?.revert();
    };
  }, [isMounted, activeColumns, processedImages.length]);

  if (!isMounted || !processedImages.length) return null;

  return (
    // ── Outer wrapper: tall, creates the scroll room ──────────────────────
    <div ref={wrapperRef} style={{ height: isMobileLayout ? "180vh" : scrollHeight }} className="relative w-full">

      {/* ── Inner: sticky, stays in viewport while user scrolls through wrapper ── */}
      <div ref={stickyRef} className="sticky top-0 w-full h-screen overflow-hidden bg-black">
        {/* Column grid */}
        <div className="flex gap-2 w-full h-full items-start px-2">
          {columnData.map((colImages, colIndex) => (
            <div
              key={colIndex}
              ref={(el) => { columnRefs.current[colIndex] = el; }}
              className="flex flex-col gap-2 w-full will-change-transform transform-gpu"
            >
              {colImages.map((src, cardIndex) => (
                <div
                  key={`${colIndex}-${cardIndex}`}
                  className="gallery-card relative w-full aspect-square flex-shrink-0 bg-[#222] overflow-hidden [contain:paint]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt="Album Cover"
                    loading={cardIndex < 4 ? "eager" : "lazy"}
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
