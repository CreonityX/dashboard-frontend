"use client";

import { UserProfileHeader } from "@/components/widgets/shared/os/UserProfileHeader";
import { MediaUpload } from "@/components/widgets/MediaUpload";
import { ContentTopList } from "@/components/widgets/creator/analytics/ContentTopList";
import { WidgetShell } from "@/components/WidgetShell";
import { Globe, Shield, Zap } from "lucide-react";

export default function ProfilePage() {
    return (
        <div className="max-w-6xl mx-auto space-y-6">
            {/* 1. Identity Header */}
            <div>
                <h1 className="text-3xl font-bold text-white font-display uppercase tracking-tight">Identity Matrix</h1>
                <p className="text-zinc-500 font-mono text-xs mt-1">PUBLIC_PROFILE // PORTFOLIO_ASSETS</p>
            </div>

            <UserProfileHeader />

            {/* 2. Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Column: Stats & Reputation (1/3) */}
                <div className="space-y-6">
                    <ContentTopList />

                    {/* Tiny Reputation Widget */}
                    <WidgetShell title="REP_SCORE" icon={Shield} className="h-48">
                        <div className="p-6 flex flex-col items-center justify-center h-full">
                            <div className="text-4xl font-bold text-white font-display">98.4</div>
                            <div className="text-[10px] text-[#a3e635] font-mono mt-2">ELITE_TIER</div>
                            <div className="w-full h-1 bg-zinc-800 mt-4 rounded-full overflow-hidden">
                                <div className="h-full bg-[#a3e635] w-[98%]" />
                            </div>
                        </div>
                    </WidgetShell>
                </div>

                {/* Right Column: Portfolio & Upload (2/3) */}
                <div className="lg:col-span-2 space-y-6">
                    <MediaUpload />

                    {/* Active Deployment Zone */}
                    <WidgetShell title="ACTIVE_DEPLOYMENTS" icon={Globe} className="h-64">
                        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[1, 2].map((i) => (
                                <div key={i} className="border border-white/5 bg-white/5 p-4 relative group hover:border-[#a3e635]/50 transition-colors cursor-pointer">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="p-2 bg-black/50 rounded-sm">
                                            <Zap className="w-4 h-4 text-[#a3e635]" />
                                        </div>
                                        <div className="text-[10px] font-mono text-zinc-500">V.2.0.{i}</div>
                                    </div>
                                    <div className="font-bold text-white text-sm">Project_Neon_Genesis_{i}</div>
                                    <div className="text-[10px] text-zinc-400 mt-1">Deployed 2h ago</div>
                                    <div className="absolute bottom-0 left-0 h-0.5 bg-[#a3e635] w-0 group-hover:w-full transition-all duration-300" />
                                </div>
                            ))}
                        </div>
                    </WidgetShell>
                </div>
            </div>
        </div>
    );
}
