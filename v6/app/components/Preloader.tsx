"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

// Shared polygon points for the Pckup logo
export const LOGO_POINTS =
  "151.67 130 108.33 130 108.33 86.67 151.67 86.67 151.67 86.67 151.67 86.67 195 43.33 108.33 43.33 108.33 43.33 108.33 43.33 65 86.67 65 86.67 65 216.67 108.33 173.33 151.67 173.33 195 130 195 86.67 151.67 86.67 151.67 130";

export default function Preloader({ onComplete }: PreloaderProps) {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const polygonRef = useRef<SVGPolygonElement>(null);
  const fillOverlayRef = useRef<SVGPolygonElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const preloader = preloaderRef.current;
    const bar = barRef.current;
    const svg = svgRef.current;
    const polygon = polygonRef.current;
    const fillOverlay = fillOverlayRef.current;
    const bg = bgRef.current;
    if (!preloader || !bar || !svg || !polygon || !fillOverlay || !bg) return;

    // Get the total length of the polygon path for stroke animation
    const totalLength = polygon.getTotalLength();
    polygon.style.strokeDasharray = `${totalLength}`;
    polygon.style.strokeDashoffset = `${totalLength}`;

    const tl = gsap.timeline();

    // ── Phase 1: Progress bar crawls ──
    tl.to(bar, {
      width: "100%",
      duration: 1.8,
      ease: "power1.inOut",
    });

    // Fade out the progress bar
    tl.to(bar, {
      opacity: 0,
      duration: 0.3,
      ease: "power1.out",
    });

    // ── Phase 2: SVG stroke draw ──
    tl.to(svg, {
      opacity: 1,
      duration: 0.3,
      ease: "power1.out",
    }, "-=0.1");

    tl.to(polygon, {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: "power2.inOut",
    });

    // ── Phase 3: Fill reveal ──
    tl.to(fillOverlay, {
      opacity: 1,
      duration: 0.4,
      ease: "power2.in",
    });

    // Brief hold
    tl.to({}, { duration: 0.5 });

    // ── Phase 4: Fade background, keep logo in place ──
    // Fade out the black background + bokeh, revealing the page behind
    tl.to(bg, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut",
    });

    // Fade out the preloader logo (hero logo is now visible underneath at same coords)
    tl.to(svg, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
    }, "-=0.2");

    // Remove preloader from DOM flow
    tl.call(() => {
      preloader.style.display = "none";
      onComplete();
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div className="preloader" ref={preloaderRef}>
      {/* Background layer (fades independently from logo) */}
      <div className="preloader__bg" ref={bgRef}>
        <div className="preloader__bokeh preloader__bokeh--1" />
        <div className="preloader__bokeh preloader__bokeh--2" />
        <div className="preloader__bokeh preloader__bokeh--3" />
      </div>

      {/* SVG Logo — centered with fixed positioning so hero logo can match */}
      <svg
        ref={svgRef}
        className="preloader__svg"
        viewBox="0 0 260 260"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon
          ref={polygonRef}
          points={LOGO_POINTS}
          fill="transparent"
          stroke="#F14108"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <polygon
          ref={fillOverlayRef}
          points={LOGO_POINTS}
          fill="#F14108"
          stroke="none"
          style={{ opacity: 0 }}
        />
      </svg>

      {/* Progress bar */}
      <div className="preloader__bar-track">
        <div className="preloader__bar-fill" ref={barRef} />
      </div>
    </div>
  );
}
