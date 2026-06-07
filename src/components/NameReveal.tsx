"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas } from "@react-three/fiber";
import { Float, useTexture } from "@react-three/drei";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

function FloatingImage() {
  const texture = useTexture("https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop");
  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh>
        <planeGeometry args={[4, 5.5]} />
        <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
      </mesh>
    </Float>
  );
}

export default function NameReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !nameRef.current) return;

    const chars = nameRef.current.querySelectorAll(".char");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        { 
          opacity: 0, 
          y: 100, 
          clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)"
        },
        {
          opacity: 1,
          y: 0,
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          stagger: 0.1,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "center center",
            scrub: 1,
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const name = "AURA";

  return (
    <section ref={sectionRef} className="relative w-full h-screen bg-[#050505] flex flex-col md:flex-row items-center justify-between px-6 md:px-20 overflow-hidden">
      
      {/* Left side: Name */}
      <div className="w-full md:w-1/2 flex items-center justify-center md:justify-start z-10">
        <h2 
          ref={nameRef}
          className="text-7xl md:text-[12rem] font-medium tracking-[0.2em] uppercase leading-none"
        >
          {name.split("").map((char, i) => (
            <span key={i} className="char inline-block translate-y-full">
              {char}
            </span>
          ))}
        </h2>
      </div>

      {/* Right side: 3D Floating Image */}
      <div className="w-full md:w-1/2 h-[60vh] md:h-screen absolute md:relative right-0 opacity-40 md:opacity-100 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <FloatingImage />
        </Canvas>
      </div>
      
    </section>
  );
}
