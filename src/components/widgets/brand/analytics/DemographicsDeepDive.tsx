"use client";

import { Users, User, MapPin } from "lucide-react";

export function DemographicsDeepDive() {
    return (
        <div className="flex flex-col h-full">
            <div className="p-6 pb-2">
                <h3 className="text-sm font-bold text-white font-display tracking-wide">AUDIENCE_DNA</h3>
            </div>

            <div className="flex-1 px-6 space-y-6 pt-2">
                {/* Age & Gender */}
                <div className="flex justify-between items-center bg-zinc-900/50 p-2 rounded-sm border border-zinc-800">
                    {/* Gender Split */}
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-zinc-800 rounded-sm">
                            <User className="w-3 h-3 text-blue-400" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[9px] font-mono text-zinc-500">MALE</span>
                            <span className="text-xs font-bold text-white font-mono">45%</span>
                        </div>
                    </div>
                    <div className="h-8 w-px bg-white/10" />
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-zinc-800 rounded-sm">
                            <User className="w-3 h-3 text-pink-400" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[9px] font-mono text-zinc-500">FEMALE</span>
                            <span className="text-xs font-bold text-white font-mono">55%</span>
                        </div>
                    </div>
                </div>

                {/* Age Brackets */}
                <div className="space-y-2">
                    <div className="text-[10px] font-mono text-zinc-500 mb-1">AGE_DISTRIBUTION</div>
                    {/* 18-24 */}
                    <div className="flex items-center gap-2 text-[10px] font-mono">
                        <span className="w-8 text-zinc-400">18-24</span>
                        <div className="flex-1 h-1 bg-zinc-800 rounded-full">
                            <div className="h-full bg-indigo-500 w-[65%]" />
                        </div>
                        <span className="text-white">65%</span>
                    </div>
                    {/* 25-34 */}
                    <div className="flex items-center gap-2 text-[10px] font-mono">
                        <span className="w-8 text-zinc-400">25-34</span>
                        <div className="flex-1 h-1 bg-zinc-800 rounded-full">
                            <div className="h-full bg-indigo-400 w-[25%]" />
                        </div>
                        <span className="text-white">25%</span>
                    </div>
                    {/* 35+ */}
                    <div className="flex items-center gap-2 text-[10px] font-mono">
                        <span className="w-8 text-zinc-400">35+</span>
                        <div className="flex-1 h-1 bg-zinc-800 rounded-full">
                            <div className="h-full bg-zinc-600 w-[10%]" />
                        </div>
                        <span className="text-white">10%</span>
                    </div>
                </div>

                {/* Top Cities */}
                <div className="pt-2 border-t border-white/5">
                    <div className="flex justify-between items-center">
                        <div className="text-[10px] text-zinc-500 font-mono">TOP_CITY</div>
                        <div className="text-xs font-bold text-white font-mono flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#a3e635]" /> TOKYO, JP
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
