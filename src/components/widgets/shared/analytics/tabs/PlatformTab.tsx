"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ANALYTICS_PLATFORMS } from "@/lib/brand-data";

export function PlatformTab() {
    const [activePlatform, setActivePlatform] = useState<string | null>(null);
    const platforms = ANALYTICS_PLATFORMS;

    return (
        <div className="space-y-6">
            <h2 className="text-xs font-bold text-zinc-500 font-display tracking-widest uppercase">Performance_By_Platform</h2>

            {/* Platform Comparison - Which drives best ROI */}
            <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-sm">
                <h3 className="text-xs font-bold text-zinc-400 font-display tracking-widest uppercase mb-4">Which_Platforms_Drive_Best_ROI</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {platforms.sort((a, b) => b.roi - a.roi).map((p, i) => (
                        <div
                            key={p.id}
                            onClick={() => setActivePlatform(activePlatform === p.id ? null : p.id)}
                            className={cn(
                                "p-4 rounded-sm border cursor-pointer transition-colors",
                                activePlatform === p.id
                                    ? "bg-[#a3e635]/10 border-[#a3e635]/30"
                                    : "bg-zinc-950/50 border-zinc-800 hover:border-zinc-700"
                            )}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    {i === 0 && <span className="text-[9px] font-mono text-[#a3e635]">#1</span>}
                                    <span className="text-sm font-bold text-white">{p.name}</span>
                                </div>
                                <span className="text-lg font-bold text-[#a3e635]">{p.roi}%</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-zinc-500">
                                <div>Engagement: <span className="text-zinc-400">{p.engagement}%</span></div>
                                <div>Spend: <span className="text-zinc-400">${p.spend.toLocaleString()}</span></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Platform-specific Engagement Patterns */}
            <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-sm">
                <h3 className="text-xs font-bold text-zinc-400 font-display tracking-widest uppercase mb-4">Platform_Specific_Engagement_Patterns</h3>
                <div className="space-y-4">
                    <div className="p-3 bg-zinc-950/50 border border-zinc-800 rounded-sm">
                        <div className="text-xs font-bold text-white mb-1">YouTube</div>
                        <p className="text-[11px] text-zinc-500 font-mono">Long-form tutorials & reviews perform best. Avg. watch time: 4:32. Thumbnail CTR: 8.2%.</p>
                    </div>
                    <div className="p-3 bg-zinc-950/50 border border-zinc-800 rounded-sm">
                        <div className="text-xs font-bold text-white mb-1">Instagram</div>
                        <p className="text-[11px] text-zinc-500 font-mono">Reels outperform Stories 2.1x. Peak engagement 6-9 PM local. Carousels underperform.</p>
                    </div>
                    <div className="p-3 bg-zinc-950/50 border border-zinc-800 rounded-sm">
                        <div className="text-xs font-bold text-white mb-1">TikTok</div>
                        <p className="text-[11px] text-zinc-500 font-mono">First 3 seconds critical. Sound-on content 3x higher completion. Duet/stitch formats drive shares.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
