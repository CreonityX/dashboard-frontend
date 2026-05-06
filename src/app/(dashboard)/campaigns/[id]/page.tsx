"use client";

import { Suspense } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { RoleGuard } from "@/lib/RoleGuard";
import { CampaignDetailShell } from "@/components/widgets/shared/campaigns/CampaignDetailShell";
import { OverviewTab } from "@/components/widgets/shared/campaigns/detail/OverviewTab";
import { PerformanceTab } from "@/components/widgets/shared/campaigns/detail/PerformanceTab";
import { CreatorsTab } from "@/components/widgets/shared/campaigns/detail/CreatorsTab";
import { ContentTab } from "@/components/widgets/shared/campaigns/detail/ContentTab";
import { BudgetTab } from "@/components/widgets/shared/campaigns/detail/BudgetTab";
import { FilesTab } from "@/components/widgets/shared/campaigns/detail/FilesTab";
import { ActivityTab } from "@/components/widgets/shared/campaigns/detail/ActivityTab";
import Link from "next/link";

function CampaignDetailContent() {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const id = params.id as string;
    const activeTab = searchParams.get('tab') || 'overview';

    const handleTabChange = (tabId: string) => {
        router.push(`/campaigns/${id}?tab=${tabId}`);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'overview': return <OverviewTab campaignId={id} />;
            case 'performance': return <PerformanceTab campaignId={id} />;
            case 'creators': return <CreatorsTab campaignId={id} />;
            case 'applications': return <Link href="/applications?tab=pending" className="text-[#a3e635] hover:underline">View in Applications →</Link>;
            case 'content': return <ContentTab campaignId={id} />;
            case 'budget': return <BudgetTab campaignId={id} />;
            case 'files': return <FilesTab campaignId={id} />;
            case 'activity': return <ActivityTab campaignId={id} />;
            default: return <OverviewTab campaignId={id} />;
        }
    };

    return (
        <CampaignDetailShell campaignId={id} activeTab={activeTab} onTabChange={handleTabChange}>
            {renderContent()}
        </CampaignDetailShell>
    );
}

export default function CampaignDetailPage() {
    return (
        <RoleGuard allow="brand">
            <Suspense fallback={<div className="h-full w-full bg-zinc-900/40" />}>
                <CampaignDetailContent />
            </Suspense>
        </RoleGuard>
    );
}
