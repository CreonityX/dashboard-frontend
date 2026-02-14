"use client";

import { ResourceSection, InsightCard } from "@/components/widgets/shared/resources/ResourcesComponents";
import { TrendingUp, DollarSign, BarChart3 } from "lucide-react";

export function InsightsTab() {
    return (
        <div className="max-w-5xl mx-auto pb-20 animate-in fade-in zoom-in-95 duration-500 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard
                    label="Avg. CPM (Tech)"
                    value="$18.50"
                    trend="+12%"
                    icon={DollarSign}
                />
                <StatCard
                    label="Top Platform Growth"
                    value="LinkedIn Video"
                    trend="+45%"
                    icon={TrendingUp}
                />
                <StatCard
                    label="Brand Budget Q1"
                    value="$4.2B"
                    trend="+8%"
                    icon={BarChart3}
                />
            </div>

            <ResourceSection title="Market Reports">
                <div className="grid grid-cols-1 gap-4">
                    <InsightCard
                        title="State of influencer Marketing 2026: The Rise of Micro-Communities"
                        category="Industry Report"
                        date="Feb 10, 2026"
                        readTime="15 min"
                    />
                    <InsightCard
                        title="Platform Analysis: Why Brands are Moving Budget to LinkedIn"
                        category="Platform Trends"
                        date="Jan 28, 2026"
                        readTime="8 min"
                    />
                    <InsightCard
                        title="Creator Economy Earnings Report Q4 2025"
                        category="Financial Data"
                        date="Jan 15, 2026"
                        readTime="20 min"
                    />
                </div>
            </ResourceSection>

            <ResourceSection title="Rate Benchmarks">
                <div className="p-6 border border-white/5 bg-zinc-900/20 rounded-sm">
                    <h4 className="text-sm font-bold text-white mb-4">Average Cost Per Post (By Niche)</h4>

                    {/* Simple Bar Chart Visualization using Divs */}
                    <div className="space-y-4">
                        <BenchmarkBar label="Tech & Gaming" value={2500} max={3000} />
                        <BenchmarkBar label="Finance & Crypto" value={2800} max={3000} />
                        <BenchmarkBar label="Beauty & Fashion" value={1800} max={3000} />
                        <BenchmarkBar label="Lifestyle & Vlog" value={1200} max={3000} />
                        <BenchmarkBar label="Fitness & Health" value={1500} max={3000} />
                    </div>
                </div>
            </ResourceSection>
        </div>
    );
}

function StatCard({ label, value, trend, icon: Icon }: { label: string, value: string, trend: string, icon: any }) {
    return (
        <div className="p-6 bg-zinc-900/40 border border-white/5 rounded-sm">
            <div className="flex items-start justify-between mb-2">
                <div className="p-2 bg-purple-500/10 rounded-sm text-purple-400">
                    <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-[#a3e635] bg-[#a3e635]/10 px-1.5 py-0.5 rounded-sm">{trend}</span>
            </div>
            <div className="text-2xl font-bold text-white font-display">{value}</div>
            <div className="text-xs text-zinc-500 mt-1 uppercase tracking-wide">{label}</div>
        </div>
    );
}

function BenchmarkBar({ label, value, max }: { label: string, value: number, max: number }) {
    const width = (value / max) * 100;
    return (
        <div>
            <div className="flex justify-between text-xs mb-1.5">
                <span className="text-zinc-300 font-bold">{label}</span>
                <span className="text-zinc-400 font-mono">${value.toLocaleString()}</span>
            </div>
            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-purple-600 to-purple-400"
                    style={{ width: `${width}%` }}
                />
            </div>
        </div>
    );
}
