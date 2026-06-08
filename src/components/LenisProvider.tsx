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
      // 0.1 is the Lenis-recommended default; 0.08 felt sluggish and caused
      // visible lag on lower-end devices.
      lerp: 0.1,
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

    // GSAP ticker provides time in seconds — Lenis.raf() wants milliseconds
    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Single deferred refresh — enough for first paint
    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      clearTimeout(refreshTimer);
      gsap.ticker.remove(raf);
      lenis.off("scroll", handleScroll);
      window.removeEventListener("mana:navigate", handleNavigation);
      if (lenisWindow.__manaLenis === lenis) {
        delete lenisWindow.__manaLenis;
      }
      lenis.destroy();
    };
  }, []);

  // NOTE: All Lenis-related CSS lives in globals.css to avoid duplicate rule
  // injection on every render. The inline <style> block has been removed.
  return <>{children}</>;
}
