"use client";
import { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { AuroraBackground } from '@/components/ui/AuroraBackground';
import GeminiInput from '@/components/chat/GeminiInput';
import FluidMessage from '@/components/chat/FluidMessage';
import ThinkingIndicator from '@/components/chat/ThinkingIndicator';
import ScopeHUD from '@/components/chat/ScopeHUD';
import Sidebar from '@/components/chat/Sidebar';
import NewSessionModal from '@/components/chat/NewSessionModal';
import AnswerModeToggle from '@/components/chat/AnswerModeToggle';
import { Lightbulb, Code2, Compass, PenTool, Command, Target, Database, Cpu, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import NeuralGridParticles from '@/components/landing/NeuralGridParticles';

// --- Premium Frosted Suggestion Chip ---
const SuggestionChip = ({ icon: Icon, text, delay, onClick }) => (
    <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay, duration: 0.5 }}
        onClick={onClick}
        className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 hover:scale-[1.02] transition-all duration-300 w-full text-left backdrop-blur-sm group shadow-sm"
    >
        <div className="p-2.5 rounded-xl bg-white/5 text-white/50 group-hover:text-white group-hover:bg-blue-500/20 transition-colors">
            <Icon size={18} />
        </div>
        <span className="text-[13px] text-white/60 group-hover:text-white/90 font-medium leading-snug">
            {text}
        </span>
    </motion.button>
);

import ThrottleCard from '@/components/chat/ThrottleCard';
import NeuralSphere from '@/components/chat/NeuralSphere';

function ChatContent() {
    const searchParams = useSearchParams();

    // State Management
    const [activeScopeTopic, setActiveScopeTopic] = useState("UNDEFINED"); // Display Name
    const [scopeId, setScopeId] = useState(null); // Backend ID
    const [activeMode, setActiveMode] = useState('rag'); // 'rag' | 'gemini'

    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const bottomRef = useRef(null);

    // Auto-scroll to bottom
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    // --- Actions ---

    // 1. Open New Session Modal
    const handleOpenNewSessionModal = () => setIsModalOpen(true);

    // 2. Confirm New Session (Reset State)
    const handleConfirmNewSession = ({ scopeId, topic, docCount }) => {
        setIsModalOpen(false);
        setMessages([]);
        setActiveScopeTopic(topic);
        setScopeId(scopeId);
        setIsLoading(true);

        // Simulate System Initialization Sequence
        setTimeout(() => {
            setIsLoading(false);
            setMessages([{
                role: 'model',
                content: `### SCOPE_INITIALIZED\n\n**Protocol:** ${activeMode.toUpperCase()}\n**Inclusion:** ${topic}\n\nSession ready for high-fidelity inquiry.`
            }]);
        }, 1200);
    };

    // 3. Throttle Initialization from Card
    const handleThrottleInit = (topic) => {
        setActiveScopeTopic(topic);
        setScopeId("session_" + Date.now());
        setIsLoading(true);
        setTimeout(() => {
            setMessages([{
                role: 'model',
                content: `### System Link Active\n\n**Context:** ${topic.toUpperCase()}\n**Mode:** ${activeMode === 'rag' ? 'Grounded Mode' : 'Cognitive Mode'}\n\nProtocol established. Recommending objective-driven inquiry.`
            }]);
            setIsLoading(false);
        }, 1500);
    };

    // 4. Load History (Simulation)
    const handleLoadHistory = (item) => {
        setMessages([]);
        setActiveScopeTopic(item.scope);
        setIsLoading(true);
        setTimeout(() => {
            setMessages([{
                role: 'model',
                content: `### Archive Recovery\n\n**Point:** ${item.title}\n**Subject:** ${item.scope}`
            }]);
            setIsLoading(false);
        }, 800);
    };

    // 5. Send Message (API Connection)
    const handleSendMessage = async (text) => {
        if (!text.trim()) return;

        // Add User Message Optimistically
        const userMsg = { role: 'user', content: text };
        setMessages(prev => [...prev, userMsg]);
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: text,
                    scope_id: scopeId || 'global context', 
                    topic: activeScopeTopic,
                    mode: activeMode, 
                    history: messages
                }),
            });

            const data = await response.json();
            if (data.error) throw new Error(data.error);
            setMessages(prev => [...prev, { role: 'model', content: data.response }]);
        } catch (error) {
            console.error("Chat Error:", error);
            setMessages(prev => [...prev, {
                role: 'model',
                content: `### Error Log\n\n${error.message || "Connection failure detected."}`
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative flex w-full h-[100dvh] bg-[#000000] overflow-hidden selection:bg-cyan-500/30">
            <AuroraBackground />
            <NewSessionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmNewSession}
            />

            <Sidebar
                onNewSession={handleOpenNewSessionModal}
                onLoadHistory={handleLoadHistory}
                isMobileOpen={isMobileOpen}
                setIsMobileOpen={setIsMobileOpen}
            />

            <main className="flex-1 relative flex flex-col h-full min-w-0 z-10">
                
                {/* Minimal Header HUD */}
                <div className="absolute top-0 left-0 right-0 z-30 pt-8 flex justify-center pointer-events-none">
                    <div className="pointer-events-auto transition-transform duration-500 hover:scale-[1.01]">
                        <ScopeHUD scope={activeScopeTopic} />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-6 scrollbar-hide pt-36 pb-48 relative">
                    <div className="max-w-3xl mx-auto min-h-full flex flex-col justify-end gap-12 relative">

                        <AnimatePresence mode="wait">
                            {messages.length === 0 && !isLoading && (
                                <motion.div
                                    key="empty-state"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.1 }}
                                    transition={{ duration: 1.5, ease: "circOut" }}
                                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                >
                                    <NeuralSphere />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Message Stream */}
                        {messages.map((msg, index) => (
                            <FluidMessage key={index} role={msg.role} content={msg.content} />
                        ))}

                        {/* Loading Indicator */}
                        {isLoading && <ThinkingIndicator />}

                        {/* Invisible Bottom Anchor */}
                        <div ref={bottomRef} />
                    </div>
                </div>

                {/* Dynamic Input Control Center */}
                <div className="absolute bottom-0 left-0 right-0 z-30 p-6 pt-24 bg-gradient-to-t from-[#000000] via-[#000000] to-transparent pointer-events-none">
                    <div className="pointer-events-auto max-w-3xl mx-auto flex flex-col items-center">
                        
                        {/* Protocol Suggestions Dock (Apple Style) */}
                        <AnimatePresence>
                            {messages.length === 0 && !isLoading && (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="flex flex-wrap justify-center gap-3 mb-8"
                                >
                                    {[
                                        { icon: Target, title: "Mission" },
                                        { icon: Database, title: "Synthesis" },
                                        { icon: Cpu, title: "Logic" },
                                        { icon: Search, title: "Investigation" }
                                    ].map((p, i) => (
                                        <button 
                                            key={i}
                                            onClick={() => handleThrottleInit(p.title)}
                                            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/5 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 group shadow-lg"
                                        >
                                            <p.icon size={11} className="text-cyan-400 group-hover:text-white transition-colors" />
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 group-hover:text-white font-montserrat">
                                                {p.title}
                                            </span>
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <AnswerModeToggle mode={activeMode} setMode={setActiveMode} />
                        <GeminiInput onSend={handleSendMessage} isLoading={isLoading} />
                    </div>
                </div>

            </main>
        </div>
    );
}

export default function ChatPage() {
    return (
        <Suspense fallback={<div className="w-full h-screen bg-black flex items-center justify-center text-white/50">Initializing Neural Core...</div>}>
            <ChatContent />
        </Suspense>
    );
}