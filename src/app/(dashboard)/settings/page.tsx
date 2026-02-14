"use client";

import { useState } from "react";
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

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('account');

    const renderContent = () => {
        switch (activeTab) {
            case 'account': return <AccountSettings />;
            case 'security': return <SecuritySettings />;
            case 'payment': return <PaymentSettings />;
            case 'billing': return <SubscriptionSettings />; // Mapping mismatch fix below
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
        <div className="max-w-[1600px] mx-auto h-full">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-white font-display uppercase tracking-tight">System Configuration</h1>
                <p className="text-zinc-500 font-mono text-xs mt-1">Global Settings // {activeTab.toUpperCase()}_MODULE</p>
            </div>

            <SettingsShell activeTab={activeTab} onTabChange={setActiveTab}>
                {renderContent()}
            </SettingsShell>
        </div>
    );
}
