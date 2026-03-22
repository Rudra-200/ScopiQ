import { motion } from "framer-motion";

export default function ThinkingIndicator() {
    return (
        <div className="flex items-start gap-5 mb-10 opacity-60">
            <div className="shrink-0 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-3 h-3 border border-cyan-400 rounded-sm"
                />
            </div>
            <div className="space-y-3 w-full max-w-md pt-2">
                <div className="h-2 w-3/4 bg-white/5 rounded-full overflow-hidden relative">
                    <motion.div 
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" 
                    />
                </div>
                <div className="h-2 w-1/2 bg-white/5 rounded-full overflow-hidden relative">
                    <motion.div 
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.5 }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" 
                    />
                </div>
                <div className="text-[10px] text-cyan-400 font-black uppercase tracking-[0.4em] font-montserrat animate-pulse flex items-center gap-2">
                    <div className="w-1 h-1 bg-cyan-400 rounded-full" />
                    Calibrating Neural Layers
                </div>
            </div>
        </div>
    );
}