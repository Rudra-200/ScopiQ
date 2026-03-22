"use client";
import { motion } from "framer-motion";

export const WorldCore = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center z-0">
            {/* 1. Deep Space Fog */}
            <div className="absolute inset-0 bg-[#020205]">
                <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[80%] bg-violet-900/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-900/5 rounded-full blur-[150px]" />
            </div>

            {/* 2. The Grid Floor (Perspective) */}
            <div className="absolute bottom-0 w-[200vw] h-[40vh] bg-[linear-gradient(to_bottom,transparent_0%,rgba(60,20,255,0.03)_100%)] [mask-image:linear-gradient(to_bottom,transparent,black)] opacity-40"
                style={{ transform: 'perspective(1000px) rotateX(60deg) translateY(100px)' }}>
                <div className="w-full h-full bg-[size:50px_50px] bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)]" />
            </div>
        </div>
    );
};