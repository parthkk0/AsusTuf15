"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] z-[100] origin-left"
        style={{
          width: progressWidth,
          background: "linear-gradient(90deg, #06b6d4, #a855f7, #ec4899)",
        }}
      />

      {/* Navbar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-[2px] left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 lg:px-20 py-4 transition-all duration-500 ${
          scrolled
            ? "bg-black/60 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/30"
            : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <motion.div
          className="flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/25">
            <span className="text-white text-xs font-bold">TUF</span>
          </div>
          <span className="text-white/90 font-semibold tracking-tight text-sm md:text-base">
            ASUS TUF A15
          </span>
        </motion.div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {["Performance", "Graphics", "Design", "Specs"].map((item) => (
            <button
              key={item}
              className="text-white/50 hover:text-white/90 text-sm tracking-wide transition-colors duration-200 relative group"
            >
              {item}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <motion.a
          href="https://in.store.asus.com/gaming-laptop-asus-tuf-gaming-a15-fa506ncr-hn075ws.html"
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-full overflow-hidden group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 transition-all duration-300 group-hover:opacity-90" />
          <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-cyan-400 to-purple-500 blur-sm transition-all duration-300" />
          <span className="relative flex items-center gap-2">
            <span>Buy Now</span>
            <span className="text-xs">→</span>
          </span>
        </motion.a>
      </motion.nav>
    </>
  );
}
