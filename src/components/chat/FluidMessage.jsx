import { motion } from 'framer-motion';
import { User, Sparkles, Copy, ThumbsUp, Compass } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const StreamText = ({ text }) => (
    <div className="prose prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-[#050505] prose-pre:border prose-pre:border-white/5 prose-code:text-cyan-400 prose-headings:text-white prose-strong:text-white/80">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {text}
        </ReactMarkdown>
    </div>
);

export default function FluidMessage({ role, content }) {
    const isAI = role === 'model';

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`group flex gap-5 mb-10 ${!isAI ? 'flex-row-reverse' : ''}`}
        >
            {/* Avatar */}
            <div className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center border shadow-2xl transition-all duration-500 ${isAI
                    ? 'bg-gradient-to-tr from-[#1a1a1a] to-[#2a2a2a] border-white/20'
                    : 'bg-white text-black border-transparent'
                }`}>
                {isAI ? <Sparkles size={16} className="text-white/60" /> : <User size={16} />}
            </div>

            {/* Content */}
            <div className={`relative max-w-[90%] md:max-w-[80%] ${!isAI ? 'text-right' : 'text-left'}`}>

                {/* Name */}
                <div className={`text-[9px] uppercase tracking-[0.4em] font-black mb-2 opacity-30 font-montserrat ${!isAI ? 'mr-1' : 'ml-1'}`}>
                    {isAI ? 'Scopiq Cognitive Engine' : 'User Transmission'}
                </div>

                {/* Bubble / Text */}
                <div className={`text-[15px] md:text-[16px] leading-[1.6] font-normal tracking-wide transition-all duration-300 ${!isAI
                        ? 'bg-white text-black px-5 py-4 md:px-6 md:py-4 rounded-[22px] rounded-tr-[4px] inline-block shadow-2xl'
                        : 'text-white/90 font-light' // AI has NO bubble, just text
                    }`}>
                    <StreamText text={content} />
                </div>

                {/* Actions (Only AI) */}
                {isAI && (
                    <div className="flex items-center gap-3 mt-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="text-white/20 hover:text-white transition-colors"><Copy size={14} /></button>
                        <button className="text-white/20 hover:text-white transition-colors"><ThumbsUp size={14} /></button>
                    </div>
                )}
            </div>
        </motion.div>
    );
}