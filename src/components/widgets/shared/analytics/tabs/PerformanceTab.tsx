import { Search, Filter, PlayCircle, Image as ImageIcon, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

const PERFORMANCE_ITEMS = [
    { id: 1, title: "Cyberpunk Aesthetics Review", date: "Feb 12, 2026", type: "video", platform: "YouTube", views: "45.2K", engagement: 4.8, earnings: "$1,200", thumbnail: "bg-purple-900/20", isCampaign: false, brand: null },
    { id: 2, title: "Neon City Photography Tips", date: "Feb 10, 2026", type: "image", platform: "Instagram", views: "12.5K", engagement: 6.2, earnings: "$450", thumbnail: "bg-blue-900/20", isCampaign: false, brand: null },
    { id: 3, title: "Air Max Launch Reel", date: "Feb 08, 2026", type: "video", platform: "TikTok", views: "1.2M", engagement: 8.4, earnings: "$4,500", thumbnail: "bg-green-900/20", isCampaign: true, brand: "Nike" },
    { id: 4, title: "Coding ASMR - Night Mode", date: "Feb 05, 2026", type: "video", platform: "YouTube", views: "22.3K", engagement: 3.9, earnings: "$600", thumbnail: "bg-zinc-800", isCampaign: false, brand: null },
    { id: 5, title: "Galaxy Unpacked First Look", date: "Feb 02, 2026", type: "video", platform: "TikTok", views: "2.5M", engagement: 9.1, earnings: "$8,500", thumbnail: "bg-red-900/20", isCampaign: true, brand: "Samsung" },
    { id: 6, title: "Workspace Essentials", date: "Jan 28, 2026", type: "image", platform: "Instagram", views: "18.2K", engagement: 5.5, earnings: "$550", thumbnail: "bg-orange-900/20", isCampaign: false, brand: null },
    { id: 7, title: "Alpha Camera Promo", date: "Jan 25, 2026", type: "video", platform: "YouTube", views: "500K", engagement: 8.5, earnings: "$3,200", thumbnail: "bg-zinc-900/40", isCampaign: true, brand: "Sony" },
];

export function PerformanceTab() {
    const [query, setQuery] = useState("");
    const [highEngagementOnly, setHighEngagementOnly] = useState(false);
    const [platformFilter, setPlatformFilter] = useState<"all" | "Instagram" | "YouTube" | "TikTok">("all");
    const [selectedItem, setSelectedItem] = useState<(typeof PERFORMANCE_ITEMS)[number] | null>(null);

    const filteredItems = useMemo(() => {
        const lowered = query.trim().toLowerCase();
        return PERFORMANCE_ITEMS.filter((item) => {
            const queryMatch =
                lowered.length === 0
                || item.title.toLowerCase().includes(lowered)
                || item.platform.toLowerCase().includes(lowered)
                || (item.brand && item.brand.toLowerCase().includes(lowered));
            const engagementMatch = !highEngagementOnly || item.engagement >= 6;
            const platformMatch = platformFilter === "all" || item.platform === platformFilter;
            return queryMatch && engagementMatch && platformMatch;
        });
    }, [highEngagementOnly, platformFilter, query]);

    const cyclePlatform = () => {
        setPlatformFilter((current) => {
            if (current === "all") return "Instagram";
            if (current === "Instagram") return "YouTube";
            if (current === "YouTube") return "TikTok";
            return "all";
        });
    };

    return (
        <div className="space-y-6">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-3 p-1 bg-zinc-900/40 border border-zinc-800 rounded-sm">
                {/* Search */}
                <div className="flex-1 relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                    <input
                        type="text"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="SEARCH_CONTENT_DB..."
                        className="w-full bg-zinc-950/50 border border-zinc-800 rounded-sm pl-9 pr-3 py-2 text-xs text-white font-mono placeholder:text-zinc-700 focus:outline-none focus:border-[#a3e635]/50 transition-colors"
                    />
                </div>

                {/* Filters */}
                <div className="flex gap-2">
                    <button
                        onClick={() => setHighEngagementOnly((current) => !current)}
                        className={cn(
                            "flex items-center gap-2 px-3 py-2 border rounded-sm text-xs font-mono transition-colors",
                            highEngagementOnly
                                ? "bg-[#a3e635]/10 border-[#a3e635]/30 text-[#a3e635]"
                                : "bg-zinc-950/50 border-zinc-800 hover:bg-zinc-900 text-zinc-400"
                        )}
                    >
                        <Filter className="w-3.5 h-3.5" />
                        {highEngagementOnly ? "HIGH_ENGAGEMENT" : "FILTER"}
                    </button>
                    <button
                        onClick={cyclePlatform}
                        className="flex items-center gap-2 px-3 py-2 bg-zinc-950/50 border border-zinc-800 hover:bg-zinc-900 rounded-sm text-xs text-zinc-400 font-mono transition-colors"
                    >
                        PLATFORM: {platformFilter.toUpperCase()}
                    </button>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {filteredItems.map((item) => (
                    <div key={item.id} className={cn(
                        "group bg-zinc-900/40 border hover:border-zinc-600 rounded-sm overflow-hidden transition-all duration-300 relative",
                        item.isCampaign ? "border-[#a3e635]/30 shadow-[0_0_10px_rgba(163,230,53,0.05)]" : "border-zinc-800"
                    )}>
                        {/* Thumbnail */}
                        <div className={cn("h-32 w-full relative", item.thumbnail)}>
                            <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded-[2px] border border-white/10 text-[9px] font-mono text-white uppercase flex items-center gap-1">
                                {item.type === 'video' ? <PlayCircle className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                                {item.platform}
                            </div>
                            
                            {item.isCampaign && (
                                <div className="absolute top-2 left-2 px-2 py-1 bg-[#a3e635]/90 backdrop-blur-md rounded-[2px] border border-[#a3e635] text-[9px] font-bold font-mono text-black uppercase flex items-center gap-1 shadow-lg">
                                    <Briefcase className="w-3 h-3" />
                                    {item.brand}
                                </div>
                            )}

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-sm cursor-pointer" onClick={() => setSelectedItem(item)}>
                                <button className="px-3 py-1.5 bg-[#a3e635] text-black text-[10px] font-bold font-mono rounded-[2px] uppercase">
                                    View_Details
                                </button>
                            </div>
                        </div>

                        {/* Details */}
                        <div className="p-4 space-y-3">
                            <div>
                                <h3 className="text-sm font-bold text-white font-display truncate">{item.title}</h3>
                                <p className="text-[10px] text-zinc-500 font-mono mt-0.5">{item.date}</p>
                            </div>

                            {/* Metrics Row */}
                            <div className="grid grid-cols-3 gap-2 py-2 border-t border-zinc-800/50">
                                <div className="text-center group/metric">
                                    <div className="text-[9px] text-zinc-600 font-mono mb-0.5 uppercase tracking-wider group-hover/metric:text-[#a3e635] transition-colors">Views</div>
                                    <div className="text-xs font-bold text-zinc-300">{item.views}</div>
                                </div>
                                <div className="text-center group/metric bg-white/5 rounded-sm">
                                    <div className="text-[9px] text-zinc-600 font-mono mb-0.5 uppercase tracking-wider group-hover/metric:text-[#a3e635] transition-colors">Engage</div>
                                    <div className="text-xs font-bold text-zinc-300">{item.engagement}%</div>
                                </div>
                                <div className="text-center group/metric">
                                    <div className="text-[9px] text-zinc-600 font-mono mb-0.5 uppercase tracking-wider group-hover/metric:text-[#a3e635] transition-colors">Earned</div>
                                    <div className="text-xs font-bold text-[#a3e635]">{item.earnings}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredItems.length === 0 && (
                <div className="rounded-sm border border-zinc-800 bg-zinc-900/50 p-8 text-center text-zinc-400 text-sm">
                    No content matches your current filters.
                </div>
            )}

            {selectedItem && (
                <div
                    className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-[2px] p-4 flex items-center justify-center animate-in fade-in duration-200"
                    onClick={() => setSelectedItem(null)}
                >
                    <div
                        className="w-full max-w-lg rounded-sm border border-zinc-700 bg-zinc-900/95 p-6 shadow-2xl animate-in zoom-in-95 duration-200"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                {selectedItem.isCampaign && (
                                    <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#a3e635]/20 text-[#a3e635] border border-[#a3e635]/30 rounded-sm text-[10px] font-bold font-mono uppercase mb-2">
                                        <Briefcase className="w-3 h-3" />
                                        Campaign: {selectedItem.brand}
                                    </div>
                                )}
                                <h4 className="text-lg font-bold text-white font-display">{selectedItem.title}</h4>
                                <p className="text-xs text-zinc-500 font-mono mt-1">{selectedItem.platform} - {selectedItem.date}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3 mt-6">
                            <div className="rounded-sm border border-zinc-800 p-4 bg-zinc-950/60">
                                <div className="text-xs text-zinc-500 font-mono uppercase tracking-wider">Views</div>
                                <div className="text-xl text-white font-bold mt-1 font-display">{selectedItem.views}</div>
                            </div>
                            <div className="rounded-sm border border-zinc-800 p-4 bg-zinc-950/60">
                                <div className="text-xs text-zinc-500 font-mono uppercase tracking-wider">Engagement</div>
                                <div className="text-xl text-white font-bold mt-1 font-display">{selectedItem.engagement}%</div>
                            </div>
                            <div className="rounded-sm border border-zinc-800 p-4 bg-zinc-950/60 border-b-2 border-b-[#a3e635]/50">
                                <div className="text-xs text-zinc-500 font-mono uppercase tracking-wider">Earnings</div>
                                <div className="text-xl text-[#a3e635] font-bold mt-1 font-display">{selectedItem.earnings}</div>
                            </div>
                        </div>
                        
                        {selectedItem.isCampaign && (
                            <div className="mt-6 p-4 border border-[#a3e635]/20 bg-[#a3e635]/5 rounded-sm">
                                <h5 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-2">Campaign ROI Analytics</h5>
                                <div className="flex gap-6">
                                    <div>
                                        <div className="text-[10px] text-zinc-500 font-mono">Est. ROI</div>
                                        <div className="text-sm font-bold text-[#a3e635]">+340%</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-zinc-500 font-mono">Conversions</div>
                                        <div className="text-sm font-bold text-white">452</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-zinc-800">
                            <button
                                onClick={() => setSelectedItem(null)}
                                className="px-4 py-2 border border-zinc-700 bg-zinc-800/50 rounded-sm text-xs font-bold text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
                            >
                                CLOSE
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
