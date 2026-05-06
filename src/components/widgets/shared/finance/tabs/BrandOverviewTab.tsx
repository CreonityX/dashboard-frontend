"use client";

import { useState } from "react";
import { DollarSign, TrendingUp, PieChart, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    BUDGET_OVERVIEW,
    BUDGET_BY_CAMPAIGN,
    BUDGET_BY_PLATFORM,
    BUDGET_BY_TIER,
    BUDGET_BY_MONTH,
    BUDGET_BY_CONTENT,
} from "@/lib/brand-data";

const formatCurrency = (n: number) => `$${n.toLocaleString()}`;

export function OverviewTab() {
    const [period, setPeriod] = useState<'annual' | 'quarterly'>('annual');
    const b = BUDGET_OVERVIEW;
    const utilPct = Math.round((b.spentYTD / b.allocatedToInfluencer) * 100);

    return (
        <div className="space-y-6">
            {/* Period Toggle */}
            <div className="flex gap-2">
                {(['annual', 'quarterly'] as const).map(p => (
                    <button
                        key={p}
                        onClick={() => setPeriod(p)}
                        className={cn(
                            "px-4 py-2 rounded-sm text-[10px] font-mono uppercase transition-all",
                            period === p ? "bg-[#a3e635]/10 text-[#a3e635] border border-[#a3e635]/20" : "bg-zinc-900/50 border border-zinc-800 text-zinc-500 hover:text-zinc-300"
                        )}
                    >
                        {p}
                    </button>
                ))}
            </div>

            {/* Budget Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-sm">
                    <div className="text-[10px] text-zinc-500 font-mono uppercase mb-2">Total Marketing Budget</div>
                    <div className="text-xl font-bold text-white font-display">{formatCurrency(b.totalMarketingBudget)}</div>
                    <div className="text-[10px] text-zinc-600 font-mono mt-1">{period}</div>
                </div>
                <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-sm">
                    <div className="text-[10px] text-zinc-500 font-mono uppercase mb-2">Allocated to Influencer</div>
                    <div className="text-xl font-bold text-white font-display">{formatCurrency(b.allocatedToInfluencer)}</div>
                    <div className="text-[10px] text-zinc-600 mt-1"><span className="font-mono">{Math.round((b.allocatedToInfluencer / b.totalMarketingBudget) * 100)}%</span> of total</div>
                </div>
                <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-sm">
                    <div className="text-[10px] text-zinc-500 font-mono uppercase mb-2">Spent YTD</div>
                    <div className="text-xl font-bold text-[#a3e635] font-display">{formatCurrency(b.spentYTD)}</div>
                </div>
                <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-sm">
                    <div className="text-[10px] text-zinc-500 font-mono uppercase mb-2">Remaining Budget</div>
                    <div className="text-xl font-bold text-white font-display">{formatCurrency(b.remaining)}</div>
                </div>
                <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-sm">
                    <div className="text-[10px] text-zinc-500 font-mono uppercase mb-2">Projected EoP Spend</div>
                    <div className="text-xl font-bold text-white font-display">{formatCurrency(b.projectedEndOfPeriod)}</div>
                </div>
            </div>

            {/* Budget Utilization Chart */}
            <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-sm">
                <h3 className="text-xs font-bold text-zinc-400 font-display tracking-widest uppercase mb-4 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-[#a3e635]" /> Budget_Utilization
                </h3>
                <div className="h-8 bg-zinc-800 rounded-sm overflow-hidden flex">
                    <div
                        className="bg-[#a3e635] transition-all duration-500"
                        style={{ width: `${utilPct}%` }}
                    />
                </div>
                <div className="flex justify-between mt-2 text-[10px] font-mono text-zinc-500">
                    <span>0%</span>
                    <span className="text-[#a3e635] font-bold">{utilPct}% used</span>
                    <span>100%</span>
                </div>
            </div>

            {/* Budget Breakdown - Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* By Campaign */}
                <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-sm">
                    <h3 className="text-xs font-bold text-zinc-400 font-display tracking-widest uppercase mb-4 flex items-center gap-2">
                        <PieChart className="w-4 h-4 text-[#a3e635]" /> By_Campaign
                    </h3>
                    <div className="space-y-3">
                        {BUDGET_BY_CAMPAIGN.map(c => (
                            <div key={c.campaign} className="group">
                                <div className="flex justify-between text-[10px] mb-1">
                                    <span className="text-zinc-400">{c.campaign}</span>
                                    <span className="font-mono">{formatCurrency(c.amount)} ({c.pct}%)</span>
                                </div>
                                <div className="h-2 bg-zinc-800 rounded-sm overflow-hidden">
                                    <div className="h-full bg-[#a3e635]/70 rounded-sm transition-all" style={{ width: `${c.pct}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* By Platform */}
                <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-sm">
                    <h3 className="text-xs font-bold text-zinc-400 font-display tracking-widest uppercase mb-4">By_Platform</h3>
                    <div className="space-y-3">
                        {BUDGET_BY_PLATFORM.map((p, i) => (
                            <div key={p.platform} className="group">
                                <div className="flex justify-between text-[10px] mb-1">
                                    <span className="text-zinc-400">{p.platform}</span>
                                    <span className="font-mono">{formatCurrency(p.amount)} ({p.pct}%)</span>
                                </div>
                                <div className="h-2 bg-zinc-800 rounded-sm overflow-hidden">
                                    <div
                                        className={cn(
                                            "h-full rounded-sm transition-all",
                                            i === 0 && "bg-pink-500/70",
                                            i === 1 && "bg-red-500/70",
                                            i === 2 && "bg-zinc-400"
                                        )}
                                        style={{ width: `${p.pct}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* By Creator Tier */}
                <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-sm">
                    <h3 className="text-xs font-bold text-zinc-400 font-display tracking-widest uppercase mb-4">By_Creator_Tier</h3>
                    <div className="space-y-3">
                        {BUDGET_BY_TIER.map(t => (
                            <div key={t.tier} className="group">
                                <div className="flex justify-between text-[10px] mb-1">
                                    <span className="text-zinc-400">{t.tier}</span>
                                    <span className="font-mono">{formatCurrency(t.amount)} ({t.pct}%)</span>
                                </div>
                                <div className="h-2 bg-zinc-800 rounded-sm overflow-hidden">
                                    <div className="h-full bg-purple-500/70 rounded-sm" style={{ width: `${t.pct}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* By Content Type */}
                <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-sm">
                    <h3 className="text-xs font-bold text-zinc-400 font-display tracking-widest uppercase mb-4">By_Content_Type</h3>
                    <div className="space-y-3">
                        {BUDGET_BY_CONTENT.map(c => (
                            <div key={c.type} className="group">
                                <div className="flex justify-between text-[10px] mb-1">
                                    <span className="text-zinc-400">{c.type}</span>
                                    <span className="font-mono">{formatCurrency(c.amount)} ({c.pct}%)</span>
                                </div>
                                <div className="h-2 bg-zinc-800 rounded-sm overflow-hidden">
                                    <div className="h-full bg-blue-500/70 rounded-sm" style={{ width: `${c.pct}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Spending Trend by Month */}
            <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-sm">
                <h3 className="text-xs font-bold text-zinc-400 font-display tracking-widest uppercase mb-4">Spending_Trend_By_Month</h3>
                <div className="flex items-end gap-2 h-32">
                    {BUDGET_BY_MONTH.map(m => {
                        const maxAmount = Math.max(...BUDGET_BY_MONTH.map(x => x.amount));
                        const heightPct = (m.amount / maxAmount) * 100;
                        return (
                            <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                                <div className="w-full h-full flex flex-col justify-end">
                                    <div
                                        className="w-full bg-[#a3e635]/80 rounded-t-sm transition-colors hover:bg-[#a3e635] min-h-[20%]"
                                        style={{ height: `${heightPct}%` }}
                                        title={formatCurrency(m.amount)}
                                    />
                                </div>
                                <span className="text-[9px] font-mono text-zinc-600">{m.month}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
