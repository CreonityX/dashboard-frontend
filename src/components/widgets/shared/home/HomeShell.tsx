"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Bell, Calendar, TrendingUp, CheckCircle2 } from "lucide-react";

interface HomeShellProps {
    children?: ReactNode;
}

export function HomeShell({ children }: HomeShellProps) {
    return (
        <div className="flex flex-col lg:flex-row h-full w-full overflow-hidden relative">
            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto custom-scrollbar relative backdrop-blur-md flex flex-col">
                {/* Content Background (Noise) */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-0" />

                <div className="flex-1 p-4 lg:p-6 space-y-6 relative z-10 max-w-6xl mx-auto w-full">
                    {children}
                </div>
            </main>

            {/* Right Sidebar Widgets */}
            <aside className="w-full lg:w-80 flex-shrink-0 bg-zinc-900/60 border-l border-zinc-800 overflow-y-auto p-6 space-y-6 hidden xl:block">
                {/* Mini Calendar Widget */}
                <div className="bg-zinc-950/50 border border-zinc-800 rounded-sm p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xs font-bold text-white font-display uppercase tracking-wider flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-[#a3e635]" /> Schedule
                        </h3>
                        <span className="text-[10px] text-zinc-500 font-mono">FEB 2026</span>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center mb-2">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                            <div key={d} className="text-[10px] text-zinc-600 font-mono">{d}</div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center">
                        {Array.from({ length: 28 }).map((_, i) => (
                            <div key={i} className={cn(
                                "text-xs p-1.5 rounded-sm hover:bg-zinc-800 cursor-pointer font-mono",
                                i === 14 ? "bg-[#a3e635] text-black font-bold" : "text-zinc-400",
                                [5, 12, 18, 25].includes(i) && i !== 14 ? "relative after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-[#a3e635] after:rounded-full" : ""
                            )}>
                                {i + 1}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Earnings */}
                <div className="bg-zinc-950/50 border border-zinc-800 rounded-sm p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xs font-bold text-white font-display uppercase tracking-wider flex items-center gap-2">
                            <TrendingUp className="w-3.5 h-3.5 text-[#a3e635]" /> Earnings
                        </h3>
                    </div>
                    <div className="text-2xl font-bold text-white font-mono mb-1">$12,450.00</div>
                    <div className="text-[10px] text-zinc-500 font-mono flex items-center gap-1.5">
                        <span className="text-[#a3e635]">+15%</span> vs last month
                    </div>
                </div>

                {/* Profile Meter */}
                <div className="bg-zinc-950/50 border border-zinc-800 rounded-sm p-4">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xs font-bold text-white font-display uppercase tracking-wider flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#a3e635]" /> Profile
                        </h3>
                        <span className="text-[10px] text-[#a3e635] font-mono">85%</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden mb-2">
                        <div className="h-full bg-[#a3e635] w-[85%]" />
                    </div>
                    <p className="text-[10px] text-zinc-500 font-mono">Complete your bio to reach 100%</p>
                </div>
            </aside>
        </div>
    );
}
