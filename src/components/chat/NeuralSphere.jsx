"use client";
import React from "react";
import { motion } from "framer-motion";

export default function NeuralSphere() {
  const ribbons = 7;
  const particles = 20;

  return (
    <div className="relative w-[340px] h-[340px] flex items-center justify-center select-none pointer-events-none group bg-transparent scale-75 sm:scale-100">
        
        {/* Deep Space Atmosphere Glow */}
        <div className="absolute inset-[-50px] bg-[#0064ff]/10 rounded-full blur-[80px]" />

        {/* The Black Glass Sphere Body (Perfect Reference Match) */}
        <div className="absolute inset-[8%] rounded-full bg-gradient-to-tr from-[#020510] via-[#051020] to-[#01040a] shadow-[inset_-20px_-20px_50px_rgba(0,120,255,0.1),0_0_30px_rgba(0,180,255,0.2)] overflow-hidden">
             {/* Rim Light Core Highlight */}
             <div className="absolute inset-0 rounded-full shadow-[inset_15px_15px_30px_rgba(56,189,248,0.25)]" />
             <div className="absolute inset-0 rounded-full shadow-[inset_-5px_-5px_15px_rgba(255,255,255,0.1)]" />
        </div>

        {/* 3D Kinetic Ribbon Rings (Sweeping Glowing Waves) */}
        <div className="absolute inset-0" style={{ perspective: "1000px" }}>
            <motion.div 
                animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                className="w-full h-full relative"
                style={{ transformStyle: "preserve-3d" }}
            >
                {[...Array(ribbons)].map((_, i) => (
                    <motion.div
                        key={`ribbon-${i}`}
                        className="absolute inset-[5%] flex items-center justify-center mix-blend-screen"
                        style={{ 
                            transform: `rotateX(${(360 / ribbons) * i}deg) rotateY(${(180 / ribbons) * i}deg)`,
                            transformStyle: "preserve-3d"
                        }}
                    >
                        <motion.svg 
                            animate={{ rotateZ: i % 2 === 0 ? [0, 360] : [0, -360] }}
                            transition={{ duration: 8 + (i % 3) * 2, repeat: Infinity, ease: "linear" }}
                            viewBox="0 0 100 100" 
                            className="w-[100%] h-[100%] overflow-visible opacity-90"
                        >
                            <defs>
                                <linearGradient id={`grad-${i}`} x1="100%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#ffffff" stopOpacity="1" /> {/* Bright White Core */}
                                    <stop offset="15%" stopColor="#38bdf8" stopOpacity="1" /> {/* Electric Cyan */}
                                    <stop offset="50%" stopColor="#2563eb" stopOpacity="0.8" /> {/* Deep Royal Blue */}
                                    <stop offset="100%" stopColor="#000000" stopOpacity="0" /> {/* Alpha Fade */}
                                </linearGradient>
                                <filter id="glow-sharp">
                                    <feGaussianBlur stdDeviation="1.2" result="coloredBlur"/>
                                    <feMerge>
                                        <feMergeNode in="coloredBlur"/>
                                        <feMergeNode in="SourceGraphic"/>
                                    </feMerge>
                                </filter>
                            </defs>
                            
                            {/* The sleek sweeping neon arc */}
                            <circle 
                                cx="50" cy="50" r="49" 
                                fill="none" 
                                stroke={`url(#grad-${i})`} 
                                strokeWidth="0.8"
                                strokeDasharray="160 307" // Arc length 160 out of 307 circumference
                                strokeLinecap="round"
                                filter="url(#glow-sharp)"
                            />
                        </motion.svg>
                    </motion.div>
                ))}
            </motion.div>
        </div>

        {/* Outer Orbital Particle System (Dots) */}
        <div className="absolute inset-0" style={{ perspective: "1000px" }}>
            <motion.div 
                animate={{ rotateY: [0, 360], rotateZ: [0, 360] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="w-full h-full relative"
                style={{ transformStyle: "preserve-3d" }}
            >
                {[...Array(particles)].map((_, i) => (
                    <motion.div
                        key={`dot-${i}`}
                        className="absolute inset-[2%] rounded-full border border-blue-500/5 mix-blend-screen"
                        style={{ 
                            transform: `rotateX(${(360 / particles) * i}deg) rotateY(${(180 / particles) * i}deg)`,
                            transformStyle: "preserve-3d"
                        }}
                    >
                        {/* Micro-Dot Element */}
                        <div className="absolute top-0 left-[50%] w-[2px] h-[2px] bg-white rounded-full shadow-[0_0_6px_#38bdf8]" />
                    </motion.div>
                ))}
            </motion.div>
        </div>

    </div>
  );
}


