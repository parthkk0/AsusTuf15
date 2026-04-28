"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TOTAL_FRAMES = 40;

function clamp(v: number, lo: number, hi: number) {
    return Math.max(lo, Math.min(hi, v));
}

function lerp(p: number, p0: number, p1: number, v0: number, v1: number) {
    const t = clamp((p - p0) / (p1 - p0), 0, 1);
    return v0 + t * (v1 - v0);
}

function fadeInOut(p: number, a: number, b: number, c: number, d: number) {
    if (p <= a || p >= d) return 0;
    if (p < b) return lerp(p, a, b, 0, 1);
    if (p <= c) return 1;
    return lerp(p, c, d, 1, 0);
}

export default function LaptopScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef    = useRef<HTMLCanvasElement>(null);
    const heroRef      = useRef<HTMLDivElement>(null);
    const seg1Ref      = useRef<HTMLDivElement>(null);
    const seg2Ref      = useRef<HTMLDivElement>(null);
    const ctaRef       = useRef<HTMLDivElement>(null);
    const vignetteRef  = useRef<HTMLDivElement>(null);

    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);

    // ── Preload images ────────────────────────────────────────────────────────
    useEffect(() => {
        const arr: HTMLImageElement[] = [];
        let count = 0;

        for (let i = 1; i <= TOTAL_FRAMES; i++) {
            const img = new Image();
            img.src = `/laptop-sequence/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;
            arr.push(img);

            img.onload = () => {
                count++;
                setLoadProgress(Math.round((count / TOTAL_FRAMES) * 100));
                // Draw frame 0 immediately so users don't see a black screen
                if (i === 1) render();
                if (count === TOTAL_FRAMES) {
                    setImagesLoaded(true);
                }
            };
        }

        // Store on canvas element as custom data so it's always accessible
        const canvas = canvasRef.current;
        if (canvas) (canvas as HTMLCanvasElement & { _frames: HTMLImageElement[] })._frames = arr;

        // Also keep in closure for the scroll handler
        function getProgress() {
            const container = containerRef.current;
            if (!container) return 0;
            const rect    = container.getBoundingClientRect();
            const totalH  = rect.height;
            const viewH   = window.innerHeight;
            const scrolled = clamp(-rect.top, 0, totalH - viewH);
            return totalH > viewH ? scrolled / (totalH - viewH) : 0;
        }

        function render() {
            const progress = getProgress();
            const canvas   = canvasRef.current;
            if (!canvas) return;

            // ── Draw frame ──
            const frameIdx = clamp(Math.round(progress * (TOTAL_FRAMES - 1)), 0, TOTAL_FRAMES - 1);
            // Draw whatever frame is available (use frame 0 as fallback if target isn't loaded yet)
            const img = arr[frameIdx] ?? arr[0];

            if (img && img.complete && img.naturalWidth > 0) {
                const ctx = canvas.getContext("2d");
                if (ctx) {
                    const W = canvas.width;
                    const H = canvas.height;
                    const scale = Math.min(W / img.naturalWidth, H / img.naturalHeight);
                    const dx = (W - img.naturalWidth  * scale) / 2;
                    const dy = (H - img.naturalHeight * scale) / 2;
                    ctx.fillStyle = "#050505";
                    ctx.fillRect(0, 0, W, H);
                    ctx.drawImage(img, dx, dy, img.naturalWidth * scale, img.naturalHeight * scale);
                }
            }

            // ── Update overlays ──
            if (heroRef.current) {
                const op = fadeInOut(progress, 0, 0, 0.12, 0.22);
                heroRef.current.style.opacity   = String(op);
                heroRef.current.style.transform = `translateY(${lerp(progress, 0, 0.22, 0, -30)}px)`;
            }
            if (seg1Ref.current) {
                seg1Ref.current.style.opacity   = String(fadeInOut(progress, 0.25, 0.35, 0.45, 0.52));
                seg1Ref.current.style.transform = `translateY(${lerp(progress, 0.25, 0.45, 30, 0)}px)`;
            }
            if (seg2Ref.current) {
                seg2Ref.current.style.opacity   = String(fadeInOut(progress, 0.52, 0.62, 0.72, 0.78));
                seg2Ref.current.style.transform = `translateY(${lerp(progress, 0.52, 0.72, 30, 0)}px)`;
            }
            if (ctaRef.current) {
                ctaRef.current.style.opacity   = String(clamp(lerp(progress, 0.78, 0.88, 0, 1), 0, 1));
                ctaRef.current.style.transform = `translateY(${lerp(progress, 0.78, 0.95, 30, 0)}px)`;
            }
            if (vignetteRef.current) {
                let vOp = 0;
                if (progress < 0.05) vOp = lerp(progress, 0, 0.05, 0.6, 0);
                else if (progress > 0.95) vOp = lerp(progress, 0.95, 1, 0, 0.6);
                vignetteRef.current.style.opacity = String(vOp);
            }
        }

        // ── Size canvas once ──
        function sizeCanvas() {
            const c = canvasRef.current;
            if (!c) return;
            c.width  = window.innerWidth;
            c.height = window.innerHeight;
        }

        sizeCanvas();
        window.addEventListener("resize", sizeCanvas);

        // Use scroll event + rAF throttling
        let ticking = false;
        function onScroll() {
            if (!ticking) {
                requestAnimationFrame(() => {
                    render();
                    ticking = false;
                });
                ticking = true;
            }
        }

        // Draw frame 0 immediately when first image loads
        arr[0].onload = () => {
            count++;
            setLoadProgress(Math.round((count / TOTAL_FRAMES) * 100));
            if (count === TOTAL_FRAMES) setImagesLoaded(true);
            render(); // draw first frame immediately
        };

        window.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", sizeCanvas);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const overlayBase: React.CSSProperties = {
        position: "absolute", inset: 0, zIndex: 20,
        pointerEvents: "none", willChange: "opacity, transform",
    };

    return (
        <div ref={containerRef} style={{ position: "relative", height: "500vh" }}>
            <div style={{
                position: "sticky", top: 0,
                height: "100vh", width: "100%",
                overflow: "hidden", background: "#050505",
            }}>

                {/* Loading overlay */}
                <AnimatePresence>
                    {!imagesLoaded && (
                        <motion.div
                            key="loader"
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                            style={{
                                position: "absolute", inset: 0, zIndex: 30,
                                display: "flex", flexDirection: "column",
                                alignItems: "center", justifyContent: "center",
                                background: "#050505",
                            }}
                        >
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 32 }}
                            >
                                <div style={{
                                    width: 64, height: 64, borderRadius: 16,
                                    background: "linear-gradient(135deg,#06b6d4,#9333ea)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    boxShadow: "0 0 40px rgba(6,182,212,0.3)",
                                }}>
                                    <span style={{ color: "#fff", fontSize: 14, fontWeight: 900 }}>TUF</span>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                                    <p style={{ color: "rgba(255,255,255,.4)", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase" }}>
                                        Loading Experience
                                    </p>
                                    <div style={{ width: 192, height: 4, background: "rgba(255,255,255,.1)", borderRadius: 4, overflow: "hidden" }}>
                                        <div style={{
                                            height: "100%", borderRadius: 4,
                                            background: "linear-gradient(90deg,#06b6d4,#9333ea)",
                                            width: `${loadProgress}%`, transition: "width 0.1s linear",
                                        }} />
                                    </div>
                                    <p style={{ color: "rgba(255,255,255,.25)", fontSize: 11 }}>{loadProgress}%</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Canvas */}
                <canvas ref={canvasRef} style={{
                    position: "absolute", inset: 0,
                    width: "100%", height: "100%",
                    opacity: imagesLoaded ? 1 : 0,
                    transition: "opacity 0.6s ease",
                    display: "block",
                }} />

                {/* Vignette */}
                <div ref={vignetteRef} style={{
                    position: "absolute", inset: 0, zIndex: 10,
                    pointerEvents: "none", opacity: 0.6,
                    background: "radial-gradient(ellipse at center, transparent 50%, rgba(5,5,5,.75) 100%)",
                }} />

                {/* HERO 0–22% */}
                <div ref={heroRef} style={{ ...overlayBase, display: "flex", alignItems: "center", justifyContent: "center", opacity: 1 }}>
                    <div style={{ textAlign: "center", padding: "0 16px" }}>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(34,211,238,.7)", marginBottom: 16, fontWeight: 500 }}
                        >
                            ASUS TUF Gaming
                        </motion.p>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.55, duration: 0.7 }}
                            style={{ fontSize: "clamp(48px,9vw,96px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1 }}
                        >
                            TUF A15.
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.75, duration: 0.6 }}
                            style={{ fontSize: "clamp(16px,2vw,20px)", color: "rgba(255,255,255,.5)", marginTop: 16, letterSpacing: "0.05em", fontWeight: 300 }}
                        >
                            Power Meets Precision
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            transition={{ delay: 1.2, duration: 0.8 }}
                            style={{ color: "rgba(255,255,255,.25)", fontSize: 13, marginTop: 40, letterSpacing: "0.2em" }}
                        >
                            ↓ scroll to explore
                        </motion.p>
                    </div>
                </div>

                {/* SEGMENT 1 — Processor 25–52% */}
                <div ref={seg1Ref} style={{ ...overlayBase, display: "flex", alignItems: "center", justifyContent: "flex-start", padding: "0 clamp(40px,8vw,112px)", opacity: 0, transform: "translateY(30px)" }}>
                    <div style={{ maxWidth: 360 }}>
                        <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(34,211,238,.6)", marginBottom: 12, fontWeight: 500 }}>Processor</p>
                        <h2 style={{ fontSize: "clamp(36px,6vw,64px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: 16 }}>
                            Ryzen™ 7.<br />
                            <span style={{ background: "linear-gradient(90deg,#22d3ee,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                                Pure Power.
                            </span>
                        </h2>
                        <p style={{ color: "rgba(255,255,255,.45)", fontSize: "clamp(14px,1.2vw,16px)", lineHeight: 1.6 }}>
                            Next-gen AMD Zen 4 architecture for unmatched multi-core speed — up to 4.75 GHz boost
                        </p>
                    </div>
                </div>

                {/* SEGMENT 2 — Graphics 52–78% */}
                <div ref={seg2Ref} style={{ ...overlayBase, display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "0 clamp(40px,8vw,112px)", opacity: 0, transform: "translateY(30px)" }}>
                    <div style={{ maxWidth: 360, textAlign: "right" }}>
                        <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(168,85,247,.6)", marginBottom: 12, fontWeight: 500 }}>Graphics</p>
                        <h2 style={{ fontSize: "clamp(36px,6vw,64px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: 16 }}>
                            RTX™ 4060.<br />
                            <span style={{ background: "linear-gradient(90deg,#a855f7,#ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                                Graphic Power.
                            </span>
                        </h2>
                        <p style={{ color: "rgba(255,255,255,.45)", fontSize: "clamp(14px,1.2vw,16px)", lineHeight: 1.6 }}>
                            NVIDIA Ada Lovelace with DLSS 3 and ray tracing — 8 GB GDDR6 VRAM
                        </p>
                    </div>
                </div>

                {/* FINAL CTA 78–100% */}
                <div ref={ctaRef} style={{ ...overlayBase, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "auto", opacity: 0, transform: "translateY(30px)" }}>
                    <div style={{ textAlign: "center", padding: "0 16px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <p style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,.3)", marginBottom: 16, fontWeight: 500 }}>
                            The machine is ready
                        </p>
                        <h2 style={{ fontSize: "clamp(40px,8vw,96px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 40 }}>
                            Ready to{" "}
                            <span style={{ background: "linear-gradient(90deg,#22d3ee,#a855f7,#ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                                dominate.
                            </span>
                        </h2>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "center" }}>
                            <motion.a
                                href="https://in.store.asus.com/gaming-laptop-asus-tuf-gaming-a15-fa506ncr-hn075ws.html"
                                target="_blank" rel="noopener noreferrer"
                                whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }}
                                style={{
                                    display: "inline-flex", alignItems: "center", gap: 8,
                                    padding: "16px 36px", color: "#fff", fontWeight: 700,
                                    borderRadius: 9999, fontSize: 15, textDecoration: "none",
                                    background: "linear-gradient(90deg,#06b6d4,#9333ea)",
                                    boxShadow: "0 20px 40px rgba(6,182,212,.25)",
                                }}
                            >
                                🛒 Shop Now →
                            </motion.a>
                            <motion.a
                                href="https://www.asus.com/laptops/for-gaming/tuf-gaming/asus-tuf-gaming-a15/"
                                target="_blank" rel="noopener noreferrer"
                                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                                style={{
                                    display: "inline-flex", alignItems: "center", gap: 8,
                                    padding: "16px 28px", color: "rgba(255,255,255,.6)",
                                    fontWeight: 500, borderRadius: 9999,
                                    border: "1px solid rgba(255,255,255,.2)",
                                    transition: "all 0.3s ease", textDecoration: "none",
                                }}
                            >
                                Learn More →
                            </motion.a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}