import { TrendingUp, PieChart, Users, Megaphone } from "lucide-react";

export function SpendTracker() {
    return (
        <div className="flex flex-col h-full p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold text-white font-display tracking-wide">SPEND_TRACKER</h3>
                <span className="text-[10px] font-mono text-zinc-500">Q4_2026_BUDGET</span>
            </div>

            {/* Main Gauge */}
            <div className="relative pt-2 pb-6">
                <div className="flex justify-between items-end mb-2">
                    <div className="text-3xl font-display font-black text-white tracking-tight">$84,200.00</div>
                    <div className="text-xs font-mono text-zinc-500 mb-1">OF $100k</div>
                </div>
                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-500 h-full w-[84%] shadow-[0_0_15px_rgba(168,85,247,0.4)]"></div>
                </div>
                <div className="flex justify-between mt-2 text-[10px] font-mono text-zinc-500">
                    <span>84% UTILIZED</span>
                    <span className="text-[#a3e635]">ON_TRACK</span>
                </div>
            </div>

            {/* Categories */}
            <div className="flex-1 flex flex-col justify-center gap-4 py-2 border-t border-white/5 min-h-0 overflow-hidden">
                <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                        <span className="flex items-center gap-2 text-zinc-400">
                            <Users className="w-3 h-3" /> CREATOR_PAYOUTS
                        </span>
                        <span className="text-white">$62.5k</span>
                    </div>
                    <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                        <div className="bg-blue-400 h-full w-[70%]"></div>
                    </div>
                </div>

                <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                        <span className="flex items-center gap-2 text-zinc-400">
                            <Megaphone className="w-3 h-3" /> AD_BOOSTS
                        </span>
                        <span className="text-white">$15.2k</span>
                    </div>
                    <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                        <div className="bg-pink-500 h-full w-[25%]"></div>
                    </div>
                </div>
            </div>

            <div className="pt-2 flex gap-2 shrink-0">
                <div className="flex-1 p-2 bg-zinc-900/50 border border-zinc-800 rounded-sm">
                    <div className="text-[10px] text-zinc-500 font-mono">CPA (AVG)</div>
                    <div className="text-sm font-bold text-white">$4.25</div>
                </div>
                <div className="flex-1 p-2 bg-zinc-900/50 border border-zinc-800 rounded-sm">
                    <div className="text-[10px] text-zinc-500 font-mono">ROAS</div>
                    <div className="text-sm font-bold text-[#a3e635] flex items-center gap-1">
                        3.2x <TrendingUp className="w-3 h-3" />
                    </div>
                </div>
            </div>
        </div>
    );
}
