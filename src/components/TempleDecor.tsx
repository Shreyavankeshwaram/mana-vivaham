"use client";
import React from "react";
import Image from "next/image";

export default function TempleDecor() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
      <div className="absolute bottom-0 left-0 w-full h-[60vh]">
        <Image src="/images/wedding_temple.png" alt="" fill className="object-cover object-bottom mix-blend-luminosity grayscale contrast-125" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-lumus-beige via-transparent to-transparent" />
      </div>
    </div>
  );
}
