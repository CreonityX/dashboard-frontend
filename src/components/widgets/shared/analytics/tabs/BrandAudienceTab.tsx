"use client";

import { User, Globe, Smartphone, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

const DEMOGRAPHICS = [
    { label: '18-24', value: 28, color: 'bg-[#a3e635]' },
    { label: '25-34', value: 42, color: 'bg-green-500' },
    { label: '35-44', value: 20, color: 'bg-emerald-600' },
    { label: '45+', value: 10, color: 'bg-teal-700' },
];

const LOCATIONS = [
    { country: 'United States', percent: '38%' },
    { country: 'United Kingdom', percent: '14%' },
    { country: 'Canada', percent: '11%' },
    { country: 'Germany', percent: '9%' },
    { country: 'Japan', percent: '7%' },
];

const DEVICE_BREAKDOWN = [
    { device: 'Mobile', percent: 62, icon: Smartphone },
    { device: 'Desktop', percent: 28, icon: Monitor },
    { device: 'Tablet', percent: 10, icon: Monitor },
];

export function AudienceTab() {
    return (
        <div className="space-y-6">
            <h2 className="text-xs font-bold text-zinc-500 font-display tracking-widest uppercase">Who_Did_We_Reach?</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Demographics */}
                <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-sm">
                    <div className="flex items-center gap-2 mb-6">
                        <User className="w-4 h-4 text-[#a3e635]" />
                        <h3 className="text-xs font-bold text-white font-display tracking-widest uppercase">Demographics</h3>
                    </div>
                    <div className="space-y-4">
                        {DEMOGRAPHICS.map(demo => (
                            <div key={demo.label} className="group">
                                <div className="flex justify-between text-[10px] font-mono text-zinc-500 mb-1">
                                    <span>{demo.label}</span>
                                    <span>{demo.value}%</span>
                                </div>
                                <div className="h-2 bg-zinc-800 rounded-sm overflow-hidden">
                                    <div className={cn("h-full rounded-sm transition-all", demo.color)} style={{ width: `${demo.value}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Geographic Spread */}
                <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-sm">
                    <div className="flex items-center gap-2 mb-6">
                        <Globe className="w-4 h-4 text-purple-500" />
                        <h3 className="text-xs font-bold text-white font-display tracking-widest uppercase">Geographic_Spread</h3>
                    </div>
                    <div className="space-y-3">
                        {LOCATIONS.map((loc, i) => (
                            <div key={loc.country} className="flex items-center justify-between p-2 hover:bg-zinc-800/50 rounded-sm border-b border-zinc-800/50 last:border-0">
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-mono text-zinc-600 w-4">0{i + 1}</span>
                                    <span className="text-xs font-medium text-zinc-300">{loc.country}</span>
                                </div>
                                <span className="text-xs font-bold text-[#a3e635] font-mono">{loc.percent}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Device Breakdown */}
            <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-sm">
                <div className="flex items-center gap-2 mb-6">
                    <Smartphone className="w-4 h-4 text-blue-500" />
                    <h3 className="text-xs font-bold text-white font-display tracking-widest uppercase">Device_Breakdown</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {DEVICE_BREAKDOWN.map(d => (
                        <div key={d.device} className="p-4 bg-zinc-950/50 border border-zinc-800 rounded-sm flex items-center gap-4">
                            <div className="w-12 h-12 rounded-sm bg-zinc-800 flex items-center justify-center">
                                <d.icon className="w-5 h-5 text-zinc-500" />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-white">{d.device}</div>
                                <div className="text-xl font-bold text-[#a3e635]">{d.percent}%</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Combined Audience Note */}
            <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-sm">
                <h3 className="text-xs font-bold text-zinc-400 font-display tracking-widest uppercase mb-2">Combined_Audience_Insights</h3>
                <p className="text-[11px] text-zinc-500 font-mono">
                    Aggregate across all campaigns. Total unique reach: 4.2M. Estimated overlap (same users across multiple campaigns): ~18%.
                </p>
            </div>
        </div>
    );
}
