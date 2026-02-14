"use client";

import { useState } from "react";
import { SupportShell } from "@/components/widgets/shared/support/SupportShell";

// Tabs
import { HelpCenterHome } from "@/components/widgets/shared/support/tabs/HelpCenterHome";
import { ContactSupport } from "@/components/widgets/shared/support/tabs/ContactSupport";
import { MyTickets } from "@/components/widgets/shared/support/tabs/MyTickets";
import { FAQSection } from "@/components/widgets/shared/support/tabs/FAQSection";
import { VideoTutorials } from "@/components/widgets/shared/support/tabs/VideoTutorials";
import { FeatureRequests } from "@/components/widgets/shared/support/tabs/FeatureRequests";
import { PlatformStatus } from "@/components/widgets/shared/support/tabs/PlatformStatus";

export default function SupportPage() {
    const [activeTab, setActiveTab] = useState('help-center');

    const renderContent = () => {
        switch (activeTab) {
            case 'help-center': return <HelpCenterHome />;
            case 'contact': return <ContactSupport />;
            case 'tickets': return <MyTickets />;
            case 'faqs': return <FAQSection />;
            case 'tutorials': return <VideoTutorials />;
            case 'features': return <FeatureRequests />;
            case 'status': return <PlatformStatus />;
            default: return <HelpCenterHome />;
        }
    };

    return (
        <div className="max-w-[1600px] mx-auto h-full space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white font-display uppercase tracking-tight">Support Center</h1>
                <p className="text-zinc-500 font-mono text-xs mt-1">HELP & RESOURCES // {activeTab.toUpperCase()}_MODE</p>
            </div>

            <SupportShell activeTab={activeTab} onTabChange={setActiveTab}>
                {renderContent()}
            </SupportShell>
        </div>
    );
}
