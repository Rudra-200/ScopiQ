"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Lock, Zap, ShieldAlert } from "lucide-react";
import NeuralGridParticles from "@/components/landing/NeuralGridParticles";

export default function ScopeVisualizer() {
    const [paths, setPaths] = useState({ p1: "", p2: "", p3: "" });

    useEffect(() => {
        let time = 0;
        const interval = setInterval(() => {
            time += 0.04;
            const generatePath = (freq, amp, phase) => {
                let p = "M 0 30 ";
                for (let i = 0; i <= 100; i++) {
                    const x = i * 11;
                    const y = 30 + Math.sin(i * freq + time + phase) * amp;
                    p += `L ${x} ${y} `;
                }
                return p;
            };

            setPaths({
                p1: generatePath(0.15, 12, 0),
                p2: generatePath(0.1, 15, 2),
                p3: generatePath(0.2, 10, 4)
            });
        }, 30);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative py-24 px-6 flex flex-col items-center z-10 bg-transparent overflow-hidden">
            
            {/* New Particle Background */}
            <NeuralGridParticles />

            <div className="text-center mb-16 max-w-3xl mx-auto relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Global Data. <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500">Locally Throttled.</span>
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed px-4">
                    The engine creates a hyper-localized context tunnel. Irrelevant noise is physically rejected before processing.
                </p>
            </div>

            <div className="relative w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">

                {/* Left: Chaos */}
                <div className="space-y-4 opacity-50 blur-[1px]">
                    {['Weather Patterns', 'Sports Scores', 'Celebrity Gossip', 'Stock Tickers'].map((text, i) => (
                        <motion.div
                            key={i}
                            initial={{ x: -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1, duration: 2, repeat: Infinity, repeatType: "reverse" }}
                            className="flex items-center justify-end gap-3 text-right text-red-400 font-mono text-xs border-r-2 border-red-500/30 pr-4 py-2"
                        >
                            {text} <ShieldAlert size={14} />
                        </motion.div>
                    ))}
                </div>

                {/* Center: The Context Tunnel (Fluid, Native Waves) */}
                <div className="relative h-[400px] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-y-0 w-px bg-white/5 left-1/4" />
                    <div className="absolute inset-y-0 w-px bg-white/5 right-1/4" />
                    
                    {/* Native Triple-Strand Wave Loom */}
                    <div className="absolute inset-x-0 w-full opacity-60">
                        <svg viewBox="0 0 1000 60" preserveAspectRatio="none" className="w-full h-[120px]">
                            <path d={paths.p1} fill="none" stroke="#22d3ee" strokeWidth="1.2" strokeOpacity="0.4" />
                            <path d={paths.p2} fill="none" stroke="#a855f7" strokeWidth="1" strokeOpacity="0.3" />
                            <path d={paths.p3} fill="none" stroke="#6366f1" strokeWidth="0.8" strokeOpacity="0.2" />
                        </svg>
                    </div>

                    <div className="z-10 text-center">
                        <div className="text-xs font-mono text-cyan-400 mb-2 tracking-[0.3em] uppercase opacity-50">Context_Tunnel</div>
                        <div className="text-3xl font-bold text-white tracking-tight">ACTIVE FILTERING</div>
                    </div>
                </div>

                {/* Right: Order */}
                <div className="space-y-4">
                    {['Qubit Superposition', 'Entanglement Theory', 'Error Correction', 'Quantum Gates'].map((text, i) => (
                        <motion.div
                            key={i}
                            initial={{ x: 50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 + (i * 0.1) }}
                            className="flex items-center gap-3 text-cyan-300 font-mono text-sm border-l-2 border-cyan-500 pl-4 py-3 bg-cyan-900/10 rounded-r-lg"
                        >
                            <Zap size={14} className="text-yellow-400" /> {text}
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}