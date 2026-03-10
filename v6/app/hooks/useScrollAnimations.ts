"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimations() {
  useEffect(() => {
    // Fade-up batch animation
    ScrollTrigger.batch(".fade-up", {
      onEnter: (batch) => {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.12,
          overwrite: true,
        });
      },
      start: "top 85%",
      once: true,
    });

    // Counter animation (skip hero stats — those are animated by Hero component)
    document.querySelectorAll(".counter:not(.hero__stats-bar .counter)").forEach((counter) => {
      const target = parseFloat(
        counter.getAttribute("data-target") || "0"
      );
      const isDecimal = target % 1 !== 0;

      ScrollTrigger.create({
        trigger: counter,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to({ val: 0 }, {
            val: target,
            duration: 2,
            ease: "power2.out",
            onUpdate: function () {
              counter.textContent = isDecimal
                ? this.targets()[0].val.toFixed(1)
                : String(Math.floor(this.targets()[0].val));
            },
          });
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
}
