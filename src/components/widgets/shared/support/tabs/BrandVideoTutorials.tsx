"use client";

import { SupportSection, VideoCard } from "@/components/widgets/shared/support/BrandSupportComponents";

export function VideoTutorials() {
    return (
        <div className="max-w-5xl mx-auto pb-20 animate-in fade-in zoom-in-95 duration-500 space-y-8">
            <div className="p-6 border border-[#a3e635]/20 bg-[#a3e635]/5 rounded-sm mb-8">
                <h2 className="text-xl font-bold text-white font-display mb-2 uppercase">Brand Academy</h2>
                <p className="text-xs font-mono text-zinc-400">Master the tools to scale your influencer marketing campaigns.</p>
            </div>

            <SupportSection title="Getting Started">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <VideoCard
                        title="Creating Your First Campaign"
                        duration="05:30"
                        category="Onboarding"
                    />
                    <VideoCard
                        title="Inviting Creators & Negotiation"
                        duration="04:15"
                        category="Campaigns"
                    />
                    <VideoCard
                        title="Setting Up Payments & Billing"
                        duration="03:45"
                        category="Finance"
                    />
                </div>
            </SupportSection>

            <SupportSection title="Advanced Strategies">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <VideoCard
                        title="Optimizing Campaign ROI"
                        duration="09:20"
                        category="Strategy"
                    />
                    <VideoCard
                        title="Advanced Audience Targeting"
                        duration="07:10"
                        category="Growth"
                    />
                    <VideoCard
                        title="Analyzing Performance Data"
                        duration="06:50"
                        category="Analytics"
                    />
                </div>
            </SupportSection>
        </div>
    );
}
