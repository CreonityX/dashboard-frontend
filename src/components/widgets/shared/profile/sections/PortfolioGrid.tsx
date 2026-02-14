"use client";

import { ProfileSection, PortfolioItem } from "@/components/widgets/shared/profile/ProfileComponents";
import { Filter } from "lucide-react";

export function PortfolioGrid() {
    return (
        <ProfileSection title="Selected Works" action={
            <button className="flex items-center gap-2 text-[10px] text-zinc-500 hover:text-white transition-colors uppercase font-mono">
                <Filter className="w-3 h-3" /> Filter_View
            </button>
        }>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="relative group cursor-pointer aspect-square w-full h-full bg-zinc-900 border border-white/5 rounded-sm overflow-hidden">
                    {/* Mock Image 1 */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20" />
                    <div className="absolute inset-x-0 bottom-0 p-3 bg-black/80 backdrop-blur-md border-t border-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <div className="text-xs font-bold text-white">Cyber_Punk_2099</div>
                    </div>
                </div>
                {/* Reusing PortfolioItem for consistent look, but manually mocking for now */}
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <div key={i} className="relative group cursor-pointer aspect-square w-full h-full bg-zinc-900 border border-white/5 rounded-sm overflow-hidden">
                        <div className={`absolute inset-0 bg-gradient-to-br ${i % 2 === 0 ? 'from-[#a3e635]/10 to-emerald-500/10' : 'from-blue-500/10 to-cyan-500/10'}`} />
                        <div className="absolute inset-x-0 bottom-0 p-3 bg-black/80 backdrop-blur-md border-t border-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <div className="text-xs font-bold text-white">Project_Neon_{i}</div>
                            <div className="text-[10px] text-[#a3e635] font-mono mt-0.5">3.2M VIEWS</div>
                        </div>
                    </div>
                ))}
            </div>
        </ProfileSection>
    );
}
