"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import ParticleField from "@/components/landing/ParticleField";

export default function Hero() {
    const router = useRouter();
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({
                x: (e.clientX / window.innerWidth) - 0.5,
                y: (e.clientY / window.innerHeight) - 0.5
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-[#000000]">
            
            {/* 0. Deep Background Watermark (Antimatter Style) */}
            <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.03]">
                <h2 className="text-[25vw] font-black text-white select-none pointer-events-none font-montserrat tracking-tighter">
                    SCOPIQ
                </h2>
            </div>

            {/* 0.1 Atmospheric Nebula Blurs */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/5 rounded-full blur-[150px] pointer-events-none" />

            {/* 0.2 Rotating 3D Point Cloud Sphere */}
            <ParticleField />

            {/* 1. Main Content */}
            <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-6xl">

                {/* Status Badge */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 px-6 py-2 rounded-full border border-white/5 bg-white/5 text-white/50 text-[8px] tracking-[0.5em] font-black font-montserrat mb-12 uppercase"
                >
                    System Link Stable
                </motion.div>

                {/* 2. Apple Style Typography */}
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-8 leading-[0.95] max-w-4xl">
                    High Fidelity <br />
                    <span className="text-white/20">Cognitive Engine.</span>
                </h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-lg md:text-xl text-white/40 max-w-xl font-light leading-relaxed mb-16 tracking-tight"
                >
                    Cross-reference vast datasets with surgical precision. <br className="hidden md:block" />
                    Objective analysis, grounded in your context.
                </motion.p>

                {/* 3. Minimal Buttons */}
                <div className="flex flex-col md:flex-row gap-8 w-full justify-center items-center">
                    <button
                        onClick={() => router.push('/chat')}
                        className="group relative px-10 py-4 bg-white text-black font-bold text-base tracking-tight rounded-full overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Enter Workspace <ArrowRight className="w-4 h-4" />
                        </span>
                    </button>

                    <button className="text-white/30 hover:text-white transition-opacity text-sm font-medium tracking-tight">
                        Core Documentation
                    </button>
                </div>
            </div>
        </section>

    );
}