"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SettingsShell } from "@/components/widgets/shared/settings/SettingsShell";

// Sections
import { AccountSettings } from "@/components/widgets/shared/settings/sections/AccountSettings";
import { SecuritySettings } from "@/components/widgets/shared/settings/sections/SecuritySettings";
import { PaymentSettings } from "@/components/widgets/shared/settings/sections/PaymentSettings";
import { SubscriptionSettings } from "@/components/widgets/shared/settings/sections/SubscriptionSettings";
import { NotificationSettings } from "@/components/widgets/shared/settings/sections/NotificationSettings";
import { PreferenceSettings } from "@/components/widgets/shared/settings/sections/PreferenceSettings";
import { PrivacySettings } from "@/components/widgets/shared/settings/sections/PrivacySettings";
import { IntegrationSettings } from "@/components/widgets/shared/settings/sections/IntegrationSettings";
import { SupportSettings } from "@/components/widgets/shared/settings/sections/SupportSettings";
import { AccountManagement } from "@/components/widgets/shared/settings/sections/AccountManagement";

function SettingsContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeTab = searchParams.get('tab') || 'account';

    const handleTabChange = (id: string) => {
        router.push(`/settings?tab=${id}`);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'account': return <AccountSettings />;
            case 'security': return <SecuritySettings />;
            case 'payment': return <PaymentSettings />;
            case 'billing': return <SubscriptionSettings />;
            case 'notifications': return <NotificationSettings />;
            case 'preferences': return <PreferenceSettings />;
            case 'privacy': return <PrivacySettings />;
            case 'integrations': return <IntegrationSettings />;
            case 'support': return <SupportSettings />;
            case 'danger': return <AccountManagement />;
            default: return <AccountSettings />;
        }
    };

    return (
        <SettingsShell activeTab={activeTab} onTabChange={handleTabChange}>
            {renderContent()}
        </SettingsShell>
    );
}

export default function SettingsPage() {
    return (
        <Suspense fallback={<div className="h-full w-full bg-zinc-900/40" />}>
            <SettingsContent />
        </Suspense>
    );
}
