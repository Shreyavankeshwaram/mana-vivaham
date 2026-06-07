"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MorphSequence({ frames }: { frames?: string[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    // Local fallback frames currently start from 007 (001-006 are missing),
    // so map indices safely to avoid initial blank/404 flashes.
    const localFrameStart = 7;
    const localFrameEnd = 134;
    const frameCount = frames && frames.length > 0 ? frames.length : (localFrameEnd - localFrameStart + 1);
    const currentFrame = (index: number) => {
      if (frames && frames[index]) return frames[index];
      // Match local pattern in public/sequence-1/ezgif-frame-XXX.jpg
      // and offset to existing files.
      const frameNum = (index + localFrameStart).toString().padStart(3, '0');
      return `/sequence-1/ezgif-frame-${frameNum}.jpg`;
    };

    const images: HTMLImageElement[] = [];
    const sequence = {
      frame: 0,
    };

    // Preload images
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.onload = () => {
        if (i === sequence.frame) {
          render();
        }
      };
      img.src = currentFrame(i);
      images.push(img);
    }

    // If the active image is already cached and loaded, render it immediately
    if (images[0] && images[0].complete) {
      render();
    }

    function render() {
      if (!canvas || !context) return;

      // Calculate aspect ratio to cover canvas
      const img = images[sequence.frame];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const hRatio = canvas.width / img.naturalWidth;
      const vRatio = canvas.height / img.naturalHeight;

      // On mobile (portrait), 'cover' (Math.max) cuts off the sides of the horizontal logo.
      // Use 'contain' (Math.min) for mobile, and 'cover' for desktop.
      const isMobile = window.innerWidth < 768;
      let ratio = isMobile ? Math.min(hRatio, vRatio) : Math.max(hRatio, vRatio);

      // Slightly scale down on mobile to give the logo some breathing room from the edges
      if (isMobile) {
        ratio *= 0.85;
      }

      const centerShift_x = (canvas.width - img.naturalWidth * ratio) / 2;
      const centerShift_y = (canvas.height - img.naturalHeight * ratio) / 2;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(
        img,
        0, 0, img.naturalWidth, img.naturalHeight,
        centerShift_x, centerShift_y, img.naturalWidth * ratio, img.naturalHeight * ratio
      );
    }

    const setCanvasSize = () => {
      if (canvasRef.current) {
        const dpr = window.devicePixelRatio || 1;
        canvasRef.current.width = window.innerWidth * dpr;
        canvasRef.current.height = window.innerHeight * dpr;
        render();
      }
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: isMobile ? "+=260%" : "+=400%",
          scrub: 0.5,
          pin: true,
        },
      });

      tl.to(sequence, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        onUpdate: render,
      });

      // Slight scale increase effect on canvas during scroll
      tl.to(canvas, {
        scale: 1.1,
        ease: "none",
        duration: tl.duration()
      }, 0);

    }, containerRef);

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      ctx.revert();
    };
  }, [frames]);
  return (
    <section ref={containerRef} className="relative w-full h-screen bg-lumus-beige overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
      />
    </section>
  );
}
