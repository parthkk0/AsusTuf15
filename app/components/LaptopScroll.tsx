"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

interface TextOverlay {
    start: number;
    end: number;
    text: string;
    align: "left" | "center" | "right";
}

const TOTAL_FRAMES = 40;

const textOverlays: TextOverlay[] = [
    { start: 0, end: 0.25, text: "Asus TUF A15.", align: "center" },
    { start: 0.25, end: 0.55, text: "Ryzen™ 7 7000 Series HS. Pure Performance.", align: "left" },
    { start: 0.55, end: 0.85, text: "NVIDIA® RTX™ 3050. Graphic Dominance.", align: "left" },
    { start: 0.85, end: 1, text: "16GB DDR5 RAM. Next-Gen Speed.", align: "left" },
];

function TextOverlayItem({
    overlay,
    scrollYProgress,
}: {
    overlay: TextOverlay;
    scrollYProgress: MotionValue<number>;
}) {
    const getTextOpacity = (progress: number) => {
        const fadeIn = 0.15;
        const fadeOut = 0.15;

        if (progress < overlay.start) return 0;
        if (progress > overlay.end) return 0;

        if (overlay.start === 0 && progress < 0.05) return 1;

        const duration = overlay.end - overlay.start;
        const relativeProgress = (progress - overlay.start) / duration;

        if (relativeProgress < fadeIn) {
            return relativeProgress / fadeIn;
        }
        if (relativeProgress > 1 - fadeOut) {
            return (1 - relativeProgress) / fadeOut;
        }
        return 1;
    };

    const getYTransform = (progress: number) => {
        const fadeIn = 0.15;
        if (progress < overlay.start) return 50;
        if (progress > overlay.end) return -50;

        const duration = overlay.end - overlay.start;
        const relativeProgress = (progress - overlay.start) / duration;

        if (relativeProgress < fadeIn) {
            return 50 * (1 - (relativeProgress / fadeIn));
        }
        if (relativeProgress > 1 - 0.15) {
            return -50 * (1 - (1 - relativeProgress) / 0.15);
        }
        return 0;
    };

    const opacity = useTransform(scrollYProgress, getTextOpacity);
    const y = useTransform(scrollYProgress, getYTransform);

    const isCenter = overlay.align === 'center';
    const isHero = overlay.start === 0;

    return (
        <motion.div
            style={{
                opacity,
                y,
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: isHero ? 'center' : 'center',
                justifyContent: isCenter ? 'center' : 'flex-start',
                paddingLeft: !isCenter ? '5%' : '0',
                paddingRight: '5%',
                pointerEvents: 'none',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isCenter ? 'center' : 'flex-start',
                    gap: isHero ? '2rem' : '0',
                    width: isCenter ? '100%' : 'auto',
                    maxWidth: isCenter ? '90%' : '40%',
                }}
            >
                <h2
                    style={{
                        fontSize: isHero ? 'clamp(3rem, 5vw, 5rem)' : 'clamp(1.5rem, 2.5vw, 2.5rem)',
                        fontWeight: 700,
                        lineHeight: 1.1,
                        background: !isHero ? 'linear-gradient(to bottom, #ffffff, rgba(255,255,255,0.6))' : 'transparent',
                        WebkitBackgroundClip: !isHero ? 'text' : 'unset',
                        backgroundClip: !isHero ? 'text' : 'unset',
                        WebkitTextFillColor: !isHero ? 'transparent' : 'unset',
                        color: isHero ? 'white' : 'transparent',
                        textAlign: isCenter ? 'center' : 'left',
                        margin: 0,
                    }}
                >
                    {overlay.text}
                </h2>
            </div>
        </motion.div>
    );
}

export default function LaptopScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    useEffect(() => {
        let loadedCount = 0;
        const imgArray: HTMLImageElement[] = [];

        const loadImages = async () => {
            const promises = [];
            for (let i = 0; i < TOTAL_FRAMES; i++) {
                const promise = new Promise<void>((resolve) => {
                    const img = new Image();
                    const paddedIndex = String(i + 1).padStart(3, '0');
                    img.src = `/laptop-sequence/ezgif-frame-${paddedIndex}.jpg`;
                    img.onload = () => {
                        loadedCount++;
                        setLoadProgress((loadedCount / TOTAL_FRAMES) * 100);
                        imgArray[i] = img;
                        resolve();
                    };
                    img.onerror = () => resolve();
                });
                promises.push(promise);
            }
            await Promise.all(promises);
            setImages(imgArray);
            setImagesLoaded(true);
        };
        loadImages();
    }, []);

    useEffect(() => {
        if (!imagesLoaded || !canvasRef.current || images.length === 0) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const renderFrame = () => {
            const currentProgress = scrollYProgress.get();
            const frameIndex = Math.min(Math.floor(currentProgress * TOTAL_FRAMES), TOTAL_FRAMES - 1);
            const img = images[frameIndex];
            if (!img) return;

            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.scale(dpr, dpr);

            // Center the image with 80% scale
            const scale = Math.min(window.innerWidth / img.width, window.innerHeight / img.height) * 0.8;
            const x = (window.innerWidth - img.width * scale) / 2;
            const y = (window.innerHeight - img.height * scale) / 2;

            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
            ctx.setTransform(1, 0, 0, 1, 0, 0);
        };

        const unsubscribe = scrollYProgress.on("change", renderFrame);

        renderFrame();
        window.addEventListener("resize", renderFrame);

        return () => {
            window.removeEventListener("resize", renderFrame);
            unsubscribe();
        };
    }, [imagesLoaded, images, scrollYProgress]);

    return (
        <div ref={containerRef} className="relative h-[400vh] bg-[#050505]">
            {!imagesLoaded && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]">
                    <div className="mb-4 text-white/60 text-sm font-medium">Loading...</div>
                    <div className="h-1 w-64 overflow-hidden rounded-full bg-white/10">
                        <div
                            className="h-full bg-white/60 transition-all duration-300"
                            style={{ width: `${loadProgress}%` }}
                        />
                    </div>
                    <div className="mt-2 text-white/40 text-xs">{Math.round(loadProgress)}%</div>
                </div>
            )}

            <div className="sticky top-0 h-screen w-full flex items-center justify-center">
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

                {/* Text Overlays */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                    {imagesLoaded && textOverlays.map((overlay, index) => (
                        <TextOverlayItem key={index} overlay={overlay} scrollYProgress={scrollYProgress} />
                    ))}
                </div>
            </div>
        </div>
    );
}
