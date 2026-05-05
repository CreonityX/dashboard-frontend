"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnalyticsShell } from "@/components/widgets/shared/analytics/AnalyticsShell";

// Tabs
import { OverviewTab } from "@/components/widgets/shared/analytics/tabs/OverviewTab";
import { PerformanceTab } from "@/components/widgets/shared/analytics/tabs/PerformanceTab";
import { AudienceTab } from "@/components/widgets/shared/analytics/tabs/AudienceTab";

function AnalyticsContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeTab = searchParams.get('tab') || 'overview';

    const handleTabChange = (id: string) => {
        router.push(`/analytics?tab=${id}`);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'overview': return <OverviewTab />;
            case 'performance': return <PerformanceTab />;
            case 'audience': return <AudienceTab />;
            default: return <OverviewTab />;
        }
    };

    return (
        <AnalyticsShell activeTab={activeTab} onTabChange={handleTabChange}>
            {renderContent()}
        </AnalyticsShell>
    );
}

export default function AnalyticsPage() {
    return (
        <Suspense fallback={<div className="h-full w-full bg-zinc-900/40" />}>
            <AnalyticsContent />
        </Suspense>
    );
}
