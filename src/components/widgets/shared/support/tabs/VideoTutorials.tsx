"use client";

import { SupportSection, VideoCard } from "@/components/widgets/shared/support/SupportComponents";

export function VideoTutorials() {
    return (
        <div className="max-w-5xl mx-auto pb-20 animate-in fade-in zoom-in-95 duration-500 space-y-8">
            <div className="p-6 border border-[#a3e635]/20 bg-[#a3e635]/5 rounded-sm mb-8">
                <h2 className="text-xl font-bold text-white font-display mb-2">Creator Academy</h2>
                <p className="text-sm text-zinc-400">Watch our expert-led tutorials to maximize your earnings on Creonity.</p>
            </div>

            <SupportSection title="Getting Started">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <VideoCard
                        title="Platform Walkthrough 2026"
                        duration="04:20"
                        category="Onboarding"
                    />
                    <VideoCard
                        title="Setting Up Your Portfolio"
                        duration="03:15"
                        category="Profile"
                    />
                    <VideoCard
                        title="Verification Process Explained"
                        duration="02:30"
                        category="Security"
                    />
                </div>
            </SupportSection>

            <SupportSection title="Advanced Strategies">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <VideoCard
                        title="Writing Winning Proposals"
                        duration="08:45"
                        category="Growth"
                    />
                    <VideoCard
                        title="Negotiating Rates with Brands"
                        duration="06:10"
                        category="Business"
                    />
                    <VideoCard
                        title="Understanding Analytics"
                        duration="05:00"
                        category="Data"
                    />
                </div>
            </SupportSection>
        </div>
    );
}
