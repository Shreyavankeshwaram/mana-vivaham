"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Sparkles, PerspectiveCamera, Environment } from "@react-three/drei";
import * as THREE from "three";

function LensFront() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.4;
    groupRef.current.rotation.x = Math.cos(t * 0.3) * 0.2;
    groupRef.current.rotation.z = t * 0.1;

    const s = 1 + Math.sin(t * 0.5) * 0.02;
    groupRef.current.scale.set(s, s, s);
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, -1]}>
        <cylinderGeometry args={[2.5, 2.5, 2, 64]} />
        <meshStandardMaterial color="#050505" roughness={0.1} metalness={1} />
      </mesh>

      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[2.55, 0.05, 16, 100]} />
        <meshStandardMaterial color="#333333" metalness={1} roughness={0.1} />
      </mesh>

      <group position={[0, 0, 0.2]}>
        <mesh position={[0, 0, 0.1]}>
          <sphereGeometry args={[2.2, 64, 64, 0, Math.PI * 2, 0, Math.PI / 3]} />
          <MeshTransmissionMaterial
            backside
            samples={16}
            thickness={0.8}
            chromaticAberration={0.06}
            transmission={1}
            color="#ffccaa"
          />
        </mesh>

        <mesh position={[0, 0, -0.3]}>
          <sphereGeometry args={[1.8, 64, 64, 0, Math.PI * 2, 0, Math.PI / 4]} />
          <MeshTransmissionMaterial
            backside
            thickness={1}
            chromaticAberration={0.1}
            transmission={1}
            color="#eef"
          />
        </mesh>

        <mesh position={[0, 0, -0.8]}>
          <sphereGeometry args={[1.2, 64, 64]} />
          <meshStandardMaterial color="#000" roughness={0} metalness={1} />
        </mesh>
      </group>

      <group position={[0, 0, -0.5]}>
        {Array.from({ length: 9 }).map((_, i) => (
          <mesh key={i} rotation={[0, 0, (i * Math.PI * 2) / 9]}>
            <planeGeometry args={[1.5, 1.5]} />
            <meshStandardMaterial color="#020202" side={THREE.DoubleSide} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export default function CameraLens() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center bg-black overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas gl={{ antialias: true, alpha: true }}>
          <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={40} />
          <Environment preset="studio" />
          <ambientLight intensity={0.4} />
          <spotLight position={[5, 5, 5]} angle={0.25} penumbra={1} intensity={15} color="#ffffff" />
          <spotLight position={[-5, -5, 2]} angle={0.3} penumbra={1} intensity={1} color="#4422ff" />

          <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
            <group rotation={[Math.PI / 2, 0, 0]}>
              <LensFront />
            </group>
          </Float>

          <Sparkles count={40} scale={6} size={0.5} speed={0.2} color="#ffaa00" />
        </Canvas>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
        <div className="relative w-full max-w-7xl px-12 flex justify-between items-end mb-[20vh]">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] tracking-[0.6em] uppercase text-white/40 font-mono">Focal Length</span>
            <h3 className="text-4xl font-serif italic text-white/90">85mm</h3>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] tracking-[0.6em] uppercase text-white/40 font-mono">Aperture</span>
            <h3 className="text-4xl font-serif italic text-white/90">f/1.2</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
