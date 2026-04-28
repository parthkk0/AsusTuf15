"use client";

import { motion, Variants } from "framer-motion";

// ── Data ─────────────────────────────────────────────────────────────────────

const features = [
  {
    icon: "⚡",
    title: "Ryzen™ 7 7735HS",
    subtitle: "Zen 4 Architecture",
    description:
      "8-core, 16-thread powerhouse clocked up to 4.75 GHz. Handles gaming, rendering, and multitasking without breaking a sweat.",
    accent: "#facc15",
    tagBg: "rgba(250,204,21,0.12)",
    tag: "CPU",
    url: "https://www.amd.com/en/products/processors/laptop/ryzen/7000-series/amd-ryzen-7-7735hs.html",
  },
  {
    icon: "🎮",
    title: "RTX™ 4060",
    subtitle: "Ada Lovelace GPU",
    description:
      "DLSS 3, ray tracing, and 8 GB GDDR6 memory. Experience buttery-smooth visuals at max settings in your favorite titles.",
    accent: "#34d399",
    tagBg: "rgba(52,211,153,0.12)",
    tag: "GPU",
    url: "https://www.nvidia.com/en-us/geforce/graphics-cards/40-series/rtx-4060-4060ti/",
  },
  {
    icon: "🖥️",
    title: "165 Hz QHD Display",
    subtitle: "2560 × 1440 · 3 ms",
    description:
      "IPS-level accuracy, 100 % sRGB, and ultra-fast response. Every frame rendered in exquisite detail.",
    accent: "#22d3ee",
    tagBg: "rgba(34,211,238,0.12)",
    tag: "Display",
    url: "https://in.store.asus.com/gaming-laptop-asus-tuf-gaming-a15-fa507nur-lp082w.html",
  },
  {
    icon: "🧠",
    title: "32 GB DDR5 RAM",
    subtitle: "4800 MHz Dual-Channel",
    description:
      "Future-proof memory for demanding workflows. Load massive game worlds, run VMs, or edit 4K video — simultaneously.",
    accent: "#a78bfa",
    tagBg: "rgba(167,139,250,0.12)",
    tag: "Memory",
    url: "https://mdcomputers.in/catalog/ram/ddr5-ram",
  },
  {
    icon: "💾",
    title: "1 TB NVMe SSD",
    subtitle: "PCIe Gen 4 × 4",
    description:
      "Blazing 7000 MB/s read speeds. Boot in seconds, load levels instantly, and transfer files at lightning pace.",
    accent: "#f472b6",
    tagBg: "rgba(244,114,182,0.12)",
    tag: "Storage",
    url: "https://mdcomputers.in/catalog/storage/ssd-drive/gen4-ssd",
  },
  {
    icon: "🔋",
    title: "90 Wh Battery",
    subtitle: "With 240 W Adapter",
    description:
      "All-day endurance in creator mode, ferocious power delivery when gaming. Military-grade MIL-STD-810H toughness.",
    accent: "#2dd4bf",
    tagBg: "rgba(45,212,191,0.12)",
    tag: "Battery",
    url: "https://in.store.asus.com/gaming-laptop-asus-tuf-gaming-a15-fa507nvr-lp104ws.html",
  },
];

const specs = [
  { label: "CPU Cores",     value: "8C / 16T"  },
  { label: "GPU VRAM",      value: "8 GB"      },
  { label: "Refresh Rate",  value: "165 Hz"    },
  { label: "RAM Speed",     value: "4800 MHz"  },
  { label: "Storage Read",  value: "7000 MB/s" },
  { label: "Weight",        value: "2.2 kg"    },
  { label: "MIL-STD",       value: "810H"      },
  { label: "TDP (Max)",     value: "125 W"     },
];

const perfBars = [
  { label: "Gaming Performance", pct: 95 },
  { label: "Thermal Efficiency",  pct: 88 },
  { label: "Build Quality",       pct: 92 },
  { label: "Value for Money",     pct: 97 },
];

