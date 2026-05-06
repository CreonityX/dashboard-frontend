"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RoleGuard } from "@/lib/RoleGuard";
import { ApplicationsShell } from "@/components/widgets/shared/applications/ApplicationsShell";
import { PendingTab } from "@/components/widgets/shared/applications/tabs/PendingTab";
import { ShortlistedTab } from "@/components/widgets/shared/applications/tabs/ShortlistedTab";
import { AcceptedTab } from "@/components/widgets/shared/applications/tabs/AcceptedTab";
import { RejectedTab } from "@/components/widgets/shared/applications/tabs/RejectedTab";
import { ArchiveTab } from "@/components/widgets/shared/applications/tabs/ArchiveTab";

function ApplicationsContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeTab = searchParams.get('tab') || 'pending';

    const handleTabChange = (id: string) => {
        router.push(`/applications?tab=${id}`);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'pending': return <PendingTab />;
            case 'shortlisted': return <ShortlistedTab />;
            case 'accepted': return <AcceptedTab />;
            case 'rejected': return <RejectedTab />;
            case 'archive': return <ArchiveTab />;
            default: return <PendingTab />;
        }
    };

    return (
        <ApplicationsShell activeTab={activeTab} onTabChange={handleTabChange}>
            {renderContent()}
        </ApplicationsShell>
    );
}

export default function ApplicationsPage() {
    return (
        <RoleGuard allow="brand">
            <Suspense fallback={<div className="h-full w-full bg-zinc-900/40" />}>
                <ApplicationsContent />
            </Suspense>
        </RoleGuard>
    );
}
