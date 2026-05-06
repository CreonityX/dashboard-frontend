"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/lib/UserContext";

// Creator Imports
import { AnalyticsShell as CreatorAnalyticsShell } from "@/components/widgets/shared/analytics/AnalyticsShell";
import { OverviewTab as CreatorOverviewTab } from "@/components/widgets/shared/analytics/tabs/OverviewTab";
import { PerformanceTab } from "@/components/widgets/shared/analytics/tabs/PerformanceTab";
import { AudienceTab as CreatorAudienceTab } from "@/components/widgets/shared/analytics/tabs/AudienceTab";

// Brand Imports
import { AnalyticsShell as BrandAnalyticsShell } from "@/components/widgets/shared/analytics/BrandAnalyticsShell";
import { OverviewTab as BrandOverviewTab } from "@/components/widgets/shared/analytics/tabs/BrandOverviewTab";
import { BrandPerformanceTab } from "@/components/widgets/shared/analytics/tabs/BrandPerformanceTab";
import { RoiAndReportsTab } from "@/components/widgets/shared/analytics/tabs/RoiAndReportsTab";
import { AudienceTab as BrandAudienceTab } from "@/components/widgets/shared/analytics/tabs/BrandAudienceTab";

function CreatorAnalyticsContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeTab = searchParams.get('tab') || 'overview';

    const handleTabChange = (id: string) => {
        router.push(`/analytics?tab=${id}`);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'overview': return <CreatorOverviewTab />;
            case 'performance': return <PerformanceTab />;
            case 'audience': return <CreatorAudienceTab />;
            default: return <CreatorOverviewTab />;
        }
    };

    return (
        <CreatorAnalyticsShell activeTab={activeTab} onTabChange={handleTabChange}>
            {renderContent()}
        </CreatorAnalyticsShell>
    );
}

function BrandAnalyticsContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeTab = searchParams.get('tab') || 'overview';

    const handleTabChange = (id: string) => {
        router.push(`/analytics?tab=${id}`);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'overview': return <BrandOverviewTab />;
            case 'performance': return <BrandPerformanceTab />;
            case 'audience': return <BrandAudienceTab />;
            case 'roi': return <RoiAndReportsTab />;
            default: return <BrandOverviewTab />;
        }
    };

    return (
        <BrandAnalyticsShell activeTab={activeTab} onTabChange={handleTabChange}>
            {renderContent()}
        </BrandAnalyticsShell>
    );
}

export default function AnalyticsPage() {
    const { isBrand } = useUser();
    return (
        <Suspense fallback={<div className="h-full w-full bg-zinc-900/40" />}>
            {isBrand ? <BrandAnalyticsContent /> : <CreatorAnalyticsContent />}
        </Suspense>
    );
}
