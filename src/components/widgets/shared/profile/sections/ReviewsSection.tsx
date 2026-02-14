"use client";

import { ProfileSection, ReviewCard } from "@/components/widgets/shared/profile/ProfileComponents";

export function ReviewsSection() {
    return (
        <ProfileSection title="Brand Endorsements">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ReviewCard
                    author="Nike Sportswear"
                    rating={5}
                    text="Kai delivered exceptional visuals for our Air Max campaign. The 3D work was top-notch and delivered ahead of schedule."
                    date="2025-11-15"
                />
                <ReviewCard
                    author="Sony PlayStation"
                    rating={5}
                    text="Incredible attention to detail. Captured the cyberpunk aesthetic perfectly for our new game launch."
                    date="2025-10-02"
                />
            </div>
        </ProfileSection>
    );
}
