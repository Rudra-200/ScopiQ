"use client";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus, Menu, Settings, LayoutGrid, Clock, ChevronRight, Compass, Sparkles, ArrowRight
} from "lucide-react";

export default function Sidebar({ onNewSession, onLoadHistory, isMobileOpen, setIsMobileOpen }) {

    const historyItems = [
        { id: 1, title: "The Silver Cord", scope: "Mechanics", date: "10:42 AM" },
        { id: 2, title: "Deep Sleep Induction", scope: "Technique", date: "Yesterday" },
        { id: 3, title: "Higher Astral Planes", scope: "Mapping", date: "Mon" },
    ];

    const SidebarContent = () => (
        // FIX: flex-col h-full ensures full height. 
        // bg-[#0a0a0a]/60 creates the dark glass layer that goes all the way down.
        <div className="flex flex-col h-full w-full bg-[#0a0a0a]/80 backdrop-blur-3xl border-r border-white/5">

            {/* 1. TOP AREA: COMMAND HEADER */}
            <div className="pt-20 px-6 pb-8 shrink-0">
                <div className="flex items-center justify-between mb-6">
                    <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] font-montserrat">
                        Command
                    </div>
                    <div className="flex gap-1">
                        {[1, 2, 3].map(i => (
                            <motion.div 
                                key={i}
                                animate={{ opacity: [0.2, 1, 0.2] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                                className="w-1 h-1 rounded-full bg-cyan-400" 
                            />
                        ))}
                    </div>
                </div>

                <button
                    onClick={() => {
                        onNewSession();
                        if (window.innerWidth < 768) setIsMobileOpen(false);
                    }}
                    className="group relative w-full flex items-center justify-between px-6 py-5 rounded-[22px] bg-white text-black hover:bg-white/90 transition-all duration-300 active:scale-[0.98] shadow-2xl"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-black/5 group-hover:bg-black/10 transition-colors">
                            <Plus size={16} strokeWidth={3} />
                        </div>
                        <span className="text-sm font-black tracking-tight font-montserrat uppercase">New Scope</span>
                    </div>
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </button>
            </div>

            {/* 2. REAL-TIME MONITOR */}
            <div className="px-6 mb-8">
                <div className="p-4 rounded-[20px] bg-white/[0.02] border border-white/5 backdrop-blur-md">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-[9px] font-bold text-white/30 truncate font-montserrat uppercase tracking-widest">Neural Link</span>
                        <span className="text-[9px] font-bold text-cyan-400 font-montserrat animate-pulse">ACTIVE</span>
                    </div>
                    <div className="flex items-end gap-1 h-6">
                        {[...Array(20)].map((_, i) => (
                            <motion.div 
                                key={i}
                                animate={{ height: [4, Math.random() * 16 + 4, 4] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.05 }}
                                className="w-[2px] bg-white/10 rounded-full"
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* 3. ARCHIVES: DYNAMIC LIST */}
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-8 scrollbar-hide min-h-0">
                <div>
                    <div className="text-[10px] font-black text-white/10 uppercase tracking-[0.4em] mb-5 pl-4 font-montserrat">
                        Archives
                    </div>

                    <div className="space-y-2">
                        {historyItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    onLoadHistory(item);
                                    if (window.innerWidth < 768) setIsMobileOpen(false);
                                }}
                                className="group w-full flex flex-col px-4 py-4 rounded-[20px] hover:bg-white/[0.03] border border-transparent hover:border-white/5 transition-all duration-500 text-left"
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-[13px] text-white/40 group-hover:text-white truncate font-bold tracking-tight transition-colors">
                                        {item.title}
                                    </span>
                                    <span className="text-[8px] text-white/10 group-hover:text-cyan-400 uppercase font-black tracking-widest transition-colors font-montserrat">
                                        {item.mode === 'rag' ? 'GND' : 'COG'}
                                    </span>
                                </div>
                                <span className="text-[9px] text-white/10 group-hover:text-white/20 uppercase tracking-[0.2em] font-bold font-montserrat truncate transition-colors">
                                    {item.scope}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* 4. USER PROFILE: APPLE INSPIRED */}
            <div className="p-6 border-t border-white/5 bg-black/40 shrink-0">
                <button className="flex items-center gap-4 w-full p-3 rounded-[24px] hover:bg-white/5 transition-all group overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="relative w-10 h-10">
                        <div className="w-full h-full rounded-full bg-white text-black flex items-center justify-center text-[11px] font-black shadow-2xl relative z-10">
                            SQ
                        </div>
                        <motion.div 
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute -inset-1 bg-cyan-400 rounded-full blur-md" 
                        />
                    </div>

                    <div className="flex-1 text-left relative z-10">
                        <div className="text-[13px] text-white font-bold tracking-tight font-montserrat">Unified Core</div>
                        <div className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
                            <div className="text-[9px] text-white/20 font-medium font-montserrat uppercase tracking-[0.1em]">Signal Stable</div>
                        </div>
                    </div>
                </button>
            </div>
        </div>
    );

    return (
        <>
            <aside className="hidden md:flex w-[290px] h-full flex-shrink-0 z-40">
                <SidebarContent />
            </aside>

            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md md:hidden"
                        onClick={() => setIsMobileOpen(false)}
                    >
                        <motion.div
                            initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="absolute top-0 left-0 bottom-0 w-[85%] max-w-[320px] h-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <SidebarContent />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsMobileOpen(true)}
                className="md:hidden absolute top-5 left-5 z-50 p-2.5 rounded-full bg-white/10 text-white backdrop-blur-xl"
            >
                <Menu size={20} />
            </button>
        </>
    );
}