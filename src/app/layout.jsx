import './globals.css';
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata = { title: 'Scopiq | Celestial Navigator' };

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="dark">
            <body className={`${inter.variable} ${mono.variable} antialiased bg-[#030304]`}>
                <div className="bg-noise" /> {/* The Film Grain */}

                {/* Simplified Nav - No Login */}
                <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center pointer-events-none">
                    <div className="text-xl font-bold tracking-tight text-white pointer-events-auto flex items-center gap-2">
                        <div className="w-2 h-2 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.8)] animate-pulse" />
                        SCOPIQ
                    </div>
                    {/* Login button removed as requested */}
                </nav>

                {children}
            </body>
        </html>
    );
}