import { MapPin, User, Globe, Users, Clock, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";

const DEMOGRAPHICS = [
    { label: '18-24', value: 35, color: 'bg-[#a3e635]' },
    { label: '25-34', value: 45, color: 'bg-green-500' },
    { label: '35-44', value: 15, color: 'bg-emerald-600' },
    { label: '45+', value: 5, color: 'bg-teal-700' },
];

const LOCATIONS = [
    { country: 'United States', percent: '42%' },
    { country: 'United Kingdom', percent: '15%' },
    { country: 'Canada', percent: '12%' },
    { country: 'Germany', percent: '8%' },
    { country: 'Japan', percent: '6%' },
];

export function AudienceTab() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Age Distribution */}
                <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-sm">
                    <div className="flex items-center gap-2 mb-6">
                        <User className="w-4 h-4 text-[#a3e635]" />
                        <h3 className="text-xs font-bold text-white font-display tracking-widest uppercase">Age_Breakdown</h3>
                    </div>

                    <div className="space-y-4">
                        {DEMOGRAPHICS.map((demo) => (
                            <div key={demo.label} className="group">
                                <div className="flex justify-between text-[10px] font-mono text-zinc-500 mb-1 group-hover:text-zinc-300 transition-colors">
                                    <span>{demo.label}</span>
                                    <span>{demo.value}%</span>
                                </div>
                                <div className="h-2 bg-zinc-800 rounded-sm overflow-hidden">
                                    <div
                                        className={cn("h-full rounded-sm transition-all duration-1000", demo.color)}
                                        style={{ width: `${demo.value}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Geo Distribution */}
                <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-sm flex flex-col">
                    <div className="flex items-center gap-2 mb-6">
                        <Globe className="w-4 h-4 text-purple-500" />
                        <h3 className="text-xs font-bold text-white font-display tracking-widest uppercase">Top_Locations</h3>
                    </div>

                    <div className="flex-1 space-y-3">
                        {LOCATIONS.map((loc, i) => (
                            <div key={loc.country} className="flex items-center justify-between p-2 hover:bg-zinc-800/50 rounded-sm transition-colors border-b border-zinc-800/50 last:border-0 border-dashed">
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-mono text-zinc-600 w-4">0{i + 1}</span>
                                    <span className="text-xs font-medium text-zinc-300">{loc.country}</span>
                                </div>
                                <div className="text-xs font-bold text-[#a3e635] font-mono">{loc.percent}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Active Time Heatmap (Simplified Visual) */}
            <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-sm">
                <div className="flex items-center gap-2 mb-6">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <h3 className="text-xs font-bold text-white font-display tracking-widest uppercase">Activity_Heatmap</h3>
                </div>

                <div className="grid grid-cols-24 gap-px bg-zinc-900 border border-zinc-800 p-1">
                    {Array.from({ length: 24 * 7 }).map((_, i) => (
                        <div
                            key={i}
                            className={cn(
                                "aspect-[1/2] rounded-[1px] transition-colors hover:ring-1 hover:ring-white/20",
                                Math.random() > 0.7 ? "bg-[#a3e635]/80" :
                                    Math.random() > 0.4 ? "bg-[#a3e635]/30" : "bg-zinc-800/30"
                            )}
                            title="Activity Level"
                        />
                    ))}
                </div>
                <div className="flex justify-between mt-2 text-[9px] font-mono text-zinc-600">
                    <span>00:00</span>
                    <span>12:00</span>
                    <span>23:59</span>
                </div>
            </div>
        </div>
    );
}
