"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RoleGuard } from "@/lib/RoleGuard";
import { InsightsShell } from "@/components/widgets/shared/insights/InsightsShell";
import { IndustryTrendsTab } from "@/components/widgets/shared/insights/tabs/IndustryTrendsTab";
import { CreatorMarketplaceTab } from "@/components/widgets/shared/insights/tabs/CreatorMarketplaceTab";
import { CompetitiveIntelligenceTab } from "@/components/widgets/shared/insights/tabs/CompetitiveIntelligenceTab";
import { SeasonalPlanningTab } from "@/components/widgets/shared/insights/tabs/SeasonalPlanningTab";

function InsightsContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeTab = searchParams.get('tab') || 'industry';

    const handleTabChange = (id: string) => {
        router.push(`/insights?tab=${id}`);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'industry': return <IndustryTrendsTab />;
            case 'marketplace': return <CreatorMarketplaceTab />;
            case 'competitive': return <CompetitiveIntelligenceTab />;
            case 'seasonal': return <SeasonalPlanningTab />;
            default: return <IndustryTrendsTab />;
        }
    };

    return (
        <InsightsShell activeTab={activeTab} onTabChange={handleTabChange}>
            {renderContent()}
        </InsightsShell>
    );
}

export default function InsightsPage() {
    return (
        <RoleGuard allow="brand">
            <Suspense fallback={<div className="h-full w-full bg-zinc-900/40" />}>
                <InsightsContent />
            </Suspense>
        </RoleGuard>
    );
}
