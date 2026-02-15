import { Star, Download, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

const COMPLETED_PROJECTS = [
    {
        id: 1,
        brand: "Coca-Cola",
        campaign: "Summer Vibes",
        date: "Jan 15, 2026",
        earned: "$3,500",
        rating: 5,
        logoBg: "bg-red-600 text-white"
    },
    {
        id: 2,
        brand: "Sony",
        campaign: "PS5 Pro Launch",
        date: "Dec 20, 2025",
        earned: "$5,000",
        rating: 4,
        logoBg: "bg-black text-white"
    },
    {
        id: 3,
        brand: "Zara",
        campaign: "Winter Collection",
        date: "Nov 10, 2025",
        earned: "$1,800",
        rating: 5,
        logoBg: "bg-black text-white"
    }
];

export function CompletedTab() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-lg font-bold text-white font-display tracking-wide">Project_Archive</h2>
                    <p className="text-zinc-500 font-mono text-xs">LIFETIME_EARNINGS // $14,500</p>
                </div>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-sm text-[10px] font-mono text-zinc-400 hover:text-white transition-colors uppercase">
                    <Download className="w-3 h-3" /> Export_Portfolio
                </button>
            </div>

            <div className="bg-zinc-900/40 border border-zinc-800 rounded-sm overflow-hidden text-sm">
                <div className="grid grid-cols-12 px-6 py-3 bg-zinc-950/30 text-[10px] font-mono text-zinc-500 uppercase tracking-wider border-b border-zinc-800">
                    <div className="col-span-4">Campaign</div>
                    <div className="col-span-3">Date Completed</div>
                    <div className="col-span-2 text-right">Earned</div>
                    <div className="col-span-2 text-center">Rating</div>
                    <div className="col-span-1 text-right">Action</div>
                </div>

                <div className="divide-y divide-zinc-800">
                    {COMPLETED_PROJECTS.map((project) => (
                        <div key={project.id} className="grid grid-cols-12 px-6 py-4 items-center hover:bg-zinc-800/30 transition-colors group">
                            {/* Campaign */}
                            <div className="col-span-4 flex items-center gap-3">
                                <div className={cn("w-8 h-8 rounded-sm flex items-center justify-center text-[10px] font-bold border border-zinc-700/50", project.logoBg)}>
                                    {project.brand[0]}
                                </div>
                                <div>
                                    <div className="font-bold text-white text-xs">{project.campaign}</div>
                                    <div className="text-[10px] text-zinc-500 font-mono">{project.brand}</div>
                                </div>
                            </div>

                            {/* Date */}
                            <div className="col-span-3 text-xs text-zinc-400 font-mono">
                                {project.date}
                            </div>

                            {/* Earned */}
                            <div className="col-span-2 text-right">
                                <span className="font-bold text-[#a3e635] font-mono text-xs">{project.earned}</span>
                            </div>

                            {/* Rating */}
                            <div className="col-span-2 flex justify-center gap-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} className={cn("w-3 h-3", i < project.rating ? "text-yellow-500 fill-yellow-500" : "text-zinc-700")} />
                                ))}
                            </div>

                            {/* Action */}
                            <div className="col-span-1 flex justify-end">
                                <button className="p-1.5 hover:bg-zinc-800 rounded-sm text-zinc-500 hover:text-white transition-colors" title="Reorder / Work Again">
                                    <RotateCcw className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
