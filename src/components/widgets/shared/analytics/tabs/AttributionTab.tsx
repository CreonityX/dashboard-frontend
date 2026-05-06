"use client";

import { useState } from "react";
import { DollarSign, Link2, Tag, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

const ATTRIBUTION_MODELS = [
    { id: 'last-click', label: 'Last Click' },
    { id: 'first-click', label: 'First Click' },
    { id: 'multi-touch', label: 'Multi-Touch (Linear)' },
];

const UTM_PERFORMANCE = [
    { source: 'instagram_story', clicks: 12450, conversions: 342 },
    { source: 'youtube_desc', clicks: 8900, conversions: 280 },
    { source: 'tiktok_bio', clicks: 15200, conversions: 410 },
];

const PROMO_DATA = [
    { code: 'TECH20', usage: 892, revenue: 12450 },
    { code: 'LAUNCH15', usage: 456, revenue: 6820 },
];

export function AttributionTab() {
    const [model, setModel] = useState('multi-touch');

    return (
        <div className="space-y-6">
            {/* Attribution Model Selector */}
            <div className="flex flex-wrap items-center gap-3">
                <span className="text-zinc-500 text-xs font-mono uppercase">Attribution Model:</span>
                <div className="flex bg-zinc-900/80 p-1 rounded-sm border border-zinc-800">
                    {ATTRIBUTION_MODELS.map(m => (
                        <button
                            key={m.id}
                            onClick={() => setModel(m.id)}
                            className={cn(
                                "px-4 py-2 rounded-sm text-[10px] font-mono uppercase transition-all",
                                model === m.id ? "bg-[#a3e635]/10 text-[#a3e635] border border-[#a3e635]/20" : "text-zinc-500 hover:text-zinc-300"
                            )}
                        >
                            {m.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Revenue Attribution */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-4 h-4 text-[#a3e635]" />
                        <span className="text-[10px] text-zinc-500 font-mono uppercase">Revenue Attributed</span>
                    </div>
                    <div className="text-2xl font-bold text-white font-display">$186,420</div>
                    <div className="text-[10px] text-zinc-500 font-mono mt-1">From influencer campaigns (30d)</div>
                </div>
                <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <BarChart3 className="w-4 h-4 text-purple-500" />
                        <span className="text-[10px] text-zinc-500 font-mono uppercase">Conversion Value</span>
                    </div>
                    <div className="text-2xl font-bold text-white font-display">$79.65</div>
                    <div className="text-[10px] text-zinc-500 font-mono mt-1">Avg. order value (attributed)</div>
                </div>
                <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <Link2 className="w-4 h-4 text-blue-500" />
                        <span className="text-[10px] text-zinc-500 font-mono uppercase">Attribution Rate</span>
                    </div>
                    <div className="text-2xl font-bold text-white font-display">23.4%</div>
                    <div className="text-[10px] text-zinc-500 font-mono mt-1">Of total conversions</div>
                </div>
            </div>

            {/* UTM Parameter Performance */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-zinc-800 bg-zinc-900/60 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#a3e635]" />
                    <h3 className="text-xs font-bold text-zinc-300 font-display tracking-widest uppercase">UTM_Parameter_Performance</h3>
                </div>
                <div className="divide-y divide-zinc-800">
                    <div className="grid grid-cols-3 px-4 py-2 bg-zinc-950/30 text-[9px] font-mono text-zinc-500 uppercase">
                        <div>Source / Medium</div>
                        <div className="text-center">Clicks</div>
                        <div className="text-center">Conversions</div>
                    </div>
                    {UTM_PERFORMANCE.map(row => (
                        <div key={row.source} className="grid grid-cols-3 px-4 py-3 hover:bg-zinc-800/30">
                            <div className="text-xs font-mono text-zinc-300">{row.source}</div>
                            <div className="text-center text-xs font-mono text-zinc-400">{row.clicks.toLocaleString()}</div>
                            <div className="text-center text-xs font-bold text-[#a3e635]">{row.conversions}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Promo Code Usage */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-zinc-800 bg-zinc-900/60">
                    <h3 className="text-xs font-bold text-zinc-300 font-display tracking-widest uppercase">Promo_Code_Usage</h3>
                </div>
                <div className="divide-y divide-zinc-800 p-4">
                    {PROMO_DATA.map(row => (
                        <div key={row.code} className="flex justify-between items-center py-2">
                            <span className="text-xs font-mono text-zinc-300">{row.code}</span>
                            <div className="flex gap-6 text-[10px] font-mono">
                                <span className="text-zinc-500">Used: {row.usage}x</span>
                                <span className="text-[#a3e635]">Revenue: ${row.revenue.toLocaleString()}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Affiliate Link Clicks */}
            <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-sm">
                <h3 className="text-xs font-bold text-zinc-400 font-display tracking-widest uppercase mb-3">Affiliate_Link_Performance</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                        <div className="text-[10px] text-zinc-600 font-mono uppercase">Total Clicks</div>
                        <div className="text-lg font-bold text-white">36,550</div>
                    </div>
                    <div>
                        <div className="text-[10px] text-zinc-600 font-mono uppercase">Converted</div>
                        <div className="text-lg font-bold text-[#a3e635]">1,032</div>
                    </div>
                    <div>
                        <div className="text-[10px] text-zinc-600 font-mono uppercase">Click-to-Conv</div>
                        <div className="text-lg font-bold text-white">2.8%</div>
                    </div>
                    <div>
                        <div className="text-[10px] text-zinc-600 font-mono uppercase">Top Creator</div>
                        <div className="text-sm font-mono text-zinc-400">Tech_Nomad</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
