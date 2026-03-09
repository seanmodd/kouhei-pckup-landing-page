"use client";

const VALUES = [
  { num: "01", name: "Reliability", desc: "Delivering on every promise, every time — no exceptions." },
  { num: "02", name: "Innovation", desc: "Turning logistics into intelligence through AI and automation." },
  { num: "03", name: "Accountability", desc: "Owning the outcome from dispatch to doorstep." },
  { num: "04", name: "Excellence", desc: "Pushing for precision and quality in every detail." },
  { num: "05", name: "Humanity", desc: "Moving with empathy — remembering the person behind every route." },
];

export default function Values() {
  return (
    <section className="section" id="values">
      <div className="values">
        <div className="fade-up">
          <p className="section__label">Our Values</p>
          <h2 className="section__heading">
            What Drives
            <br />
            Every Delivery
          </h2>
        </div>
        <div className="values__list fade-up">
          {VALUES.map((v) => (
            <div className="values__item" key={v.num}>
              <span className="values__num">{v.num}</span>
              <div>
                <div className="values__name">{v.name}</div>
                <div className="values__desc">{v.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
