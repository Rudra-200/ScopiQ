"use client";
import { motion } from "framer-motion";
import { Terminal, Database, Code2, Globe, Cpu, Zap, Target, Search } from "lucide-react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ProtocolPill = ({ icon: Icon, title, onClick }) => (
    <motion.button 
        whileHover={{ y: -3, scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onClick(title)}
        className="flex items-center gap-4 px-6 py-3 rounded-[18px] bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:bg-white/[0.08] hover:border-white/20 transition-all duration-500 group relative overflow-hidden"
    >
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <Icon size={14} className="text-cyan-400 group-hover:text-white transition-colors relative z-10" />
        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/50 group-hover:text-white font-montserrat transition-colors relative z-10">
            {title}
        </span>
    </motion.button>
);

export default function ThrottleCard({ onInitialize }) {
    const containerRef = useRef(null);

    useGSAP(() => {
        // Siri-like Fluid Aura
        gsap.to(".fluid-aura", {
            scale: 1.2,
            opacity: 0.4,
            duration: 5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: 2
        });

        // Wave Animation
        gsap.to(".neural-wave", {
            attr: { d: "M 0 10 Q 25 2, 50 10 Q 75 18, 100 10" },
            repeat: -1,
            yoyo: true,
            duration: 2,
            ease: "sine.inOut"
        });
    }, { scope: containerRef });

    const protocols = [
        { icon: Target, title: "Mission" },
        { icon: Database, title: "Synthesis" },
        { icon: Cpu, title: "Logic" },
        { icon: Search, title: "Investigation" }
    ];

    return (
        <div ref={containerRef} className="w-full max-w-2xl mx-auto rounded-[48px] bg-[#050505] border border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden relative group p-12 py-16">
            
            {/* Apple Fluid Aura */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden origin-center">
                <div className="fluid-aura absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.03)_0%,transparent_50%)]" />
                <div className="fluid-aura absolute top-[-50%] right-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_50%)] delay-1000" />
            </div>

            <div className="relative z-10 flex flex-col items-center">
                
                <header className="text-center mb-14">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6"
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-cyan-400 font-montserrat">Engine Calibrated</span>
                    </motion.div>
                    
                    <h1 className="text-5xl font-bold text-white tracking-tighter font-montserrat mb-4">
                        Initiate <span className="text-white/20 italic font-light">Protocol.</span>
                    </h1>
                </header>

                {/* Glass UI Pills */}
                <div className="flex flex-wrap justify-center gap-5 mb-14">
                    {protocols.map((p, i) => (
                        <ProtocolPill 
                            key={i} 
                            {...p} 
                            onClick={(val) => onInitialize(val)} 
                        />
                    ))}
                </div>

                {/* Liquid Wave Animation */}
                <div className="w-48 h-10 relative flex flex-col items-center">
                    <svg viewBox="0 0 100 20" className="w-full h-full">
                        <path 
                            className="neural-wave"
                            d="M 0 10 Q 25 18, 50 10 Q 75 2, 100 10" 
                            fill="none" 
                            stroke="rgba(34,211,238,0.3)" 
                            strokeWidth="0.5" 
                            strokeLinecap="round"
                        />
                        <path 
                            className="neural-wave"
                            d="M 0 10 Q 25 15, 50 10 Q 75 5, 100 10" 
                            fill="none" 
                            stroke="rgba(255,255,255,0.1)" 
                            strokeWidth="0.5" 
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="text-[10px] text-white/10 uppercase tracking-[0.5em] font-black font-montserrat mt-2">
                        System Ready
                    </div>
                </div>

            </div>

        </div>
    );
}
