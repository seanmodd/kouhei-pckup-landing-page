"use client";

import { useState, useCallback } from "react";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Values from "./components/Values";
import Services from "./components/Services";
import WhyPckup from "./components/WhyPckup";
import Testimonials from "./components/Testimonials";
import Marquee from "./components/Marquee";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import { useLenis } from "./hooks/useLenis";
import { useScrollAnimations } from "./hooks/useScrollAnimations";

export default function Home() {
  const [heroReady, setHeroReady] = useState(false);

  useLenis();
  useScrollAnimations();

  const handlePreloaderComplete = useCallback(() => {
    setHeroReady(true);
  }, []);

  return (
    <>
      <Preloader onComplete={handlePreloaderComplete} />
      <Navbar ready={heroReady} />

      <div className="main-wrapper" id="mainWrapper">
        <Hero ready={heroReady} />
        <Stats />
        <Values />
        <Services />
        <WhyPckup />
        <Testimonials />
        <Marquee />
        <CTA />
      </div>

      <Footer />
    </>
  );
}
