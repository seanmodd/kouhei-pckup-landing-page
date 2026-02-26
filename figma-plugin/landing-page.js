// ============================================================
//  pckup — Landing Page v2 (Illustrated + Animated Style)
//  Replace code.js content with this file, then Run.
// ============================================================

async function run() {
  await Promise.all([
    figma.loadFontAsync({ family: "Inter", style: "Regular" }),
    figma.loadFontAsync({ family: "Inter", style: "Medium" }),
    figma.loadFontAsync({ family: "Inter", style: "Semi Bold" }),
    figma.loadFontAsync({ family: "Inter", style: "Bold" }),
    figma.loadFontAsync({ family: "Inter", style: "Extra Bold" }),
  ]);

  // ── Colors ───────────────────────────────────────────────
  const C = {
    teal:      { r: 8/255,   g: 77/255,  b: 83/255  },
    tealLight: { r: 14/255,  g: 110/255, b: 120/255 },
    orange:    { r: 241/255, g: 65/255,  b: 8/255   },
    dark:      { r: 45/255,  g: 45/255,  b: 45/255  },
    offWhite:  { r: 246/255, g: 246/255, b: 246/255 },
    white:     { r: 1,       g: 1,       b: 1       },
    n200:      { r: 217/255, g: 217/255, b: 217/255 },
    n400:      { r: 158/255, g: 158/255, b: 158/255 },
    n500:      { r: 117/255, g: 117/255, b: 117/255 },
    n600:      { r: 97/255,  g: 97/255,  b: 97/255  },
    heroText:  { r: 195/255, g: 210/255, b: 212/255 },
    footerSub: { r: 140/255, g: 152/255, b: 152/255 },
    footerLnk: { r: 100/255, g: 110/255, b: 112/255 },
  };

  // ── Primitive helpers ────────────────────────────────────
  const fill  = (c, a=1) => [{ type:"SOLID", color:c, opacity:a }];
  const noFill = [];

  const txt = async (chars, { sz=16, wt="Regular", col=C.dark, align="LEFT", lh=null, ls=null }={}) => {
    const t = figma.createText();
    t.fontName = { family:"Inter", style:wt };
    t.characters = chars;
    t.fontSize = sz;
    t.fills = fill(col);
    t.textAlignHorizontal = align;
    if (lh) t.lineHeight = { value:lh, unit:"PERCENT" };
    if (ls) t.letterSpacing = { value:ls, unit:"PIXELS" };
    return t;
  };

  const rect = (w, h, col, { r=0, a=1, name="" }={}) => {
    const s = figma.createRectangle();
    s.resize(w, h);
    s.fills = fill(col, a);
    s.cornerRadius = r;
    if (name) s.name = name;
    return s;
  };

  const ellipse = (w, h, col, { a=1, name="" }={}) => {
    const e = figma.createEllipse();
    e.resize(w, h);
    e.fills = fill(col, a);
    if (name) e.name = name;
    return e;
  };

  const vec = (pathData, col, { a=1, sw=0, sc=null, name="" }={}) => {
    const v = figma.createVector();
    v.vectorPaths = [{ windingRule:"NONZERO", data:pathData }];
    v.fills = col ? fill(col, a) : noFill;
    if (sw && sc) { v.strokes = [{ type:"SOLID", color:sc }]; v.strokeWeight = sw; v.strokeAlign = "CENTER"; }
    if (name) v.name = name;
    return v;
  };

  const stroke = (pathData, col, sw=2, { dashLen=0, a=1, name="" }={}) => {
    const v = figma.createVector();
    v.vectorPaths = [{ windingRule:"NONZERO", data:pathData }];
    v.fills = noFill;
    v.strokes = [{ type:"SOLID", color:col, opacity:a }];
    v.strokeWeight = sw;
    if (dashLen) v.dashPattern = [dashLen, dashLen * 0.75];
    if (name) v.name = name;
    return v;
  };

  const fr = (name, { dir="VERTICAL", w, h, bg=null, bga=1, r=0, gap=0,
    pv=0, ph=0, pt=null, pb=null, pl=null, pr=null,
    main="MIN", cross="MIN", ms="AUTO", cs="AUTO" }={}) => {
    const f = figma.createFrame();
    f.name = name;
    f.layoutMode = dir;
    f.primaryAxisSizingMode = ms;
    f.counterAxisSizingMode = cs;
    if (w) f.resize(w, h || 100);
    f.itemSpacing = gap;
    f.paddingTop    = pt !== null ? pt : pv;
    f.paddingBottom = pb !== null ? pb : pv;
    f.paddingLeft   = pl !== null ? pl : ph;
    f.paddingRight  = pr !== null ? pr : ph;
    f.primaryAxisAlignItems = main;
    f.counterAxisAlignItems = cross;
    f.cornerRadius = r;
    f.fills = bg ? fill(bg, bga) : noFill;
    f.clipsContent = false;
    return f;
  };

  const addStroke = (node, col, sw=1.5) => {
    node.strokes = [{ type:"SOLID", color:col }];
    node.strokeWeight = sw;
    node.strokeAlign = "INSIDE";
  };

  const div = (w, col, a=1) => {
    const d = rect(w, 1, col, { a });
    d.name = "Divider";
    return d;
  };

  // ── Illustration helpers ─────────────────────────────────

  // Location pin (w=24, h=32)
  const pin = (col, { a=1 }={}) => {
    const g = figma.createFrame();
    g.name = "Location Pin";
    g.resize(24, 32);
    g.fills = noFill;
    g.clipsContent = false;
    const body = vec(
      "M 12 0 C 5.37 0 0 5.37 0 12 C 0 20 12 32 12 32 C 12 32 24 20 24 12 C 24 5.37 18.63 0 12 0 Z",
      col, { a }
    );
    body.resize(24, 32);
    const dot = ellipse(8, 8, C.white, { a });
    dot.x = 8; dot.y = 8;
    g.appendChild(body);
    g.appendChild(dot);
    return g;
  };

  // Isometric package box
  const packageBox = (size, { topCol, leftCol, rightCol }={}) => {
    const g = figma.createFrame();
    g.name = "Package Box";
    g.resize(size, size * 0.9);
    g.fills = noFill;
    g.clipsContent = false;
    const h = size * 0.9;
    const hh = h / 2;
    const top   = vec(`M ${size/2} 0 L ${size} ${hh*0.5} L ${size/2} ${hh} L 0 ${hh*0.5} Z`, topCol  || C.orange);
    const left  = vec(`M 0 ${hh*0.5} L ${size/2} ${hh} L ${size/2} ${h} L 0 ${h*0.7} Z`,    leftCol  || { r:200/255,g:50/255,b:5/255 });
    const right = vec(`M ${size} ${hh*0.5} L ${size/2} ${hh} L ${size/2} ${h} L ${size} ${h*0.7} Z`, rightCol || { r:220/255,g:55/255,b:6/255 });
    // tape line
    const tape = rect(size*0.08, hh*0.55, C.white, { a:0.4 });
    tape.x = size/2 - size*0.04;
    tape.y = hh*0.5;
    g.appendChild(top);
    g.appendChild(left);
    g.appendChild(right);
    g.appendChild(tape);
    return g;
  };

  // Truck silhouette (160 x 80)
  const truck = () => {
    const g = figma.createFrame();
    g.name = "Truck";
    g.resize(160, 80);
    g.fills = noFill;
    g.clipsContent = false;
    // body
    const body = rect(100, 52, C.teal, { r:6 });
    body.x = 0; body.y = 10;
    // cab
    const cab = rect(52, 52, C.tealLight, { r:6 });
    cab.x = 108; cab.y = 10;
    // windshield
    const wind = rect(30, 26, C.white, { r:4, a:0.15 });
    wind.x = 118; wind.y = 18;
    // underbody
    const under = rect(152, 8, C.dark, { r:2, a:0.4 });
    under.x = 0; under.y = 62;
    // wheels
    const wL = ellipse(26, 26, C.dark);
    wL.x = 14; wL.y = 52;
    const wR = ellipse(26, 26, C.dark);
    wR.x = 114; wR.y = 52;
    const wLi = ellipse(12, 12, C.n400);
    wLi.x = 21; wLi.y = 59;
    const wRi = ellipse(12, 12, C.n400);
    wRi.x = 121; wRi.y = 59;
    // headlight
    const hl = rect(6, 10, C.orange, { r:2 });
    hl.x = 154; hl.y = 38;
    // pckup mark on body
    [body, cab, under, wind, wL, wR, wLi, wRi, hl].forEach(n => g.appendChild(n));
    return g;
  };

  // Floating dot cluster
  const dotCloud = (count, spread, col, baseA=0.15) => {
    const g = figma.createFrame();
    g.name = "Dot Cloud";
    g.resize(spread, spread);
    g.fills = noFill;
    g.clipsContent = false;
    const positions = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const r2 = spread * 0.3 + (i % 3) * spread * 0.1;
      positions.push([
        spread/2 + Math.cos(angle) * r2,
        spread/2 + Math.sin(angle) * r2,
      ]);
    }
    positions.forEach(([x, y], i) => {
      const sz = 4 + (i % 4) * 2;
      const d = ellipse(sz, sz, col, { a: baseA + (i % 3) * 0.05 });
      d.x = x - sz/2; d.y = y - sz/2;
      g.appendChild(d);
    });
    return g;
  };

  // Route dashed line
  const routeLine = (x1, y1, x2, y2, col, { sw=2, dashLen=8, a=0.5 }={}) => {
    return stroke(`M ${x1} ${y1} Q ${(x1+x2)/2} ${y1} ${x2} ${y2}`, col, sw, { dashLen, a, name:"Route Line" });
  };

  // Speed lines (animation feel)
  const speedLines = (w, col, count=5) => {
    const g = figma.createFrame();
    g.name = "Speed Lines";
    g.resize(w, 60);
    g.fills = noFill;
    g.clipsContent = false;
    for (let i = 0; i < count; i++) {
      const len = w * (0.3 + (i % 3) * 0.15);
      const y = 8 + i * 12;
      const s = stroke(`M 0 ${y} L ${len} ${y}`, col, 1.5, { a: 0.1 + i*0.04, name:`Speed ${i}` });
      g.appendChild(s);
    }
    return g;
  };

  // Step illustration icons
  const stepIllustration = (step) => {
    const g = figma.createFrame();
    g.name = `Illus Step ${step}`;
    g.resize(48, 48);
    g.fills = noFill;
    g.clipsContent = false;

    if (step === 1) {
      // Calendar + checkmark
      const base = rect(40, 36, C.teal, { r:6, a:0.15 });
      base.x = 4; base.y = 8;
      const top = rect(40, 10, C.teal, { r:4 });
      top.x = 4; top.y = 6;
      const d1 = rect(6, 6, C.white, { r:1 });
      d1.x = 10; d1.y = 22;
      const d2 = rect(6, 6, C.white, { r:1 });
      d2.x = 21; d2.y = 22;
      const d3 = rect(6, 6, C.orange, { r:1 });
      d3.x = 32; d3.y = 22;
      const d4 = rect(6, 6, C.white, { r:1 });
      d4.x = 10; d4.y = 33;
      [base, top, d1, d2, d3, d4].forEach(n => g.appendChild(n));
    } else if (step === 2) {
      // Mini truck
      const b = rect(28, 16, C.teal, { r:3 });
      b.x = 0; b.y = 16;
      const c2 = rect(14, 16, C.tealLight, { r:3 });
      c2.x = 30; c2.y = 16;
      const w1 = ellipse(10, 10, C.dark);
      w1.x = 4; w1.y = 30;
      const w2 = ellipse(10, 10, C.dark);
      w2.x = 34; w2.y = 30;
      const sp1 = speedLines(44, C.orange, 3);
      sp1.x = 2; sp1.y = 0;
      [sp1, b, c2, w1, w2].forEach(n => g.appendChild(n));
    } else {
      // Checkmark circle
      const circle = ellipse(44, 44, C.teal, { a:0.15 });
      circle.x = 2; circle.y = 2;
      const check = stroke("M 14 24 L 22 32 L 36 16", C.teal, 3, { name:"Check" });
      check.x = 0; check.y = 0;
      check.strokeCap = "ROUND";
      check.strokeJoin = "ROUND";
      [circle, check].forEach(n => g.appendChild(n));
    }
    return g;
  };

  // Feature icon illustrations
  const featIcon = (type) => {
    const g = figma.createFrame();
    g.name = `Icon / ${type}`;
    g.resize(40, 40);
    g.fills = fill(C.orange, 0.1);
    g.cornerRadius = 10;
    g.clipsContent = false;

    const icons = {
      "same-day": () => {
        const c = ellipse(24, 24, C.orange, { a:0.2 });
        c.x = 8; c.y = 8;
        const hand = stroke("M 20 20 L 20 10 M 20 10 A 10 10 0 0 1 30 20", C.orange, 2);
        hand.x = 0; hand.y = 0;
        const dot = ellipse(4, 4, C.orange);
        dot.x = 18; dot.y = 7;
        [c, hand, dot].forEach(n => g.appendChild(n));
      },
      "tracking": () => {
        const p = pin(C.orange);
        p.x = 8; p.y = 4;
        const r2 = ellipse(18, 8, C.orange, { a:0.15 });
        r2.x = 11; r2.y = 28;
        [p, r2].forEach(n => g.appendChild(n));
      },
      "network": () => {
        const c1 = ellipse(10, 10, C.teal, { a:0.9 });
        c1.x = 15; c1.y = 4;
        const c2 = ellipse(8, 8, C.orange, { a:0.9 });
        c2.x = 4; c2.y = 24;
        const c3 = ellipse(8, 8, C.orange, { a:0.9 });
        c3.x = 28; c3.y = 24;
        const l1 = stroke("M 20 14 L 8 28", C.teal, 1.5, { a:0.5 });
        const l2 = stroke("M 20 14 L 32 28", C.teal, 1.5, { a:0.5 });
        const l3 = stroke("M 8 28 L 32 28", C.teal, 1.5, { a:0.3 });
        [l1, l2, l3, c1, c2, c3].forEach(n => g.appendChild(n));
      },
      "insured": () => {
        const shield = vec("M 20 2 L 36 8 L 36 22 C 36 30 20 38 20 38 C 20 38 4 30 4 22 L 4 8 Z", C.teal, { a:0.2 });
        shield.resize(32, 36);
        shield.x = 4; shield.y = 2;
        const check2 = stroke("M 13 20 L 19 26 L 28 14", C.teal, 2.5);
        check2.x = 0; check2.y = 0;
        [shield, check2].forEach(n => g.appendChild(n));
      },
      "dashboard": () => {
        const base2 = rect(32, 26, C.teal, { r:4, a:0.15 });
        base2.x = 4; base2.y = 4;
        const bar1 = rect(6, 12, C.teal, { r:2 });
        bar1.x = 8; bar1.y = 14;
        const bar2 = rect(6, 18, C.orange, { r:2 });
        bar2.x = 17; bar2.y = 8;
        const bar3 = rect(6, 8, C.teal, { r:2, a:0.5 });
        bar3.x = 26; bar3.y = 18;
        const leg = rect(16, 4, C.teal, { r:2, a:0.4 });
        leg.x = 12; leg.y = 32;
        [base2, bar1, bar2, bar3, leg].forEach(n => g.appendChild(n));
      },
      "coverage": () => {
        const globe = ellipse(32, 32, C.teal, { a:0.15 });
        globe.x = 4; globe.y = 4;
        const line1 = stroke("M 4 20 Q 20 14 36 20", C.teal, 1.5, { a:0.6 });
        const line2 = stroke("M 4 20 Q 20 26 36 20", C.teal, 1.5, { a:0.6 });
        const vert = stroke("M 20 4 L 20 36", C.teal, 1.5, { a:0.4 });
        const pinG = pin(C.orange);
        pinG.resize(12, 16);
        pinG.x = 14; pinG.y = 4;
        [globe, line1, line2, vert, pinG].forEach(n => g.appendChild(n));
      },
    };

    if (icons[type]) icons[type]();
    return g;
  };

  // Animation annotation tag
  const animTag = async (label, detail) => {
    const g = fr("Anim Tag", {
      dir:"HORIZONTAL", bg:{ r:0.05,g:0.05,b:0.1 }, r:6,
      pv:6, ph:10, gap:6, ms:"AUTO", cs:"AUTO",
      main:"CENTER", cross:"CENTER",
    });
    const dot2 = ellipse(6, 6, C.orange);
    g.appendChild(dot2);
    const labelTxt = await txt(`${label}  `, { sz:10, wt:"Semi Bold", col:C.orange });
    g.appendChild(labelTxt);
    const detailTxt = await txt(detail, { sz:10, col:C.heroText });
    g.appendChild(detailTxt);
    g.opacity = 0.85;
    return g;
  };

  // ── PAGE CONTAINER ───────────────────────────────────────
  const page = fr("Homepage — Desktop 1440", {
    dir:"VERTICAL", w:1440, h:100, bg:C.white,
    ms:"AUTO", cs:"FIXED",
  });

  // ═══════════════════════════════════════════════════════
  //  NAV
  // ═══════════════════════════════════════════════════════
  const nav = fr("Nav", {
    dir:"HORIZONTAL", w:1440, bg:C.white,
    pv:20, ph:120, gap:0,
    ms:"FIXED", cs:"AUTO", cross:"CENTER",
  });
  const logoGrp = fr("Logo", { dir:"HORIZONTAL", gap:8, cross:"CENTER" });
  const lm = rect(32, 32, C.orange, { r:8, name:"Logo Mark" });
  logoGrp.appendChild(lm);
  logoGrp.appendChild(await txt("pckup", { sz:22, wt:"Bold" }));
  const navSp = fr("Spacer"); navSp.layoutGrow = 1;
  const navLks = fr("Nav Links", { dir:"HORIZONTAL", gap:32, cross:"CENTER" });
  for (const l of ["Solutions","Pricing","Tracking","About"]) {
    navLks.appendChild(await txt(l, { sz:15, wt:"Medium", col:C.n600 }));
  }
  const navCta = fr("Nav / CTA", { dir:"HORIZONTAL", bg:C.orange, r:8, pv:10, ph:20, ms:"AUTO", cs:"AUTO", main:"CENTER", cross:"CENTER" });
  navCta.appendChild(await txt("Get Started Free", { sz:14, wt:"Semi Bold", col:C.white }));
  nav.appendChild(logoGrp); nav.appendChild(navSp); nav.appendChild(navLks); nav.appendChild(navCta);
  page.appendChild(nav);
  page.appendChild(div(1440, C.n200));

  // ═══════════════════════════════════════════════════════
  //  HERO
  // ═══════════════════════════════════════════════════════
  const hero = fr("Hero", {
    dir:"HORIZONTAL", w:1440, bg:C.dark,
    pv:100, ph:120, gap:80,
    ms:"FIXED", cs:"AUTO", cross:"CENTER",
  });

  // BG decorations (absolute-positioned feel via separate absolute layer later)
  // Dots top-right
  const bgDots = dotCloud(14, 200, C.teal, 0.06);
  bgDots.x = 1200; bgDots.y = -20;

  // Hero left content
  const heroL = fr("Hero / Content", { dir:"VERTICAL", gap:24, cs:"AUTO" });
  heroL.layoutGrow = 1;

  const badge = fr("Badge", { dir:"HORIZONTAL", bg:C.orange, r:100, pv:6, ph:14, ms:"AUTO", cs:"AUTO", main:"CENTER", cross:"CENTER" });
  badge.appendChild(await txt("Powered by Senpex Infrastructure", { sz:11, wt:"Semi Bold", col:C.white, ls:0.3 }));

  const h1 = await txt("Fast, Reliable\nPickup & Delivery\nAcross the US", { sz:64, wt:"Extra Bold", col:C.white, lh:108 });
  h1.name = "H1 Headline";

  const accentBar = rect(80, 4, C.orange, { r:2, name:"Accent Bar" });

  const heroSub = await txt(
    "Ship anything, anywhere in the US. Backed by Senpex's\nnationwide network — enterprise-grade, startup-simple.",
    { sz:18, col:C.heroText, lh:162 }
  );

  const ctaRow = fr("CTA Row", { dir:"HORIZONTAL", gap:16, cross:"CENTER" });
  const btnPrimary = fr("Btn / Book Pickup", { dir:"HORIZONTAL", bg:C.orange, r:10, pv:16, ph:28, ms:"AUTO", cs:"AUTO", main:"CENTER", cross:"CENTER" });
  btnPrimary.appendChild(await txt("Book a Pickup", { sz:16, wt:"Semi Bold", col:C.white }));
  const btnSecondary = fr("Btn / Track", { dir:"HORIZONTAL", r:10, pv:15, ph:28, ms:"AUTO", cs:"AUTO", main:"CENTER", cross:"CENTER" });
  addStroke(btnSecondary, C.white, 1.5);
  btnSecondary.appendChild(await txt("Track Shipment", { sz:16, wt:"Semi Bold", col:C.white }));
  ctaRow.appendChild(btnPrimary); ctaRow.appendChild(btnSecondary);

  const statsRow = fr("Stats", { dir:"HORIZONTAL", gap:40, cross:"MIN" });
  for (const [v, l] of [["50K+","Shipments/day"],["99.4%","On-time rate"],["48","States covered"]]) {
    const s = fr(`Stat ${v}`, { dir:"VERTICAL", gap:4 });
    s.appendChild(await txt(v, { sz:30, wt:"Bold", col:C.orange }));
    s.appendChild(await txt(l, { sz:13, col:C.heroText }));
    statsRow.appendChild(s);
  }

  heroL.appendChild(badge); heroL.appendChild(h1); heroL.appendChild(accentBar);
  heroL.appendChild(heroSub); heroL.appendChild(ctaRow); heroL.appendChild(statsRow);

  // Hero Right — Rich illustration
  const heroR = fr("Hero / Visual", {
    dir:"VERTICAL", w:480, h:520,
    bg:C.teal, bga:0.12, r:20,
    ms:"FIXED", cs:"FIXED",
  });
  heroR.clipsContent = false;

  // Dashed route arc behind everything
  const routeArc = stroke("M 40 420 Q 240 320 400 180 Q 460 120 430 60", C.orange, 2, { dashLen:8, a:0.35, name:"Route Arc" });
  routeArc.x = 0; routeArc.y = 0;

  // Location pins along route
  const pin1 = pin(C.orange);
  pin1.x = 30; pin1.y = 388;

  const pin2 = pin(C.teal);
  pin2.x = 215; pin2.y = 292;

  const pin3 = pin(C.orange, { a:0.5 });
  pin3.x = 390; pin3.y = 140;

  // Truck driving along route
  const truckEl = truck();
  truckEl.x = 140; truckEl.y = 330;

  // Floating packages
  const pkg1 = packageBox(36);
  pkg1.x = 340; pkg1.y = 60; pkg1.opacity = 0.9;
  const pkg2 = packageBox(24);
  pkg2.x = 60; pkg2.y = 120; pkg2.opacity = 0.7;
  const pkg3 = packageBox(20);
  pkg3.x = 400; pkg3.y = 340; pkg3.opacity = 0.6;

  // Speed lines near truck
  const spd = speedLines(100, C.orange, 4);
  spd.x = 28; spd.y = 348;

  // Tracking card overlay
  const trackCard = fr("Tracking Card", {
    dir:"VERTICAL", w:360, bg:C.white, r:14,
    pt:20, pb:20, pl:24, pr:24, gap:10,
    ms:"AUTO", cs:"FIXED",
  });
  // Subtle drop shadow via outer frame
  const liveRow = fr("Live Row", { dir:"HORIZONTAL", gap:8, cross:"CENTER", ms:"AUTO", cs:"AUTO" });
  const liveDot = ellipse(8, 8, C.orange, { name:"Live Dot" });
  liveRow.appendChild(liveDot);
  liveRow.appendChild(await txt("LIVE TRACKING", { sz:10, wt:"Semi Bold", col:C.orange, ls:1.5 }));
  trackCard.appendChild(liveRow);
  trackCard.appendChild(await txt("PKP-2024-8847291", { sz:20, wt:"Bold" }));

  // Milestone dots row
  const mRow = fr("Milestones", { dir:"HORIZONTAL", gap:0, cross:"CENTER", ms:"FIXED", cs:"FIXED" });
  mRow.resize(312, 36);
  const mLabels = ["Picked Up","In Transit","Out for Delivery","Delivered"];
  const mCols   = [C.orange, C.orange, C.teal, C.n200];
  for (let i = 0; i < 4; i++) {
    const d = ellipse(12, 12, mCols[i]);
    d.y = 12;
    mRow.appendChild(d);
    if (i < 3) {
      const ln = rect(68, 2, i < 2 ? C.orange : C.n200);
      ln.y = 17;
      mRow.appendChild(ln);
    }
  }
  trackCard.appendChild(mRow);

  // Milestone labels
  const mLblRow = fr("Milestone Labels", { dir:"HORIZONTAL", gap:0, cross:"CENTER", ms:"FIXED", cs:"AUTO" });
  mLblRow.resize(312, 20);
  for (let i = 0; i < 4; i++) {
    const lbl = await txt(mLabels[i], { sz:9, col:C.n500 });
    if (i > 0) lbl.x = i * 80 - 20;
    mLblRow.appendChild(lbl);
  }
  trackCard.appendChild(mLblRow);
  trackCard.appendChild(await txt("Est. delivery: Today by 6:00 PM  ✓", { sz:13, wt:"Medium", col:C.teal }));

  // ETA badge
  const etaBadge = fr("ETA Badge", { dir:"HORIZONTAL", bg:C.teal, bga:0.1, r:8, pv:6, ph:10, ms:"AUTO", cs:"AUTO", main:"CENTER", cross:"CENTER" });
  etaBadge.appendChild(await txt("2h 14m remaining", { sz:11, wt:"Semi Bold", col:C.teal }));
  trackCard.appendChild(etaBadge);

  // Animation annotation tags
  const animRow = fr("Anim Annotations", { dir:"HORIZONTAL", gap:8, cs:"AUTO", ms:"AUTO" });
  animRow.appendChild(await animTag("Pulse", "1.2s loop"));
  animRow.appendChild(await animTag("Slide Up", "400ms spring"));
  trackCard.appendChild(animRow);

  // Assemble hero right
  heroR.appendChild(routeArc);
  heroR.appendChild(pin1); heroR.appendChild(pin2); heroR.appendChild(pin3);
  heroR.appendChild(spd);
  heroR.appendChild(truckEl);
  heroR.appendChild(pkg1); heroR.appendChild(pkg2); heroR.appendChild(pkg3);
  // Card sits at bottom inside a padded slot
  const cardSlot = fr("Card Slot", { dir:"VERTICAL", ms:"FIXED", cs:"FIXED", pv:0, ph:0, main:"MAX", cross:"CENTER" });
  cardSlot.resize(480, 520);
  cardSlot.fills = noFill;
  cardSlot.appendChild(trackCard);
  heroR.appendChild(cardSlot);

  hero.appendChild(heroL);
  hero.appendChild(heroR);
  page.appendChild(hero);

  // ═══════════════════════════════════════════════════════
  //  TRUSTED BY
  // ═══════════════════════════════════════════════════════
  const trusted = fr("Trusted By", {
    dir:"VERTICAL", w:1440, bg:C.offWhite,
    pv:48, ph:120, gap:28,
    ms:"FIXED", cs:"AUTO", main:"CENTER", cross:"CENTER",
  });
  trusted.appendChild(await txt("TRUSTED BY LEADING BUSINESSES", { sz:11, wt:"Semi Bold", col:C.n400, align:"CENTER", ls:2 }));
  const bStrip = fr("Brand Strip", { dir:"HORIZONTAL", gap:56, cross:"CENTER" });
  for (const b of ["Shopify","Target","Wayfair","Etsy","Walmart","Amazon Sellers"]) {
    bStrip.appendChild(await txt(b, { sz:15, wt:"Semi Bold", col:C.n400 }));
  }
  trusted.appendChild(bStrip);
  page.appendChild(trusted);

  // ═══════════════════════════════════════════════════════
  //  HOW IT WORKS
  // ═══════════════════════════════════════════════════════
  const hiw = fr("How It Works", {
    dir:"VERTICAL", w:1440, bg:C.white,
    pv:96, ph:120, gap:64,
    ms:"FIXED", cs:"AUTO", cross:"CENTER",
  });

  const hiwHdr = fr("HIW Header", { dir:"VERTICAL", gap:16, cross:"CENTER" });
  hiwHdr.appendChild(await txt("HOW IT WORKS", { sz:11, wt:"Semi Bold", col:C.orange, align:"CENTER", ls:2 }));
  hiwHdr.appendChild(await txt("Ship in 3 Simple Steps", { sz:48, wt:"Bold", align:"CENTER" }));
  hiwHdr.appendChild(await txt("From doorstep pickup to your customer's door — we handle every mile.", { sz:18, col:C.n500, align:"CENTER" }));
  hiw.appendChild(hiwHdr);

  const stepsRow = fr("Steps Row", { dir:"HORIZONTAL", w:1200, gap:32, ms:"FIXED", cs:"AUTO" });
  stepsRow.counterAxisSizingMode = "AUTO";

  const stepData = [
    { num:"01", title:"Book a Pickup", desc:"Schedule via web or app in 60 seconds. Choose your pickup window — morning, afternoon, or ASAP.", anim:"Tap → ripple 200ms" },
    { num:"02", title:"We Pick It Up",  desc:"Our driver arrives on time, scans your package, and it enters Senpex's logistics network instantly.", anim:"Truck slides in 400ms spring" },
    { num:"03", title:"Fast Delivery", desc:"Real-time GPS tracking. Your customer gets notified at every milestone. Proof of delivery included.", anim:"Check draws 600ms ease" },
  ];

  for (let i = 0; i < stepData.length; i++) {
    const s = stepData[i];
    const card = fr(`Step ${s.num}`, { dir:"VERTICAL", bg:C.offWhite, r:16, pv:40, ph:32, gap:16, ms:"AUTO", cs:"AUTO" });
    card.layoutGrow = 1;

    // Connector line between cards
    if (i < 2) {
      const connDots = dotCloud(3, 24, C.orange, 0.3);
      connDots.x = 380; connDots.y = 60;
    }

    card.appendChild(await txt(s.num, { sz:12, wt:"Bold", col:C.orange, ls:1 }));

    // Illustrated icon box
    const iconWrap = fr(`Icon Wrap ${s.num}`, { dir:"VERTICAL", w:56, h:56, bg:C.white, r:14, ms:"FIXED", cs:"FIXED", main:"CENTER", cross:"CENTER" });
    const illus = stepIllustration(i+1);
    illus.x = 4; illus.y = 4;
    iconWrap.appendChild(illus);
    card.appendChild(iconWrap);

    card.appendChild(await txt(s.title, { sz:24, wt:"Bold" }));
    card.appendChild(await txt(s.desc, { sz:15, col:C.n500, lh:162 }));

    // Animation annotation
    const animAnnote = fr("Anim Note", { dir:"HORIZONTAL", bg:C.teal, bga:0.08, r:6, pv:5, ph:10, ms:"AUTO", cs:"AUTO", main:"CENTER", cross:"CENTER", gap:6 });
    animAnnote.appendChild(await txt("↗ " + s.anim, { sz:10, wt:"Medium", col:C.teal }));
    card.appendChild(animAnnote);

    stepsRow.appendChild(card);
  }

  hiw.appendChild(stepsRow);
  page.appendChild(hiw);

  // ═══════════════════════════════════════════════════════
  //  FEATURES GRID
  // ═══════════════════════════════════════════════════════
  const featSection = fr("Features", {
    dir:"VERTICAL", w:1440, bg:C.dark,
    pv:96, ph:120, gap:56,
    ms:"FIXED", cs:"AUTO", cross:"CENTER",
  });

  // Background illustration — scattered dots
  const bgNet = dotCloud(20, 400, C.teal, 0.04);
  bgNet.x = 900; bgNet.y = 0;

  const featHdr = fr("Features Header", { dir:"VERTICAL", gap:16, cross:"CENTER" });
  featHdr.appendChild(await txt("WHY PCKUP", { sz:11, wt:"Semi Bold", col:C.orange, align:"CENTER", ls:2 }));
  featHdr.appendChild(await txt("Enterprise Logistics,\nStartup-Simple Experience", { sz:48, wt:"Bold", col:C.white, align:"CENTER", lh:112 }));
  featSection.appendChild(featHdr);

  const featTypes = ["same-day","tracking","network","insured","dashboard","coverage"];
  const featTitles = ["Same-Day Pickup","Real-Time Tracking","Senpex Network","Insured Shipments","Smart Dashboard","48-State Coverage"];
  const featDescs = [
    "Schedule by 11 AM, we pick up today. Available in 200+ cities.",
    "Live GPS updates at every milestone. Customers stay informed.",
    "Access to 10,000+ carrier partners. Nation-wide reach.",
    "Every package covered up to $1,000 automatically, no extra cost.",
    "Manage all shipments. Download reports. Full REST API access.",
    "We deliver to every corner of the continental United States.",
  ];

  for (let row = 0; row < 2; row++) {
    const fRow = fr(`Feature Row ${row+1}`, { dir:"HORIZONTAL", w:1200, gap:24, ms:"FIXED", cs:"AUTO" });
    fRow.counterAxisSizingMode = "AUTO";
    for (let col = 0; col < 3; col++) {
      const idx = row*3 + col;
      const card = fr(`Feat / ${featTitles[idx]}`, { dir:"VERTICAL", r:12, pv:28, ph:28, gap:14, bg:C.white, bga:0.06, ms:"AUTO", cs:"AUTO" });
      card.layoutGrow = 1;

      // Illustrated icon
      const icon = featIcon(featTypes[idx]);
      card.appendChild(icon);

      card.appendChild(await txt(featTitles[idx], { sz:18, wt:"Semi Bold", col:C.white }));
      card.appendChild(await txt(featDescs[idx], { sz:14, col:C.heroText, lh:162 }));
      fRow.appendChild(card);
    }
    featSection.appendChild(fRow);
  }
  page.appendChild(featSection);

  // ═══════════════════════════════════════════════════════
  //  TESTIMONIALS
  // ═══════════════════════════════════════════════════════
  const testimonials = fr("Testimonials", {
    dir:"VERTICAL", w:1440, bg:C.offWhite,
    pv:96, ph:120, gap:56,
    ms:"FIXED", cs:"AUTO", cross:"CENTER",
  });

  const testHdr = fr("Test Header", { dir:"VERTICAL", gap:12, cross:"CENTER" });
  testHdr.appendChild(await txt("TESTIMONIALS", { sz:11, wt:"Semi Bold", col:C.orange, align:"CENTER", ls:2 }));
  testHdr.appendChild(await txt("Trusted by Thousands of Shippers", { sz:40, wt:"Bold", align:"CENTER" }));
  testimonials.appendChild(testHdr);

  const testRow = fr("Testimonial Cards", { dir:"HORIZONTAL", w:1200, gap:24, ms:"FIXED", cs:"AUTO" });
  testRow.counterAxisSizingMode = "AUTO";
  const tData = [
    { q:"pckup cut our fulfillment costs by 30%. The real-time tracking is incredible — our customers actually send us thank-you messages now.", n:"Sarah K.", r:"Operations Director, HomeGoods Co." },
    { q:"We ship 500+ packages a week. pckup's API integration with our Shopify store took 2 hours to set up. Absolutely seamless.", n:"Marcus T.", r:"Founder, ThreadCraft" },
    { q:"On-time delivery went from 87% to 99.1% in 3 months. Best logistics partner we've ever had. The Senpex network is a game changer.", n:"Jennifer L.", r:"VP Supply Chain, NutriFirst" },
  ];
  for (const t of tData) {
    const card = fr(`Testimonial / ${t.n}`, { dir:"VERTICAL", bg:C.white, r:16, pv:32, ph:32, gap:20, ms:"AUTO", cs:"AUTO" });
    card.layoutGrow = 1;
    // Quote mark illustration
    const qMark = await txt('"', { sz:64, wt:"Extra Bold", col:C.orange });
    qMark.opacity = 0.15;
    card.appendChild(qMark);
    card.appendChild(await txt("★★★★★", { sz:16, col:C.orange }));
    card.appendChild(await txt(`"${t.q}"`, { sz:16, col:C.n600, lh:165 }));
    const auth = fr(`Author / ${t.n}`, { dir:"VERTICAL", gap:4 });
    auth.appendChild(await txt(t.n, { sz:15, wt:"Semi Bold" }));
    auth.appendChild(await txt(t.r, { sz:13, col:C.n400 }));
    card.appendChild(auth);
    testRow.appendChild(card);
  }
  testimonials.appendChild(testRow);
  page.appendChild(testimonials);

  // ═══════════════════════════════════════════════════════
  //  PRICING
  // ═══════════════════════════════════════════════════════
  const pricing = fr("Pricing", {
    dir:"VERTICAL", w:1440, bg:C.white,
    pv:96, ph:120, gap:64,
    ms:"FIXED", cs:"AUTO", cross:"CENTER",
  });
  const priceHdr = fr("Pricing Header", { dir:"VERTICAL", gap:16, cross:"CENTER" });
  priceHdr.appendChild(await txt("PRICING", { sz:11, wt:"Semi Bold", col:C.orange, align:"CENTER", ls:2 }));
  priceHdr.appendChild(await txt("Simple, Transparent Pricing", { sz:48, wt:"Bold", align:"CENTER" }));
  priceHdr.appendChild(await txt("No hidden fees. No surprises. Scale as you grow.", { sz:18, col:C.n500, align:"CENTER" }));
  pricing.appendChild(priceHdr);

  const pCards = fr("Pricing Cards", { dir:"HORIZONTAL", w:1200, gap:24, ms:"FIXED", cs:"AUTO" });
  pCards.counterAxisSizingMode = "AUTO";
  const plans = [
    { name:"Starter",    price:"$49",   period:"/mo", featured:false, desc:"For small businesses and side hustles", features:["Up to 200 shipments/mo","Standard pickup windows","Email tracking notifications","Basic dashboard","Email support"] },
    { name:"Business",   price:"$149",  period:"/mo", featured:true,  desc:"For growing SMEs with high-volume needs", features:["Up to 2,000 shipments/mo","Priority same-day pickup","Real-time GPS + API access","Advanced analytics dashboard","Chat & phone support","Shopify / WooCommerce sync"] },
    { name:"Enterprise", price:"Custom",period:"",    featured:false, desc:"Senpex-powered for large-scale logistics", features:["Unlimited shipments","Dedicated account manager","Custom SLAs & routing rules","White-label tracking portal","Full Senpex network access","SLA-backed uptime guarantee"] },
  ];
  for (const plan of plans) {
    const card = fr(`Plan / ${plan.name}`, { dir:"VERTICAL", bg:plan.featured ? C.teal : C.offWhite, r:16, pv:40, ph:32, gap:20, ms:"AUTO", cs:"AUTO" });
    card.layoutGrow = 1;
    const tc = plan.featured ? C.white : C.dark;
    const sc = plan.featured ? C.heroText : C.n500;

    if (plan.featured) {
      const popBadge = fr("Most Popular", { dir:"HORIZONTAL", bg:C.orange, r:100, pv:5, ph:14, ms:"AUTO", cs:"AUTO", main:"CENTER", cross:"CENTER" });
      popBadge.appendChild(await txt("MOST POPULAR", { sz:10, wt:"Bold", col:C.white, ls:1 }));
      card.appendChild(popBadge);
    }

    // Decorative package illustration on featured card
    if (plan.featured) {
      const featPkg = packageBox(48, { topCol:C.orange, leftCol:{ r:200/255,g:50/255,b:5/255 }, rightCol:{ r:220/255,g:55/255,b:6/255 } });
      featPkg.opacity = 0.2;
      card.appendChild(featPkg);
    }

    card.appendChild(await txt(plan.name, { sz:22, wt:"Bold", col:tc }));
    card.appendChild(await txt(plan.desc, { sz:14, col:sc, lh:155 }));
    card.appendChild(div(200, plan.featured ? C.white : C.n200, plan.featured ? 0.15 : 1));

    const prRow = fr(`Price Row / ${plan.name}`, { dir:"HORIZONTAL", gap:4, cross:"BASELINE" });
    prRow.appendChild(await txt(plan.price, { sz:52, wt:"Bold", col:tc }));
    if (plan.period) prRow.appendChild(await txt(plan.period, { sz:16, col:sc }));
    card.appendChild(prRow);

    for (const f of plan.features) {
      const fl = fr(`F/${f}`, { dir:"HORIZONTAL", gap:10, cross:"CENTER" });
      fl.appendChild(await txt("✓", { sz:14, wt:"Bold", col:C.orange }));
      fl.appendChild(await txt(f, { sz:14, col:plan.featured ? C.white : C.n600 }));
      card.appendChild(fl);
    }

    const cCta = fr(`Card CTA / ${plan.name}`, { dir:"HORIZONTAL", bg:plan.featured ? C.orange : null, r:10, pv:14, ph:24, ms:"AUTO", cs:"AUTO", main:"CENTER", cross:"CENTER" });
    if (!plan.featured) addStroke(cCta, C.teal, 1.5);
    cCta.appendChild(await txt(plan.name==="Enterprise" ? "Contact Sales" : "Get Started", { sz:15, wt:"Semi Bold", col:plan.featured ? C.white : C.teal }));
    card.appendChild(cCta);
    pCards.appendChild(card);
  }
  pricing.appendChild(pCards);
  page.appendChild(pricing);

  // ═══════════════════════════════════════════════════════
  //  CTA BANNER
  // ═══════════════════════════════════════════════════════
  const ctaBanner = fr("CTA Banner", {
    dir:"VERTICAL", w:1440, bg:C.orange,
    pv:96, ph:120, gap:24,
    ms:"FIXED", cs:"AUTO", main:"CENTER", cross:"CENTER",
  });

  // Background illustration — route lines on banner
  const bannerRoute1 = stroke("M -100 80  Q 300 20  700 80  Q 1100 140 1540 80",  C.white, 1.5, { dashLen:10, a:0.12 });
  const bannerRoute2 = stroke("M -100 120 Q 400 60 800 120 Q 1200 180 1540 120", C.white, 1.5, { dashLen:10, a:0.08 });

  // Floating packages on banner
  const bPkg1 = packageBox(50, { topCol:{ r:1,g:0.4,b:0.15 }, leftCol:{ r:0.8,g:0.28,b:0.08 }, rightCol:{ r:0.9,g:0.32,b:0.1 } });
  bPkg1.x = 100; bPkg1.y = -10; bPkg1.opacity = 0.25;
  const bPkg2 = packageBox(36);
  bPkg2.x = 1260; bPkg2.y = 20; bPkg2.opacity = 0.2;

  // Pins on banner
  const bPin1 = pin(C.white, { a:0.2 });
  bPin1.x = 200; bPin1.y = 40;
  const bPin2 = pin(C.white, { a:0.15 });
  bPin2.x = 1180; bPin2.y = 50;

  ctaBanner.appendChild(bannerRoute1);
  ctaBanner.appendChild(bannerRoute2);
  ctaBanner.appendChild(bPkg1); ctaBanner.appendChild(bPkg2);
  ctaBanner.appendChild(bPin1); ctaBanner.appendChild(bPin2);

  ctaBanner.appendChild(await txt("Ready to Ship Smarter?", { sz:52, wt:"Bold", col:C.white, align:"CENTER" }));
  ctaBanner.appendChild(await txt("Join 50,000+ businesses already using pckup. Start free — no credit card required.", { sz:18, col:{ r:1,g:0.9,b:0.85 }, align:"CENTER" }));

  const bannerBtn = fr("Banner CTA Btn", { dir:"HORIZONTAL", bg:C.white, r:10, pv:16, ph:36, ms:"AUTO", cs:"AUTO", main:"CENTER", cross:"CENTER" });
  bannerBtn.appendChild(await txt("Start Your Free Trial", { sz:16, wt:"Bold", col:C.orange }));
  ctaBanner.appendChild(bannerBtn);
  page.appendChild(ctaBanner);

  // ═══════════════════════════════════════════════════════
  //  FOOTER
  // ═══════════════════════════════════════════════════════
  const footer = fr("Footer", { dir:"VERTICAL", w:1440, bg:C.dark, pv:64, ph:120, gap:48, ms:"FIXED", cs:"AUTO" });

  const ftTop = fr("Footer / Top", { dir:"HORIZONTAL", w:1200, gap:80, ms:"FIXED", cs:"AUTO", cross:"MIN" });
  ftTop.counterAxisSizingMode = "AUTO";
  const ftBrand = fr("Footer Brand", { dir:"VERTICAL", gap:16 });
  ftBrand.resize(260, 100); ftBrand.primaryAxisSizingMode = "AUTO";
  ftBrand.appendChild(await txt("pckup", { sz:24, wt:"Bold", col:C.white }));
  ftBrand.appendChild(await txt("Fast, reliable US-wide pickup\n& delivery. Powered by Senpex.", { sz:14, col:C.footerSub, lh:162 }));
  const socRow = fr("Social Row", { dir:"HORIZONTAL", gap:12, cross:"CENTER" });
  for (const s of ["X","Li","Ig","Yt"]) {
    const sb = fr(`Social ${s}`, { dir:"HORIZONTAL", w:32, h:32, bg:C.white, bga:0.1, r:6, ms:"FIXED", cs:"FIXED", main:"CENTER", cross:"CENTER" });
    sb.appendChild(await txt(s, { sz:11, wt:"Semi Bold", col:C.footerSub }));
    socRow.appendChild(sb);
  }
  ftBrand.appendChild(socRow);
  ftTop.appendChild(ftBrand);

  for (const col of [
    { title:"Product",  links:["How It Works","Pricing","Live Tracking","API Docs","Integrations"] },
    { title:"Company",  links:["About Us","Blog","Careers","Press","Contact"] },
    { title:"Support",  links:["Help Center","System Status","Community","Senpex Network","Privacy & Terms"] },
  ]) {
    const fc = fr(`Footer / ${col.title}`, { dir:"VERTICAL", gap:14 });
    fc.layoutGrow = 1; fc.counterAxisSizingMode = "AUTO";
    fc.appendChild(await txt(col.title, { sz:13, wt:"Semi Bold", col:C.white, ls:0.3 }));
    for (const l of col.links) fc.appendChild(await txt(l, { sz:14, col:C.footerSub }));
    ftTop.appendChild(fc);
  }

  footer.appendChild(ftTop);
  footer.appendChild(div(1200, C.white, 0.1));

  const ftBottom = fr("Footer / Bottom", { dir:"HORIZONTAL", w:1200, gap:0, ms:"FIXED", cs:"AUTO", cross:"CENTER" });
  ftBottom.counterAxisSizingMode = "AUTO";
  ftBottom.appendChild(await txt("© 2025 pckup, Inc. A Senpex Company. All rights reserved.", { sz:13, col:C.footerLnk }));
  const legal = fr("Legal Links", { dir:"HORIZONTAL", gap:24, cross:"CENTER" });
  legal.layoutGrow = 1; legal.primaryAxisAlignItems = "MAX";
  for (const l of ["Privacy Policy","Terms of Service","Cookie Settings"]) {
    legal.appendChild(await txt(l, { sz:13, col:C.footerLnk }));
  }
  ftBottom.appendChild(legal);
  footer.appendChild(ftBottom);
  page.appendChild(footer);

  // ── Finalize ─────────────────────────────────────────────
  figma.currentPage.appendChild(page);
  figma.viewport.scrollAndZoomIntoView([page]);
  figma.notify("✅ pckup landing page v2 — illustrated!", { timeout: 5000 });
}

run()
  .then(() => figma.closePlugin())
  .catch(err => {
    figma.notify("❌ " + err.message, { error: true });
    figma.closePlugin();
  });
