"use client";

import { DashboardWidgetShell } from "@/components/widgets/shared/DashboardWidgetShell";
import { INSIGHTS_MARKETPLACE } from "@/lib/brand-data";
import { BarChart3, DollarSign, Calendar, TrendingUp } from "lucide-react";

export function CreatorMarketplaceTab() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-lg font-bold text-white uppercase tracking-wider font-display mb-1">Creator Marketplace Trends</h1>
                <p className="text-xs text-zinc-500">Average rates by niche, creator availability by season, popular content types, platform growth trends.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DashboardWidgetShell
                    title="Average Rates by Niche"
                    subtitle="USD · Typical mid-tier creator"
                    icon={DollarSign}
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-zinc-800">
                                    <th className="py-3 px-4 text-[10px] font-mono uppercase text-zinc-500">Niche</th>
                                    <th className="py-3 px-4 text-[10px] font-mono uppercase text-zinc-500">Avg Rate</th>
                                    <th className="py-3 px-4 text-[10px] font-mono uppercase text-zinc-500">Availability</th>
                                    <th className="py-3 px-4 text-[10px] font-mono uppercase text-zinc-500">Growth</th>
                                </tr>
                            </thead>
                            <tbody>
                                {INSIGHTS_MARKETPLACE.map((row) => (
                                    <tr key={row.niche} className="border-b border-zinc-800/60 hover:bg-zinc-800/30">
                                        <td className="py-3 px-4 text-xs text-white">{row.niche}</td>
                                        <td className="py-3 px-4 text-xs font-mono text-[#a3e635]">${row.avgRate.toLocaleString()}</td>
                                        <td className="py-3 px-4 text-xs text-zinc-400">{row.availability}</td>
                                        <td className="py-3 px-4 text-xs font-mono text-[#a3e635]">{row.growth}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </DashboardWidgetShell>

                <DashboardWidgetShell
                    title="Platform & Content Trends"
                    subtitle="Creator availability · Popular formats"
                    icon={BarChart3}
                >
                    <div className="p-4 space-y-4">
                        <div className="flex items-center justify-between p-3 bg-zinc-900/50 border border-zinc-800 rounded-sm">
                            <span className="text-xs text-zinc-300">TikTok / Reels</span>
                            <span className="text-[10px] font-mono text-[#a3e635]">+18% availability</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-zinc-900/50 border border-zinc-800 rounded-sm">
                            <span className="text-xs text-zinc-300">YouTube Long-form</span>
                            <span className="text-[10px] font-mono text-zinc-400">Stable</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-zinc-900/50 border border-zinc-800 rounded-sm">
                            <span className="text-xs text-zinc-300">Unboxing / Reviews</span>
                            <span className="text-[10px] font-mono text-[#a3e635]">+12% demand</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-zinc-900/50 border border-zinc-800 rounded-sm">
                            <span className="text-xs text-zinc-300">BTS / Day-in-life</span>
                            <span className="text-[10px] font-mono text-[#a3e635]">Emerging</span>
                        </div>
                    </div>
                </DashboardWidgetShell>
            </div>

            <DashboardWidgetShell
                title="Seasonal Availability"
                subtitle="Best booking windows by quarter"
                icon={Calendar}
            >
                <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                        { q: 'Q1', months: 'Jan–Mar', tip: 'Post-holiday lull, good rates' },
                        { q: 'Q2', months: 'Apr–Jun', tip: 'Summer campaigns spike' },
                        { q: 'Q3', months: 'Jul–Sep', tip: 'Back to school, brand launches' },
                        { q: 'Q4', months: 'Oct–Dec', tip: 'Holiday peak, book early' },
                    ].map((item) => (
                        <div key={item.q} className="p-3 bg-zinc-900/50 border border-zinc-800 rounded-sm">
                            <span className="text-[10px] font-mono font-bold text-[#a3e635]">{item.q}</span>
                            <p className="text-[10px] font-mono text-zinc-500 mt-0.5">{item.months}</p>
                            <p className="text-[9px] text-zinc-600 mt-2">{item.tip}</p>
                        </div>
                    ))}
                </div>
            </DashboardWidgetShell>
        </div>
    );
}
