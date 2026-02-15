"use client";

import { Sun, Cloud } from "lucide-react";

export function WelcomeBanner() {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-end border-b border-zinc-800 pb-6 gap-4">
            <div className="space-y-1">
                <div className="flex items-center gap-2 mb-2">
                    <Sun className="w-3.5 h-3.5 text-yellow-500/80" />
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em]">System_Online // Good Morning</span>
                </div>
                <h1 className="text-4xl font-bold text-white font-display tracking-tight uppercase">
                    Welcome <span className="text-zinc-600 px-1">/</span> <span className="text-[#a3e635]">Kai</span>
                </h1>
                <p className="text-xs text-zinc-400 font-mono border-l-2 border-[#a3e635] pl-3 mt-2 max-w-md leading-relaxed">
                    Overview of your creative ecosystem. <span className="text-zinc-600">Sync status: Stable.</span>
                </p>
            </div>

            <div className="flex flex-col items-end gap-2">
                <div className="flex items-center bg-zinc-950/50 border border-zinc-800 px-3 py-1.5 rounded-sm">
                    <span className="text-xl font-bold text-white font-mono tracking-widest">Feb 15, 2026</span>
                </div>
                <div className="text-[10px] text-zinc-500 font-mono uppercase flex items-center justify-end gap-2">
                    <Cloud className="w-3 h-3 text-zinc-600" />
                    <span>San Francisco, CA</span>
                    <span className="text-[#a3e635]">•</span>
                    <span>14°C</span>
                </div>
            </div>
        </div>
    );
}
