"use client";

import { ProfileSection, ReviewCard } from "@/components/widgets/shared/profile/ProfileComponents";
import { Star } from "lucide-react";

export function ReviewsTab() {
    return (
        <div className="max-w-4xl mx-auto px-6 pb-20 animate-in fade-in zoom-in-95 duration-500 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-6 bg-[#a3e635] text-black rounded-sm flex flex-col items-center justify-center text-center">
                    <div className="text-4xl font-black font-display mb-1">4.9</div>
                    <div className="flex gap-1 mb-2 text-black">
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                    </div>
                    <div className="text-xs font-bold uppercase tracking-wide opacity-80">Overall Rating</div>
                </div>

                <div className="md:col-span-2 p-6 border border-zinc-800 bg-zinc-900/50 rounded-sm flex items-center justify-between">
                    <div className="space-y-1">
                        <h3 className="text-lg font-bold text-white">Trust Score</h3>
                        <p className="text-xs text-zinc-400">Based on payment timeliness, brief clarity, and communication.</p>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold text-white font-mono">98%</div>
                        <div className="text-[10px] text-[#a3e635] uppercase">Top 1% of Brands</div>
                    </div>
                </div>
            </div>

            <ProfileSection title="Recent Reviews">
                <div className="space-y-4">
                    <ReviewCard
                        author="@sarah_creative"
                        rating={5}
                        date="2 days ago"
                        text="Creonity Inc. is amazing to work with! Clear briefs, creative freedom, and instant payment upon approval. Highly recommend."
                    />
                    <ReviewCard
                        author="TechUnboxed"
                        rating={5}
                        date="1 week ago"
                        text="Professional team. They really understand the creator process and provided great assets to work with."
                    />
                    <ReviewCard
                        author="Visual_Studio_X"
                        rating={4}
                        date="3 weeks ago"
                        text="Great project overall. Slight delay in product shipping but communication was excellent throughout."
                    />
                </div>
            </ProfileSection>
        </div>
    );
}
