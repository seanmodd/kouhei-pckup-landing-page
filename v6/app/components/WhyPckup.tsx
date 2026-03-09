"use client";

const PILLARS = [
  {
    title: "AI-First Platform",
    desc: "Machine learning algorithms that optimize every route, predict delays, and reduce costs automatically.",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: "Enterprise Grade",
    desc: "Built for scale with 99.9% uptime SLA, dedicated support, and compliance-ready infrastructure.",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Human Support",
    desc: "24/7 dispatch team combining AI efficiency with human judgment for complex delivery scenarios.",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export default function WhyPckup() {
  return (
    <section className="section" id="why" style={{ textAlign: "center" }}>
      <p className="section__label fade-up">Why Pckup</p>
      <h2
        className="section__heading fade-up"
        style={{ margin: "0 auto" }}
      >
        Smart Technology.
        <br />
        Human Reliability.
        <br />
        Proven Results.
      </h2>
      <div className="pillars">
        {PILLARS.map((p, i) => (
          <div className="pillar fade-up" key={i}>
            <div className="pillar__icon">{p.icon}</div>
            <h3 className="pillar__title">{p.title}</h3>
            <p className="pillar__desc">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
