"use client";

import { useEffect } from "react";
import Image from "next/image";

export default function Footer() {
  useEffect(() => {
    function setFooterMargin() {
      const footer = document.getElementById("footer");
      const mainWrapper = document.getElementById("mainWrapper");
      if (footer && mainWrapper) {
        mainWrapper.style.marginBottom = footer.offsetHeight + "px";
      }
    }

    setFooterMargin();
    window.addEventListener("resize", setFooterMargin);
    return () => window.removeEventListener("resize", setFooterMargin);
  }, []);

  return (
    <footer className="footer" id="footer">
      <div className="footer__inner">
        <div>
          <a href="#" className="nav__logo" style={{ display: "inline-block" }}>
            <Image
              src="/pckup-logo-light.png"
              alt="Pckup"
              width={85}
              height={24}
            />
          </a>
          <p className="footer__brand-tagline">
            Intelligent delivery infrastructure for businesses that never
            stop moving.
          </p>
        </div>
        <div>
          <p className="footer__col-title">Platform</p>
          <ul className="footer__links">
            <li><a href="#">AI Routing</a></li>
            <li><a href="#">Same-Day Delivery</a></li>
            <li><a href="#">Enterprise API</a></li>
            <li><a href="#">Live Tracking</a></li>
            <li><a href="#">Analytics</a></li>
          </ul>
        </div>
        <div>
          <p className="footer__col-title">Company</p>
          <ul className="footer__links">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div>
          <p className="footer__col-title">Resources</p>
          <ul className="footer__links">
            <li><a href="#">Documentation</a></li>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Status</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms</a></li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <span className="footer__copy">
          &copy; 2026 Pckup. All rights reserved.
        </span>
        <div className="footer__socials">
          <a href="#">LinkedIn</a>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
        </div>
      </div>
    </footer>
  );
}
