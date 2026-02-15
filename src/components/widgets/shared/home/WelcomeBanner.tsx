"use client";

import { Sun, Cloud } from "lucide-react";

export function WelcomeBanner() {
    return (
        <div className="flex justify-between items-end border-b border-zinc-800 pb-6">
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <Sun className="w-4 h-4 text-yellow-500" />
                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Good Morning</span>
                </div>
                <h1 className="text-3xl font-bold text-white font-display tracking-tight">
                    Welcome back, <span className="text-[#a3e635]">Kai</span>
                </h1>
                <p className="text-sm text-zinc-400 mt-1">Here's what's happening in your creative world today.</p>
            </div>
            <div className="text-right hidden sm:block">
                <div className="text-2xl font-bold text-white font-mono">Feb 15, 2026</div>
                <div className="text-xs text-zinc-500 font-mono uppercase flex items-center justify-end gap-2">
                    <Cloud className="w-3 h-3" /> San Francisco, CA
                </div>
            </div>
        </div>
    );
}
