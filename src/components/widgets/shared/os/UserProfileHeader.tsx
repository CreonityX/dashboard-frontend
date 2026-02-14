"use client";

import { User, MapPin, Link as LinkIcon, Calendar, Edit3, Share2, BadgeCheck } from "lucide-react";
import { KineticContainer } from "../../../KineticContainer";

export function UserProfileHeader() {
    return (
        <div className="h-full flex flex-col bg-zinc-950 font-sans relative overflow-hidden group">
            {/* Cover Image */}
            <div className="h-24 bg-gradient-to-r from-zinc-800 to-zinc-900 border-b border-zinc-800 relative">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                <button className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/80 text-white rounded-sm border border-white/10 transition-colors">
                    <Edit3 className="w-3 h-3" />
                </button>
            </div>

            {/* Profile Info */}
            <div className="flex-1 px-6 pb-6 relative">
                <div className="flex justify-between items-end -mt-10 mb-4">
                    <KineticContainer intensity="medium" className="w-20 h-20 rounded-full bg-zinc-900 border-4 border-zinc-950 p-1">
                        <div className="w-full h-full rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden relative">
                            <User className="w-8 h-8 text-zinc-500" />
                            {/* Online Indicator */}
                            <div className="absolute bottom-1 right-1 w-3 h-3 bg-[#a3e635] border-2 border-zinc-900 rounded-full" />
                        </div>
                    </KineticContainer>
                    <div className="flex gap-2">
                        <button className="p-2 border border-zinc-700 hover:border-zinc-500 text-zinc-400 hover:text-white rounded-sm transition-colors">
                            <Share2 className="w-4 h-4" />
                        </button>
                        <button className="px-4 py-2 bg-[#a3e635] hover:bg-[#b0f545] text-black font-bold font-mono text-xs rounded-sm transition-colors">
                            EDIT_PROFILE
                        </button>
                    </div>
                </div>

                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-xl font-bold text-white font-display">Kai_Zen_Official</h2>
                        <BadgeCheck className="w-4 h-4 text-[#a3e635]" />
                    </div>
                    <p className="text-sm text-zinc-400 mb-4 line-clamp-2">
                        Digital Artist & 3D Motion Designer. Creating the future of interface design. Open for commissions.
                    </p>

                    <div className="flex flex-wrap gap-4 text-xs text-zinc-500 font-mono">
                        <div className="flex items-center gap-1.5">
                            <MapPin className="w-3 h-3" />
                            <span>TOKYO_JPN</span>
                        </div>
                        <div className="flex items-center gap-1.5 hover:text-[#a3e635] transition-colors cursor-pointer">
                            <LinkIcon className="w-3 h-3" />
                            <span>kai_zen.design</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-3 h-3" />
                            <span>JOINED_MAR_2024</span>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mt-6 border-t border-zinc-800 pt-4">
                    <div className="text-center group/stat cursor-pointer">
                        <div className="text-lg font-bold text-white font-display group-hover/stat:text-[#a3e635] transition-colors">12.5K</div>
                        <div className="text-[10px] text-zinc-600 font-mono">FOLLOWERS</div>
                    </div>
                    <div className="text-center group/stat cursor-pointer">
                        <div className="text-lg font-bold text-white font-display group-hover/stat:text-[#a3e635] transition-colors">843</div>
                        <div className="text-[10px] text-zinc-600 font-mono">FOLLOWING</div>
                    </div>
                    <div className="text-center group/stat cursor-pointer">
                        <div className="text-lg font-bold text-white font-display group-hover/stat:text-[#a3e635] transition-colors">4.8M</div>
                        <div className="text-[10px] text-zinc-600 font-mono">LIKES</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
