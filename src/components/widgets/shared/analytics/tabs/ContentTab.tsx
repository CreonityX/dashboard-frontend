"use client";

import { Search, Filter, ArrowUpRight, ArrowDownRight, PlayCircle, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const CONTENT_ITEMS = [
    { id: 1, title: "S26 Low-Light Review", creator: "Tech_Nomad", type: "video", platform: "YouTube", views: "892K", engagement: 6.2, conversions: 245, performance: "best" },
    { id: 2, title: "Camera Test Reel", creator: "Sarah_Vfx", type: "video", platform: "Instagram", views: "456K", engagement: 5.8, conversions: 120, performance: "best" },
    { id: 3, title: "Unboxing Experience", creator: "Tech_Nomad", type: "video", platform: "TikTok", views: "1.2M", engagement: 8.4, conversions: 180, performance: "best" },
    { id: 4, title: "Static Ad Creative A", creator: "Pixel_Artisan", type: "image", platform: "Instagram", views: "45K", engagement: 2.1, conversions: 12, performance: "worst" },
    { id: 5, title: "Banner Format Test", creator: "Pixel_Artisan", type: "image", platform: "Instagram", views: "28K", engagement: 1.8, conversions: 8, performance: "worst" },
];

const CONTENT_TYPE_ANALYSIS = [
    { type: "Video (Short-form)", count: 12, avgEngagement: 7.2, avgConversions: 145, bestPerformer: true },
    { type: "Video (Long-form)", count: 6, avgEngagement: 5.4, avgConversions: 89 },
    { type: "Reel / Stories", count: 18, avgEngagement: 4.8, avgConversions: 62 },
    { type: "Static / Carousel", count: 24, avgEngagement: 2.4, avgConversions: 18 },
];

export function ContentTab() {
    const bestPosts = CONTENT_ITEMS.filter(c => c.performance === "best");
    const worstPosts = CONTENT_ITEMS.filter(c => c.performance === "worst");

    return (
        <div className="space-y-6">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-3 p-2 bg-zinc-900/40 border border-zinc-800 rounded-sm">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
                    <input
                        type="text"
                        placeholder="SEARCH_CONTENT_DB..."
                        className="w-full bg-zinc-950/50 border border-zinc-800 rounded-sm pl-9 pr-3 py-2 text-xs text-white font-mono placeholder:text-zinc-700 focus:outline-none focus:border-[#a3e635]/50"
                    />
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-3 py-2 bg-zinc-950/50 border border-zinc-800 hover:bg-zinc-900 rounded-sm text-xs text-zinc-400 font-mono">
                        <Filter className="w-3.5 h-3.5" /> FILTER
                    </button>
                    <button className="px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-xs text-zinc-400 font-mono">TYPE: ALL</button>
                </div>
            </div>

            {/* Best & Worst Performers */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-sm">
                    <h3 className="text-xs font-bold text-zinc-400 font-display tracking-widest uppercase mb-4 flex items-center gap-2">
                        <ArrowUpRight className="w-4 h-4 text-[#a3e635]" /> Best_Performers
                    </h3>
                    <div className="space-y-2">
                        {bestPosts.map(item => (
                            <div key={item.id} className="p-3 bg-zinc-950/50 border border-zinc-800 rounded-sm hover:border-[#a3e635]/30 transition-colors flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={cn("w-10 h-10 rounded-sm flex items-center justify-center", item.type === "video" ? "bg-purple-900/30" : "bg-blue-900/30")}>
                                        {item.type === "video" ? <PlayCircle className="w-4 h-4 text-purple-400" /> : <ImageIcon className="w-4 h-4 text-blue-400" />}
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-white">{item.title}</div>
                                        <div className="text-[10px] text-zinc-500 font-mono">{item.creator} • {item.platform}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs font-bold text-[#a3e635]">{item.views}</div>
                                    <div className="text-[10px] text-zinc-500">{item.engagement}% eng • {item.conversions} conv</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-sm">
                    <h3 className="text-xs font-bold text-zinc-400 font-display tracking-widest uppercase mb-4 flex items-center gap-2">
                        <ArrowDownRight className="w-4 h-4 text-amber-500" /> Underperforming
                    </h3>
                    <div className="space-y-2">
                        {worstPosts.map(item => (
                            <div key={item.id} className="p-3 bg-zinc-950/50 border border-zinc-800 rounded-sm hover:border-amber-500/30 transition-colors flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={cn("w-10 h-10 rounded-sm flex items-center justify-center", item.type === "video" ? "bg-purple-900/30" : "bg-blue-900/30")}>
                                        {item.type === "video" ? <PlayCircle className="w-4 h-4 text-purple-400" /> : <ImageIcon className="w-4 h-4 text-blue-400" />}
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-white">{item.title}</div>
                                        <div className="text-[10px] text-zinc-500 font-mono">{item.creator} • {item.platform}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs font-bold text-amber-500">{item.views}</div>
                                    <div className="text-[10px] text-zinc-500">{item.engagement}% eng • {item.conversions} conv</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content Type Analysis */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-zinc-800 bg-zinc-900/60">
                    <h3 className="text-xs font-bold text-zinc-300 font-display tracking-widest uppercase">Content_Type_Analysis (What_Works_Best)</h3>
                </div>
                <div className="divide-y divide-zinc-800">
                    <div className="grid grid-cols-5 px-4 py-2 bg-zinc-950/30 text-[9px] font-mono text-zinc-500 uppercase">
                        <div>Content Type</div>
                        <div className="text-center">Posts</div>
                        <div className="text-center">Avg. Engagement</div>
                        <div className="text-center">Avg. Conversions</div>
                        <div className="text-center">Recommendation</div>
                    </div>
                    {CONTENT_TYPE_ANALYSIS.map(row => (
                        <div key={row.type} className={cn(
                            "grid grid-cols-5 px-4 py-3 items-center hover:bg-zinc-800/30",
                            row.bestPerformer && "border-l-2 border-l-[#a3e635]"
                        )}>
                            <div className="text-xs font-mono text-zinc-300">{row.type}</div>
                            <div className="text-center text-xs font-mono text-zinc-400">{row.count}</div>
                            <div className="text-center text-xs font-mono text-zinc-400">{row.avgEngagement}%</div>
                            <div className="text-center text-xs font-mono text-zinc-400">{row.avgConversions}</div>
                            <div className="text-center">
                                {row.bestPerformer ? (
                                    <span className="text-[10px] font-mono text-[#a3e635]">↑ Scale this</span>
                                ) : (
                                    <span className="text-[10px] font-mono text-zinc-500">—</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
