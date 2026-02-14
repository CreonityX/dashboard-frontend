"use client";

import { Play, Heart, MessageCircle, BarChart2 } from "lucide-react";

export function ContentTopList() {
    const content = [
        { id: 1, title: "Cyberpunk City Walk 2077", views: "1.2M", likes: "85K", type: "VIDEO" },
        { id: 2, title: "Neon Light Setup Guide", views: "850K", likes: "42K", type: "SHORT" },
        { id: 3, title: "Mechanical Keyboard Review", views: "620K", likes: "38K", type: "VIDEO" },
        { id: 4, title: "Desk Setup Tour v4", views: "410K", likes: "29K", type: "POST" },
    ];

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 pb-2">
                <h3 className="text-sm font-bold text-white font-display tracking-wide">TOP_CONTENT</h3>
                <button className="text-[10px] text-zinc-500 hover:text-white font-mono transition-colors">VIEW_ALL</button>
            </div>

            <div className="flex-1 overflow-auto px-6 pb-6 space-y-3">
                {content.map((item, i) => (
                    <div key={item.id} className="group flex items-center gap-3 p-2 hover:bg-white/[0.02] rounded-sm transition-colors cursor-pointer border border-transparent hover:border-white/5">
                        {/* Rank */}
                        <div className="font-mono text-zinc-600 text-xs font-bold w-4">{i + 1}</div>

                        {/* Thumbnail Placeholder */}
                        <div className="w-10 h-10 bg-zinc-800 rounded-sm flex items-center justify-center relative overflow-hidden group-hover:ring-1 ring-white/20">
                            {item.type === 'VIDEO' ? <Play className="w-4 h-4 text-zinc-500" /> : <BarChart2 className="w-4 h-4 text-zinc-500" />}
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent" />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold text-zinc-300 truncate group-hover:text-white transition-colors font-mono">{item.title}</div>
                            <div className="flex items-center gap-3 mt-1">
                                <span className="flex items-center gap-1 text-[10px] text-zinc-500">
                                    <Play className="w-2 h-2" /> {item.views}
                                </span>
                                <span className="flex items-center gap-1 text-[10px] text-zinc-500">
                                    <Heart className="w-2 h-2" /> {item.likes}
                                </span>
                            </div>
                        </div>

                        {/* Action */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1.5 hover:bg-[#a3e635] hover:text-black rounded-[2px] text-zinc-500 transition-colors">
                                <BarChart2 className="w-3 h-3" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
