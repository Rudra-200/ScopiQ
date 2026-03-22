"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ParticleField() {
  const containerRef = useRef(null);

  useEffect(() => {
    const innerCount = 1000;
    const outerCount = 400;
    const particles = [];
    const container = containerRef.current;

    const createShell = (count, radius, opacityBase, sizeBase) => {
        for (let i = 0; i < count; i++) {
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            const phi = Math.acos(-1 + (2 * i) / count);
            const theta = Math.sqrt(count * Math.PI) * phi;

            circle.setAttribute("fill", "white");
            
            const dot = {
                phi,
                theta,
                radius,
                opacityBase,
                sizeBase,
                el: circle,
                sparkle: Math.random() > 0.98 ? true : false // Occasional sparkles
            };
            
            particles.push(dot);
            container.appendChild(circle);
        }
    };

    createShell(innerCount, 300, 0.25, 0.7); // High density core
    createShell(outerCount, 400, 0.15, 0.5); // Floating outer atmosphere

    let mouseX = 0, mouseY = 0;
    let targetRotationX = 0, targetRotationY = 0;
    let currRotationX = 0, currRotationY = 0;

    const handleMouse = (e) => {
        mouseX = (e.clientX / window.innerWidth) - 0.5;
        mouseY = (e.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener("mousemove", handleMouse);

    const ticker = gsap.ticker.add((time) => {
        targetRotationY = mouseX * 2.5;
        targetRotationX = -mouseY * 2.5;
        
        currRotationX += (targetRotationX - currRotationX) * 0.04;
        currRotationY += (targetRotationY - currRotationY) * 0.04;

        particles.forEach((p, index) => {
            // Different shell rotation speeds
            const driftSpeed = p.radius > 350 ? 0.12 : 0.08;
            const rotX = currRotationX + (time * driftSpeed);
            const rotY = currRotationY + (time * driftSpeed * 1.5);

            let x = p.radius * Math.sin(p.phi) * Math.cos(p.theta);
            let y = p.radius * Math.sin(p.phi) * Math.sin(p.theta);
            let z = p.radius * Math.cos(p.phi);

            // Rotation Y
            let x1 = x * Math.cos(rotY) + z * Math.sin(rotY);
            let z1 = z * Math.cos(rotY) - x * Math.sin(rotY);
            
            // Rotation X
            let y2 = y * Math.cos(rotX) - z1 * Math.sin(rotX);
            let z2 = z1 * Math.cos(rotX) + y * Math.sin(rotX);

            const projectScale = (z2 + p.radius * 2) / (p.radius * 3);
            let opacity = (z2 + p.radius) / (p.radius * 2) * p.opacityBase;

            // Neural Sparkle (Pulse)
            if (p.sparkle && Math.sin(time * 5 + index) > 0.8) {
                opacity *= 4;
            }

            gsap.set(p.el, {
                attr: {
                    cx: 500 + x1 * projectScale,
                    cy: 500 + y2 * projectScale,
                    r: p.sizeBase * projectScale,
                    opacity: opacity
                }
            });
        });
    });

    return () => {
        gsap.ticker.remove(ticker);
        window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)]">
      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full opacity-100"
        ref={containerRef}
      >
        {/* Particles injected here */}
      </svg>
      
      {/* Subtle Ambient Glows (Antimatter Style) */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-cyan-500/5 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-500/5 rounded-full blur-[120px] animate-pulse delay-1000" />
    </div>
  );
}
