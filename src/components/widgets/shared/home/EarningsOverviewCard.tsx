"use client";

import { TrendingUp, ArrowUpRight } from "lucide-react";

export function EarningsOverviewCard() {
    return (
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-sm p-6 relative overflow-hidden h-full min-h-[250px] flex flex-col justify-between">
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-[#a3e635]" /> Revenue_Flow
                    </h3>
                    <button className="text-[10px] text-zinc-500 hover:text-white font-mono uppercase flex items-center gap-1 transition-colors">
                        Full Report <ArrowUpRight className="w-3 h-3" />
                    </button>
                </div>

                <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl font-bold text-white font-mono">$12,450.00</span>
                    <span className="text-xs text-[#a3e635] font-mono bg-[#a3e635]/10 px-1.5 py-0.5 rounded-sm">+24%</span>
                </div>
                <div className="text-[10px] text-zinc-500 font-mono uppercase mb-8">Total Earnings (This Year)</div>
            </div>

            {/* Bars Visualization */}
            <div className="flex items-end justify-between gap-1 h-24 relative z-10">
                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((h, i) => (
                    <div key={i} className="flex-1 bg-zinc-800 hover:bg-[#a3e635] transition-colors rounded-t-[1px] relative group" style={{ height: `${h}%` }}>
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-zinc-950 text-white text-[9px] px-1.5 py-0.5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-zinc-800 z-20 pointer-events-none">
                            ${h * 100}
                        </div>
                    </div>
                ))}
            </div>

            {/* Background Decoration */}
            <div className="absolute top-0 right-0 p-32 bg-[#a3e635] opacity-[0.03] blur-3xl rounded-full pointer-events-none" />
        </div>
    );
}
