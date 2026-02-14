"use client";

import { Search, Filter, Star, Zap, MapPin, Instagram, Youtube, Twitch } from "lucide-react";

export function TalentGrid() {
    const creators = [
        { id: 1, name: "Neon_Vixen", role: "Cosplayer", reach: "2.4M", rate: "$1.5k", rating: 4.9, tags: ["Cyberpunk", "Fashion"] },
        { id: 2, name: "Tech_Saint", role: "Tech Reviewer", reach: "850k", rate: "$3.2k", rating: 5.0, tags: ["Hardware", "Gaming"] },
        { id: 3, name: "Glitch_Artist", role: "VFX Artist", reach: "1.1M", rate: "$2.0k", rating: 4.8, tags: ["Tutorials", "Art"] },
        { id: 4, name: "Urban_Nomad", role: "Vlogger", reach: "500k", rate: "$800", rating: 4.7, tags: ["Lifestyle", "Travel"] },
    ];

    return (
        <div className="flex flex-col h-full">
            {/* Controls */}
            <div className="flex items-center gap-2 p-6 pb-4">
                <div className="flex-1 relative">
                    <Search className="w-3 h-3 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input type="text" placeholder="SEARCH_CREATORS..." className="w-full bg-zinc-900/50 border border-zinc-800 rounded-sm pl-8 pr-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#a3e635] placeholder:text-zinc-600" />
                </div>
                <button className="p-2 bg-zinc-900/50 border border-zinc-800 rounded-sm hover:text-white text-zinc-500 transition-colors">
                    <Filter className="w-3 h-3" />
                </button>
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-y-auto px-6 pb-6 min-h-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {creators.map((c) => (
                        <div key={c.id} className="group relative bg-zinc-900/30 border border-zinc-800 p-4 rounded-sm hover:border-zinc-600 hover:bg-zinc-900/50 transition-all hover:-translate-y-1 cursor-pointer">
                            {/* Header */}
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-zinc-800 rounded-full border border-white/10 overflow-hidden flex items-center justify-center">
                                        <span className="font-display font-bold text-zinc-500">{c.name[0]}</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white font-display tracking-wide group-hover:text-[#a3e635] transition-colors">{c.name}</h4>
                                        <p className="text-[10px] text-zinc-500 font-mono flex items-center gap-1">
                                            {c.role} <span className="text-zinc-700">|</span> <Star className="w-2 h-2 text-[#a3e635] fill-current" /> {c.rating}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs font-bold text-white font-mono">{c.rate}</div>
                                    <div className="text-[9px] text-zinc-600 font-mono">STARTING</div>
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1 mb-4">
                                {c.tags.map(t => (
                                    <span key={t} className="px-1.5 py-0.5 bg-zinc-800/50 border border-zinc-700 rounded-[2px] text-[9px] font-mono text-zinc-400 group-hover:border-zinc-600 transition-colors">
                                        #{t.toUpperCase()}
                                    </span>
                                ))}
                            </div>

                            {/* Footer Metrics */}
                            <div className="flex items-center justify-between pt-3 border-t border-white/5">
                                <div className="flex gap-2 text-zinc-500">
                                    <Instagram className="w-3 h-3 hover:text-white transition-colors" />
                                    <Youtube className="w-3 h-3 hover:text-white transition-colors" />
                                    {/* <Twitch className="w-3 h-3 hover:text-white transition-colors" /> */}
                                </div>
                                <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-400">
                                    <Zap className="w-3 h-3 text-[#a3e635]" /> {c.reach} REACH
                                </div>
                            </div>

                            {/* Hover Border Glow simulating holo effect */}
                            <div className="absolute inset-0 border border-[#a3e635]/0 group-hover:border-[#a3e635]/20 rounded-sm pointer-events-none transition-colors" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
