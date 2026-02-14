"use client";

import { useState } from "react";
import { ProfileShell } from "@/components/widgets/shared/profile/ProfileShell";

// Tabs
import { PublicProfileTab } from "@/components/widgets/shared/profile/tabs/PublicProfileTab";
import { EditProfileTab } from "@/components/widgets/shared/profile/tabs/EditProfileTab";
import { VerificationTab } from "@/components/widgets/shared/profile/tabs/VerificationTab";
import { MediaKitTab } from "@/components/widgets/shared/profile/tabs/MediaKitTab";
import { PrivacyTab } from "@/components/widgets/shared/profile/tabs/PrivacyTab";

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState('public');

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
        <div className="max-w-[1600px] mx-auto h-full space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white font-display uppercase tracking-tight">Identity Matrix</h1>
                <p className="text-zinc-500 font-mono text-xs mt-1">CREATOR_PROFILE // {activeTab.toUpperCase()}_MODE</p>
            </div>

            <ProfileShell activeTab={activeTab} onTabChange={setActiveTab}>
                {renderContent()}
            </ProfileShell>
        </div>
    );
}
