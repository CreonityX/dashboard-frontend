"use client";

import { Trophy, TrendingDown, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { ANALYTICS_CREATORS } from "@/lib/brand-data";

export function CreatorsTab() {
    const sorted = [...ANALYTICS_CREATORS].sort((a, b) => b.roi - a.roi);
    const topCreators = sorted.slice(0, 3);
    const underperformers = sorted.slice(-2).reverse();

    return (
        <div className="space-y-6">
            {/* Top Performing Creators */}
            <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-sm">
                <h3 className="text-xs font-bold text-zinc-400 font-display tracking-widest uppercase mb-4 flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-[#a3e635]" /> Top_Performing_Creators
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {topCreators.map((c, i) => (
                        <div key={c.id} className="p-4 bg-zinc-950/50 border border-zinc-800 rounded-sm hover:border-[#a3e635]/30 transition-colors">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-sm bg-[#a3e635]/10 border border-[#a3e635]/20 flex items-center justify-center text-[#a3e635] font-bold font-mono text-sm">
                                    #{i + 1}
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-white">{c.name}</div>
                                    <div className="text-[10px] text-zinc-500 font-mono">ROI: {c.roi}%</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                                <div><span className="text-zinc-600">Reach</span><br /><span className="text-zinc-300">{c.reach}</span></div>
                                <div><span className="text-zinc-600">Engage</span><br /><span className="text-zinc-300">{c.engagement}%</span></div>
                                <div><span className="text-zinc-600">Conv</span><br /><span className="text-zinc-300">{c.conversions}</span></div>
                                <div><span className="text-zinc-600">Spend</span><br /><span className="text-[#a3e635]">${c.spend.toLocaleString()}</span></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Underperforming Creators */}
            <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-sm">
                <h3 className="text-xs font-bold text-zinc-400 font-display tracking-widest uppercase mb-4 flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-amber-500" /> Needs_Attention
                </h3>
                <div className="space-y-2">
                    {underperformers.map(c => (
                        <div key={c.id} className="flex items-center justify-between p-3 bg-zinc-950/50 border border-zinc-800 rounded-sm hover:border-amber-500/30 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-sm bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                                    <TrendingDown className="w-3.5 h-3.5 text-amber-500" />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-white">{c.name}</div>
                                    <div className="text-[10px] text-zinc-500">ROI {c.roi}% • Consider optimization</div>
                                </div>
                            </div>
                            <div className="flex gap-4 text-[10px] font-mono text-zinc-400">
                                <span>Reach: {c.reach}</span>
                                <span>Eng: {c.engagement}%</span>
                                <span className="text-amber-500">ROI: {c.roi}%</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Creator ROI Ranking */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-zinc-800 bg-zinc-900/60">
                    <h3 className="text-xs font-bold text-zinc-300 font-display tracking-widest uppercase flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#a3e635]" /> Creator_ROI_Ranking
                    </h3>
                </div>
                <div className="divide-y divide-zinc-800">
                    <div className="grid grid-cols-6 px-4 py-2 bg-zinc-950/30 text-[9px] font-mono text-zinc-500 uppercase tracking-wider">
                        <div className="col-span-2">Creator</div>
                        <div className="text-center">Reach</div>
                        <div className="text-center">Engagement</div>
                        <div className="text-center">Conversions</div>
                        <div className="text-center">ROI</div>
                    </div>
                    {sorted.map((c, i) => (
                        <div key={c.id} className="grid grid-cols-6 px-4 py-3 items-center hover:bg-zinc-800/30 transition-colors">
                            <div className="col-span-2 flex items-center gap-2">
                                <span className="text-[10px] font-mono text-zinc-600 w-5">#{i + 1}</span>
                                <span className="text-xs font-bold text-white">{c.name}</span>
                            </div>
                            <div className="text-center text-xs text-zinc-300 font-mono">{c.reach}</div>
                            <div className="text-center text-xs text-zinc-300 font-mono">{c.engagement}%</div>
                            <div className="text-center text-xs text-zinc-300 font-mono">{c.conversions}</div>
                            <div className="text-center">
                                <span className={cn(
                                    "text-xs font-bold font-mono",
                                    c.roi >= 400 ? "text-[#a3e635]" : c.roi >= 300 ? "text-zinc-300" : "text-amber-500"
                                )}>{c.roi}%</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
