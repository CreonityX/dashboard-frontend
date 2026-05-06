"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/lib/UserContext";

// Creator Imports
import { SupportShell as CreatorSupportShell } from "@/components/widgets/shared/support/SupportShell";
import { HelpCenterHome as CreatorHelpCenterHome } from "@/components/widgets/shared/support/tabs/HelpCenterHome";
import { ContactSupport as CreatorContactSupport } from "@/components/widgets/shared/support/tabs/ContactSupport";
import { MyTickets } from "@/components/widgets/shared/support/tabs/MyTickets";
import { FAQSection as CreatorFAQSection } from "@/components/widgets/shared/support/tabs/FAQSection";
import { VideoTutorials as CreatorVideoTutorials } from "@/components/widgets/shared/support/tabs/VideoTutorials";
import { FeatureRequests as CreatorFeatureRequests } from "@/components/widgets/shared/support/tabs/FeatureRequests";
import { PlatformStatus as CreatorPlatformStatus } from "@/components/widgets/shared/support/tabs/PlatformStatus";

// Brand Imports
import { SupportShell as BrandSupportShell } from "@/components/widgets/shared/support/BrandSupportShell";
import { HelpCenterHome as BrandHelpCenterHome } from "@/components/widgets/shared/support/tabs/HelpCenterHome";
import { ContactSupport as BrandContactSupport } from "@/components/widgets/shared/support/tabs/BrandContactSupport";
import { SubmitTicket } from "@/components/widgets/shared/support/tabs/SubmitTicket";
import { LiveChat } from "@/components/widgets/shared/support/tabs/LiveChat";
import { FAQSection as BrandFAQSection } from "@/components/widgets/shared/support/tabs/BrandFAQSection";
import { VideoTutorials as BrandVideoTutorials } from "@/components/widgets/shared/support/tabs/BrandVideoTutorials";
import { PlatformStatus as BrandPlatformStatus } from "@/components/widgets/shared/support/tabs/PlatformStatus";
import { FeatureRequests as BrandFeatureRequests } from "@/components/widgets/shared/support/tabs/BrandFeatureRequests";

function CreatorSupportContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeTab = searchParams.get('tab') || 'help-center';

    const handleTabChange = (id: string) => {
        router.push(`/support?tab=${id}`);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'help-center': return <CreatorHelpCenterHome />;
            case 'contact': return <CreatorContactSupport />;
            case 'tickets': return <MyTickets />;
            case 'faqs': return <CreatorFAQSection />;
            case 'tutorials': return <CreatorVideoTutorials />;
            case 'features': return <CreatorFeatureRequests />;
            case 'status': return <CreatorPlatformStatus />;
            default: return <CreatorHelpCenterHome />;
        }
    };

    return (
        <CreatorSupportShell activeTab={activeTab} onTabChange={handleTabChange}>
            {renderContent()}
        </CreatorSupportShell>
    );
}

function BrandSupportContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeTab = searchParams.get('tab') || 'help-center';

    const handleTabChange = (id: string) => {
        router.push(`/support?tab=${id}`);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'help-center': return <BrandHelpCenterHome />;
            case 'contact': return <BrandContactSupport />;
            case 'tickets': return <SubmitTicket />;
            case 'live-chat': return <LiveChat />;
            case 'faqs': return <BrandFAQSection />;
            case 'tutorials': return <BrandVideoTutorials />;
            case 'status': return <BrandPlatformStatus />;
            case 'features': return <BrandFeatureRequests />;
            default: return <BrandHelpCenterHome />;
        }
    };

    return (
        <BrandSupportShell activeTab={activeTab} onTabChange={handleTabChange}>
            {renderContent()}
        </BrandSupportShell>
    );
}

export default function SupportPage() {
    const { isBrand } = useUser();
    return (
        <Suspense fallback={<div className="h-full w-full bg-zinc-900/40" />}>
            {isBrand ? <BrandSupportContent /> : <CreatorSupportContent />}
        </Suspense>
    );
}
