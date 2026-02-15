"use client";

import { Activity, CheckCircle2, MessageSquare, Briefcase, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const ACTIVITIES = [
    { id: 1, type: "payment", text: "Received payment from Samsung", time: "2h ago", icon: CheckCircle2, color: "text-[#a3e635]" },
    { id: 2, type: "message", text: "New message from Adidas", time: "4h ago", icon: MessageSquare, color: "text-blue-500" },
    { id: 3, type: "gig", text: "Applied to Sephora Campaign", time: "Yesterday", icon: Briefcase, color: "text-purple-500" },
    { id: 4, type: "file", text: "Uploaded draft for Nike", time: "Yesterday", icon: FileText, color: "text-zinc-400" },
];

export function RecentActivityFeed() {
    return (
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-sm p-6 h-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider flex items-center gap-2">
                    <Activity className="w-4 h-4 text-purple-500" /> Recent_Activity
                </h3>
            </div>

            <div className="space-y-6 relative">
                {/* Vertical Line */}
                <div className="absolute left-[19px] top-2 bottom-2 w-[1px] bg-zinc-800" />

                {ACTIVITIES.map((act) => (
                    <div key={act.id} className="flex gap-4 relative">
                        <div className={cn("w-10 h-10 rounded-sm border border-zinc-800 bg-zinc-950 flex items-center justify-center z-10 shrink-0", act.color)}>
                            <act.icon className="w-4 h-4" />
                        </div>
                        <div className="pt-1">
                            <div className="text-xs text-zinc-300 font-medium leading-tight mb-1">{act.text}</div>
                            <div className="text-[10px] text-zinc-500 font-mono uppercase">{act.time}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
