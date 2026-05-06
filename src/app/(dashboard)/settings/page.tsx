"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/lib/UserContext";

// Creator Imports
import { SettingsShell as CreatorSettingsShell } from "@/components/widgets/shared/settings/SettingsShell";
import { AccountSettings as CreatorAccountSettings } from "@/components/widgets/shared/settings/sections/AccountSettings";
import { SecuritySettings as CreatorSecuritySettings } from "@/components/widgets/shared/settings/sections/SecuritySettings";
import { PaymentSettings as CreatorPaymentSettings } from "@/components/widgets/shared/settings/sections/PaymentSettings";
import { SubscriptionSettings as CreatorSubscriptionSettings } from "@/components/widgets/shared/settings/sections/SubscriptionSettings";
import { NotificationSettings as CreatorNotificationSettings } from "@/components/widgets/shared/settings/sections/NotificationSettings";
import { PreferenceSettings as CreatorPreferenceSettings } from "@/components/widgets/shared/settings/sections/PreferenceSettings";
import { PrivacySettings as CreatorPrivacySettings } from "@/components/widgets/shared/settings/sections/PrivacySettings";
import { IntegrationSettings as CreatorIntegrationSettings } from "@/components/widgets/shared/settings/sections/IntegrationSettings";
import { SupportSettings } from "@/components/widgets/shared/settings/sections/SupportSettings";
import { AccountManagement as CreatorAccountManagement } from "@/components/widgets/shared/settings/sections/AccountManagement";

// Brand Imports
import { SettingsShell as BrandSettingsShell } from "@/components/widgets/shared/settings/BrandSettingsShell";
import { AccountSettings as BrandAccountSettings } from "@/components/widgets/shared/settings/sections/BrandAccountSettings";
import { TeamManagement } from "@/components/widgets/shared/settings/sections/TeamManagement";
import { NotificationSettings as BrandNotificationSettings } from "@/components/widgets/shared/settings/sections/BrandNotificationSettings";
import { PaymentSettings as BrandPaymentSettings } from "@/components/widgets/shared/settings/sections/BrandPaymentSettings";
import { SubscriptionSettings as BrandSubscriptionSettings } from "@/components/widgets/shared/settings/sections/BrandSubscriptionSettings";
import { IntegrationSettings as BrandIntegrationSettings } from "@/components/widgets/shared/settings/sections/BrandIntegrationSettings";
import { PrivacySettings as BrandPrivacySettings } from "@/components/widgets/shared/settings/sections/BrandPrivacySettings";
import { PreferenceSettings as BrandPreferenceSettings } from "@/components/widgets/shared/settings/sections/BrandPreferenceSettings";
import { BlockedCreators } from "@/components/widgets/shared/settings/sections/BlockedCreators";

function CreatorSettingsContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeTab = searchParams.get('tab') || 'account';

    const handleTabChange = (id: string) => {
        router.push(`/settings?tab=${id}`);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'account': return <CreatorAccountSettings />;
            case 'security': return <CreatorSecuritySettings />;
            case 'payment': return <CreatorPaymentSettings />;
            case 'billing': return <CreatorSubscriptionSettings />;
            case 'notifications': return <CreatorNotificationSettings />;
            case 'preferences': return <CreatorPreferenceSettings />;
            case 'privacy': return <CreatorPrivacySettings />;
            case 'integrations': return <CreatorIntegrationSettings />;
            case 'support': return <SupportSettings />;
            case 'danger': return <CreatorAccountManagement />;
            default: return <CreatorAccountSettings />;
        }
    };

    return (
        <CreatorSettingsShell activeTab={activeTab} onTabChange={handleTabChange}>
            {renderContent()}
        </CreatorSettingsShell>
    );
}

function BrandSettingsContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeTab = searchParams.get('tab') || 'account';

    const handleTabChange = (id: string) => {
        router.push(`/settings?tab=${id}`);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'account': return <BrandAccountSettings />;
            case 'team': return <TeamManagement />;
            case 'notifications': return <BrandNotificationSettings />;
            case 'payment': return <BrandPaymentSettings />;
            case 'billing': return <BrandSubscriptionSettings />;
            case 'integrations': return <BrandIntegrationSettings />;
            case 'privacy': return <BrandPrivacySettings />;
            case 'preferences': return <BrandPreferenceSettings />;
            case 'blocked': return <BlockedCreators />;
            default: return <BrandAccountSettings />;
        }
    };

    return (
        <BrandSettingsShell activeTab={activeTab} onTabChange={handleTabChange}>
            {renderContent()}
        </BrandSettingsShell>
    );
}

export default function SettingsPage() {
    const { isBrand } = useUser();
    return (
        <Suspense fallback={<div className="h-full w-full bg-zinc-900/40" />}>
            {isBrand ? <BrandSettingsContent /> : <CreatorSettingsContent />}
        </Suspense>
    );
}
