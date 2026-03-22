"use client";
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { Section } from '@/components/ui/Section';

export default function UseCases() {
    const cases = [
        { title: "Academic Tutoring", scope: "Linear Algebra", icon: "📚" },
        { title: "Corporate Compliance", scope: "HR Policy Only", icon: "🏢" },
        { title: "Research Expert", scope: "Neuroscience", icon: "🔬" },
        { title: "Secure Enterprise", scope: "Internal Data", icon: "🛡️" },
    ];

    return (
        <Section>
            <h2 className="text-4xl font-bold text-white mb-16">Domain Applications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
                {cases.map((c, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <GlassCard className="h-64 flex flex-col justify-between p-6 cursor-pointer hover:-translate-y-2 transition-transform">
                            <div>
                                <div className="text-4xl mb-4">{c.icon}</div>
                                <h3 className="text-xl font-semibold text-white">{c.title}</h3>
                            </div>

                            <div className="relative">
                                <div className="absolute -top-10 left-0 text-xs text-gray-500 uppercase tracking-widest">Active Scope</div>
                                <div className="flex items-center gap-2 text-cyan-400 border border-cyan-500/20 bg-cyan-900/10 px-3 py-1.5 rounded-full text-sm w-fit">
                                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                                    {c.scope}
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
}