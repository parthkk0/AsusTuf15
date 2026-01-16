"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

/* ================= ANIMATIONS ================= */

const stagger: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

/* ================= FOOTER ================= */

const tools = [
    { name: "Google Antigravity AI", url: "https://gemini.google.com", icon: "🤖" },
    { name: "Google Labs", url: "https://labs.google.com", icon: "🔬" },
    { name: "Whisk", url: "https://labs.google.com/whisk", icon: "🎨" },
    { name: "Flow", url: "https://labs.google.com", icon: "⚡" },
    { name: "ezgif Converter", url: "https://ezgif.com", icon: "🎬" },
];

export default function Footer() {
    return (
        <footer className="relative w-full bg-gradient-to-b from-[#050505] to-black border-t border-white/5 py-16 px-6 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 w-[500px] h-[500px] -translate-x-1/2 bg-gradient-to-b from-purple-500/5 to-transparent rounded-full blur-3xl" />

            <div className="relative w-full flex flex-col items-center justify-center">
                {/* Main Footer Content */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={stagger}
                    className="w-full flex flex-col items-center justify-center text-center mb-12"
                >
                    <motion.h3 variants={fadeUp} className="text-3xl font-bold text-white/90 mb-6 tracking-tight">
                        Project Credits
                    </motion.h3>
                    <motion.p variants={fadeUp} className="text-white/50 mb-10 max-w-2xl leading-relaxed">
                        This project was created using cutting-edge AI tools and creative resources
                        to deliver a premium scrollytelling experience. I,{" "}
                        <a
                            href="https://www.linkedin.com/in/-parthkadam"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 underline transition-colors"
                        >
                            Parth Kadam
                        </a>
                        , created this project with my utmost passion for technology and AI.
                    </motion.p>

                    {/* Tools Grid */}
                    <motion.div variants={fadeUp} className="w-full flex flex-wrap items-center justify-center gap-4 mb-12">
                        {tools.map((tool, index) => (
                            <a
                                key={index}
                                href={tool.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative px-6 py-3 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm hover:from-white/15 hover:to-white/10 border border-white/10 hover:border-white/30 rounded-full text-white/70 hover:text-white/95 text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/5"
                            >
                                <span className="flex items-center gap-2">
                                    <span className="text-lg group-hover:scale-125 transition-transform duration-300">
                                        {tool.icon}
                                    </span>
                                    <span>{tool.name}</span>
                                </span>
                            </a>
                        ))}
                    </motion.div>

                    {/* Attribution */}
                    <motion.div
                        variants={fadeUp}
                        className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-red-500/10 via-pink-500/10 to-purple-500/10 backdrop-blur-sm border border-red-500/20 rounded-full"
                    >
                        <span className="text-white/50">Built with</span>
                        <span className="text-red-500 text-xl animate-pulse">❤️</span>
                        <span className="text-white/50">using</span>
                        <span className="text-white/90 font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Google Antigravity AI
                        </span>
                    </motion.div>
                </motion.div>

                {/* Divider */}
                <div className="relative w-full max-w-4xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent h-px" />
                    <div className="pt-8 mt-8">
                        <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-white/30 text-sm">
                            <p className="flex items-center gap-2">
                                <span>© 2026</span>
                                <span className="text-white/50 font-medium">ASUS TUF A15</span>
                                <span>·</span>
                                <span>Concept Project</span>
                            </p>
                            <div className="flex gap-8">
                                <a
                                    href="https://www.linkedin.com/in/-parthkadam"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white/70 transition-colors relative group"
                                >
                                    LinkedIn
                                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-white/70 group-hover:w-full transition-all duration-300" />
                                </a>
                                <a
                                    href="https://github.com/parthkk0"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white/70 transition-colors relative group"
                                >
                                    GitHub
                                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-white/70 group-hover:w-full transition-all duration-300" />
                                </a>
                                <a
                                    href="mailto:parthkadam1941@gmail.com"
                                    className="hover:text-white/70 transition-colors relative group"
                                >
                                    Contact
                                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-white/70 group-hover:w-full transition-all duration-300" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
