import { useState } from "react";
import { cn } from "@/lib/utils";
import { Instagram, Youtube, Twitter, Facebook, TrendingUp, Users, Eye, MousePointer2 } from "lucide-react";

const PLATFORMS = [
    { id: 'instagram', label: 'Instagram', icon: Instagram, color: 'text-pink-500' },
    { id: 'youtube', label: 'YouTube', icon: Youtube, color: 'text-red-500' },
    { id: 'tiktok', label: 'TikTok', icon: Twitter, color: 'text-black' }, // Lucide doesn't have TikTok, using generic
];

const PLATFORM_DATA = {
    instagram: {
        followers: "125K",
        engagement: "4.8%",
        avgLikes: "3.2K",
        avgComments: "145",
        topPost: "Cyberpunk Cityscapes",
        growth: "+1.2%"
    },
    youtube: {
        followers: "85K",
        engagement: "6.2%",
        avgLikes: "5.1K",
        avgComments: "420",
        topPost: "MacBook Pro M5 Review",
        growth: "+3.5%"
    },
    tiktok: {
        followers: "340K",
        engagement: "8.5%",
        avgLikes: "15.2K",
        avgComments: "890",
        topPost: "Day in the Life: Dev",
        growth: "+12%"
    }
};

export function PlatformTab() {
    const [activePlatform, setActivePlatform] = useState('instagram');
    const data = PLATFORM_DATA[activePlatform as keyof typeof PLATFORM_DATA];

    return (
        <div className="space-y-6">
            {/* Platform Tabs */}
            <div className="flex bg-zinc-950/50 p-1 rounded-sm border border-zinc-800">
                {PLATFORMS.map(p => {
                    const isActive = activePlatform === p.id;
                    return (
                        <button
                            key={p.id}
                            onClick={() => setActivePlatform(p.id)}
                            className={cn(
                                "px-4 py-1.5 rounded-[1px] text-[10px] font-bold font-mono uppercase transition-all flex items-center gap-2",
                                isActive ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"
                            )}
                        >
                            <p.icon className={cn("w-3 h-3", isActive ? p.color : "text-zinc-600")} />
                            {p.label}
                        </button>
                    );
                })}
            </div>

            {/* Main KPI Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <Users className="w-3.5 h-3.5 text-zinc-600" />
                        <span className="text-[10px] text-zinc-500 font-mono uppercase">Followers</span>
                    </div>
                    <div className="text-xl font-bold text-white">{data.followers}</div>
                    <div className="text-[10px] text-[#a3e635] font-mono mt-1">{data.growth} this week</div>
                </div>
                <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-3.5 h-3.5 text-zinc-600" />
                        <span className="text-[10px] text-zinc-500 font-mono uppercase">Engagement</span>
                    </div>
                    <div className="text-xl font-bold text-white">{data.engagement}</div>
                </div>
                <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <Eye className="w-3.5 h-3.5 text-zinc-600" />
                        <span className="text-[10px] text-zinc-500 font-mono uppercase">Avg. Likes</span>
                    </div>
                    <div className="text-xl font-bold text-white">{data.avgLikes}</div>
                </div>
                <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <MousePointer2 className="w-3.5 h-3.5 text-zinc-600" />
                        <span className="text-[10px] text-zinc-500 font-mono uppercase">Avg. Comments</span>
                    </div>
                    <div className="text-xl font-bold text-white">{data.avgComments}</div>
                </div>
            </div>

            {/* Deep Dive Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-zinc-900/40 border border-zinc-800 p-6 rounded-sm min-h-[300px] flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]" />
                    <div className="text-center z-10">
                        <div className="w-12 h-12 rounded-full bg-zinc-800/50 flex items-center justify-center mx-auto mb-3 border border-zinc-700">
                            <TrendingUp className="w-5 h-5 text-zinc-500" />
                        </div>
                        <h3 className="text-sm font-bold text-zinc-300 font-display uppercase tracking-widest">Growth_Chart_Unavailable</h3>
                        <p className="text-xs text-zinc-600 font-mono mt-2">API_CONNECTION_PENDING // MOCK_DATA_ONLY</p>
                    </div>
                </div>

                <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-sm">
                    <h3 className="text-xs font-bold text-white font-display tracking-widest uppercase mb-4">Top_Performing_Content</h3>
                    <div className="p-3 bg-zinc-950/50 border border-zinc-800 rounded-sm">
                        <div className="aspect-video bg-zinc-900 mb-3 rounded-[2px] relative overflow-hidden group">
                            <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center text-zinc-700 font-mono text-[9px]">THUMBNAIL_PREVIEW</div>
                        </div>
                        <div className="text-xs font-bold text-white mb-1">{data.topPost}</div>
                        <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                            <span>Views: 45K</span>
                            <span className="text-[#a3e635]">ROI: High</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
