"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RoleGuard } from "@/lib/RoleGuard";
import { ContentReviewShell } from "@/components/widgets/shared/content-review/ContentReviewShell";
import { QueueTab } from "@/components/widgets/shared/content-review/tabs/QueueTab";
import { ApprovedTab } from "@/components/widgets/shared/content-review/tabs/ApprovedTab";
import { RevisionsTab } from "@/components/widgets/shared/content-review/tabs/RevisionsTab";
import { RejectedTab } from "@/components/widgets/shared/content-review/tabs/RejectedTab";

function ContentReviewContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeTab = searchParams.get('tab') || 'queue';

    const handleTabChange = (id: string) => {
        router.push(`/content-review?tab=${id}`);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'queue': return <QueueTab />;
            case 'approved': return <ApprovedTab />;
            case 'revisions': return <RevisionsTab />;
            case 'rejected': return <RejectedTab />;
            default: return <QueueTab />;
        }
    };

    return (
        <ContentReviewShell activeTab={activeTab} onTabChange={handleTabChange}>
            {renderContent()}
        </ContentReviewShell>
    );
}

export default function ContentReviewPage() {
    return (
        <RoleGuard allow="brand">
            <Suspense fallback={<div className="h-full w-full bg-zinc-900/40" />}>
                <ContentReviewContent />
            </Suspense>
        </RoleGuard>
    );
}
