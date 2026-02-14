"use client";

import { Smile, Meh, Frown } from "lucide-react";

export function SentimentTracker() {
    return (
        <div className="flex flex-col h-full">
            <div className="p-6 pb-2">
                <h3 className="text-sm font-bold text-white font-display tracking-wide">BRAND_SENTIMENT</h3>
            </div>

            <div className="flex-1 flex flex-col justify-center px-6">
                {/* Main Gauge */}
                <div className="flex items-center justify-between mb-4">
                    <div className="text-center">
                        <div className="text-3xl font-display font-black text-[#a3e635]">84%</div>
                        <div className="text-[10px] font-mono text-zinc-500">POSITIVE</div>
                    </div>
                    <div className="h-12 w-px bg-white/10 mx-4" />
                    <div className="flex-1 space-y-2">
                        {/* Positive Bar */}
                        <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400">
                            <Smile className="w-3 h-3 text-[#a3e635]" />
                            <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                <div className="h-full bg-[#a3e635] w-[84%]" />
                            </div>
                            <span className="text-white w-6 text-right">84%</span>
                        </div>
                        {/* Neutral Bar */}
                        <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400">
                            <Meh className="w-3 h-3 text-zinc-500" />
                            <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                <div className="h-full bg-zinc-500 w-[12%]" />
                            </div>
                            <span className="text-white w-6 text-right">12%</span>
                        </div>
                        {/* Negative Bar */}
                        <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400">
                            <Frown className="w-3 h-3 text-red-500" />
                            <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                <div className="h-full bg-red-500 w-[4%]" />
                            </div>
                            <span className="text-white w-6 text-right">4%</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white/[0.02] border-t border-white/5 p-4 mx-6 mb-6 rounded-sm">
                <div className="text-[10px] font-mono text-zinc-500 mb-1">AI_SUMMARY</div>
                <p className="text-xs text-zinc-300 italic">"Recent campaign 'Neon Nights' drove a 15% spike in positive mentions across Twitter & Reddit."</p>
            </div>
        </div>
    );
}
