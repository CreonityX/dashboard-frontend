"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SupportShell } from "@/components/widgets/shared/support/SupportShell";

// Tabs
import { HelpCenterHome } from "@/components/widgets/shared/support/tabs/HelpCenterHome";
import { ContactSupport } from "@/components/widgets/shared/support/tabs/ContactSupport";
import { MyTickets } from "@/components/widgets/shared/support/tabs/MyTickets";
import { FAQSection } from "@/components/widgets/shared/support/tabs/FAQSection";
import { VideoTutorials } from "@/components/widgets/shared/support/tabs/VideoTutorials";
import { FeatureRequests } from "@/components/widgets/shared/support/tabs/FeatureRequests";
import { PlatformStatus } from "@/components/widgets/shared/support/tabs/PlatformStatus";

function SupportContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeTab = searchParams.get('tab') || 'help-center';

    const handleTabChange = (id: string) => {
        router.push(`/support?tab=${id}`);
    };

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
        <SupportShell activeTab={activeTab} onTabChange={handleTabChange}>
            {renderContent()}
        </SupportShell>
    );
}

export default function SupportPage() {
    return (
        <Suspense fallback={<div className="h-full w-full bg-zinc-900/40" />}>
            <SupportContent />
        </Suspense>
    );
}
