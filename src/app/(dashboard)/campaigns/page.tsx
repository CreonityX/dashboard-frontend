"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RoleGuard } from "@/lib/RoleGuard";
import { CampaignsShell } from "@/components/widgets/shared/campaigns/CampaignsShell";
import { CampaignListTab } from "@/components/widgets/shared/campaigns/tabs/CampaignListTab";
import { TemplatesTab } from "@/components/widgets/shared/campaigns/tabs/TemplatesTab";

function CampaignsContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeTab = searchParams.get('tab') || 'list';

    const handleTabChange = (id: string) => {
        router.push(`/campaigns?tab=${id}`);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'list': return <CampaignListTab />;
            case 'templates': return <TemplatesTab />;
            default: return <CampaignListTab />;
        }
    };

    return (
        <CampaignsShell activeTab={activeTab} onTabChange={handleTabChange}>
            {renderContent()}
        </CampaignsShell>
    );
}

export default function CampaignsPage() {
    return (
        <RoleGuard allow="brand">
            <Suspense fallback={<div className="h-full w-full bg-zinc-900/40" />}>
                <CampaignsContent />
            </Suspense>
        </RoleGuard>
    );
}
