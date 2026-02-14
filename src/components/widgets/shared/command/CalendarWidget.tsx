"use client";

import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export function CalendarWidget() {
    const days = Array.from({ length: 35 }, (_, i) => {
        const day = i - 2; // Offset to start month correctly (simulated)
        return day > 0 && day <= 30 ? day : null;
    });

    const events = [
        { day: 5, type: 'deadline', label: 'LOGITECH_DRAFT' },
        { day: 12, type: 'meeting', label: 'SYNC: CDPR' },
        { day: 15, type: 'go-live', label: 'LIVE: TECH_HAVEN' },
        { day: 24, type: 'payment', label: 'PAYOUT_DAY' },
    ];

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 pb-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-sm bg-zinc-800 flex items-center justify-center border border-white/5 text-zinc-400">
                        <CalendarIcon className="w-4 h-4" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-white font-display tracking-wide">OCTOBER_2077</h3>
                        <p className="text-[10px] text-zinc-500 font-mono">Q4_FY77 · CYCLE_02</p>
                    </div>
                </div>
                <div className="flex gap-1">
                    <button className="p-1 hover:bg-white/10 rounded-sm text-zinc-500 hover:text-white transition-colors"><ChevronLeft className="w-4 h-4" /></button>
                    <button className="p-1 hover:bg-white/10 rounded-sm text-zinc-500 hover:text-white transition-colors"><ChevronRight className="w-4 h-4" /></button>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="flex-1 px-6 pb-6">
                <div className="grid grid-cols-7 gap-px bg-zinc-800/50 border border-zinc-800">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                        <div key={i} className="bg-zinc-950 p-2 text-center text-[10px] font-mono text-zinc-600 font-bold">{d}</div>
                    ))}
                    {days.map((d, i) => {
                        const event = events.find(e => e.day === d);
                        return (
                            <div key={i} className={cn(
                                "bg-zinc-950 min-h-[40px] p-1 relative group hover:bg-zinc-900 transition-colors",
                                !d && "bg-zinc-950/30"
                            )}>
                                {d && (
                                    <>
                                        <span className={cn(
                                            "text-[10px] font-mono block mb-1",
                                            d === 15 ? "text-[#a3e635] font-bold" : "text-zinc-500"
                                        )}>{d}</span>

                                        {event && (
                                            <div className={cn(
                                                "text-[8px] font-mono px-1 py-0.5 rounded-[1px] truncate w-full border-l-2",
                                                event.type === 'deadline' ? "bg-red-500/10 text-red-400 border-red-500" :
                                                    event.type === 'meeting' ? "bg-blue-500/10 text-blue-400 border-blue-500" :
                                                        event.type === 'go-live' ? "bg-[#a3e635]/10 text-[#a3e635] border-[#a3e635]" :
                                                            "bg-zinc-700/30 text-zinc-400 border-zinc-500"
                                            )}>
                                                {event.label}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Upcoming List (Compact) */}
            <div className="border-t border-white/5 p-4 bg-white/[0.02]">
                <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400">
                    <Clock className="w-3 h-3 text-[#a3e635] animate-pulse" />
                    <span>NEXT: <span className="text-white font-bold">SYNC: CDPR</span> IN 2 HOURS</span>
                </div>
            </div>
        </div>
    );
}
