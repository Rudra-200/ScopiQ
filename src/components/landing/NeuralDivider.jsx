"use client";
import React from "react";
import { motion } from "framer-motion";

export default function NeuralDivider() {
    return (
        <div className="relative w-full h-[60px] flex items-center justify-center pointer-events-none my-12">
            {/* Tapered Ambient Filament */}
            <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]" />
            
            {/* Central Glow Hotspot (Removes Boxiness) */}
            <div className="absolute w-[300px] h-[40px] bg-cyan-500/5 rounded-full blur-[30px]" />
            <div className="absolute w-[100px] h-[1px] bg-cyan-400/20 blur-[2px]" />

            {/* Moving Pulsar */}
            <motion.div 
                initial={{ x: "-150%", opacity: 0 }}
                animate={{ 
                    x: "300%", 
                    opacity: [0, 0.6, 0.6, 0] 
                }}
                transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: Math.random() * 3
                }}
                className="absolute w-48 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-[1px]"
            />

            {/* Focal Point (Industrial Neural Node) */}
            <div className="relative z-10 flex items-center justify-center">
                <motion.div 
                    animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute w-4 h-4 bg-cyan-500/20 rounded-full blur-[4px]"
                />
                <div className="w-1.5 h-1.5 rounded-full bg-white border border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
            </div>

            {/* Vertical Neural Signal (Soft Spikes) */}
            <div className="absolute inset-0 flex justify-center items-center opacity-5">
                {[...Array(12)].map((_, i) => (
                    <motion.div 
                        key={i}
                        animate={{ height: ["10px", "30px", "10px"] }}
                        transition={{ 
                            duration: 3 + Math.random() * 2, 
                            repeat: Infinity, 
                            delay: i * 0.2 
                        }}
                        className="w-[1px] bg-white mx-4"
                    />
                ))}
            </div>
        </div>
    );
}

