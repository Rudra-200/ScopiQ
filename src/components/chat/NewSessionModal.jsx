"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, X, FileText, Database, Compass } from "lucide-react";

export default function NewSessionModal({ isOpen, onClose, onConfirm }) {
    const [scopeTopic, setScopeTopic] = useState("");
    const [documents, setDocuments] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const topic = scopeTopic.trim();
        if (!topic) return;

        setIsSubmitting(true);

        // Prepare data
        const scopeData = {
            description: topic,
            documents: documents.trim() ? [documents.trim()] : [],
            exclusions: "" // Optional: Could add field for this
        };

        // Call Scope Init API
        try {
            const res = await fetch('/api/scope/init', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(scopeData)
            });
            const data = await res.json();

            if (data.scopeId) {
                // Pass scopeId and description back to parent
                onConfirm({
                    scopeId: data.scopeId,
                    topic: topic,
                    docCount: (scopeData.documents.length)
                });
            }
        } catch (err) {
            console.error("Scope Init Failed", err);
            // Handle error (alert?)
        } finally {
            setIsSubmitting(false);
            setScopeTopic("");
            setDocuments("");
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                {/* 1. Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    onClick={onClose}
                />

                {/* 2. The Modal Card */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative w-full max-w-lg bg-[#050505] border border-white/10 rounded-[28px] shadow-2xl overflow-hidden"
                >
                    <div className="p-10">
                        <div className="flex justify-between items-start mb-10">
                            <div>
                                <h2 className="text-2xl font-bold text-white tracking-tight">
                                    Define Cognitive Scope
                                </h2>
                                <p className="text-sm text-white/30 mt-2 font-light leading-relaxed">Limit reasoning to a specific dataset for high-fidelity responses.</p>
                            </div>
                            <button onClick={onClose} className="text-white/20 hover:text-white transition-colors p-1">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] pl-1">
                                    Primary Dataset Protocol
                                </label>
                                <input
                                    autoFocus
                                    type="text"
                                    value={scopeTopic}
                                    onChange={(e) => setScopeTopic(e.target.value)}
                                    placeholder="e.g. MISSION_DATA_X"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/10 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all font-mono text-sm tracking-widest uppercase"
                                    required
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] pl-1">
                                    Contextual Matrix (RAG Input)
                                </label>
                                <textarea
                                    value={documents}
                                    onChange={(e) => setDocuments(e.target.value)}
                                    placeholder="Paste raw text or documentation..."
                                    className="w-full h-40 bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white/80 placeholder:text-white/10 focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all resize-none font-sans font-light leading-relaxed scrollbar-hide"
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-6 py-2.5 text-sm text-white/40 hover:text-white transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="group relative px-8 py-2.5 bg-white text-black font-bold rounded-xl overflow-hidden transition-all active:scale-95 disabled:opacity-50 hover:bg-white/90"
                                >
                                    <span className="relative flex items-center gap-2">
                                        {isSubmitting ? 'INITIALIZING...' : 'ENGAGE SCOPE'} <ArrowRight size={16} />
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}