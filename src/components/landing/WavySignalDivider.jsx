"use client";
import React, { useEffect, useState } from "react";

export default function WavySignalDivider() {
    const [path1, setPath1] = useState("");
    const [path2, setPath2] = useState("");
    const [path3, setPath3] = useState("");

    useEffect(() => {
        let time = 0;
        const interval = setInterval(() => {
            time += 0.04;

            const generatePath = (freq, amp, phase) => {
                let p = "M 0 20 ";
                for (let i = 0; i <= 100; i++) {
                    const x = i * 11;
                    const y = 20 + Math.sin(i * freq + time + phase) * amp + Math.cos(i * 0.1 - time * 0.3) * (amp / 2);
                    p += `L ${x} ${y} `;
                }
                return p;
            };

            setPath1(generatePath(0.15, 12, 0));
            setPath2(generatePath(0.1, 15, 2));
            setPath3(generatePath(0.2, 10, 4));
        }, 30);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-[100px] flex items-center justify-center pointer-events-none my-12 overflow-hidden">
            {/* Ambient Background Nebula */}
            <div className="absolute w-[600px] h-[50px] bg-cyan-500/5 rounded-full blur-[60px]" />

            <svg
                viewBox="0 0 1000 60"
                preserveAspectRatio="none"
                className="w-full h-full"
            >
                <path d={path1} fill="none" stroke="#22d3ee" strokeWidth="1.2" strokeOpacity="0.4" className="transition-all duration-300" />
                <path d={path2} fill="none" stroke="#a855f7" strokeWidth="1" strokeOpacity="0.3" className="transition-all duration-300" />
                <path d={path3} fill="none" stroke="#6366f1" strokeWidth="0.8" strokeOpacity="0.2" className="transition-all duration-300" />
            </svg>

            {/* Faint Center Line for Technicality */}
            <div className="absolute w-full h-px bg-white/5" />
        </div>
    );
}

