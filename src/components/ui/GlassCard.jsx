import { cn } from "@/lib/utils";

export const GlassCard = ({ children, className, hoverEffect = false }) => (
    <div className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl transition-all duration-300",
        hoverEffect && "hover:border-cyan-400/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]",
        className
    )}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50 pointer-events-none" />
        {children}
    </div>
);