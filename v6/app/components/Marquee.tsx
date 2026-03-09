"use client";

const ROW1 = ["NovaMart", "MediFlow", "Bloom & Co", "TechDirect", "FreshHaus", "Apex Supply", "CloudRx", "UrbanBites"];
const ROW2 = ["GreenLeaf", "Nextera", "QuickServe", "Atlas Health", "PrimeBox", "VeloCity", "Sortly", "ChefDrop"];

const logoStyle: React.CSSProperties = {
  fontFamily: "var(--font-montserrat), sans-serif",
  fontWeight: 700,
  fontSize: "18px",
  color: "#fff",
  opacity: 0.25,
  filter: "none",
  height: "auto",
  flexShrink: 0,
  whiteSpace: "nowrap",
};

function MarqueeRow({
  items,
  speed,
  reverse,
}: {
  items: string[];
  speed: string;
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];
  return (
    <div
      className={`marquee-track ${reverse ? "reverse" : ""}`}
      style={{ "--speed": speed, "--gap": "64px" } as React.CSSProperties}
    >
      {doubled.map((name, i) => (
        <span key={i} className="marquee-logo" style={logoStyle}>
          {name}
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <section className="marquee-section">
      <MarqueeRow items={ROW1} speed="35s" />
      <MarqueeRow items={ROW2} speed="40s" reverse />
    </section>
  );
}
