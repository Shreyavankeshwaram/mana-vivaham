"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, PerspectiveCamera, Environment } from "@react-three/drei";
import * as THREE from "three";

function Lens3D() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <cylinderGeometry args={[2, 2, 0.8, 64]} />
        <meshStandardMaterial color="#111" roughness={0.1} metalness={1} />
      </mesh>
      <mesh position={[0, 0, 0.41]}>
        <torusGeometry args={[1.9, 0.05, 16, 100]} />
        <meshStandardMaterial color="#333" metalness={1} />
      </mesh>
      <mesh position={[0, 0, 0.3]}>
        <sphereGeometry args={[1.7, 64, 64, 0, Math.PI * 2, 0, Math.PI / 2.5]} />
        <MeshTransmissionMaterial
          backside
          samples={16}
          thickness={1}
          chromaticAberration={0.05}
          transmission={1}
          color="#ffd"
        />
      </mesh>
    </group>
  );
}

export default function CinematicQuote() {
  return (
    <section className="relative w-full min-h-screen bg-white flex flex-col items-center justify-center py-32 px-6 md:px-24 overflow-hidden">
      {/* Subtle Background Portrait Simulation */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-black/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        {/* Left Side: 3D Lens */}
        <div className="relative w-full aspect-square md:aspect-auto md:h-[600px] flex items-center justify-center">
          <div className="w-full h-full">
            <Canvas>
              <PerspectiveCamera makeDefault position={[0, 0, 6]} />
              <ambientLight intensity={0.8} />
              <spotLight position={[10, 10, 10]} intensity={2} />
              <pointLight position={[-10, -10, -10]} intensity={0.5} />
              <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <Lens3D />
              </Float>
              <Environment preset="studio" />
            </Canvas>
          </div>
        </div>

        {/* Right Side: Quote */}
        <div className="flex flex-col gap-12">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col gap-2 border-l-4 border-black pl-8"
          >
            <span className="text-black/40 text-[10px] tracking-[0.6em] uppercase font-mono">Visionary Statement</span>
            <h4 className="text-black text-xl font-serif italic">The Art of Seeing</h4>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="text-black text-3xl md:text-6xl font-serif font-black leading-[1.1] tracking-tight"
          >
            "I don't just take photos I capture the raw emotions, the subtle moments, and the untold stories that make life so beautiful."
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-black/60 text-sm tracking-[0.2em] uppercase font-light"
          >
            — AURA Editorial Photography 2025
          </motion.p>
        </div>
      </div>

      {/* Decorative Details */}
      <div className="absolute bottom-12 right-12 text-black/20 font-mono text-[10px] tracking-[0.5em] uppercase">
        Shutter: 1/125 · ISO 200 · F/1.2
      </div>
    </section>
  );
}
