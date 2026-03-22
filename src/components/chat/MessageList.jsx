import { motion } from 'framer-motion';
import { Bot, User, Terminal } from 'lucide-react';
import { useEffect, useState } from 'react';

// Typewriter Effect for AI
const Typewriter = ({ text }) => {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setDisplayedText(text.substring(0, i));
            i++;
            if (i > text.length) clearInterval(interval);
        }, 15); // Speed of typing
        return () => clearInterval(interval);
    }, [text]);

    return <span>{displayedText}</span>;
};

export default function MessageList({ messages, isLoading }) {
    return (
        <>
            {messages.map((msg, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                    {/* Avatar Icon */}
                    <div className={`
            w-10 h-10 rounded flex items-center justify-center shrink-0 border
            ${msg.role === 'user' ? 'bg-white/10 border-white/20' :
                            msg.role === 'system' ? 'bg-red-900/20 border-red-500/30' :
                                'bg-cyan-900/20 border-cyan-500/30'}
          `}>
                        {msg.role === 'user' ? <User size={18} className="text-white" /> :
                            msg.role === 'system' ? <Terminal size={18} className="text-red-400" /> :
                                <Bot size={18} className="text-cyan-400" />}
                    </div>

                    {/* Message Content */}
                    <div className={`
            relative p-4 md:p-6 rounded-lg max-w-[80%] font-mono text-sm md:text-base leading-relaxed
            ${msg.role === 'user'
                            ? 'bg-white text-black font-sans font-medium'
                            : 'bg-black/50 border border-white/10 text-cyan-50 backdrop-blur-md shadow-[0_0_15px_rgba(0,255,255,0.05)]'}
          `}>
                        {/* Decorative Corner for AI */}
                        {msg.role === 'model' && (
                            <>
                                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500/50" />
                                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500/50" />
                            </>
                        )}

                        {/* Render Text */}
                        {msg.role === 'model' ? (
                            <Typewriter text={msg.content} />
                        ) : (
                            msg.content
                        )}
                    </div>
                </motion.div>
            ))}

            {/* Loading State (Thinking) */}
            {isLoading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-4"
                >
                    <div className="w-10 h-10 rounded flex items-center justify-center shrink-0 border border-cyan-500/30 bg-cyan-900/20">
                        <Bot size={18} className="text-cyan-400 animate-pulse" />
                    </div>
                    <div className="flex items-center gap-1 h-10 px-4 text-cyan-500 font-mono text-xs tracking-widest">
                        THROTTLING DATA STREAM
                        <span className="animate-bounce">.</span>
                        <span className="animate-bounce delay-100">.</span>
                        <span className="animate-bounce delay-200">.</span>
                    </div>
                </motion.div>
            )}
        </>
    );
}              