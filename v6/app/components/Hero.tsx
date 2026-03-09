"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";

interface HeroProps {
  ready: boolean;
}

export default function Hero({ ready }: HeroProps) {
  const hasAnimated = useRef(false);

  const animate = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    // Background zoom
    gsap.to("#heroBg", {
      scale: 1,
      duration: 10,
      ease: "power1.out",
    });

    // Split headline text into lines
    const titleEl = document.getElementById("heroTitle");
    if (!titleEl) return;

    const split = new SplitType(titleEl, { types: "lines" });

    // Wrap each line in overflow-hidden container
    split.lines?.forEach((line) => {
      const wrapper = document.createElement("div");
      wrapper.style.overflow = "hidden";
      wrapper.style.display = "block";
      line.parentNode?.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });

    // Animate lines
    gsap.fromTo(
      split.lines || [],
      { y: "100%", opacity: 0, rotateX: 10 },
      {
        y: "0%",
        opacity: 1,
        rotateX: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.15,
      }
    );

    // Label
    gsap.to(".hero__label", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.2,
    });

    // Subtitle
    gsap.to(".hero__subtitle", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.8,
    });

    // CTA buttons
    gsap.to(".hero__cta-row", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 1.0,
    });
  }, []);

  useEffect(() => {
    if (ready) {
      animate();
    }
  }, [ready, animate]);

  return (
    <section className="hero" id="hero">
      <div className="hero__bg" id="heroBg" />
      <div className="hero__overlay" />
      <div className="hero__content">
        <p className="hero__label">AI-Powered Logistics</p>
        <h1 className="hero__title" id="heroTitle">
          Intelligent Delivery, Built for Scale
        </h1>
        <p className="hero__subtitle">
          From same-day dispatch to enterprise fleet management — Pckup
          combines AI intelligence with human expertise to give your
          business the trust, speed, and control it deserves.
        </p>
        <div className="hero__cta-row">
          <a href="#contact" className="btn-primary">
            Request a Demo <span>&rarr;</span>
          </a>
          <a href="#services" className="btn-ghost">
            Explore Platform
          </a>
        </div>
      </div>
    </section>
  );
}
