"use client";
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, XCircle, CheckCircle } from 'lucide-react';
import { Section } from '@/components/ui/Section';

export default function ScopeBoundary() {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-20%" });

    return (
        <Section>
            <div ref={ref} className="relative w-full max-w-5xl flex flex-col items-center">
                <motion.div
                    className="absolute inset-0 bg-fuchsia-900/10 blur-[100px] rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 8, repeat: Infinity }}
                />

                <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 text-center">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-fuchsia-400">
                        Scope as a Visual Boundary
                    </span>
                </h2>

                <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden">

                    {/* The Boundary Ring */}
                    <div className="relative z-10 w-64 h-64 rounded-full border-2 border-fuchsia-500/50 shadow-[0_0_30px_rgba(217,70,239,0.3)] flex items-center justify-center bg-black/20 backdrop-blur-sm group">
                        <div className="absolute inset-0 rounded-full border border-cyan-500/30 animate-[spin_10s_linear_infinite]" />
                        <div className="text-center">
                            <div className="text-xs font-mono text-cyan-400 mb-1">BOUNDARY ACTIVE</div>
                            <Shield className="w-12 h-12 text-fuchsia-400 mx-auto mb-2" />
                        </div>

                        {/* Orbiting labels */}
                        <motion.div className="absolute -inset-12" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                            <span className="absolute top-0 left-1/2 -translate-x-1/2 bg-black px-2 text-xs text-cyan-400 border border-cyan-500/30 rounded">Precision</span>
                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-black px-2 text-xs text-cyan-400 border border-cyan-500/30 rounded">Discipline</span>
                        </motion.div>
                    </div>

                    {/* Animation Simulation */}
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        {/* Rejected Query */}
                        <motion.div
                            className="absolute top-1/3 left-0 flex items-center gap-2 bg-red-900/20 border border-red-500/30 px-4 py-2 rounded-lg text-red-200 text-sm"
                            initial={{ x: -100, opacity: 0 }}
                            whileInView={{
                                x: ["0%", "40%", "45%"],
                                opacity: [0, 1, 0],
                                scale: [1, 1, 1.5]
                            }}
                            transition={{ duration: 4, repeat: Infinity, repeatDelay: 1 }}
                        >
                            <XCircle size={16} /> "Weather in Tokyo?"
                        </motion.div>

                        {/* Accepted Query */}
                        <motion.div
                            className="absolute bottom-1/3 left-0 flex items-center gap-2 bg-cyan-900/20 border border-cyan-500/30 px-4 py-2 rounded-lg text-cyan-200 text-sm"
                            initial={{ x: -100, opacity: 0 }}
                            whileInView={{
                                x: ["0%", "50%", "150%"],
                                opacity: [0, 1, 0],
                            }}
                            transition={{ duration: 4, repeat: Infinity, repeatDelay: 1, delay: 2 }}
                        >
                            <CheckCircle size={16} /> "Explain Transformers"
                        </motion.div>
                    </div>
                </div>
            </div>
        </Section>
    );
}