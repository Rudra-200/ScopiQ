import { cn } from "@/lib/utils";

export const CyberCard = ({ children, className, active = false }) => (
    <div className={cn(
        "relative bg-black/40 backdrop-blur-md border border-white/5 p-6 group transition-all duration-500",
        active ? "border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.15)]" : "hover:border-white/20",
        className
    )}>
        {/* Corner Markers */}
        <div className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-cyan-500/50 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute top-0 right-0 w-2 h-2 border-r-2 border-t-2 border-cyan-500/50 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-l-2 border-b-2 border-cyan-500/50 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-r-2 border-b-2 border-cyan-500/50 opacity-0 group-hover:opacity-100 transition-opacity" />

        {children}
    </div>
);