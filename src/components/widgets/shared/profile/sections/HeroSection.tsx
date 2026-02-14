"use client";

import { User, MapPin, Link as LinkIcon, Calendar, Share2, BadgeCheck, Twitter, Instagram, Youtube } from "lucide-react";
import { KineticContainer } from "@/components/KineticContainer";

export function HeroSection() {
    return (
        <div className="relative mb-8">
            {/* Banner */}
            <div className="h-48 rounded-lg bg-gradient-to-r from-zinc-800 to-zinc-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>

            <div className="px-6 relative -mt-16 flex items-end justify-between">
                <div className="flex items-end gap-6">
                    {/* Avatar */}
                    <div className="relative">
                        <KineticContainer intensity="medium" className="w-32 h-32 rounded-full bg-zinc-900 border-4 border-zinc-950 p-1">
                            <div className="w-full h-full rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden">
                                <User className="w-12 h-12 text-zinc-500" />
                            </div>
                        </KineticContainer>
                        <div className="absolute bottom-2 right-2 w-5 h-5 bg-[#a3e635] border-4 border-zinc-900 rounded-full" />
                    </div>

                    {/* Info */}
                    <div className="mb-2 space-y-1">
                        <div className="flex items-center gap-2">
                            <h1 className="text-3xl font-bold text-white font-display">Kai_Zen_Official</h1>
                            <BadgeCheck className="w-5 h-5 text-[#a3e635]" />
                        </div>
                        <p className="text-zinc-400 font-mono text-sm">Visual Alchemist & 3D Motion Designer</p>
                        <div className="flex items-center gap-4 text-xs text-zinc-500 font-mono mt-2">
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Tokyo, JPN</span>
                            <span className="flex items-center gap-1"><LinkIcon className="w-3 h-3" /> kai_zen.design</span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mb-2">
                    <button className="p-2 border border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-md transition-colors">
                        <Instagram className="w-4 h-4" />
                    </button>
                    <button className="p-2 border border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-md transition-colors">
                        <Twitter className="w-4 h-4" />
                    </button>
                    <button className="p-2 border border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-md transition-colors">
                        <Youtube className="w-4 h-4" />
                    </button>
                    <div className="w-px h-8 bg-zinc-800 mx-2" />
                    <button className="px-4 py-2 bg-white text-black font-bold text-xs uppercase rounded-md hover:bg-zinc-200 transition-colors">
                        Contact_Me
                    </button>
                </div>
            </div>

            {/* Bio */}
            <div className="px-6 mt-6 max-w-3xl">
                <p className="text-sm text-zinc-400 leading-relaxed">
                    Senior Motion Designer with 7+ years of experience crafting immersive digital experiences.
                    Specializing in <span className="text-zinc-200">Houdini simulations</span>, <span className="text-zinc-200">C4D</span>, and <span className="text-zinc-200">Unreal Engine</span> real-time environments.
                    Previously collaborated with Nike, Sony, and Future_Corp on global campaigns.
                    Passionate about the intersection of technology and art.
                </p>
            </div>
        </div>
    );
}
