import { WorldCore } from "@/components/ui/WorldCore";
import Hero from "@/components/landing/Hero";
import ScopeVisualizer from "@/components/landing/ScopeVisualizer";
import WavySignalDivider from "@/components/landing/WavySignalDivider";

export default function Home() {
    return (
        <main className="relative min-h-screen bg-[#000000] text-white overflow-x-hidden selection:bg-cyan-500/30 font-sans">
            <WorldCore />

            <div className="relative z-10 flex flex-col">
                <Hero />
                <WavySignalDivider />
                <ScopeVisualizer />
            </div>

            {/* Global Grain/Noise Overlay for Film effect */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100]" style={{ backgroundImage: 'url("/noise.png")' }}></div>
        </main>
    );
}