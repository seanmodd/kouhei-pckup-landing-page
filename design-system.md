# Design System Reference

> Source: [admdesign.com.sg](https://www.admdesign.com.sg/)
> Purpose: Structural and animation reference for Pckup website rebuild (v5)

---

Build a single-page website for "ADM Design & Build" — a premium interior design & build firm based in Singapore. The design is dark, cinematic, editorial, and corporate-premium with dramatic scroll-triggered typography reveals, parallax layering, and a 3D project showcase. Use GSAP + ScrollTrigger for all animations and Swiper.js for carousels.

---

## Global Design System

Fonts: "Inter" or "DM Sans" for body (font-sans), weights 400-600. A condensed geometric sans-serif like "Outfit" or "Sora" for display headings (font-display), weights 700-900. Import from Google Fonts.

Color scheme: Deep black background #080808, pure white text #FFFFFF, muted body text rgba(255,255,255,0.6), single accent color — vivid orange #F57F00. No other colors. Monochrome + orange only.

Spacing philosophy: Spacious, editorial-grade whitespace. Consistent section padding py-24 md:py-32, horizontal padding px-8 md:px-16. Max content width 1400px, centered.

Global animation pattern: Nearly every section element uses a fade-up reveal on scroll into viewport:
- Start state: opacity: 0; transform: translateY(60px)
- End state: opacity: 1; transform: translateY(0)
- Duration: 0.8s, easing: power2.out
- Triggered by IntersectionObserver at 20% threshold from bottom
- Staggered 0.1-0.15s between sibling elements

Smooth scrolling: Use Lenis for buttery inertia-based smooth scroll across the entire page. All scroll-triggered animations hook into Lenis's RAF loop via GSAP ScrollTrigger.

---

## Section 0 — Preloader

Full-screen overlay (position: fixed; inset: 0; z-index: 9999; background: #080808). Contains:
- Centered ADM logo that pulses: scale(0.9) opacity:0 -> scale(1.0) opacity:1 over 0.8s ease-out
- A thin progress bar at the bottom: width: 0% -> width: 100%, 0.2s linear incremental transitions, h-[2px] bg-[#F57F00]
- Exit animation: Entire overlay slides up — translateY(0) -> translateY(-100%), duration 1.2s, easing power4.inOut (dramatic slow-start, fast-middle, slow-end). Triggered when all assets loaded.
- Once preloader exits, hero animations begin.

---

## Section 1 — Navigation Bar

Layout: position: sticky; top: 0; z-index: 100. Flexbox row: justify-between items-center, height 70px, px-8 md:px-16.

Initial state: background: transparent.
After scroll > 50px: background: rgba(8,8,8,0.95); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255,255,255,0.07). Transition: 0.4s ease.

Logo (left): "adm" logotype — font-display text-xl font-bold tracking-tight text-white. Stacked with small subtitle text below.

Nav links (center, hidden on mobile): "Home", "About Us", "Services", "Projects", "Clients", "What's On" — each text-xs font-semibold tracking-[0.12em] uppercase text-white/60 hover:text-white transition-colors duration-300. Underline expands from center on hover: ::after pseudo-element, width: 0 -> 100%, h-[1px] bg-[#F57F00], transition: 0.3s ease.

Right side: Language dropdown "EN" (text-xs text-white/50, border border-white/15 rounded-md px-3 py-1) + "Contact Us" CTA button (bg-[#F57F00] text-black text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-full hover:brightness-110 hover:translateY(-1px) transition-all 0.2s).

Mobile hamburger: Three horizontal bars — on click, top/bottom bars rotate +/-45deg to form X, middle bar scales to 0. Full-screen overlay slides down with staggered link reveal (y: 20px opacity:0 -> y:0 opacity:1, stagger 0.1s).

---

## Section 2 — Hero

Layout: Full viewport height (min-h-screen), position: relative; overflow: hidden. Centered content with flex items-center justify-center.

Background: Full-bleed hero image (office/architectural interior), object-cover. Dark gradient overlay: bg-gradient-to-t from-[#080808] via-[#080808]/50 to-transparent. Background image has slow cinematic zoom: scale(1.08) -> scale(1.0), duration 10s ease-out, triggered on load.

Headline: "Transform A Space for Work into A Space for Life" — font-display text-[clamp(36px,5.5vw,72px)] font-bold leading-[1.05] tracking-tight text-white text-center max-w-4xl.

Animation (Split Text Line Reveal): Text is split into lines, each wrapped in overflow: hidden container. Each line animates:
- Start: translateY(100%) opacity:0 rotateX(10deg)
- End: translateY(0) opacity:1 rotateX(0)
- Duration: 1.0s per line, easing: power3.out
- Stagger: 0.15s between lines
- Triggered after preloader exit completes

Subtitle: "ADM Design and Build is a reliable interior designer & builder in Singapore..." — font-sans text-base md:text-lg text-white/60 font-light text-center max-w-xl mt-8. Fades up after headline completes (delay: 0.6s).

---

## Section 3 — "Who We Are" (Stats Section)

Layout: py-24 md:py-32. Heading left-aligned, stats in grid-cols-3 (1-col mobile) below, gap-8.

Heading: "Who We Are" — font-display text-4xl md:text-6xl font-bold text-white. Fade-up on scroll.

Stats cards: Each card contains:
- Big number: font-display text-5xl md:text-7xl font-bold text-white — counter animation from 0 to final value (e.g., 20, 08, 3M) over 2.0s on scroll into view
- "+" suffix in text-[#F57F00]
- Label: text-sm text-white/50 uppercase tracking-wider mt-2
- Stats: "20+ Years of Experience" | "08 Global Offices in Asia Pacific" | "3M SQM Project Completed"
- Entire row fades up: y:60px opacity:0 -> y:0 opacity:1, 0.8s power2.out, staggered 0.15s

---

## Section 4 — "Our Values" (Interactive List)

Layout: Two-column — large heading left, interactive list right.

Heading: "Our Values" — font-display text-5xl md:text-7xl font-bold.

List items: "01 Experience", "02 Expansion", "03 Reliable", "04 Performance" — each is a row with border-bottom: 1px solid rgba(255,255,255,0.15), py-6.

Hover interaction:
- Default: opacity: 0.5
- Hover: opacity: 1; padding-left: 20px; border-color: #F57F00
- Siblings dim to opacity: 0.3
- Transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1)

Background image: Each list item, when hovered, reveals a corresponding full-bleed background image behind the section with opacity 0.4s ease-in-out crossfade. Images are office/team photos with dark overlay.

---

## Section 5 — "What We Do" (Services Grid)

Layout: Section heading top, then grid-cols-4 (1-col mobile), gap-6.

Heading: "Designing Life into Every Space" — font-display text-4xl md:text-6xl font-bold.

4 Service cards (each with glassmorphism-lite: bg-white/[0.03] border border-white/10 rounded-2xl p-8):
- Step number: text-[#F57F00] text-sm font-mono tracking-wider — "01", "02", "03", "04"
- Title: font-display text-2xl font-bold mt-4 — "PLANNING", "DESIGNING", "CONSTRUCTION", "MANAGEMENT"
- Sub-items with orange bullet dots: "Pre-release planning", "Workplace study", etc. — text-sm text-white/60 mt-4

Animation: Cards stagger in on scroll — y:60px opacity:0 -> y:0 opacity:1, stagger 0.15s per card.

---

## Section 6 — "Why ADM?" (3 Pillars)

Layout: Centered heading, then grid-cols-3 (1-col mobile), gap-8, py-24.

Heading: "Bold Design. Clear Strategy. Dependable Results." — font-display text-4xl md:text-6xl font-bold text-center. "Why ADM?" as small label above in text-xs uppercase tracking-[0.3em] text-[#F57F00].

3 Pillar cards: Each contains SVG icon (orange stroke), title (text-xl font-bold), description (text-sm text-white/60):
1. "Perfectly Designed" — "innovative, creative projects which meet standards"
2. "Carefully Planned" — "analyse business, operations, workflow"
3. "Smartly Executed" — "efficient execution, timely delivery, inspection"

Animation: Staggered fade-up on scroll, 0.15s delay between cards.

---

## Section 7 — Projects Showcase

Layout: py-24. Heading + filter tabs top, then grid-cols-3 (1-col mobile) project cards.

Heading: "Projects That Define Our Craft" — font-display text-4xl md:text-6xl font-bold.
Filter tabs: "Corporate HQ", "Others" — text-sm uppercase tracking-wider, active tab has border-bottom: 2px solid #F57F00.

Project cards: Each card has stacked images (two layers):
- Default: Primary image visible, scale(1.0)
- Hover: Second image crossfades in (opacity: 0 -> 1, 0.3s ease), primary image scales up (scale(1.0) -> scale(1.05), 0.6s ease-out), dark gradient overlay fades in (opacity: 0 -> 0.3)
- Text overlay on hover: Client logo + brief description + "View Project" link appear with fade-up

Modal on click: Full-screen project detail panel:
- Backdrop: rgba(0,0,0,0.8) fades in (0.4s)
- Panel slides in from right: translateX(100%) -> translateX(0), 0.6s expo.out
- Contains: Swiper image gallery with thumbnail strip below
- Thumbnail strip: Inactive = scale(0.9) brightness(0.5), Active = scale(1.0) brightness(1.0), 0.3s ease
- Close reverses the animation

---

## Section 8 — Testimonials Carousel

Layout: py-24. Swiper carousel, single slide visible at a time with left/right arrow navigation.

Each slide: Client testimonial quote (text-lg md:text-xl text-white/80 italic leading-relaxed), client name + company (text-sm font-bold text-white), service tags in text-[#F57F00] text-xs uppercase tracking-wider.

Swiper config: slidesPerView: 1, speed: 600ms, effect: 'fade' or slide. Arrow buttons: SVG arrows in bordered circles, hover: stroke/fill -> #F57F00.

Text animation: On each slide change, quote text fades up with stagger (y:20px opacity:0 -> y:0 opacity:1, 0.4s, stagger 0.05s per line).

---

## Section 9 — Client Logos Marquee

Layout: py-16. Two rows of logos scrolling in opposite directions.

Animation: CSS @keyframes scroll — translateX(0) -> translateX(calc(-100% - var(--gap))), 30s linear infinite. Second row uses animation-direction: reverse. Content is duplicated for seamless loop.

Gap: --gap: 1vw desktop, 10vw mobile.
Hover: animation-play-state: paused on mouse enter.
Edge fade: Left/right edges masked with linear-gradient(to right, #080808, transparent 10%, transparent 90%, #080808).

---

## Section 10 — CTA Section

Layout: py-32 text-center, background grid of 4-6 project photos at opacity: 0.15 with dark overlay.

Heading: "Bring Your Vision to Life — Connect with ADM Today" — font-display text-4xl md:text-6xl font-bold text-white.
Button: "Send Your Inquiry" — bg-[#F57F00] text-black font-semibold text-sm uppercase tracking-wider px-8 py-4 rounded-full hover:scale-105 hover:brightness-110 transition-all 0.3s.

Animation: Heading + button fade up on scroll, staggered 0.2s.

---

## Section 11 — Footer (Parallax Reveal)

Effect: Footer is position: fixed; bottom: 0; z-index: -1. The main content wrapper has margin-bottom equal to footer height and position: relative; z-index: 1; background: #080808. As user scrolls to the end, the main content "lifts away" like a curtain, revealing the stationary footer beneath — a parallax curtain reveal.

Layout: py-16, 4-column grid: Brand tagline column | Quick links | Location addresses (Singapore, Thailand, Vietnam, Greater China) | Social icons (Facebook, LinkedIn, Instagram).

Tagline: "Transform A Space for Work, into A Space for Life" — font-display text-xl font-bold.
Links: text-sm text-white/50 hover:text-[#F57F00] transition-colors 0.3s.
Copyright: "2025 adm Design & Build. All Rights Reserved" — text-xs text-white/30 border-t border-white/10 pt-8 mt-8.

---

## Animation Stack Summary

| Library | Purpose |
|---------|---------|
| GSAP + ScrollTrigger | All scroll-triggered fade-ups, staggered reveals, counter animations, split-text hero |
| Lenis | Smooth scroll with inertia damping |
| SplitType | Hero headline line-by-line split for masked reveal |
| Swiper.js | Testimonial carousel, project detail gallery + thumbnails, 3D building showcase |
| CSS @keyframes | Marquee infinite scroll, preloader progress bar |
| IntersectionObserver | Scroll trigger fallback / batch element detection |
