"use client";

import { BarChart3, FileText, Download } from "lucide-react";
import { cn } from "@/lib/utils";

const REPORT_TYPES = [
    { id: 'monthly', label: 'Monthly Spend Summary', desc: 'Breakdown by month and campaign' },
    { id: 'roi', label: 'ROI Report by Campaign', desc: 'Campaign performance vs spend' },
    { id: 'cpa', label: 'Cost per Acquisition', desc: 'CPA by campaign and creator' },
    { id: 'cpe', label: 'Cost per Engagement', desc: 'CPE by platform and content type' },
    { id: 'yearend', label: 'Year-End Financial Summary', desc: 'Annual spend, tax prep' },
    { id: 'tax', label: 'Tax Documentation', desc: '1099s, expense summaries' },
];

export function ReportsTab() {
    return (
        <div className="space-y-6">
            <h2 className="text-xs font-bold text-zinc-500 font-display tracking-widest uppercase">Financial_Reports</h2>

            {/* Report Types */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {REPORT_TYPES.map(r => (
                    <div
                        key={r.id}
                        className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-sm hover:border-zinc-600 transition-colors group cursor-pointer"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="w-10 h-10 bg-zinc-800 rounded-sm flex items-center justify-center group-hover:bg-[#a3e635]/10 transition-colors">
                                <BarChart3 className="w-4 h-4 text-zinc-500 group-hover:text-[#a3e635] transition-colors" />
                            </div>
                            <button className="p-1.5 hover:bg-zinc-800 rounded-sm text-zinc-500 opacity-0 group-hover:opacity-100 transition-all">
                                <Download className="w-3.5 h-3.5" />
                            </button>
                        </div>
                        <div className="text-xs font-bold text-white mb-1">{r.label}</div>
                        <div className="text-[10px] text-zinc-500 font-mono">{r.desc}</div>
                    </div>
                ))}
            </div>

            {/* Quick Stats */}
            <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-sm">
                <h3 className="text-xs font-bold text-zinc-400 font-display tracking-widest uppercase mb-4">Report_Preview</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                        <div className="text-[10px] text-zinc-600 font-mono uppercase">Monthly Spend (Jan)</div>
                        <div className="text-lg font-bold text-white">$8,200</div>
                    </div>
                    <div>
                        <div className="text-[10px] text-zinc-600 font-mono uppercase">Avg. ROI</div>
                        <div className="text-lg font-bold text-[#a3e635]">385%</div>
                    </div>
                    <div>
                        <div className="text-[10px] text-zinc-600 font-mono uppercase">Cost/Acquisition</div>
                        <div className="text-lg font-bold text-white">$20.73</div>
                    </div>
                    <div>
                        <div className="text-[10px] text-zinc-600 font-mono uppercase">Cost/Engagement</div>
                        <div className="text-lg font-bold text-white">$0.057</div>
                    </div>
                </div>
            </div>

            {/* Export Options */}
            <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-sm">
                <h3 className="text-xs font-bold text-zinc-400 font-display tracking-widest uppercase mb-4">Export_Format</h3>
                <div className="flex flex-wrap gap-2">
                    {['PDF', 'Excel', 'CSV'].map(fmt => (
                        <button
                            key={fmt}
                            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-sm text-xs font-mono text-zinc-400 hover:border-[#a3e635]/50 hover:text-[#a3e635] transition-colors"
                        >
                            <Download className="w-3.5 h-3.5" /> {fmt}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
