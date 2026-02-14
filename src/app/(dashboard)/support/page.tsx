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
        <SupportShell activeTab={activeTab} onTabChange={setActiveTab}>
            {renderContent()}
        </SupportShell>
    );
}
