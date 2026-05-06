"use client";

import { useState } from "react";
import { Briefcase, ArrowUpRight, Target, TrendingUp, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ANALYTICS_CAMPAIGNS } from "@/lib/brand-data";

const TREND_DATA = [
    { w: 'W1', v: 25 }, { w: 'W2', v: 40 }, { w: 'W3', v: 55 }, { w: 'W4', v: 70 },
];

export function CampaignsTab() {
    const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
    const campaignData = ANALYTICS_CAMPAIGNS;
    const campaigns = campaignData;
    const active = selectedCampaign
        ? campaignData.find(c => c.id === selectedCampaign)
        : null;
    const displayCampaigns = selectedCampaign ? campaignData.filter(c => c.id === selectedCampaign) : campaignData;

    return (
        <div className="space-y-6">
            {/* Campaign Selector */}
            <div className="flex flex-wrap items-center gap-3">
                <span className="text-zinc-500 text-xs font-mono uppercase">Campaign:</span>
                <select
                    value={selectedCampaign || ''}
                    onChange={(e) => setSelectedCampaign(e.target.value || null)}
                    className="bg-zinc-900/80 border border-zinc-800 rounded-sm px-4 py-2 text-xs text-white font-mono focus:border-[#a3e635] focus:outline-none"
                >
                    <option value="">View All Campaigns</option>
                    {campaigns.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
            </div>

            {/* Campaign-specific KPIs */}
            {active && (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {[
                        { label: 'Reach', value: active.reach, icon: Briefcase },
                        { label: 'Impressions', value: active.impressions, icon: Briefcase },
                        { label: 'Engagements', value: active.engagements, icon: TrendingUp },
                        { label: 'Conversions', value: active.conversions, icon: ArrowUpRight },
                        { label: 'Spend', value: `$${active.spend.toLocaleString()}`, icon: Briefcase },
                        { label: 'ROI', value: `${active.roi}%`, icon: TrendingUp, highlight: true },
                    ].map(m => (
                        <div key={m.label} className="bg-zinc-900/40 border border-zinc-800 p-3 rounded-sm">
                            <div className="text-[9px] text-zinc-500 font-mono uppercase mb-1">{m.label}</div>
                            <div className={cn("text-lg font-bold font-display", m.highlight && "text-[#a3e635]")}>{m.value}</div>
                        </div>
                    ))}
                </div>
            )}

            {/* Goal Tracking */}
            {active && (
                <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-sm">
                    <h3 className="text-xs font-bold text-zinc-400 font-display tracking-widest uppercase mb-4 flex items-center gap-2">
                        <Target className="w-4 h-4 text-[#a3e635]" /> Goal_Tracking
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <div className="flex justify-between text-[10px] font-mono mb-1">
                                <span className="text-zinc-500">Reach Target</span>
                                <span className="text-white">{active.reach} / {(active.goalReach / 1000000).toFixed(1)}M</span>
                            </div>
                            <div className="h-2 bg-zinc-800 rounded-sm overflow-hidden">
                                <div className="h-full bg-[#a3e635] rounded-sm" style={{ width: '105%' }} />
                            </div>
                            <div className="flex justify-between mt-1 text-[9px]">
                                <span className="text-[#a3e635] flex items-center gap-1"><CheckCircle className="w-2.5 h-2.5" /> Target Hit</span>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-[10px] font-mono mb-1">
                                <span className="text-zinc-500">Conversion Target</span>
                                <span className="text-white">{active.conversions} / {active.goalConversions}</span>
                            </div>
                            <div className="h-2 bg-zinc-800 rounded-sm overflow-hidden">
                                <div className="h-full bg-[#a3e635] rounded-sm" style={{ width: `${Math.min(100, (active.conversions / active.goalConversions) * 100)}%` }} />
                            </div>
                            <div className="flex justify-between mt-1 text-[9px]">
                                <span className="text-[#a3e635] flex items-center gap-1"><CheckCircle className="w-2.5 h-2.5" /> Target Hit</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Trend Chart */}
            <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-sm">
                <h3 className="text-xs font-bold text-zinc-400 font-display tracking-widest uppercase mb-4">Performance_Trend</h3>
                <div className="flex items-end gap-2 h-24">
                    {TREND_DATA.map((d, i) => (
                        <div key={d.w} className="flex-1 flex flex-col items-center gap-1">
                            <div className="w-full bg-zinc-800 rounded-t-sm overflow-hidden" style={{ height: 80 }}>
                                <div className="w-full bg-[#a3e635]/80 h-full" style={{ height: `${d.v}%` }} />
                            </div>
                            <span className="text-[9px] font-mono text-zinc-600">{d.w}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Campaign Table */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-zinc-800 bg-zinc-900/60 flex justify-between items-center">
                    <h3 className="text-xs font-bold text-zinc-300 font-display tracking-widest uppercase">Campaign_Performance</h3>
                    <button className="text-[10px] text-[#a3e635] hover:underline font-mono">EXPORT_CSV</button>
                </div>
                <div className="divide-y divide-zinc-800">
                    <div className="grid grid-cols-7 px-4 py-2 bg-zinc-950/30 text-[9px] font-mono text-zinc-500 uppercase tracking-wider">
                        <div className="col-span-2">Campaign</div>
                        <div className="text-center">Status</div>
                        <div className="text-center">Reach</div>
                        <div className="text-center">Engagement</div>
                        <div className="text-center">Conversions</div>
                        <div className="text-center">ROI</div>
                    </div>
                    {displayCampaigns.map(c => (
                        <div key={c.id} className="grid grid-cols-7 px-4 py-4 items-center hover:bg-zinc-800/30 transition-colors">
                            <div className="col-span-2">
                                <div className="text-xs font-bold text-white">{c.name}</div>
                            </div>
                            <div className="text-center">
                                <span className={cn(
                                    "text-[10px] font-bold font-mono px-2 py-0.5 rounded-sm border",
                                    c.status === 'Active' ? "bg-[#a3e635]/10 text-[#a3e635] border-[#a3e635]/20" : "bg-zinc-800 text-zinc-400 border-zinc-700"
                                )}>{c.status.toUpperCase()}</span>
                            </div>
                            <div className="text-center text-xs text-zinc-300 font-mono">{c.reach}</div>
                            <div className="text-center text-xs text-zinc-300 font-mono">{c.engagements}</div>
                            <div className="text-center text-xs text-zinc-300 font-mono">{c.conversions.toLocaleString()}</div>
                            <div className="text-center">
                                <span className="text-xs font-bold text-[#a3e635]">{c.roi}%</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Benchmark Comparison */}
            <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-sm">
                <h3 className="text-xs font-bold text-zinc-400 font-display tracking-widest uppercase mb-3">Vs_Industry_Benchmark</h3>
                <div className="flex gap-4 text-[10px] font-mono">
                    <span className="text-zinc-500">Your Avg ROI: <span className="text-[#a3e635] font-bold">385%</span></span>
                    <span className="text-zinc-500">Industry Avg: <span className="text-zinc-400">280%</span></span>
                    <span className="text-[#a3e635]">+37% above benchmark</span>
                </div>
            </div>
        </div>
    );
}
