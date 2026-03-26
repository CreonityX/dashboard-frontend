import { useMemo, useState } from "react";
import { ArrowRight, BarChart3, Calendar, PieChart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFinanceMvp } from "@/components/widgets/shared/finance/FinanceMvpContext";

const REVENUE_BREAKDOWN = [
    { platform: "Instagram", value: 45, color: "bg-pink-500" },
    { platform: "YouTube", value: 30, color: "bg-red-500" },
    { platform: "TikTok", value: 15, color: "bg-black" },
    { platform: "Other", value: 10, color: "bg-zinc-500" },
];

export function OverviewTab() {
    const {
        selectedRange,
        monthlyEarnings,
        selectedMonth,
        setSelectedMonth,
        setSelectedRange,
        lifetimeEarnings,
        monthEarnings,
        pendingPayments,
        availableToWithdraw,
        invoices,
        formatCurrency,
        isLoading
    } = useFinanceMvp();
    const [panelMessage, setPanelMessage] = useState("Click a month bar to inspect earnings velocity.");
    const topCampaigns = useMemo(
        () => [...invoices].sort((a, b) => b.amount - a.amount).slice(0, 5),
        [invoices]
    );

    const earningsSummary = [
        { label: "Lifetime Earnings", value: formatCurrency(lifetimeEarnings), sub: "Since Jan 2024" },
        { label: "This Month", value: formatCurrency(monthEarnings), sub: `Range: ${selectedRange}` },
        { label: "Pending Payments", value: formatCurrency(pendingPayments), sub: `${invoices.filter((item) => item.status === "sent").length} invoices outstanding` },
        { label: "Available to Withdraw", value: formatCurrency(availableToWithdraw), sub: "Ready for transfer", active: true }
    ];

    return (
        <div className="space-y-6">
            {/* Top Summary Bar */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {earningsSummary.map((item, i) => (
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
                            {item.active && <ArrowRight className="w-4 h-4 text-black" aria-hidden="true" />}
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
                                <button
                                    key={range}
                                    onClick={() => setSelectedRange(range as "1W" | "1M" | "3M" | "1Y")}
                                    className={cn(
                                        "px-3 py-1 border text-[10px] font-mono transition-colors",
                                        selectedRange === range
                                            ? "bg-[#a3e635]/20 border-[#a3e635]/40 text-[#a3e635]"
                                            : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600"
                                    )}
                                >
                                    {range}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Chart Container */}
                    <div className="flex-1 bg-zinc-950/30 border border-zinc-800/50 relative min-h-[300px] flex items-end px-4 pb-0 gap-2">
                        {/* Mock Bars */}
                        {(isLoading ? monthlyEarnings.slice(0, 6) : monthlyEarnings).map((point, i) => {
                            const max = Math.max(...monthlyEarnings.map((item) => item.amount), 1);
                            const height = Math.max(18, Math.round((point.amount / max) * 100));
                            const isSelected = selectedMonth === point.month;
                            return (
                                <button
                                    key={`${point.month}-${i}`}
                                    onClick={() => {
                                        setSelectedMonth(point.month);
                                        setPanelMessage(`${point.month} earnings registered at ${formatCurrency(point.amount)}.`);
                                    }}
                                    className="flex-1 flex flex-col justify-end group/bar cursor-pointer relative"
                                >
                                    <div
                                        className={cn(
                                            "w-full transition-colors relative border-t border-x",
                                            isSelected
                                                ? "bg-[#a3e635] border-transparent"
                                                : "bg-zinc-800/50 group-hover/bar:bg-[#a3e635] border-zinc-700/30 group-hover/bar:border-transparent"
                                        )}
                                        style={{ height: `${height}%` }}
                                    >
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[9px] px-2 py-1 opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap border border-zinc-700 pointer-events-none z-10 font-mono">
                                            {formatCurrency(point.amount)}
                                        </div>
                                    </div>
                                    <div className={cn(
                                        "text-[9px] font-mono text-center mt-2 border-t border-zinc-800 pt-2 transition-colors",
                                        isSelected ? "text-[#a3e635]" : "text-zinc-600 group-hover/bar:text-white"
                                    )}>
                                        {point.month}
                                    </div>
                                </button>
                            );
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
                            <button
                                onClick={() => setPanelMessage(`Showing ${topCampaigns.length} top campaigns by invoice amount.`)}
                                className="text-[9px] text-[#a3e635] font-mono hover:underline uppercase"
                            >
                                View_All
                            </button>
                        </div>
                        <div className="space-y-3">
                            {topCampaigns.map((campaign) => (
                                <button
                                    key={campaign.id}
                                    onClick={() => setPanelMessage(`${campaign.client} / ${campaign.campaign} invoice is ${campaign.status.toUpperCase()}.`)}
                                    className="w-full text-left flex items-center justify-between p-2 hover:bg-zinc-900/50 border border-transparent hover:border-zinc-800 transition-colors cursor-pointer group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-zinc-950 flex items-center justify-center text-[10px] font-bold text-zinc-400 border border-zinc-800 group-hover:border-zinc-600 group-hover:text-white transition-colors">
                                            {campaign.client[0]}
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-white group-hover:text-[#a3e635] transition-colors">{campaign.client}</div>
                                            <div className="text-[9px] text-zinc-500 font-mono uppercase">{campaign.campaign}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs font-bold text-white font-mono">{formatCurrency(campaign.amount)}</div>
                                        <div className="text-[9px] text-zinc-600 font-mono">{campaign.dateIssued}</div>
                                    </div>
                                </button>
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
                <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest hidden sm:block max-w-[50%] truncate" title={panelMessage}>
                    {panelMessage}
                </div>
            </div>
        </div>
    );
}
