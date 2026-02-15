"use client";

import { DollarSign, Briefcase, Clock, MessageSquare, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

const STATS = [
    { label: "Total Earnings", value: "$4,250", sub: "This Month", icon: DollarSign, color: "text-[#a3e635]" },
    { label: "Active Gigs", value: "3", sub: "In Progress", icon: Briefcase, color: "text-blue-500" },
    { label: "Pending", value: "$1,200", sub: "To be paid", icon: Clock, color: "text-yellow-500" },
    { label: "Unread", value: "5", sub: "Messages", icon: MessageSquare, color: "text-purple-500" },
];

export function QuickStatsRow() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((stat) => (
                <div key={stat.label} className="tech-border p-4 transition-all duration-300 hover:bg-zinc-900/80 group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                    <div className="flex items-start justify-between mb-4 relative z-10">
                        <div className={cn("p-2 bg-zinc-950 border border-zinc-800 text-zinc-400 group-hover:text-white group-hover:border-zinc-600 transition-colors", stat.color.replace('text-', 'text-'))}>
                            <stat.icon className="w-4 h-4" />
                        </div>
                        <div className="flex gap-0.5 opacity-20 group-hover:opacity-100 transition-opacity">
                            <div className="w-1 h-1 bg-white rounded-full" />
                            <div className="w-1 h-1 bg-white rounded-full" />
                        </div>
                    </div>

                    <div className="relative z-10">
                        <div className="text-2xl font-bold text-white font-mono mb-1 tracking-tighter">{stat.value}</div>
                        <div className="flex items-center justify-between border-t border-zinc-800/50 pt-2 mt-2">
                            <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">{stat.label}</div>
                            <div className="text-[9px] text-zinc-600 font-mono">{stat.sub}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
