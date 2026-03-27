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
  }, [mobileOpen]);

  useEffect(() => {
    ScrollTrigger.create({
      start: 50,
      onUpdate: (self) => {
        document
          .getElementById("nav")
          ?.classList.toggle("scrolled", self.scroll() > 50);
      },
    });

    // Hide navbar when footer is visible (but not when mobile menu is open)
    const footer = document.getElementById("footer");
    if (footer) {
      ScrollTrigger.create({
        trigger: footer,
        start: "top 95%",
        end: "top 60%",
        onEnter: () => {
          if (!mobileOpenRef.current) {
            gsap.to("#nav", { opacity: 0, duration: 0.3, ease: "power2.out", pointerEvents: "none" });
          }
        },
        onLeaveBack: () => {
          gsap.to("#nav", { opacity: 1, duration: 0.3, ease: "power2.out", pointerEvents: "auto" });
        },
      });
    }
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
      const next = !prev;
      document.body.style.overflow = next ? "hidden" : "";
      // Ensure nav is visible/tappable when opening menu at footer
      const nav = document.getElementById("nav");
      if (nav) {
        if (next) {
          gsap.set(nav, { opacity: 1, pointerEvents: "auto" });
        } else {
          // If closing menu while at footer, re-hide nav
          const footer = document.getElementById("footer");
          if (footer) {
            const footerRect = footer.getBoundingClientRect();
            if (footerRect.top < window.innerHeight * 0.95) {
              gsap.to(nav, { opacity: 0, duration: 0.3, ease: "power2.out", pointerEvents: "none" });
            }
          }
        }
      }
      return next;
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
