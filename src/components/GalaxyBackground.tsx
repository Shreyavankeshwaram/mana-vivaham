"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

function Nebula() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.z = time * 0.02;
    meshRef.current.rotation.y = Math.sin(time * 0.1) * 0.1;
  });

  return (
    <group ref={meshRef}>
      {/* Deep Purple Nebula */}
      <mesh position={[10, -5, -20]}>
        <sphereGeometry args={[15, 32, 32]} />
        <meshBasicMaterial color="#4b0082" transparent opacity={0.05} />
      </mesh>

      {/* Deep Blue Nebula */}
      <mesh position={[-15, 5, -25]}>
        <sphereGeometry args={[20, 32, 32]} />
        <meshBasicMaterial color="#00008b" transparent opacity={0.04} />
      </mesh>

      {/* Center Glow */}
      <mesh position={[0, 0, -30]}>
        <sphereGeometry args={[25, 32, 32]} />
        <meshBasicMaterial color="#1a1a2e" transparent opacity={0.03} />
      </mesh>
    </group>
  );
}

function CameraRig() {
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      (state.mouse.x * 5),
      0.05
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      (state.mouse.y * 5) + (window.scrollY / 200),
      0.05
    );
    state.camera.lookAt(0, 0, -50);
  });
  return null;
}

function TwinklingStars() {
  const points = useMemo(() => {
    const p = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      p[i * 3] = (Math.random() - 0.5) * 100;
      p[i * 3 + 1] = (Math.random() - 0.5) * 100;
      p[i * 3 + 2] = (Math.random() - 0.5) * 100 - 50;
    }
    return p;
  }, []);

  const starRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!starRef.current) return;
    const time = state.clock.getElapsedTime();
    // Simple twinkle effect by rotating and moving slightly
    starRef.current.rotation.z = time * 0.005;
  });

  return (
    <points ref={starRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          args={[points, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#ffffff"
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function ShootingStar() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [active, setActive] = React.useState(false);

  const reset = () => {
    if (!meshRef.current) return;
    meshRef.current.position.set(
      (Math.random() - 0.5) * 100,
      (Math.random() - 0.5) * 100,
      -50
    );
    meshRef.current.rotation.z = Math.PI / 4;
    setActive(true);
  };

  useFrame((state, delta) => {
    if (!active) {
      if (Math.random() < 0.03) reset(); // Increased frequency
      return;
    }
    if (!meshRef.current) return;
    meshRef.current.position.x -= delta * 150; // Faster speed
    meshRef.current.position.y += delta * 75; // Faster speed
    meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, 0, 0.08);

    if (meshRef.current.position.x < -100) {
      setActive(false);
      meshRef.current.scale.x = 1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[10, 0.05, 0.05]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
    </mesh>
  );
}

export default function GalaxyBackground() {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 bg-[#020205] overflow-hidden pointer-events-none">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
        <CameraRig />

        <ambientLight intensity={0.5} />

        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />

        <TwinklingStars />
        <ShootingStar />

        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <Nebula />
        </Float>
      </Canvas>

      {/* Overlay for cinematic color grading */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020205]/40 to-[#020205] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
    </div>
  );
}
