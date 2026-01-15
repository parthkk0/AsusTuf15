"use client";

import { motion } from "framer-motion";
import React from "react";

const stagger = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
};

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
    }
};

export default function Footer() {
    return (
        <footer className="relative w-full bg-gradient-to-b from-zinc-950 via-black to-black text-gray-100">
            {/* Ambient glow effect */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent pointer-events-none" />

            <div className="relative max-w-6xl mx-auto px-6 lg:px-8 py-24 lg:pr-16">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={stagger}
                    className="space-y-16"
                >
                    {/* Header Section */}
                    <div className="space-y-6 flex flex-col items-center text-center">
                        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                            <span className="text-xs font-medium text-gray-300 tracking-wide">CREDITS</span>
                        </motion.div>

                        <motion.h2
                            variants={fadeUp}
                            className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-br from-white via-gray-100 to-gray-400 bg-clip-text text-transparent tracking-tight leading-tight"
                        >
                            Crafted with precision
                        </motion.h2>

                        <motion.p
                            variants={fadeUp}
                            className="text-lg text-gray-400 max-w-2xl leading-relaxed"
                        >
                            A passion project by{" "}
                            <span className="text-white font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                Parth Kadam
                            </span>
                            , exploring the intersection of AI tooling and immersive UI design.
                        </motion.p>
                    </div>

                    {/* Tools Grid */}
                    <motion.div variants={fadeUp} className="flex flex-col items-center">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Powered By</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 w-full max-w-4xl">
                            <ToolCard emoji="🤖" label="Antigravity AI" href="https://antigravity.google" />
                            <ToolCard emoji="🧪" label="Google Labs" href="https://labs.google" />
                            <ToolCard emoji="🎨" label="Whisk" href="https://labs.google" />
                            <ToolCard emoji="⚡" label="Flow" href="https://labs.google" />
                            <ToolCard emoji="🎬" label="ezgif" href="https://ezgif.com" />
                        </div>
                    </motion.div>

                    {/* Divider */}
                    <motion.div variants={fadeUp} className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    {/* Bottom Section */}
                    <motion.div variants={fadeUp} className="flex flex-col items-center gap-8">
                        {/* Social Links */}
                        <div className="flex flex-wrap gap-3 justify-center">
                            <SocialLink
                                href="https://www.linkedin.com/in/-parthkadam"
                                icon={<LinkedInIcon />}
                                label="LinkedIn"
                            />
                            <SocialLink
                                href="https://github.com/parthkk0"
                                icon={<GitHubIcon />}
                                label="GitHub"
                            />
                            <SocialLink
                                href="mailto:parthkadam1941@gmail.com"
                                icon={<MailIcon />}
                                label="Email"
                            />
                        </div>

                        {/* Copyright */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                                <span>Built with</span>
                                <span className="text-red-500 animate-pulse">❤️</span>
                            </div>
                            <span className="hidden sm:block w-px h-4 bg-white/10" />
                            <span>© {new Date().getFullYear()} Parth Kadam</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </footer>
    );
}

/* Components */

function ToolCard({ emoji, label, href }: { emoji: string; label: string; href: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col items-center justify-center gap-2 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
            aria-label={`Visit ${label}`}
        >
            <span className="text-2xl group-hover:scale-110 transition-transform duration-300" aria-hidden>
                {emoji}
            </span>
            <span className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors">
                {label}
            </span>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300" />
        </a>
    );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    const isEmail = href.startsWith("mailto:");

    return (
        <a
            href={href}
            target={isEmail ? "_self" : "_blank"}
            rel={isEmail ? undefined : "noopener noreferrer"}
            className="group flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
            aria-label={`Connect on ${label}`}
        >
            <span className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors">
                {icon}
            </span>
            <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                {label}
            </span>
        </a>
    );
}

/* Icons */

function LinkedInIcon() {
    return (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
        </svg>
    );
}

function GitHubIcon() {
    return (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
    );
}

function MailIcon() {
    return (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    );
}
