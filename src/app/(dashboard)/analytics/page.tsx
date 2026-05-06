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
import { CampaignsTab } from "@/components/widgets/shared/analytics/tabs/CampaignsTab";
import { CreatorsTab } from "@/components/widgets/shared/analytics/tabs/CreatorsTab";
import { ContentTab } from "@/components/widgets/shared/analytics/tabs/ContentTab";
import { AudienceTab as BrandAudienceTab } from "@/components/widgets/shared/analytics/tabs/BrandAudienceTab";
import { ComparisonTab } from "@/components/widgets/shared/analytics/tabs/ComparisonTab";
import { PlatformTab } from "@/components/widgets/shared/analytics/tabs/PlatformTab";
import { AttributionTab } from "@/components/widgets/shared/analytics/tabs/AttributionTab";
import { BenchmarkingTab } from "@/components/widgets/shared/analytics/tabs/BenchmarkingTab";
import { ReportsTab } from "@/components/widgets/shared/analytics/tabs/ReportsTab";

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
            case 'campaigns': return <CampaignsTab />;
            case 'creators': return <CreatorsTab />;
            case 'content': return <ContentTab />;
            case 'audience': return <BrandAudienceTab />;
            case 'comparison': return <ComparisonTab />;
            case 'platform': return <PlatformTab />;
            case 'roi': return <AttributionTab />;
            case 'benchmarking': return <BenchmarkingTab />;
            case 'reports': return <ReportsTab />;
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
