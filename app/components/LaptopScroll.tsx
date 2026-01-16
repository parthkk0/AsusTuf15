"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

const TOTAL_FRAMES = 40;

export default function LaptopScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [currentFrame, setCurrentFrame] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

    // Text overlay opacities - all defined at top level
    const heroOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
    const leftText1Opacity = useTransform(scrollYProgress, [0.25, 0.35, 0.45, 0.5], [0, 1, 1, 0]);
    const leftText2Opacity = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.75], [0, 1, 1, 0]);
    const ctaOpacity = useTransform(scrollYProgress, [0.75, 0.85, 1], [0, 1, 1]);

    // Preload all images
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        for (let i = 1; i <= TOTAL_FRAMES; i++) {
            const img = new Image();
            const frameNum = i.toString().padStart(3, "0");
            img.src = `/laptop-sequence/ezgif-frame-${frameNum}.jpg`;

            img.onload = () => {
                loadedCount++;
                if (loadedCount === TOTAL_FRAMES) {
                    setImages(loadedImages);
                    setImagesLoaded(true);
                }
            };

            img.onerror = () => {
                console.error(`Failed to load frame: ${img.src}`);
            };

            loadedImages.push(img);
        }
    }, []);

    // Update canvas when frame changes
    useEffect(() => {
        const unsubscribe = frameIndex.on("change", (latest) => {
            setCurrentFrame(Math.round(latest));
        });

        return () => unsubscribe();
    }, [frameIndex]);

    // Render current frame to canvas
    useEffect(() => {
        if (!imagesLoaded || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = images[currentFrame];
        if (!img) return;

        // Set canvas size to match viewport
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        ctx.scale(dpr, dpr);

        // Calculate scaling to fit image while maintaining aspect ratio (FULL COVERAGE)
        const scale = Math.min(
            window.innerWidth / img.width,
            window.innerHeight / img.height
        );

        const x = (window.innerWidth - img.width * scale) / 2;
        const y = (window.innerHeight - img.height * scale) / 2;

        // Clear canvas and draw image
        ctx.fillStyle = "#050505";
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    }, [currentFrame, imagesLoaded, images]);

    // Handle window resize
    useEffect(() => {
        if (!imagesLoaded) return;

        const handleResize = () => {
            setCurrentFrame((prev) => prev); // Trigger re-render
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [imagesLoaded]);

    return (
        <div ref={containerRef} className="relative h-[400vh]">
            {/* Sticky Canvas */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center bg-[#050505]" style={{ top: 0 }}>
                {!imagesLoaded ? (
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                        <p className="text-white/60 text-sm tracking-wider">Loading Experience...</p>
                    </div>
                ) : (
                    <canvas
                        ref={canvasRef}
                        className="absolute inset-0 w-full h-full"
                    />
                )}

                {/* Text Overlays */}
                {imagesLoaded && (
                    <>
                        {/* 0-25%: Hero Title */}
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                            style={{ opacity: heroOpacity }}
                        >
                            <div className="text-center px-4">
                                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white/90 tracking-tighter">
                                    Asus TUF A15.
                                </h1>
                                <p className="text-lg md:text-xl text-white/60 mt-4 tracking-wide">
                                    Power Meets Precision
                                </p>
                            </div>
                        </motion.div>

                        {/* 25-50%: Left Aligned */}
                        <motion.div
                            className="absolute inset-0 flex items-center justify-start pointer-events-none px-12 md:px-24 lg:px-32"
                            style={{ opacity: leftText1Opacity }}
                        >
                            <div className="max-w-md">
                                <h2 className="text-4xl md:text-6xl font-bold text-white/90 tracking-tight">
                                    Ryzen™ 7 7000.
                                    <br />
                                    Pure Performance.
                                </h2>
                                <p className="text-base md:text-lg text-white/60 mt-4 tracking-wide">
                                    Next-gen AMD architecture for unmatched speed
                                </p>
                            </div>
                        </motion.div>

                        {/* 50-75%: Left Aligned */}
                        <motion.div
                            className="absolute inset-0 flex items-center justify-start pointer-events-none px-12 md:px-24 lg:px-32"
                            style={{ opacity: leftText2Opacity }}
                        >
                            <div className="max-w-md">
                                <h2 className="text-4xl md:text-6xl font-bold text-white/90 tracking-tight">
                                    RTX™ 3050.
                                    <br />
                                    Graphic Power.
                                </h2>
                                <p className="text-base md:text-lg text-white/60 mt-4 tracking-wide">
                                    NVIDIA graphics for immersive gaming
                                </p>
                            </div>
                        </motion.div>

                        {/* 75-100%: Center CTA */}
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                            style={{ opacity: ctaOpacity }}
                        >
                            <div className="text-center px-4">
                                <h2 className="text-5xl md:text-7xl font-bold text-white/90 tracking-tighter">
                                    Ready to dominate.
                                </h2>
                                <a
                                    href="https://in.store.asus.com/gaming-laptop-asus-tuf-gaming-a15-fa506ncr-hn075ws.html"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-8 inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-full hover:scale-105 transition-transform pointer-events-auto shadow-lg"
                                >
                                    🛒 Shop Now →
                                </a>
                            </div>
                        </motion.div>
                    </>
                )}
            </div>
        </div>
    );
}
