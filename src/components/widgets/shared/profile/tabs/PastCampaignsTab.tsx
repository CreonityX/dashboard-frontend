"use client";

import { ProfileSection } from "@/components/widgets/shared/profile/ProfileComponents";
import { ExternalLink, TrendingUp, User } from "lucide-react";

export function PastCampaignsTab() {
    return (
        <div className="max-w-5xl mx-auto px-6 pb-20 animate-in fade-in zoom-in-95 duration-500 space-y-8">
            <ProfileSection title="Campaign Showcase" action={
                <button className="px-4 py-1.5 border border-zinc-700 text-zinc-300 text-[10px] font-bold uppercase hover:bg-zinc-800 rounded-sm">
                    + Add Case Study
                </button>
            }>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CampaignCaseStudy
                        title="Summer '25 Collection Launch"
                        creator="Sarah Jenkins"
                        platform="Instagram"
                        results={{ reach: '2.5M', engagement: '12%', roas: '4.5x' }}
                        image="/api/placeholder/400/300"
                    />
                    <CampaignCaseStudy
                        title="Tech Review Series"
                        creator="Marques Brownlee"
                        platform="YouTube"
                        results={{ reach: '800K', engagement: '8.5%', roas: '3.2x' }}
                        image="/api/placeholder/400/300"
                    />
                    <CampaignCaseStudy
                        title="Holiday Gift Guide"
                        creator="Lifestyle Collective"
                        platform="TikTok"
                        results={{ reach: '5M', engagement: '15%', roas: '6.1x' }}
                        image="/api/placeholder/400/300"
                    />
                </div>
            </ProfileSection>
        </div>
    );
}

function CampaignCaseStudy({ title, creator, platform, results, image }: { title: string, creator: string, platform: string, results: { reach: string, engagement: string, roas: string }, image: string }) {
    return (
        <div className="group border border-white/5 bg-zinc-900/40 rounded-sm overflow-hidden hover:border-white/20 transition-all">
            <div className="h-48 bg-zinc-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-zinc-700 animate-pulse" />
                {/* Image Placeholder above would be replaced by actual image */}
                <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/80 backdrop-blur-md rounded-sm border border-white/10 text-[10px] font-bold text-white uppercase">
                    {platform}
                </div>
            </div>
            <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <h4 className="text-lg font-bold text-white font-display leading-tight mb-1">{title}</h4>
                        <div className="flex items-center gap-2 text-xs text-zinc-400">
                            <User className="w-3 h-3" />
                            <span>ft. {creator}</span>
                        </div>
                    </div>
                    <button className="text-zinc-500 hover:text-white transition-colors">
                        <ExternalLink className="w-4 h-4" />
                    </button>
                </div>

                <div className="grid grid-cols-3 gap-2 py-3 border-t border-white/5 mt-4">
                    <div className="text-center">
                        <div className="text-sm font-bold text-white">{results.reach}</div>
                        <div className="text-[9px] text-zinc-500 uppercase tracking-widest">Reach</div>
                    </div>
                    <div className="text-center border-l border-white/5">
                        <div className="text-sm font-bold text-[#a3e635]">{results.engagement}</div>
                        <div className="text-[9px] text-zinc-500 uppercase tracking-widest">Engmt</div>
                    </div>
                    <div className="text-center border-l border-white/5">
                        <div className="text-sm font-bold text-white">{results.roas}</div>
                        <div className="text-[9px] text-zinc-500 uppercase tracking-widest">ROAS</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
