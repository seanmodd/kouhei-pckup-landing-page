"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const logo = logoRef.current;
    const bar = barRef.current;
    const preloader = preloaderRef.current;
    if (!logo || !bar || !preloader) return;

    // Logo pulse in
    gsap.to(logo, {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
    });

    // Simulate progress
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += Math.random() * 25;
      if (progress > 100) progress = 100;
      bar.style.width = progress + "%";
      if (progress >= 100) clearInterval(progressInterval);
    }, 200);

    // Exit animation
    const exitTimer = setTimeout(() => {
      bar.style.width = "100%";
      gsap.to(preloader, {
        y: "-100%",
        duration: 1.2,
        ease: "power4.inOut",
        delay: 0.6,
        onComplete: () => {
          preloader.style.display = "none";
          onComplete();
        },
      });
    }, 1500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  return (
    <div className="preloader" ref={preloaderRef}>
      <Image
        ref={logoRef}
        src="/pckup-logo-light.png"
        alt="Pckup"
        width={120}
        height={36}
        className="preloader__logo"
        priority
      />
      <div className="preloader__bar-track">
        <div className="preloader__bar-fill" ref={barRef} />
      </div>
    </div>
  );
}
