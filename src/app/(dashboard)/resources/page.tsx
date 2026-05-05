"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ResourcesShell } from "@/components/widgets/shared/resources/ResourcesShell";

import { BestPracticesTab } from "@/components/widgets/shared/resources/tabs/BestPracticesTab";
import { ToolsTab } from "@/components/widgets/shared/resources/tabs/ToolsTab";
import { CommunityTab } from "@/components/widgets/shared/resources/tabs/CommunityTab";

function ResourcesContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeTab = searchParams.get('tab') || 'best-practices';

    const handleTabChange = (id: string) => {
        router.push(`/resources?tab=${id}`);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'best-practices': return <BestPracticesTab />;
            case 'tools': return <ToolsTab />;
            case 'community': return <CommunityTab />;
            default: return <BestPracticesTab />;
        }
    };

    return (
        <ResourcesShell activeTab={activeTab} onTabChange={handleTabChange}>
            {renderContent()}
        </ResourcesShell>
    );
}

export default function ResourcesPage() {
    return (
        <Suspense fallback={<div className="h-full w-full bg-zinc-900/40" />}>
            <ResourcesContent />
        </Suspense>
    );
}
