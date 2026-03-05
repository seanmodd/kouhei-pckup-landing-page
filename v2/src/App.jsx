import { motion } from "framer-motion";
import { CheckCheck, ArrowUpRight, Globe, BarChart3, Clock, Package, Briefcase } from "lucide-react";

export default function App() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Background Video */}
      <div className="fixed inset-0 z-0 w-full h-full overflow-hidden pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute min-w-full min-h-full object-cover brightness-[0.6]"
        >
          <source src="https://r2.vidzflow.com/source/88fe23d4-f5b2-4b0e-ac00-943c1a88815d.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Content Container */}
      <div className="relative z-10">
        {/* Section 1: Navigation Bar */}
        <nav className="section-padding py-6 flex items-center justify-between">
          <div className="text-[#C9A84C] font-display text-xl font-bold tracking-tight uppercase">
            PCKUP
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="nav-link">Home</a>
            <a href="#" className="nav-link">Solutions</a>
            <a href="#" className="nav-link">Platform</a>
            <a href="#" className="nav-link">Contact</a>
          </div>
          <button className="btn-primary text-sm whitespace-nowrap">
            Get a Quote
          </button>
        </nav>

        {/* Section 2: Hero Headline */}
        <section className="section-padding pt-[15vh] pb-32 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[#C9A84C] text-xs md:text-sm uppercase tracking-[0.3em] font-light mb-4"
          >
            AI-Powered Last-Mile Delivery
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-[clamp(3.5rem,15vw,11rem)] font-bold leading-[0.85] tracking-tighter uppercase mb-8"
          >
            PCKUP
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm md:text-base text-muted-foreground mx-auto max-w-md font-light"
          >
            Intelligent delivery that enables businesses to keep their promises — every order, every time.
          </motion.p>
        </section>

        {/* Section 3: Two Info Cards */}
        <section className="section-padding pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card min-h-[220px] p-8 flex flex-col justify-between"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0D0D0D] overflow-hidden bg-gray-800">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="avatar" />
                  </div>
                ))}
              </div>
              <div>
                <div className="font-display text-3xl font-bold text-[#C9A84C]">50K+</div>
                <div className="text-sm text-muted-foreground">Deliveries completed for enterprise clients</div>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <CheckCheck size={14} className="text-[#C9A84C]" />
                <span>Trusted by operations teams</span>
              </div>
            </motion.div>

            {/* Right Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card min-h-[220px] p-8"
            >
              <h3 className="font-display text-2xl md:text-3xl font-medium mb-2">Intelligent / last-mile logistics</h3>
              <p className="text-muted-foreground mb-8 text-sm">(99.2%) On-time delivery rate</p>
              <a href="#" className="inline-flex items-center gap-1 text-[#C9A84C] text-sm hover:underline">
                See how it works <ArrowUpRight size={14} />
              </a>
            </motion.div>
          </div>
        </section>

        {/* Section 4: Simple Smart Delivery */}
        <section className="section-padding py-24 md:py-32 relative overflow-hidden">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-[clamp(2.5rem,10vw,8rem)] font-bold leading-[0.85] tracking-tighter uppercase mb-20 md:mb-28"
          >
            Simple / Smart / <span className="text-[#C9A84C]">Delivery</span>
          </motion.h2>

          <div className="flex flex-col md:flex-row gap-12 md:items-end">
            {/* Left Stat Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass-card p-8 md:w-[320px] shrink-0"
            >
              <p className="text-sm text-muted-foreground mb-4">Faster route resolution with AI</p>
              <div className="text-6xl md:text-7xl font-bold text-[#C9A84C] mb-8">3×</div>
              <button className="w-full bg-[#C9A84C] text-black py-4 rounded-xl font-bold transition-transform active:scale-95">
                Learn more
              </button>
            </motion.div>

            {/* Right Feature List */}
            <div className="flex-grow">
              <div className="space-y-6">
                {[
                  { label: "Dispatch", active: false },
                  { label: "Route Optimize", active: true },
                  { label: "Track Live", active: false },
                  { label: "Deliver", active: false }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`text-3xl md:text-5xl font-bold flex items-center gap-4 ${item.active ? 'text-white' : 'text-white/20'}`}
                  >
                    {item.label}
                    {item.active && (
                      <div className="w-6 h-6 rounded-full bg-[#C9A84C] flex items-center justify-center p-1">
                        <CheckCheck className="text-black" size={14} />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Row */}
          <div className="mt-24 flex flex-col md:flex-row items-center gap-4 border-t border-white/5 pt-8">
            <p className="text-sm text-muted-foreground">Start delivering smarter with a free platform demo.</p>
            <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
              <ArrowUpRight size={20} />
            </button>
          </div>

          {/* Absolute Badge */}
          <motion.div
            initial={{ rotate: -15, scale: 0 }}
            whileInView={{ rotate: 15, scale: 1 }}
            className="absolute top-0 right-10 w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#C9A84C] text-black flex items-center justify-center text-center p-4 text-[10px] md:text-xs font-bold leading-tight"
          >
            Best Logistics Platform 2025
          </motion.div>
        </section>

        {/* Section 5: The Process */}
        <section className="section-padding py-24">
          <div className="mb-16">
            <div className="text-[#C9A84C] text-xs uppercase tracking-widest mb-2">The Process</div>
            <h2 className="text-4xl md:text-6xl font-bold">From order / <span className="text-[#C9A84C]">to doorstep</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { id: "01", title: "Dispatch", desc: "Orders are instantly routed to the nearest verified driver via AI matching." },
              { id: "02", title: "Optimise", desc: "Smart routing eliminates inefficiencies in real time, reducing cost and delay." },
              { id: "03", title: "Track", desc: "Full visibility across every delivery with live GPS and predictive ETAs." },
              { id: "04", title: "Deliver", desc: "Professional, reliable drop-offs that build trust with every customer." }
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15 }}
                className="glass-card p-8 group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-[2px] bg-[#C9A84C] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                <div className="font-mono text-white/40 mb-6">{step.id}</div>
                <h4 className="text-2xl font-bold mb-4">{step.title}</h4>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 6: Stats Row */}
        <section className="section-padding py-24 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/5">
          {[
            { value: "99.2%", label: "On-time delivery rate" },
            { value: "24h", label: "Average dispatch to door" },
            { value: "2M+", label: "Packages delivered" },
            { value: "15K+", label: "Businesses served" }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="text-center"
            >
              <div className="font-display text-4xl md:text-6xl font-bold text-[#C9A84C]">{stat.value}</div>
              <div className="text-xs md:text-sm text-muted-foreground mt-3 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </section>

        {/* Section 7: CTA Section */}
        <section className="section-padding py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-[#C9A84C] mb-6">Ready to scale?</div>
            <h2 className="text-5xl md:text-[clamp(4rem,10vw,8rem)] font-bold leading-[0.85] tracking-tighter uppercase mb-12">
              Let's move / <span className="text-[#C9A84C]">the world</span>
            </h2>
            <button className="group bg-[#C9A84C] text-black px-12 py-5 rounded-full font-semibold flex items-center gap-2 mx-auto transition-transform hover:scale-105 active:scale-95">
              Get Started
              <ArrowUpRight className="transition-transform group-hover:rotate-45" />
            </button>
          </motion.div>
        </section>

        {/* Section 8: Footer */}
        <footer className="section-padding py-16 border-t border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1">
              <div className="text-[#C9A84C] font-display text-xl font-bold tracking-tight uppercase mb-4">
                PCKUP
              </div>
              <p className="text-sm text-muted-foreground max-w-[200px]">
                Redefining last-mile logistics through AI-powered precision delivery.
              </p>
            </div>

            {[
              { title: "Platform", links: ["Features", "Pricing", "Integrations", "API Docs"] },
              { title: "Company", links: ["About", "Careers", "Press", "Blog"] },
              { title: "Support", links: ["Help Center", "Contact", "System Status", "Documentation"] }
            ].map((col, idx) => (
              <div key={idx}>
                <h5 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">{col.title}</h5>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-foreground/70 hover:text-[#C9A84C] transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-white/5">
            <div className="text-xs text-muted-foreground">© 2026 Pckup. All rights reserved.</div>
            <div className="flex gap-8">
              {["Twitter", "LinkedIn", "Instagram"].map((social) => (
                <a key={social} href="#" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-white transition-colors">
                  {social} <ArrowUpRight size={10} />
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
