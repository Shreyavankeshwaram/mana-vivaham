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
    // If Sanity provides only a very small number of frames (for example a single
    // placeholder image), prefer the local frames stored in `public/sequence-1`.
    const useFramesFromProps = Boolean(frames && frames.length > 8);
    const sourceFrameCount = useFramesFromProps ? frames!.length : (localFrameEnd - localFrameStart + 1);
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const frameStep = isMobile ? 3 : 1;
    const frameCount = Math.ceil(sourceFrameCount / frameStep);
    const currentFrame = (index: number) => {
      const sourceIndex = Math.min(index * frameStep, sourceFrameCount - 1);
      if (useFramesFromProps && frames && frames[sourceIndex]) return frames[sourceIndex];
      // Match local pattern in public/sequence-1/ezgif-frame-XXX.jpg
      // and offset to existing files.
      const frameNum = (sourceIndex + localFrameStart).toString().padStart(3, '0');
      return `/sequence-1/ezgif-frame-${frameNum}.jpg`;
    };

    const images: Array<HTMLImageElement | undefined> = new Array(frameCount);
    const sequence = {
      frame: 0,
    };

    let rafId: number;
    let timerId: NodeJS.Timeout;
    let firstLoaded = false;
    let cancelled = false;

    const loadImage = (index: number) => {
      if (cancelled || index < 0 || index >= frameCount || images[index]) return;

      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        if (index === sequence.frame && img.complete && img.naturalWidth > 0) {
          render();
        }
      };
      img.src = currentFrame(index);
      images[index] = img;
    };

    const loadRemainingImages = () => {
      if (isMobile) {
        for (let i = 1; i <= Math.min(frameCount - 1, 4); i++) loadImage(i);
        return;
      }

      for (let i = 1; i < frameCount; i++) loadImage(i);
    };

    const loadNearbyMobileFrames = (center: number) => {
      if (!isMobile) return;

      const radius = isIOS ? 1 : 3; // Absolute minimum for iOS memory stability
      for (let i = center - radius; i <= center + radius; i++) loadImage(i);

      const keepRadius = isIOS ? 2 : 7; // Drop old frames instantly on iOS
      for (let i = 0; i < images.length; i++) {
        if (images[i] && Math.abs(i - center) > keepRadius) {
          images[i]!.src = "";
          images[i] = undefined;
        }
      }
    };

    const loadFirstFrame = () => {
      const img = new Image();
      img.decoding = "async";
      const onFirstLoad = () => {
        if (firstLoaded) return;
        firstLoaded = true;
        if (img.decode) {
          img.decode().then(render).catch(render);
        } else {
          render();
        }
        rafId = requestAnimationFrame(() => {
          timerId = setTimeout(loadRemainingImages, 150);
        });
      };

      img.onload = onFirstLoad;
      img.src = currentFrame(0);
      images[0] = img;

      if (img.complete && img.naturalWidth > 0) {
        onFirstLoad();
      }
    };

    loadFirstFrame();

    function render() {
      if (!canvas || !context) return;

      // Calculate aspect ratio to cover canvas using CSS pixel sizes (not backing store)
      const img = images[sequence.frame];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      // Use exact window dimensions since the section is mathematically `w-full h-screen`
      // This bypasses React hydration / layout reflow race conditions on client navigation.
      const cssWidth = window.innerWidth;
      const cssHeight = window.innerHeight;

      const hRatio = cssWidth / img.naturalWidth;
      const vRatio = cssHeight / img.naturalHeight;

      const mobileViewport = window.innerWidth < 768;
      let ratio = mobileViewport ? Math.min(hRatio, vRatio) * 0.85 : Math.max(hRatio, vRatio);

      const centerShift_x = (cssWidth - img.naturalWidth * ratio) / 2;
      const centerShift_y = (cssHeight - img.naturalHeight * ratio) / 2;

      // Clear using CSS coords — the context has been transformed to DPR in setCanvasSize()
      context.clearRect(0, 0, cssWidth, cssHeight);
      context.drawImage(
        img,
        0, 0, img.naturalWidth, img.naturalHeight,
        centerShift_x, centerShift_y, img.naturalWidth * ratio, img.naturalHeight * ratio
      );
    }

    const setCanvasSize = () => {
      if (!canvasRef.current || !containerRef.current) return;
      // Use window dimensions directly to avoid client-side navigation layout delay bugs
      const containerWidth = window.innerWidth;
      const containerHeight = window.innerHeight;
      // Cap DPR to 1 on mobile and 1.5 on desktop to prevent massive GPU throttling
      const maxDpr = isMobile ? 1 : 1.5;
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);

      // Set backing store size to device pixels, but keep CSS size at 100% so layout remains unchanged.
      canvasRef.current.width = Math.round(containerWidth * dpr);
      canvasRef.current.height = Math.round(containerHeight * dpr);
      canvasRef.current.style.width = `${containerWidth}px`;
      canvasRef.current.style.height = `${containerHeight}px`;

      // Ensure the drawing context uses the DPR for crisp rendering.
      if (context) context.setTransform(dpr, 0, 0, dpr, 0, 0);

      render();
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
        onUpdate: () => {
          loadNearbyMobileFrames(sequence.frame);
          render();
        },
      });

    }, containerRef);

    return () => {
      cancelled = true;
      window.removeEventListener("resize", setCanvasSize);
      ctx.revert();
      if (rafId) cancelAnimationFrame(rafId);
      if (timerId) clearTimeout(timerId);
      images.forEach((img, index) => {
        if (img) img.src = "";
        images[index] = undefined;
      });
    };
  }, [frames]);
  return (
    <section ref={containerRef} className="relative w-full h-screen bg-lumus-beige overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover will-change-transform transform-gpu"
      />
    </section>
  );
}
