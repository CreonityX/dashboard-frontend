"use client";

import { useState } from "react";
import { ArrowUpRight, ArrowDownRight, Calendar, Eye, MousePointer2, DollarSign, Percent, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { ANALYTICS_OVERVIEW_KPIS } from "@/lib/brand-data";

const DATE_RANGES = [
    { id: '7d', label: 'Last 7 Days' },
    { id: '30d', label: 'Last 30 Days' },
    { id: '90d', label: 'Last 90 Days' },
    { id: 'ytd', label: 'Year to Date' },
];

const KPI_CONFIG = [
    { key: 'totalReach', title: 'Total Reach', icon: Eye },
    { key: 'totalImpressions', title: 'Total Impressions', icon: Eye },
    { key: 'totalEngagements', title: 'Total Engagements', icon: MousePointer2 },
    { key: 'totalConversions', title: 'Total Conversions', icon: TrendingUp },
    { key: 'totalSpend', title: 'Total Spend', icon: DollarSign },
    { key: 'overallROI', title: 'Overall ROI', icon: Percent },
    { key: 'avgEngagementRate', title: 'Avg. Engagement Rate', icon: Percent },
    { key: 'avgCostPerEngagement', title: 'Avg. Cost per Engagement', icon: DollarSign },
];

function MetricCard({ metric, kpi }: { metric: any; kpi: { title: string; icon: any } }) {
    return (
        <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-sm hover:border-zinc-700 transition-colors group">
            <div className="flex justify-between items-start mb-2">
                <span className="text-zinc-500 text-[10px] font-mono uppercase tracking-wider">{kpi.title}</span>
                <kpi.icon className="w-3.5 h-3.5 text-zinc-600 group-hover:text-[#a3e635] transition-colors" />
            </div>
            <div className="flex items-end justify-between">
                <span className="text-2xl font-bold text-white font-display tracking-tight">{metric.value}</span>
                <div className={cn(
                    "flex items-center gap-1 text-[10px] font-mono px-1.5 py-0.5 rounded-sm",
                    metric.trend === 'up' ? "bg-[#a3e635]/10 text-[#a3e635]" : "bg-red-500/10 text-red-500"
                )}>
                    {metric.trend === 'up' ? <ArrowUpRight className="w-2.5 h-2.5" /> : <ArrowDownRight className="w-2.5 h-2.5" />}
                    {metric.change}
                </div>
            </div>
        </div>
    );
}

const MOCK_CHART_DATA = [
    { label: 'Jan', value: 30, value2: 20 }, { label: 'Feb', value: 45, value2: 25 },
    { label: 'Mar', value: 35, value2: 30 }, { label: 'Apr', value: 60, value2: 40 },
    { label: 'May', value: 55, value2: 35 }, { label: 'Jun', value: 70, value2: 50 },
];

function SimpleLineChart() {
    const points = MOCK_CHART_DATA.map((d, i) => `${i * 100},${100 - d.value}`).join(' ');
    const points2 = MOCK_CHART_DATA.map((d, i) => `${i * 100},${100 - d.value2}`).join(' ');
    return (
        <div className="w-full h-full relative">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 600 100" preserveAspectRatio="none">
                <line x1="0" y1="25" x2="600" y2="25" stroke="#333" strokeWidth="0.5" strokeDasharray="4 4" />
                <line x1="0" y1="50" x2="600" y2="50" stroke="#333" strokeWidth="0.5" strokeDasharray="4 4" />
                <line x1="0" y1="75" x2="600" y2="75" stroke="#333" strokeWidth="0.5" strokeDasharray="4 4" />
                <polyline points={points} fill="none" stroke="#a3e635" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                <polyline points={points2} fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" opacity="0.7" />
            </svg>
            <div className="flex justify-between mt-2 text-[9px] text-zinc-600 font-mono">
                {MOCK_CHART_DATA.map((d) => <span key={d.label}>{d.label.toUpperCase()}</span>)}
            </div>
        </div>
    );
}

export function OverviewTab() {
    const [dateRange, setDateRange] = useState('30d');

    return (
        <div className="space-y-6">
            {/* Date Range Selector */}
            <div className="flex flex-wrap justify-between items-center gap-4">
                <p className="text-zinc-500 font-mono text-xs">
                    GLOBAL_METRICS // {DATE_RANGES.find(d => d.id === dateRange)?.label?.toUpperCase()}
                </p>
                <div className="flex items-center gap-2">
                    <div className="flex bg-zinc-900/80 p-1 rounded-sm border border-zinc-800">
                        {DATE_RANGES.map((r) => (
                            <button
                                key={r.id}
                                onClick={() => setDateRange(r.id)}
                                className={cn(
                                    "px-3 py-1.5 rounded-sm text-[10px] font-mono uppercase transition-all",
                                    dateRange === r.id ? "bg-[#a3e635]/10 text-[#a3e635] border border-[#a3e635]/20" : "text-zinc-500 hover:text-zinc-300 border border-transparent"
                                )}
                            >
                                {r.label}
                            </button>
                        ))}
                    </div>
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-[#a3e635]/10 border border-[#a3e635]/20 rounded-sm text-xs text-[#a3e635] hover:bg-[#a3e635]/20 transition-all font-mono">
                        <span className="w-1.5 h-1.5 bg-[#a3e635] rounded-full animate-pulse" />
                        Live
                    </button>
                </div>
            </div>

            {/* Key Performance Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {KPI_CONFIG.map((kpi) => {
                    const metric = ANALYTICS_OVERVIEW_KPIS[kpi.key as keyof typeof ANALYTICS_OVERVIEW_KPIS];
                    if (!metric) return null;
                    return <MetricCard key={kpi.key} metric={metric} kpi={kpi} />;
                })}
            </div>

            {/* Trends Chart */}
            <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-sm flex flex-col h-64 relative overflow-hidden">
                <div className="flex justify-between items-center mb-4 z-10">
                    <h3 className="text-xs font-bold text-zinc-400 font-display tracking-widest uppercase">Performance_Trends</h3>
                    <div className="flex gap-2 text-[9px] font-mono">
                        <span className="flex items-center gap-1 text-zinc-500"><span className="w-2 h-2 rounded-full bg-[#a3e635]"></span>REACH</span>
                        <span className="flex items-center gap-1 text-zinc-500"><span className="w-2 h-2 rounded-full bg-purple-500"></span>ENGAGEMENT</span>
                    </div>
                </div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
                <div className="flex-1 w-full relative z-10">
                    <SimpleLineChart />
                </div>
            </div>
        </div>
    );
}
