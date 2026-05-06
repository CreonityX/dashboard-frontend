"use client";

import { useState } from "react";
import { GitCompare } from "lucide-react";
import { cn } from "@/lib/utils";
import { ANALYTICS_CAMPAIGNS } from "@/lib/brand-data";

const METRICS = ['Reach', 'Impressions', 'Engagements', 'Conversions', 'Spend', 'ROI'] as const;

export function ComparisonTab() {
    const [selected, setSelected] = useState<string[]>(['c1', 'c2']);

    const toggleCampaign = (id: string) => {
        setSelected(prev => {
            if (prev.includes(id)) {
                if (prev.length <= 2) return prev;
                return prev.filter(x => x !== id);
            }
            if (prev.length >= 10) return prev;
            return [...prev, id];
        });
    };

    const campaignData = ANALYTICS_CAMPAIGNS;
    const campaigns = campaignData;

    const getValue = (c: typeof campaignData[0], m: string) => {
        switch (m) {
            case 'Reach': return c.reach;
            case 'Impressions': return c.impressions;
            case 'Engagements': return c.engagements;
            case 'Conversions': return c.conversions.toLocaleString();
            case 'Spend': return `$${c.spend.toLocaleString()}`;
            case 'ROI': return `${c.roi}%`;
            default: return '-';
        }
    };

    const parseNum = (s: string): number => {
        const n = parseFloat(s.replace(/[MK]/g, ''));
        if (s.includes('M')) return n * 1000000;
        if (s.includes('K')) return n * 1000;
        return n;
    };
    const bestMetric = (m: string) => {
        if (m === 'Spend') {
            const idx = selected.reduce((best, id, i) => {
                const c = campaignData.find(x => x.id === id);
                const val = c?.spend ?? Infinity;
                const bestVal = campaignData.find(x => x.id === selected[best])?.spend ?? Infinity;
                return val < bestVal ? i : best;
            }, 0);
            return selected[idx];
        }
        const idx = selected.reduce((best, id, i) => {
            const c = campaignData.find(x => x.id === id);
            let val = 0;
            if (c) {
                if (m === 'ROI') val = c.roi;
                else if (m === 'Reach') val = parseNum(c.reach);
                else if (m === 'Impressions') val = parseNum(c.impressions);
                else if (m === 'Engagements') val = parseNum(c.engagements);
                else if (m === 'Conversions') val = c.conversions;
            }
            const bestC = campaignData.find(x => x.id === selected[best]);
            let bestVal = 0;
            if (bestC) {
                if (m === 'ROI') bestVal = bestC.roi;
                else if (m === 'Reach') bestVal = parseNum(bestC.reach);
                else if (m === 'Impressions') bestVal = parseNum(bestC.impressions);
                else if (m === 'Engagements') bestVal = parseNum(bestC.engagements);
                else if (m === 'Conversions') bestVal = bestC.conversions;
            }
            return val > bestVal ? i : best;
        }, 0);
        return selected[idx];
    };

    return (
        <div className="space-y-6">
            {/* Campaign Selector - 2 to 10 */}
            <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-sm">
                <h3 className="text-xs font-bold text-zinc-400 font-display tracking-widest uppercase mb-3 flex items-center gap-2">
                    <GitCompare className="w-4 h-4 text-[#a3e635]" /> Select_Campaigns_To_Compare (2-10)
                </h3>
                <div className="flex flex-wrap gap-2">
                    {campaigns.map(c => (
                        <label
                            key={c.id}
                            className={cn(
                                "flex items-center gap-2 px-3 py-2 rounded-sm border cursor-pointer transition-colors",
                                selected.includes(c.id)
                                    ? "bg-[#a3e635]/10 border-[#a3e635]/30 text-[#a3e635]"
                                    : "bg-zinc-950/50 border-zinc-800 text-zinc-500 hover:border-zinc-700"
                            )}
                        >
                            <input
                                type="checkbox"
                                checked={selected.includes(c.id)}
                                onChange={() => toggleCampaign(c.id)}
                                className="rounded border-zinc-600 text-[#a3e635] focus:ring-[#a3e635]/50"
                            />
                            <span className="text-xs font-mono">{c.name}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Side-by-Side Metrics */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-zinc-800 bg-zinc-900/60">
                    <h3 className="text-xs font-bold text-zinc-300 font-display tracking-widest uppercase">Side_By_Side_Metrics</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                        <thead>
                            <tr className="border-b border-zinc-800">
                                <th className="px-4 py-3 text-left text-[10px] font-mono text-zinc-500 uppercase">Metric</th>
                                {selected.map(id => {
                                    const c = campaigns.find(x => x.id === id);
                                    return <th key={id} className="px-4 py-3 text-center text-[10px] font-mono text-zinc-400">{c?.name}</th>;
                                })}
                                <th className="px-4 py-3 text-center text-[10px] font-mono text-zinc-500 uppercase w-24">Best</th>
                            </tr>
                        </thead>
                        <tbody>
                            {METRICS.map(m => {
                                const cd = campaignData;
                                const best = bestMetric(m);
                                return (
                                    <tr key={m} className="border-b border-zinc-800/50 hover:bg-zinc-800/20">
                                        <td className="px-4 py-3 text-xs font-mono text-zinc-500">{m}</td>
                                        {selected.map(id => {
                                            const c = cd.find(x => x.id === id);
                                            const val = c ? getValue(c, m) : '-';
                                            const isBest = best === id;
                                            return (
                                                <td key={id} className={cn(
                                                    "px-4 py-3 text-center text-xs font-mono",
                                                    isBest ? "text-[#a3e635] font-bold" : "text-zinc-300"
                                                )}>
                                                    {val}
                                                    {isBest && <span className="ml-1 text-[#a3e635]">★</span>}
                                                </td>
                                            );
                                        })}
                                        <td className="px-4 py-3 text-center text-[9px] font-mono text-zinc-600">
                                            {best ? campaigns.find(c => c.id === best)?.name : '-'}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Learnings */}
            <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-sm">
                <h3 className="text-xs font-bold text-zinc-400 font-display tracking-widest uppercase mb-3">Learnings_And_Insights</h3>
                <ul className="space-y-2 text-[11px] text-zinc-400 font-mono">
                    <li className="flex items-start gap-2">
                        <span className="text-[#a3e635]">→</span>
                        S26 Launch Campaign drove highest ROI (450%)—strong creator-creative fit.
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-[#a3e635]">→</span>
                        Spring Ad Set had lower reach but higher engagement rate—consider scaling similar formats.
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-[#a3e635]">→</span>
                        Video-first creators (Tech_Nomad, Sarah_Vfx) outperformed static content by 2.1x.
                    </li>
                </ul>
            </div>
        </div>
    );
}
