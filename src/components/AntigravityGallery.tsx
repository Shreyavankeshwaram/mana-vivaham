"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

const images = [
  { url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1974&auto=format&fit=crop", position: [-3, 2, -10], scale: [5, 7] },
  { url: "https://images.unsplash.com/photo-1541250848049-b4f7141dca3f?q=80&w=1974&auto=format&fit=crop", position: [4, -1, -5], scale: [4, 6] },
  { url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070&auto=format&fit=crop", position: [-2, -2, 0], scale: [3.5, 5] },
  { url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop", position: [3, 3, 2], scale: [3, 4.5] },
];

function FloatingPlanes() {
  const group = useRef<THREE.Group>(null);
  const textures = useTexture(images.map((img) => img.url));

  useFrame((state) => {
    if (!group.current) return;
    const time = state.clock.getElapsedTime();
    group.current.children.forEach((child, i) => {
      // Slow oscillation
      child.position.y += Math.sin(time * 0.5 + i) * 0.002;
      child.rotation.x = Math.sin(time * 0.3 + i) * 0.02;
      child.rotation.y = Math.cos(time * 0.3 + i) * 0.02;
    });
  });

  return (
    <group ref={group}>
      {images.map((img, i) => (
        <mesh key={i} position={new THREE.Vector3(...img.position)}>
          <planeGeometry args={[img.scale[0], img.scale[1]]} />
          <meshBasicMaterial map={textures[i]} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

function CameraController({ progressRef }: { progressRef: React.MutableRefObject<{value: number}> }) {
  const { camera } = useThree();

  useFrame(() => {
    // Move camera forward on Z axis based on scroll progress
    const targetZ = 12 - progressRef.current.value * 15; // starts at 12, moves to -3
    // eslint-disable-next-line react-hooks/immutability
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.1);
  });

  return null;
}

export default function AntigravityGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef({ value: 0 });

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(progressRef.current, {
        value: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          scrub: true,
          pin: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen bg-black">
      <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
        <CameraController progressRef={progressRef} />
        <ambientLight intensity={0.5} />
        <FloatingPlanes />
      </Canvas>
    </section>
  );
}
