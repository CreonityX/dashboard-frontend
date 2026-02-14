"use client";

import { Search, Briefcase, DollarSign, Clock, CheckCircle2, ArrowUpRight } from "lucide-react";

export function GigFinder() {
    const gigs = [
        { id: 1, title: "Cyberpunk 2077 DLC Promo", brand: "CD PROJEKT RED", budget: "$5k - $8k", deadline: "Oct 15", match: 98, type: "Video" },
        { id: 2, title: "Neon Setup Showcase", brand: "Nanoleaf", budget: "$1.5k", deadline: "Oct 20", match: 85, type: "Photo" },
        { id: 3, title: "Mechanical Keyboards Review", brand: "Keychron", budget: "$800 + Product", deadline: "Oct 25", match: 72, type: "Video" },
        { id: 4, title: "Future Fashion Haul", brand: "Acronym", budget: "$3k", deadline: "Nov 01", match: 60, type: "Short" },
    ];

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 pb-2">
                <div className="flex gap-2">
                    <button className="text-[10px] font-bold font-mono text-black bg-[#a3e635] px-2 py-1 rounded-[2px]">FOR_YOU</button>
                    <button className="text-[10px] font-bold font-mono text-zinc-500 hover:text-white px-2 py-1 transition-colors">NEWEST</button>
                    <button className="text-[10px] font-bold font-mono text-zinc-500 hover:text-white px-2 py-1 transition-colors">HIGH_PAY</button>
                </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto px-6 pb-6 min-h-0 space-y-2">
                {gigs.map((gig) => (
                    <div key={gig.id} className="group flex items-center gap-4 p-3 bg-zinc-900/30 border border-zinc-800 rounded-sm hover:bg-zinc-900/60 transition-all hover:border-zinc-600 cursor-pointer">
                        {/* Match Score Indicator */}
                        <div className="flex flex-col items-center justify-center w-10 gap-0.5">
                            <div className={`text-xs font-bold font-mono ${gig.match > 90 ? 'text-[#a3e635]' : gig.match > 70 ? 'text-blue-400' : 'text-zinc-500'}`}>
                                {gig.match}%
                            </div>
                            <div className="text-[8px] text-zinc-600 font-mono">MATCH</div>
                        </div>

                        <div className="w-px h-8 bg-zinc-800" />

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-white font-display tracking-wide truncate group-hover:text-[#a3e635] transition-colors">{gig.title}</h4>
                            <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono mt-0.5">
                                <span className="text-zinc-300">{gig.brand}</span> • <span>{gig.type}</span> • <span>{gig.deadline}</span>
                            </div>
                        </div>

                        {/* Budget & Action */}
                        <div className="text-right flex flex-col items-end gap-1">
                            <div className="text-xs font-bold text-white font-mono bg-zinc-800 px-1.5 py-0.5 rounded-[2px]">{gig.budget}</div>
                            <button className="text-[9px] text-zinc-500 hover:text-white font-mono flex items-center gap-1 transition-colors opacity-0 group-hover:opacity-100">
                                VIEW <ArrowUpRight className="w-2 h-2" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
