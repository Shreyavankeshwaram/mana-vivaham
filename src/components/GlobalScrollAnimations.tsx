"use client";

/**
 * GlobalScrollAnimations
 * ──────────────────────
 * A ZERO-SIDE-EFFECT, additive-only enhancement layer.
 * Targets sections by their stable wrapper IDs or section classes
 * added in page.tsx. Does NOT conflict with existing GSAP/framer-motion
 * animations inside individual components (MorphSequence, CinematicAperture,
 * PremiumStickySlides, etc.).
 *
 * SECTIONS INTENTIONALLY SKIPPED (already have their own GSAP/FM):
 *  - #morph-wrapper             (MorphSequence — pinned GSAP canvas)
 *  - #royal-hero-reveal-wrapper (RoyalHeroReveal — own GSAP)
 *  - #premium-slides-wrapper    (PremiumStickySlides — own GSAP)
 *  - #cinematic-aperture-wrapper(CinematicAperture — own GSAP)
 *  - #motion-scroll-grid-wrapper(MotionScrollGrid — own GSAP)
 *  - #divider-wrapper           (MountainTerrainDivider — own GSAP)
 *  - #infinite-column-gallery-wrapper (InfiniteColumnGallery — own GSAP)
 *  - ModernTradition, IndianWeddingBorder (framer-motion whileInView)
 */

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function GlobalScrollAnimations() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // Don't run heavy global animations on touch devices or when the user
    // prefers reduced motion — this dramatically reduces main-thread work
    // during scroll and improves perceived performance on low-end devices.
    if (typeof window !== "undefined") {
      const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
      const isCoarse = window.matchMedia?.("(pointer: coarse)")?.matches;
      if (prefersReduced || isCoarse) return;
    }

    // Wait for all components and Lenis to boot up
    const t = setTimeout(() => {
      const ctx = gsap.context(() => {

        /* ─────────────────────────────────────────────────────────────
           HELPER: batch-reveal any elements matching a selector
           inside a given container. Uses fromTo so it won't conflict
           with anything already animated.
        ───────────────────────────────────────────────────────────── */
        function batchReveal(
          container: Element | null,
          selector: string,
          overrides: gsap.TweenVars = {}
        ) {
          if (!container) return;
          const els = Array.from(container.querySelectorAll(selector));
          if (!els.length) return;

          gsap.fromTo(
            els,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.2,
              ease: "power3.out",
              stagger: 0.12,
              scrollTrigger: {
                trigger: container,
                start: "top 82%",
              },
              ...overrides,
            }
          );
        }

        function lineExpand(el: Element | null, delay = 0) {
          if (!el) return;
          gsap.fromTo(
            el,
            { scaleX: 0, transformOrigin: "left center" },
            {
              scaleX: 1,
              duration: 1.6,
              ease: "power4.out",
              delay,
              scrollTrigger: { trigger: el, start: "top 88%" },
            }
          );
        }

        /* ─────────────────────────────────────────────────────────────
           1. SELECTED WORKS
        ───────────────────────────────────────────────────────────── */
        const swSection = document.querySelector(".mv-selected-works");
        if (swSection) {
          // eyebrow label
          batchReveal(swSection, "span.text-\\[10px\\]", { stagger: 0 });
          // main heading
          gsap.fromTo(
            swSection.querySelector("h2"),
            { y: 80, opacity: 0, skewY: 2 },
            {
              y: 0, opacity: 1, skewY: 0,
              duration: 1.6, ease: "power4.out",
              scrollTrigger: { trigger: swSection, start: "top 78%" },
            }
          );
          // horizontal rule
          lineExpand(swSection.querySelector(".border-b"), 0.2);
          // cards stagger in
          const cards = swSection.querySelectorAll(".group");
          gsap.fromTo(
            cards,
            { y: 100, opacity: 0 },
            {
              y: 0, opacity: 1,
              duration: 1.4, ease: "power3.out", stagger: 0.18,
              scrollTrigger: { trigger: swSection, start: "top 65%" },
            }
          );
          // paragraph text
          batchReveal(swSection, "p", { y: 30, duration: 1, stagger: 0 });
        }

        /* ─────────────────────────────────────────────────────────────
           2. SERVICES SECTION (CapturedServices)
        ───────────────────────────────────────────────────────────── */
        const servicesSection = document.querySelector("#services-wrapper");
        if (servicesSection) {
          gsap.fromTo(
            servicesSection.querySelectorAll("h2, h3"),
            { y: 60, opacity: 0 },
            {
              y: 0, opacity: 1,
              duration: 1.3, ease: "power3.out", stagger: 0.1,
              scrollTrigger: { trigger: servicesSection, start: "top 75%" },
            }
          );
        }

        /* ─────────────────────────────────────────────────────────────
           3. CINEMATIC DIFFERENCE — section entry reveal
        ───────────────────────────────────────────────────────────── */
        const cdSection = document.querySelector("#cinematic-difference-wrapper");
        if (cdSection) {
          gsap.fromTo(
            cdSection,
            { opacity: 0 },
            {
              opacity: 1, duration: 1.5, ease: "power2.out",
              scrollTrigger: { trigger: cdSection, start: "top 88%" },
            }
          );
        }

        /* ─────────────────────────────────────────────────────────────
           4. CINEMATIC STORYTELLING
        ───────────────────────────────────────────────────────────── */
        const storySection = document.querySelector("#cinematic-storytelling-wrapper");
        if (storySection) {
          batchReveal(storySection, "h2, h3, p", { stagger: 0.1, duration: 1.1 });
        }

        /* ─────────────────────────────────────────────────────────────
           5. CINEMATIC SLIDESHOW — pan-up entry when scrolled into view
        ───────────────────────────────────────────────────────────── */
        const slideshow = document.querySelector(".mv-cinematic-slideshow");
        if (slideshow) {
          gsap.fromTo(
            slideshow,
            { y: 60, opacity: 0 },
            {
              y: 0, opacity: 1,
              duration: 1.8, ease: "power3.out",
              scrollTrigger: { trigger: slideshow, start: "top 90%" },
            }
          );
        }

        /* ─────────────────────────────────────────────────────────────
           6. FOOTER — staggered reveal
        ───────────────────────────────────────────────────────────── */
        const footer = document.querySelector("footer");
        if (footer) {
          gsap.fromTo(
            footer.querySelector("h2"),
            { y: 100, opacity: 0, skewY: 4 },
            {
              y: 0, opacity: 1, skewY: 0,
              duration: 1.8, ease: "power4.out",
              scrollTrigger: { trigger: footer, start: "top 85%" },
            }
          );

          gsap.fromTo(
            footer.querySelectorAll("a, span"),
            { y: 30, opacity: 0 },
            {
              y: 0, opacity: 1,
              duration: 0.9, ease: "power2.out", stagger: 0.07,
              scrollTrigger: { trigger: footer, start: "top 80%" },
            }
          );

          // Bottom dot icon
          gsap.fromTo(
            footer.querySelector(".rounded-full"),
            { scale: 0, opacity: 0 },
            {
              scale: 1, opacity: 1,
              duration: 1, ease: "elastic.out(1, 0.5)",
              scrollTrigger: { trigger: footer, start: "top 60%" },
            }
          );
        }

        /* ─────────────────────────────────────────────────────────────
           7. AMBIENT SECTION PARALLAX — [DISABLED FOR PERFORMANCE]
           Subtle Y-parallax on all section-level images. 
           Disabled because it forces heavy repaints across dozens of large images.
        ───────────────────────────────────────────────────────────── */
        // const safeImageSections = [
        //   ".mv-selected-works",
        //   ".mv-cinematic-slideshow",
        //   "footer",
        // ];
        // safeImageSections.forEach((sel) => {
        //   const sec = document.querySelector(sel);
        //   if (!sec) return;
        //   sec.querySelectorAll("img").forEach((img) => {
        //     gsap.fromTo(
        //       img,
        //       { scale: 1.08 },
        //       {
        //         scale: 1,
        //         ease: "none",
        //         scrollTrigger: {
        //           trigger: img,
        //           start: "top bottom",
        //           end: "bottom top",
        //           scrub: true,
        //         },
        //       }
        //     );
        //   });
        // });

        /* ─────────────────────────────────────────────────────────────
           8. INDIAN WEDDING BORDER DIVIDERS — subtle fade-in-up
        ───────────────────────────────────────────────────────────── */
        document.querySelectorAll(".indian-wedding-border-wrapper, [class*='IndianWeddingBorder']").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 20 },
            {
              opacity: 1, y: 0, duration: 1.2, ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 90%" },
            }
          );
        });

        // Recalculate once after the initial DOM/animation setup settles. Refreshing
        // on every lazy image load while pins are active can continually push later
        // sections downward, making the footer feel unreachable.
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 200);

      }); // end gsap.context

      const globalRefresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", globalRefresh);

      return () => {
        ctx.revert();
        window.removeEventListener("load", globalRefresh);
      };
    }, 600); // wait for page to settle

    return () => clearTimeout(t);
  }, []);

  return null;
}