// ── Animation variants ────────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const cardAnim: Variants = {
  hidden:  { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function FeaturesSection() {
  return (
    <section className="relative w-full bg-[#050505] overflow-hidden">

      {/* ── Ambient orbs ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-cyan-500/6 via-purple-500/4 to-transparent rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -left-64 w-[480px] h-[480px] bg-cyan-500/4 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 -right-48 w-[400px] h-[400px] bg-purple-500/4 rounded-full blur-[100px]" />
      </div>

      {/* ── Main container ── */}
      <div
        className="relative flex flex-col px-8 md:px-16 py-28 md:py-40"
        style={{ maxWidth: "1100px", width: "100%", marginLeft: "auto", marginRight: "auto" }}
      >

        {/* ━━━━━━━━  HEADER  ━━━━━━━━ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="w-full text-center mb-24"
        >
          <span className="inline-block text-[11px] tracking-[0.35em] uppercase text-cyan-400/70 font-semibold mb-5 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5">
            Engineering Excellence
          </span>

          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mt-6 mb-7">
            Built to{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              dominate.
            </span>
          </h2>

          <p className="text-white/40 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            Every component hand-selected for raw performance,
            thermal efficiency, and competitive edge.
          </p>
        </motion.div>

        {/* ━━━━━━━━  FEATURE CARDS  ━━━━━━━━ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          variants={stagger}
          className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-24"
        >
          {features.map((f) => (
            <motion.a
              key={f.title}
              href={f.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={cardAnim}
              whileHover={{ y: -5, transition: { duration: 0.22 } }}
              className="relative group rounded-2xl p-7 cursor-pointer overflow-hidden block"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: `1px solid ${f.accent}22`,
                boxShadow: `0 4px 40px ${f.accent}08`,
                textDecoration: "none",
              }}
            >
              {/* Card glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(ellipse at 30% 20%, ${f.accent}12 0%, transparent 70%)` }}
              />

              {/* Tag */}
              <span
                className="absolute top-5 right-5 text-[10px] tracking-[0.2em] uppercase font-semibold px-2.5 py-1 rounded-full"
                style={{ background: f.tagBg, color: f.accent }}
              >
                {f.tag}
              </span>

              {/* Icon */}
              <div className="text-4xl mb-5 group-hover:scale-110 transition-transform duration-300 origin-left w-fit">
                {f.icon}
              </div>

              {/* Text */}
              <h3 className="text-white/95 font-bold text-xl tracking-tight mb-1.5">
                {f.title}
              </h3>
              <p
                className="text-xs font-semibold tracking-[0.18em] uppercase mb-4"
                style={{ color: `${f.accent}99` }}
              >
                {f.subtitle}
              </p>
              <p className="text-white/50 text-sm leading-relaxed">
                {f.description}
              </p>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${f.accent}60, transparent)` }}
              />
            </motion.a>
          ))}
        </motion.div>

        {/* ━━━━━━━━  SPECS BAR  ━━━━━━━━ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="w-full mb-28"
        >
          {/* Label */}
          <p className="text-center text-[11px] tracking-[0.3em] uppercase text-white/25 mb-8 font-medium">
            Technical Specifications
          </p>

          <div
            className="rounded-3xl overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-4">
              {specs.map((s, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center py-9 px-4 group relative"
                  style={{
                    borderRight: (i + 1) % 4 !== 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
                    borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "rgba(255,255,255,0.02)" }} />
                  <span className="text-2xl md:text-3xl font-black text-white/90 tracking-tighter mb-2">
                    {s.value}
                  </span>
                  <span className="text-[10px] tracking-[0.25em] uppercase text-white/30 font-medium">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ━━━━━━━━  ABOUT + PERFORMANCE BARS  ━━━━━━━━ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="w-full grid md:grid-cols-2 gap-16 items-center mb-48"
        >
          {/* Left: About copy */}
          <div>
            <span className="inline-block text-[11px] tracking-[0.3em] uppercase text-purple-400/70 font-semibold mb-5 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5">
              About
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white/90 tracking-tighter leading-tight mt-5 mb-6">
              What is ASUS TUF
              <br />
              Gaming A15?
            </h2>
            <p className="text-white/50 leading-relaxed mb-5 text-base">
              The pinnacle of budget-to-pro gaming engineering. Every component
              meticulously tuned to deliver uncompromising performance — whether
              you&apos;re competing at peak ranks, rendering visual masterpieces,
              or pushing the limits of creative workflows.
            </p>
            <p className="text-white/30 leading-relaxed text-sm">
              Military-grade durability. Whisper-quiet acoustics under load. A
              chassis that refuses to bow under pressure. This is not just a
              laptop — it&apos;s a statement.
            </p>
          </div>

          {/* Right: Performance bars */}
          <div className="flex flex-col gap-7">
            {perfBars.map((bar) => (
              <div key={bar.label}>
                <div className="flex justify-between items-baseline mb-3">
                  <span className="text-sm font-medium text-white/60">{bar.label}</span>
                  <span className="text-sm font-bold text-white/40 tabular-nums">{bar.pct}%</span>
                </div>
                <div className="h-[3px] bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${bar.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.3, ease: "easeOut", delay: 0.15 }}
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-600"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ━━━━━━━━  FINAL CTA  ━━━━━━━━ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="text-center mb-16 md:mb-32"
        >
          {/* Divider */}
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/15 to-transparent mx-auto mb-12" />

          <p className="text-[11px] tracking-[0.35em] uppercase text-white/25 mb-5 font-medium">
            Ready to level up?
          </p>
          <h3 className="text-4xl md:text-6xl font-black text-white/90 tracking-tighter mb-12">
            Own the game.
          </h3>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <motion.a
              href="https://in.store.asus.com/gaming-laptop-asus-tuf-gaming-a15-fa506ncr-hn075ws.html"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 px-10 py-4 text-white font-bold rounded-full overflow-hidden text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600" />
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-cyan-400 to-purple-500 blur-lg transition-opacity duration-300" />
              <span className="relative flex items-center gap-2">
                🛒 Shop Now
                <span className="transition-transform group-hover:translate-x-1 duration-200">→</span>
              </span>
            </motion.a>

            <motion.a
              href="https://www.asus.com/laptops/for-gaming/tuf-gaming/asus-tuf-gaming-a15/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 text-white/55 font-medium rounded-full border border-white/12 hover:border-white/30 hover:text-white/85 transition-all duration-300 text-base"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Learn More →
            </motion.a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
