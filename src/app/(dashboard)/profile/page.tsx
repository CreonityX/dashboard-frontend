"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/lib/UserContext";

// Creator Imports
import { ProfileShell as CreatorProfileShell } from "@/components/widgets/shared/profile/ProfileShell";
import { PublicProfileTab } from "@/components/widgets/shared/profile/tabs/PublicProfileTab";
import { EditProfileTab as CreatorEditProfileTab } from "@/components/widgets/shared/profile/tabs/EditProfileTab";
import { VerificationTab as CreatorVerificationTab } from "@/components/widgets/shared/profile/tabs/VerificationTab";
import { MediaKitTab } from "@/components/widgets/shared/profile/tabs/MediaKitTab";
import { PrivacyTab as CreatorPrivacyTab } from "@/components/widgets/shared/profile/tabs/PrivacyTab";

// Brand Imports
import { ProfileShell as BrandProfileShell } from "@/components/widgets/shared/profile/BrandProfileShell";
import { EditProfileTab as BrandEditProfileTab } from "@/components/widgets/shared/profile/tabs/BrandEditProfileTab";
import { VerificationTab as BrandVerificationTab } from "@/components/widgets/shared/profile/tabs/BrandVerificationTab";
import { PastCampaignsTab } from "@/components/widgets/shared/profile/tabs/PastCampaignsTab";
import { BrandAssetsTab } from "@/components/widgets/shared/profile/tabs/BrandAssetsTab";
import { ReviewsTab as BrandReviewsTab } from "@/components/widgets/shared/profile/tabs/ReviewsTab";
import { PrivacyTab as BrandPrivacyTab } from "@/components/widgets/shared/profile/tabs/BrandPrivacyTab";

function CreatorProfileContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeTab = searchParams.get('tab') || 'public';

    const handleTabChange = (id: string) => {
        router.push(`/profile?tab=${id}`);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'public': return <PublicProfileTab />;
            case 'edit': return <CreatorEditProfileTab />;
            case 'verification': return <CreatorVerificationTab />;
            case 'mediakit': return <MediaKitTab />;
            case 'privacy': return <CreatorPrivacyTab />;
            default: return <PublicProfileTab />;
        }
    };

    return (
        <CreatorProfileShell activeTab={activeTab} onTabChange={handleTabChange}>
            {renderContent()}
        </CreatorProfileShell>
    );
}

function BrandProfileContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeTab = searchParams.get('tab') || 'edit';

    const handleTabChange = (id: string) => {
        router.push(`/profile?tab=${id}`);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'edit': return <BrandEditProfileTab />;
            case 'verification': return <BrandVerificationTab />;
            case 'showcase': return <PastCampaignsTab />;
            case 'assets': return <BrandAssetsTab />;
            case 'reviews': return <BrandReviewsTab />;
            case 'privacy': return <BrandPrivacyTab />;
            default: return <BrandEditProfileTab />;
        }
    };

    return (
        <BrandProfileShell activeTab={activeTab} onTabChange={handleTabChange}>
            {renderContent()}
        </BrandProfileShell>
    );
}

export default function ProfilePage() {
    const { isBrand } = useUser();
    return (
        <div className="h-full">
            <Suspense fallback={<div className="h-full w-full bg-zinc-900/40" />}>
                {isBrand ? <BrandProfileContent /> : <CreatorProfileContent />}
            </Suspense>
        </div>
    );
}
