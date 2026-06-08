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
 *
 * PERFORMANCE NOTES:
 *  - ScrollTrigger is NOT re-registered here — LenisProvider already does it.
 *  - Skipped on mobile & prefers-reduced-motion.
 *  - Only ONE ScrollTrigger.refresh() is called, after a 400 ms settle.
 *  - No scrub parallax (removed: caused the worst lag).
 */

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function GlobalScrollAnimations() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia?.("(max-width: 767px)").matches;
    // Skip global animation layer on mobile/reduced motion for smoothness.
    if (prefersReducedMotion || isMobile) return;

    // ScrollTrigger is already registered by LenisProvider — no need to re-register.

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
                // once: true prevents re-triggering on scroll-back
                toggleActions: "play none none none",
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
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                toggleActions: "play none none none",
              },
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
          const swH2 = swSection.querySelector("h2");
          if (swH2) {
            gsap.fromTo(
              swH2,
              { y: 80, opacity: 0, skewY: 2 },
              {
                y: 0, opacity: 1, skewY: 0,
                duration: 1.6, ease: "power4.out",
                scrollTrigger: {
                  trigger: swSection,
                  start: "top 78%",
                  toggleActions: "play none none none",
                },
              }
            );
          }
          // horizontal rule
          lineExpand(swSection.querySelector(".border-b"), 0.2);
          // cards stagger in
          const cards = swSection.querySelectorAll(".group");
          if (cards.length) {
            gsap.fromTo(
              cards,
              { y: 100, opacity: 0 },
              {
                y: 0, opacity: 1,
                duration: 1.4, ease: "power3.out", stagger: 0.18,
                scrollTrigger: {
                  trigger: swSection,
                  start: "top 65%",
                  toggleActions: "play none none none",
                },
              }
            );
          }
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
              scrollTrigger: {
                trigger: servicesSection,
                start: "top 75%",
                toggleActions: "play none none none",
              },
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
              scrollTrigger: {
                trigger: cdSection,
                start: "top 88%",
                toggleActions: "play none none none",
              },
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
              scrollTrigger: {
                trigger: slideshow,
                start: "top 90%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        /* ─────────────────────────────────────────────────────────────
           6. FOOTER — staggered reveal
        ───────────────────────────────────────────────────────────── */
        const footer = document.querySelector("footer");
        if (footer) {
          const footerH2 = footer.querySelector("h2");
          if (footerH2) {
            gsap.fromTo(
              footerH2,
              { y: 100, opacity: 0, skewY: 4 },
              {
                y: 0, opacity: 1, skewY: 0,
                duration: 1.8, ease: "power4.out",
                scrollTrigger: {
                  trigger: footer,
                  start: "top 85%",
                  toggleActions: "play none none none",
                },
              }
            );
          }

          const footerLinks = footer.querySelectorAll("a, span");
          if (footerLinks.length) {
            gsap.fromTo(
              footerLinks,
              { y: 30, opacity: 0 },
              {
                y: 0, opacity: 1,
                duration: 0.9, ease: "power2.out", stagger: 0.07,
                scrollTrigger: {
                  trigger: footer,
                  start: "top 80%",
                  toggleActions: "play none none none",
                },
              }
            );
          }

          // Bottom dot icon — only animate if it actually exists
          const footerDot = footer.querySelector(".rounded-full");
          if (footerDot) {
            gsap.fromTo(
              footerDot,
              { scale: 0, opacity: 0 },
              {
                scale: 1, opacity: 1,
                duration: 1, ease: "elastic.out(1, 0.5)",
                scrollTrigger: {
                  trigger: footer,
                  start: "top 60%",
                  toggleActions: "play none none none",
                },
              }
            );
          }
        }

        /* ─────────────────────────────────────────────────────────────
           7. AMBIENT SECTION PARALLAX — REMOVED
              (Attaching scrub ScrollTriggers to every image causes massive lag)
        ───────────────────────────────────────────────────────────── */

        /* ─────────────────────────────────────────────────────────────
           8. INDIAN WEDDING BORDER DIVIDERS — subtle fade-in-up
        ───────────────────────────────────────────────────────────── */
        document.querySelectorAll(".indian-wedding-border-wrapper, [class*='IndianWeddingBorder']").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 20 },
            {
              opacity: 1, y: 0, duration: 1.2, ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 90%",
                toggleActions: "play none none none",
              },
            }
          );
        });

        // Single deferred refresh — enough for pins to settle after initial render.
        // Do NOT listen to window "load" here; LenisProvider already handles the
        // initial ScrollTrigger.refresh() on boot.
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 400);

      }); // end gsap.context

      return () => {
        ctx.revert();
      };
    }, 600); // wait for page and Lenis to settle

    return () => clearTimeout(t);
  }, []);

  return null;
}
