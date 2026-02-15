import { DollarSign, TrendingUp, TrendingDown, Calendar, CreditCard, ArrowRight, Download, BarChart3, PieChart } from "lucide-react";
import { cn } from "@/lib/utils";

const EARNINGS_SUMMARY = [
    { label: "Lifetime Earnings", value: "$142,500.00", sub: "Since Jan 2024", highlight: true },
    { label: "This Month", value: "$8,450.00", sub: "+12% vs last month", trend: 'up' },
    { label: "Pending Payments", value: "$3,200.00", sub: "4 invoices processing", trend: 'neutral' },
    { label: "Available to Withdraw", value: "$5,250.00", sub: "Ready for transfer", active: true },
];

const REVENUE_BREAKDOWN = [
    { platform: "Instagram", value: 45, color: "bg-pink-500" },
    { platform: "YouTube", value: 30, color: "bg-red-500" },
    { platform: "TikTok", value: 15, color: "bg-black" },
    { platform: "Other", value: 10, color: "bg-zinc-500" },
];

const TOP_CAMPAIGNS = [
    { brand: "Nike", campaign: "Air Max Launch", amount: "$12,000", date: "Feb 10" },
    { brand: "Samsung", campaign: "Galaxy S26", amount: "$8,500", date: "Jan 24" },
    { brand: "Sony", campaign: "Alpha Camera", amount: "$5,000", date: "Jan 15" },
];

export function OverviewTab() {
    return (
        <div className="space-y-6">
            {/* Top Summary Bar */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {EARNINGS_SUMMARY.map((item, i) => (
                    <div key={i} className={cn(
                        "p-5 flex flex-col justify-between min-h-[120px] transition-all duration-300 group relative overflow-hidden",
                        item.active
                            ? "bg-[#a3e635] text-black border border-[#a3e635]"
                            : "tech-border hover:bg-zinc-900/60"
                    )}>
                        {item.active && <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />}

                        <div>
                            <div className={cn("text-[10px] font-mono uppercase font-bold tracking-wider mb-2", item.active ? "text-zinc-900" : "text-zinc-500")}>
                                {item.label}
                            </div>
                            <div className={cn("text-3xl font-bold font-display tracking-tighter", item.active ? "text-black" : "text-white")}>
                                {item.value}
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-2 pt-4 border-t border-black/10">
                            <div className={cn("text-[10px] font-mono", item.active ? "text-zinc-800 font-bold" : "text-zinc-500")}>
                                {item.sub}
                            </div>
                            {item.active && <ArrowRight className="w-4 h-4 text-black" />}
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Earnings Chart */}
                <div className="lg:col-span-2 tech-border p-5 flex flex-col relative group">
                    <div className="absolute inset-0 bg-grid-zinc opacity-5 pointer-events-none" />

                    <div className="flex justify-between items-center mb-6 relative z-10">
                        <div>
                            <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider flex items-center gap-2">
                                <BarChart3 className="w-4 h-4 text-[#a3e635]" /> Earnings_Velocity
                            </h3>
                            <p className="text-[10px] text-zinc-500 font-mono pl-6">REVENUE_FLOW // 12_MONTH_HISTORY</p>
                        </div>
                        <div className="flex gap-2">
                            {['1W', '1M', '3M', '1Y'].map(range => (
                                <button key={range} className="px-3 py-1 bg-zinc-950 border border-zinc-800 text-[10px] font-mono text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors">
                                    {range}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Chart Container */}
                    <div className="flex-1 bg-zinc-950/30 border border-zinc-800/50 relative min-h-[300px] flex items-end px-4 pb-0 gap-2">
                        {/* Mock Bars */}
                        {Array.from({ length: 12 }).map((_, i) => {
                            const height = Math.floor(Math.random() * 60) + 20;
                            return (
                                <div key={i} className="flex-1 flex flex-col justify-end group/bar cursor-pointer relative">
                                    <div
                                        className="w-full bg-zinc-800/50 group-hover/bar:bg-[#a3e635] transition-colors relative border-t border-x border-zinc-700/30 group-hover/bar:border-transparent"
                                        style={{ height: `${height}%` }}
                                    >
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[9px] px-2 py-1 opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap border border-zinc-700 pointer-events-none z-10 font-mono">
                                            ${height * 120}
                                        </div>
                                    </div>
                                    <div className="text-[9px] text-zinc-600 font-mono text-center mt-2 border-t border-zinc-800 pt-2 group-hover/bar:text-white transition-colors">
                                        {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Right Column: Breakdown & Quick Stats */}
                <div className="space-y-6">
                    {/* Breakdown */}
                    <div className="tech-border p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xs font-bold text-zinc-300 font-display uppercase tracking-wider">Source_Breakdown</h3>
                            <PieChart className="w-4 h-4 text-zinc-600" />
                        </div>

                        <div className="space-y-4">
                            {REVENUE_BREAKDOWN.map(item => (
                                <div key={item.platform} className="group">
                                    <div className="flex justify-between text-[10px] font-mono text-zinc-500 mb-1 group-hover:text-zinc-300 transition-colors">
                                        <span>{item.platform}</span>
                                        <span>{item.value}%</span>
                                    </div>
                                    <div className="h-1 bg-zinc-800 overflow-hidden">
                                        <div className={cn("h-full", item.color)} style={{ width: `${item.value}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Top Campaigns */}
                    <div className="tech-border p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xs font-bold text-zinc-300 font-display uppercase tracking-wider">Top_Earners</h3>
                            <button className="text-[9px] text-[#a3e635] font-mono hover:underline uppercase">View_All</button>
                        </div>
                        <div className="space-y-3">
                            {TOP_CAMPAIGNS.map((c, i) => (
                                <div key={i} className="flex items-center justify-between p-2 hover:bg-zinc-900/50 border border-transparent hover:border-zinc-800 transition-colors cursor-pointer group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-zinc-950 flex items-center justify-center text-[10px] font-bold text-zinc-400 border border-zinc-800 group-hover:border-zinc-600 group-hover:text-white transition-colors">
                                            {c.brand[0]}
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-white group-hover:text-[#a3e635] transition-colors">{c.brand}</div>
                                            <div className="text-[9px] text-zinc-500 font-mono uppercase">{c.campaign}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs font-bold text-white font-mono">{c.amount}</div>
                                        <div className="text-[9px] text-zinc-600 font-mono">{c.date}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Info Bar */}
            <div className="bg-[#a3e635]/5 border border-[#a3e635]/10 p-3 rounded-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-[#a3e635]" />
                    <span className="text-xs text-[#a3e635] font-mono">NEXT_PAYOUT_SCHEDULED: <span className="font-bold">FEB 28, 2026</span></span>
                </div>
                <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest hidden sm:block">
                    AUTO_WITHDRAWAL_ENABLED
                </div>
            </div>
        </div>
    );
}
