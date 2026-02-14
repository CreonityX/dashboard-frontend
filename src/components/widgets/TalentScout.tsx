import { Search, Star, MessageSquare } from "lucide-react";

export function TalentScout() {
    return (
        <div className="h-full flex flex-col">
            {/* Search Bar */}
            <div className="p-4 border-b border-white/5 flex gap-2">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                        type="text"
                        placeholder="SEARCH_CREATORS..."
                        className="w-full bg-zinc-900/50 border border-zinc-700 text-xs text-white pl-9 pr-3 py-2 focus:outline-none focus:border-[#a3e635] transition-colors font-mono"
                    />
                </div>
                <button className="px-3 bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-white transition-colors">
                    <div className="w-4 h-4 flex flex-col justify-center gap-0.5">
                        <div className="w-full h-px bg-current" />
                        <div className="w-2/3 h-px bg-current" />
                        <div className="w-1/3 h-px bg-current" />
                    </div>
                </button>
            </div>

            {/* Profile Grid */}
            <div className="flex-1 overflow-y-auto p-4 grid gap-3">
                <TalentCard name="Sarah_Vfx" niche="3D Motion" score="98%" followers="125k" />
                <TalentCard name="Tech_Nomad" niche="Tech Reviews" score="94%" followers="850k" />
                <TalentCard name="Pixel_Artisan" niche="Digital Art" score="91%" followers="42k" />
                <TalentCard name="Audio_Wizard" niche="Sound Design" score="89%" followers="12k" />
            </div>
        </div>
    );
}

function TalentCard({ name, niche, score, followers }: any) {
    return (
        <div className="flex items-center gap-4 p-3 bg-zinc-900/20 border border-zinc-800 hover:border-zinc-600 transition-colors group">
            {/* Avatar Placeholder */}
            <div className="w-10 h-10 bg-zinc-800 rounded-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent" />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#a3e635] border-2 border-black rounded-full" />
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                    <h4 className="font-bold text-sm text-white truncate">{name}</h4>
                    <div className="flex items-center gap-1 bg-[#a3e635]/10 px-1.5 py-0.5 rounded-sm border border-[#a3e635]/20">
                        <Star className="w-3 h-3 text-[#a3e635] fill-current" />
                        <span className="text-[10px] font-mono font-bold text-[#a3e635]">{score}</span>
                    </div>
                </div>
                <div className="flex justify-between mt-1">
                    <span className="text-[10px] font-mono text-zinc-500">{niche}</span>
                    <span className="text-[10px] font-mono text-zinc-400">{followers}</span>
                </div>
            </div>
        </div>
    )
}
