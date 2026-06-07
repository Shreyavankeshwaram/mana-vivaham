"use client";
import React, { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";

export default function FloralParticles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = React.useState(false);
  const particlesCount = 25;

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const particles = useMemo(() => {
    if (!isMounted) return [];
    return Array.from({ length: particlesCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 10 + 5,
      rotation: Math.random() * 360,
      opacity: Math.random() * 0.5 + 0.2,
    }));
  }, [isMounted, particlesCount]);

  useEffect(() => {
    if (!isMounted || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const children = containerRef.current?.children;
      if (!children) return;
      Array.from(children).forEach((child) => {
        gsap.to(child, {
          y: "110vh",
          x: "+=" + ((Math.random() - 0.5) * 200),
          rotation: "+=" + (Math.random() * 360),
          duration: Math.random() * 10 + 15,
          repeat: -1,
          ease: "none",
          delay: Math.random() * 10,
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, [isMounted, particlesCount]);

  if (!isMounted) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {particles.map((p) => (
        <div key={p.id} className="absolute" style={{ left: p.x + "%", top: "-10%", width: p.size + "px", height: p.size + "px", opacity: p.opacity }}>
          <svg viewBox="0 0 100 100" fill="#8B1E2D" className="w-full h-full opacity-40">
            <path d="M50 0 C70 30 100 50 50 100 C0 50 30 30 50 0" />
          </svg>
        </div>
      ))}
    </div>
  );
}
