import { useMemo, useState } from "react";
import { User, Globe, Clock, Download } from "lucide-react";
import { cn } from "@/lib/utils";

const DEMOGRAPHICS = [
    { label: "18-24", value: 35, color: "bg-[#a3e635]" },
    { label: "25-34", value: 45, color: "bg-green-500" },
    { label: "35-44", value: 15, color: "bg-emerald-600" },
    { label: "45+", value: 5, color: "bg-teal-700" }
];

const LOCATIONS = [
    { country: "United States", percent: "42%" },
    { country: "United Kingdom", percent: "15%" },
    { country: "Canada", percent: "12%" },
    { country: "Germany", percent: "8%" },
    { country: "Japan", percent: "6%" }
];

function seededValue(index: number, weekendBoost: boolean) {
    const base = (index * 9301 + 49297) % 233280;
    const normalized = base / 233280;
    return weekendBoost ? Math.min(1, normalized + 0.15) : normalized;
}

export function AudienceTab() {
    const [mode, setMode] = useState<"weekday" | "weekend">("weekday");

    const heatmapCells = useMemo(() => {
        const weekendBoost = mode === "weekend";
        return Array.from({ length: 24 * 7 }).map((_, index) => seededValue(index, weekendBoost));
    }, [mode]);

    const exportAudienceJson = () => {
        if (typeof window === "undefined") return;
        const payload = {
            demographics: DEMOGRAPHICS,
            locations: LOCATIONS,
            mode,
            generatedAt: new Date().toISOString()
        };
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = "audience-insights.json";
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-end">
                <button
                    onClick={exportAudienceJson}
                    className="px-3 py-1.5 rounded-sm border border-zinc-800 bg-zinc-900 text-[10px] text-zinc-300 hover:text-white hover:border-zinc-700 font-mono uppercase flex items-center gap-2"
                >
                    <Download className="w-3.5 h-3.5" /> Export_Audience
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                                    <div className={cn("h-full rounded-sm transition-all duration-1000", demo.color)} style={{ width: `${demo.value}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-sm flex flex-col">
                    <div className="flex items-center gap-2 mb-6">
                        <Globe className="w-4 h-4 text-cyan-400" />
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

            <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-sm">
                <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <h3 className="text-xs font-bold text-white font-display tracking-widest uppercase">Activity_Heatmap</h3>
                    </div>

                    <button
                        onClick={() => setMode((current) => (current === "weekday" ? "weekend" : "weekday"))}
                        className="px-3 py-1.5 rounded-sm border border-zinc-800 bg-zinc-900 text-[10px] text-zinc-300 hover:text-white hover:border-zinc-700 font-mono uppercase"
                    >
                        Mode: {mode.toUpperCase()}
                    </button>
                </div>

                <div className="grid grid-cols-24 gap-px bg-zinc-900 border border-zinc-800 p-1">
                    {heatmapCells.map((value, i) => (
                        <div
                            key={i}
                            className={cn(
                                "aspect-[1/2] rounded-[1px] transition-colors hover:ring-1 hover:ring-white/20",
                                value > 0.72 ? "bg-[#a3e635]/80" : value > 0.42 ? "bg-[#a3e635]/30" : "bg-zinc-800/30"
                            )}
                            title={`Activity ${(value * 100).toFixed(0)}%`}
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
