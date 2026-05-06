"use client";

import { HeroSection } from "@/components/widgets/shared/profile/sections/HeroSection";
import { ExpertiseSection } from "@/components/widgets/shared/profile/sections/ExpertiseSection";
import { PortfolioGrid } from "@/components/widgets/shared/profile/sections/PortfolioGrid";
import { RateCardSection } from "@/components/widgets/shared/profile/sections/RateCardSection";
import { ReviewsSection } from "@/components/widgets/shared/profile/sections/ReviewsSection";

export function PublicProfileTab() {
    return (
        <div className="max-w-5xl mx-auto pb-20 animate-in fade-in zoom-in-95 duration-500">
            <HeroSection />

            <div className="px-6 space-y-12">
                <ExpertiseSection />
                <PortfolioGrid />
                <RateCardSection />
                <ReviewsSection />
            </div>
        </div>
    );
}
