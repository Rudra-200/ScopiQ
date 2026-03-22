import { ShieldCheck, Cpu } from 'lucide-react';

export default function ScopeHUD({ scope }) {
    // Format the scope text - remove underscores/hyphens and capitalize
    const formattedScope = scope
        ? scope.replace(/[_-]/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
        : 'General Reasoning';

    return (
        <div className="w-full max-w-lg mx-auto flex items-center justify-center bg-[#050505]/60 border border-white/5 backdrop-blur-2xl rounded-full px-8 py-3 shadow-2xl transition-all duration-700 hover:border-white/10">

            {/* Status & Protocol */}
            <div className="flex items-center gap-4">
                <div className="relative group">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                    <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping opacity-30" />
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-[10px] text-white/30 font-bold uppercase tracking-[0.4em] font-sans">Active Context:</span>
                    <span className="text-[14px] text-white/90 font-medium tracking-tight font-sans italic opacity-80">{formattedScope}</span>
                </div>
            </div>
        </div>
    );
}