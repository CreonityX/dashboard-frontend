"use client";

import { TrendingUp, TrendingDown, DollarSign, CreditCard, Wallet } from "lucide-react";

export function TotalEarningsCard() {
    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 pb-2">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-sm bg-[#a3e635]/10 flex items-center justify-center border border-[#a3e635]/20">
                        <Wallet className="w-4 h-4 text-[#a3e635]" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-white font-display tracking-wide">TOTAL_EARNINGS</h3>
                        <p className="text-[10px] text-zinc-500 font-mono">LIFETIME_REVENUE</p>
                    </div>
                </div>
                <div className="flex gap-1">
                    {['7D', '30D', 'ALL'].map((period) => (
                        <button
                            key={period}
                            className={`px-2 py-1 text-[10px] font-mono rounded-sm border transition-all ${period === 'ALL'
                                ? 'bg-[#a3e635]/10 border-[#a3e635] text-[#a3e635]'
                                : 'bg-transparent border-transparent text-zinc-600 hover:text-white'
                                }`}
                        >
                            {period}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Metric */}
            <div className="px-6 py-4">
                <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-display font-black text-white tracking-tight">$48,294.00</span>
                    <span className="text-zinc-500 text-sm font-mono">USD</span>
                </div>

                <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1 text-[#a3e635] bg-[#a3e635]/10 px-1.5 py-0.5 rounded-[2px] border border-[#a3e635]/20">
                        <TrendingUp className="w-3 h-3" />
                        <span className="text-[10px] font-mono font-bold">+12.5%</span>
                    </div>
                    <span className="text-[10px] text-zinc-500 font-mono">VS_LAST_MONTH</span>
                </div>
            </div>

            {/* Breakdown Grid */}
            <div className="mt-auto grid grid-cols-2 border-t border-white/5">
                <div className="p-4 border-r border-white/5">
                    <div className="text-[10px] text-zinc-500 font-mono mb-1">PENDING_CLEARANCE</div>
                    <div className="text-lg font-bold text-white font-display">$1,250.00</div>
                    <div className="w-full bg-zinc-800 h-1 rounded-full mt-2 overflow-hidden">
                        <div className="bg-yellow-500 h-full w-[45%]"></div>
                    </div>
                </div>
                <div className="p-4">
                    <div className="text-[10px] text-zinc-500 font-mono mb-1">AVAILABLE_FOR_PAYOUT</div>
                    <div className="text-lg font-bold text-[#a3e635] font-display">$4,820.00</div>
                    <div className="w-full bg-zinc-800 h-1 rounded-full mt-2 overflow-hidden">
                        <div className="bg-[#a3e635] h-full w-[80%]"></div>
                    </div>
                </div>
            </div>

            <div className="p-4 border-t border-white/5 bg-white/[0.02]">
                <button className="w-full py-2 bg-[#a3e635] text-black font-bold font-mono text-xs hover:bg-[#b5f555] transition-colors clip-button">
                    WITHDRAW_FUNDS
                </button>
            </div>
        </div>
    );
}
