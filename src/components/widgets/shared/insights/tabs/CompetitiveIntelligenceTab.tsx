"use client";

import { DashboardWidgetShell } from "@/components/widgets/shared/DashboardWidgetShell";
import { INSIGHTS_COMPETITIVE } from "@/lib/brand-data";
import { GitCompare, Target, Award } from "lucide-react";

export function CompetitiveIntelligenceTab() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-lg font-bold text-white uppercase tracking-wider font-display mb-1">Competitive Intelligence</h1>
                <p className="text-xs text-zinc-500">What brands in your category are doing, successful campaign examples, best practices.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DashboardWidgetShell
                    title="Campaign Examples"
                    subtitle="Tech / Electronics category"
                    icon={GitCompare}
                >
                    <div className="p-4 space-y-4">
                        {INSIGHTS_COMPETITIVE.map((item) => (
                            <div key={item.brand} className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-sm">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-bold text-white uppercase">{item.brand}</span>
                                    <span className="text-[10px] font-mono text-[#a3e635]">{item.result}</span>
                                </div>
                                <p className="text-[11px] text-zinc-300">{item.campaign}</p>
                                <p className="text-[10px] text-zinc-500 mt-1">{item.tactic}</p>
                            </div>
                        ))}
                    </div>
                </DashboardWidgetShell>

                <DashboardWidgetShell
                    title="Best Practices"
                    subtitle="Learn from top performers"
                    icon={Award}
                >
                    <div className="p-4 space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-zinc-900/50 border border-zinc-800 rounded-sm">
                            <Target className="w-4 h-4 text-[#a3e635] shrink-0 mt-0.5" />
                            <div>
                                <span className="text-xs font-medium text-white">Macro + micro mix</span>
                                <p className="text-[10px] text-zinc-500 mt-1">Combine 2–3 large creators with 10+ micro for reach + authenticity.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-zinc-900/50 border border-zinc-800 rounded-sm">
                            <Target className="w-4 h-4 text-[#a3e635] shrink-0 mt-0.5" />
                            <div>
                                <span className="text-xs font-medium text-white">Launch events</span>
                                <p className="text-[10px] text-zinc-500 mt-1">Coordinated multi-creator drops on same day amplify reach.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-zinc-900/50 border border-zinc-800 rounded-sm">
                            <Target className="w-4 h-4 text-[#a3e635] shrink-0 mt-0.5" />
                            <div>
                                <span className="text-xs font-medium text-white">UGC-first content</span>
                                <p className="text-[10px] text-zinc-500 mt-1">Creator-led ads outperform brand-produced 40% of the time.</p>
                            </div>
                        </div>
                    </div>
                </DashboardWidgetShell>
            </div>
        </div>
    );
}
