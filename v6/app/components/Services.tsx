"use client";

const SERVICES = [
  {
    num: "01",
    title: "AI Routing",
    items: ["Dynamic route optimization", "Real-time traffic adaptation", "Multi-stop efficiency"],
  },
  {
    num: "02",
    title: "Same-Day Delivery",
    items: ["On-demand dispatch", "Scheduled time windows", "Priority handling"],
  },
  {
    num: "03",
    title: "Enterprise API",
    items: ["Seamless integration", "Webhook notifications", "Custom SLA management"],
  },
  {
    num: "04",
    title: "Live Tracking",
    items: ["Real-time GPS visibility", "Proof of delivery", "Customer notifications"],
  },
];

export default function Services() {
  return (
    <section className="section" id="services">
      <p className="section__label fade-up">What We Do</p>
      <h2 className="section__heading fade-up">
        Intelligent Logistics,
        <br />
        End to End
      </h2>
      <div className="services-grid">
        {SERVICES.map((s) => (
          <div className="service-card fade-up" key={s.num}>
            <div className="service-card__num">{s.num}</div>
            <h3 className="service-card__title">{s.title}</h3>
            <ul className="service-card__items">
              {s.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
