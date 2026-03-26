import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Instagram, Youtube, Twitter, TrendingUp, Users, Eye, MousePointer2 } from "lucide-react";

const PLATFORMS = [
    { id: "instagram", label: "Instagram", icon: Instagram, color: "text-pink-500" },
    { id: "youtube", label: "YouTube", icon: Youtube, color: "text-red-500" },
    { id: "tiktok", label: "TikTok", icon: Twitter, color: "text-cyan-400" }
];

const PLATFORM_DATA = {
    instagram: {
        followers: "125K",
        engagement: "4.8%",
        avgLikes: "3.2K",
        avgComments: "145",
        topPost: "Cyberpunk Cityscapes",
        growth: "+1.2%",
        trend: [28, 32, 36, 40, 44, 42, 48]
    },
    youtube: {
        followers: "85K",
        engagement: "6.2%",
        avgLikes: "5.1K",
        avgComments: "420",
        topPost: "MacBook Pro M5 Review",
        growth: "+3.5%",
        trend: [22, 25, 27, 35, 38, 41, 46]
    },
    tiktok: {
        followers: "340K",
        engagement: "8.5%",
        avgLikes: "15.2K",
        avgComments: "890",
        topPost: "Day in the Life: Dev",
        growth: "+12%",
        trend: [34, 41, 48, 55, 64, 71, 83]
    }
};

const TIME_WINDOWS: Array<"7d" | "30d" | "90d"> = ["7d", "30d", "90d"];

export function PlatformTab() {
    const [activePlatform, setActivePlatform] = useState<"instagram" | "youtube" | "tiktok">("instagram");
    const [timeWindow, setTimeWindow] = useState<"7d" | "30d" | "90d">("30d");
    const [isTopPostOpen, setIsTopPostOpen] = useState(false);

    const data = PLATFORM_DATA[activePlatform];

    const trendValues = useMemo(() => {
        const multiplier = timeWindow === "7d" ? 0.65 : timeWindow === "90d" ? 1.45 : 1;
        return data.trend.map((point) => Math.round(point * multiplier));
    }, [data.trend, timeWindow]);

    const maxTrend = Math.max(...trendValues, 1);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex bg-zinc-950/50 p-1 rounded-sm border border-zinc-800">
                    {PLATFORMS.map((p) => {
                        const isActive = activePlatform === p.id;
                        return (
                            <button
                                key={p.id}
                                onClick={() => setActivePlatform(p.id as "instagram" | "youtube" | "tiktok")}
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

                <button
                    onClick={() => {
                        const currentIndex = TIME_WINDOWS.indexOf(timeWindow);
                        setTimeWindow(TIME_WINDOWS[(currentIndex + 1) % TIME_WINDOWS.length]);
                    }}
                    className="px-3 py-1.5 rounded-sm border border-zinc-800 bg-zinc-900 text-[10px] text-zinc-300 font-mono uppercase hover:border-zinc-700"
                >
                    Window: {timeWindow.toUpperCase()}
                </button>
            </div>

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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-zinc-900/40 border border-zinc-800 p-6 rounded-sm relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04]" />
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xs font-bold text-zinc-300 font-display uppercase tracking-widest">Growth_Trend</h3>
                            <span className="text-[10px] text-zinc-500 font-mono">{timeWindow.toUpperCase()} SNAPSHOT</span>
                        </div>
                        <div className="h-52 flex items-end gap-2 border border-zinc-800 bg-zinc-950/40 rounded-sm p-3">
                            {trendValues.map((point, index) => (
                                <div key={index} className="flex-1 flex flex-col items-center justify-end gap-1">
                                    <div
                                        className="w-full bg-[#a3e635]/80 hover:bg-[#a3e635] transition-colors rounded-[2px]"
                                        style={{ height: `${Math.max(10, (point / maxTrend) * 100)}%` }}
                                        title={`${point} index`}
                                    />
                                    <span className="text-[9px] text-zinc-600 font-mono">W{index + 1}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-sm">
                    <h3 className="text-xs font-bold text-white font-display tracking-widest uppercase mb-4">Top_Performing_Content</h3>
                    <div className="p-3 bg-zinc-950/50 border border-zinc-800 rounded-sm">
                        <div className="aspect-video bg-zinc-900 mb-3 rounded-[2px] relative overflow-hidden group">
                            <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center text-zinc-700 font-mono text-[9px]">THUMBNAIL_PREVIEW</div>
                        </div>
                        <div className="text-xs font-bold text-white mb-1">{data.topPost}</div>
                        <div className="flex justify-between text-[10px] font-mono text-zinc-500 mb-3">
                            <span>Views: {trendValues[trendValues.length - 1]}K</span>
                            <span className="text-[#a3e635]">ROI: High</span>
                        </div>
                        <button
                            onClick={() => setIsTopPostOpen(true)}
                            className="w-full px-3 py-1.5 bg-zinc-900 border border-zinc-700 rounded-sm text-[10px] text-zinc-300 hover:text-white hover:border-zinc-500 font-mono uppercase"
                        >
                            Open Breakdown
                        </button>
                    </div>
                </div>
            </div>

            {isTopPostOpen && (
                <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-[2px] p-4 flex items-center justify-center" onClick={() => setIsTopPostOpen(false)}>
                    <div className="w-full max-w-md rounded-sm border border-zinc-700 bg-zinc-900/95 p-5" onClick={(event) => event.stopPropagation()}>
                        <h4 className="text-sm font-bold text-white">{data.topPost}</h4>
                        <p className="text-[11px] text-zinc-500 font-mono mt-1">{activePlatform.toUpperCase()} PERFORMANCE</p>
                        <div className="grid grid-cols-3 gap-2 mt-4">
                            <div className="rounded-sm border border-zinc-800 bg-zinc-950/50 p-2">
                                <div className="text-[9px] text-zinc-500 font-mono">Views</div>
                                <div className="text-xs text-white font-bold mt-1">{trendValues[trendValues.length - 1]}K</div>
                            </div>
                            <div className="rounded-sm border border-zinc-800 bg-zinc-950/50 p-2">
                                <div className="text-[9px] text-zinc-500 font-mono">Engage</div>
                                <div className="text-xs text-white font-bold mt-1">{data.engagement}</div>
                            </div>
                            <div className="rounded-sm border border-zinc-800 bg-zinc-950/50 p-2">
                                <div className="text-[9px] text-zinc-500 font-mono">Growth</div>
                                <div className="text-xs text-[#a3e635] font-bold mt-1">{data.growth}</div>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button onClick={() => setIsTopPostOpen(false)} className="px-3 py-2 border border-zinc-700 rounded-sm text-xs text-zinc-300 hover:text-white hover:border-zinc-500">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
