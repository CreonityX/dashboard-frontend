"use client";

import { TrendingUp, ArrowUpRight } from "lucide-react";
import { DashboardWidgetShell } from "../DashboardWidgetShell";

export function EarningsOverviewCard() {
    return (
        <DashboardWidgetShell
            title="Revenue_Flow"
            icon={TrendingUp}
            className="h-full min-h-[280px]"
            headerAction={
                <button className="text-[10px] text-zinc-500 hover:text-white font-mono uppercase flex items-center gap-1 transition-colors">
                    Report <ArrowUpRight className="w-3 h-3" />
                </button>
            }
        >
            <div className="p-6 h-full flex flex-col justify-between relative">
                <div className="relative z-10">
                    <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-3xl font-bold text-white font-mono">$12,450.00</span>
                        <span className="text-xs text-[#a3e635] font-mono bg-[#a3e635]/10 px-1.5 py-0.5 rounded-sm">+24%</span>
                    </div>
                    <div className="text-[10px] text-zinc-500 font-mono uppercase mb-4">Total Earnings (This Year)</div>
                </div>

                {/* Bars Visualization */}
                <div className="flex items-end justify-between gap-1 h-32 relative z-10">
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
        </DashboardWidgetShell>
    );
}
