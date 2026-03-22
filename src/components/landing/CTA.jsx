"use client";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import ParticleField from "@/components/landing/ParticleField";

export default function CTA() {
    const router = useRouter();

    return (
        <section className="relative py-64 px-6 flex flex-col items-center justify-center overflow-hidden bg-black">
            
            {/* Background continuity from whole page */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
                <ParticleField />
            </div>

            {/* Cinematic Focal Glow */}
            <div className="absolute w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[200px] animate-pulse" />

            <div className="relative z-10 flex flex-col items-center text-center max-w-5xl">
                
                {/* Massive Finale Typography */}
                <h3 className="text-6xl md:text-9xl font-black text-white mb-12 font-montserrat tracking-tighter uppercase leading-[0.85]">
                    Ready <br className="md:hidden" />
                    to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white">Throttle?</span>
                </h3>

                {/* Scoped Protocol Identifier */}
                <div className="flex items-center gap-4 mb-20 opacity-40 group cursor-default">
                    <div className="w-12 h-px bg-white/20" />
                    <span className="text-[10px] font-black uppercase tracking-[0.6em] font-montserrat">Initiate Scoped Protocol 01</span>
                    <div className="w-12 h-px bg-white/20" />
                </div>

                {/* The Portal Button (Neural Ring) */}
                <div className="relative p-12">
                    {/* Pulsing Neural Ring */}
                    <div className="absolute inset-0 border border-cyan-500/20 rounded-full animate-[ping_4s_linear_infinite]" />
                    <div className="absolute inset-4 border border-white/10 rounded-full animate-[ping_3s_linear_infinite_inverse] delay-700" />
                    <div className="absolute inset-[-20px] bg-cyan-500/5 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity" />

                    <button
                        onClick={() => router.push('/chat')}
                        className="group relative px-16 py-8 rounded-full bg-white text-black text-sm font-black uppercase tracking-[0.4em] font-montserrat transition-all hover:scale-[1.05] active:scale-[0.95] overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            Launch Workspace <ArrowRight size={20} className="group-hover:translate-x-3 transition-transform duration-500" />
                        </span>
                        {/* Internal Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    </button>
                </div>
            </div>

            {/* Bottom Section Fade (Back into shadows) */}
            <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black to-transparent z-20" />
        </section>
    );
}