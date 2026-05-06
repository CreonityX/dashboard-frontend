"use client";

import { TrendingUp, TrendingDown, Target, Award, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

const BENCHMARKS = [
    { label: "Engagement Rate", user: 4.8, avg: 3.2, top10: 6.5, suffix: "%", better: true },
    { label: "Campaign ROI", user: 385, avg: 280, top10: 450, suffix: "%", better: true },
    { label: "Cost Per Conversion", user: 20.7, avg: 32.5, top10: 15.2, suffix: "$", better: true },
    { label: "Reach Efficiency", user: 0.087, avg: 0.065, top10: 0.12, suffix: "M/$", better: true },
];

const NICHE_BENCHMARKS = [
    { niche: "Tech & Gadgets", userROI: 420, nicheAvg: 350 },
    { niche: "Lifestyle", userROI: 310, nicheAvg: 280 },
];

const BEST_PRACTICES = [
    "Top performers use video-first content 3x more than static.",
    "Optimal post frequency: 4-6x/week on primary platform.",
    "Creator diversity (micro + macro) improves reach efficiency 22%.",
];

export function BenchmarkingTab() {
    return (
        <div className="space-y-6">
            <h2 className="text-xs font-bold text-zinc-500 font-display tracking-widest uppercase">Your_Performance_Vs_Industry</h2>

            {/* Your vs Industry Averages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {BENCHMARKS.map((item) => (
                    <div key={item.label} className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-sm hover:border-zinc-700 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-sm font-bold text-zinc-300">{item.label}</h3>
                            {item.better ? (
                                <TrendingUp className="w-4 h-4 text-[#a3e635]" />
                            ) : (
                                <TrendingDown className="w-4 h-4 text-red-500" />
                            )}
                        </div>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-[10px] font-mono mb-1">
                                    <span className="text-white font-bold">YOU</span>
                                    <span>{item.user}{item.suffix}</span>
                                </div>
                                <div className="h-2 bg-zinc-800 rounded-sm overflow-hidden">
                                    <div className="h-full bg-[#a3e635] rounded-sm" style={{ width: "75%" }} />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-[10px] font-mono text-zinc-500 mb-1">
                                    <span>INDUSTRY_AVG</span>
                                    <span>{item.avg}{item.suffix}</span>
                                </div>
                                <div className="h-2 bg-zinc-800 rounded-sm overflow-hidden">
                                    <div className="h-full bg-zinc-600 rounded-sm" style={{ width: "55%" }} />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-[10px] font-mono text-zinc-500 mb-1">
                                    <span>TOP_10%</span>
                                    <span>{item.top10}{item.suffix}</span>
                                </div>
                                <div className="h-2 bg-zinc-800 rounded-sm overflow-hidden">
                                    <div className="h-full bg-purple-500/50 rounded-sm" style={{ width: "85%" }} />
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-zinc-800/50">
                            <p className="text-[10px] text-zinc-500 font-mono">
                                You perform {Math.round(((item.user - item.avg) / item.avg) * 100)}% better than industry average.
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Niche-specific Benchmarks */}
            <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-sm">
                <div className="flex items-center gap-2 mb-4">
                    <BarChart3 className="w-4 h-4 text-[#a3e635]" />
                    <h3 className="text-xs font-bold text-white font-display tracking-widest uppercase">Niche_Specific_Benchmarks</h3>
                </div>
                <div className="space-y-3">
                    {NICHE_BENCHMARKS.map(n => (
                        <div key={n.niche} className="flex justify-between items-center p-3 bg-zinc-950/50 border border-zinc-800 rounded-sm">
                            <span className="text-xs font-mono text-zinc-300">{n.niche}</span>
                            <div className="flex gap-6 text-[10px] font-mono">
                                <span>Your ROI: <span className="text-[#a3e635] font-bold">{n.userROI}%</span></span>
                                <span>Niche Avg: <span className="text-zinc-500">{n.nicheAvg}%</span></span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Best Practices from Top Performers */}
            <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-sm">
                <div className="flex items-center gap-2 mb-4">
                    <Award className="w-4 h-4 text-purple-500" />
                    <h3 className="text-xs font-bold text-white font-display tracking-widest uppercase">Best_Practices_From_Top_Performers</h3>
                </div>
                <ul className="space-y-2">
                    {BEST_PRACTICES.map((p, i) => (
                        <li key={i} className="flex items-start gap-2 text-[11px] text-zinc-400 font-mono">
                            <span className="text-[#a3e635]">→</span> {p}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
