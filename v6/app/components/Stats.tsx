"use client";

const STATS = [
  { target: "99.4", suffix: "%", label: "On-Time Delivery", isCounter: true },
  { target: "10", prefix: "", suffix: "M+", label: "Deliveries Completed", isCounter: true },
  { display: "24/7", label: "AI Dispatch Support", isCounter: false },
  { target: "500", suffix: "+", label: "Business Clients", isCounter: true },
];

export default function Stats() {
  return (
    <section className="section" id="about">
      <p className="section__label fade-up">Who We Are</p>
      <h2 className="section__heading fade-up">
        The Leading AI-Powered
        <br />
        Last-Mile Delivery Platform
      </h2>
      <div className="stats-grid">
        {STATS.map((stat, i) => (
          <div className="stat-card fade-up" key={i}>
            <div className="stat-card__number">
              {stat.isCounter ? (
                <>
                  <span className="counter" data-target={stat.target}>
                    0
                  </span>
                  {stat.suffix?.includes("M") && "M"}
                  <span className="accent">
                    {stat.suffix?.replace("M", "")}
                  </span>
                </>
              ) : (
                stat.display
              )}
            </div>
            <div className="stat-card__label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
