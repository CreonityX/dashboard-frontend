import { Bookmark, Clock, DollarSign, ExternalLink, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const SAVED = [
    {
        id: 4,
        brand: "Spotify",
        title: "Podcast Promotion",
        type: "Instagram Story",
        budget: "$800 - $1,500",
        deadline: "Mar 05",
        tags: ["Music", "Entertainment"],
        logoBg: "bg-[#1DB954] text-black"
    },
    {
        id: 6,
        brand: "Squarespace",
        title: "Website Builder Showcase",
        type: "YouTube Integration",
        budget: "$2,500 - $4,500",
        deadline: "Apr 01",
        tags: ["Tech", "Business"],
        logoBg: "bg-white text-black"
    }
];

export function SavedTab() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-bold text-white font-display tracking-wide">Saved_Opportunities</h2>
                <p className="text-zinc-500 font-mono text-xs">BOOKMARKS // {SAVED.length}_ITEMS</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {SAVED.map((gig) => (
                    <div key={gig.id} className="bg-zinc-900/40 border border-zinc-800 rounded-sm p-5 hover:border-zinc-700 transition-all group relative">
                        {/* Header */}
                        <div className="flex items-start gap-3 mb-4">
                            <div className={cn("w-10 h-10 rounded-sm flex items-center justify-center text-xs font-bold tracking-tighter border border-zinc-700/50", gig.logoBg)}>
                                {gig.brand[0]}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-sm font-bold text-white leading-tight group-hover:text-[#a3e635] transition-colors">{gig.brand}</h3>
                                <p className="text-[10px] text-zinc-500 font-mono uppercase">{gig.type}</p>
                            </div>
                        </div>

                        <h4 className="text-sm text-zinc-300 font-medium leading-relaxed mb-4 min-h-[40px]">
                            {gig.title}
                        </h4>

                        <div className="pt-4 border-t border-zinc-800/50 flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-1.5 text-xs font-bold text-white mb-0.5">
                                    <DollarSign className="w-3 h-3 text-zinc-500" />
                                    {gig.budget}
                                </div>
                                <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-mono">
                                    <Clock className="w-3 h-3" />
                                    Due {gig.deadline}
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 bg-zinc-950 border border-zinc-800 hover:border-red-500/50 rounded-sm text-zinc-500 hover:text-red-500 transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                <button className="px-3 py-2 bg-[#a3e635] text-black text-[10px] font-bold font-mono rounded-sm uppercase hover:opacity-90 transition-opacity flex items-center gap-1">
                                    Apply <ExternalLink className="w-3 h-3 ml-0.5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
