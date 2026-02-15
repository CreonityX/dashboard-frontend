"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProfileShell } from "@/components/widgets/shared/profile/ProfileShell";

// Tabs
import { PublicProfileTab } from "@/components/widgets/shared/profile/tabs/PublicProfileTab";
import { EditProfileTab } from "@/components/widgets/shared/profile/tabs/EditProfileTab";
import { VerificationTab } from "@/components/widgets/shared/profile/tabs/VerificationTab";
import { MediaKitTab } from "@/components/widgets/shared/profile/tabs/MediaKitTab";
import { PrivacyTab } from "@/components/widgets/shared/profile/tabs/PrivacyTab";

function ProfileContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeTab = searchParams.get('tab') || 'public';

    const handleTabChange = (id: string) => {
        router.push(`/profile?tab=${id}`);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'public': return <PublicProfileTab />;
            case 'edit': return <EditProfileTab />;
            case 'verification': return <VerificationTab />;
            case 'mediakit': return <MediaKitTab />;
            case 'privacy': return <PrivacyTab />;
            default: return <PublicProfileTab />;
        }
    };

    return (
        <div className="h-full">


            <ProfileShell activeTab={activeTab} onTabChange={handleTabChange}>
                {renderContent()}
            </ProfileShell>
        </div>
    );
}

export default function ProfilePage() {
    return (
        <Suspense fallback={<div className="h-full w-full bg-zinc-900/40" />}>
            <ProfileContent />
        </Suspense>
    );
}
