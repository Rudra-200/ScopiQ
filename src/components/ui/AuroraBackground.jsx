"use client";
import { motion, useMotionTemplate, useMotionValue, animate } from "framer-motion";
import { useEffect, useState } from "react";

// Helper for random numbers
const random = (min, max) => Math.random() * (max - min) + min;

const Star = ({ delay }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.5, 0.5],
            y: [0, -20]
        }}
        transition={{
            duration: random(3, 8),
            repeat: Infinity,
            delay: delay,
            ease: "easeInOut"
        }}
        className="absolute bg-white rounded-full blur-[0.5px]"
        style={{
            width: Math.random() > 0.5 ? '2px' : '1px',
            height: Math.random() > 0.5 ? '2px' : '1px',
            top: `${random(0, 100)}%`,
            left: `${random(0, 100)}%`,
        }}
    />
);

const ShootingStar = () => (
    <motion.div
        initial={{ x: -100, y: -100, opacity: 0 }}
        animate={{
            x: window.innerWidth + 100,
            y: window.innerHeight + 100,
            opacity: [0, 1, 0]
        }}
        transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: random(5, 15),
            ease: "linear"
        }}
        className="absolute w-[100px] h-[1px] bg-gradient-to-r from-transparent via-cyan-200 to-transparent rotate-45 blur-[1px]"
        style={{
            top: `${random(0, 50)}%`,
            left: `${random(0, 50)}%`,
        }}
    />
);

export const AuroraBackground = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleMouseMove = (e) => {
            animate(mouseX, e.clientX, { type: "spring", damping: 50, stiffness: 200 });
            animate(mouseY, e.clientY, { type: "spring", damping: 50, stiffness: 200 });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className="fixed inset-0 z-0 bg-[#020205] overflow-hidden selection:bg-indigo-500/30">

            {/* 1. Cinematic Noise Texture (The "Film" Look) */}
            <div
                className="absolute inset-0 z-50 opacity-[0.04] pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />

            {/* 3. Deep Space Gradient Mesh */}
            <div className="absolute inset-0 z-0">
                {/* Pure White/Silver Core */}
                <motion.div
                    animate={{ scale: [1, 1.05, 1], opacity: [0.05, 0.1, 0.05] }}
                    transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-20%] left-[10%] w-[100vw] h-[100vw] rounded-full bg-white/5 blur-[200px] mix-blend-overlay"
                />

                {/* Subtile Cyan Edge Flow */}
                <motion.div
                    animate={{ x: [-20, 20, -20], rotate: [0, 2, 0] }}
                    transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] rounded-full bg-cyan-500/5 blur-[180px] mix-blend-color-dodge"
                />

                {/* Deep Grey/Mist Glow */}
                <motion.div
                    animate={{
                        opacity: [0.02, 0.06, 0.02],
                        scale: [1, 1.05, 1],
                        y: [0, 10, 0]
                    }}
                    transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[10%] right-[15%] w-[50vw] h-[70vh] bg-slate-500/5 blur-[200px] mix-blend-screen"
                />
            </div>

            {/* 4. The Starfield (Adds Depth & Interest) */}
            {mounted && (
                <div className="absolute inset-0 z-10 pointer-events-none">
                    {[...Array(40)].map((_, i) => (
                        <Star key={i} delay={random(0, 10)} />
                    ))}
                    {/* Subtle Shooting Stars */}
                    <ShootingStar />
                </div>
            )}

            {/* 5. Subtle Grid Overlay (Adds Tech Feel) */}
            <div
                className="absolute inset-0 z-1 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
                    backgroundSize: '100px 100px',
                    maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
                }}
            />

        </div>
    );
};