"use client";

import { motion } from "framer-motion";
import { Sun, Cloud } from "lucide-react";
import Link from "next/link";

function getGreeting() {
    const h = new Date().getHours();
    if (h < 12) return "Good Morning";
    if (h < 17) return "Good Afternoon";
    return "Good Evening";
}

function formatDate(date: Date) {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function WelcomeBanner() {
    const now = new Date();
    return (
        <div className="flex flex-col sm:flex-row justify-between items-end border-b border-zinc-800 pb-6 gap-4">
            <div className="space-y-1">
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                    className="flex items-center gap-2 mb-2"
                >
                    <Sun className="w-3.5 h-3.5 text-yellow-500/80" />
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em]">System_Online // {getGreeting()}</span>
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.05, ease: [0.33, 1, 0.68, 1] }}
                    className="text-3xl sm:text-4xl font-bold text-white font-display tracking-tight uppercase"
                >
                    Welcome <span className="text-zinc-700 px-1">/</span> <span className="text-[#a3e635]">Creonity Inc.</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.12, ease: [0.33, 1, 0.68, 1] }}
                    className="text-sm text-zinc-400 border-l-2 border-[#a3e635] pl-3 mt-2 max-w-md leading-relaxed"
                >
                    Overview of your campaign ecosystem. <span className="text-zinc-600 font-mono text-xs">Sync: Optimal.</span>
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
                    className="flex flex-wrap gap-2 mt-4"
                >
                    <Link href="/campaigns?tab=list" className="px-5 py-2 bg-[#a3e635] text-black text-xs font-mono font-bold rounded-sm hover:bg-[#b5f045] transition-colors press-effect hover:shadow-[0_0_12px_rgba(163,230,53,0.3)]">
                        + Create campaign
                    </Link>
                </motion.div>
            </div>
            <motion.div
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.15, ease: [0.33, 1, 0.68, 1] }}
                className="flex flex-col items-end gap-2"
            >
                <div className="flex items-center bg-zinc-950/50 border border-zinc-800 px-4 py-2 rounded-sm">
                    <span className="text-lg font-bold text-white font-mono tracking-tight">{formatDate(now)}</span>
                </div>
                <div className="text-[10px] text-zinc-500 font-mono uppercase flex items-center justify-end gap-2">
                    <Cloud className="w-3 h-3 text-zinc-600" />
                    <span>San Francisco, CA</span>
                    <span className="text-zinc-700">|</span>
                    <span>14°C</span>
                </div>
            </motion.div>
        </div>
    );
}
