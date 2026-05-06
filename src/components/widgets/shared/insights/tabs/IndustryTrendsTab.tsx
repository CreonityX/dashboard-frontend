"use client";

import { DashboardWidgetShell } from "@/components/widgets/shared/DashboardWidgetShell";
import { INSIGHTS_INDUSTRY } from "@/lib/brand-data";
import { TrendingUp, Zap, Layout, Newspaper } from "lucide-react";

export function IndustryTrendsTab() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-lg font-bold text-white uppercase tracking-wider font-display mb-1">Industry Trends</h1>
                <p className="text-xs text-zinc-500">What&apos;s trending in your industry, viral content analysis, emerging platforms, creator economy news.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DashboardWidgetShell
                    title="Trending Now"
                    subtitle="Creonity Research · Q1 2026"
                    icon={TrendingUp}
                >
                    <div className="p-4 space-y-4">
                        {INSIGHTS_INDUSTRY.map((item) => (
                            <div key={item.id} className="border-b border-zinc-800/80 last:border-0 pb-4 last:pb-0 first:pt-0">
                                <div className="flex items-start gap-3">
                                    <span className={`
                                        shrink-0 text-[10px] font-mono font-bold px-2 py-0.5 rounded
                                        ${item.trend === 'up' ? 'bg-[#a3e635]/20 text-[#a3e635]' : 'bg-zinc-700/50 text-zinc-400'}
                                    `}>
                                        {item.trend.toUpperCase()}
                                    </span>
                                    <div>
                                        <h4 className="text-xs font-bold text-white uppercase tracking-tight">{item.title}</h4>
                                        <p className="text-[11px] text-zinc-400 mt-1">{item.summary}</p>
                                        <p className="text-[10px] text-zinc-600 font-mono mt-2">{item.source}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </DashboardWidgetShell>

                <DashboardWidgetShell
                    title="Quick Insights"
                    subtitle="Key themes for creators"
                    icon={Zap}
                >
                    <div className="p-4 space-y-4">
                        <div className="flex items-center gap-3 p-3 bg-zinc-900/50 border border-zinc-800 rounded-sm">
                            <Layout className="w-4 h-4 text-[#a3e635]" />
                            <span className="text-xs text-zinc-300">Short-form video drives 3x engagement in tech</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-zinc-900/50 border border-zinc-800 rounded-sm">
                            <Zap className="w-4 h-4 text-[#a3e635]" />
                            <span className="text-xs text-zinc-300">Authenticity outperforms polish 2:1</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-zinc-900/50 border border-zinc-800 rounded-sm">
                            <Newspaper className="w-4 h-4 text-[#a3e635]" />
                            <span className="text-xs text-zinc-300">Emerging: BeReal-style product moments</span>
                        </div>
                    </div>
                </DashboardWidgetShell>
            </div>
        </div>
    );
}
