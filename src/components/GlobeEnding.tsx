"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";

// ── Atmosphere glow shell ──────────────────────────────────────────────────
function Atmosphere() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    (ref.current.material as THREE.MeshBasicMaterial).opacity =
      0.18 + Math.sin(clock.getElapsedTime() * 0.6) * 0.02;
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[3.22, 64, 64]} />
      <meshBasicMaterial color="#44ff88" transparent opacity={0.18} side={THREE.BackSide} />
    </mesh>
  );
}

// ── Outer glow halo ────────────────────────────────────────────────────────
function Halo() {
  return (
    <mesh>
      <sphereGeometry args={[3.45, 32, 32]} />
      <meshBasicMaterial color="#22cc55" transparent opacity={0.06} side={THREE.BackSide} />
    </mesh>
  );
}

// ── Cloud layer ────────────────────────────────────────────────────────────
function Clouds() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.025;
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[3.06, 64, 64]} />
      <meshPhysicalMaterial
        color="#ffffff"
        transparent
        opacity={0.08}
        roughness={1}
        metalness={0}
        side={THREE.FrontSide}
      />
    </mesh>
  );
}

// ── Main Earth Globe ───────────────────────────────────────────────────────
function Earth() {
  const globeRef = useRef<THREE.Mesh>(null);

  // Use procedural texturing since we can't load external texture files
  const earthMaterial = new THREE.MeshPhongMaterial({
    color: new THREE.Color("#11331d"),
    emissive: new THREE.Color("#051a0d"),
    specular: new THREE.Color("#22663b"),
    shininess: 60,
  });

  useFrame(({ clock }) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = clock.getElapsedTime() * 0.06;
    }
  });

  return (
    <mesh ref={globeRef}>
      <sphereGeometry args={[3, 64, 64]} />
      <meshPhongMaterial
        color="#11331d"
        emissive="#051a0d"
        specular="#22663b"
        shininess={60}
      />
    </mesh>
  );
}

// ── Land mass patches (procedural continents) ─────────────────────────────
function LandPatches() {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.06;
  });

  const patches = [
    { lat: 45, lon: 10, w: 0.9, h: 0.6 }, // Europe
    { lat: 20, lon: 20, w: 1.1, h: 1.2 }, // Africa
    { lat: 50, lon: 90, w: 1.8, h: 1.0 }, // Asia
    { lat: 55, lon: -100, w: 1.4, h: 1.0 }, // N. America
    { lat: -15, lon: -55, w: 0.8, h: 0.9 }, // S. America
    { lat: -28, lon: 135, w: 0.7, h: 0.5 }, // Australia
    { lat: -80, lon: 0, w: 0.9, h: 0.4 }, // Antarctica
  ];

  return (
    <group ref={ref}>
      {patches.map((p, i) => {
        const phi = (90 - p.lat) * (Math.PI / 180);
        const theta = (p.lon + 180) * (Math.PI / 180);
        const r = 3.01;
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.cos(phi);
        const z = r * Math.sin(phi) * Math.sin(theta);
        const pos = new THREE.Vector3(x, y, z);
        const up = new THREE.Vector3(0, 1, 0);
        const q = new THREE.Quaternion().setFromUnitVectors(up, pos.clone().normalize());

        return (
          <mesh key={i} position={pos} quaternion={q}>
            <planeGeometry args={[p.w, p.h, 1, 1]} />
            <meshPhongMaterial
              color="#44aa44"
              emissive="#113311"
              transparent
              opacity={0.85}
              side={THREE.DoubleSide}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// ── City lights (bright dots on dark side) ────────────────────────────────
function CityLights() {
  const ref = useRef<THREE.Points>(null);

  const positions = new Float32Array(300 * 3);
  for (let i = 0; i < 300; i++) {
    const phi = Math.random() * Math.PI;
    const theta = Math.random() * Math.PI * 2;
    const r = 3.03;
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.cos(phi);
    positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
  }

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.06;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#aaffaa" size={0.018} transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

// ── Stars backdrop ─────────────────────────────────────────────────────────
function Stars() {
  const positions = new Float32Array(2000 * 3);
  for (let i = 0; i < 2000; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 200;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
  }
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.12} transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

// ── Full Scene ─────────────────────────────────────────────────────────────
function GlobeScene() {
  const sceneRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!sceneRef.current) return;
    const t = clock.getElapsedTime();
    sceneRef.current.rotation.x = Math.sin(t * 0.15) * 0.08;
  });

  return (
    <Float speed={0.5} floatIntensity={0.15} rotationIntensity={0.03}>
      <group ref={sceneRef}>
        <Earth />
        <LandPatches />
        <CityLights />
        <Clouds />
        <Atmosphere />
        <Halo />
      </group>
    </Float>
  );
}

// ── Page Section ───────────────────────────────────────────────────────────
export default function GlobeEnding() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    if (!isMounted || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      tl.fromTo(textRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" })
        .to(textRef.current, { opacity: 0, y: -20, duration: 0.8 }, "+=0.5");
      tl.fromTo(ctaRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=0.4");
    }, sectionRef);
    return () => ctx.revert();
  }, [isMounted]);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#00010a]">
      <div ref={sectionRef} className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center">
        {isMounted && (
          <>
            <div className="absolute inset-0 z-0">
              <Canvas camera={{ position: [0, 0, 9], fov: 45 }} gl={{ antialias: true }}>
                <color attach="background" args={["#00010a"]} />
                {/* Sun-like directional light from the left */}
                <directionalLight position={[-8, 3, 5]} intensity={3.5} color="#fffaea" />
                {/* Dim fill from right */}
                <directionalLight position={[8, -2, -4]} intensity={0.3} color="#226633" />
                <ambientLight intensity={0.15} />
                <Stars />
                <GlobeScene />
              </Canvas>
            </div>

            {/* Deep space vignette */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background:
                  "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, rgba(0,1,10,0.85) 100%)",
              }}
            />

            <div className="absolute bottom-24 left-0 right-0 z-20 flex flex-col items-center gap-4 pointer-events-none">
              <div ref={textRef} style={{ opacity: 0 }} className="flex flex-col items-center gap-3">
                <h2 className="text-3xl md:text-6xl font-light tracking-[0.25em] uppercase text-white text-center">
                  Shot Without Limits.
                </h2>
                <p className="text-[9px] tracking-[0.6em] uppercase font-mono" style={{ color: "rgba(255,255,255,0.25)" }}>
                  AURA · Cinematic Photography · 2025
                </p>
              </div>
            </div>

            <div ref={ctaRef} className="absolute bottom-8 left-0 right-0 z-20 flex justify-center" style={{ opacity: 0 }}>
              <button className="pointer-events-auto px-10 py-4 border border-white/20 text-white text-xs tracking-[0.35em] uppercase hover:bg-white hover:text-black transition-all duration-500">
                Book Your Session
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
