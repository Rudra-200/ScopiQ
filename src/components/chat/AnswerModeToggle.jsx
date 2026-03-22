"use client";
import { motion } from "framer-motion";
import { Database, Sparkles } from "lucide-react";

export default function AnswerModeToggle({ mode, setMode }) {
    // Modes: 'rag' | 'gemini'

    return (
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-full border border-white/5 mb-8 w-fit mx-auto backdrop-blur-3xl">

            {/* RAG BUTTON */}
            <button
                onClick={() => setMode('rag')}
                className={`
                    relative flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] font-montserrat transition-all duration-500
                    ${mode === 'rag' ? 'text-white' : 'text-white/20 hover:text-white/30'}
                `}
            >
                {mode === 'rag' && (
                    <motion.div
                        layoutId="active-pill"
                        className="absolute inset-0 bg-white/[0.05] border border-white/10 rounded-full"
                        transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                )}
                <span className="relative z-10 flex items-center gap-2">
                    <Database size={10} className={mode === 'rag' ? "text-cyan-400" : "text-white/10"} />
                    Grounded
                </span>
            </button>

            {/* COGNITIVE BUTTON */}
            <button
                onClick={() => setMode('gemini')}
                className={`
                    relative flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] font-montserrat transition-all duration-500
                    ${mode === 'gemini' ? 'text-white' : 'text-white/20 hover:text-white/30'}
                `}
            >
                {mode === 'gemini' && (
                    <motion.div
                        layoutId="active-pill"
                        className="absolute inset-0 bg-white/[0.05] border border-white/10 rounded-full"
                        transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                )}
                <span className="relative z-10 flex items-center gap-2">
                    <Sparkles size={10} className={mode === 'gemini' ? "text-white" : "text-white/10"} />
                    Cognitive
                </span>
            </button>
        </div>
    );
}
