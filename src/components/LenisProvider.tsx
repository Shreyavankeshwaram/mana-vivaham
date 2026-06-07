"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.08,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });
    const lenisWindow = window as typeof window & { __manaLenis?: Lenis };
    lenisWindow.__manaLenis = lenis;

    const handleScroll = () => ScrollTrigger.update();
    const handleNavigation = (event: Event) => {
      const navigationEvent = event as CustomEvent<{ target?: string; offset?: number }>;
      const target = navigationEvent.detail?.target
        ? document.querySelector<HTMLElement>(navigationEvent.detail.target)
        : null;

      if (!target) return;

      navigationEvent.preventDefault();
      lenis.scrollTo(target, {
        offset: navigationEvent.detail?.offset ?? -96,
        duration: 1.05,
      });
    };

    lenis.on("scroll", handleScroll);
    window.addEventListener("mana:navigate", handleNavigation);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      gsap.ticker.remove(raf);
      lenis.off("scroll", handleScroll);
      window.removeEventListener("mana:navigate", handleNavigation);
      if (lenisWindow.__manaLenis === lenis) {
        delete lenisWindow.__manaLenis;
      }
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <style>{`
        html {
          min-height: 100%;
          overflow-y: auto;
        }

        body {
          min-height: 100%;
          overflow-x: clip !important;
        }

        html.lenis,
        html.lenis body {
          height: auto;
        }

        .lenis.lenis-smooth {
          scroll-behavior: auto !important;
        }

        .lenis.lenis-smooth [data-lenis-prevent] {
          overscroll-behavior: contain;
        }

        .lenis.lenis-stopped {
          overflow: clip;
        }

        .lenis.lenis-smooth iframe {
          pointer-events: none;
        }
      `}</style>
      {children}
    </>
  );
}
