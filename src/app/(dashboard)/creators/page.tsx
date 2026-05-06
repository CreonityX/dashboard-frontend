"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RoleGuard } from "@/lib/RoleGuard";
import { CreatorsShell } from "@/components/widgets/shared/creators/CreatorsShell";
import { DiscoverTab } from "@/components/widgets/shared/creators/tabs/DiscoverTab";
import { SavedTab } from "@/components/widgets/shared/creators/tabs/SavedTab";
import { WorkingWithTab } from "@/components/widgets/shared/creators/tabs/WorkingWithTab";
import { PastCollaborationsTab } from "@/components/widgets/shared/creators/tabs/PastCollaborationsTab";

function CreatorsContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeTab = searchParams.get('tab') || 'discover';
    const creatorId = searchParams.get('creator');

    const handleTabChange = (id: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('tab', id);
        if (creatorId && id !== 'discover') params.delete('creator');
        router.push(`/creators?${params.toString()}`);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'discover': return <DiscoverTab creatorId={creatorId} onCloseProfile={() => { const p = new URLSearchParams(searchParams.toString()); p.delete('creator'); router.push(`/creators?${p.toString()}`); }} />;
            case 'saved': return <SavedTab />;
            case 'working': return <WorkingWithTab />;
            case 'past': return <PastCollaborationsTab />;
            default: return <DiscoverTab creatorId={null} onCloseProfile={() => {}} />;
        }
    };

    return (
        <CreatorsShell activeTab={activeTab} onTabChange={handleTabChange}>
            {renderContent()}
        </CreatorsShell>
    );
}

export default function CreatorsPage() {
    return (
        <RoleGuard allow="brand">
            <Suspense fallback={<div className="h-full w-full bg-zinc-900/40" />}>
                <CreatorsContent />
            </Suspense>
        </RoleGuard>
    );
}
