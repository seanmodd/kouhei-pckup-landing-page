"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";
import { LOGO_POINTS } from "./Preloader";

interface HeroProps {
  ready: boolean;
}

export default function Hero({ ready }: HeroProps) {
  const hasAnimated = useRef(false);
  const heroLogoRef = useRef<SVGSVGElement>(null);

  const animate = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const heroLogo = heroLogoRef.current;

    // Background zoom
    gsap.to("#heroBg", {
      scale: 1,
      duration: 10,
      ease: "power1.out",
    });

    // Hero logo stays visible — no exit animation

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
        delay: 0.4,
      }
    );

    // Label
    gsap.to(".hero__label", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.5,
    });

    // Subtitle
    gsap.to(".hero__subtitle", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 1.0,
    });

    // CTA buttons
    gsap.to(".hero__cta-row", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 1.2,
    });

    // Stats bar
    gsap.to(".hero__stats-bar", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 1.4,
    });

    // Animate hero counters directly (they won't trigger via ScrollTrigger since already visible)
    document.querySelectorAll(".hero__stats-bar .counter").forEach((counter) => {
      const target = parseFloat(counter.getAttribute("data-target") || "0");
      const isDecimal = target % 1 !== 0;

      gsap.to({ val: 0 }, {
        val: target,
        duration: 2,
        ease: "power2.out",
        delay: 1.6,
        onUpdate: function () {
          counter.textContent = isDecimal
            ? this.targets()[0].val.toFixed(1)
            : String(Math.floor(this.targets()[0].val));
        },
      });
    });
  }, []);

  useEffect(() => {
    if (ready) {
      animate();
    }
  }, [ready, animate]);

  return (
    <section className="hero" id="hero">
      {/* Watermark — large semi-transparent logo behind the truck photo */}
      <svg
        className="hero__watermark"
        viewBox="0 0 260 260"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <polygon
          points={LOGO_POINTS}
          fill="#F14108"
        />
      </svg>

      <div className="hero__bg" id="heroBg" />
      <div className="hero__overlay" />

      {/* Persistent logo — same position as preloader logo for seamless handoff */}
      <svg
        ref={heroLogoRef}
        className="hero__logo-svg"
        viewBox="0 0 260 260"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon
          points={LOGO_POINTS}
          fill="#F14108"
        />
      </svg>

      <div className="hero__content">
        <div className="hero__left">
          <p className="hero__label">AI-Powered Logistics</p>
          <h1 className="hero__title" id="heroTitle">
            Intelligent Delivery, Built for Scale
          </h1>
        </div>
        <div className="hero__right">
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
      </div>
      <div className="hero__stats-bar">
        <div className="hero__stat">
          <span className="hero__stat-number">
            <span className="counter" data-target="99.4">0</span>
            <span className="accent">%</span>
          </span>
          <span className="hero__stat-label">On-Time Delivery</span>
        </div>
        <div className="hero__stat">
          <span className="hero__stat-number">
            <span className="counter" data-target="10">0</span>M
            <span className="accent">+</span>
          </span>
          <span className="hero__stat-label">Deliveries Completed</span>
        </div>
        <div className="hero__stat">
          <span className="hero__stat-number">24/7</span>
          <span className="hero__stat-label">AI Dispatch</span>
        </div>
        <div className="hero__stat">
          <span className="hero__stat-number">
            <span className="counter" data-target="500">0</span>
            <span className="accent">+</span>
          </span>
          <span className="hero__stat-label">Business Clients</span>
        </div>
      </div>
    </section>
  );
}
