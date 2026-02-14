"use client";

import { ProfileSection, RateCardItem } from "@/components/widgets/shared/profile/ProfileComponents";

export function RateCardSection() {
    return (
        <ProfileSection title="Service Rates">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <RateCardItem title="Instagram Reel" price="$1,500" unit="video" negotiable />
                <RateCardItem title="TikTok Integration" price="$800" unit="post" />
                <RateCardItem title="YouTube Sponsorship" price="$3,500" unit="segment" negotiable />
                <RateCardItem title="UGC Content Package" price="$2,000" unit="bundle (3 videos)" />
                <RateCardItem title="Story Set (3 Frames)" price="$400" unit="set" />
            </div>
            <p className="text-[10px] text-zinc-500 font-mono mt-4">* Rates are indicative and may vary based on usage rights and exclusivity.</p>
        </ProfileSection>
    );
}
