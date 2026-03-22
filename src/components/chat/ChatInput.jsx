import { Send, CornerDownLeft } from 'lucide-react';
import { useState } from 'react';

export default function ChatInput({ onSend, isLoading }) {
    const [input, setInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;
        onSend(input);
        setInput("");
    };

    return (
        <form onSubmit={handleSubmit} className="relative group">
            {/* Visual Border Gradient */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg opacity-30 group-hover:opacity-100 transition duration-500 blur" />

            <div className="relative flex items-center bg-[#0a0a0c] rounded-lg border border-white/10 overflow-hidden">

                {/* Blinking Cursor / Prompt */}
                <div className="pl-4 pr-2 text-cyan-500 font-mono animate-pulse">{'>'}</div>

                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter query for scoped processing..."
                    className="w-full bg-transparent text-white p-4 focus:outline-none font-mono text-sm placeholder:text-gray-600"
                    disabled={isLoading}
                />

                <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="p-4 text-gray-400 hover:text-cyan-400 transition-colors disabled:opacity-50"
                >
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <div className="flex items-center gap-2">
                            <span className="hidden md:block text-[10px] font-mono border border-gray-700 px-1 rounded text-gray-500">RET</span>
                            <CornerDownLeft size={18} />
                        </div>
                    )}
                </button>
            </div>

            {/* Decorative Bottom Text */}
            <div className="absolute -bottom-6 right-0 text-[10px] text-gray-600 font-mono">
                SECURE CHANNEL // ENCRYPTED
            </div>
        </form>
    );
}