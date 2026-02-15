import { Search, Filter, SlidersHorizontal, MapPin, DollarSign, Clock, CheckCircle2, Bookmark, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const GIGS = [
    {
        id: 1,
        brand: "Nike",
        title: "Air Max 2026 Launch Campaign",
        type: "Instagram Reel",
        budget: "$2,500 - $4,000",
        deadline: "Mar 15",
        match: 98,
        tags: ["Fitness", "Fashion"],
        verified: true,
        logoBg: "bg-black text-white"
    },
    {
        id: 2,
        brand: "Samsung",
        title: "Galaxy S26 Ultra Review",
        type: "YouTube Video",
        budget: "$5,000 - $8,000",
        deadline: "Feb 28",
        match: 95,
        tags: ["Tech", "Lifestyle"],
        verified: true,
        logoBg: "bg-blue-600 text-white"
    },
    {
        id: 3,
        brand: "Sephora",
        title: "Spring Beauty Haul",
        type: "TikTok Series",
        budget: "$1,200 - $2,000",
        deadline: "Mar 10",
        match: 88,
        tags: ["Beauty", "Makeup"],
        verified: true,
        logoBg: "bg-black text-white"
    },
    {
        id: 4,
        brand: "Spotify",
        title: "Podcast Promotion",
        type: "Instagram Story",
        budget: "$800 - $1,500",
        deadline: "Mar 05",
        match: 82,
        tags: ["Music", "Entertainment"],
        verified: true,
        logoBg: "bg-[#1DB954] text-black"
    },
    {
        id: 5,
        brand: "HelloFresh",
        title: "Healthy Eating Challenge",
        type: "YouTube Integration",
        budget: "$3,000 - $5,000",
        deadline: "Mar 20",
        match: 92,
        tags: ["Food", "Health"],
        verified: true,
        logoBg: "bg-[#96c11f] text-black"
    },
    {
        id: 6,
        brand: "Squarespace",
        title: "Website Builder Showcase",
        type: "YouTube Integration",
        budget: "$2,500 - $4,500",
        deadline: "Apr 01",
        match: 85,
        tags: ["Tech", "Business"],
        verified: true,
        logoBg: "bg-white text-black"
    }
];

export function DiscoverTab() {
    return (
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 h-full">
            {/* Sidebar Filters */}
            <div className="w-full lg:w-72 flex-shrink-0 space-y-6">
                {/* Search Mobile/Desktop */}
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                    <input
                        type="text"
                        placeholder="SEARCH_GIGS..."
                        className="w-full bg-zinc-950/50 border border-zinc-800 rounded-sm pl-10 pr-4 py-2.5 text-xs text-white font-mono placeholder:text-zinc-600 focus:outline-none focus:border-[#a3e635]/50 transition-colors uppercase"
                    />
                </div>

                <div className="bg-zinc-900/40 border border-zinc-800 rounded-sm p-5 space-y-6">
                    <div className="flex items-center gap-2 text-xs font-bold text-white font-display uppercase tracking-wider border-b border-zinc-800 pb-2">
                        <Filter className="w-3.5 h-3.5 text-[#a3e635]" /> Filters
                    </div>

                    {/* Industry */}
                    <div className="space-y-3">
                        <label className="text-[10px] text-zinc-500 font-mono uppercase block">Industry</label>
                        <div className="space-y-2">
                            {['Beauty & Fashion', 'Tech & Gaming', 'Lifestyle', 'Food & Drink'].map((item) => (
                                <label key={item} className="flex items-center gap-2 cursor-pointer group">
                                    <div className="w-3.5 h-3.5 border border-zinc-700 rounded-[2px] bg-zinc-950 group-hover:border-zinc-500 transition-colors" />
                                    <span className="text-xs text-zinc-400 group-hover:text-zinc-200 transition-colors">{item}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Budget */}
                    <div className="space-y-3">
                        <label className="text-[10px] text-zinc-500 font-mono uppercase block">Budget Range</label>
                        <div className="flex items-center gap-2 text-xs text-zinc-300 font-mono">
                            <span className="bg-zinc-950 px-2 py-1 border border-zinc-800 rounded-sm">$1k</span>
                            <div className="h-[1px] flex-1 bg-zinc-700"></div>
                            <span className="bg-zinc-950 px-2 py-1 border border-zinc-800 rounded-sm">$50k+</span>
                        </div>
                    </div>

                    {/* Platform */}
                    <div className="space-y-3">
                        <label className="text-[10px] text-zinc-500 font-mono uppercase block">Platform</label>
                        <div className="flex flex-wrap gap-2">
                            {['Instagram', 'YouTube', 'TikTok', 'Twitch'].map(p => (
                                <button key={p} className="px-2 py-1 bg-zinc-950 border border-zinc-800 text-[10px] font-mono text-zinc-400 hover:text-white hover:border-zinc-600 rounded-sm transition-all">
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Grid */}
            <div className="flex-1">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-lg font-bold text-white font-display tracking-wide">Featured_Opportunities</h2>
                        <p className="text-zinc-500 font-mono text-xs">MATCHED_FOR_YOU // {GIGS.length}_RESULTS</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-sm text-[10px] font-mono text-zinc-400 hover:text-white transition-colors uppercase">
                            Sort: Best_Match
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {GIGS.map((gig) => (
                        <div key={gig.id} className="tech-border p-5 hover:bg-zinc-900/60 transition-all duration-300 group relative cursor-pointer overflow-hidden">
                            <div className="absolute inset-0 bg-grid-zinc opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />
                            {/* Match Score */}
                            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-zinc-950/80 backdrop-blur-sm border border-zinc-800 px-2 py-1 rounded-sm">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#a3e635]" />
                                <span className="text-[10px] font-mono font-bold text-[#a3e635]">{gig.match}%</span>
                            </div>

                            {/* Header */}
                            <div className="flex items-start gap-3 mb-4">
                                <div className={cn("w-10 h-10 rounded-sm flex items-center justify-center text-xs font-bold tracking-tighter border border-zinc-700/50", gig.logoBg)}>
                                    {gig.brand[0]}
                                </div>
                                <div className="flex-1 pr-12">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <h3 className="text-sm font-bold text-white leading-tight group-hover:text-[#a3e635] transition-colors">{gig.brand}</h3>
                                        {gig.verified && <CheckCircle2 className="w-3 h-3 text-blue-500" />}
                                    </div>
                                    <p className="text-[10px] text-zinc-500 font-mono uppercase">{gig.type}</p>
                                </div>
                            </div>

                            {/* Title */}
                            <h4 className="text-sm text-zinc-300 font-medium leading-relaxed mb-4 min-h-[40px]">
                                {gig.title}
                            </h4>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1.5 mb-5">
                                {gig.tags.map(tag => (
                                    <span key={tag} className="px-1.5 py-0.5 bg-zinc-800/50 border border-zinc-700/50 rounded-[2px] text-[9px] text-zinc-400 font-mono uppercase">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Footer */}
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
                                    <button className="p-2 bg-zinc-950 border border-zinc-800 hover:border-zinc-600 rounded-sm text-zinc-400 hover:text-white transition-colors">
                                        <Bookmark className="w-4 h-4" />
                                    </button>
                                    <button className="px-3 py-2 bg-[#a3e635] text-black text-[10px] font-bold font-mono rounded-sm uppercase hover:opacity-90 transition-opacity flex items-center gap-1">
                                        Quick_Apply <ExternalLink className="w-3 h-3 ml-0.5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
