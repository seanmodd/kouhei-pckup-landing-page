"use client";

import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation } from "swiper/modules";
import { gsap } from "gsap";
import type SwiperType from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";

const TESTIMONIALS = [
  {
    tag: "E-Commerce \u00B7 Enterprise",
    quote:
      "\u201CPckup transformed our last-mile operations. Their AI routing cut delivery times by 35% while reducing costs. The real-time tracking gives our customers confidence we never had before.\u201D",
    author: "Sarah Chen",
    role: "VP Operations, NovaMart",
  },
  {
    tag: "Healthcare \u00B7 B2B",
    quote:
      "\u201CIn healthcare logistics, reliability isn\u2019t optional \u2014 it\u2019s critical. Pckup\u2019s 99.4% on-time rate and specialized handling protocols have made them our sole delivery partner.\u201D",
    author: "Dr. Michael Torres",
    role: "COO, MediFlow Labs",
  },
  {
    tag: "Retail \u00B7 SMB",
    quote:
      "\u201CAs a small business, we needed enterprise-level delivery without enterprise costs. Pckup\u2019s platform scaled with us from 50 to 5,000 deliveries per month seamlessly.\u201D",
    author: "Jamie Ortiz",
    role: "Founder, Bloom & Co.",
  },
];

export default function Testimonials() {
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    // Initial animation handled by Swiper onSlideChangeTransitionStart
  }, []);

  const handleSlideChange = (swiper: SwiperType) => {
    const activeSlide = swiper.slides[swiper.activeIndex];
    if (!activeSlide) return;
    const els = activeSlide.querySelectorAll(
      ".testi-slide__tag, .testi-slide__quote, .testi-slide__author, .testi-slide__role"
    );
    gsap.fromTo(
      els,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", stagger: 0.08 }
    );
  };

  return (
    <section className="section testimonials" id="testimonials">
      <p className="section__label fade-up" style={{ textAlign: "center" }}>
        Client Stories
      </p>
      <h2
        className="section__heading fade-up"
        style={{ textAlign: "center", margin: "0 auto 48px" }}
      >
        Trusted by Industry Leaders
      </h2>
      <div className="fade-up">
        <Swiper
          modules={[EffectFade, Navigation]}
          slidesPerView={1}
          speed={600}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChangeTransitionStart={handleSlideChange}
          className="testi-swiper"
        >
          {TESTIMONIALS.map((t, i) => (
            <SwiperSlide key={i} className="testi-slide">
              <p className="testi-slide__tag">{t.tag}</p>
              <blockquote className="testi-slide__quote">
                {t.quote}
              </blockquote>
              <p className="testi-slide__author">{t.author}</p>
              <p className="testi-slide__role">{t.role}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="testi-arrows fade-up">
        <button
          className="testi-arrow"
          aria-label="Previous"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <svg viewBox="0 0 24 24">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          className="testi-arrow"
          aria-label="Next"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <svg viewBox="0 0 24 24">
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </button>
      </div>
    </section>
  );
}
