"use client";

import { Star, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { DashboardWidgetShell } from "../DashboardWidgetShell";

const RECOMMENDED = [
    { id: 1, brand: "GoPro", title: "Action Cam Launch", match: 98, budget: "$2k - $4k", bg: "bg-blue-600" },
    { id: 2, brand: "Canon", title: "Creator Contest", match: 95, budget: "$5k Prize", bg: "bg-red-600" },
    { id: 3, brand: "Adobe", title: "Lightroom Tutorials", match: 92, budget: "$1.5k", bg: "bg-[#FF0000]" },
];

export function RecommendedGigsCarousel() {
    return (
        <DashboardWidgetShell
            title="Recommended_For_You"
            icon={Star}
            headerAction={
                <div className="flex gap-1">
                    <button className="w-5 h-5 flex items-center justify-center border border-zinc-800 rounded-sm text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors text-xs">
                        ←
                    </button>
                    <button className="w-5 h-5 flex items-center justify-center border border-zinc-800 rounded-sm text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors text-xs">
                        →
                    </button>
                </div>
            }
        >
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {RECOMMENDED.map((gig) => (
                    <div key={gig.id} className="bg-zinc-950 border border-zinc-800 p-4 rounded-sm hover:border-[#a3e635]/50 transition-colors group cursor-pointer relative overflow-hidden">
                        {/* Match Badge */}
                        <div className="absolute top-2 right-2 bg-zinc-900/90 backdrop-blur border border-zinc-800 px-1.5 py-0.5 rounded-sm text-[9px] font-mono text-[#a3e635]">
                            {gig.match}% Match
                        </div>

                        <div className="flex items-center gap-3 mb-3">
                            <div className={cn("w-8 h-8 rounded-sm text-white flex items-center justify-center text-xs font-bold", gig.bg)}>
                                {gig.brand[0]}
                            </div>
                            <div className="text-xs font-bold text-white">{gig.brand}</div>
                        </div>

                        <div className="text-xs text-zinc-400 font-medium mb-3 min-h-[32px]">{gig.title}</div>

                        <div className="flex items-center justify-between pt-3 border-t border-zinc-800/50">
                            <div className="text-[10px] text-zinc-500 font-mono">{gig.budget}</div>
                            <div className="w-5 h-5 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-500 group-hover:text-white group-hover:bg-zinc-800 transition-colors">
                                <ArrowRight className="w-3 h-3" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </DashboardWidgetShell>
    );
}
