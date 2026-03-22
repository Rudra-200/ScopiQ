"use client";
import React, { useEffect, useRef } from "react";

export default function NeuralGridParticles() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let animationFrameId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", resize);
        resize();

        const particles = [];
        const numParticles = 150;

        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.6,
                vy: (Math.random() - 0.5) * 0.6,
                size: Math.random() * 2 + 1,
                length: Math.random() * 100 + 40,
                color: Math.random() > 0.5 ? "#22d3ee" : "#a855f7" // Cyan or Purple
            });
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                // Draw technical data line
                ctx.strokeStyle = p.color;
                ctx.globalAlpha = 0.20;
                ctx.lineWidth = 0.1;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                if (Math.abs(p.vx) > Math.abs(p.vy)) {
                    ctx.lineTo(p.x + p.length, p.y);
                } else {
                    ctx.lineTo(p.x, p.y + p.length);
                }
                ctx.stroke();

                // Draw glowing head particle
                ctx.globalAlpha = 0.5; // High visibility head
                ctx.shadowBlur = 4;
                ctx.shadowColor = p.color;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-80" />;
}

