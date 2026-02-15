import { Search, Filter, ArrowUpRight, MessageSquare, Share2, Heart, Eye, PlayCircle, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const CONTENT_ITEMS = [
    { id: 1, title: "Cyberpunk Aesthetics Review", date: "Feb 12, 2026", type: "video", platform: "YouTube", views: "45.2K", engagement: 4.8, earnings: "$1,200", thumbnail: "bg-purple-900/20" },
    { id: 2, title: "Neon City Photography Tips", date: "Feb 10, 2026", type: "image", platform: "Instagram", views: "12.5K", engagement: 6.2, earnings: "$450", thumbnail: "bg-blue-900/20" },
    { id: 3, title: "Tech Setup Tour 2026", date: "Feb 08, 2026", type: "video", platform: "TikTok", views: "89.1K", engagement: 8.4, earnings: "$800", thumbnail: "bg-green-900/20" },
    { id: 4, title: "Coding ASMR - Night Mode", date: "Feb 05, 2026", type: "video", platform: "YouTube", views: "22.3K", engagement: 3.9, earnings: "$600", thumbnail: "bg-zinc-800" },
    { id: 5, title: "Hidden Mac Tricks", date: "Feb 02, 2026", type: "video", platform: "TikTok", views: "150K", engagement: 9.1, earnings: "$1,500", thumbnail: "bg-red-900/20" },
    { id: 6, title: "Workspace Essentials", date: "Jan 28, 2026", type: "image", platform: "Instagram", views: "18.2K", engagement: 5.5, earnings: "$550", thumbnail: "bg-orange-900/20" },
];

export function ContentTab() {
    return (
        <div className="space-y-6">
            {/* Header & Controls */}
            <div className="flex flex-col gap-4">
                <div>
                    <h2 className="text-lg font-bold text-white font-display tracking-wide">CONTENT_LIBRARY</h2>
                    <p className="text-zinc-500 font-mono text-xs">ARCHIVE // {CONTENT_ITEMS.length}_ITEMS_INDEXED</p>
                </div>

                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row gap-3 p-1 bg-zinc-900/40 border border-zinc-800 rounded-sm">
                    {/* Search */}
                    <div className="flex-1 relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                        <input
                            type="text"
                            placeholder="SEARCH_CONTENT_DB..."
                            className="w-full bg-zinc-950/50 border border-zinc-800 rounded-sm pl-9 pr-3 py-2 text-xs text-white font-mono placeholder:text-zinc-700 focus:outline-none focus:border-[#a3e635]/50 transition-colors"
                        />
                    </div>

                    {/* Filters */}
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-3 py-2 bg-zinc-950/50 border border-zinc-800 hover:bg-zinc-900 rounded-sm text-xs text-zinc-400 font-mono transition-colors">
                            <Filter className="w-3.5 h-3.5" />
                            FILTER
                        </button>
                        <button className="flex items-center gap-2 px-3 py-2 bg-zinc-950/50 border border-zinc-800 hover:bg-zinc-900 rounded-sm text-xs text-zinc-400 font-mono transition-colors">
                            PLATFORM: ALL
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {CONTENT_ITEMS.map((item) => (
                    <div key={item.id} className="group bg-zinc-900/40 border border-zinc-800 hover:border-zinc-600 rounded-sm overflow-hidden transition-all duration-300">
                        {/* Thumbnail */}
                        <div className={cn("h-32 w-full relative", item.thumbnail)}>
                            <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded-[2px] border border-white/10 text-[9px] font-mono text-white uppercase flex items-center gap-1">
                                {item.type === 'video' ? <PlayCircle className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                                {item.platform}
                            </div>

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-sm">
                                <button className="px-3 py-1.5 bg-[#a3e635] text-black text-[10px] font-bold font-mono rounded-[2px] uppercase">
                                    View_Stats
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
        </div>
    );
}
