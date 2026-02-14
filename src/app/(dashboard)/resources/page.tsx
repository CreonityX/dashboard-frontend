"use client";

import { useState } from "react";
import { ResourcesShell } from "@/components/widgets/shared/resources/ResourcesShell";

// Tabs
import { CoursesTab } from "@/components/widgets/shared/resources/tabs/CoursesTab";
import { BestPracticesTab } from "@/components/widgets/shared/resources/tabs/BestPracticesTab";
import { ToolsTab } from "@/components/widgets/shared/resources/tabs/ToolsTab";
import { CommunityTab } from "@/components/widgets/shared/resources/tabs/CommunityTab";
import { InsightsTab } from "@/components/widgets/shared/resources/tabs/InsightsTab";
import { NewsTab } from "@/components/widgets/shared/resources/tabs/NewsTab";

export default function ResourcesPage() {
    const [activeTab, setActiveTab] = useState('courses');

    const renderContent = () => {
        switch (activeTab) {
            case 'courses': return <CoursesTab />;
            case 'best-practices': return <BestPracticesTab />;
            case 'tools': return <ToolsTab />;
            case 'community': return <CommunityTab />;
            case 'insights': return <InsightsTab />;
            case 'news': return <NewsTab />;
            default: return <CoursesTab />;
        }
    };

    return (
        <div className="max-w-[1600px] mx-auto h-full space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white font-display uppercase tracking-tight">Resources Hub</h1>
                <p className="text-zinc-500 font-mono text-xs mt-1">KNOWLEDGE_BASE // {activeTab.toUpperCase()}_MODULE_ACTIVE</p>
            </div>

            <ResourcesShell activeTab={activeTab} onTabChange={setActiveTab}>
                {renderContent()}
            </ResourcesShell>
        </div>
    );
}
