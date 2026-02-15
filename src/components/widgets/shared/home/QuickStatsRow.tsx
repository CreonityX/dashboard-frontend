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
                <div key={stat.label} className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-sm hover:border-zinc-700 transition-colors group">
                    <div className="flex items-start justify-between mb-3">
                        <div className={cn("p-2 rounded-sm bg-zinc-950 border border-zinc-800", stat.color)}>
                            <stat.icon className="w-4 h-4" />
                        </div>
                        {/* Sparkline placeholder or trend arrow could go here */}
                    </div>
                    <div className="text-2xl font-bold text-white font-mono mb-1">{stat.value}</div>
                    <div className="flex items-center justify-between">
                        <div className="text-[10px] text-zinc-500 font-mono uppercase">{stat.label}</div>
                        <div className="text-[9px] text-zinc-600 font-mono">{stat.sub}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}
