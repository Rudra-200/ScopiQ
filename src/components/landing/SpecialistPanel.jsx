"use client";
import { Layers, Lock, Zap } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Section } from '@/components/ui/Section';

export default function SpecialistPanel() {
    const items = [
        { icon: Layers, title: "Focused Knowledge", desc: "Once session begins, the engine becomes a subject-matter specialist." },
        { icon: Lock, title: "Controlled Boundaries", desc: "Every question is interrogated at the gate. Violations never reach the core." },
        { icon: Zap, title: "Session Memory", desc: "The engine remembers what matters—and ignores what doesn't." }
    ];

    return (
        <Section className="bg-black/20">
            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6">
                {items.map((item, i) => (
                    <GlassCard key={i} hoverEffect className="p-8 group">
                        <div className="mb-4 p-3 bg-white/5 w-fit rounded-xl group-hover:bg-cyan-500/20 transition-colors">
                            <item.icon className="w-8 h-8 text-cyan-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                    </GlassCard>
                ))}
            </div>
        </Section>
    );
}