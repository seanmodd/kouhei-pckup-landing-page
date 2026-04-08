"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#values", label: "Values" },
  { href: "#services", label: "Services" },
  { href: "#why", label: "Why Pckup" },
  { href: "#contact", label: "Contact" },
];

interface NavbarProps {
  ready?: boolean;
}

export default function Navbar({ ready = false }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileOpenRef = useRef(false);

  useEffect(() => {
    mobileOpenRef.current = mobileOpen;
    // If menu just opened, ensure navbar is visible
    if (mobileOpen) {
      const nav = document.getElementById("nav");
      if (nav) nav.classList.remove("nav--at-footer");
      gsap.to("#nav", { y: 0, duration: 0.35, ease: "power2.out", overwrite: "auto" });
    }
  }, [mobileOpen]);

  useEffect(() => {
    // scrolled class via ScrollTrigger
    ScrollTrigger.create({
      start: 50,
      onUpdate: (self) => {
        const nav = document.getElementById("nav");
        if (!nav) return;
        const scrollY = self.scroll();
        nav.classList.toggle("scrolled", scrollY > 50);

        // Hide navbar when scrolled to bottom (footer revealed)
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const nearBottom = scrollY > maxScroll - 100;
        if (nearBottom && !mobileOpenRef.current) {
          nav.classList.add("nav--at-footer");
        } else if (!nearBottom) {
          nav.classList.remove("nav--at-footer");
        }
      },
    });

    // Hide on scroll down / show on scroll up via plain scroll listener.
    // GSAP sets inline transform on #nav, so we must use gsap (not CSS classes)
    // to override it — CSS classes lose to inline styles.
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const nav = document.getElementById("nav");
      if (!nav || mobileOpenRef.current) return;
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY;
      if (scrollingDown && currentScrollY > 80) {
        gsap.to(nav, { y: "-100%", duration: 0.35, ease: "power2.inOut", overwrite: "auto" });
      } else if (!scrollingDown) {
        gsap.to(nav, { y: 0, duration: 0.35, ease: "power2.inOut", overwrite: "auto" });
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (ready) {
      gsap.to("#nav", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      });
    }
  }, [ready]);

  const toggleMenu = () => {
    setMobileOpen((prev) => {
      document.body.style.overflow = !prev ? "hidden" : "";
      return !prev;
    });
  };

  const closeMenu = () => {
    setMobileOpen(false);
    document.body.style.overflow = "";
  };

  return (
    <>
      <header className="nav" id="nav">
        <nav className="nav__inner">
          <a href="#" className="nav__logo">
            <Image
              src="/pckup-logo-light.png"
              alt="Pckup"
              width={85}
              height={24}
              priority
            />
          </a>
          <ul className="nav__links">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="nav__cta">
            Get Started
          </a>
          <button
            className={`nav__hamburger ${mobileOpen ? "active" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
      </header>

      <div className={`nav__mobile-overlay ${mobileOpen ? "active" : ""}`}>
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} onClick={closeMenu}>
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={closeMenu}
          style={{ color: "#F14108" }}
        >
          Get Started
        </a>
      </div>
    </>
  );
}
