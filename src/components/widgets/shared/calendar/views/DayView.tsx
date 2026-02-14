"use client";

import { cn } from "@/lib/utils";
import { Video, Edit, Clock } from "lucide-react";

export function DayView() {
    return (
        <div className="flex flex-col h-full">
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-zinc-900/40">
                <div className="text-center">
                    <div className="text-sm font-bold text-purple-400 uppercase">Saturday</div>
                    <div className="text-4xl font-bold text-white font-display">14</div>
                </div>
                <div className="text-right">
                    <div className="text-xs text-zinc-500">Events Today</div>
                    <div className="text-2xl font-bold text-white">2</div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {/* 10 AM */}
                <div className="flex gap-4 group">
                    <div className="w-16 text-right text-xs font-mono text-zinc-500 pt-2">10:00 AM</div>
                    <div className="flex-1 p-4 bg-purple-500/10 border border-purple-500/20 rounded-sm hover:border-purple-500/40 transition-colors relative">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500 rounded-l-sm" />
                        <h4 className="font-bold text-white text-lg">YouTube Upload: "My Setup Tour 2026"</h4>
                        <div className="flex items-center gap-4 mt-2 text-xs text-purple-300">
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 30 min</span>
                            <span className="flex items-center gap-1"><Edit className="w-3 h-3" /> Publishing</span>
                        </div>
                    </div>
                </div>

                {/* 12 PM - Empty */}
                <div className="flex gap-4 opacity-30">
                    <div className="w-16 text-right text-xs font-mono text-zinc-500 pt-2">12:00 PM</div>
                    <div className="flex-1 h-px bg-white/10 mt-4" />
                </div>

                {/* 6 PM */}
                <div className="flex gap-4 group">
                    <div className="w-16 text-right text-xs font-mono text-zinc-500 pt-2">6:00 PM</div>
                    <div className="flex-1 p-4 bg-purple-500/10 border border-purple-500/20 rounded-sm hover:border-purple-500/40 transition-colors relative">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500 rounded-l-sm" />
                        <h4 className="font-bold text-white text-lg">Live Stream Q&A</h4>
                        <div className="flex items-center gap-4 mt-2 text-xs text-purple-300">
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 2 hours</span>
                            <span className="flex items-center gap-1"><Video className="w-3 h-3" /> Streaming</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
