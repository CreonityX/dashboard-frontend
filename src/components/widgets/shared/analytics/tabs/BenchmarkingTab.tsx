import { TrendingUp, TrendingDown, Target, Award, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const BENCHMARKS = [
    { label: "Engagement Rate", user: 4.8, avg: 3.2, suffix: "%", better: true },
    { label: "Follower Growth", user: 2.1, avg: 1.5, suffix: "%/mo", better: true },
    { label: "Avg. Views", user: 45, avg: 52, suffix: "K", better: false },
    { label: "Cost Per Engagement", user: 0.12, avg: 0.18, suffix: "$", better: true }, // Lower is better
];

export function BenchmarkingTab() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-lg font-bold text-white font-display tracking-wide">COMPETITIVE_BENCHMARKING</h2>
                <p className="text-zinc-500 font-mono text-xs">VS_INDUSTRY_AVERAGE // TECH_NICHE</p>
            </div>

            {/* Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {BENCHMARKS.map((item) => (
                    <div key={item.label} className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-sm group hover:border-zinc-700 transition-colors">
                        <div className="flex justify-between items-start mb-6">
                            <h3 className="text-sm font-bold text-zinc-300">{item.label}</h3>
                            {item.better ?
                                <TrendingUp className="w-4 h-4 text-[#a3e635]" /> :
                                <TrendingDown className="w-4 h-4 text-red-500" />
                            }
                        </div>

                        <div className="space-y-4">
                            {/* User Bar */}
                            <div className="space-y-1">
                                <div className="flex justify-between text-[10px] font-mono">
                                    <span className="text-white font-bold">YOU</span>
                                    <span>{item.user}{item.suffix}</span>
                                </div>
                                <div className="h-2 bg-zinc-800 rounded-sm overflow-hidden">
                                    <div className="h-full bg-[#a3e635] w-[70%] relative">
                                        <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]" />
                                    </div>
                                </div>
                            </div>

                            {/* Average Bar */}
                            <div className="space-y-1">
                                <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                                    <span>INDUSTRY_AVG</span>
                                    <span>{item.avg}{item.suffix}</span>
                                </div>
                                <div className="h-2 bg-zinc-800 rounded-sm overflow-hidden">
                                    <div className="h-full bg-zinc-600 w-[50%]" />
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-zinc-800/50">
                            <p className="text-[10px] text-zinc-500 font-mono">
                                {item.better ?
                                    `You are performing ${Math.round(((item.user - item.avg) / item.avg) * 100)}% better than average.` :
                                    `You are slightly below the top 10% average in this category.`
                                }
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Opportunities */}
            <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-sm">
                <div className="flex items-center gap-2 mb-4">
                    <Target className="w-4 h-4 text-purple-500" />
                    <h3 className="text-xs font-bold text-white font-display tracking-widest uppercase">Growth_Opportunities</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-zinc-950/50 border border-zinc-800 rounded-sm flex gap-3">
                        <div className="shrink-0 w-8 h-8 bg-zinc-900 rounded-full flex items-center justify-center border border-zinc-800">
                            <Users className="w-4 h-4 text-zinc-500" />
                        </div>
                        <div>
                            <h4 className="text-xs font-bold text-zinc-300">Under-saturated Platform</h4>
                            <p className="text-[10px] text-zinc-600 font-mono mt-1 leading-relaxed">LinkedIn Video is growing 200% MoM in the Tech niche. You have 0 presence there.</p>
                        </div>
                    </div>
                    <div className="p-3 bg-zinc-950/50 border border-zinc-800 rounded-sm flex gap-3">
                        <div className="shrink-0 w-8 h-8 bg-zinc-900 rounded-full flex items-center justify-center border border-zinc-800">
                            <Award className="w-4 h-4 text-zinc-500" />
                        </div>
                        <div>
                            <h4 className="text-xs font-bold text-zinc-300">Content Format</h4>
                            <p className="text-[10px] text-zinc-600 font-mono mt-1 leading-relaxed">Short-form tutorials (under 60s) are driving 3x more engagement than your long-form reviews.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
