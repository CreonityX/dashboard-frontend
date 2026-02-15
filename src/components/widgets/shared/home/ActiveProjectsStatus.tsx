"use client";

import { Zap, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { DashboardWidgetShell } from "../DashboardWidgetShell";

const ACTIVE_GIGS = [
    { id: 1, brand: "Nike", title: "Air Max Campaign", progress: 75, due: "2d", color: "bg-white" },
    { id: 2, brand: "Samsung", title: "S26 Review", progress: 40, due: "5d", color: "bg-blue-600" },
    { id: 3, brand: "Spotify", title: "Podcast Promo", progress: 15, due: "1w", color: "bg-[#1DB954]" },
];

export function ActiveProjectsStatus() {
    return (
        <DashboardWidgetShell
            title="Active_Gigs"
            icon={Zap}
            className="h-full"
            headerAction={
                <span className="text-[9px] text-blue-500 font-mono bg-blue-500/10 px-1.5 py-0.5 rounded-sm border border-blue-500/20">3 LIVE</span>
            }
        >
            <div className="p-6 flex flex-col h-full">
                <div className="space-y-6 flex-1">
                    {ACTIVE_GIGS.map((gig) => (
                        <div key={gig.id} className="group cursor-pointer">
                            <div className="flex justify-between items-end mb-2">
                                <div className="flex items-center gap-2">
                                    <div className={cn("w-2 h-2 rounded-full", gig.color)} />
                                    <div>
                                        <div className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">{gig.title}</div>
                                        <div className="text-[9px] text-zinc-500 font-mono uppercase">{gig.brand}</div>
                                    </div>
                                </div>
                                <div className="text-[10px] text-zinc-400 font-mono">Due in {gig.due}</div>
                            </div>
                            {/* Progress Bar */}
                            <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-zinc-500 group-hover:bg-blue-500 transition-colors rounded-full"
                                    style={{ width: `${gig.progress}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <button className="w-full mt-6 py-2 border border-zinc-800 hover:bg-zinc-800 rounded-sm text-[10px] text-zinc-400 hover:text-white font-mono uppercase transition-colors flex items-center justify-center gap-1">
                    View All Projects <ChevronRight className="w-3 h-3" />
                </button>
            </div>
        </DashboardWidgetShell>
    );
}
