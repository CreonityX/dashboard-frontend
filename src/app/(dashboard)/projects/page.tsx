"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProjectsShell } from "@/components/widgets/shared/projects/ProjectsShell";
import { ProjectsMvpProvider } from "@/components/widgets/shared/projects/ProjectsMvpContext";

// Tabs
import { DiscoverTab } from "@/components/widgets/shared/projects/tabs/DiscoverTab";
import { PipelineTab } from "@/components/widgets/shared/projects/tabs/PipelineTab";
import { CompletedTab } from "@/components/widgets/shared/projects/tabs/CompletedTab";
import { SavedTab } from "@/components/widgets/shared/projects/tabs/SavedTab";
import { InvitationsTab } from "@/components/widgets/shared/projects/tabs/InvitationsTab";

function ProjectsContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeTab = searchParams.get('tab') || 'discover';

    const handleTabChange = (id: string) => {
        router.push(`/projects?tab=${id}`);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'discover': return <DiscoverTab />;
            case 'pipeline': return <PipelineTab />;
            case 'completed': return <CompletedTab />;
            case 'saved': return <SavedTab />;
            case 'invitations': return <InvitationsTab />;
            default: return <DiscoverTab />;
        }
    };

    return (
        <ProjectsMvpProvider>
            <ProjectsShell activeTab={activeTab} onTabChange={handleTabChange}>
                {renderContent()}
            </ProjectsShell>
        </ProjectsMvpProvider>
    );
}

import { RoleGuard } from "@/lib/RoleGuard";

export default function ProjectsPage() {
    return (
        <RoleGuard allow="creator">
            <Suspense fallback={<div className="h-full w-full bg-zinc-900/40" />}>
                <ProjectsContent />
            </Suspense>
        </RoleGuard>
    );
}
