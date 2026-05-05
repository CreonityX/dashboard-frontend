import { Search, Filter, PlayCircle, Image as ImageIcon, Briefcase, X, TrendingUp, BarChart3, Users, ChevronRight, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

const PERFORMANCE_ITEMS = [
    { id: 1, title: "Cyberpunk Aesthetics Review", date: "Feb 12, 2026", type: "video", platform: "YouTube", views: "45.2K", engagement: 4.8, earnings: "$1,200", thumbnail: "bg-gradient-to-br from-purple-900/60 via-indigo-950 to-black", isCampaign: false, brand: null },
    { id: 2, title: "Neon City Photography Tips", date: "Feb 10, 2026", type: "image", platform: "Instagram", views: "12.5K", engagement: 6.2, earnings: "$450", thumbnail: "bg-gradient-to-tr from-emerald-900/60 via-teal-950 to-black", isCampaign: false, brand: null },
    { id: 3, title: "Air Max Launch Reel", date: "Feb 08, 2026", type: "video", platform: "TikTok", views: "1.2M", engagement: 8.4, earnings: "$4,500", thumbnail: "bg-gradient-to-bl from-rose-900/60 via-red-950 to-black", isCampaign: true, brand: "Nike" },
    { id: 4, title: "Coding ASMR - Night Mode", date: "Feb 05, 2026", type: "video", platform: "YouTube", views: "22.3K", engagement: 3.9, earnings: "$600", thumbnail: "bg-gradient-to-tl from-amber-900/60 via-orange-950 to-black", isCampaign: false, brand: null },
    { id: 5, title: "Galaxy Unpacked First Look", date: "Feb 02, 2026", type: "video", platform: "TikTok", views: "2.5M", engagement: 9.1, earnings: "$8,500", thumbnail: "bg-gradient-to-br from-blue-900/60 via-cyan-950 to-black", isCampaign: true, brand: "Samsung" },
    { id: 6, title: "Workspace Essentials", date: "Jan 28, 2026", type: "image", platform: "Instagram", views: "18.2K", engagement: 5.5, earnings: "$550", thumbnail: "bg-gradient-to-tr from-fuchsia-900/60 via-pink-950 to-black", isCampaign: false, brand: null },
    { id: 7, title: "Alpha Camera Promo", date: "Jan 25, 2026", type: "video", platform: "YouTube", views: "500K", engagement: 8.5, earnings: "$3,200", thumbnail: "bg-gradient-to-bl from-zinc-800 via-zinc-950 to-black", isCampaign: true, brand: "Sony" },
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
                        <div className={cn("h-48 w-full relative", item.thumbnail)}>
                            <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded-sm border border-white/10 text-[10px] font-mono text-white uppercase flex items-center gap-1.5">
                                {item.type === 'video' ? <PlayCircle className="w-3.5 h-3.5" /> : <ImageIcon className="w-3.5 h-3.5" />}
                                {item.platform}
                            </div>
                            
                            {item.isCampaign && (
                                <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#a3e635]/90 backdrop-blur-md rounded-sm border border-[#a3e635] text-[10px] font-bold font-mono text-black uppercase flex items-center gap-1.5 shadow-lg">
                                    <Briefcase className="w-3.5 h-3.5" />
                                    {item.brand}
                                </div>
                            )}

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px] cursor-pointer" onClick={() => setSelectedItem(item)}>
                                <button className="flex items-center gap-2 px-4 py-2 bg-[#a3e635] text-black text-xs font-bold font-mono rounded-sm uppercase hover:bg-[#b4f046] transition-colors hover-lift">
                                    View_Analytics <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Details */}
                        <div className="p-5 space-y-4">
                            <div>
                                <h3 className="text-base font-bold text-white font-display truncate">{item.title}</h3>
                                <p className="text-xs text-zinc-500 font-mono mt-1 uppercase tracking-wider">{item.date}</p>
                            </div>

                            {/* Metrics Row */}
                            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-zinc-800/60">
                                <div className="group/metric">
                                    <div className="text-[10px] text-zinc-500 font-mono mb-1 uppercase tracking-wider group-hover/metric:text-white transition-colors">Views</div>
                                    <div className="text-sm font-bold text-white font-mono">{item.views}</div>
                                </div>
                                <div className="group/metric">
                                    <div className="text-[10px] text-zinc-500 font-mono mb-1 uppercase tracking-wider group-hover/metric:text-white transition-colors">Engage</div>
                                    <div className="text-sm font-bold text-white font-mono">{item.engagement}%</div>
                                </div>
                                <div className="group/metric pl-3 border-l border-zinc-800/60">
                                    <div className="text-[10px] text-[#a3e635]/70 font-mono mb-1 uppercase tracking-wider group-hover/metric:text-[#a3e635] transition-colors">Earned</div>
                                    <div className="text-sm font-bold text-[#a3e635] font-mono">{item.earnings}</div>
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

            {/* Slide-in Details Panel */}
            {selectedItem && (
                <div className="fixed inset-0 z-[60] flex justify-end">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
                        onClick={() => setSelectedItem(null)}
                    />
                    
                    {/* Drawer */}
                    <div className="relative w-full max-w-2xl bg-zinc-950 border-l border-zinc-800 h-full flex flex-col animate-in slide-in-from-right duration-300 shadow-2xl">
                        {/* Drawer Header */}
                        <div className="flex items-center justify-between p-6 border-b border-zinc-800 bg-zinc-900/50">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="px-2 py-1 bg-zinc-800 text-zinc-300 text-[10px] font-bold font-mono uppercase rounded-sm border border-zinc-700 flex items-center gap-1.5">
                                        {selectedItem.type === 'video' ? <PlayCircle className="w-3.5 h-3.5" /> : <ImageIcon className="w-3.5 h-3.5" />}
                                        {selectedItem.platform}
                                    </span>
                                    {selectedItem.isCampaign && (
                                        <span className="px-2 py-1 bg-[#a3e635]/10 text-[#a3e635] text-[10px] font-bold font-mono uppercase rounded-sm border border-[#a3e635]/20 flex items-center gap-1.5">
                                            <Briefcase className="w-3.5 h-3.5" />
                                            {selectedItem.brand} Campaign
                                        </span>
                                    )}
                                </div>
                                <h2 className="text-2xl font-bold text-white font-display">{selectedItem.title}</h2>
                                <p className="text-sm text-zinc-500 font-mono mt-1">Published on {selectedItem.date}</p>
                            </div>
                            <button 
                                onClick={() => setSelectedItem(null)}
                                className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-sm transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Drawer Content */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
                            
                            {/* Rich Media Hero */}
                            <div className={cn("w-full h-64 rounded-sm border border-zinc-800 flex items-center justify-center relative overflow-hidden group", selectedItem.thumbnail)}>
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                                <button className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-105 transition-all">
                                    <PlayCircle className="w-8 h-8" />
                                </button>
                            </div>

                            {/* Core Metrics */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="p-5 rounded-sm border border-zinc-800 bg-zinc-900/30">
                                    <div className="flex items-center gap-2 text-zinc-400 mb-2">
                                        <Activity className="w-4 h-4" />
                                        <span className="text-xs font-mono uppercase">Total Views</span>
                                    </div>
                                    <div className="text-3xl font-display font-bold text-white">{selectedItem.views}</div>
                                    <div className="text-[10px] font-mono text-[#a3e635] mt-2 flex items-center gap-1">
                                        <TrendingUp className="w-3 h-3" /> +12.5% this week
                                    </div>
                                </div>
                                <div className="p-5 rounded-sm border border-zinc-800 bg-zinc-900/30">
                                    <div className="flex items-center gap-2 text-zinc-400 mb-2">
                                        <Users className="w-4 h-4" />
                                        <span className="text-xs font-mono uppercase">Engagement</span>
                                    </div>
                                    <div className="text-3xl font-display font-bold text-white">{selectedItem.engagement}%</div>
                                    <div className="text-[10px] font-mono text-zinc-500 mt-2">Top 5% of your content</div>
                                </div>
                                <div className="p-5 rounded-sm border border-[#a3e635]/20 bg-[#a3e635]/5">
                                    <div className="flex items-center gap-2 text-[#a3e635]/80 mb-2">
                                        <BarChart3 className="w-4 h-4" />
                                        <span className="text-xs font-mono uppercase">Earnings</span>
                                    </div>
                                    <div className="text-3xl font-display font-bold text-[#a3e635]">{selectedItem.earnings}</div>
                                    <div className="text-[10px] font-mono text-zinc-500 mt-2">Paid directly to wallet</div>
                                </div>
                            </div>

                            {/* Chart Mockup */}
                            <div>
                                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider mb-4 flex items-center gap-2">
                                    Performance Over Time
                                </h3>
                                <div className="h-48 rounded-sm border border-zinc-800 bg-zinc-900/30 p-4 relative flex items-end gap-2">
                                    {/* Mock Bars */}
                                    {[30, 45, 25, 60, 75, 40, 55, 90, 65, 80, 50, 70, 100, 85].map((h, i) => (
                                        <div key={i} className="flex-1 bg-zinc-800 hover:bg-[#a3e635] rounded-t-[2px] transition-colors group/bar relative" style={{ height: `${h}%` }}>
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-950 border border-zinc-700 text-white text-[9px] font-mono px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 pointer-events-none z-10 transition-opacity">
                                                {h}k
                                            </div>
                                        </div>
                                    ))}
                                    {/* Chart Grid Lines */}
                                    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4">
                                        {[1,2,3,4].map(i => <div key={i} className="w-full border-t border-zinc-800/50" />)}
                                    </div>
                                </div>
                            </div>

                            {/* Campaign ROI Details */}
                            {selectedItem.isCampaign && (
                                <div className="p-6 rounded-sm border border-zinc-800 bg-gradient-to-br from-zinc-900/50 to-zinc-950 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-32 bg-[#a3e635]/5 blur-3xl rounded-full pointer-events-none" />
                                    
                                    <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider mb-6 flex items-center gap-2 relative z-10">
                                        <Briefcase className="w-4 h-4 text-[#a3e635]" />
                                        Campaign ROI Breakdown
                                    </h3>
                                    
                                    <div className="grid grid-cols-2 gap-6 relative z-10">
                                        <div>
                                            <div className="text-[10px] text-zinc-500 font-mono uppercase mb-1">Click-Through Rate</div>
                                            <div className="text-xl font-bold text-white font-mono">4.2%</div>
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-zinc-500 font-mono uppercase mb-1">Conversion Tracking</div>
                                            <div className="text-xl font-bold text-white font-mono">452 Sales</div>
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-zinc-500 font-mono uppercase mb-1">Est. Client ROI</div>
                                            <div className="text-xl font-bold text-[#a3e635] font-mono">+340%</div>
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-zinc-500 font-mono uppercase mb-1">Performance Bonus</div>
                                            <div className="text-xl font-bold text-white font-mono">Unlocked</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
