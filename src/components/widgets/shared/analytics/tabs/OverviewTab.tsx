import { ArrowUpRight, ArrowDownRight, Calendar, Info, Bell, Eye, Database, Activity, Share2, Users, MousePointer2 } from "lucide-react";
import { cn } from "@/lib/utils";

const METRICS = [
    { title: "Total Views", value: "2.4M", change: "+12.5%", trend: "up", icon: Eye },
    { title: "Total Engagement", value: "845K", change: "+8.2%", trend: "up", icon: Activity },
    { title: "Avg. Engagement Rate", value: "4.8%", change: "-0.5%", trend: "down", icon: Database },
    { title: "Follower Growth", value: "+12.4K", change: "+22.1%", trend: "up", icon: Users },
    { title: "Content Published", value: "24", change: "+4", trend: "up", icon: Share2 },
    { title: "Click-Through Rate", value: "1.2%", change: "+0.1%", trend: "up", icon: MousePointer2 },
];

const MOCK_CHART_DATA = [
    { label: 'Jan', value: 30, value2: 20 },
    { label: 'Feb', value: 45, value2: 25 },
    { label: 'Mar', value: 35, value2: 30 },
    { label: 'Apr', value: 60, value2: 40 },
    { label: 'May', value: 55, value2: 35 },
    { label: 'Jun', value: 70, value2: 50 },
    { label: 'Jul', value: 85, value2: 60 },
];

function MetricCard({ metric }: { metric: any }) {
    return (
        <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-sm hover:border-zinc-700 transition-colors group">
            <div className="flex justify-between items-start mb-2">
                <span className="text-zinc-500 text-[10px] font-mono uppercase tracking-wider">{metric.title}</span>
                <metric.icon className="w-3.5 h-3.5 text-zinc-600 group-hover:text-[#a3e635] transition-colors" />
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

function SimpleLineChart() {
    // A simplified SVG line chart for visual effect
    const maxVal = 100;
    const points = MOCK_CHART_DATA.map((d, i) => `${i * 100},${100 - d.value}`).join(' ');
    const points2 = MOCK_CHART_DATA.map((d, i) => `${i * 100},${100 - d.value2}`).join(' ');

    return (
        <div className="w-full h-full relative">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 600 100" preserveAspectRatio="none">
                {/* Grid Lines */}
                <line x1="0" y1="25" x2="600" y2="25" stroke="#333" strokeWidth="0.5" strokeDasharray="4 4" />
                <line x1="0" y1="50" x2="600" y2="50" stroke="#333" strokeWidth="0.5" strokeDasharray="4 4" />
                <line x1="0" y1="75" x2="600" y2="75" stroke="#333" strokeWidth="0.5" strokeDasharray="4 4" />

                {/* Line 1 */}
                <polyline
                    points={points}
                    fill="none"
                    stroke="#a3e635"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                />
                {/* Line 2 */}
                <polyline
                    points={points2}
                    fill="none"
                    stroke="#a855f7" // Purple
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                    opacity="0.7"
                />

                {/* Area under curve 1 (Optional, simplified) */}
                <path d={`M0,100 ${points.split(' ').map((p, i) => `L${points.split(' ')[i]}`).join(' ')} L600,100 Z`} fill="#a3e635" fillOpacity="0.05" />
            </svg>

            {/* X-Axis Labels */}
            <div className="flex justify-between mt-2 text-[9px] text-zinc-600 font-mono">
                {MOCK_CHART_DATA.map((d) => (
                    <span key={d.label}>{d.label.toUpperCase()}</span>
                ))}
            </div>
        </div>
    );
}

export function OverviewTab() {
    return (
        <div className="space-y-6">
            {/* Header Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-lg font-bold text-white font-display tracking-wide">PERFORMANCE_OVERVIEW</h2>
                    <p className="text-zinc-500 font-mono text-xs">GLOBAL_METRICS // LAST_30_DAYS</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-sm text-xs text-zinc-400 hover:text-white hover:border-zinc-700 transition-all font-mono">
                        <Calendar className="w-3.5 h-3.5" />
                        Last 30 Days
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-[#a3e635]/10 border border-[#a3e635]/20 rounded-sm text-xs text-[#a3e635] hover:bg-[#a3e635]/20 transition-all font-mono">
                        <span className="w-1.5 h-1.5 bg-[#a3e635] rounded-full animate-pulse" />
                        Live Data
                    </button>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {METRICS.map((metric) => (
                    <MetricCard key={metric.title} metric={metric} />
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-80">
                {/* Main Trends Chart */}
                <div className="lg:col-span-2 bg-zinc-900/40 border border-zinc-800 p-4 rounded-sm flex flex-col relative overflow-hidden">
                    <div className="flex justify-between items-center mb-6 z-10">
                        <h3 className="text-xs font-bold text-zinc-400 font-display tracking-widest uppercase">Growth_Velocity</h3>
                        <div className="flex gap-2 text-[9px] font-mono">
                            <span className="flex items-center gap-1 text-zinc-500"><span className="w-2 h-2 rounded-full bg-[#a3e635]"></span>VIEWS</span>
                            <span className="flex items-center gap-1 text-zinc-500"><span className="w-2 h-2 rounded-full bg-purple-500"></span>ENGAGEMENT</span>
                        </div>
                    </div>

                    {/* Background Grid Decoration */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

                    <div className="flex-1 w-full relative z-10">
                        <SimpleLineChart />
                    </div>
                </div>

                {/* Secondary Chart / Info */}
                <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-sm flex flex-col space-y-4">
                    <h3 className="text-xs font-bold text-zinc-400 font-display tracking-widest uppercase">Quick_Insights</h3>

                    <div className="space-y-3">
                        <div className="p-3 bg-zinc-950/50 border border-zinc-800 rounded-sm">
                            <div className="flex items-start gap-3">
                                <Info className="w-4 h-4 text-[#a3e635] shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-xs text-zinc-300 font-medium mb-1">Engagement Spike Detected</p>
                                    <p className="text-[10px] text-zinc-600 font-mono leading-relaxed">
                                        Your reel "Cyberpunk Aesthetics" is performing 45% better than your average. Consider creating a follow-up.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-3 bg-zinc-950/50 border border-zinc-800 rounded-sm">
                            <div className="flex items-start gap-3">
                                <Bell className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-xs text-zinc-300 font-medium mb-1">Milestone Approaching</p>
                                    <p className="text-[10px] text-zinc-600 font-mono leading-relaxed">
                                        You are 1.2K followers away from 100K. Estimated to hit this milestone in 4 days.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-zinc-800">
                        <div className="flex justify-between items-center text-[10px]">
                            <span className="text-zinc-600 font-mono uppercase">System_Status</span>
                            <span className="text-[#a3e635] font-mono font-bold">OPTIMAL</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
