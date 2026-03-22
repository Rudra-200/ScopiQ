import { ArrowUp, Plus, Sparkles } from 'lucide-react';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function GeminiInput({ onSend, isLoading }) {
    const [input, setInput] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const textareaRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;
        onSend(input);
        setInput("");
        if (textareaRef.current) textareaRef.current.style.height = 'auto';
    };

    const handleInput = (e) => {
        setInput(e.target.value);
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto relative group z-50">

            <form
                onSubmit={handleSubmit}
                className={`relative flex flex-col bg-[#050505]/95 backdrop-blur-3xl rounded-[28px] border transition-all duration-700 ${isFocused ? 'border-white/30 shadow-[0_0_40px_rgba(255,255,255,0.03)]' : 'border-white/5 shadow-2xl'}`}
            >
                <div className="relative flex items-end p-2 pl-6">
                    <textarea
                        ref={textareaRef}
                        rows={1}
                        value={input}
                        onChange={handleInput}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Transmitting cognitive query..."
                        className="w-full bg-transparent text-white/90 text-[16px] placeholder:text-white/10 focus:outline-none resize-none py-4 max-h-40 overflow-y-auto leading-relaxed font-sans font-light tracking-tight"
                        style={{ minHeight: '56px' }}
                    />

                    {/* Action Icons */}
                    <div className="pb-3 pr-3 flex items-center gap-1.5">
                        <button type="button" className="p-3 text-white/20 hover:text-white hover:bg-white/5 rounded-full transition-all group">
                            <Plus size={18} className="group-hover:rotate-90 transition-transform duration-500" />
                        </button>

                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className={`p-3 rounded-full transition-all duration-700 ${input.trim() ? 'bg-white text-black shadow-2xl scale-100 hover:scale-[1.05]' : 'bg-white/5 text-white/10 scale-95'}`}
                        >
                            {isLoading ? (
                                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}>
                                    <Sparkles size={18} />
                                </motion.div>
                            ) : (
                                <ArrowUp size={18} strokeWidth={3} />
                            )}
                        </button>
                    </div>
                </div>
            </form>

            {/* Footer Text */}
            <div className="hidden sm:block text-center mt-6 text-[10px] uppercase tracking-[0.5em] text-white/10 font-black">
                SCOPIQ • COGNITIVE PROTOCOL LAYER
            </div>
        </div>
    );
}