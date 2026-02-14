"use client";

import { BarChart, TrendingUp } from "lucide-react";

export function CampaignComparison() {
    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 pb-2">
                <h3 className="text-sm font-bold text-white font-display tracking-wide">CAMPAIGN_VS</h3>
                <div className="flex gap-2">
                    <div className="flex items-center gap-1 text-[9px] font-mono text-zinc-500">
                        <div className="w-2 h-2 bg-[#a3e635] rounded-[1px]" /> Q3
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-mono text-zinc-500">
                        <div className="w-2 h-2 bg-zinc-600 rounded-[1px]" /> Q4
                    </div>
                </div>
            </div>

            <div className="flex-1 px-6 pb-4 flex items-end gap-4">
                {/* Chart Columns */}
                {['ROAS', 'CTR', 'CPA', 'CONV'].map((metric, i) => (
                    <div key={metric} className="flex-1 flex flex-col justify-end gap-1 h-32 group cursor-pointer">
                        {/* Value Hint */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-center text-[10px] font-mono text-white mb-1">
                            {i === 0 ? '3.5x' : i === 1 ? '1.2%' : i === 2 ? '$4' : '2.1%'}
                        </div>

                        <div className="flex gap-1 items-end h-full">
                            <div
                                className="flex-1 bg-zinc-700 hover:bg-zinc-600 transition-colors rounded-t-[1px]"
                                style={{ height: `${[40, 60, 30, 50][i]}%` }}
                            />
                            <div
                                className="flex-1 bg-[#a3e635] hover:bg-[#b5f555] transition-colors rounded-t-[1px]"
                                style={{ height: `${[65, 75, 20, 80][i]}%` }} // CPA is lower is better, so maybe inverse? keeping simple visual height = good for now
                            />
                        </div>
                        <div className="text-[10px] font-mono text-zinc-500 text-center border-t border-white/10 pt-1 group-hover:text-white transition-colors">{metric}</div>
                    </div>
                ))}
            </div>

            <div className="px-6 pb-6 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#a3e635]/10 border border-[#a3e635]/20 rounded-full">
                    <TrendingUp className="w-3 h-3 text-[#a3e635]" />
                    <span className="text-[10px] font-mono text-[#a3e635] font-bold">Q4 OUTPERFORMING BY 22%</span>
                </div>
            </div>
        </div>
    );
}
