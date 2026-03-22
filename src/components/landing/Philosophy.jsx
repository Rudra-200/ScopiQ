"use client";
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Philosophy() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const width = useTransform(scrollYProgress, [0.2, 0.6], ["0%", "100%"]);
    const opacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);

    return (
        <div ref={ref} className="relative h-[150vh] w-full">
            <div className="sticky top-0 h-screen w-full flex overflow-hidden">

                {/* Left: Chaos (General AI) */}
                <div className="w-full md:w-1/2 h-full bg-[#0a0a0a] flex flex-col items-center justify-center p-12 border-r border-white/5">
                    <div className="relative w-full max-w-md h-full flex items-center justify-center">
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute text-gray-700 text-sm md:text-xl font-bold"
                                animate={{
                                    x: [Math.random() * 200 - 100, Math.random() * 200 - 100],
                                    y: [Math.random() * 200 - 100, Math.random() * 200 - 100],
                                    opacity: [0.3, 0.6, 0.3]
                                }}
                                transition={{ duration: 3 + i, repeat: Infinity }}
                            >
                                {["Hallucination", "Off-topic", "Bias", "Noise"][i % 4]}
                            </motion.div>
                        ))}
                        <h3 className="text-gray-500 text-2xl z-10 font-mono">Limitless Talker</h3>
                    </div>
                </div>

                {/* Right: Order (Scopiq) */}
                <motion.div
                    style={{ width }}
                    className="absolute right-0 h-full bg-gradient-to-br from-indigo-950 to-black overflow-hidden flex items-center justify-center border-l border-cyan-500/30 z-20"
                >
                    <motion.div style={{ opacity }} className="text-center min-w-[300px] px-8">
                        <div className="w-1 h-32 bg-gradient-to-b from-transparent via-cyan-400 to-transparent mx-auto mb-8" />
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">Controlled Intelligence</h2>
                        <p className="text-cyan-200/70 text-lg">From limitless talker to directed thinker.</p>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}