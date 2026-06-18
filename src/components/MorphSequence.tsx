"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MorphSequence({ frames }: { frames?: string[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const localFrameStart = 7;
  const localFrameEnd = 134;
  const useFramesFromProps = Boolean(frames && frames.length > 8);
  const sourceFrameCount = useFramesFromProps ? frames!.length : (localFrameEnd - localFrameStart + 1);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";

    const isMobile =
      window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches;
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const frameStep = 1;
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
        loadNearbyFrames(sequence.frame);
        return;
      }

      for (let i = 1; i < frameCount; i++) loadImage(i);
    };

    const loadNearbyFrames = (center: number) => {
      if (!isMobile) return;

      const preloadRadius = isIOS ? 2 : 3;
      const keepRadius = isIOS ? 4 : 8;

      for (let i = center - preloadRadius; i <= center + preloadRadius; i++) {
        loadImage(i);
      }

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

      const mobileViewport = window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches;
      const ratio = mobileViewport ? Math.min(hRatio, vRatio) : Math.max(hRatio, vRatio);

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
      const mobileViewport =
        window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches;
      const sourceWidth = images[sequence.frame]?.naturalWidth || 1920;
      const sourceHeight = images[sequence.frame]?.naturalHeight || 1080;
      const hRatio = containerWidth / sourceWidth;
      const vRatio = containerHeight / sourceHeight;
      const drawRatio = mobileViewport ? Math.min(hRatio, vRatio) : Math.max(hRatio, vRatio);
      const drawWidth = sourceWidth * drawRatio;
      const drawHeight = sourceHeight * drawRatio;
      // Keep mobile conservative for memory, but let desktop use a Retina backing
      // store so the pinned canvas does not look soft while the sequence scrolls.
      const sourceDprLimit = Math.max(
        1,
        Math.min(2, sourceWidth / drawWidth, sourceHeight / drawHeight)
      );
      const dpr = mobileViewport
        ? Math.min(window.devicePixelRatio || 1, sourceDprLimit)
        : Math.min(window.devicePixelRatio || 1, 2);

      // Set backing store size to device pixels, but keep CSS size at 100% so layout remains unchanged.
      canvasRef.current.width = Math.round(containerWidth * dpr);
      canvasRef.current.height = Math.round(containerHeight * dpr);
      canvasRef.current.style.width = `${containerWidth}px`;
      canvasRef.current.style.height = `${containerHeight}px`;

      // Ensure the drawing context uses the DPR for crisp rendering.
      if (context) {
        context.setTransform(dpr, 0, 0, dpr, 0, 0);
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";
        context.filter = "none";
      }

      render();
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          // 400% is too much scroll room on mobile — the long pin exhausts GPU memory
          // on low-RAM devices while canvas keeps drawing. 220% is sufficient for the
          // full frame sequence and releases the compositor pin much sooner on phones.
          end: isMobile ? "+=220%" : "+=400%",
          scrub: isMobile ? 0.3 : 0.5,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(sequence, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        onUpdate: () => {
          loadImage(sequence.frame);
          loadNearbyFrames(sequence.frame);
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
  }, [frames, sourceFrameCount, useFramesFromProps]);
  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden">
      {/* 
        This image acts as the LCP (Largest Contentful Paint) element for Lighthouse and PageSpeed Insights.
        It loads instantly before the JS canvas initializes, fixing the NO_LCP error and improving FCP.
      */}
      <img
        src={useFramesFromProps && frames && frames[0] ? frames[0] : `/sequence-1/ezgif-frame-${localFrameStart.toString().padStart(3, '0')}.jpg`}
        alt="Macharla Cinematic Sequence"
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{
          // On mobile, the canvas uses 'contain' math for portrait, so we replicate it
          objectFit: "cover"
        }}
      />
      <h1 className="sr-only">Macharla - Premium Wedding Photography</h1>
      
      <canvas
        ref={canvasRef}
        className="relative z-10 block w-full h-full object-cover"
        style={{ imageRendering: "auto" }}
      />
    </section>
  );
}
